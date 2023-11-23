import { Request, Response } from "express";
import { DeleteNeighborhoodService } from "../../services/neighborhoods/deleteNeighborhoodService";

export class DeleteNeighborhoodController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; 
    const deleteNeighborhoodService = new DeleteNeighborhoodService();

    try {
      const deleteNeighborhood = await deleteNeighborhoodService.execute(id);

      return res.status(200).json({ message: "Neighborhoods deleted", deleteNeighborhood });

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
