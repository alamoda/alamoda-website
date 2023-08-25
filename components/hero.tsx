import Image from "next/image"
import Link from "next/link"

import heroImage from '@/public/hero.webp'

export default function Hero() {

    return (
        <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImage}
            alt="Woman walking down the stairs with designer clothes"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl tracking-tight text-white lg:text-6xl">New arrivals are here</h1>
          <p className="mt-4 text-white">
            The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release
            while they are still in stock.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block border border-transparent bg-white px-8 py-3 font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    )
}