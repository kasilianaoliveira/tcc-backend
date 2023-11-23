import { prismaClient } from "../../prisma";

export class UpdatePointItemsService {
  async execute({ id, pointItems }: { id: string; pointItems: string[] }) {
    try {
      // const existingPoint = await prismaClient.point.findUnique({
      //   where: { id },
      //   include: {
      //     pointItems: {
      //       select: {
      //         item: true
      //       }
      //     }
      //   },
      // });
      const existingItems = await prismaClient.point_Items.findMany({
        where: {
          point_id: id,
        },
      });
  
      const existingItemIds = existingItems.map(item => item.item_id);

      const itemsToRemove = existingItemIds.filter(itemId => !pointItems.includes(itemId));
      
      const updatedPointItems = await prismaClient.point_Items.createMany({
        data: pointItems.map(item_id => ({
          item_id,
          point_id: id,
        })),
      });

      return updatedPointItems;

    } catch (error) {
      throw new Error(error);
    }
  }
}