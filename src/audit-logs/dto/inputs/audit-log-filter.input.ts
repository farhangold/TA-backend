import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AuditAction } from '../../enums/audit-action.enum';
import { AuditEntity } from '../../enums/audit-entity.enum';
import { DateRangeInput } from '../../../uat-reports/dto/inputs/date-range.input';

@InputType()
export class AuditLogFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  userId?: string;

  @Field(() => [AuditAction], { nullable: true })
  @IsArray()
  @IsEnum(AuditAction, { each: true })
  @IsOptional()
  action?: AuditAction[];

  @Field(() => [AuditEntity], { nullable: true })
  @IsArray()
  @IsEnum(AuditEntity, { each: true })
  @IsOptional()
  entity?: AuditEntity[];

  @Field(() => DateRangeInput, { nullable: true })
  @ValidateNested()
  @Type(() => DateRangeInput)
  @IsOptional()
  dateRange?: DateRangeInput;
}
