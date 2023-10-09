'use client'

import CartOrderSummary from '@/components/cart/cart-order-summary';
import ItemsInCart from '@/components/cart/items-in-cart';
import { ContinueShopping } from '@/components/continue-shopping';
import CartSkeleton from '@/components/skeleton/cart-skeleton';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import { useContext } from 'react';

export default function Page() {

  const { loadingCart, cartItems } = useContext(CartContext);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-4xl tracking-tight text-gray-900 capitalize">Shopping Cart</h1>
      {loadingCart ? (
        <CartSkeleton />
      ) :
        (
          <>
            {cartItems.length == 0 &&
              <div className='pt-8 text-sm'>
                <div>
                  Your shopping cart is currently empty
                </div>
                <div className="mt-2">
                  <ContinueShopping />
                </div>
              </div>
            }
            {cartItems.length > 0 &&
              <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <ItemsInCart cartItems={cartItems} />
                <CartOrderSummary cartItems={cartItems} />
              </div>
            }
          </>
        )}
    </div>
  )
}
