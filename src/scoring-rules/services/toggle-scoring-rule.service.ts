import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { ScoringRule, ScoringRuleDocument } from '../models/scoring-rule';
import { parseScoringRuleToView } from '../models/parser';
import { TrackConfigChangeService } from './track-config-change.service';
import { ConfigType } from '../enums/config-type.enum';
import { AttributeType } from '../enums/attribute-type.enum';
import { ScoringRuleView } from '../dto/views/scoring-rule.view';

@Injectable()
export class ToggleScoringRuleService {
  constructor(
    @InjectModel(ScoringRule.name)
    private scoringRuleModel: Model<ScoringRuleDocument>,
    private trackConfigChangeService: TrackConfigChangeService,
  ) {}

  async toggle(
    attribute: AttributeType,
    isActive: boolean,
    userId: string,
  ): Promise<ScoringRuleView> {
    try {
      const rule = await this.scoringRuleModel.findOneAndUpdate(
        { attribute },
        { $set: { isActive } },
        { new: true },
      );

      if (!rule) {
        throw new ThrowGQL('Scoring rule not found', GQLThrowType.NOT_FOUND);
      }

      // Track the change
      await this.trackConfigChangeService.track(
        ConfigType.RULE_TOGGLE,
        { isActive },
        userId,
        attribute,
      );

      return parseScoringRuleToView(rule);
    } catch (error) {
      if (error instanceof ThrowGQL) {
        throw error;
      }
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
