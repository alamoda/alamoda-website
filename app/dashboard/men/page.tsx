import CircularButton from '@/app/components/CircularButton';
import ProductCard from '@/app/components/ProductCard';
import { Product } from '@/app/types';
import Link from 'next/link';

export default async function Page() {

    const response = await fetch('http://localhost:3000/api/products/men', {
        method: 'GET',
        cache: 'no-store',
    });

    const products = await response.json();

    return (
        <>
            <div className='flex items-center mb-4'>
                <div className='text-sm font-medium'>
                    / dashboard / men
                </div>
                <Link href="dashboard/new" className="ml-2" >
                    <CircularButton />
                </Link>
            </div>
            {products.map((product: Product) => (
                <>
                    <ProductCard product={product} />
                </>
            ))}
        </>
    )
}