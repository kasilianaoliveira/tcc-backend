import { prismaClient } from "../../prisma";

export class ListNeighborhoodsService {
  async execute() {

    const points = await prismaClient.neighborhood.findMany({
      include: {
        point:true
      },
    });

    return points

  }
}