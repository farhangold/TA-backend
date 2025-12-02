/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { User, UserSchema } from '../users/models/user';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret =
          configService.get<string>('jwt.secret') || 'dev-secret-key';
        const expiresIn = configService.get<string>('jwt.expiry') || '1h';

        return {
          secret,
          signOptions: { expiresIn } as any,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, TokenService, JwtStrategy, AuthResolver],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
