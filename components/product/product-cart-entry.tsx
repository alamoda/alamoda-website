'use client'

import { CartContext } from '@/context/CartContext';
import { CartItem } from '@/lib';
import { getDepartmentBySlug } from '@/lib/util';
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import { useContext } from 'react';

export default function ProductCartEntry({ cartItem, cartIndex }: { cartItem: CartItem, cartIndex: number }) {

    const { removeItem, updateItemQuantity } = useContext(CartContext);
    const currentDepartment = getDepartmentBySlug(cartItem.product.department);

    return (

        <>
            <li className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center overflow-hidden h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48">
                        <Image
                            className={'relative h-full w-full object-contain'}
                            alt={cartItem.product.description || (`${cartItem.product.name} - ${cartItem.product.brand.name}`)}
                            src={(cartItem.product.images as string[])[0]}
                            width={80}
                            height={80}
                        />
                    </div>
                </div>

                {/* <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                            <div className="flex justify-between">
                                <h3 className="text-sm">
                                    <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                        {product.name}
                                    </a>
                                </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                                <p className="text-gray-500">{product.color}</p>
                                {product.size ? (
                                    <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                                ) : null}
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                                Quantity, {product.name}
                            </label>
                            <select
                                id={`quantity-${productIdx}`}
                                name={`quantity-${productIdx}`}
                                className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                            </select>

                            <div className="absolute right-0 top-0">
                                <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Remove</span>
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {product.inStock ? (
                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        ) : (
                            <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                        )}

                        <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
                    </p>
                </div> */}
            </li>




        </>






















        // <li className="flex items-center py-6 sm:py-10 bg-red-500">
        //     <div className="flex w-20 items-center justify-center overflow-hidden">
        //         <Image
        //             className={'relative h-full w-full object-contain'}
        //             alt={cartProduct.product.description || (`${cartProduct.product.name} - ${cartProduct.product.brand.name}`)}
        //             src={(cartProduct.product.images as string[])[0]}
        //             width={80}
        //             height={80}
        //         />
        //     </div>

        //     <div className="flex justify-between items-center sm:ml-6">
        //         <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
        //             <div>
        //                 <div className="flex justify-between">
        //                     <h3 className="text-sm">
        //                         <p className="font-medium text-gray-700 hover:text-gray-800">
        //                             {cartProduct.product.name}
        //                         </p>
        //                     </h3>
        //                 </div>
        //                 <div className="flex justify-between mt-1">
        //                     <h3 className="text-xs">
        //                         <p className="font-semibold text-gray-700 hover:text-gray-800">
        //                             {cartProduct.product.brand.name}
        //                         </p>
        //                     </h3>
        //                 </div>
        //                 <div className="mt-1 flex text-sm">
        //                     <p className="text-gray-900">{currentDepartment?.name}</p>
        //                     {cartProduct.size ? (
        //                         <p className="ml-4 border-l border-gray-200 pl-4 text-gray-900">{cartProduct.size.name}</p>
        //                     ) : null}
        //                 </div>
        //                 <p className="mt-1 text-sm font-medium text-gray-900">${cartProduct.product.price}</p>
        //             </div>

        //             <div className="mt-4 sm:mt-0 sm:pr-9">
        //                 <label htmlFor={`quantity-${cartProduct.product.id + cartProduct.size.name}`} className="sr-only">
        //                     Quantity, {cartProduct.product.name}
        //                 </label>
        //                 <select
        //                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateQuantity(cartIndex, Number(e.target.value))}
        //                     value={cartProduct.quantity}
        //                     className="max-w-full border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm sm:text-sm"
        //                 >
        //                     {Array.from({ length: Number(cartProduct.size.quantity) }, (_, index) => (
        //                         <option key={index} value={index + 1}>{index + 1}</option>
        //                     ))}
        //                 </select>

        //                 <div className="absolute right-0 top-0">
        //                     <button onClick={() => removeProduct(cartProduct.product.id)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
        //                         <span className="sr-only">Remove</span>
        //                         <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </li>
    )
}
