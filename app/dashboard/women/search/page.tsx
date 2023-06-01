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

    const { products, brands } = await response.json();
    console.log(products, brands);

    const productsArray = Array.isArray(products) ? products : Object.values(products);
    const brandsArray = Array.isArray(brands) ? brands : Object.values(brands);

    console.log(productsArray, brandsArray);

    return (
        <>
            {brandsArray.map((brand: Brand) => {
                <Link key={brand.id} href={'/brands/' + brand.name}>
                    brand.name
                </Link>
            })}
            {productsArray.map((product: Product) => (
                <>
                    <ProductCard key={product.id} product={product} />
                </>
            ))}

        </>
    )
}