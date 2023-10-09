'use client'

import { CartItem } from "@/lib";
import { createContext } from "react"

interface ICartContext {
    loadingCart: boolean;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    addItem: (toAddItem: CartItem) => void
    removeItem: (index: number) => void
    updateItemQuantity: (index: number, quantity: number) => void
    clearCart: () => void
}

export const CartContext = createContext<ICartContext>({
    loadingCart: true,
    cartItems: [],
    setCartItems: () => {},
    addItem: () => {},
    removeItem: () => {},
    updateItemQuantity: () => {},
    clearCart: () => {}
});