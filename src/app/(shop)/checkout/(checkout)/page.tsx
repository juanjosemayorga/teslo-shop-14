import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust your order</span>
            <Link href="/cart" className="underline mb-5">
              Edit order
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">José Mayorga</p>
              <p>Calle el banano #134</p>
              <p>Col. Centro</p>
              <p>San Pedro</p>
              <p>Monterrey</p>
              <p>CP 12312</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

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
              {/* Disclaimer */}

              <p className="mb-5">
                <span className="text-xs">
                  By placing your order, you agree to our {" "}
                  <Link href="/terms-and-conditions" className="underline">
                    Terms and Conditions
                  </Link>
                </span>
              </p>

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123">
                  Place order
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}