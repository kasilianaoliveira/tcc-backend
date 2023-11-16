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

      if (email && email !== existingUser.email) {
        const userWithSameEmail = await prismaClient.user.findFirst({
          where: { email },
        });

        if (userWithSameEmail) {
          throw new Error("Email is already in use by another user");
        }
      }

      if (password) {
        const passwordHash = await hash(password, 8)

        const response = await prismaClient.user.update({
          where: { id },
          data: {
            name: name !== undefined ? name : existingUser.name,
            email: email !== undefined ? email : existingUser.email,
            password: passwordHash
          }
        })

        return response
      } else {
         const updateResponse = await prismaClient.user.update({
          where: { id },
          data: {
            name: name !== undefined ? name : existingUser.name,
            email: email !== undefined ? email : existingUser.email,
          },
        });

        return updateResponse
      }


    } catch (error) {
      throw new Error(error)
    }
  }
}