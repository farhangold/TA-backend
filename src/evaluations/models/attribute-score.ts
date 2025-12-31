import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, Float } from '@nestjs/graphql';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';

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
}

export const AttributeScoreSchema =
  SchemaFactory.createForClass(AttributeScore);
