'use client'

import { CartContextProvider } from "@/context/CartContextProvider"
import Footer from "../(components)/Footer"
import Header from "../(components)/Header"

export default function Layout({ children, }: { children: React.ReactNode }) {

    // const [navigation, setNavigation] = useState<Navigation>({ departments: [], pages: [] });

    // async function getNavigation() {

    //     const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/departments?available=true`, {
    //         method: 'GET'
    //     });

    //     if (!res.ok) {
    //         return;
    //     }

    //     const departmenets: Department[] = await res.json();

    //     setNavigation({
    //         departments: departmenets.sort((a: Department, b: Department) => a.order - b.order),
    //         pages: [
    //             { name: 'About Alamoda', href: '/about' },
    //         ]
    //     });
    // }

    // useEffect(() => {
    //     getNavigation();
    // }, []);

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
