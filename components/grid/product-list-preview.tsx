import { SortOption } from "@/lib";
import { Suspense } from "react";
import ProductList from "./product-list";
import ProductListSkeleton from "../skeleton/product-list-skeleton";
import Link from "next/link";

interface ProductListPreviewProps {
    collectionTitle: string
    collectionURL: string
    queryFilters: object[]
    take: number
    orderBy?: SortOption
}

export default async function ProductListPreview({ collectionTitle, collectionURL, queryFilters, take, orderBy, ...props }: ProductListPreviewProps & React.ComponentProps<'div'>) {

    return (
        <div {...props}>
            {/* Title */}
            <div className="mb-6 md:flex md:items-center md:justify-between">
                <h2 className="text-4xl tracking-tight text-gray-900 capitalize">{collectionTitle}</h2>

                {/* See more - Desktop */}
                <Link
                    href={collectionURL}
                    className="hidden text-sm font-medium text-gray-900 hover:text-gray-700 md:block"
                >
                    Shop the collection
                    <span aria-hidden="true"> &rarr;</span>
                </Link>
            </div>

            <Suspense fallback={<ProductListSkeleton items={take} />}>
                <ProductList
                    queryFilters={queryFilters}
                    skip={0}
                    take={4}
                    orderBy={orderBy}
                />
            </Suspense>
        </div>
    )
}