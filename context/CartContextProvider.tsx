'use client'

import { useState } from "react"
import { CartContext } from "./CartContext"
import { Product } from "@/app/(types)"


export function CartContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [products, setProducts] = useState<Product[]>([])

    return (
        <CartContext.Provider value={{ products }}>
            { children }
        </CartContext.Provider>
    )
}