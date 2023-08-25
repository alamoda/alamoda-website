import { Suspense } from "react";
import { prepareProductQueryFilters } from "@/lib/util";
import ProductList from "../grid/product-list";
import TitleCollectionPreview from "./preview-title";
import ProductListSkeleton from "../skeleton/product-list-skeleton";

export default function NewArrivalsCollectionPreview() {

    const newArrivalsQueryFilters = prepareProductQueryFilters({
        statuses: [2],
        available: true,
    });

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
                <TitleCollectionPreview
                    collectionName="New Arrivals"
                    collectionURL="/shop"
                />
                <Suspense fallback={<ProductListSkeleton items={4} />}>
                    <ProductList
                        queryFilters={newArrivalsQueryFilters}
                        skip={0}
                        take={4}
                    />
                </Suspense>
            </div>
        </>
    )
}