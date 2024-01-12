import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {

  // 1. Delete existing data
  await prisma.user.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

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
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()],
      },
    });

    // images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log('Seed executed successfully');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();