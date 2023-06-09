'use client'

import { Product } from "@/app/(types)";
import { createContext } from "react"

interface ICartContext {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    addProduct: (product: Product) => void
    removeProduct: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
    cartProducts: [],
    setCartProducts: () => {},
    addProduct: () => {},
    removeProduct: () => {}
});