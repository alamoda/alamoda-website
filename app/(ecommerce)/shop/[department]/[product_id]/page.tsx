'use client'

import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Disclosure, RadioGroup } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeAmericasIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Breadcrumb from '@/app/(components)/Breadcrumb'
import { Product, Route, Size } from '@/app/(types)'

const product_fake = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    // More sections...
  ],
}
const policies = [
  { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

async function getProductData(productId: string) {

  const res = await fetch(`http://localhost:3000/api/product?id=${productId}`, {
    cache: 'no-store',
    method: 'GET'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return await res.json();
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default async function Page({ params }: { params: { product_id: string } }) {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const product: Product = await getProductData(params.product_id);

  const breadcrumb: Route[] = [
    {
      name: 'Shop',
      href: 'shop'
    },
    {
      name: product.department.name,
      href: `shop/${product.department.slug}`
    },
  ];

  if (product.category) {
    breadcrumb.push({
      name: product.category.name,
      href: `shop/${product.department.slug}?category=${product.category.slug}`
    })
  }

  if (product.category && product.subcategory) {
    breadcrumb.push({
      name: product.subcategory.name,
      href: `shop/${product.department.slug}?category=${product.category.slug}&subcategories=${product.subcategory.slug}`
    })
  }

  return (
    <>
      
      {/* TITLE */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* BREADCRUMBS */}
        <Breadcrumb routes={breadcrumb} />

      </div>

      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    <span className="capitalize">{product.name}</span> by <span className="capitalize">{product.brand.name.toLowerCase()}</span>
                  </h1>
                  <p className="text-xl font-medium text-red-700">
                    <span className="text-gray-600 line-through mr-2">USD {Math.round(product.price * 1.6)}</span>USD {Math.round(product.price)}
                  </p>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  {product.images.map((image: string, imgeIdx: number) => (
                    <img
                      key={image}
                      src={image}
                      alt={product.description}
                      className={classNames(
                        imgeIdx === 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                        'rounded-lg'
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                <form>

                  {/* Size picker */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">Size</h2>
                      <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        See sizing chart
                      </a>
                    </div>

                    <RadioGroup value="test" onChange={() => console.log("lol")} className="mt-2">
                      <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {product.sizes.map((size: Size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size.variant_id}
                            className={({ active, checked }) =>
                              classNames(
                                // size.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                                active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                                checked
                                  ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                                  : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                                'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                              )
                            }
                            // disabled={!size.inStock}
                          >
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </form>

                {/* Product details */}
                {product.description &&
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Description</h2>

                    <div
                      className="prose prose-sm mt-4 text-gray-500">
                      {product.description.replace("&amp;", "&")}
                    </div>

                  </div>
                }
                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>

                  <div className="divide-y divide-gray-200 border-t">
                    {product_fake.details.map((detail) => (
                      <Disclosure as="div" key={detail.name}>
                        {({ open }) => (
                          <>
                            <h3>
                              <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                <span
                                  className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                                >
                                  {detail.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                              <ul role="list">
                                {detail.items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </section>

                {/* <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <ul role="list">
                      {product.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div> */}

                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-10">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>

                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {policies.map((policy) => (
                      <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                        <dt>
                          <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}