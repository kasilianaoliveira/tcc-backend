import { prismaClient } from "../../prisma";

export class DeleteNeighborhoodService {
  async execute(id: string) {

    try {
      const existingNeighborhood = await prismaClient.neighborhood.findUnique({
        where: { id },
        include: {
          point:true
        },
      });

      if (!existingNeighborhood) {
        throw new Error("Neighborhood not found");
      }

      const pointId = existingNeighborhood.pointId;

      const numberOfNeighborhoods = await prismaClient.neighborhood.count({
        where: {
          pointId: pointId,
        },
      });


      if (numberOfNeighborhoods === 1) {
        throw new Error("Cannot delete the only neighborhood in the point");
      }

      await prismaClient.neighborhood.delete({
        where: {
          id: id,
        },
      });
      
    } catch (error) {
      throw new Error(error);
    }

  }
} 