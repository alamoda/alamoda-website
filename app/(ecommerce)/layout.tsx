'use client'

import EcommerceNavbar from "@/components/layout/ecommerce-navbar"
import Footer from "@/components/layout/footer"
import { CartContextProvider } from "@/context/CartContextProvider"
import { Suspense } from "react"

export default function Layout({ children, }: { children: React.ReactNode }) {

    return (
        <>
            <CartContextProvider>
                <EcommerceNavbar />
                <Suspense>
                    {children}
                </Suspense>
                <Footer />
            </CartContextProvider>
        </>
    )
}
