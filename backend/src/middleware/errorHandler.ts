import { Request, Response, NextFunction } from 'express';
import { sendError } from '../shared/apiResponse';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Error:', err.message);
  sendError(res, err.message || 'Internal server error', 500);
};
