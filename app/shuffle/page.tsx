import { PrismaClient } from "@prisma/client";
import ShuffleTeams from "./ShuffleTeams";

const prisma = new PrismaClient();

async function getPlayers() {
  const divisions = await prisma.division.findMany({
    include: {
      players: true,
    },
  });
  return divisions;
}

export default async function ShufflePage() {
  const divisions = await getPlayers();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ShuffleTeams divisions={divisions} />
    </main>
  );
}
