import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from './models/audit-log';
import { User, UserSchema } from '../users/models/user';
import { CreateAuditLogService } from './services/create-audit-log.service';
import { GetAuditLogsService } from './services/get-audit-logs.service';
import { AuditLogsResolver } from './audit-logs.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuditLog.name, schema: AuditLogSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [CreateAuditLogService, GetAuditLogsService, AuditLogsResolver],
  exports: [CreateAuditLogService],
})
export class AuditLogsModule {}
