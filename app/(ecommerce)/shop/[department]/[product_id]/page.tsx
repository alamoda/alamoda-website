'use client'

import { useState, useEffect, useContext, Fragment, useRef } from 'react'
import { Dialog, Disclosure, RadioGroup, Transition } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeAmericasIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Feature, Product, Route, Size } from '@/app/(types)'
import Breadcrumb from '@/app/(components)/Breadcrumb'
import Image from 'next/image';
import axios from 'axios'
import { CartContext } from '@/context/CartContext'
import ImageScroll from '@/app/(components)/ImageScroll'

const policies = [
  { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Page({ params }: { params: { product_id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string>();
  const [product, setProduct] = useState<Product>();
  const [currentImage, setCurrentImage] = useState<{ src: string, alt: string } | null>(null)

  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    fetchProduct(params.product_id);
  }, []);

  async function fetchProduct(productId: string) {
    const resProd = await axios.get(`http://localhost:3000/api/product?id=${productId}`);
    setProduct(resProd.data);
  }

  const breadcrumb: Route[] = [];
  if (product) {
    breadcrumb.push(
      {
        name: 'Shop',
        href: 'shop'
      },
      {
        name: product.department.name,
        href: `shop/${product.department.slug}`
      })

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
  }

  const openImageModal = (image: string) => {
    if (!product) return;

    setCurrentImage({ src: image, alt: product.description || product.mongo_id })
  };

  return (
    <>
      <Transition appear show={currentImage != null} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setCurrentImage(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-auto transform overflow-hidden p-6 text-left align-middle transition-all">
                  <Image
                    src={currentImage?.src || ""}
                    width={500}
                    height={500}
                    alt={currentImage?.alt || ""}
                    className="mx-auto min-h-full"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* BREADCRUMBS */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 hidden md:block">
        <Breadcrumb routes={breadcrumb} />
      </div>

      <div className="pt-16 md:pt-0 bg-white">
        <div className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    <span className="capitalize">{product?.name}</span> by <span className="capitalize">{product?.brand.name.toLowerCase()}</span>
                  </h1>
                  <p className="text-xl font-medium text-red-700">
                    <span className="text-gray-600 line-through mr-2">USD {product ? Math.round(product.price * 1.6) : 0}</span>USD {product ? Math.round(product.price) : 0}
                  </p>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                {/* Desktop images */}
                <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8 ">
                  {product?.images.map((image: string, imgeIdx: number) => (
                    <Image
                      onClick={() => openImageModal(image)}
                      key={image}
                      src={image}
                      alt={product.description || product.mongo_id}
                      width={500}
                      height={500}
                      className={classNames(
                        imgeIdx === 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                        'rounded-lg cursor-zoom-in'
                      )}
                    />
                  ))}
                </div>

                {/* Mobile Images */}
                <div className="block md:hidden">
                  <ImageScroll images={product?.images ? product?.images : []} onImageClick={openImageModal} />
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">

                {/* Size picker */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product?.sizes.map((size: Size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size.variant_id}
                          className={({ active, checked }) =>
                            classNames(
                              active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                              checked
                                ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                              'cursor-pointer focus:outline-none flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                            )
                          }
                        >
                          <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  onClick={() => product ? addProduct(product) : null}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>

                {/* Product details */}
                {product?.description &&
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Description</h2>

                    <div
                      className="prose prose-sm mt-4 text-gray-500">
                      {product?.description.replace("&amp;", "&")}
                    </div>

                  </div>
                }
                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>

                  <div className="divide-y divide-gray-200 border-t">

                    <Disclosure as="div" defaultOpen={true}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                              >
                                Features
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
                              {product?.features?.map((feature: Feature) => (
                                <li key={feature.id_feature}>
                                  <span className="capitalize">{feature.name.toLowerCase()}</span>: {feature.value.toUpperCase()}</li>
                              ))}
                              <li>
                                SKU: {product?.sku}
                              </li>
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </section>

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

            {/* You might also like */}
            <div className="pt-16">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>

  )
}