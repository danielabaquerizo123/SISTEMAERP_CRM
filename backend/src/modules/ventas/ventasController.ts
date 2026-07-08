import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { ventasService } from './ventasService';

class VentasController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ventasService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ventasService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ventasService.create(req.body), 'Venta created', 201);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ventasService.delete(Number(req.params.id)));
  };
}

export const ventasController = new VentasController();
