'use client'

import React, { useState } from 'react';
import Link from "next/link"
import Image from 'next/image';
import { ProductWithRelations } from '../(lib)/db';

interface ComponentProps {
  product: ProductWithRelations;
  route: string
}

const ProductCard: React.FC<ComponentProps> = ({ product, route }) => {

  const images = product.images as string[];
  const [image, setImage] = useState<string>(images.length > 0 ? images[0] : "");

  const onMouseEnterImage = () => {
    images[1] ? setImage(images[1]) : null
  }

  const onMouseLeaveImage = () => {
    setImage(images[0])
  }

  return (
    <Link
      href={route}
      shallow={true}
      className="group flex flex-col justify-end"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="relative aspect-h-13 aspect-w-10 w-full overflow-hidden">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes={"20rem"}
            className="w-full h-full object-cover object-center"
            onMouseEnter={() => onMouseEnterImage()}
            onMouseLeave={() => onMouseLeaveImage()}
          />
        </div>

        <div className="mt-1 text-xs font-semibold text-center">{product.brand.name}</div>
        <div className="mt-1 text-sm text-center">{product.name}</div>
        <div className="mt-1 text-xs font-medium text-gray-900">{'$ ' + product.price}</div>
      </div>
    </Link>
  )
}

export default ProductCard;