'use client';

import { useState } from "react";
import { QuantitySelector } from "../../../../../components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "../../../../../components/product/size-selector/SizeSelector";
import { Product, Size } from "@/interfaces";


interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const handleSizeChange = (size: Size) => {
    setSize(size);
  }

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  }

  const addToCart = () => {
    if (!size) {
      alert('Please select a size');
      return;
    }

    console.log({ size, quantity });
  }

  return (
    <>
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
