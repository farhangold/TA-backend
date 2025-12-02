import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsArray,
  IsString,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TestIdentityInput } from './test-identity.input';
import { TestEnvironmentInput } from './test-environment.input';
import { EvidenceInput } from './evidence.input';
import { SeverityLevel } from '../../enums/severity-level.enum';

@InputType()
export class CreateUATReportInput {
  @Field(() => TestIdentityInput)
  @ValidateNested()
  @Type(() => TestIdentityInput)
  testIdentity: TestIdentityInput;

  @Field(() => TestEnvironmentInput)
  @ValidateNested()
  @Type(() => TestEnvironmentInput)
  testEnvironment: TestEnvironmentInput;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  stepsToReproduce: string[];

  @Field()
  @IsString()
  @IsNotEmpty()
  actualResult: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  expectedResult: string;

  @Field(() => [EvidenceInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EvidenceInput)
  @IsOptional()
  supportingEvidence?: EvidenceInput[];

  @Field(() => SeverityLevel)
  @IsEnum(SeverityLevel)
  severityLevel: SeverityLevel;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  domain?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  additionalInfo?: string;
}
