"use server";

import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  ok: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
}

export const registerUser = async ({
  email,
  name,
  password,
}: RegisterUser): Promise<RegisterUserResponse> => {
  try {
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return {
      ok: true,
      user,
      message: "User registered successfully",
    };
  } catch (error: unknown) {
    console.error(error);

    return {
      ok: false,
      message: "There was an error creating the user",
    };
  }
};
