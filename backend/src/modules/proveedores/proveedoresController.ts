import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { proveedoresService } from './proveedoresService';

class ProveedoresController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => proveedoresService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => proveedoresService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => proveedoresService.create(req.body), 'Proveedor created', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => proveedoresService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => proveedoresService.delete(Number(req.params.id)));
  };
}

export const proveedoresController = new ProveedoresController();
