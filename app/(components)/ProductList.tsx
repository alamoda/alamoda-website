
import { Product } from "../(types)"
import Image from 'next/image';
import ProductCard from "./ProductCard";

interface ComponentProps {
    baseUrl: string
    listName: string
    products: Product[]
}

export default function ProductList({ baseUrl, listName, products }: ComponentProps) {

    return (
        <>
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">{listName}</h2>
                <a href="#" className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                    Shop the collection
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product: Product) => (
                    <ProductCard route={`shop/${product.department.slug}`} key={product.mongo_id} product={product} />
                    // <div key={product.mongo_id} className="group relative">
                    //     <div className="aspect-h-13 aspect-w-10 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                    //         <Image
                    //             src={product.images ? product.images[0] : ""}
                    //             alt={product.description || product.name}
                    //             width={1000}
                    //             height={1333}
                    //             className="h-full w-full object-cover object-center"
                    //         />
                    //     </div>
                    //     <div className="mt-4 flex justify-between">
                    //         <div>
                    //             <h3 className="text-sm text-gray-700">
                    //                 <a href="porcodio">
                    //                     <span aria-hidden="true" className="absolute inset-0" />
                    //                     {product.name}
                    //                 </a>
                    //             </h3>
                    //             <p className="mt-1 text-sm text-gray-500">{product.brand.name}</p>
                    //         </div>
                    //         <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    //     </div>
                    // </div>
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