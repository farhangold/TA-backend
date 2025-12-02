import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { ScoringRule, ScoringRuleDocument } from '../models/scoring-rule';
import { UpdateScoringRuleInput } from '../dto/inputs/update-scoring-rule.input';
import { parseScoringRuleToView } from '../models/parser';
import { TrackConfigChangeService } from './track-config-change.service';
import { ConfigType } from '../enums/config-type.enum';
import { ScoringRuleView } from '../dto/views/scoring-rule.view';

@Injectable()
export class UpdateScoringRuleService {
  constructor(
    @InjectModel(ScoringRule.name)
    private scoringRuleModel: Model<ScoringRuleDocument>,
    private trackConfigChangeService: TrackConfigChangeService,
  ) {}

  async update(
    input: UpdateScoringRuleInput,
    userId: string,
  ): Promise<ScoringRuleView> {
    try {
      const updateData: any = {};
      const changes: any = {};

      if (input.weight !== undefined) {
        updateData.weight = input.weight;
        changes.weight = input.weight;
      }

      if (input.criteria) {
        updateData.criteria = input.criteria;
        changes.criteria = input.criteria;
      }

      if (input.description) {
        updateData.description = input.description;
        changes.description = input.description;
      }

      const rule = await this.scoringRuleModel.findOneAndUpdate(
        { attribute: input.attribute },
        { $set: updateData },
        { new: true },
      );

      if (!rule) {
        throw new ThrowGQL('Scoring rule not found', GQLThrowType.NOT_FOUND);
      }

      // Track the change
      await this.trackConfigChangeService.track(
        ConfigType.RULE_UPDATE,
        changes,
        userId,
        input.attribute,
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
