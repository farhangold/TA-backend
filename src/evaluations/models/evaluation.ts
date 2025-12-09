import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { AttributeScore, AttributeScoreSchema } from './attribute-score';
import {
  EvaluationFeedback,
  EvaluationFeedbackSchema,
} from './evaluation-feedback';
import { ValidationStatus } from '../enums/validation-status.enum';
import { CompletenessStatus } from '../enums/completeness-status.enum';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';
import { ReportType } from '../../uat-reports/enums/report-type.enum';

@Schema({ timestamps: true })
@ObjectType()
export class Evaluation {
  @Field()
  @Prop({ required: true })
  _id: string;

  @Field(() => String)
  @Prop({ required: true, type: MongooseSchema.Types.String, ref: 'UATReport' })
  reportId: string;

  @Field(() => ReportType)
  @Prop({ required: true, type: String, enum: ReportType })
  reportType: ReportType;

  @Field(() => [AttributeScore])
  @Prop({ required: true, type: [AttributeScoreSchema] })
  attributeScores: AttributeScore[];

  @Field(() => Float)
  @Prop({ required: true })
  totalScore: number;

  @Field(() => Float)
  @Prop({ required: true })
  maxScore: number;

  @Field(() => Float)
  @Prop({ required: true })
  scorePercentage: number;

  @Field(() => ValidationStatus)
  @Prop({ required: true, type: String, enum: ValidationStatus })
  validationStatus: ValidationStatus;

  @Field(() => CompletenessStatus)
  @Prop({
    required: false,
    type: String,
    enum: CompletenessStatus,
    default: CompletenessStatus.COMPLETE,
  })
  completenessStatus?: CompletenessStatus;

  @Field(() => [AttributeType], { nullable: true })
  @Prop({ required: false, type: [String], enum: AttributeType, default: [] })
  incompleteAttributes?: AttributeType[];

  @Field(() => [EvaluationFeedback])
  @Prop({ required: true, type: [EvaluationFeedbackSchema], default: [] })
  feedback: EvaluationFeedback[];

  @Field(() => Int)
  @Prop({ required: true })
  processingTime: number;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: MongooseSchema.Types.String, ref: 'User' })
  evaluatedBy?: string;

  @Field()
  @Prop({ required: true, default: () => new Date() })
  evaluatedAt: Date;

  @Field(() => Int)
  @Prop({ required: true, default: 1 })
  version: number;
}

export type EvaluationDocument = HydratedDocument<Evaluation>;
export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);

// Create indexes
EvaluationSchema.index({ reportId: 1 });
EvaluationSchema.index({ evaluatedAt: -1 });
EvaluationSchema.index({ validationStatus: 1 });
EvaluationSchema.index({ reportId: 1, version: -1 });
EvaluationSchema.index({ reportType: 1 });
EvaluationSchema.index({ reportType: 1, validationStatus: 1 });
