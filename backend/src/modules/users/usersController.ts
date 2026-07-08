import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { usersService } from './usersService';

class UsersController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => usersService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => usersService.findById(Number(req.params.id)));
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => usersService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => usersService.delete(Number(req.params.id)));
  };
}

export const usersController = new UsersController();
