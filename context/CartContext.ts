'use client'

import { CartProduct } from "@/lib";
import { createContext } from "react"

interface ICartContext {
    cartProducts: CartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    addProduct: (product: CartProduct) => void
    removeProduct: (productId: string) => void
    updateQuantity: (index: number, quantity: number) => void
    clearCart: () => void
}

export const CartContext = createContext<ICartContext>({
    cartProducts: [],
    setCartProducts: () => {},
    addProduct: () => {},
    removeProduct: () => {},
    updateQuantity: () => {},
    clearCart: () => {}
});