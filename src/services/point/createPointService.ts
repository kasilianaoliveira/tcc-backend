import { prismaClient } from "../../prisma";
export interface Point {
  name: string;
  image: string | null;
  email: string | null;
  whatsapp: string;
  city: string;
  uf: string;
  pointItems: string;
  neighborhoods:string;
  userId: string;
}

interface Neighborhood {
  name: string;
  latitude: number;
  longitude: number;
  daysOfWeek: string[];
  pointId: string;
}

export interface Item {
  id: string;
  image: string;
  title: string;
  pointItems: PointItems[];
}

export interface PointItems {
  point_id: string;
  item_id: string;
}


export class CreatePointService {
  async execute({
    name, image, email, whatsapp, city, uf, pointItems, neighborhoods, userId }: Point) {


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

      const whatsappAlreadyExists = await prismaClient.point.findFirst({
        where: {
          whatsapp: whatsapp
        }
      })

      if (whatsappAlreadyExists) {
        throw new Error("Whatsapp already has a point registered");
      }


      const point = await prismaClient.point.create({
        data: {
          name,
          email,
          whatsapp,
          image,
          city,
          uf,
          userId: userId
        },
      })

      // items
      const point_id = point.id;

      const itemIdsArray = pointItems.split(',').map(item => item.trim());

      const point_items = itemIdsArray.map(item_id => {
        return {
          item_id,
          point_id
        }
      });


      await prismaClient.point_Items.createMany({
        data: point_items as any,
      });



      
      // //bairros
      const neighborhoodArray: Neighborhood[] = JSON.parse(neighborhoods);

      const neighborhoodsData = neighborhoodArray.map(neighborhoodData => ({
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
      console.log(error)
      throw new Error(error)
    }

  }
}