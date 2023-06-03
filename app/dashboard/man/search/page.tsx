"use client";

import ProductCard from '@/app/components/ProductCard';
import { Brand, Product } from '@/app/types';
import { useSearchParams } from 'next/navigation';
import Link from "next/link"

export default async function Page() {
    const search = useSearchParams();
    const searchQuery = search ? search.get('q') : null;

    const encodedSearchQuery = encodeURI(searchQuery || "");

    const response = await fetch(`/api/search?q=${encodedSearchQuery}`, {
        method: 'GET',
        cache: 'no-store',
    });

    const products = await response.json();
    console.log(products);

    const productsArray = Array.isArray(products) ? products : Object.values(products);

    console.log(productsArray);

    return (
        <div className="px-4 py-4">
            <div className='flex items-center mb-8'>
                <div className='text-sm font-medium'>
                    / dashboard / men / {searchQuery}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {productsArray.map((product: Product) => (
                    <ProductCard key={product.mongo_id} product={product} />
                ))}
            </div>
        </div>
    )
}