'use client'

import InputError from '@/components/form/input-error';
import InputText from '@/components/form/input-text';
import ProductCartEntry from '@/components/product/product-cart-entry';
import { CartContext } from '@/context/CartContext';
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import { useContext, useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);

  const { cartItems, removeItem, updateItemQuantity } = useContext(CartContext);

  const cartPrice = cartItems.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity), 0);

  async function goToPayment() {
    if (!email) {
      setEmailError(true);
      return;
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        cartItems,
        email
      })
    })

    if (!response.ok) {
      console.error("Error in checkout!");
      return
    }

    const data = await response.json();

    if (data) {
      window.location = data;
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl tracking-tight text-gray-900 capitalize">Shopping Cart</h1>
        {cartItems.length == 0 &&
          <div className='pt-8 text-sm'>
            <div>
              Your shopping cart is currently empty
            </div>
            <div className="mt-2">
              <a href="/" className="text-sm font-medium text-gray-900 hover:text-gray-800">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        }
        {cartItems.length > 0 &&
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {cartItems.map((cartItem, index) => (
                  <ProductCartEntry key={cartItem.product.id + cartItem.size.name} cartItem={cartItem} cartIndex={index} />
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="font-medium text-gray-900">
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
                    {/* <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how shipping is calculated</span>
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a> */}
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$30</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    {/* <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how tax is calculated</span>
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a> */}
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$0</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${cartPrice + 30}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <h2 id="summary-heading" className="font-medium text-gray-900 mb-4">
                  Order information
                </h2>

                <InputText
                  name="email"
                  placeholder='Email'
                  value={"test"}
                  onChange={e => console.log(e)}
                />

                <InputError errorMessage={"You need to enter your email"} />

                <button
                  onClick={goToPayment}
                  className="w-full mt-4 border border-transparent bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none"
                >
                  Checkout
                </button>
                <div className="mt-4">
                  <a href="/" className="text-sm font-medium text-gray-900 hover:text-gray-800">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        }
      </div>
    </div>
  )
}
