import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber, Min, Max } from 'class-validator';

@InputType()
export class ScoreRangeInput {
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(100)
  min: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(100)
  max: number;
}
