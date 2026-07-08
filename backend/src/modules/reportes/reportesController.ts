import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { reportesService } from './reportesService';

class ReportesController extends BaseController {
  getVentas = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => reportesService.getVentasReport(req.body));
  };

  getCompras = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => reportesService.getComprasReport(req.body));
  };

  getInventario = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => reportesService.getInventarioReport(req.body));
  };

  getCRM = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => reportesService.getCRMReport(req.body));
  };
}

export const reportesController = new ReportesController();
