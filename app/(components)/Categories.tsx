import Link from "next/link";
import Image from 'next/image';

import womenImage from '@/public/women.webp';
import menImage from '@/public/men.webp';
import lifestyleImage from '@/public/lifestyle.webp';

export default function Categories() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-4xl tracking-tight text-gray-900">Shop Now</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">

          {/* Women */}
          <div className="relative group aspect-h-1 aspect-w-2 overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
            <Image
              src={womenImage}
              alt="Two women wearing designer clothes and posing for the women collection preview"
              className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-500 cursor-pointer"
            />
            <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
            <div className="flex items-end p-6">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="/shop/women">
                    <span className="absolute inset-0" />
                    Women
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>

          {/* Men */}
          <div className="relative group aspect-h-1 aspect-w-2 overflow-hidden">
            <Image
              src={menImage}
              alt="A man laying poolside wearing designer clothes and posing for the men collection preview"
              className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-500 cursor-pointer"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="/shop/men">
                    <span className="absolute inset-0" />
                    Men
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="relative group aspect-h-1 aspect-w-2 overflow-hidden">
            <Image
              src={lifestyleImage}
              alt="Designer towels on a chair poolside for the lifestyl collection preview"
              className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-500 cursor-pointer"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="/shop/lifestyle">
                    <span className="absolute inset-0" />
                    Lifestyle
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* <div className="mt-6 sm:hidden">
          <a href="#" className="block text-sm font-semibold text-gray-900 hover:text-gray-700">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div> */}
      </div>
    </div>
  )
}
