'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "../../../../components/product/quantity-selector/QuantitySelector";
import Link from "next/link";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const productsInCart = useCartStore(state => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
          />
          <div>
            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={3}
              onQuantityChange={(quantity) => console.log(quantity)}
            />

            <button className="underline mt-3">Remove</button>
          </div>
        </div>
      ))}
    </>
  );
};
