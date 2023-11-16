import { Request, Response } from "express";
import { ItemsListService } from "../../services/item/ItemsListService";

export class ItemsListController {
  async handle(req: Request, res: Response) {
    const itemsListService = new ItemsListService();

    const items = await itemsListService.execute();
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);

  }
}


