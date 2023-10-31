import { Request, Response } from "express";
import { ListPointsService } from "../../services/point/listPointService";

export class ListPointController {
  async handle(req: Request, res: Response) {
    const listPointsService = new ListPointsService();

    const list = await listPointsService.execute()

    return res.json(list);

  }
}

