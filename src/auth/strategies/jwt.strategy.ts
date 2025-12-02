import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import { GetUserService } from '../../users/services/get-user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private getUserService: GetUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('jwt.secret') || 'dev-secret-key',
    });
  }

  async validate(payload: any) {
    const user = await this.getUserService.findById(payload.sub);
    if (!user) {
      throw new ThrowGQL('Invalid token', GQLThrowType.NOT_AUTHORIZED);
    }
    return user;
  }
}
