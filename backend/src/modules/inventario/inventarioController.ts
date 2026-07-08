import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { inventarioService } from './inventarioService';

class InventarioController extends BaseController {
  getStock = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => inventarioService.getStockAll());
  };

  getStockByProducto = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => inventarioService.getStockByProducto(Number(req.params.productoId)));
  };

  getMovements = async (req: Request, res: Response, next: NextFunction) => {
    const productoId = req.query.productoId ? Number(req.query.productoId) : undefined;
    await this.execute(req, res, next, () => inventarioService.getMovements(productoId));
  };

  registerMovement = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => inventarioService.registerMovement(req.body), 'Movement registered', 201);
  };
}

export const inventarioController = new InventarioController();
