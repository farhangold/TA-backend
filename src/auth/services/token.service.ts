import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAccessToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    // Use default secret and expiresIn from module config
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    const secret =
      this.configService.get<string>('jwt.refreshSecret') ||
      'dev-refresh-secret-key';
    const expiresIn =
      this.configService.get<string>('jwt.refreshExpiry') || '7d';
    return this.jwtService.sign(payload, { secret, expiresIn } as any);
  }

  verifyRefreshToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret:
          this.configService.get<string>('jwt.refreshSecret') ||
          'dev-refresh-secret-key',
      });
    } catch {
      return null;
    }
  }
}
