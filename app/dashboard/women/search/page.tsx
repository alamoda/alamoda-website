"use client";

import CircularButton from '@/app/components/CircularButton';
import Products from '@/app/components/Products';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default async function Page() {

    const searchQuery = useSearchParams().get('q');

    const encodedSearchQuery = encodeURI(searchQuery || "");

    const response = await fetch('http://localhost:3000/api/products/women', {
        method: 'GET',
        cache: 'no-store',
    });

    const products = await response.json();

    console.log(products);

    return (
        <>
            <Products products={products} gender="women" />
        </>
    )
}