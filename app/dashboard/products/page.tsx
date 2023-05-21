import CircularButton from '@/app/components/CircularButton';
import Products from '@/app/components/Products';
import Link from 'next/link';

export default function Page() {
    return (
        <>
            <div className='flex items-start'>
                <span className='text-xl font-semibold pb-2'>
                    Products
                </span>
                <Link href="dashboard/products/new" className="ml-2" >
                    <CircularButton />
                </Link>
            </div>
            <Products />

        </>
    )
}