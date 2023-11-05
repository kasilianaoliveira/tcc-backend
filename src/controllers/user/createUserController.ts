import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/createUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, role, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      role,
      email,
      password
    });

    return res.json(user)
  }
}