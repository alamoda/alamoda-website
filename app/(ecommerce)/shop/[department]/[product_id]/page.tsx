'use client'

import { useState, useEffect, useContext, Fragment } from 'react'
import { Dialog, Disclosure, RadioGroup, Transition, Tab } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeAmericasIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Feature, Product, Route, Size } from '@/app/(types)'
import Breadcrumb from '@/app/(components)/Breadcrumb'
import Image from 'next/image';
import axios from 'axios'
import { CartContext } from '@/context/CartContext'
import ImageScroll from '@/app/(components)/ImageScroll'
import { useRouter } from 'next/navigation'
import ProductList from '@/app/(components)/ProductList'

const policies = [
  { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Page({ params }: { params: { product_id: string } }) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [product, setProduct] = useState<Product>();
  const [subcategoryProducts, setSubcategoryProducts] = useState<Product[]>();
  const [brandProducts, setBrandProducts] = useState<Product[]>();

  const [currentImage, setCurrentImage] = useState<{ src: string, alt: string } | null>(null)
  const [showError, setShowError] = useState(false);

  const { addProduct } = useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    fetchProduct(params.product_id);
  }, []);

  useEffect(() => {
    if (product) fetchRecommendations();
  }, [product]);

  async function fetchProduct(productId: string) {
    const response = await fetch(`http://localhost:3000/api/product?id=${productId}`);
    const resProd = await response.json();
    setProduct(resProd);
  }

  async function fetchRecommendations() {
    setSubcategoryProducts(await fetchSubcategoryProducts());
    setBrandProducts(await fetchBrandProducts());
  };

  async function fetchSubcategoryProducts() {

    const url = new URL("http://localhost:3000/api/products");
    const params = new URLSearchParams();

    if (product?.department) params.append("department", product?.department.slug);
    if (product?.category) params.append("category", product?.category.slug);
    if (product?.subcategory) params.append("subcategories", product?.subcategory.slug);
    if (product?.mongo_id) params.append("exclude", product?.mongo_id)

    params.append("limit", "4");
    params.append("status-min", "1");
    params.append("available", "true");
    params.append("order", "new-in");

    url.search = params.toString();

    const response = await fetch(url.toString());

    return (await response.json()).products;
  };

  async function fetchBrandProducts() {
    const url = new URL("http://localhost:3000/api/products");
    const params = new URLSearchParams();

    if (product?.department) params.append("department", product?.department.slug);

    if (product?.brand) params.append("brands", product?.brand.slug);
    if (product?.mongo_id) params.append("exclude", product?.mongo_id)

    params.append("limit", "4");
    params.append("status-min", "1");
    params.append("available", "true")
    params.append("order", "new-in")

    url.search = params.toString();

    const response = await fetch(url.toString());

    return (await response.json()).products;
  };

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

  const handleAddToCart = () => {
    if (product && selectedSize) {
      console.log(selectedSize);
      addProduct({ product, size: selectedSize, quantity: 1 });
      router.push('/cart');
    } else if (product && !selectedSize) {
      setShowError(true);
    }
  }

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

            {/* Main Container */}
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">

              {/* Title */}
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    <span className="capitalize">{product?.name}</span> by <span className="capitalize">{product?.brand.name.toLowerCase()}</span>
                  </h1>
                  <p className="text-xl font-medium text-red-700">
                    <span className="text-gray-600 line-through mr-2">${product ? Math.round(product.price * 1.6) : 0}</span>${product ? Math.round(product.price) : 0}
                  </p>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                {/* Desktop images */}
                <Tab.Group as="div" className="hidden md:flex flex-col-reverse">
                  {/* Image selector */}
                  <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                      {product?.images.map((image: string, imageIdx: number) => (
                        <Tab
                          key={imageIdx}
                          className="relative flex aspect-h-13 aspect-w-10 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="sr-only">{product.name}</span>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                                <img src={image} alt="" className="h-full w-full object-cover object-center" />
                              </span>
                              <span
                                className={classNames(
                                  selected ? 'ring-indigo-500' : 'ring-transparent',
                                  'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>

                  <Tab.Panels className="aspect-h-13 aspect-w-10 w-full">
                    {product?.images.map((image: string, imageIdx: number) => (
                      <Tab.Panel key={imageIdx}>
                        <Image
                          onClick={() => openImageModal(image)}
                          key={image}
                          src={image}
                          alt={product.description || product.mongo_id}
                          width={1000}
                          height={1333}
                          className="h-full w-full object-cover object-center sm:rounded-lg"
                        />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                {/* Mobile Images */}
                <div className="block md:hidden">
                  <ImageScroll images={product?.images ? product?.images : []} onImageClick={openImageModal} alt={product?.name ? product?.name : ""}/>
                </div>
              </div>

              {/* Product info */}
              <div className="mt-8 lg:col-span-5">

                {/* Size picker */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={(size: Size) => {
                      setSelectedSize(size);
                      setShowError(false);
                    }}
                    className="mt-2">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product?.sizes.map((size: Size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              checked
                                ? 'border-transparent bg-gray-900 text-white hover:bg-gray-800'
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
                  onClick={handleAddToCart}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
                >
                  Add to cart
                </button>

                {showError &&
                  <p className='text-red-500 text-sm mt-2'>
                    You need to select a size first
                  </p>
                }

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
                                className={classNames(open ? 'text-gray-800' : 'text-gray-900', 'text-sm font-medium')}
                              >
                                Features
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-gray-900 group-hover:text-gray-800"
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
            {(subcategoryProducts && subcategoryProducts?.length > 0) &&
              <div className="pt-16 md:pt-32">
                <ProductList
                  listName="You might also like"
                  listUrl={`shop/${product?.department.slug}?category=${product?.category.slug}${product?.subcategory ? "&subcategories="+product?.subcategory.slug : ""}`}
                  products={subcategoryProducts || []}
                />
              </div>
            }

            {/* More from brand */}
            {(brandProducts && brandProducts?.length > 0) &&
              <div className="pt-16 md:pt-32">
                <ProductList
                  listName={`More from ${product?.brand.name.toLowerCase()}`}
                  listUrl={`shop/${product?.department.slug}?brands=${product?.brand.slug}`}
                  products={brandProducts || []}
                />
              </div>
            }
          </div>
        </div>
      </div>
    </>

  )
}