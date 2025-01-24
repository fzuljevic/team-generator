import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create divisions
  const divisions = await Promise.all([
    prisma.division.create({ data: { name: "Division 1" } }),
    prisma.division.create({ data: { name: "Division 2" } }),
    prisma.division.create({ data: { name: "Division 3" } }),
    prisma.division.create({ data: { name: "Division 4" } }),
    prisma.division.create({ data: { name: "Division 5" } }),
  ]);

  // Add players to divisions
  await prisma.player.createMany({
    data: [
      // Division 1
      { name: "Filip", divisionId: divisions[0].id },
      { name: "Blekic", divisionId: divisions[0].id },

      // Division 2
      { name: "Ciko", divisionId: divisions[1].id },
      { name: "Toni", divisionId: divisions[1].id },

      // Division 3
      { name: "Butko", divisionId: divisions[2].id },
      { name: "Milos", divisionId: divisions[2].id },

      // Division 4
      { name: "Rafi", divisionId: divisions[3].id },
      { name: "Ljubo", divisionId: divisions[3].id },

      // Division 5
      { name: "Matija", divisionId: divisions[4].id },
      { name: "Sila", divisionId: divisions[4].id },
      { name: "Ivo", divisionId: divisions[4].id },
      { name: "Sanko", divisionId: divisions[4].id },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
