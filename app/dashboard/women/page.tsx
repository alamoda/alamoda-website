import CircularButton from '@/app/components/CircularButton';
import Products from '@/app/components/Products';
import Link from 'next/link';

export default async function Page() {

    const response = await fetch('http://localhost:3000/api/products', {
        method: 'GET',

    });

    const products = await response.json();

    return (
        <>
            <div className='flex items-start'>
                <span className='text-sm font-semibold pb-2'>
                    /dashboard/women
                </span>
                <Link href="dashboard/products/new" className="ml-2" >
                    <CircularButton />
                </Link>
            </div>
            <Products products={products} gender="women" />
        </>
    )
}