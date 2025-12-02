import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'dev-secret-key',
  expiry: process.env.JWT_EXPIRY || '1h',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-key',
  refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
}));
