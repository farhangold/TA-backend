import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { ScoringRule, ScoringRuleDocument } from '../models/scoring-rule';
import { parseScoringRuleToView } from '../models/parser';
import { TrackConfigChangeService } from './track-config-change.service';
import { ConfigType } from '../enums/config-type.enum';
import { InitializeScoringRulesService } from './initialize-scoring-rules.service';
import { ScoringRuleView } from '../dto/views/scoring-rule.view';

@Injectable()
export class ResetScoringRulesService {
  constructor(
    @InjectModel(ScoringRule.name)
    private scoringRuleModel: Model<ScoringRuleDocument>,
    private trackConfigChangeService: TrackConfigChangeService,
    private initializeScoringRulesService: InitializeScoringRulesService,
  ) {}

  async reset(userId: string): Promise<ScoringRuleView[]> {
    try {
      // Delete all existing rules
      await this.scoringRuleModel.deleteMany({});

      // Get default rules
      const defaultRules = this.initializeScoringRulesService.getDefaultRules();

      // Insert default rules
      const rules = await this.scoringRuleModel.insertMany(
        defaultRules.map((rule) => ({
          ...rule,
          _id: new ObjectId().toString(),
        })),
      );

      // Track the change
      await this.trackConfigChangeService.track(
        ConfigType.RULE_RESET,
        { message: 'All rules reset to default values' },
        userId,
      );

      return rules.map(parseScoringRuleToView);
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
