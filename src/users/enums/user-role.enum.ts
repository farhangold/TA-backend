import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER',
  VIEWER = 'VIEWER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles in the system',
});
