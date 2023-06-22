'use client'

import { useState } from 'react'
import ProductList from '@/app/(components)/ProductList'

const offers = [
    { name: 'Download the app', description: 'Get an exclusive $5 off code', href: '#' },
    { name: "Return when you're ready", description: '60 days of free returns', href: '#' },
    { name: 'Sign up for our newsletter', description: '15% off your first order', href: '#' },
]
const trendingProducts = [
    {
        id: 1,
        name: 'Machined Pen',
        color: 'Black',
        price: '$35',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
        imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
        availableColors: [
            { name: 'Black', colorBg: '#111827' },
            { name: 'Brass', colorBg: '#FDE68A' },
            { name: 'Chrome', colorBg: '#E5E7EB' },
        ],
    },
    // More products...
]
const collections = [
    {
        name: 'Desk and Office',
        description: 'Work from home accessories',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
    },
    {
        name: 'Self-Improvement',
        description: 'Journals and note-taking',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
    },
    {
        name: 'Travel',
        description: 'Daily commute essentials',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
    },
]
const testimonials = [
    {
        id: 1,
        quote:
            'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
        attribution: 'Sarah Peters, New Orleans',
    },
    {
        id: 2,
        quote:
            'I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!',
        attribution: 'Kelly McPherson, Chicago',
    },
    {
        id: 3,
        quote:
            'Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.',
        attribution: 'Chris Paul, Phoenix',
    },
]
const footerNavigation = {
    products: [
        { name: 'Bags', href: '#' },
        { name: 'Tees', href: '#' },
        { name: 'Objects', href: '#' },
        { name: 'Home Goods', href: '#' },
        { name: 'Accessories', href: '#' },
    ],
    customerService: [
        { name: 'Contact', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Returns', href: '#' },
        { name: 'Warranty', href: '#' },
        { name: 'Secure Payments', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    legal: [
        { name: 'Terms of Service', href: '#' },
        { name: 'Return Policy', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Shipping Policy', href: '#' },
    ],
    bottomLinks: [
        { name: 'Accessibility', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
    ],
}

const perks = [
    {
        name: 'Free returns',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
        description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
    },
    {
        name: 'Same day delivery',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
        description:
            'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
    },
    {
        name: 'All year discount',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
        description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
    },
    {
        name: 'For the planet',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
        description: 'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
    },
]


export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">

            <main>
                {/* Hero section */}
                <div className="relative">
                    {/* Background image and overlap */}
                    <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
                        <div className="relative w-full flex-1 bg-gray-800">
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gray-900 opacity-50" />
                        </div>
                        <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
                    </div>

                    <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
                        {/* Background image and overlap */}
                        <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
                            <div className="relative w-full flex-1 bg-gray-800">
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                                        alt=""
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gray-900 opacity-50" />
                            </div>
                            <div className="h-48 w-full bg-white" />
                        </div>
                        <div className="relative py-32">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Mid-Season Sale</h1>
                            <div className="mt-4 sm:mt-6">
                                <a
                                    href="#"
                                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                                >
                                    Shop Collection
                                </a>
                            </div>
                        </div>
                    </div>

                    <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
                        <h2 id="collection-heading" className="sr-only">
                            Collections
                        </h2>
                        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
                            {collections.map((collection) => (
                                <div
                                    key={collection.name}
                                    className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
                                >
                                    <div>
                                        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                                            <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                                                <img
                                                    src={collection.imageSrc}
                                                    alt={collection.imageAlt}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                                        </div>
                                        <div className="absolute inset-0 flex items-end rounded-lg p-6">
                                            <div>
                                                <p aria-hidden="true" className="text-sm text-white">
                                                    Shop the collection
                                                </p>
                                                <h3 className="mt-1 font-semibold text-white">
                                                    <a href={collection.href}>
                                                        <span className="absolute inset-0" />
                                                        {collection.name}
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Preview */}
                <section aria-labelledby="trending-heading">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">


                        <div className="">
                            {/* @ts-expect-error Server Component */}
                            <ProductList
                                listTitle="New in for Women"
                                filterParams={new URLSearchParams({
                                    department: "women",
                                })}
                                listUrl={`shop/women`}
                            />
                        </div>

                        <div className="py-24 sm:py-32">
                            {/* @ts-expect-error Server Component */}
                            <ProductList
                                listTitle="New in for Men"
                                filterParams={new URLSearchParams({
                                    department: "men",
                                })}
                                listUrl={`shop/men`}
                            />
                        </div>

                        <div className="">
                            {/* @ts-expect-error Server Component */}
                            <ProductList
                                listTitle="New in for Lifestyle"
                                filterParams={new URLSearchParams({
                                    department: "lifestyle",
                                })}
                                listUrl={`shop/lifestyle`}
                            />
                        </div>
                    </div>
                </section>

                {/* Sale and testimonials */}
                <div className="relative overflow-hidden">
                    {/* Decorative background image and gradient */}
                    <div aria-hidden="true" className="absolute inset-0">
                        <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="absolute inset-0 bg-white bg-opacity-75" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
                    </div>

                    {/* Sale */}
                    <section
                        aria-labelledby="sale-heading"
                        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
                    >
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                Get 25% off during our one-time sale
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
                                Most of our products are limited releases that won't come back. Get your favorite items while they're in
                                stock.
                            </p>
                            <a
                                href="#"
                                className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
                            >
                                Get access to our one-time sale
                            </a>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section
                        aria-labelledby="testimonial-heading"
                        className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
                    >
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <h2 id="testimonial-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                                What are people saying?
                            </h2>

                            <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                                {testimonials.map((testimonial) => (
                                    <blockquote key={testimonial.id} className="sm:flex lg:block">
                                        <svg
                                            width={24}
                                            height={18}
                                            viewBox="0 0 24 18"
                                            aria-hidden="true"
                                            className="flex-shrink-0 text-gray-300"
                                        >
                                            <path
                                                d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                                            <p className="text-lg text-gray-600">{testimonial.quote}</p>
                                            <cite className="mt-4 block font-semibold not-italic text-gray-900">
                                                {testimonial.attribution}
                                            </cite>
                                        </div>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}