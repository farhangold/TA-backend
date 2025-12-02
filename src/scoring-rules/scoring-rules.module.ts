import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoringRule, ScoringRuleSchema } from './models/scoring-rule';
import {
  ValidationConfig,
  ValidationConfigSchema,
} from './models/validation-config';
import { ConfigHistory, ConfigHistorySchema } from './models/config-history';
import { User, UserSchema } from '../users/models/user';
import { InitializeScoringRulesService } from './services/initialize-scoring-rules.service';
import { GetScoringRulesService } from './services/get-scoring-rules.service';
import { UpdateScoringRuleService } from './services/update-scoring-rule.service';
import { ToggleScoringRuleService } from './services/toggle-scoring-rule.service';
import { UpdateValidationThresholdService } from './services/update-validation-threshold.service';
import { ResetScoringRulesService } from './services/reset-scoring-rules.service';
import { TrackConfigChangeService } from './services/track-config-change.service';
import { ScoringRulesResolver } from './scoring-rules.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScoringRule.name, schema: ScoringRuleSchema },
      { name: ValidationConfig.name, schema: ValidationConfigSchema },
      { name: ConfigHistory.name, schema: ConfigHistorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    InitializeScoringRulesService,
    GetScoringRulesService,
    UpdateScoringRuleService,
    ToggleScoringRuleService,
    UpdateValidationThresholdService,
    ResetScoringRulesService,
    TrackConfigChangeService,
    ScoringRulesResolver,
  ],
  exports: [
    InitializeScoringRulesService,
    GetScoringRulesService,
    TrackConfigChangeService,
  ],
})
export class ScoringRulesModule {}
