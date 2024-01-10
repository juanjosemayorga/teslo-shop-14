import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SummaryInformation = {
  subTotal: number;
  tax: number;
  total: number;
  itemsInCart: number;
};

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => SummaryInformation;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce((acc, item) => {
          return acc + item.quantity * item.price;
        }, 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;

        const itemsInCart = cart.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
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
      updateProductQuantity(product, quantity) {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity,
            };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },
      removeProduct(product) {
        const { cart } = get();

        const updatedCartProducts = cart.filter(
          (item) =>
            item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);