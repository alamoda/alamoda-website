import { ProductWithRelations } from "../(lib)/db";
import { SortOption } from "../(types)";
import { PRODUCT_SORT_OPTIONS } from "../(utils)/constants";
import { getProducts } from "../actions";
import ProductCard from "./ProductCard";

interface ProductListProps {
    queryFilters: object[]
    skip: number
    take: number
    orderBy?: SortOption
    baseURL: string
}

export default async function ProductList({ queryFilters, skip, take, orderBy, baseURL }: ProductListProps) {

    const products: ProductWithRelations[] = await getProducts(
        queryFilters,
        take,
        skip,
        orderBy ? orderBy : PRODUCT_SORT_OPTIONS[0]
    );

    return (
        <>
            {products.length === 0 &&
                <div className="mx-auto text-center text-gray-500">No products available yet!</div>
            }
            
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20">
                {products.map((product: ProductWithRelations) => (
                    <ProductCard
                        key={product.mongo_id}
                        route={`${baseURL}/${product.department?.slug}/${product.mongo_id}`}
                        product={product}
                    />
                ))}
            </div>
        </>
    )
}