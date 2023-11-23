import { Request, Response } from "express";
import { UpdatePointItemsService } from "../../services/item/updateItemsService";

export class UpdateItemController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { items } = req.body;

      const updateItemsService = new UpdatePointItemsService();

      const update = await updateItemsService.execute({ id, pointItems: items });

      return res.json({ message: "Items updated successfully", update });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
