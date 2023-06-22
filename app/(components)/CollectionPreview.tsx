import { PRODUCT_SORT_OPTIONS } from "../(utils)/constants";
import { Product } from "../(types)";
import ProductCard from "./ProductCard";
import Link from "next/link";

const collectionName = "New Arrivals"

async function getNewArrivals() {
    const url = new URL(`${process.env.URL}api/products`);
    const params = new URLSearchParams();

    params.append("orderBy", PRODUCT_SORT_OPTIONS[0].slug);
    params.append("limit", "4");
    params.append("available", "true")

    url.search = params.toString();

    const res = await fetch(url.toString(), {
        cache: 'no-store',
        method: 'GET'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}

export default async function CollectionPreview() {

    const data = await getNewArrivals();
    const products: Product[] = data.products;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 className="text-4xl tracking-tight text-gray-900">{collectionName}</h2>
                    <Link href="/shop" className="hidden text-sm font-medium text-gray-900 hover:text-gray-700 sm:block">
                        Browse {collectionName}
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product: Product) => (
                        <ProductCard
                            key={product.mongo_id}
                            product={product}
                            route={`shop/${product.department.slug}/${product.mongo_id}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}