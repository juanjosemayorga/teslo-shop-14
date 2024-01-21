'use server'

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

interface LoginUser {
  email: string;
  password: string;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';
  } catch (error) {
    console.log({ error });
    return 'CredentialsSignin'
  }
}

export const login = async ({ email, password }: LoginUser) => {
  try {
    await signIn('credentials', { email, password });
    return { ok: true };
  } catch (error: unknown) {
    console.error(error);
    return {
      ok: false,
      message: 'There was an error logging in',
    }
  }
}
