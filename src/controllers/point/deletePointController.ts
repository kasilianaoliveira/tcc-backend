import { Request, Response } from "express";
import { DeletePointService } from "../../services/point/deletePointService";

export class DeletePointController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; 
    const deletePointService = new DeletePointService();

    try {
      const deletedPoint = await deletePointService.execute(id);

      return res.status(200).json({ message: "Point and associated neighborhoods deleted", deletedPoint });

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
