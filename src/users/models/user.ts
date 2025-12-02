import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, HideField } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../enums/user-role.enum';

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field()
  @Prop({ required: true })
  _id: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @HideField()
  @Prop({ required: true })
  password: string;

  @Field(() => UserRole)
  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.VIEWER,
  })
  role: UserRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
