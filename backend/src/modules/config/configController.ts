import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/baseController';
import { configService } from './configService';

class ConfigController extends BaseController {
  get = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => configService.getConfig());
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => configService.updateConfig(req.body));
  };
}

export const configController = new ConfigController();
