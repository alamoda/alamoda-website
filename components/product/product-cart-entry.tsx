'use client'

import { CartContext } from '@/context/CartContext';
import { CartProduct } from '@/lib';
import { getDepartmentBySlug } from '@/lib/util';
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import { useContext } from 'react';
import { GridTileImage } from './product-grid-tile-image';

export default function ProductCartEntry({ cartProduct, cartIndex }: { cartProduct: CartProduct, cartIndex: number }) {

    const { removeProduct, updateQuantity } = useContext(CartContext);
    const currentDepartment = getDepartmentBySlug(cartProduct.product.department);

    return (
        <li className="flex items-center py-6 sm:py-10">

            <div className="flex items-center justify-center gap-2 overflow-hidden py-1 lg:mb-0">
                <div className="w-20">
                    <div
                        className={'flex h-full w-full items-center justify-center overflow-hidden bg-white hover:border-gray-900'}
                    >
                        <Image
                            className={'relative h-full w-full object-contain'}
                            alt={cartProduct.product.description || (`${cartProduct.product.name} - ${cartProduct.product.brand.name}`)}
                            src={(cartProduct.product.images as string[])[0]}
                            width={80}
                            height={80}
                        />
                    </div>
                </div>
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
                        <div className="flex justify-between mt-1">
                            <h3 className="text-xs">
                                <p className="font-semibold text-gray-700 hover:text-gray-800">
                                    {cartProduct.product.brand.name}
                                </p>
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            <p className="text-gray-900">{currentDepartment?.name}</p>
                            {cartProduct.size ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-900">{cartProduct.size.name}</p>
                            ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">${cartProduct.product.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${cartProduct.product.id + cartProduct.size.name}`} className="sr-only">
                            Quantity, {cartProduct.product.name}
                        </label>
                        <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateQuantity(cartIndex, Number(e.target.value))}
                            value={cartProduct.quantity}
                            className="max-w-full border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm sm:text-sm"
                        >
                            {Array.from({ length: Number(cartProduct.size.quantity) }, (_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>

                        <div className="absolute right-0 top-0">
                            <button onClick={() => removeProduct(cartProduct.product.id)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
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
