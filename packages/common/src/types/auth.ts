import { Request } from 'express';

export interface UserPayload {
  id: number;
  email: string;
  name: string;
}

export type AuthRequest<T = Request> = T & {
  user?: UserPayload;
};