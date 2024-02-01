'use server';

import prisma from "@/lib/prisma";

export const setTransactionId = async(orderId: string, transactionId: string) => {

  try {
    const order = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        transactionId: transactionId
      }
    });

    if (!order) {
      return {
        ok: false,
        message: `Order with id ${orderId} not found`
      }
    }

    return  {
      ok: true,
      message: 'Transaction id set'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error setting transaction id'
    }
  }
};
