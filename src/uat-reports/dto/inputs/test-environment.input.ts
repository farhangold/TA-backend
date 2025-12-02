import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class TestEnvironmentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  os: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  browser: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  device: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  additionalInfo?: string;
}
