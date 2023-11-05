import { Request, Response } from "express";
import { ListPointsUserService } from "../../services/point/listPointUserService";

export class ListPointUserController {
  async handle(req: Request, res: Response) {
    const {id} = req.params;

    const listPointsUserService = new ListPointsUserService();

    const list = await listPointsUserService.execute(id)
    
    return res.json(list);

  }
}

