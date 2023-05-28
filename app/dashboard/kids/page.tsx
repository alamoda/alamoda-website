'use client'

import Products from '@/app/components/Products';
import { usePathname } from 'next/navigation';

export default function Women() {

    const name = usePathname();

  return (
    <>
      <span className='text-sm font-semibold pb-2'>
        {name}
      </span>
    </>
  )
}
