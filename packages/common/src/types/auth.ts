import { Request } from 'express';

export interface UserPayload {
  id: number;
  email: string;
  name: string;
}

// Criamos um tipo que estende o Request que for passado para ele
export type AuthRequest<T = Request> = T & {
  user?: UserPayload;
};