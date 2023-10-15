'use client'
import { CartItem } from '@/lib';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import { createCheckoutLink } from '@/app/actions';
import useActionForm from '@/lib/useActionForm';
import InputText from '../form/input-text';
import InputError from '../form/input-error';
import PrimaryButton from '../form/primary-button';
import { LoadingSpinner } from '../loading-spinner';
import { ContinueShopping } from '../continue-shopping';

export type CheckoutSessionSchema = {
    cartItems: CartItem[],
    email: string
}

export default function CartOrderSummary({ cartItems }: { cartItems: CartItem[] }) {

    const [submitError, setSubmitError] = useState<string>();

    const { removeItem, updateItemQuantity } = useContext(CartContext);

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
                        {/* <Link href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Learn more about how shipping is calculated</span>
                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </Link> */}
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">$30</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                        <span>Tax estimate</span>
                        {/* <Link href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Learn more about how tax is calculated</span>
                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </Link> */}
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
                    {form.processing && <LoadingSpinner className='ml-3' />}
                </PrimaryButton>

                <InputError errorMessage={submitError} />
            </form>
            <div className="mt-4">
                <ContinueShopping />
            </div>
        </section>
    )
}
