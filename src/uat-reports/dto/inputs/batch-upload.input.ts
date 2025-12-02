import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { BatchFormat } from '../../enums/batch-format.enum';

@InputType()
export class BatchUploadInput {
  @Field(() => BatchFormat)
  @IsEnum(BatchFormat)
  format: BatchFormat;

  @Field()
  @IsString()
  @IsNotEmpty()
  data: string;
}
