'use client'

import Stripe from "stripe";
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Order } from '@/app/(types)/index';
import { CartContext } from "@/context/CartContext";

export default function Page() {

    const [session, setSession] = useState<Stripe.Checkout.Session | null>();
    const [order, setOrder] = useState<Order | null>()
    const params = useSearchParams();
    const session_id = params.get('session_id');

    const { clearCart } = useContext(CartContext);

    const stripeSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET;

    useEffect(() => {
        if (!session_id) return;
        getSession(session_id);
    }, [session_id])

    async function getSession(sessionId: string) {
        const stripe = new Stripe(process.env.STRIPE_SECRET!, {
            typescript: true,
            apiVersion: "2022-11-15"
        });

        const session = await stripe.checkout.sessions.retrieve(sessionId, { apiKey: stripeSecret }) as Stripe.Checkout.Session;
        setSession(session);

        const orderId = session?.metadata?.orderId;

        if (!orderId) throw new Error('could not find order id');

        fetchOrder(orderId);
    }

    async function fetchOrder(orderId: string) {
        const response = await fetch(`${process.env.MY_URL}api/order?id=${orderId}`, {
            method: 'GET'
        });

        const order = await response.json();
        setOrder(order);

        // Clear the cart
        clearCart();
    }

    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-16 xl:gap-x-24">
                <h1 className="text-sm font-medium text-gray-900">Payment successful</h1>
                <p className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">Thanks for shopping with us!</p>
                <div className="mt-4 text-sm text-gray-800">
                    <p> We appreciate your order, we’re currently processing it. </p>
                    <p> So hang tight and we’ll send you confirmation at {session?.customer_email} very soon! </p>
                </div>
                <ul
                    role="list"
                    className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-800"
                >
                    {order?.cart_products &&
                        order.cart_products.map((product: any, index: number) => (
                            <li key={index} className="flex space-x-6 py-6">
                                <Image
                                    src={product.image || 'https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg'}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                    className="flex-none rounded-md bg-gray-100 object-cover object-center"
                                />
                                <div className="flex-auto space-y-1">
                                    <h3 className="text-gray-900">
                                        <a >{product.name}</a>
                                    </h3>
                                    <p>{product.brand}</p>
                                    <p>{product.size}</p>
                                </div>
                                <p className="flex-none font-medium text-gray-900">${product.price}</p>
                            </li>
                        ))}
                </ul>

                <dl className="space-y-3 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                    <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd className="text-gray-900">${session?.amount_subtotal! / 100}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt>Shipping</dt>
                        <dd className="text-gray-900">${session?.shipping_cost?.amount_total! / 100}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt>Taxes</dt>
                        <dd className="text-gray-900">$0</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-gray-900">
                        <dt className="text-base">Total</dt>
                        <dd className="text-base">${session?.amount_total! / 100}</dd>
                    </div>
                </dl>

                <div className='mt-8 text-sm'>
                    <dt className="font-medium text-gray-900">Shipping Address</dt>
                    <dd className="mt-2">
                        <address className="not-italic">
                            <span className="block">{session?.shipping_details?.name}</span>
                            <span className="block">{session?.shipping_details?.address?.line1}</span>
                            <span className="block">{session?.shipping_details?.address?.city + ", " + session?.shipping_details?.address?.state + " " + session?.shipping_details?.address?.postal_code}</span>
                        </address>
                    </dd>
                </div>

                <div className="mt-8 border-t border-gray-200 py-6 text-right">
                    <a href="/" className="text-sm font-medium text-gray-900 hover:text-gray-800">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    )
}