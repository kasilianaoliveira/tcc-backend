import { Request, Response } from "express";
import { ListPlacesService } from "../../services/places/listPlacesService";

export class listPlacesController {
  async handle(req: Request, res: Response) {
    try {

      const { city, uf } = req.query;

      const listPlacesService = new ListPlacesService()
      const apiKey = process.env.API_KEY
      const places = await listPlacesService.execute({apiKey, city, uf});

      return res.json(places);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
