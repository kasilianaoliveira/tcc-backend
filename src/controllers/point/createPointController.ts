import { Request, Response } from "express";
import { CreatePointService } from "../../services/point/createPointService";

export class CreatePointController {
  async handle(req: Request, res: Response) {
    const { name, email, whatsapp, city, uf, items, neighborhoods, userId } = req.body;
    const createPointService = new CreatePointService();

    const file = req.file;
    let image: string | null = null;

    if (file !== undefined) {
      const { filename } = req.file;
      image = filename;
    }
    const point = await createPointService.execute({
      name,
      email,
      image,
      whatsapp,
      city, uf,
      pointItems: items,
      neighborhoods,
      userId
    })

    return res.status(200).json(point);

  }
}
