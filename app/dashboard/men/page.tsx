import CircularButton from '@/app/components/CircularButton';
import Pagination from '@/app/components/Pagination';
import ProductCard from '@/app/components/ProductCard';
import { Product } from '@/app/types';
import Link from 'next/link';

export default async function Page() {

    const response = await fetch('http://localhost:3000/api/products?department=man&limit=60&skip=0', {
        method: 'GET',
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error("failed to fetch");
    }

    const {products, count} = await response.json();

    return (
        <div className="px-4 py-4">
            <div className='flex items-center mb-8'>
                <div className='text-sm font-medium'>
                    / dashboard / men
                </div>
                <Link href="dashboard/new" className="ml-2" >
                    <CircularButton />
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product: Product) => (
                    <ProductCard key={product.mongo_id} product={product} />
                ))}
            </div>
            <div className='mt-8'>
                <Pagination pageCount={100} selectedPage={1}/>
            </div>
        </div>
    )
}