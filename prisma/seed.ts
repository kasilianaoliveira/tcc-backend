import { prismaClient } from "../src/prisma";


async function main() {
  const itemsData = [
    { title: 'Lâmpadas', image: 'lampadas.jpg' },
    { title: 'Pilhas e Baterias', image: 'baterias.jpg' },
    { title: 'Plástico', image: 'plastico.jpg' },

    { title: 'Vidros', image: 'vidro.jpg' },
    { title: 'Metais', image: 'metais.jpg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.jpg' },

    { title: 'Resíduos Eletrônicos', image: 'eletronicos.jpg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.jpg' },
    { title: 'Óleo de Cozinha', image: 'oleo.jpg' },
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
