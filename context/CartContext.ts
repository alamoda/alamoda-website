'use client'

import { CartItem } from "@/lib";
import { createContext } from "react"

interface ICartContext {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    addItem: (toAddItem: CartItem) => void
    removeItem: (productId: string) => void
    updateItemQuantity: (index: number, quantity: number) => void
    clearCart: () => void
}

export const CartContext = createContext<ICartContext>({
    cartItems: [],
    setCartItems: () => {},
    addItem: () => {},
    removeItem: () => {},
    updateItemQuantity: () => {},
    clearCart: () => {}
});