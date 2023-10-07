'use client'
import { CartItem } from '@/lib';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';


export default function ProductCartEntry({ cartItem, cartIndex }: { cartItem: CartItem, cartIndex: number }) {

    const { removeItem, updateItemQuantity } = useContext(CartContext);

    return (
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
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <p className="font-medium text-gray-700 hover:text-gray-800">
                                    {cartItem.product.name}
                                </p>
                            </h3>
                        </div>
                        <div className="flex justify-between mt-1">
                            <h3 className="text-xs">
                                <p className="font-semibold text-gray-700 hover:text-gray-800">
                                    {cartItem.product.brand.name}
                                </p>
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            {cartItem.size ? (
                                <p className="text-gray-900">{cartItem.size.name}</p>
                            ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">${cartItem.product.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${cartItem.product.id + cartItem.size.name}`} className="sr-only">
                            Quantity, {cartItem.product.name}
                        </label>
                        <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateItemQuantity(cartIndex, Number(e.target.value))}
                            value={cartItem.quantity}
                            className="max-w-full border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm sm:text-sm"
                        >
                            {Array.from({ length: Number(cartItem.size.quantity) }, (_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>

                        <div className="absolute right-0 top-0">
                            <button onClick={() => removeItem(cartItem.product.id)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Remove</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
