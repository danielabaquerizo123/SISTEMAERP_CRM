import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { authService } from './authService';

class AuthController extends BaseController {
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await this.execute(req, res, next, () => authService.register(req.body), 'User registered', 201);
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await this.execute(req, res, next, () => authService.login(req.body), 'Login successful');
  };

  profile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await this.execute(req, res, next, () => authService.getProfile(req.user!.userId));
  };
}

export const authController = new AuthController();
