import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class LLMCacheService {
  private readonly cacheEnabled: boolean;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.cacheEnabled =
      this.configService.get<boolean>('llm.cacheEnabled') !== false;
  }

  async get(
    attribute: string,
    reportData: any,
  ): Promise<{ score: number; reasoning: string } | null> {
    if (!this.cacheEnabled) {
      return null;
    }

    const cacheKey = this.generateCacheKey(attribute, reportData);
    try {
      const cached = await this.cacheManager.get<{
        score: number;
        reasoning: string;
      }>(cacheKey);
      return cached || null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(
    attribute: string,
    reportData: any,
    result: { score: number; reasoning: string },
    ttl?: number,
  ): Promise<void> {
    if (!this.cacheEnabled) {
      return;
    }

    const cacheKey = this.generateCacheKey(attribute, reportData);
    try {
      await this.cacheManager.set(cacheKey, result, ttl);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  private generateCacheKey(attribute: string, reportData: any): string {
    // Create a hash of the attribute and relevant report data
    const dataToHash = JSON.stringify({
      attribute,
      testId: reportData.testIdentity?.testId,
      version: reportData.testIdentity?.version,
      actualResult: reportData.actualResult,
      expectedResult: reportData.expectedResult,
      stepsToReproduce: reportData.stepsToReproduce,
      testEnvironment: reportData.testEnvironment,
      supportingEvidence: reportData.supportingEvidence,
      severityLevel: reportData.severityLevel,
    });

    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
    return `llm:eval:${attribute}:${hash}`;
  }
}

