import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from './apiResponse';
import { AppError } from './AppError';

export class BaseController {
  protected async execute(
    req: Request,
    res: Response,
    next: NextFunction,
    action: () => Promise<unknown>,
    successMessage = 'Success',
    statusCode = 200
  ): Promise<void> {
    try {
      const result = await action();
      sendSuccess(res, result, successMessage, statusCode);
    } catch (error) {
      if (error instanceof AppError) {
        sendError(res, error.message, error.statusCode);
      } else if (error instanceof Error) {
        sendError(res, error.message, 500);
      } else {
        next(error);
      }
    }
  }
}
