export interface TokenPayload {
  iat: Date;
  id?: number;
  sub?: string;
  exp: Date;
  type: 'access' | 'refresh';
  role: 'user' | 'admin';
}
