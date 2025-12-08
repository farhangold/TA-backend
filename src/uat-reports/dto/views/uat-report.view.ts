import { ObjectType, Field } from '@nestjs/graphql';
import { TestIdentity } from '../../models/test-identity';
import { TestEnvironment } from '../../models/test-environment';
import { Evidence } from '../../models/evidence';
import { SeverityLevel } from '../../enums/severity-level.enum';
import { ReportStatus } from '../../enums/report-status.enum';
import { ReportType } from '../../enums/report-type.enum';
import { UserView } from '../../../users/dto/views/user.view';

@ObjectType()
export class UATReportView {
  @Field()
  _id: string;

  @Field(() => ReportType)
  reportType: ReportType;

  @Field(() => TestIdentity)
  testIdentity: TestIdentity;

  @Field(() => TestEnvironment)
  testEnvironment: TestEnvironment;

  @Field(() => [String], { nullable: true })
  stepsToReproduce?: string[];

  @Field()
  actualResult: string;

  @Field({ nullable: true })
  expectedResult?: string;

  @Field(() => [Evidence], { nullable: true })
  supportingEvidence?: Evidence[];

  @Field(() => SeverityLevel)
  severityLevel: SeverityLevel;

  @Field({ nullable: true })
  domain?: string;

  @Field({ nullable: true })
  additionalInfo?: string;

  @Field(() => ReportStatus)
  status: ReportStatus;

  @Field(() => UserView)
  createdBy: UserView;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
