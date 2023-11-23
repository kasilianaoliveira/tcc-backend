import { prismaClient } from "../../prisma";

export interface Neighborhood {
  id:string;
  name: string;
  latitude: number;
  longitude: number;
  street?: string;
  daysOfWeek: string[];
}


export class UpdateNeighborhoodService {
  async execute({id, name,daysOfWeek, latitude, longitude, street}) {

    try {
      const existingNeighborhood = await prismaClient.neighborhood.findUnique({
        where: { id },
      });

      if (!existingNeighborhood) {
        throw new Error("Neighborhood not found");
      }

      const updatedData = {
        name: name !== undefined ? name : existingNeighborhood.name,
        daysOfWeek: daysOfWeek !== undefined ? daysOfWeek : existingNeighborhood.daysOfWeek,
        latitude: latitude !== undefined ? latitude : existingNeighborhood.latitude,
        longitude: longitude !== undefined ? longitude : existingNeighborhood.longitude,
        street: street !== undefined ? street : existingNeighborhood.street,
      };

      await prismaClient.neighborhood.update({
        where: {
          id: id,
        },
        data: updatedData,
      });

    } catch (error) {
      throw new Error(error);
    }

  }
} 