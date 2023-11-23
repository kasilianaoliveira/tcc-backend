import { prismaClient } from "../../prisma";

export class ListPointsUserService {
  async execute(id: string) {

    const pointId = await prismaClient.point.findFirst({
      where:{
        userId: id
      }
    })


    if(!pointId){
      throw new Error(`Point not found`)
    }

    const point = await prismaClient.point.findFirst({
      where:{
        userId: id,
      },
      include: {
        neighborhoods: true,
        pointItems: {
          select: {
            item:true
          }
        },
      },
    });


    const serializedPoint = {
      ...point,
      image: `https://tccbackend-api.onrender.com/uploads/${point.image}`,
      pointItems: point.pointItems.map((pointItem) => ({
        item: {
          id: pointItem.item.id,
          title: pointItem.item.title,
          image_url: `https://tccbackend-api.onrender.com/uploads/${pointItem.item.image}`,
        },
      })),
    };


    return serializedPoint

  }
}