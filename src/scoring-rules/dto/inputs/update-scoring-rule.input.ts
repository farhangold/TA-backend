import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { AttributeType } from '../../enums/attribute-type.enum';

@InputType()
export class UpdateScoringRuleInput {
  @Field(() => AttributeType)
  @IsEnum(AttributeType)
  attribute: AttributeType;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  weight?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  criteria?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}
