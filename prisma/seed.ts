// opends ./data/bills.json and seeds the database with the data

import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function seed() {
  const bills = JSON.parse(fs.readFileSync('./data/bills.json', 'utf-8'));

  for (const bill of bills) {
    await prisma.bill.create({
      data: {
      },
    });
  }
}

await seed()