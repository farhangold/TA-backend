import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '../../enums/user-role.enum';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @Field(() => UserRole, { nullable: true })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
