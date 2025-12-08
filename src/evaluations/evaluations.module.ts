import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Evaluation, EvaluationSchema } from './models/evaluation';
import { UATReportsModule } from '../uat-reports/uat-reports.module';
import { ScoringRulesModule } from '../scoring-rules/scoring-rules.module';
import { UsersModule } from '../users/users.module';
import { UATReport, UATReportSchema } from '../uat-reports/models/uat-report';
import { User, UserSchema } from '../users/models/user';
import { TestIdentityEvaluator } from './services/evaluators/test-identity.evaluator';
import { TestEnvironmentEvaluator } from './services/evaluators/test-environment.evaluator';
import { StepsToReproduceEvaluator } from './services/evaluators/steps-to-reproduce.evaluator';
import { ActualResultEvaluator } from './services/evaluators/actual-result.evaluator';
import { ExpectedResultEvaluator } from './services/evaluators/expected-result.evaluator';
import { SupportingEvidenceEvaluator } from './services/evaluators/supporting-evidence.evaluator';
import { SeverityLevelEvaluator } from './services/evaluators/severity-level.evaluator';
import { InformationConsistencyEvaluator } from './services/evaluators/information-consistency.evaluator';
import { DescriptionSuccessEvaluator } from './services/evaluators/description-success.evaluator';
import { EnvironmentSuccessEvaluator } from './services/evaluators/environment-success.evaluator';
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
  ],
  providers: [
    TestIdentityEvaluator,
    TestEnvironmentEvaluator,
    StepsToReproduceEvaluator,
    ActualResultEvaluator,
    ExpectedResultEvaluator,
    SupportingEvidenceEvaluator,
    SeverityLevelEvaluator,
    InformationConsistencyEvaluator,
    DescriptionSuccessEvaluator,
    EnvironmentSuccessEvaluator,
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
