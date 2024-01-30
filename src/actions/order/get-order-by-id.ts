'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'You must be logged in to perform this action.'
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) {
      throw `${orderId} not found.`
    }

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw `${orderId} does not belong to the user.`
      }
    }

    return {
      ok: true,
      order
    }
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: 'An error occurred while trying to get the order, speak to the administrator.'
    }
  }
};
