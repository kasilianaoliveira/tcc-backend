import { Request, Response } from "express";
import { ListNeighborhoodsService } from "../../services/neighborhoods/listNeighborhoodService";

export class ListNeighborhoodController {
  async handle(req: Request, res: Response) {
    const listNeighborhoodsService = new ListNeighborhoodsService();

    const list = await listNeighborhoodsService.execute()

    return res.json(list);

  }
}

