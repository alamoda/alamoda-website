'use client'

import { useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { CartItem } from "@/lib"


function getInitialState() {
    const cartItems = localStorage.getItem('cartItems')
    return cartItems ? JSON.parse(cartItems) : []
}

export function CartContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        setCartItems(getInitialState())
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    const addItem = (toAddItem: CartItem) => {

        // If the product is already in cart, we return
        if (cartItems.find(x =>
            (x.product.id === toAddItem.product.id) &&
            (x.size.name === toAddItem.size.name))
        ) {
            return;
        }

        // Otherwise, we add it
        setCartItems((prev: CartItem[]) => [...prev, toAddItem]);
    }

    const removeItem = (productId: string) => {
        setCartItems(cartItems.filter(x => x.product.id !== productId));
    }

    const updateItemQuantity = (index: number, quantity: number) => {
        const updatedItems = cartItems.map((cartItem: CartItem, i: number) => {
            if (i === index) {
                cartItem.quantity = quantity;
                return cartItem;
            }
            return cartItem;
        })
        setCartItems(updatedItems);
    }

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addItem, removeItem, updateItemQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}