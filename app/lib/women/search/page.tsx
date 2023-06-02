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
        <>
            {productsArray.map((product: Product) => (
            <>
                    <div className='mt-8'>
                        <div className='font-semibold underline mb-2'>
                            Brands
                        </div>
                        <Link key={product.brand.id} href={'/brands/' + product.brand.name} className='mb-2'>
                            {product.brand.name}
                        </Link>
                    </div>
                </>
            ))}
            {productsArray.map((product: Product) => (
                <>
                    <ProductCard key={product.id} product={product} />
                </>
            ))}

        </>
    )
}