"use client"

import { Product } from "@/app/(types)";
import { createContext } from "react"

interface IProductContext {
    products: Product[];
}

export const CartContext = createContext<IProductContext>({
    products: []
});