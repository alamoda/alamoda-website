
import { Product } from "../(types)"
import Image from 'next/image';
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ComponentProps {
    listUrl: string
    listName: string
    products: Product[]
}

export default function ProductList({ listUrl, listName, products }: ComponentProps) {

    return (
        <>
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">{listName}</h2>
                {listUrl &&
                    <Link href={listUrl} className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
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
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Shop the collection
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </>
    )
}