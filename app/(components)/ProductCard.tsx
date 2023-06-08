'use client'

import React, { useRef, useState } from 'react';
import Link from "next/link"
import { Product } from '@/app/(types)/index';
import Image from 'next/image';

interface ComponentProps {
  product: Product;
  route: string
}

const ProductCard: React.FC<ComponentProps> = ({ product, route }) => {
  const [image, setImage] = useState(product.images[0]);

  return (
    <Link key={product.mongo_id} href={route + '/' + product.mongo_id} className="group flex flex-col justify-end">
      <div className="flex flex-col justify-center items-center">
        <div>
          <Image
            src={product.images.length > 0 ? image : '/'}
            alt={product.name}
            width={217}
            height={290}
            className="w-full h-full object-cover object-center"
            onMouseEnter={() => product.images[1] ? setImage(product.images[1]) : null}
            onMouseLeave={() => setImage(product.images[0])}
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