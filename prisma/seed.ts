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

  // Add players to divisions (roughly distributed by skill level)
  await prisma.player.createMany({
    data: [
      // Division 1 (Top rated players)
      { name: "Filip", rating: 9, divisionId: divisions[0].id },
      { name: "Blekic", rating: 9, divisionId: divisions[0].id },

      // Division 2
      { name: "Ciko", rating: 8, divisionId: divisions[1].id },
      { name: "Toni", rating: 8, divisionId: divisions[1].id },

      // Division 3
      { name: "Butko", rating: 7, divisionId: divisions[2].id },
      { name: "Milos", rating: 7, divisionId: divisions[2].id },

      // Division 4
      { name: "Rafi", rating: 6, divisionId: divisions[3].id },
      { name: "Ljubo", rating: 6, divisionId: divisions[3].id },
      { name: "Matija", rating: 6, divisionId: divisions[3].id },

      // Division 5
      { name: "Sila", rating: 5, divisionId: divisions[4].id },
      { name: "Ivo", rating: 5, divisionId: divisions[4].id },
      { name: "Sanko", rating: 5, divisionId: divisions[4].id },
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
