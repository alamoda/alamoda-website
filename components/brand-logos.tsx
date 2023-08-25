import Image from 'next/image';

import diorLogo from '@/public/brands/dior.webp';
import gucciLogo from '@/public/brands/gucci.webp';
import pradaLogo from '@/public/brands/prada.webp';
import loroPianaLogo from '@/public/brands/loro-piana.webp';
import dolceGabbanaLogo from '@/public/brands/dolce-gabbana.webp';

const logos = [
  {
    src: diorLogo,
    alt: "Dior Logo",
  },
  {
    src: gucciLogo,
    alt: "Gucci Logo",
  },
  {
    src: pradaLogo,
    alt: "Prada Logo",
  },
  {
    src: loroPianaLogo,
    alt: "Loro Piana Logo",
  },
  {
    src: dolceGabbanaLogo,
    alt: "Dolce Gabbana Logo",
  }
]

export default function BrandLogos() {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className="grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        {logos.map((logo, index) => (
          <Image
            key={index}
            className="relative col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={logo.src}
            alt={logo.alt}
          />
        ))}
      </div>
    </div>
  )
}