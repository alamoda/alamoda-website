import React from 'react';
import Link from "next/link"
import { Product } from '@/app/types/index';
import Image from 'next/image';

interface ComponentProps {
  products: Product[];
  gender: string;
}

const Products: React.FC<ComponentProps> = ({ products, gender }) => {
  return (
    <div className="bg-white">
      <div className="px-4 py-16">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => (
            <Link key={product.mongo_id} href={"dashboard/" + gender + "/" + product.mongo_id} className="group">
              <div className="flex flex-col justify-center items-center">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-1 text-xs font-semibold">{product.brand.name}</div>
                <div className="mt-1 text-sm">{product.name}</div>
                <div className="mt-1 text-xs font-medium text-gray-900">{'USD ' + product.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products;