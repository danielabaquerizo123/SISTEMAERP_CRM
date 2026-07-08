import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { dashboardService } from './dashboardService';

class DashboardController extends BaseController {
  getGeneral = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => dashboardService.getGeneralMetrics());
  };

  getSales = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => dashboardService.getSalesMetrics());
  };

  getInventory = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => dashboardService.getInventoryMetrics());
  };

  getCRM = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => dashboardService.getCRMMetrics());
  };
}

export const dashboardController = new DashboardController();
