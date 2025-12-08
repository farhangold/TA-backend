import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { TestIdentity, TestIdentitySchema } from './test-identity';
import { TestEnvironment, TestEnvironmentSchema } from './test-environment';
import { Evidence, EvidenceSchema } from './evidence';
import { SeverityLevel } from '../enums/severity-level.enum';
import { ReportStatus } from '../enums/report-status.enum';
import { ReportType } from '../enums/report-type.enum';

@Schema({ timestamps: true })
@ObjectType()
export class UATReport {
  @Field()
  @Prop({ required: true })
  _id: string;

  @Field(() => TestIdentity)
  @Prop({ required: true, type: TestIdentitySchema })
  testIdentity: TestIdentity;

  @Field(() => ReportType)
  @Prop({ required: true, type: String, enum: ReportType })
  reportType: ReportType;

  @Field(() => TestEnvironment)
  @Prop({ required: true, type: TestEnvironmentSchema })
  testEnvironment: TestEnvironment;

  @Field(() => [String], { nullable: true })
  @Prop({ required: false, type: [String] })
  stepsToReproduce?: string[];

  @Field()
  @Prop({ required: true })
  actualResult: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  expectedResult?: string;

  @Field(() => [Evidence], { nullable: true })
  @Prop({ required: false, type: [EvidenceSchema], default: [] })
  supportingEvidence?: Evidence[];

  @Field(() => SeverityLevel)
  @Prop({ required: true, type: String, enum: SeverityLevel })
  severityLevel: SeverityLevel;

  @Field({ nullable: true })
  @Prop({ required: false })
  domain?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  additionalInfo?: string;

  @Field(() => ReportStatus)
  @Prop({
    required: true,
    type: String,
    enum: ReportStatus,
    default: ReportStatus.PENDING_EVALUATION,
  })
  status: ReportStatus;

  @Field(() => String)
  @Prop({ required: true, type: MongooseSchema.Types.String, ref: 'User' })
  createdBy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type UATReportDocument = HydratedDocument<UATReport>;
export const UATReportSchema = SchemaFactory.createForClass(UATReport);

// Create indexes
UATReportSchema.index({ status: 1 });
UATReportSchema.index({ severityLevel: 1 });
UATReportSchema.index({ createdBy: 1 });
UATReportSchema.index({ createdAt: -1 });
UATReportSchema.index({ domain: 1 });
UATReportSchema.index({ status: 1, severityLevel: 1 });
UATReportSchema.index({ reportType: 1 });
UATReportSchema.index({ reportType: 1, status: 1 });
