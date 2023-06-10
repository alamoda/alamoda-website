'use client'

import { useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { CartProduct } from "@/app/(types)"

function getInitialState() {
    const cartProducts = localStorage.getItem('cartProducts')
    return cartProducts ? JSON.parse(cartProducts) : []
}

export function CartContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

    useEffect(() => {
        setCartProducts(getInitialState())
    }, [])

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    }, [cartProducts])

    const addProduct = (product: CartProduct) => {
        if(cartProducts.find(x => x.product.mongo_id === product.product.mongo_id && x.size.name === product.size.name)) {
            return;
        }
        setCartProducts((prev: CartProduct[]) => [...prev, product]);
    }

    const removeProduct = (productId: string) => {
        const index = cartProducts.findIndex(x => x.product.mongo_id === productId);
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