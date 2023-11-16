import { prismaClient } from "../../prisma";

export class FilterPointsService {
  async execute({ city, uf }) {

    try {
      const cityAlreadyExists = await prismaClient.point.findMany({
        where: {
          city,
        }
      });


      if(!cityAlreadyExists){
        throw new Error('City not found');
      }

      const ufAlreadyExists = await prismaClient.point.findMany({
        where: {
          uf,
        }
      });

      if(!ufAlreadyExists){
        throw new Error('UF not found');
      }


      // const itemsAlreadyExists = await prismaClient.point.findMany({
      //   where: {
      //     pointItems: {
      //       some: {
      //         item_id: {
      //           in: parseditems,
      //         }
      //       }
      //     },
      //   }
      // });

      // if(!itemsAlreadyExists){
      //   throw new Error('Items not found');
      // }

      const points = await prismaClient.point.findMany({
        where: {
          city: city,
          uf: uf,
          // pointItems: {
          //   some: {
          //     item_id: {
          //       in: parseditems,
          //     },
          //   },
          // },
        },
        include: {
          neighborhoods: true,
          pointItems: {
            select: {
              item: true
            }
          },
        },
      });

      const serializedPoint = points.map(point => {
        return {
          ...point,
          image: `http://localhost:3333/uploads/${point.image}`,
        };
      });


      return serializedPoint

    } catch (error) {
      throw new Error(error)
    }
  }
}
