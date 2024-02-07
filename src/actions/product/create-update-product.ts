'use server';

import { z } from 'zod';
import { Gender } from '@prisma/client';

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.error(productParsed.error);

    return {
      ok: false,
      message: 'Invalid data provided. Please check the fields and try again.'
    };
  }

  console.log(productParsed.data);

  return {
    ok: true,
  }
};
