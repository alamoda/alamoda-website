'use client'

import PrimaryInput from '@/app/(components)/PrimaryInput';
import { CartContext } from '@/context/CartContext';
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);

  const { cartProducts, removeProduct, updateQuantity } = useContext(CartContext);

  const cartPrice = cartProducts.reduce((sum, cartProduct) => sum + (cartProduct.product.price * cartProduct.quantity), 0);

  async function goToPayment() {
    if (!email) {
      setEmailError(true);
      return;
    }

    const res = await axios.post('/api/checkout', {
      cartProducts,
      email
    });

    if (res.data) {
      window.location = res.data;
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">Shopping Cart</h1>
        {cartProducts.length == 0 &&
          <div className='pt-8 text-sm'>
            <div>
              Your shopping cart is currently empty
            </div>
            <div className="pt-2 underline">
              <Link href="/">
                continue shopping
              </Link>
            </div>
          </div>
        }
        {cartProducts.length > 0 &&
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {cartProducts.map((cartProduct, index) => (
                  <li key={cartProduct.product.mongo_id + cartProduct.size.name} className="flex items-center py-6 sm:py-10">
                    <div className="">
                      <Image
                        src={cartProduct.product.images[0]}
                        alt={cartProduct.product.mongo_id}
                        width={200}
                        height={200}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <p className="font-medium text-gray-700 hover:text-gray-800">
                                {cartProduct.product.name}
                              </p>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{cartProduct.product.department.name}</p>
                            {cartProduct.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{cartProduct.size.name}</p>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">${cartProduct.product.price}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label htmlFor={`quantity-${index}`} className="sr-only">
                            Quantity, {cartProduct.product.name}
                          </label>
                          <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateQuantity(index, Number(e.target.value))}
                            value={cartProduct.quantity}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm sm:text-sm"
                          >
                            {Array.from({ length: Number(cartProduct.size.quantity) }, (_, index) => (
                              <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                          </select>

                          <div className="absolute right-0 top-0">
                            <button onClick={() => removeProduct(cartProduct.product.mongo_id)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Remove</span>
                              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      )}

                      <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
                    </p> */}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${cartPrice}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how shipping is calculated</span>
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$30</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how tax is calculated</span>
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$0</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${cartPrice + 30}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                  Order information
                </h2>
                <PrimaryInput
                  value={email}
                  label="Email"
                  name="email"
                  placeholder='email'
                  onChangeMethod={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                      setEmailError(false);
                    }
                  }
                />
                {emailError &&
                  <p className='text-red-500 text-sm mt-2'>
                    You need to enter your email
                  </p>
                }
                <button
                  onClick={goToPayment}
                  className="w-full mt-4 rounded-md border border-transparent bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none"
                >
                  Checkout
                </button>
                <div className="pt-2 underline text-sm">
                  <Link href="/">
                    continue shopping
                  </Link>
                </div>
              </div>
            </section>
          </div>
        }
      </div>
    </div>
  )
}
