import React from 'react';
import Link from "next/link"
import { Product } from '@/app/types/index';
import Image from 'next/image';

interface ComponentProps {
  product: Product;
}

const ProductCard: React.FC<ComponentProps> = ({ product }) => {
  return (
    <Link key={product.mongo_id} href={"dashboard/man/product/" + product.mongo_id} className="group flex flex-col justify-end">
      <div className="flex flex-col justify-center items-center">
        <div>
          <Image
            src={product.images.length > 0 ? product.images[0] : '/'}
            alt={product.name}
            width={217}
            height={290}
            className="w-full h-full object-cover object-center group-hover:opacity-75"
          />
        </div>

        <div className="mt-1 text-xs font-semibold">{product.brand.name}</div>
        <div className="mt-1 text-sm">{product.name}</div>
        <div className="mt-1 text-xs font-medium text-gray-900">{'$ ' + product.price}</div>
      </div>
    </Link>
  )
}

export default ProductCard;