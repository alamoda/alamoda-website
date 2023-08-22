import { Brand } from "@prisma/client";
import { ProductWithRelations } from "../(lib)/db";
import { ProductFilters, SortOption } from "../(types)";
import { PRODUCT_SORT_OPTIONS } from "../(utils)/constants";
import { prepareProductQueryFilters } from "../(utils)/helpers";
import { countProducts, getBrands, getProducts } from "../actions";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

interface ProductListProps {
    productFilters: ProductFilters
    skip: number
    take: number
    order?: SortOption
}

export default async function ProductList({ productFilters, skip, take, order }: ProductListProps) {

    const productQueryFilters = prepareProductQueryFilters(productFilters);

    const count: number = await countProducts(productQueryFilters);

    const products: ProductWithRelations[] = await getProducts(
        productQueryFilters,
        take,
        skip,
        order ? order : PRODUCT_SORT_OPTIONS[0]
    );

    const brands: Brand[] = await getBrands();


    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {products.length === 0 &&
                <div className="mx-auto text-center text-gray-500">No products available yet!</div>
            }
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20">
                {/* {products.map((product: any) => (
                    <ProductCard route={`/shop/${department}/${product.mongo_id}`} key={product.mongo_id} product={product} />
                ))} */}
            </div>
            {/* PAGINATION */}
            <div className='mt-8'>
                {/* <Pagination
                    productCount={count}
                    baseUrl={baseUrl}
                    category={category}
                    subcategories={subcategories}
                    skip={skip}
                    order={order}
                    brands={brands}
                /> */}
            </div>
        </div>
    )
}