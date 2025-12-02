import { ObjectType, Field, Float } from '@nestjs/graphql';
import { AttributeType } from '../../enums/attribute-type.enum';

@ObjectType()
export class ScoringRuleView {
  @Field()
  _id: string;

  @Field(() => AttributeType)
  attribute: AttributeType;

  @Field()
  description: string;

  @Field()
  criteria: string;

  @Field(() => Float)
  weight: number;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
