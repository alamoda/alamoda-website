import CircularButton from '@/app/components/CircularButton';
import ProductCard from '@/app/components/ProductCard';
import { Product } from '@/app/types';
import Link from 'next/link';

export default async function Page() {

    const response = await fetch('http://localhost:3000/api/products/women', {
        method: 'GET',
        cache: 'no-store',
    });

    const products = await response.json();

    console.log(products);

    return (
        <>
            <div className='flex items-center'>
                <div className='text-sm font-medium'>
                    / dashboard / women
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