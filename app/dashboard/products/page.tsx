import PrimaryButton from '@/app/components/PrimaryButton';
import Products from '@/app/components/Products';
import Link from 'next/link';

export default function Page() {
    return (
        <div className='bg-white'>
            <div className="px-4">
                <span className='text-xl font-bold px-4 pb-2'>
                    Products
                </span>
                <Link href="dashboard/products/new">
                    <PrimaryButton text="Add +" />
                </Link>
                <Products />
            </div>
        </div>
    )
}