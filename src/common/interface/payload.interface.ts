export interface TokenPayload {
  iat: Date;
  sub: string;
  exp: Date;
  type: 'access' | 'refresh';
  role: 'user' | 'admin';
}
