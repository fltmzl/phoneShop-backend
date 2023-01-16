import { sign } from 'jsonwebtoken';

export class RefreshToken {
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  userId: string;
  userAgent: string;
  ipAddress: string;

  sign(): string {
    // return sign({ ...this }, process.env.REFRESH_SECRET);
    return sign({ ...this }, process.env.JWT_SECRET);
  }
}
