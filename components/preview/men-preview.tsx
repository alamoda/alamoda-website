import { Suspense } from "react";
import { getDepartmentBySlug, prepareProductQueryFilters } from "@/lib/util";
import ProductList from "../grid/product-list";
import TitleCollectionPreview from "./preview-title";
import ProductListSkeleton from "../skeleton/product-list-skeleton";

export default function MenPreview() {

    const menQueryFilters = prepareProductQueryFilters({
        statuses: [2],
        available: true,
        department: getDepartmentBySlug("men"),
    });

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
                <TitleCollectionPreview
                    collectionName="New in for Men"
                    collectionURL="/shop/men"
                />
                <Suspense fallback={<ProductListSkeleton items={4} />}>
                    <ProductList
                        queryFilters={menQueryFilters}
                        skip={0}
                        take={4}
                    />
                </Suspense>
            </div>
        </>
    )
}