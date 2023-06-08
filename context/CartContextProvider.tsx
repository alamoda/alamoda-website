'use client'

import { useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { Product } from "@/app/(types)"

function getInitialState() {
    const cartProducts = localStorage.getItem('cartProducts')
    return cartProducts ? JSON.parse(cartProducts) : []
}

export function CartContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    useEffect(() => {
        setCartProducts(getInitialState())
    }, [])

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    }, [cartProducts])

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            {children}
        </CartContext.Provider>
    )
}