import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Title } from "@/components";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/ProductsInCart";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CartPage() {

  // redirect('/empty');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items to your cart</span>
            <Link href="/shop" className="underline mb-5">
              Continue shopping
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Summary</h2>

            <div className="grid grid-cols-2">
              <span>No. products</span>
              <span className="text-right">3 products</span>

              <span>Subtotal</span>
              <span className="text-right">$ 123.00</span>

              <span>Tax (16%)</span>
              <span className="text-right">$ 0.00</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$ 123.00</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address">
                Checkout
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}