'use client'

import { useState } from "react"
import { CartContext } from "./CartContext"
import { Product } from "@/app/(types)"

export function CartContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            {children}
        </CartContext.Provider>
    )
}