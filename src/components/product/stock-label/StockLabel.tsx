'use client';

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getStock = async (slug: string) => {
    const stock = await getStockBySlug(slug);
    setStock(stock);
    console.log(stock);
  };

  useEffect(() => {
    getStock(slug);
  }, [slug]);

  return (
    <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
      Stock: {stock}
    </h1>
  )
}
