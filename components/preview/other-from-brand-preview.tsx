import { Suspense } from "react";
import { getCategoryBySlug, getDepartmentBySlug, getSubcategoryBySlug, prepareProductQueryFilters } from "@/lib/util";
import ProductList from "../grid/product-list";
import TitleCollectionPreview from "./preview-title";
import ProductListSkeleton from "../skeleton/product-list-skeleton";
import { ProductWithRelations } from "@/lib/db";

export default function OtherFromBrandPreview({ product } : {product: ProductWithRelations}) {

    const productDepartment = getDepartmentBySlug(product.department);

    const otherFromBrandFilters = prepareProductQueryFilters({
        statuses: [2],
        available: true,
        department: productDepartment,
        brands: [product.brand],
        exclude: [product]
    });

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
                <TitleCollectionPreview
                    collectionName={`More from ${product?.brand.name.toLowerCase()}`}
                    collectionURL={`/shop/${productDepartment?.slug}?brands=${product?.brand.slug}`}
                />

                <Suspense fallback={<ProductListSkeleton items={4} />}>
                    <ProductList
                        queryFilters={otherFromBrandFilters}
                        skip={0}
                        take={4}
                    />
                </Suspense>
            </div>
        </>
    )
}