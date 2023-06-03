import Breadcrumb from '@/app/components/Breadcrumb';
import CircularButton from '@/app/components/CircularButton';
import Pagination from '@/app/components/Pagination';
import ProductCard from '@/app/components/ProductCard';
import { Product } from '@/app/types';
import Link from 'next/link';

async function getData(department: string | null, category: string | null, subcategory: string | null, skip: Number = 0) {

    const departmentParam = department ? `department=${department}&` : '';
    const categoryParam = category ? `category=${category}&` : '';
    const subcategoryParam = subcategory ? `subcategory=${subcategory}&` : '';

    const res = await fetch(`http://localhost:3000/api/products?${departmentParam}${categoryParam}${subcategoryParam}limit=60&skip=${skip}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const pages = []
    if (params.slug && params.slug[0]) pages.push({ name: params.slug[0], href: "" })
    if (params.slug && params.slug[1]) pages.push({ name: params.slug[1], href: "" })
    if (params.slug && params.slug[2]) pages.push({ name: params.slug[2], href: "" })

    const skip = searchParams.skip ? Number(searchParams.skip) : 0;

const department = params.slug && params.slug[0] ? params.slug[0] : '';
    const category = params.slug && params.slug[1] ? params.slug[1] : '';
    const subcategory = params.slug && params.slug[2] ? params.slug[2] : '';

    const data = await getData(department, category, subcategory, skip);

    const { products, count } = data;

    return (
        <div className="px-4 py-4">
            <div className='flex items-center mb-8'>
                {/* BREADCRUMBS */}
                <Breadcrumb pages={pages} route="Dashboard" />
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product: Product) => (
                    <ProductCard key={product.mongo_id} product={product} />
                ))}
            </div>

            {/* PAGINATION */}
            <div className='mt-8'>
                <Pagination
                    productCount={count}
                    skip={skip}
                    route="dashboard"
                    department={department}
                    category={category}
                    subcategory={subcategory} />
            </div>
        </div>
    )
}