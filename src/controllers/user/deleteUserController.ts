import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/deleteUserService";


export class DeleteUserController {
  async handle(req: Request, res: Response){
    const { id } = req.params; 
    const deleteUserService = new DeleteUserService();

    try {
      const deletedUser = await deleteUserService.execute(id);

      return res.status(200).json({ message: "User deleted", deletedUser });

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}