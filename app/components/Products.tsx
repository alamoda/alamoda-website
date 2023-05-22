"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Product } from '@/app/types/index';
import Image from 'next/image';
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data); 
    });
  }, [])

  return (
    <div className="bg-white">
      <div className="px-4 py-16">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => (
            <Link key={product._id} href={"dashboard/products/" + product._id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{'$' + product.price}</p>
            </Link>
          ))}
      </div>
      </div>
    </div>
  )
}
