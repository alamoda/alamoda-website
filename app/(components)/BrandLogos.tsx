import Image from 'next/image';

import diorImage from '@/public/brands/dior.webp';
import gucciImage from '@/public/brands/gucci.webp';
import pradaImage from '@/public/brands/prada.webp';
import loroPianaImage from '@/public/brands/loro-piana.webp';
import dolceGabbanaImage from '@/public/brands/dolce-gabbana.webp';

export default function BrandLogos() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <Image
            className="relative col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={diorImage}
            alt="Dior Logo"
          />
          <Image
            className="relative col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={gucciImage}
            alt="Gucci Logo"
          />
          <Image
            className="relative col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={pradaImage}
            alt="Prada Logo"
          />
          <Image
            className="relative col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={loroPianaImage}
            alt="Loro Piana Logo"
          />
          <Image
            className="relative col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={dolceGabbanaImage}
            alt="Dolce & Gabbana Logo"
          />
        </div>
      </div>
    </div>
  )
}