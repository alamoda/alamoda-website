'use client'

import { RadioGroup } from "@headlessui/react";
import { useContext, useState } from "react";
import { Size } from "../(types)";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { LETTER_SIZE_ORDER } from "../(utils)/constants";
import { Product } from "@prisma/client";
import { cn } from "../(utils)/helpers";

interface AddProductToCartProps {
    product: Product
}

export default function AddProductToCart({ product }: AddProductToCartProps) {
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [showError, setShowError] = useState(false);
    const { addProduct } = useContext(CartContext);

    const router = useRouter();

    const handleAddToCart = () => {
        if (product && selectedSize) {
            addProduct({ product, size: selectedSize, quantity: 1 });
            router.push('/cart');
        } else if (product && !selectedSize) {
            setShowError(true);
        }
    };

    const reorderSizes = (sizes: Size[]) => {
        const isNumeric = !isNaN(Number(sizes[0].name));

        if (isNumeric) {
            return sizes.sort((a, b) => Number(a.name) - Number(b.name));
        } else {

            return sizes.sort((a, b) => {
                const indexA = LETTER_SIZE_ORDER.indexOf(a.name.toUpperCase());
                const indexB = LETTER_SIZE_ORDER.indexOf(b.name.toUpperCase());

                if (indexA === -1) return 1; // Handle unknown sizes at the end
                if (indexB === -1) return -1;

                return indexA - indexB;
            });
        }
    };

    const sizes = reorderSizes(product.sizes as Size[]);

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-900">Size</h2>
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
                    {sizes.map((size: Size) => (
                        <RadioGroup.Option
                            key={size.name}
                            value={size}
                            className={({ active, checked }) =>
                                cn(
                                    checked
                                        ? 'border-transparent bg-gray-900 text-white hover:bg-gray-800'
                                        : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                                    'cursor-pointer focus:outline-none flex items-center justify-center border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
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
                className="mt-4 flex w-full items-center justify-center border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800"
            >
                Add to cart
            </button>

            {showError &&
                <p className='text-red-500 text-sm mt-2'>
                    You need to select a size first
                </p>
            }
        </>
    )
}