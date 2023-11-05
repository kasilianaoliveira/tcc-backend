import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/updateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updateUserService = new UpdateUserService();

      await updateUserService.execute({ id, name, email, password });

      return res.json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
