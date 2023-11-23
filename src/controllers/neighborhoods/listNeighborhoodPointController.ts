import { Request, Response } from "express";
import { ListNeighborhoodsPointService } from "../../services/neighborhoods/listNeighborhoodPointService";

export class ListNeighborhoodPointController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; 

    const listNeighborhoodsPointService = new ListNeighborhoodsPointService();

    const list = await listNeighborhoodsPointService.execute(id)

    return res.json(list);

  }
}

