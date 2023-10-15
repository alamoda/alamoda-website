import { getProducts } from "@/app/actions";
import { SortOption } from "@/lib";
import { PRODUCT_SORT_OPTIONS } from "@/lib/constants";
import { ProductWithRelations } from "@/lib/db";
import ProductCard from "../product/product-card";
import Link from "next/link";

interface ProductListProps {
    queryFilters: object[];
    skip: number;
    take: number;
    orderBy?: SortOption;
}

export default async function ProductList({
    queryFilters,
    skip,
    take,
    orderBy,
}: ProductListProps) {
    const products: ProductWithRelations[] = await getProducts(
        queryFilters,
        take,
        skip,
        orderBy ? orderBy : PRODUCT_SORT_OPTIONS[0]
    );

    return (
        <>
            {products.length === 0 && (
                <div className="mx-auto text-center text-gray-500 pt-10">
                    No products available yet!
                </div>
            )}

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20">
                {products.map((product: ProductWithRelations) => (
                    <Link
                        key={product.id}
                        href={`/dashboard/product/${product.id}`}
                        className="groupF flex flex-col justify-end"
                    >
                        <ProductCard key={product.id} product={product} />
                    </Link>
                ))}
            </div>
        </>
    );
}
