
import { Product } from "../(types)"
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ComponentProps {
    product: Product
    brandOnly: boolean
    listUrl: string
    listName: string
}

async function fetchProducts(product: Product, brandOnly: boolean) {

    const url = new URL("http://localhost:3000/api/products");
    const params = new URLSearchParams();

    if (product?.department && !brandOnly) params.append("department", product?.department.slug);
    if (product?.category && !brandOnly) params.append("category", product?.category.slug);
    if (product?.subcategory && !brandOnly) params.append("subcategories", product?.subcategory.slug);
    if (product?.brand && brandOnly) params.append("brands", product?.brand.slug);
    if (product?.mongo_id) params.append("exclude", product?.mongo_id)

    params.append("limit", "4");
    params.append("status-min", "1");
    params.append("available", "true");
    params.append("order", "new-in");

    url.search = params.toString();

    const response = await fetch(url.toString());

    return (await response.json()).products;
  };

export default async function ProductList({ product, brandOnly, listUrl, listName }: ComponentProps) {

    const products = await fetchProducts(product, brandOnly);

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">{listName}</h2>
                {listUrl &&
                    <Link href={listUrl} className="hidden text-sm font-medium text-gray-900 hover:text-gray-700 md:block">
                        Shop the collection
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                }
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product: Product) => (
                    <ProductCard route={`shop/${product.department.slug}`} key={product.mongo_id} product={product} />
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