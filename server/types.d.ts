import { Request, Response } from 'express';

interface User {
  id: number;
}

declare global {
  namespace Express {
    export interface Request {
      user: User | null;
    }
  }
}
