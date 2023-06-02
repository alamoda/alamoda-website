import Breadcrumb from '@/app/components/Breadcrumb';
import CircularButton from '@/app/components/CircularButton';
import Pagination from '@/app/components/Pagination';
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';


async function getData(department: string | null, category: string | null, subcategory: string | null, skip: Number = 0) {

    const departementParam = department ? `department=${department}&` : ''
    const categoryParam = category ? `category=${category}&` : ''
    const subcategoryParam = subcategory ? `subcategory=${subcategory}&` : ''


    const res = await fetch(`http://localhost:3000/api/products?${departementParam}${categoryParam}${subcategoryParam}limit=60&skip=${skip}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default async function Shop({ params }: { params: { slug: Array<string> } }) {

    const data = await getData(params.slug ? params.slug[0] : null, params.slug ? params.slug[1] : null, params.slug ? params.slug[2] : null);

    const pages = []
    if (params.slug && params.slug[0]) pages.push({name: params.slug[0], href: ""}) 
    if (params.slug && params.slug[1]) pages.push({name: params.slug[1], href: ""}) 
    if (params.slug && params.slug[2]) pages.push({name: params.slug[2], href: ""}) 


    return (
        <div className="px-4 py-4">
            <Breadcrumb pages={pages} />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.products.map((product: any) => (
                <ProductCard key={product.mongo_id} product={product} />
            ))}
        </div>
        <div className='mt-8'>
            <Pagination pageCount={100} selectedPage={1}/>
        </div>
    </div>
    )
}