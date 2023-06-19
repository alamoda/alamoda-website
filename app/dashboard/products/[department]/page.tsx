import Breadcrumb from '@/app/(components)/Breadcrumb';
import Filters from '@/app/(components)/Filters';
import Pagination from '@/app/(components)/Pagination';
import ProductCard from '@/app/(components)/ProductCard';
import { Brand, Category, Department, Product, ProductFilters, SortOption, Subcategory } from '@/app/(types)';
import { PRODUCT_SORT_OPTIONS } from '@/app/(utils)/constants';

async function getData(department: string | null, category: string | null, subcategories: string[] | null, skip: number = 0, query: string = "", order: string, brands: string[]) {

    const url = new URL("http://localhost:3000/api/products");
    const params = new URLSearchParams();

    if (department) params.append("department", department);
    if (category) params.append("category", category);
    if (subcategories && subcategories.length > 0) params.append("subcategories", subcategories.join(','));
    if (brands && brands.length > 0) params.append("brands", brands.join(','));

    params.append("limit", "60");
    params.append("status-min", "1");
    params.append("available", "true");
    params.append("skip", String(skip));
    params.append("q", query);
    params.append("order", order);

    url.search = params.toString();

    const resProducts = await fetch(url.toString(), {
        cache: 'no-store',
        method: 'GET'
    });

    if (!resProducts.ok) {
        throw new Error('Failed to fetch products');
    }

    const { products, count } = await resProducts.json();

    const resBrands = await fetch("http://localhost:3000/api/brands", {
        cache: 'no-store',
        method: 'GET'
    });

    if (!resBrands.ok) {
        throw new Error('Failed to fetch brands');
    }

    const availableBrands = await resBrands.json();

    const resDepartment = await fetch(`http://localhost:3000/api/departments/${department}`, {
        cache: 'no-store',
        method: 'GET'
    });

    if (!resDepartment.ok) {
        throw new Error('Failed to fetch department');
    }

    const currentDepartment = await resDepartment.json();

    return { products: products, count: count, availableBrands: availableBrands, currentDepartment: currentDepartment }
};

export default async function Page({
    searchParams,
    params
}: {
    searchParams: { [key: string]: string | string[] | undefined },
    params: { department: string }
}) {

    const skip = searchParams.skip ? Number(searchParams.skip) : 0;
    const query = searchParams.q ? String(searchParams.q) : "";
    const department = params.department;
    const category = searchParams.category ? String(searchParams.category) : "";
    const subcategories = searchParams.subcategories ? String(searchParams.subcategories).split(',') : [];
    const order = searchParams.orderBy ? String(searchParams.orderBy) : "";
    const brands = searchParams.brands ? String(searchParams.brands).split(',') : [];

    const { products, count, currentDepartment, availableBrands }: {
        products: Product[],
        count: number,
        currentDepartment: Department,
        availableBrands: Brand[]
    } = await getData(department, category, subcategories, skip, query, order, brands);

    const currentCategory: Category | undefined = category ? currentDepartment.categories.find((cat: Category) => cat.slug === category) : undefined;

    const activeFilters: ProductFilters = {
        category: currentCategory,
        subcategories: (subcategories && currentCategory) ? currentCategory.subcategories.filter((sub: Subcategory) => subcategories.includes(sub.slug)) : undefined,
        order: order ? PRODUCT_SORT_OPTIONS.find((opt: SortOption) => opt.slug === order) : PRODUCT_SORT_OPTIONS[0],
        brands: brands ? availableBrands.filter((brd: Brand) => brands.includes(brd.slug)) : undefined
    };

    const baseUrl = `http://localhost:3000/shop${department ? '/' + department : ''}`

    const breadcrumbs = [
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
        breadcrumbs.push({ name: category, href: `shop/${department}?category=${category}` })
    }

    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <div className="py-8">
                <Breadcrumb routes={breadcrumbs} />
            </div>

            {/* FILTERS */}
            <div className='py-8'>
                <Filters
                    route='shop'
                    currentDepartment={currentDepartment}
                    currentBrands={availableBrands}
                    activeFilters={activeFilters}
                />
            </div>

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
                    baseUrl={baseUrl}
                    category={category}
                    subcategories={subcategories}
                    order={order}
                    brands={brands}
                />
            </div>

        </div>
    )
}