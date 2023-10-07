import { Suspense } from "react";
import { getCategoryBySlug, getDepartmentBySlug, getSubcategoryBySlug, prepareProductQueryFilters } from "@/lib/util";
import ProductList from "../grid/product-list";
import TitleCollectionPreview from "./preview-title";
import ProductListSkeleton from "../skeleton/product-list-skeleton";
import { ProductWithRelations } from "@/lib/db";

export default function RelatedProductsPreview({ product } : {product: ProductWithRelations}) {

    const productDepartment = getDepartmentBySlug(product.department);
    const productCategory = getCategoryBySlug(product.category, productDepartment);
    const productSubcategory = getSubcategoryBySlug(product.subcategory, productCategory);

    const relatedProductsFilters = prepareProductQueryFilters({
        statuses: [2],
        available: true,
        department: productDepartment,
        category: productCategory,
        subcategories: productSubcategory ? [productSubcategory] : [],
        exclude: [product]
    });

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
                <TitleCollectionPreview
                    collectionName="You might also like"
                    collectionURL={`/shop/${product.department}?category=${product.category}${product.subcategory ? "&subcategories=" + product.subcategory : ""}`}
                />

                <Suspense fallback={<ProductListSkeleton items={4} />}>
                    <ProductList
                        queryFilters={relatedProductsFilters}
                        skip={0}
                        take={4}
                    />
                </Suspense>
            </div>
        </>
    )
}