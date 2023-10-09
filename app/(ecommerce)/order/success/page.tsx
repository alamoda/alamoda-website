import Stripe from "stripe";
import Image from 'next/image';
import { notFound, useSearchParams } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { Order, Product } from "@prisma/client";
import { getOrder } from "@/app/actions";
import { ProductWithRelations } from "@/lib/db";
import { CartItem } from "@/lib";
import Link from "next/link";
import { ContinueShopping } from "@/components/continue-shopping";
import InvisibleClearCart from "@/components/cart/invisible-clear-cart";

async function getStripeSession(sessionId: string) {

    const stripeSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET;

    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
        typescript: true,
        apiVersion: "2022-11-15"
    });

    return await stripe.checkout.sessions.retrieve(sessionId, { apiKey: stripeSecret }) as Stripe.Checkout.Session;
    // setSession(session);

    // const orderId = session?.metadata?.orderId;

    // if (!orderId) throw new Error('could not find order id');

    // const order = await getOrder(orderId);

    // setCartItems(order.cart_products);
    // setOrder(order);

    // // Clear the cart
    // clearCart();
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const session_id = searchParams["session_id"] as string



    if (!session_id) return notFound();

    const session = await getStripeSession(session_id);

    const orderId = session?.metadata?.orderId;

    if (!orderId) throw new Error('could not find order id');

    const order = await getOrder(orderId);

    const cartItems: CartItem[] = order.cart_products;

    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-16 xl:gap-x-24">
                <h1 className="text-sm font-medium text-gray-900">Payment successful</h1>
                <p className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">Thanks for shopping with us!</p>
                <div className="mt-4 text-sm text-gray-800">
                    <p> We appreciate your order, we’re currently processing it. </p>
                    <p> So hang tight and we’ll send you confirmation at <strong>{session?.customer_email}</strong> very soon! </p>
                </div>
                <ul
                    role="list"
                    className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-800"
                >
                    {cartItems.map((cartItem: CartItem, index: number) => (


                        <li className="flex py-6 sm:py-10 space-x-10">

                            <div className="flex w-20 items-center justify-center overflow-hidden">
                                <Image
                                    className={'relative h-full w-full object-contain'}
                                    alt={cartItem.product.description || (`${cartItem.product.name} - ${cartItem.product.brand.name}`)}
                                    src={(cartItem.product.images as string[])[0]}
                                    width={1000}
                                    height={1333}
                                />
                            </div>

                            <div className="flex flex-1">
                                <div className="w-full relative sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                    <div>
                                        <Link className="group" href={`/product/${cartItem.product.id}`}>
                                            <div className="flex justify-between">
                                                <h3 className="text-sm">
                                                    <p className="font-medium text-gray-700 group-hover:text-gray-900 group-hover:underline">
                                                        {cartItem.product.name}
                                                    </p>
                                                </h3>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <h3 className="text-xs">
                                                    <p className="font-semibold text-gray-700 group-hover:text-gray-900 group-hover:underline">
                                                        {cartItem.product.brand.name}
                                                    </p>
                                                </h3>
                                            </div>
                                        </Link>
                                        <div className="mt-1 flex text-sm">
                                            {cartItem.size ? (
                                                <p className="text-gray-900">{cartItem.size.name}</p>
                                            ) : null}
                                        </div>
                                        <p className="mt-1 text-sm font-medium text-gray-900">${cartItem.product.price}</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                        <div className="absolute right-0 top-0">
                                            <p className="flex-none font-medium text-gray-900">${cartItem.product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                    <ContinueShopping />
                </div>
            </div>

            {/* When loading this page, we clear the current cart.
            Clearing the cart is a client action, but we want this component to be server.
            So we inject this helper component that does not return any html  */}
            <InvisibleClearCart />
        </div>
    )
}