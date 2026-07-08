import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../../shared/baseController';
import { oportunidadesService } from './oportunidadesService';

class OportunidadesController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => oportunidadesService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => oportunidadesService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => oportunidadesService.create(req.body), 'Oportunidad created', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => oportunidadesService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => oportunidadesService.delete(Number(req.params.id)));
  };
}

export const oportunidadesController = new OportunidadesController();
