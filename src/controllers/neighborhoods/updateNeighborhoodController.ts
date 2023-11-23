import { Request, Response } from "express";

import { UpdateNeighborhoodService } from "../../services/neighborhoods/updateNeighborhoodService";

export class UpdateNeighborhoodController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, street, latitude, longitude, daysOfWeek } = req.body;

      const updateNeighborhoodService = new UpdateNeighborhoodService();

      const update = await updateNeighborhoodService.execute({id, name, daysOfWeek, latitude, longitude, street});

      return res.json({ message: "Neighborhood updated successfully", update });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
