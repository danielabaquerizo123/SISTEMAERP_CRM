import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { productosService } from './productosService';

class ProductosController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => productosService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => productosService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => productosService.create(req.body), 'Producto created', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => productosService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => productosService.delete(Number(req.params.id)));
  };
}

export const productosController = new ProductosController();
