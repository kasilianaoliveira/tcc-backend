import { prismaClient } from "../../prisma"

class ItemsListService{
  async execute(){
    const items = await prismaClient.item.findMany();

    return items
  }
}

export { ItemsListService  }