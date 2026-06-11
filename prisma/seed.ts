import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.place.createMany({
    data: [
      {
        name: "Charyn Canyon",
        description: "Grand canyon of Kazakhstan",
        lat: 43.3521,
        lng: 79.0605,
      },
      {
        name: "Kolsai Lakes",
        description: "Beautiful mountain lakes",
        lat: 42.9774,
        lng: 78.3136,
      },
      {
        name: "Bozzhyra",
        description: "Alien landscapes of Mangystau",
        lat: 44.5569,
        lng: 52.1472,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });