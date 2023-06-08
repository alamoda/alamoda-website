'use client'

import { Product } from "@/app/(types)";
import { createContext } from "react"

interface ICartContext {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const CartContext = createContext<ICartContext>({
    cartProducts: [],
    setCartProducts: () => {}
});