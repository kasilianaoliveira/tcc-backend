import { Request, Response } from "express";

import { UpdatePointService } from "../../services/point/updatePointService";

export class UpdatePointController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, whatsapp, email, uf, city } = req.body;

      const updatePointService = new UpdatePointService();

      const file = req.file;
      let image: string | null = null;
  
      if (file !== undefined) {
        const { filename } = req.file;
        image = filename;
      }

      const update = await updatePointService.execute({ id, image, name, whatsapp, email, uf, city });

      return res.json({ message: "Point updated successfully", update });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
