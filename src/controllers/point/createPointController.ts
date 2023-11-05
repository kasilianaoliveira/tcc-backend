import { Request, Response } from "express";
import { CreatePointService } from "../../services/point/createPointService";

export class CreatePointController {
  async handle(req: Request, res: Response) {
    const { name, image, email, whatsapp, latitude, longitude, city, uf, items, neighborhoods, userId } = req.body;
    const createPointService = new CreatePointService();

    const point = await createPointService.execute({ 
      name, 
      email, 
      image, 
      whatsapp, 
      latitude, 
      longitude, 
      city, uf,
      pointItems:items, 
      neighborhoods,
      userId
    })

    return res.status(200).json(point);

  }
}

