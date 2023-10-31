import { prismaClient } from "../src/prisma";


async function main() {
  const itemsData = [
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ];

  for (const item of itemsData) {
    await prismaClient.item.create({
      data: {
        image: item.image,
        title: item.title,
      },
    });
  }

}
main()
