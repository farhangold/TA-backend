import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';

@Schema({ _id: false })
@ObjectType()
export class LLMEvaluationError {
  @Field(() => AttributeType)
  @Prop({ required: true, type: String, enum: AttributeType })
  attribute: AttributeType;

  @Field()
  @Prop({ required: true })
  error: string;

  @Field()
  @Prop({ required: true, type: Date })
  timestamp: Date;
}

export const LLMEvaluationErrorSchema =
  SchemaFactory.createForClass(LLMEvaluationError);

