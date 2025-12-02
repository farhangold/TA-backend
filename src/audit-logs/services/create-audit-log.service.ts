import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { AuditLog, AuditLogDocument } from '../models/audit-log';
import { AuditAction } from '../enums/audit-action.enum';
import { AuditEntity } from '../enums/audit-entity.enum';

@Injectable()
export class CreateAuditLogService {
  constructor(
    @InjectModel(AuditLog.name)
    private auditLogModel: Model<AuditLogDocument>,
  ) {}

  async log(
    userId: string,
    action: AuditAction,
    entity: AuditEntity,
    entityId: string,
    changes?: any,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<void> {
    try {
      await this.auditLogModel.create({
        _id: new ObjectId().toString(),
        user: userId,
        action,
        entity,
        entityId,
        changes,
        ipAddress,
        userAgent,
        timestamp: new Date(),
      });
    } catch (error) {
      // Don't throw errors for audit logging failures
      console.error('Failed to create audit log:', error);
    }
  }
}
