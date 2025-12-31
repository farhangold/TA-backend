import { Injectable } from '@nestjs/common';
import { UATReport } from '../../uat-reports/models/uat-report';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';
import { ReportType } from '../../uat-reports/enums/report-type.enum';

export interface EvaluationPrompt {
  systemPrompt: string;
  userPrompt: string;
}

@Injectable()
export class PromptBuilderService {
  buildPrompt(
    attribute: AttributeType,
    report: UATReport,
    reportType: ReportType,
  ): EvaluationPrompt {
    const systemPrompt = this.getSystemPrompt(attribute, reportType);
    const userPrompt = this.getUserPrompt(attribute, report, reportType);

    return {
      systemPrompt,
      userPrompt,
    };
  }

  private getSystemPrompt(
    attribute: AttributeType,
    reportType: ReportType,
  ): string {
    const reportTypeLabel =
      reportType === ReportType.BUG_REPORT ? 'Bug Report' : 'Success Report';

    return `You are an expert quality assurance evaluator. Your task is to evaluate ${reportTypeLabel.toLowerCase()} attributes and provide a score from 0.0 to 1.0.

You must respond ONLY with valid JSON in this exact format:
{"score": 0.0-1.0, "reasoning": "brief explanation of your evaluation"}

The score should reflect:
- 0.0-0.3: Poor quality, missing critical information
- 0.4-0.6: Acceptable but incomplete or unclear
- 0.7-0.9: Good quality with minor issues
- 1.0: Excellent quality, complete and clear

Be strict but fair in your evaluation.`;
  }

  private getUserPrompt(
    attribute: AttributeType,
    report: UATReport,
    reportType: ReportType,
  ): string {
    const reportTypeLabel =
      reportType === ReportType.BUG_REPORT ? 'Bug Report' : 'Success Report';

    switch (attribute) {
      case AttributeType.TEST_ENVIRONMENT:
        return this.buildTestEnvironmentPrompt(report, reportTypeLabel);
      case AttributeType.STEPS_TO_REPRODUCE:
        return this.buildStepsToReproducePrompt(report, reportTypeLabel);
      case AttributeType.ACTUAL_RESULT:
        return this.buildActualResultPrompt(report, reportTypeLabel);
      case AttributeType.EXPECTED_RESULT:
        return this.buildExpectedResultPrompt(report, reportTypeLabel);
      case AttributeType.SUPPORTING_EVIDENCE:
        return this.buildSupportingEvidencePrompt(report, reportTypeLabel);
      case AttributeType.SEVERITY_LEVEL:
        return this.buildSeverityLevelPrompt(report, reportTypeLabel);
      case AttributeType.INFORMATION_CONSISTENCY:
        return this.buildInformationConsistencyPrompt(report, reportTypeLabel);
      case AttributeType.TEST_IDENTITY:
        return this.buildTestIdentityPrompt(report, reportTypeLabel);
      default:
        return this.buildGenericPrompt(attribute, report, reportTypeLabel);
    }
  }

  private buildTestEnvironmentPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const env = report.testEnvironment;
    return `Evaluate the Test Environment attribute for this ${reportTypeLabel.toLowerCase()}:

Test Environment Data:
- Operating System: ${env?.os || 'Not provided'}
- Browser: ${env?.browser || 'Not provided'}
- Device: ${env?.device || 'Not provided'}
- Additional Info: ${env?.additionalInfo || 'None'}

Scoring Criteria:
- All required fields (OS, Browser, Device) are provided: +0.5
- Additional relevant information is provided: +0.3
- Information is clear and specific: +0.2

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }

  private buildStepsToReproducePrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const steps = report.stepsToReproduce || [];
    const stepsText =
      steps.length > 0
        ? steps.map((step, i) => `${i + 1}. ${step}`).join('\n')
        : 'No steps provided';

    return `Evaluate the Steps to Reproduce attribute for this ${reportTypeLabel.toLowerCase()}:

Steps to Reproduce:
${stepsText}

Scoring Criteria:
- At least 3 steps provided: +0.3
- Steps are clear and sequential: +0.3
- Each step is detailed enough (minimum 10 characters): +0.2
- Steps are actionable and specific: +0.2

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }

  private buildActualResultPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const actualResult = report.actualResult || 'Not provided';
    const isSuccessReport = report.reportType === ReportType.SUCCESS_REPORT;

    if (isSuccessReport) {
      return `Evaluate the Success Description (Actual Result) attribute for this success report:

Success Description:
${actualResult}

Scoring Criteria:
- Description is provided and meaningful (minimum 30 characters): +0.3
- Description clearly explains what succeeded: +0.3
- Description includes relevant context: +0.2
- Description is clear and well-written: +0.2

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
    }

    return `Evaluate the Actual Result attribute for this bug report:

Actual Result:
${actualResult}

Scoring Criteria:
- Actual result is provided and meaningful (minimum 30 characters): +0.3
- Clearly describes what actually happened: +0.3
- Includes relevant error messages or symptoms: +0.2
- Description is clear and specific: +0.2

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }

  private buildExpectedResultPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const expectedResult = report.expectedResult || 'Not provided';
    return `Evaluate the Expected Result attribute for this ${reportTypeLabel.toLowerCase()}:

Expected Result:
${expectedResult}

Scoring Criteria:
- Expected result is provided and meaningful (minimum 10 characters): +0.4
- Clearly describes what should have happened: +0.3
- Contrasts appropriately with actual result: +0.2
- Description is clear and specific: +0.1

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }

  private buildSupportingEvidencePrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const evidence = report.supportingEvidence || [];
    const evidenceText =
      evidence.length > 0
        ? evidence
            .map(
              (e, i) =>
                `${i + 1}. Type: ${e.type}, URL: ${e.url || 'N/A'}, Description: ${e.description || 'None'}`,
            )
            .join('\n')
        : 'No supporting evidence provided';

    return `Evaluate the Supporting Evidence attribute for this ${reportTypeLabel.toLowerCase()}:

Supporting Evidence:
${evidenceText}

Scoring Criteria:
- At least one piece of evidence is provided: +0.5
- Evidence is relevant to the report: +0.3
- Evidence includes proper description or context: +0.2

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }

  private buildSeverityLevelPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const severity = report.severityLevel;
    const actualResult = report.actualResult || '';
    const expectedResult = report.expectedResult || '';

    return `Evaluate the Severity Level attribute for this ${reportTypeLabel.toLowerCase()}:

Severity Level: ${severity}

Actual Result: ${actualResult.substring(0, 200)}
Expected Result: ${expectedResult.substring(0, 200)}

Scoring Criteria:
- Severity level is appropriate for the described issue: +0.5
- Severity matches the impact described in actual/expected results: +0.3
- Severity level is correctly assigned (Critical for crashes, High for major issues, etc.): +0.2

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }

  private buildInformationConsistencyPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const actualResult = report.actualResult || '';
    const expectedResult = report.expectedResult || '';
    const severity = report.severityLevel;
    const steps = report.stepsToReproduce || [];

    return `Evaluate the Information Consistency attribute for this ${reportTypeLabel.toLowerCase()}:

Actual Result: ${actualResult.substring(0, 200)}
Expected Result: ${expectedResult.substring(0, 200)}
Severity Level: ${severity}
Steps to Reproduce: ${steps.length} steps provided

Scoring Criteria:
- Actual and expected results are different (as they should be for bug reports): +0.3
- Both actual and expected results are meaningful (minimum 10 characters each): +0.2
- Severity level is consistent with the described issue: +0.2
- Steps to reproduce align with the described issue: +0.2
- Overall information is coherent and consistent: +0.1

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }

  private buildTestIdentityPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const testIdentity = report.testIdentity;
    return `Evaluate the Test Identity attribute for this ${reportTypeLabel.toLowerCase()}:

Test Identity Data:
- Test ID: ${testIdentity?.testId || 'Not provided'}
- Version: ${testIdentity?.version || 'Not provided'}
- Title: ${testIdentity?.title || 'Not provided'}

Scoring Criteria:
- Test ID is provided and valid: +0.4
- Version is provided: +0.3
- Test case name is provided: +0.3

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }

  private buildGenericPrompt(
    attribute: AttributeType,
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    return `Evaluate the ${attribute} attribute for this ${reportTypeLabel.toLowerCase()}.

Report Data:
${JSON.stringify(report, null, 2)}

Provide a score from 0.0 to 1.0 based on the quality and completeness of this attribute.

Return JSON: {"score": 0.0-1.0, "reasoning": "explanation"}`;
  }
}

