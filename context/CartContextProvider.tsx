'use client'

import { useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { CartItem } from "@/lib"


export function CartContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [loadingCart, setLoadingCart] = useState<boolean>(true);

    const getInitialCartItems = async () => {
        setLoadingCart(true);
        const retreivedItems = localStorage.getItem('cartItems')
        const parsedItems: CartItem[] = retreivedItems ? await JSON.parse(retreivedItems) : [];
        if (parsedItems.length > 0) {
            setCartItems([...cartItems, ...parsedItems]);
        }
        setLoadingCart(false);
    }

    useEffect(() => {
        getInitialCartItems();
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

    const removeItem = (index: number) => {
        if (index >= 0 && index < cartItems.length) {
            const updatedCartItems = [...cartItems];  // Create a copy of cartItems
            updatedCartItems.splice(index, 1);       // Apply splice on the copy
            setCartItems(updatedCartItems);          // Update the state with the modified copy
        }
    }

    const updateItemQuantity = (index: number, quantity: number) => {
        const updatedItems = cartItems.map((cartItem: CartItem, i: number) => {
            if (i === index) {
                cartItem.quantity = quantity;
                return cartItem;
            }
            return cartItem;
        });
        setCartItems(updatedItems);
    }

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ loadingCart, cartItems, setCartItems, addItem, removeItem, updateItemQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}