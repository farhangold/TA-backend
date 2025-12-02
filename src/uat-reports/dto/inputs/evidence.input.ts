import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { EvidenceType } from '../../enums/evidence-type.enum';

@InputType()
export class EvidenceInput {
  @Field(() => EvidenceType)
  @IsEnum(EvidenceType)
  type: EvidenceType;

  @Field()
  @IsString()
  @IsNotEmpty()
  url: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}
