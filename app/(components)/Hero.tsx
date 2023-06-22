import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']

export default function Hero() {
    return (
        <div className="bg-white">

            {/* Hero section */}
            <div className="relative bg-gray-900">
                {/* Decorative image and overlay */}
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/hero.jpg"
                        alt="Hero image"
                        className="h-full w-full object-cover object-center"
                        width={2000}
                        height={1000}
                    />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />


                <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">New arrivals are here</h1>
                    <p className="mt-4 text-xl text-white">
                        The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release
                        while they're still in stock.
                    </p>
                    <a
                        href="#"
                        className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                    >
                        Shop New Arrivals
                    </a>
                </div>
            </div>
        </div>


        // <div className="relative overflow-hidden bg-white">
        //     <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        //         <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        //             <div className="sm:max-w-lg">
        //                 <h1 className="font text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
        //                     Best deals for your favorite luxury brands
        //                 </h1>
        //                 <p className="mt-4 text-xl text-gray-800">
        //                     New and authentic luxury brands at up to 80% discount
        //                     directly from the best boutiques in Italy.
        //                 </p>

        //             </div>
        //             <div>
        //                 <div className="mt-10">
        //                     {/* Decorative image grid */}
        //                     <div
        //                         aria-hidden="true"
        //                         className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
        //                     >
        //                         <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
        //                             <div className="flex items-center space-x-6 lg:space-x-8">
        //                                 <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        //                                     <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
        //                                         <Image
        //                                             src="/hero1.jpg"
        //                                             alt=""
        //                                             className="h-full w-full object-cover object-center"
        //                                             width={1000}
        //                                             height={1000}
        //                                         />
        //                                     </div>
        //                                     <div className="h-64 w-44 overflow-hidden rounded-lg">
        //                                         <Image
        //                                             src="/hero2.jpg"
        //                                             alt=""
        //                                             className="h-full w-full object-cover object-center"
        //                                             width={1000}
        //                                             height={1000}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        //                                     <div className="h-64 w-44 overflow-hidden rounded-lg">
        //                                         <Image
        //                                             src="/hero3.jpg"
        //                                             alt=""
        //                                             className="h-full w-full object-cover object-center"
        //                                             width={1000}
        //                                             height={1000}
        //                                         />
        //                                     </div>
        //                                     <div className="h-64 w-44 overflow-hidden rounded-lg">
        //                                         <Image
        //                                             src="/hero4.jpg"
        //                                             alt=""
        //                                             className="h-full w-full object-cover object-center"
        //                                             width={1000}
        //                                             height={1000}
        //                                         />
        //                                     </div>
        //                                     <div className="h-64 w-44 overflow-hidden rounded-lg">
        //                                         <Image
        //                                             src="/hero5.jpg"
        //                                             alt=""
        //                                             className="h-full w-full object-cover object-center"
        //                                             width={1000}
        //                                             height={1000}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        //                                     <div className="h-64 w-44 overflow-hidden rounded-lg">
        //                                         <Image
        //                                             src="/hero6.jpg"
        //                                             alt=""
        //                                             className="h-full w-full object-cover object-center"
        //                                             width={1000}
        //                                             height={1000}
        //                                         />
        //                                     </div>
        //                                     <div className="h-64 w-44 overflow-hidden rounded-lg">
        //                                         <Image
        //                                             src="/hero7.jpg"
        //                                             alt=""
        //                                             className="h-full w-full object-cover object-center"
        //                                             width={1000}
        //                                             height={1000}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>

        //                     <Link
        //                         href="/shop/woman"
        //                         className="inline-block rounded-md border border-transparent bg-gray-900 px-8 py-3 text-center font-medium text-white hover:bg-gray-800"
        //                     >
        //                         Shop Now
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
