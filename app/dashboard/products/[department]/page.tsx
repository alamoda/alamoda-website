import Breadcrumb from '@/app/(components)/Breadcrumb';
import Pagination from '@/app/(components)/Pagination';
import ProductCard from '@/app/(components)/ProductCard';
import { Product } from '@/app/(types)';

async function getData(department: string, category: string, subcategory: string, skip: Number, searchQuery: string) {

    const departmentParam = department ? `department=${department}&` : '';
    const categoryParam = category ? `category=${category}&` : '';
    const subcategoryParam = subcategory ? `subcategory=${subcategory}&` : '';

    const res = await fetch(`http://localhost:3000/api/products?${departmentParam}${categoryParam}${subcategoryParam}limit=60&skip=${skip}&q=${searchQuery}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { department: string };
    searchParams: { [key: string]: string | undefined };
}) {

    const department = params.department;
    const category = searchParams.category ? searchParams.category : '';
    const subcategory = searchParams.subcategory ? searchParams.subcategory : '';

    const searchQuery = searchParams.q && !Array.isArray(searchParams.q) ? searchParams.q : '';
    const skip = searchParams.skip ? Number(searchParams.skip) : 0;

    const breadcrumbs = [
        {
            name: 'Products',
            href: 'products'
        },
        {
            name: department,
            href: department
        }
    ];
    if (category) breadcrumbs.push({ name: category, href: category });
    if (subcategory) breadcrumbs.push({ name: subcategory, href: subcategory });

    const data = await getData(department, category, subcategory, skip, searchQuery);

    const { products, count } = data;

    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <Breadcrumb pages={breadcrumbs} />

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product: Product) => (
                    <ProductCard
                        key={product.mongo_id}
                        product={product}
                        route={"dashboard/products/" + department}
                    />
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
                    subcategory={subcategory}
                />
            </div>

        </div>
    )
}