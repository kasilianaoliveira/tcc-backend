import { prismaClient } from "../../prisma";

export class ListPointsUserService {
  async execute(id: string) {

    const user = await prismaClient.point.findFirst({
      where:{
        userId: id
      }
    })

    if(!user){
      throw new Error(`User ${id} not found`)
    }

    const points = await prismaClient.point.findMany({
      where:{
        userId: id
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

    return points

  }
}