import { Request, Response } from "express";
import { prismaClient } from "../../prisma";

export class FilterPointsService{
  async execute({ city, uf, items }) {
    try {

      const points = await prismaClient.point.findMany({
        where: {
          city: city,
          uf: uf,
          pointItems: {
            some: {
              item_id: {
                in: items,
              },
            },
          },
        },
        include: {
          neighborhoods: true,
          pointItems: {
            select:{
              item:true
            }
          },
        },
      });

      return points
    } catch (error) {
      throw new Error(error)
    }
  }
}
