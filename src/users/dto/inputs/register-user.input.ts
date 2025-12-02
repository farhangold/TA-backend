import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../enums/user-role.enum';

@InputType()
export class RegisterUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  name: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}
