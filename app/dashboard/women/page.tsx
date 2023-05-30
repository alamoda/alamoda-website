import CircularButton from '@/app/components/CircularButton';
import Products from '@/app/components/Products';
import Link from 'next/link';

export default async function Page() {

    const response = await fetch('http://localhost:3000/api/products/women', {
        method: 'GET',
        cache: 'no-store',

    });

    const products = await response.json();

    return (
        <>
            <div className='flex items-center'>
                <div className='text-sm font-semibold'>
                    /dashboard/women
                </div>
                <Link href="dashboard/new" className="ml-2" >
                    <CircularButton />
                </Link>
            </div>
            <Products products={products} gender="women" />
        </>
    )
}