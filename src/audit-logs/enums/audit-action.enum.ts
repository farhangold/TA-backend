import { registerEnumType } from '@nestjs/graphql';

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  EVALUATE = 'EVALUATE',
  EXPORT = 'EXPORT',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CONFIG_CHANGE = 'CONFIG_CHANGE',
}

registerEnumType(AuditAction, {
  name: 'AuditAction',
  description: 'Type of action performed',
});
