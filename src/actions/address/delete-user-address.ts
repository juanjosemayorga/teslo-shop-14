'use server';

import prisma from "@/lib/prisma";

export const deleteUserAddress = async(userId: string) => {
  try {
    const deletedAddress = await prisma.userAddress.delete({
      where: { userId }
    });

    return {
      ok: true,
      address: deletedAddress
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      error: 'Error deleting user address'
    }
  }
};
