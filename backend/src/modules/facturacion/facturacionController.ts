import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { facturacionService } from './facturacionService';

class FacturacionController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => facturacionService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => facturacionService.findById(Number(req.params.id)));
  };

  generate = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => facturacionService.generateFromVenta(req.body), 'Factura generated', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => facturacionService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => facturacionService.delete(Number(req.params.id)));
  };
}

export const facturacionController = new FacturacionController();
