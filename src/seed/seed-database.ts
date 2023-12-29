import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {

  // 1. Delete existing data
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;

  // Categories
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDb = await prisma.category.findMany();
  const categoriesMap = categoriesDb.reduce((acc, category) => {
    acc[category.name.toLowerCase()] = category.id;
    return acc;
  }, {} as Record<string, string>); // <string=shirt, string=categoryId>

  // Products


  console.log('Seed executed successfully');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();