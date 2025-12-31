import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Evaluation, EvaluationSchema } from './models/evaluation';
import { UATReportsModule } from '../uat-reports/uat-reports.module';
import { ScoringRulesModule } from '../scoring-rules/scoring-rules.module';
import { UsersModule } from '../users/users.module';
import { LLMModule } from '../llm/llm.module';
import { UATReport, UATReportSchema } from '../uat-reports/models/uat-report';
import { User, UserSchema } from '../users/models/user';
import { LLMTestIdentityEvaluator } from './services/evaluators/llm-test-identity.evaluator';
import { LLMTestEnvironmentEvaluator } from './services/evaluators/llm-test-environment.evaluator';
import { LLMStepsToReproduceEvaluator } from './services/evaluators/llm-steps-to-reproduce.evaluator';
import { LLMActualResultEvaluator } from './services/evaluators/llm-actual-result.evaluator';
import { LLMExpectedResultEvaluator } from './services/evaluators/llm-expected-result.evaluator';
import { LLMSupportingEvidenceEvaluator } from './services/evaluators/llm-supporting-evidence.evaluator';
import { LLMSeverityLevelEvaluator } from './services/evaluators/llm-severity-level.evaluator';
import { LLMInformationConsistencyEvaluator } from './services/evaluators/llm-information-consistency.evaluator';
import { LLMDescriptionSuccessEvaluator } from './services/evaluators/llm-description-success.evaluator';
import { LLMEnvironmentSuccessEvaluator } from './services/evaluators/llm-environment-success.evaluator';
import { CalculateScoreService } from './services/calculate-score.service';
import { DetermineStatusService } from './services/determine-status.service';
import { GenerateFeedbackService } from './services/generate-feedback.service';
import { EvaluateReportService } from './services/evaluate-report.service';
import { GetEvaluationService } from './services/get-evaluation.service';
import { BatchEvaluateReportsService } from './services/batch-evaluate-reports.service';
import { EvaluationsResolver } from './evaluations.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Evaluation.name, schema: EvaluationSchema },
      { name: UATReport.name, schema: UATReportSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => UATReportsModule),
    ScoringRulesModule,
    UsersModule,
    LLMModule,
  ],
  providers: [
    LLMTestIdentityEvaluator,
    LLMTestEnvironmentEvaluator,
    LLMStepsToReproduceEvaluator,
    LLMActualResultEvaluator,
    LLMExpectedResultEvaluator,
    LLMSupportingEvidenceEvaluator,
    LLMSeverityLevelEvaluator,
    LLMInformationConsistencyEvaluator,
    LLMDescriptionSuccessEvaluator,
    LLMEnvironmentSuccessEvaluator,
    CalculateScoreService,
    DetermineStatusService,
    GenerateFeedbackService,
    EvaluateReportService,
    GetEvaluationService,
    BatchEvaluateReportsService,
    EvaluationsResolver,
  ],
  exports: [EvaluateReportService, GetEvaluationService],
})
export class EvaluationsModule {}
