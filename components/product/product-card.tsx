'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { ProductWithRelations } from '@/lib/db';

interface ComponentProps {
  product: ProductWithRelations;
}

const ProductCard: React.FC<ComponentProps> = ({ product }) => {

  const images = product.images as string[];
  const [image, setImage] = useState<string>(images.length > 0 ? images[0] : "");

  const onMouseEnterImage = () => {
    images[1] ? setImage(images[1]) : null
  }

  const onMouseLeaveImage = () => {
    setImage(images[0])
  }

  return (
    <div className="group flex flex-col justify-center items-center">
      <div className="relative aspect-h-13 aspect-w-10 w-full overflow-hidden">
        {(images && image.length > 0) ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes={"20rem"}
            className="w-full h-full object-cover object-center"
            onMouseEnter={() => onMouseEnterImage()}
            onMouseLeave={() => onMouseLeaveImage()}
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-100 w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 8h.01"></path>
              <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"></path>
              <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3 3"></path>
              <path d="M14 14l1 -1c.616 -.593 1.328 -.792 2.008 -.598"></path>
              <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M17 21l4 -4"></path>
            </svg>
          </div>
        )}
      </div>

      <div className="mt-1 text-xs font-semibold text-center">{product.brand.name}</div>
      <div className="mt-1 text-sm text-center">{product.name}</div>
      <div className="mt-1 text-xs font-medium text-gray-900">{'$ ' + product.price}</div>
    </div>
  )
}

export default ProductCard;