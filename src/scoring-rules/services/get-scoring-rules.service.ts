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
import { ScoringRuleView } from '../dto/views/scoring-rule.view';
import { ValidationConfigView } from '../dto/views/validation-config.view';

@Injectable()
export class GetScoringRulesService {
  constructor(
    @InjectModel(ScoringRule.name)
    private scoringRuleModel: Model<ScoringRuleDocument>,
    @InjectModel(ValidationConfig.name)
    private validationConfigModel: Model<ValidationConfigDocument>,
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
}
