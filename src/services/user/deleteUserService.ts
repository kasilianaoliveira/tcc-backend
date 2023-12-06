import { prismaClient } from "../../prisma"

export class DeleteUserService {
  async execute(id: string) {

    try {

      const existingUser = await prismaClient.user.findUnique({
        where: { id: id },
      });


      if (!existingUser) {
        throw new Error(`User ${id} not found`);
      }


      const userPoints = await prismaClient.point.findFirst({
        where: { userId: id },
        include: {
          neighborhoods: true,
          pointItems: true
        }
      });

      if (userPoints) {
        await prismaClient.neighborhood.deleteMany({
          where: {
            pointId: userPoints.id
          },
        });

        await prismaClient.point_Items.deleteMany({
          where: {
            point_id: userPoints.id
          },
        });

        await prismaClient.point.deleteMany({
          where: { userId: id },
        });

      }


      await prismaClient.user.delete({
        where: { id },
      });



    } catch (error) {
      throw new Error(error)
    }
  }
}
