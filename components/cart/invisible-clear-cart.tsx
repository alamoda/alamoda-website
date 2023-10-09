'use client'

import { CartContext } from "@/context/CartContext";
import { useContext, useEffect } from "react";

export default function InvisibleClearCart() {

    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        clearCart();
    }, []);

    return null;
}
