'use client';

import { useState } from "react";
import { QuantitySelector } from "../../../../../components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "../../../../../components/product/size-selector/SizeSelector";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";


interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const handleSizeChange = (size: Size) => {
    setSize(size);
  }

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  }

  const addToCart = () => {
    setPosted(true);

    if (!size) {
      return;
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0]
    }

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  }

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          You must select a size before adding to cart*
        </span>
      )}

      {/* Size Selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={handleSizeChange}
      />

      {/* Amount Selector */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        // maxQuantity={product.quantity}
      />

      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5">Add to Cart</button>
    </>
  );
};
