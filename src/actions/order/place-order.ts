'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  const session = await auth();
  const userId = session?.user?.id;

  // Check if there is a user logged in
  if (!userId) {
    return {
      ok: false,
      message: 'There is no user logged in',
    }
  }

  // Get the products information
  // Note: we can take more thant two products with the same id
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(p => p.productId),
      }
    }
  });

  // Calculate the total price
  const itemsInOrder = productIds.reduce((acc, curr) => acc + curr.quantity, 0);

  // Totals of tax, subtotal and total
  

};
