import { Suspense } from "react";
import { SortOption } from "../(types)";
import ProductListSkeleton from "./skeletons/ProductListSkeleton";
import ProductList from "./ProductList";

interface ProductListProps {
    queryFilters: object[]
    take: number
    orderBy?: SortOption
    baseURL: string
    collectionURL: string
}

export default function ProductListPreview({ queryFilters, take, orderBy, baseURL, collectionURL }: ProductListProps) {

    return (
        <>
            {/* Title */}
            <div className="mb-6 md:flex md:items-center md:justify-between">
                <h2 className="text-4xl tracking-tight text-gray-900 capitalize">You might also like</h2>

                {/* See more - Desktop */}
                <a
                    href={collectionURL}
                    className="hidden text-sm font-medium text-gray-900 hover:text-gray-700 md:block"
                >
                    Shop the collection
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>

            <Suspense fallback={<ProductListSkeleton items={take} />}>
                {/* @ts-expect-error Server Component */}
                <ProductList
                    queryFilters={queryFilters}
                    skip={0}
                    take={4}
                    baseURL={baseURL}
                />
            </Suspense>

            {/* See more - Mobile */}
            <div className="mt-8 text-sm md:hidden">
                <a
                    href={collectionURL}
                    className="font-medium text-gray-900 hover:text-gray-700"
                >
                    Shop the collection
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </>
    )
}