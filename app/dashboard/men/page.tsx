'use client'

import CircularButton from '@/app/components/CircularButton';
import Products from '@/app/components/Products';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Page() {

    const name = usePathname();

    return (
        <>
            <div className='flex items-start'>
                <span className='text-sm font-semibold pb-2'>
                    {name}
                </span>
                <Link href="dashboard/products/new" className="ml-2" >
                    <CircularButton />
                </Link>
            </div>
            <Products />
        </>
    )
}