import { prismaClient } from "../../prisma";

export class FilterPointsService {
  async execute({ city, uf, filterRole }) {

    try {
      const cityAlreadyExists = await prismaClient.point.findMany({
        where: {
          city,
        }
      });


      if (!cityAlreadyExists) {
        throw new Error('City not found');
      }

      const ufAlreadyExists = await prismaClient.point.findMany({
        where: {
          uf,
        }
      });

      if (!ufAlreadyExists) {
        throw new Error('UF not found');
      }


      // Verifica se filterRole é uma das roles permitidas
      const rolesPermitidas = ['GARBAGE_COLLECTOR', 'COLLECTION_COMPANY'];

      if (filterRole && filterRole !== 'ALL' && !rolesPermitidas.includes(filterRole)) {
        throw new Error('Role not allowed');
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
          ...(filterRole && filterRole !== 'ALL' && { user: { role: filterRole } }),
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
          image: `https://tccbackend-api.onrender.com/uploads/${point.image}`,
        };
      });


      return serializedPoint

    } catch (error) {
      throw new Error(error)
    }
  }
}
