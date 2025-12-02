import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ReportStatus } from '../../enums/report-status.enum';
import { SeverityLevel } from '../../enums/severity-level.enum';
import { DateRangeInput } from './date-range.input';
import { ScoreRangeInput } from './score-range.input';

@InputType()
export class UATReportFilterInput {
  @Field(() => [ReportStatus], { nullable: true })
  @IsArray()
  @IsEnum(ReportStatus, { each: true })
  @IsOptional()
  status?: ReportStatus[];

  @Field(() => [SeverityLevel], { nullable: true })
  @IsArray()
  @IsEnum(SeverityLevel, { each: true })
  @IsOptional()
  severityLevel?: SeverityLevel[];

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  domain?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  createdBy?: string;

  @Field(() => DateRangeInput, { nullable: true })
  @ValidateNested()
  @Type(() => DateRangeInput)
  @IsOptional()
  dateRange?: DateRangeInput;

  @Field(() => ScoreRangeInput, { nullable: true })
  @ValidateNested()
  @Type(() => ScoreRangeInput)
  @IsOptional()
  scoreRange?: ScoreRangeInput;
}
