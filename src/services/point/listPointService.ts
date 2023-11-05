import { prismaClient } from "../../prisma";

export class ListPointsService {
  async execute() {

    const points = await prismaClient.point.findMany({
      include: {
        neighborhoods: true,
        pointItems: {
          select: {
            item:true
          }
        },
      },
    });

    return points

  }
}