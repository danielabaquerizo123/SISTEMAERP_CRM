import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { comprasService } from './comprasService';

class ComprasController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => comprasService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => comprasService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => comprasService.create(req.body), 'Compra created', 201);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => comprasService.delete(Number(req.params.id)));
  };
}

export const comprasController = new ComprasController();
