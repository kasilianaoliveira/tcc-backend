import { Request, Response } from "express";
import { prismaClient } from "../../prisma";
import { FilterPointsService } from "../../services/point/filterPointsServvice";

export class FilterPointsController {
  async handle(req: Request, res: Response) {
    try {

      const { city, uf, items } = req.query;

      console.log(city, uf, items);


      return res.json({ok: true});
      // const filterPointsService = new FilterPointsService()

      // const points = await filterPointsService.execute({city,uf, items});

      // return res.json(points);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
