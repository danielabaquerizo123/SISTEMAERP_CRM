import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../../shared/baseController';
import { cotizacionesService } from './cotizacionesService';

class CotizacionesController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => cotizacionesService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => cotizacionesService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => cotizacionesService.create(req.body), 'Cotizacion created', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => cotizacionesService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => cotizacionesService.delete(Number(req.params.id)));
  };
}

export const cotizacionesController = new CotizacionesController();
