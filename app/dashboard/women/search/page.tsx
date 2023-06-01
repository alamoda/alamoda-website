"use client";

import Products from '@/app/components/Products';
import { useSearchParams } from 'next/navigation';

export default async function Page() {
    const searchQuery = useSearchParams().get('q');

    const encodedSearchQuery = encodeURI(searchQuery || "");

    const response = await fetch(`http://localhost:3000/api/search?q=${encodedSearchQuery}`, {
        method: 'GET',
        cache: 'no-store',
    });

    const products = await response.json();
    console.log(products);

    return (
        <>
            {products &&
                <Products products={products} gender="women" />
            }
        </>
    )
}