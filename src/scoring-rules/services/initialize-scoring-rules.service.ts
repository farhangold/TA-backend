import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { ScoringRule, ScoringRuleDocument } from '../models/scoring-rule';
import {
  ValidationConfig,
  ValidationConfigDocument,
} from '../models/validation-config';
import { AttributeType } from '../enums/attribute-type.enum';

@Injectable()
export class InitializeScoringRulesService {
  constructor(
    @InjectModel(ScoringRule.name)
    private scoringRuleModel: Model<ScoringRuleDocument>,
    @InjectModel(ValidationConfig.name)
    private validationConfigModel: Model<ValidationConfigDocument>,
  ) {}

  async initialize(userId: string): Promise<void> {
    try {
      // Check if rules already exist
      const existingRules = await this.scoringRuleModel.countDocuments();
      if (existingRules > 0) {
        return;
      }

      // Default rules as per requirements
      const defaultRules = [
        {
          _id: new ObjectId().toString(),
          attribute: AttributeType.TEST_IDENTITY,
          description: 'Test Identity Completeness',
          criteria:
            'IF testId AND title AND version are provided THEN score = 1 ELSE 0',
          weight: 10,
          isActive: true,
        },
        {
          _id: new ObjectId().toString(),
          attribute: AttributeType.TEST_ENVIRONMENT,
          description: 'Test Environment Completeness',
          criteria:
            'IF os AND browser AND device are complete THEN score = 1 ELSE 0',
          weight: 15,
          isActive: true,
        },
        {
          _id: new ObjectId().toString(),
          attribute: AttributeType.STEPS_TO_REPRODUCE,
          description: 'Steps to Reproduce Completeness',
          criteria:
            'IF steps.length >= 3 AND logically ordered THEN score = 1; IF ambiguous THEN 0.5',
          weight: 25,
          isActive: true,
        },
        {
          _id: new ObjectId().toString(),
          attribute: AttributeType.ACTUAL_RESULT,
          description: 'Actual Result Completeness',
          criteria: 'IF actualResult.length >= 30 THEN score = 1 ELSE 0',
          weight: 10,
          isActive: true,
        },
        {
          _id: new ObjectId().toString(),
          attribute: AttributeType.EXPECTED_RESULT,
          description: 'Expected Result Completeness',
          criteria:
            'IF expectedResult provided AND matches requirement THEN score = 1 ELSE 0',
          weight: 10,
          isActive: true,
        },
        {
          _id: new ObjectId().toString(),
          attribute: AttributeType.SUPPORTING_EVIDENCE,
          description: 'Supporting Evidence Completeness',
          criteria: 'IF supportingEvidence.length > 0 THEN score = 1 ELSE 0',
          weight: 15,
          isActive: true,
        },
        {
          _id: new ObjectId().toString(),
          attribute: AttributeType.SEVERITY_LEVEL,
          description: 'Severity Level Validity',
          criteria:
            'IF severityLevel IN [LOW, MEDIUM, HIGH, CRITICAL] THEN score = 1 ELSE 0',
          weight: 10,
          isActive: true,
        },
        {
          _id: new ObjectId().toString(),
          attribute: AttributeType.INFORMATION_CONSISTENCY,
          description: 'Information Consistency',
          criteria: 'IF no contradictions detected THEN score = 1 ELSE 0',
          weight: 5,
          isActive: true,
        },
      ];

      await this.scoringRuleModel.insertMany(defaultRules);

      // Initialize default validation config
      const existingConfig = await this.validationConfigModel.countDocuments();
      if (existingConfig === 0) {
        await this.validationConfigModel.create({
          _id: new ObjectId().toString(),
          threshold: 70,
          updatedBy: userId,
        });
      }
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  getDefaultRules() {
    return [
      {
        attribute: AttributeType.TEST_IDENTITY,
        description: 'Test Identity Completeness',
        criteria:
          'IF testId AND title AND version are provided THEN score = 1 ELSE 0',
        weight: 10,
        isActive: true,
      },
      {
        attribute: AttributeType.TEST_ENVIRONMENT,
        description: 'Test Environment Completeness',
        criteria:
          'IF os AND browser AND device are complete THEN score = 1 ELSE 0',
        weight: 15,
        isActive: true,
      },
      {
        attribute: AttributeType.STEPS_TO_REPRODUCE,
        description: 'Steps to Reproduce Completeness',
        criteria:
          'IF steps.length >= 3 AND logically ordered THEN score = 1; IF ambiguous THEN 0.5',
        weight: 25,
        isActive: true,
      },
      {
        attribute: AttributeType.ACTUAL_RESULT,
        description: 'Actual Result Completeness',
        criteria: 'IF actualResult.length >= 30 THEN score = 1 ELSE 0',
        weight: 10,
        isActive: true,
      },
      {
        attribute: AttributeType.EXPECTED_RESULT,
        description: 'Expected Result Completeness',
        criteria:
          'IF expectedResult provided AND matches requirement THEN score = 1 ELSE 0',
        weight: 10,
        isActive: true,
      },
      {
        attribute: AttributeType.SUPPORTING_EVIDENCE,
        description: 'Supporting Evidence Completeness',
        criteria: 'IF supportingEvidence.length > 0 THEN score = 1 ELSE 0',
        weight: 15,
        isActive: true,
      },
      {
        attribute: AttributeType.SEVERITY_LEVEL,
        description: 'Severity Level Validity',
        criteria:
          'IF severityLevel IN [LOW, MEDIUM, HIGH, CRITICAL] THEN score = 1 ELSE 0',
        weight: 10,
        isActive: true,
      },
      {
        attribute: AttributeType.INFORMATION_CONSISTENCY,
        description: 'Information Consistency',
        criteria: 'IF no contradictions detected THEN score = 1 ELSE 0',
        weight: 5,
        isActive: true,
      },
    ];
  }

  getDefaultBugReportRules() {
    return [
      {
        attribute: AttributeType.TEST_ENVIRONMENT,
        description: 'Test Environment Completeness',
        criteria: 'IF OS, browser, dan perangkat diisi lengkap THEN 1 ELSE 0',
        weight: 25,
        isActive: true,
      },
      {
        attribute: AttributeType.STEPS_TO_REPRODUCE,
        description: 'Input (Step to Reproduce)',
        criteria:
          'IF langkah ≥ 3 dan berurutan logis THEN 1 ELSE 0.5 jika ambigu',
        weight: 35,
        isActive: true,
      },
      {
        attribute: AttributeType.ACTUAL_RESULT,
        description: 'Description',
        criteria: 'IF deskripsi hasil aktual ≥ 30 karakter THEN 1 ELSE 0',
        weight: 25,
        isActive: true,
      },
      {
        attribute: AttributeType.SUPPORTING_EVIDENCE,
        description: 'Screenshot/Evidence',
        criteria: 'IF evidence tidak kosong dan sesuai kebutuhan THEN 1 ELSE 0',
        weight: 15,
        isActive: true,
      },
    ];
  }

  getDefaultSuccessReportRules() {
    return [
      {
        attribute: AttributeType.TEST_ENVIRONMENT,
        description: 'Environment',
        criteria: 'IF OS, browser, dan perangkat diisi lengkap THEN 1 ELSE 0',
        weight: 40,
        isActive: true,
      },
      {
        attribute: AttributeType.ACTUAL_RESULT,
        description: 'Description',
        criteria: 'IF deskripsi hasil aktual ≥ 30 karakter THEN 1 ELSE 0',
        weight: 60,
        isActive: true,
      },
    ];
  }
}
