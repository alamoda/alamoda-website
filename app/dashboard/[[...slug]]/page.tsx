import Breadcrumb from '@/app/components/Breadcrumb';
import Pagination from '@/app/components/Pagination';
import ProductCard from '@/app/components/ProductCard';
import ProductForm from '@/app/components/ProductForm';
import { Product } from '@/app/types';

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
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {


    const pages = []
    if (params.slug && params.slug[0]) pages.push({ name: params.slug[0], href: "" })
    if (params.slug && params.slug[1]) pages.push({ name: params.slug[1], href: "" })
    if (params.slug && params.slug[2]) pages.push({ name: params.slug[2], href: "" })

    const skip = searchParams.skip ? Number(searchParams.skip) : 0;
    const searchQuery = searchParams.q && !Array.isArray(searchParams.q) ? searchParams.q : '';

    const navigation = params.slug && params.slug[0] ? params.slug[0] : '';
    const category = params.slug && params.slug[1] ? params.slug[1] : '';
    const subcategory = params.slug && params.slug[2] ? params.slug[2] : '';

    const data = await getData(navigation, category, subcategory, skip, searchQuery);

    const { products, count } = data;

    // DASHBOARD/NEW 
    if (navigation === 'new') {
        return (
            <div className="px-4 py-4">
                {/* BREADCRUMBS */}
                <Breadcrumb pages={pages} route="Dashboard" />
                {/* PRODUCT FORM */}
                <ProductForm />
            </div>
        )
    }
    // DASHBOARD/WOMANMAN, DASHBOARD/MAN
    else if (navigation === 'man' || navigation === 'woman') {
        return (
            <div className="px-4 py-4">

                {/* BREADCRUMBS */}
                <Breadcrumb pages={pages} route="Dashboard" />

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
                        department={navigation}
                        category={category}
                        subcategory={subcategory}

                    />
                </div>
            </div>
        )
    }
    else if (searchQuery) {
        // SEARCH
        return (
            <div className="px-4 py-4">
                {/* BREADCRUMBS */}
                <Breadcrumb pages={pages} route="Dashboard" />
                {/* PRODUCTS */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product: Product) => (
                        <ProductCard key={product.mongo_id} product={product} />
                    ))}
                </div>
            </div>
        )
    }

}