import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, Float } from '@nestjs/graphql';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';

export type EvaluationStatus = 'VALID' | 'AMBIGUOUS' | 'INVALID' | 'NEEDS_MANUAL_REVIEW';

@Schema({ _id: false })
@ObjectType('QualityFlags')
export class QualityFlags {
  @Field({ nullable: true })
  @Prop({ required: false, type: Boolean })
  isConsistent?: boolean;

  @Field({ nullable: true })
  @Prop({ required: false, type: Boolean })
  isClear?: boolean;

  @Field({ nullable: true })
  @Prop({ required: false, type: Boolean })
  isContradictory?: boolean;

  @Field({ nullable: true })
  @Prop({ required: false, type: Boolean })
  isTooGeneric?: boolean;

  @Field({ nullable: true })
  @Prop({ required: false, type: Boolean })
  hasBias?: boolean;

  @Field({ nullable: true })
  @Prop({ required: false, type: Boolean })
  isAmbiguous?: boolean;
}

export const QualityFlagsSchema = SchemaFactory.createForClass(QualityFlags);

@Schema({ _id: false })
@ObjectType()
export class AttributeScore {
  @Field(() => AttributeType)
  @Prop({ required: true, type: String, enum: AttributeType })
  attribute: AttributeType;

  @Field(() => Float)
  @Prop({ required: true })
  score: number;

  @Field(() => Float)
  @Prop({ required: true })
  maxScore: number;

  @Field(() => Float)
  @Prop({ required: true })
  weight: number;

  @Field(() => Float)
  @Prop({ required: true })
  weightedScore: number;

  @Field()
  @Prop({ required: true })
  passed: boolean;

  @Field({ nullable: true })
  @Prop({ required: false })
  reasoning?: string;

  @Field({ nullable: true })
  @Prop({ required: false, type: String })
  evaluationStatus?: EvaluationStatus;

  @Field(() => QualityFlags, { nullable: true })
  @Prop({ required: false, type: Object })
  qualityFlags?: QualityFlags;
}

export const AttributeScoreSchema =
  SchemaFactory.createForClass(AttributeScore);
