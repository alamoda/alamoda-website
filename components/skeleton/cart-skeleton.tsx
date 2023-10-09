export default function CartSkeleton() {

    return (
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">

            {/* Cart Items */}
            <div className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                    {Array.from(Array(3).keys()).map(x => (
                        <li key={x} className="flex py-6 sm:py-10 space-x-10">

                            <div className="flex w-20 h-28 items-center justify-center overflow-hidden bg-gray-100 animate-pulse" />

                            <div className="flex flex-1">
                                <div className="w-full relative sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                    <div>
                                        <div className="h-6 w-36 bg-gray-100 animate-pulse" />
                                        <div className="mt-1 h-6 w-24 bg-gray-100 animate-pulse" />
                                        <div className="mt-1 flex h-4 w-8 bg-gray-100 animate-pulse" />
                                        <div className="mt-1 h-4 w-8 bg-gray-100 animate-pulse" />
                                    </div>

                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                        <div className="h-6 w-20 bg-gray-100 animate-pulse" />
                                        <div className="absolute right-0 top-0 h-5 w-5 bg-gray-100 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Order Summary */}
            <div
                className="mt-16 bg-gray-100 animate-pulse h-80 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8" />
        </div>
    )
}
