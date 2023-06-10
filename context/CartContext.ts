'use client'

import { CartProduct } from "@/app/(types)";
import { createContext } from "react"

interface ICartContext {
    cartProducts: CartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    addProduct: (product: CartProduct) => void
    removeProduct: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
    cartProducts: [],
    setCartProducts: () => {},
    addProduct: () => {},
    removeProduct: () => {}
});