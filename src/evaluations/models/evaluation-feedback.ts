import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';
import { FeedbackSeverity } from '../enums/feedback-severity.enum';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
@ObjectType()
export class EvaluationFeedback {
  @Field(() => AttributeType)
  @Prop({ required: true, type: String, enum: AttributeType })
  attribute: AttributeType;

  @Field(() => FeedbackSeverity)
  @Prop({ required: true, type: String, enum: FeedbackSeverity })
  severity: FeedbackSeverity;

  @Field()
  @Prop({ required: true })
  message: string;

  @Field()
  @Prop({ required: true })
  suggestion: string;
}

export const EvaluationFeedbackSchema =
  SchemaFactory.createForClass(EvaluationFeedback);
export type EvaluationFeedbackDocument = HydratedDocument<EvaluationFeedback>;
