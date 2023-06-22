import Link from "next/link";
import Image from "next/image";


export default function Page() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <h1 className="font text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                            Welcome to Alamoda!
                        </h1>
                        <p className="mt-4 text-xl text-gray-800">
                            Alamoda is the premier platform for exploring 1000+ of the finest luxury brands at unbeatable prices.
                        </p>

                    </div>
                    <div>
                        <div className="mt-10">
                            {/* Decorative image grid */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                            >
                                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                <Image
                                                    src="/hero1.jpg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                    width={1000}
                                                    height={1000}
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/hero2.jpg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                    width={1000}
                                                    height={1000}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/hero3.jpg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                    width={1000}
                                                    height={1000}
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/hero4.jpg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                    width={1000}
                                                    height={1000}
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/hero5.jpg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                    width={1000}
                                                    height={1000}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/hero6.jpg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                    width={1000}
                                                    height={1000}
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <Image
                                                    src="/hero7.jpg"
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                    width={1000}
                                                    height={1000}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/shop/woman"
                                className="inline-block rounded-md border border-transparent bg-gray-900 px-8 py-3 text-center font-medium text-white hover:bg-gray-800"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}