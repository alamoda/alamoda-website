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
        console.log("called use effect");
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    }, [cartProducts])

    const addProduct = (product: Product) => {
        setCartProducts((prev: Product[]) => [...prev, product]);
    }

    const removeProduct = (productId: string) => {
        const index = cartProducts.findIndex(x => x.mongo_id === productId);
        const updatedProducts = [...cartProducts]
        updatedProducts.splice(index, 1);
        setCartProducts(updatedProducts);
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct }}>
            {children}
        </CartContext.Provider>
    )
}