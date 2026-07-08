import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../../shared/baseController';
import { ticketsService } from './ticketsService';

class TicketsController extends BaseController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ticketsService.findAll());
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ticketsService.findById(Number(req.params.id)));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ticketsService.create(req.body), 'Ticket created', 201);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ticketsService.update(Number(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.execute(req, res, next, () => ticketsService.delete(Number(req.params.id)));
  };
}

export const ticketsController = new TicketsController();
