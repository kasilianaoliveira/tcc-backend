import { prismaClient } from "../../prisma";
import { Point, PointItems } from "../../types/types";

export class CreatePointService {
  async execute({
    name, image, email, whatsapp, latitude, longitude, city, uf, pointItems, neighborhoods, userId }: Point) {

    try {
      const userAlreadyExists = await prismaClient.point.findFirst({
        where: {
          email: email
        }
      })


      if (userAlreadyExists) {
        throw new Error("Email already exists")
      }


      const userIdAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: userId
        }
      })

      if (!userIdAlreadyExists) {
        throw new Error("User does not exist");
      }

      const existingPoint = await prismaClient.point.findFirst({
        where: { userId }
      });
  
      if (existingPoint) {
        throw new Error("User already has a point registered");
      }


      const point = await prismaClient.point.create({
        data: {
          name,
          email,
          whatsapp,
          image: "imagefake.svg",
          latitude,
          longitude,
          city,
          uf,
          userId: userId
        },
      })

      //items
      const point_id = point.id

      const point_items = pointItems.map(item_id => {
        return {
          item_id,
          point_id
        }
      });


      await prismaClient.point_Items.createMany({
        data: point_items as any,
      });


      // //bairros

      const neighborhoodsData = neighborhoods.map(neighborhoodData => ({
        ...neighborhoodData,
        pointId: point_id,
      }));

     await prismaClient.neighborhood.createMany({
        data: neighborhoodsData,
      });


      return {
        point,
        pointItems: point_items,
        neighborhoods: neighborhoodsData,
      };
    } catch (error) {
      throw new Error(error)
    }

  }
}