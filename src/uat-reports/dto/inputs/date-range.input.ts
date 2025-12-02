import { InputType, Field } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class DateRangeInput {
  @Field()
  @IsDate()
  @Type(() => Date)
  from: Date;

  @Field()
  @IsDate()
  @Type(() => Date)
  to: Date;
}
