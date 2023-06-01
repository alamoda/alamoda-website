"use client";

import Products from '@/app/components/Products';
import { useSearchParams } from 'next/navigation';

export default async function Page() {
    const search = useSearchParams();
    const searchQuery = search ? search.get('q') : null;

    const encodedSearchQuery = encodeURI(searchQuery || "");

    const response = await fetch(`/api/search?q=${encodedSearchQuery}`, {
        method: 'GET',
        cache: 'no-store',
    });

    const {products, brands} = await response.json();
    console.log(products, brands);

    return (
        <>
            {products &&
                <Products products={products} gender="women" />
            }
        </>
    )
}