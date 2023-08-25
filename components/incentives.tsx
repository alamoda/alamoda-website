import Image from "next/image"
import Link from "next/link"

import incentivesImage from '@/public/incentives.webp'

const incentives = [
    {
        name: 'Free shipping',
        imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
        description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    },
    {
        name: '10-year warranty',
        imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
        description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
    },
    {
        name: 'Exchanges',
        imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
        description:
            "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
    },
]

export default function Incentives() {

    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl sm:px-2 lg:px-4 py-24">
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                    <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
                        <div>
                            <h2 className="text-4xl tracking-tight text-gray-900">
                                We built our business on great customer service
                            </h2>
                            <p className="mt-4 text-gray-800">
                                At the beginning at least, but then we realized we could make a lot more money if we kinda stopped
                                caring about that. Our new strategy is to write a bunch of things that look really good in the
                                headlines, then clarify in the small print but hope people don&apos;t actually read it.
                            </p>
                            <Link
                                href="/about"
                                className="mt-8 inline-block border border-transparent bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
                            >
                                About Us
                            </Link>
                        </div>
                        <div className="relative aspect-h-2 aspect-w-3 overflow-hidden bg-gray-100">
                            <Image
                                src={incentivesImage}
                                alt="Women designer clothes on a hanger"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        {incentives.map((incentive) => (
                            <div key={incentive.name} className="sm:flex lg:block">
                                <div className="sm:flex-shrink-0">
                                    <img
                                        className="h-10 w-10"
                                        src={incentive.imageSrc}
                                        alt={incentive.name}
                                    />
                                </div>
                                <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                                    <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                                    <p className="mt-2 text-sm text-gray-800">{incentive.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}