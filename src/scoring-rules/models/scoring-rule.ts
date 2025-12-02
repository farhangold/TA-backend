import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, Float } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';
import { AttributeType } from '../enums/attribute-type.enum';

@Schema({ timestamps: true })
@ObjectType()
export class ScoringRule {
  @Field()
  @Prop({ required: true })
  _id: string;

  @Field(() => AttributeType)
  @Prop({ required: true, type: String, enum: AttributeType, unique: true })
  attribute: AttributeType;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ required: true })
  criteria: string;

  @Field(() => Float)
  @Prop({ required: true })
  weight: number;

  @Field()
  @Prop({ required: true, default: true })
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ScoringRuleDocument = HydratedDocument<ScoringRule>;
export const ScoringRuleSchema = SchemaFactory.createForClass(ScoringRule);

// Create indexes
ScoringRuleSchema.index({ isActive: 1 });
