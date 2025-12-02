/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { Roles, CurrentUser } from '../common/decorators';
import { GetScoringRulesService } from './services/get-scoring-rules.service';
import { UpdateScoringRuleService } from './services/update-scoring-rule.service';
import { ToggleScoringRuleService } from './services/toggle-scoring-rule.service';
import { UpdateValidationThresholdService } from './services/update-validation-threshold.service';
import { ResetScoringRulesService } from './services/reset-scoring-rules.service';
import { TrackConfigChangeService } from './services/track-config-change.service';
import { ScoringRuleView } from './dto/views/scoring-rule.view';
import { ValidationConfigView } from './dto/views/validation-config.view';
import { ConfigHistoryConnection } from './dto/views/config-history-connection.view';
import { UpdateScoringRuleInput } from './dto/inputs/update-scoring-rule.input';
import { AttributeType } from './enums/attribute-type.enum';
import { PaginationInput } from '../common/types';
import { UserView } from '../users/dto/views/user.view';

@Resolver(() => ScoringRuleView)
export class ScoringRulesResolver {
  constructor(
    private readonly getScoringRulesService: GetScoringRulesService,
    private readonly updateScoringRuleService: UpdateScoringRuleService,
    private readonly toggleScoringRuleService: ToggleScoringRuleService,
    private readonly updateValidationThresholdService: UpdateValidationThresholdService,
    private readonly resetScoringRulesService: ResetScoringRulesService,
    private readonly trackConfigChangeService: TrackConfigChangeService,
  ) {}

  @Query(() => [ScoringRuleView], { name: 'getScoringRules' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REVIEWER')
  async getScoringRules(): Promise<ScoringRuleView[]> {
    return await this.getScoringRulesService.findAll();
  }

  @Query(() => ScoringRuleView, { name: 'getScoringRule' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REVIEWER')
  async getScoringRule(
    @Args('attribute', { type: () => AttributeType }) attribute: AttributeType,
  ): Promise<ScoringRuleView> {
    return await this.getScoringRulesService.findByAttribute(attribute);
  }

  @Query(() => ValidationConfigView, { name: 'getValidationConfig' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REVIEWER')
  async getValidationConfig(): Promise<ValidationConfigView> {
    return await this.getScoringRulesService.getValidationConfig();
  }

  @Query(() => ConfigHistoryConnection, { name: 'getRuleConfigHistory' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getRuleConfigHistory(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ): Promise<ConfigHistoryConnection> {
    return await this.trackConfigChangeService.getHistory(pagination);
  }

  @Mutation(() => ScoringRuleView, { name: 'updateScoringRule' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateScoringRule(
    @Args('input') input: UpdateScoringRuleInput,
    @CurrentUser() user: UserView,
  ): Promise<ScoringRuleView> {
    return await this.updateScoringRuleService.update(input, user._id);
  }

  @Mutation(() => ValidationConfigView, { name: 'updateValidationThreshold' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateValidationThreshold(
    @Args('threshold', { type: () => Float }) threshold: number,
    @CurrentUser() user: UserView,
  ): Promise<ValidationConfigView> {
    return await this.updateValidationThresholdService.update(
      threshold,
      user._id,
    );
  }

  @Mutation(() => ScoringRuleView, { name: 'toggleScoringRule' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async toggleScoringRule(
    @Args('attribute', { type: () => AttributeType }) attribute: AttributeType,
    @Args('isActive') isActive: boolean,
    @CurrentUser() user: UserView,
  ): Promise<ScoringRuleView> {
    return await this.toggleScoringRuleService.toggle(
      attribute,
      isActive,
      user._id,
    );
  }

  @Mutation(() => [ScoringRuleView], { name: 'resetScoringRulesToDefault' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async resetScoringRulesToDefault(
    @CurrentUser() user: UserView,
  ): Promise<ScoringRuleView[]> {
    return await this.resetScoringRulesService.reset(user._id);
  }
}
