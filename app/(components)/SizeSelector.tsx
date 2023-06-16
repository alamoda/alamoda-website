'use client'

import { RadioGroup } from "@headlessui/react";
import { useContext, useState } from "react";
import { Product, Size } from "../(types)";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";

interface SizeSelectorProps {
    product: Product
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function SizeSelector({ product }: SizeSelectorProps) {
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [showError, setShowError] = useState(false);
    const { addProduct } = useContext(CartContext);

    const router = useRouter();

    const handleAddToCart = () => {
        if (product && selectedSize) {
            console.log(selectedSize);
            addProduct({ product, size: selectedSize, quantity: 1 });
            router.push('/cart');
        } else if (product && !selectedSize) {
            setShowError(true);
        }
    }

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">Size</h2>
            </div>

            <RadioGroup
                value={selectedSize}
                onChange={(size: Size) => {
                    setSelectedSize(size);
                    setShowError(false);
                }}
                className="mt-2">
                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {product?.sizes.map((size: Size) => (
                        <RadioGroup.Option
                            key={size.name}
                            value={size}
                            className={({ active, checked }) =>
                                classNames(
                                    checked
                                        ? 'border-transparent bg-gray-900 text-white hover:bg-gray-800'
                                        : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                                    'cursor-pointer focus:outline-none flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                                )
                            }
                        >
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

            <button
                onClick={handleAddToCart}
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
            >
                Add to cart
            </button>

            {showError &&
                <p className='text-red-500 text-sm mt-2'>
                    You need to select a size first
                </p>
            }
        </div>
    )
}