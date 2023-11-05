import { hash } from "bcryptjs"
import { prismaClient } from "../../prisma"
import { User } from "../../types/types"

export class UpdateUserService {
  async execute({ id, name, email, password }: User) {

    try {

      const existingUser = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new Error(`User with ID ${id} not found`);
      }

      if (email !== existingUser.email) {
        const userWithSameEmail = await prismaClient.user.findFirst({
          where: { email },
        });

        if (userWithSameEmail) {
          throw new Error("Email is already in use by another user");
        }
      }

      const passwordHash = await hash(password, 8)

      await prismaClient.user.update({
        where: { id },
        data: {
          name,
          email,
          password: passwordHash
        }
      })

    } catch (error) {
      throw new Error(error)
    }
  }
}