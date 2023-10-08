'use client'

import { createCheckoutLink } from '@/app/actions';
import InputError from '@/components/form/input-error';
import InputText from '@/components/form/input-text';
import PrimaryButton from '@/components/form/primary-button';
import ProductCartEntry from '@/components/product/product-cart-entry';
import { CartContext } from '@/context/CartContext';
import { CartItem } from '@/lib';
import useActionForm from '@/lib/useActionForm';
import { useContext, useState } from 'react';

export type CheckoutSessionSchema = {
  cartItems: CartItem[],
  email: string
}

export default function Page() {

  const [submitError, setSubmitError] = useState<string>();
  const { cartItems } = useContext(CartContext);

  const form = useActionForm<CheckoutSessionSchema, string>({
    cartItems: [],
    email: ''
  });

  const cartPrice = cartItems.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity), 0);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setSubmitError("");

    form.transform((data: CheckoutSessionSchema) => ({
      email: data.email,
      cartItems: cartItems
    }));

    form.submit(createCheckoutLink, {
      onSuccess: (url) => { window.location.replace(url ? url : "#") },
      onError: () => setSubmitError("Error."),
    });
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
              <a href="/shop" className="text-sm font-medium text-gray-900 hover:text-gray-800">
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

              <form onSubmit={submit} className="mt-6">
                <h2 id="summary-heading" className="font-medium text-gray-900 mb-4">
                  Order information
                </h2>

                <InputText
                  name="email"
                  placeholder='Email'
                  value={form.data.email}
                  onChange={e => form.setData("email", e.target.value)}
                />
                <InputError errorMessage={form.errors.email} />

                <PrimaryButton type="submit" className='w-full'>
                  
                  <span>Checkout</span>
                  {form.processing &&
                    <svg className="animate-spin ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                </PrimaryButton>

                <InputError errorMessage={submitError} />
              </form>
              <div className="mt-4">
                <a href="/shop" className="text-sm font-medium text-gray-900 hover:text-gray-800">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </section>
          </div>
        }
      </div>
    </div>
  )
}
