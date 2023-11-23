import { prismaClient } from "../../prisma";

export class ListNeighborhoodsPointService {
  async execute(pointId:string) {

    const neighborhoods = await prismaClient.neighborhood.findMany({
      where: {
        pointId: pointId,
      },
    });

    return neighborhoods;

  }
}