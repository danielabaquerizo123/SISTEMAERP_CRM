import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../../shared/baseController';
import { actividadesService } from './actividadesService';

class ActividadesController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => actividadesService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => actividadesService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => actividadesService.create(req.body), 'Actividad created', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => actividadesService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => actividadesService.delete(Number(req.params.id)));
  };
}

export const actividadesController = new ActividadesController();
