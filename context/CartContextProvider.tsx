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
        console.log("updating local storage")
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    }, [cartProducts])

    const addProduct = (product: CartProduct) => {
        if (cartProducts.find(x =>
            x.product.mongo_id === product.product.mongo_id && x.size.name === product.size.name)) {
            return;
        }
        setCartProducts((prev: CartProduct[]) => [...prev, product]);
    }

    const removeProduct = (productId: string) => {
        setCartProducts(cartProducts.filter(x => x.product.mongo_id !== productId));
    }

    const updateQuantity = (index: number, quantity: number) => {
        const updatedProducts = cartProducts.map((product: CartProduct, i: number) => {
            if (i === index) {
                product.quantity = quantity;
                return product;
            }
            return product;
        })
        setCartProducts(updatedProducts);
    }

    const clearCart = () => {
        console.log("called");
        
        setCartProducts([]);
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}