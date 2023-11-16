import { prismaClient } from '../../prisma';
import { Point } from '../../types/types';

interface PointUpdate {
  id: string;
  name?: string;
  image?: string | null;
  email?: string;
  whatsapp?: string;
  city?: string;
  uf?: string;
}

export class UpdatePointService {
  async execute({ id, name, email, image, whatsapp, city, uf }: PointUpdate) {
    try {

      const currentPoint = await prismaClient.point.findUnique({
        where: { id },
      });

      if (!currentPoint) {
        throw new Error('Point not found');
      }

      if (email) {
        const existingPointWithEmail = await prismaClient.point.findFirst({
          where: { email, id: { not: id } },
        });

        if (existingPointWithEmail) {
          throw new Error('Email is already in use by another point');
        }
      }

      if (whatsapp) {
        const whatsappPointWithEmail = await prismaClient.point.findFirst({
          where: { whatsapp, id: { not: id } },
        });

        if (whatsappPointWithEmail) {
          throw new Error('Whatsapp is already in use by another point');
        }
      }


      const updatedData: Record<string, any> = {
        name: name !== undefined ? name : currentPoint.name,
        email: email !== undefined ? email : currentPoint.email,
        image: image !== undefined ? image : currentPoint.image,
        whatsapp: whatsapp !== undefined ? whatsapp : currentPoint.whatsapp,
        city: city !== undefined ? city : currentPoint.city,
        uf: uf !== undefined ? uf : currentPoint.uf,
      };

  
      const updatedPoint = await prismaClient.point.update({
        where: { id },
        data: updatedData,
      });

      return updatedPoint

    } catch (error) {
      throw new Error(error);
    }
  }
}
