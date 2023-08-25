
import Image from 'next/image';
import Link from 'next/link';
import Faqs from '../(components)/Faqs';
import BrandLogos from '../(components)/BrandLogos';
import Testimonials from '../(components)/Testimonials';
import InstagramFeed from '../(components)/InstagramFeed';
import Newsletter from '../(components)/Newsletter';
import ProductListPreview from '../(components)/ProductListPreview';
import InstagramFeedSkeleton from '../(components)/skeletons/InstagramFeedSkeleton';
import { Suspense } from 'react';
import { prepareProductQueryFilters } from '../(utils)/helpers';


// Static Images
import heroImage from '@/public/hero.webp'
import womenImage from '@/public/women.webp';
import menImage from '@/public/men.webp';
import lifestyleImage from '@/public/lifestyle.webp';
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

export default async function Home() {
  return (
    <div className="bg-white">

      {/* Hero Section */}
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

      {/* Brand Logos Section */}
      <BrandLogos />

      {/* Categories Section */}
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
      </div>

      {/* New Arrivals Section */}
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <ProductListPreview
          queryFilters={prepareProductQueryFilters({
            statuses: [2],
            available: true,
          })}
          take={4}
          productBaseURL={'/shop'}
          collectionTitle='New Arrivals'
          collectionURL={`/shop`}
        />
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Incentives Section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
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

      {/* Newsletter Section */}
      <Newsletter />

      {/* Frequently Asked Questions Section */}
      <Faqs />

      {/* Instagram Feed Section */}
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className="text-4xl tracking-tight text-gray-900">Follow <a className="hover:text-gray-700" href="https://www.instagram.com/alamodainc/">@alamodainc</a></h2>

        <Suspense fallback={<InstagramFeedSkeleton limit={4} />}>
          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {/* @ts-expect-error Server Component */}
            <InstagramFeed limit={4} />
          </div>
        </Suspense>

      </div>

    </div>
  )
}
