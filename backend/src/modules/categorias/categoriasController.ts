import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { categoriasService } from './categoriasService';

class CategoriasController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => categoriasService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => categoriasService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => categoriasService.create(req.body), 'Categoria created', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => categoriasService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => categoriasService.delete(Number(req.params.id)));
  };
}

export const categoriasController = new CategoriasController();
