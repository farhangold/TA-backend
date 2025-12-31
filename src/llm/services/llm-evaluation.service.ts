import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PromptBuilderService } from './prompt-builder.service';
import { LLMCacheService } from './llm-cache.service';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';
import { UATReport } from '../../uat-reports/models/uat-report';
import { ReportType } from '../../uat-reports/enums/report-type.enum';

export interface LLMEvaluationResult {
  score: number;
  reasoning: string;
}

@Injectable()
export class LLMEvaluationService {
  private readonly logger = new Logger(LLMEvaluationService.name);
  private openai: OpenAI;
  private readonly model: string;
  private readonly temperature: number;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly cacheEnabled: boolean;
  private readonly cacheTTL: number;

  constructor(
    private configService: ConfigService,
    private promptBuilder: PromptBuilderService,
    private cacheService: LLMCacheService,
  ) {
    const apiKey = this.configService.get<string>('llm.apiKey');
    if (!apiKey) {
      this.logger.warn('OpenAI API key not configured');
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });

    this.model = this.configService.get<string>('llm.model') || 'gpt-4o-mini';
    this.temperature =
      this.configService.get<number>('llm.temperature') || 0.3;
    this.timeout = this.configService.get<number>('llm.timeout') || 30000;
    this.maxRetries = this.configService.get<number>('llm.maxRetries') || 3;
    this.cacheEnabled =
      this.configService.get<boolean>('llm.cacheEnabled') !== false;
    this.cacheTTL =
      this.configService.get<number>('llm.cacheTTL') || 86400000;
  }

  async evaluate(
    attribute: AttributeType,
    report: UATReport,
    reportType: ReportType,
  ): Promise<LLMEvaluationResult> {
    // Check cache first
    if (this.cacheEnabled) {
      const reportData = this.convertReportToPlainObject(report);
      const cached = await this.cacheService.get(attribute, reportData);
      if (cached) {
        this.logger.debug(`Cache hit for attribute: ${attribute}`);
        return cached;
      }
    }

    // Build prompt
    const { systemPrompt, userPrompt } = this.promptBuilder.buildPrompt(
      attribute,
      report,
      reportType,
    );

    // Call OpenAI with retry logic
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await this.callOpenAI(systemPrompt, userPrompt);
        
        // Cache the result
        if (this.cacheEnabled) {
          const reportData = this.convertReportToPlainObject(report);
          await this.cacheService.set(
            attribute,
            reportData,
            result,
            this.cacheTTL,
          );
        }

        return result;
      } catch (error) {
        lastError = error as Error;
        this.logger.warn(
          `OpenAI API call failed (attempt ${attempt}/${this.maxRetries}): ${error.message}`,
        );

        // If it's a rate limit error, wait longer
        if (
          error instanceof Error &&
          (error.message.includes('rate limit') ||
            error.message.includes('429'))
        ) {
          const waitTime = Math.min(1000 * Math.pow(2, attempt), 10000);
          await this.sleep(waitTime);
        } else if (attempt < this.maxRetries) {
          // Exponential backoff for other errors
          const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          await this.sleep(waitTime);
        }
      }
    }

    // All retries failed, return default score
    this.logger.error(
      `All retry attempts failed for attribute ${attribute}. Returning default score.`,
    );
    return {
      score: 0,
      reasoning: `Evaluation failed after ${this.maxRetries} attempts: ${lastError?.message || 'Unknown error'}`,
    };
  }

  private async callOpenAI(
    systemPrompt: string,
    userPrompt: string,
  ): Promise<LLMEvaluationResult> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const completion = await this.openai.chat.completions.create(
        {
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: this.temperature,
          response_format: { type: 'json_object' },
          max_tokens: 200,
        },
        { signal: controller.signal },
      );

      clearTimeout(timeoutId);

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      const parsed = JSON.parse(content);
      
      // Validate and normalize score
      let score = parseFloat(parsed.score);
      if (isNaN(score) || score < 0) {
        score = 0;
      } else if (score > 1) {
        score = 1;
      }

      return {
        score,
        reasoning: parsed.reasoning || 'No reasoning provided',
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${this.timeout}ms`);
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private convertReportToPlainObject(report: UATReport): any {
    // Convert UATReport to plain object for caching
    return {
      testIdentity: report.testIdentity,
      testEnvironment: report.testEnvironment,
      stepsToReproduce: report.stepsToReproduce,
      actualResult: report.actualResult,
      expectedResult: report.expectedResult,
      supportingEvidence: report.supportingEvidence,
      severityLevel: report.severityLevel,
      reportType: report.reportType,
    };
  }
}

