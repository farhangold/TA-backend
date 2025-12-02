import { InputType, Field } from '@nestjs/graphql';
import {
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
export class UpdateUATReportInput {
  @Field(() => TestIdentityInput, { nullable: true })
  @ValidateNested()
  @Type(() => TestIdentityInput)
  @IsOptional()
  testIdentity?: TestIdentityInput;

  @Field(() => TestEnvironmentInput, { nullable: true })
  @ValidateNested()
  @Type(() => TestEnvironmentInput)
  @IsOptional()
  testEnvironment?: TestEnvironmentInput;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  stepsToReproduce?: string[];

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  actualResult?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  expectedResult?: string;

  @Field(() => [EvidenceInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EvidenceInput)
  @IsOptional()
  supportingEvidence?: EvidenceInput[];

  @Field(() => SeverityLevel, { nullable: true })
  @IsEnum(SeverityLevel)
  @IsOptional()
  severityLevel?: SeverityLevel;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  domain?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  additionalInfo?: string;
}
