
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

export function signToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

