import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { UATReportSortField } from '../../enums/uat-report-sort-field.enum';
import { SortDirection } from '../../../common/types';

@InputType()
export class UATReportSortInput {
  @Field(() => UATReportSortField, { nullable: true })
  @IsOptional()
  @IsEnum(UATReportSortField)
  field?: UATReportSortField;

  @Field(() => SortDirection, { nullable: true })
  @IsOptional()
  @IsEnum(SortDirection)
  direction?: SortDirection;
}
