import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { AttributeScore } from '../../models/attribute-score';
import { EvaluationFeedback } from '../../models/evaluation-feedback';
import { ValidationStatus } from '../../enums/validation-status.enum';
import { ReportType } from '../../../uat-reports/enums/report-type.enum';
import { UATReportView } from '../../../uat-reports/dto/views/uat-report.view';
import { UserView } from '../../../users/dto/views/user.view';

@ObjectType()
export class EvaluationView {
  @Field()
  _id: string;

  @Field(() => String)
  reportId: string;

  @Field(() => ReportType)
  reportType: ReportType;

  @Field(() => UATReportView)
  report: UATReportView;

  @Field(() => [AttributeScore])
  attributeScores: AttributeScore[];

  @Field(() => Float)
  totalScore: number;

  @Field(() => Float)
  maxScore: number;

  @Field(() => Float)
  scorePercentage: number;

  @Field(() => ValidationStatus)
  validationStatus: ValidationStatus;

  @Field(() => [EvaluationFeedback])
  feedback: EvaluationFeedback[];

  @Field(() => Int)
  processingTime: number;

  @Field(() => UserView, { nullable: true })
  evaluatedBy?: UserView;

  @Field()
  evaluatedAt: Date;

  @Field(() => Int)
  version: number;
}
