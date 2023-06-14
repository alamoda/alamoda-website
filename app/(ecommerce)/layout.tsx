import { CartContextProvider } from "@/context/CartContextProvider"
import Footer from "../(components)/Footer"
import Header from "../(components)/Header"

export default function Layout({children,}: {children: React.ReactNode,}) {

    //console.log("\n\n" + params.department)
    return (
        <>
            <CartContextProvider>
                <Header />
                {children}
                <Footer />
            </CartContextProvider>
        </>
    )
}
