import { prismaClient } from "../../prisma";

export class DeletePointService {
  async execute(pointId: string) {
    try {

      const existingPoint = await prismaClient.point.findUnique({
        where: { id: pointId },
        include: {
          neighborhoods: true,
          pointItems: true
        },
        
      });

      if (!existingPoint) {
        throw new Error("Point not found");
      }

      await prismaClient.point_Items.deleteMany({
        where: {
          point_id:pointId
        },
      });


      await prismaClient.neighborhood.deleteMany({
        where: {
          pointId: pointId,
        },
      });

      const t = await prismaClient.point.delete({
        where: { id: pointId },
      });

      console.log(t);

      return existingPoint;

    } catch (error) {
      throw new Error(error);
    }
  }
}
