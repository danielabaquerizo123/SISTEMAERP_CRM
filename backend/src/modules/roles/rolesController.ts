import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { rolesService } from './rolesService';

class RolesController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => { await this.execute(req, res, next, () => rolesService.findAll()); };
  findById = async (req: Request, res: Response, next: NextFunction) => { await this.execute(req, res, next, () => rolesService.findById(Number(req.params.id))); };
  create = async (req: Request, res: Response, next: NextFunction) => { await this.execute(req, res, next, () => rolesService.create(req.body), 'Role created', 201); };
  update = async (req: Request, res: Response, next: NextFunction) => { await this.execute(req, res, next, () => rolesService.update(Number(req.params.id), req.body)); };
  delete = async (req: Request, res: Response, next: NextFunction) => { await this.execute(req, res, next, () => rolesService.delete(Number(req.params.id))); };
}

export const rolesController = new RolesController();
