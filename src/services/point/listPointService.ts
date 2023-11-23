import { prismaClient } from "../../prisma";

export class ListPointsService {
  async execute() {

    const points = await prismaClient.point.findMany({
      include: {
        neighborhoods: true,
        pointItems: {
          include:{
            item:{
              select: {
                title:true
              }
            }
          }
        },
      },
    });

    const serializedPoint = points.map(point => {
      return {
        ...point,
        image: `https://tccbackend-api.onrender.com/uploads/${point.image}`,
      };
    });

    return serializedPoint

  }
}