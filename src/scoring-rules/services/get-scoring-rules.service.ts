import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { ScoringRule, ScoringRuleDocument } from '../models/scoring-rule';
import {
  ValidationConfig,
  ValidationConfigDocument,
} from '../models/validation-config';
import {
  parseScoringRuleToView,
  parseValidationConfigToView,
} from '../models/parser';
import { AttributeType } from '../enums/attribute-type.enum';
import { ReportType } from '../../uat-reports/enums/report-type.enum';
import { ScoringRuleView } from '../dto/views/scoring-rule.view';
import { ValidationConfigView } from '../dto/views/validation-config.view';
import { InitializeScoringRulesService } from './initialize-scoring-rules.service';

@Injectable()
export class GetScoringRulesService {
  constructor(
    @InjectModel(ScoringRule.name)
    private scoringRuleModel: Model<ScoringRuleDocument>,
    @InjectModel(ValidationConfig.name)
    private validationConfigModel: Model<ValidationConfigDocument>,
    private initializeScoringRulesService: InitializeScoringRulesService,
  ) {}

  async findAll(): Promise<ScoringRuleView[]> {
    try {
      const rules = await this.scoringRuleModel.find().exec();
      return rules.map(parseScoringRuleToView);
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async findByAttribute(attribute: AttributeType): Promise<ScoringRuleView> {
    try {
      const rule = await this.scoringRuleModel.findOne({ attribute }).exec();
      if (!rule) {
        throw new ThrowGQL('Scoring rule not found', GQLThrowType.NOT_FOUND);
      }
      return parseScoringRuleToView(rule);
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async getActiveRules(): Promise<ScoringRuleView[]> {
    try {
      const rules = await this.scoringRuleModel.find({ isActive: true }).exec();
      return rules.map(parseScoringRuleToView);
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async getValidationConfig(): Promise<ValidationConfigView> {
    try {
      const config = await this.validationConfigModel
        .findOne()
        .sort({ updatedAt: -1 })
        .populate('updatedBy')
        .exec();

      if (!config) {
        throw new ThrowGQL(
          'Validation config not found',
          GQLThrowType.NOT_FOUND,
        );
      }

      return parseValidationConfigToView(config);
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }

  async getScoringRulesByReportType(
    reportType: ReportType,
  ): Promise<ScoringRuleView[]> {
    try {
      // Try to get rules from database first
      const rules = await this.scoringRuleModel.find({ isActive: true }).exec();

      // Filter rules based on report type
      const bugReportAttributes = [
        AttributeType.TEST_ENVIRONMENT,
        AttributeType.STEPS_TO_REPRODUCE,
        AttributeType.ACTUAL_RESULT,
        AttributeType.SUPPORTING_EVIDENCE,
      ];

      const successReportAttributes = [
        AttributeType.TEST_ENVIRONMENT,
        AttributeType.ACTUAL_RESULT,
      ];

      const relevantAttributes =
        reportType === ReportType.BUG_REPORT
          ? bugReportAttributes
          : successReportAttributes;

      const filteredRules = rules.filter((rule) =>
        relevantAttributes.includes(rule.attribute),
      );

      // If no rules found, return default rules
      if (filteredRules.length === 0) {
        const defaultRules =
          reportType === ReportType.BUG_REPORT
            ? this.initializeScoringRulesService.getDefaultBugReportRules()
            : this.initializeScoringRulesService.getDefaultSuccessReportRules();

        return defaultRules.map((rule) => ({
          _id: '',
          attribute: rule.attribute,
          description: rule.description,
          criteria: rule.criteria,
          weight: rule.weight,
          isActive: rule.isActive,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      }

      return filteredRules.map(parseScoringRuleToView);
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
