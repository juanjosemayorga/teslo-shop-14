import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantity: (product: CartProduct) => void;
  // removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // To review if the product exists with the selected size
        const productInCart = cart.some(
          (item) =>
            item.id === product.id && item.size === product.size
        )

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // The product exists, so we update the quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);