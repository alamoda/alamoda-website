
import { Product } from "../(types)"
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ComponentProps {
    filterParams: URLSearchParams
    listUrl: string
    listTitle: string
}

async function fetchProducts(urlParams: URLSearchParams) {

    const url = new URL(`${process.env.URL}api/products`);

    if (!urlParams.has("limit")) urlParams.append("limit", "4");
    if (!urlParams.has("statuses")) urlParams.append("statuses", "2");
    if (!urlParams.has("available")) urlParams.append("available", "true");
    if (!urlParams.has("order")) urlParams.append("order", "new-in");


    url.search = urlParams.toString();

    const response = await fetch(url.toString());

    return (await response.json()).products;
  };

export default async function ProductList({ filterParams, listUrl, listTitle }: ComponentProps) {

    const products = await fetchProducts(filterParams);

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-4xl tracking-tight text-gray-900 capitalize">{listTitle}</h2>
                {listUrl &&
                    <Link href={listUrl} className="hidden text-sm font-medium text-gray-900 hover:text-gray-700 md:block">
                        Shop the collection
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                }
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product: Product) => (
                    <ProductCard route={`/shop/${product.department.slug}/${product.mongo_id}`} key={product.mongo_id} product={product} />
                ))}
            </div>

            <div className="mt-8 text-sm md:hidden">
                <a href="#" className="font-medium text-gray-900 hover:text-gray-700">
                    Shop the collection
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </div>
    )
}