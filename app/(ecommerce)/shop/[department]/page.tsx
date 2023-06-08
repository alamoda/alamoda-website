
import Breadcrumb from '@/app/(components)/Breadcrumb';
import Pagination from '@/app/(components)/Pagination';
import ProductCard from '@/app/(components)/ProductCard';
import Filters from '@/app/(components)/Filters';

async function getData(department: string | null, category: string | null, subcategories: string[] | null, skip: number = 0, query: string = "", order: string) {

    const departementParam = department ? `department=${department}&` : ''
    const categoryParam = category ? `category=${category}&` : ''
    const subcategoriesParam = subcategories && subcategories.length > 0 ? `subcategories=${subcategories.join(',')}&` : ''

    const res = await fetch(`http://localhost:3000/api/products?${departementParam}${categoryParam}${subcategoriesParam}limit=60&skip=${skip}&q=${query}&order=${order}`, {
        cache: 'no-store',
        method: 'GET'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return await res.json();
};

export default async function Shop(
    {
        searchParams,
        params
    }: {
        searchParams: { [key: string]: string | string[] | undefined },
        params: { department: string }
    }) {

    const skip = searchParams.skip ? Number(searchParams.skip) : 0;
    const query = searchParams.q ? String(searchParams.q) : ""
    const department = params.department;
    const category = searchParams.category ? String(searchParams.category) : "";
    const subcategories = searchParams.subcategories ? String(searchParams.subcategories).split(',') : [];
    const order = searchParams.orderBy ? String(searchParams.orderBy) : "";

    const breadcrumb = [
        {
            name: 'Shop',
            href: 'shop'
        },
        {
            name: department,
            href: `shop/${department}`
        },
    ];

    if (category) {
        breadcrumb.push({ name: category, href: `shop/${department}?category=${category}` })
    }

    const data = await getData(department, category, subcategories, skip, query, order);
    const { products, count } = data;

    return (
        <>

            {/* TITLE */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                {/* BREADCRUMBS */}
                <Breadcrumb routes={breadcrumb} />

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">
                    {category ? category.toLocaleLowerCase().replace('-', ' ') : department.toLowerCase().replace('-', ' ')}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-gray-700">
                    Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
                    organization with these sale items before we run out.
                </p>

            </div>

            {/* FILTERS */}
            <Filters route='shop' department={department} category={category} subcategories={subcategories} order={order} />

            {/* PRODUCTS */}
            < div className="bg-white" >
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    {products.length === 0 &&
                        <div className="mx-auto text-center text-gray-500">No products available yet!</div>
                    }
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20">
                        {products.map((product: any) => (
                            <ProductCard route={`shop/${department}`} key={product.mongo_id} product={product} />
                        ))}
                    </div>
                    {/* PAGINATION */}
                    <div className='mt-8'>
                        <Pagination
                            productCount={count}
                            skip={skip}
                            route="shop"
                            department={department}
                            category={category}
                            subcategories={subcategories} />
                    </div>
                </div>
            </div >

        </>
    )
}