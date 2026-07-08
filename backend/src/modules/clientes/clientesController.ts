import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { clientesService } from './clientesService';

class ClientesController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => clientesService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => clientesService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => clientesService.create(req.body), 'Cliente created', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => clientesService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => clientesService.delete(Number(req.params.id)));
  };
}

export const clientesController = new ClientesController();
