import Breadcrumb from '@/app/(components)/Breadcrumb';

import { Brand } from "@prisma/client";
import Filters from '@/app/(components)/Filters';
import { Department, ProductFilters, SortOption } from '@/app/(types)';
import { DEPARTMENTS, PRODUCT_SORT_OPTIONS } from '@/app/(utils)/constants';
import ProductList from '@/app/(components)/ProductList';
import { getBrands } from '@/app/actions';
import { getURL, prepareProductQueryFilters } from '@/app/(utils)/helpers';
import { Suspense } from 'react';
import Pagination from '@/app/(components)/Pagination';
import ProductListSkeleton from '@/app/(components)/ProductListSkeleton';

export default async function Shop(
    {
        searchParams,
        params,
    }: {
        searchParams: { [key: string]: string | string[] | undefined },
        params: { department: string },
    }) {

    const take = 60;
    const skip = searchParams.skip ? Number(searchParams.skip) : 0;
    const query = searchParams.q ? String(searchParams.q) : "";
    const department = params.department;
    const category = searchParams.category ? String(searchParams.category) : "";
    const subcategories = searchParams.subcategories ? String(searchParams.subcategories).split(',') : [];
    const order = searchParams.orderBy ? String(searchParams.orderBy) : "";
    const brands = searchParams.brands ? String(searchParams.brands).split(',') : [];

    const activeFilters: ProductFilters = {
        statuses: [2],
        available: true,
        department: department,
        category: category,
        subcategories: subcategories,
        brands: brands,
        query: query,
    }

    // Order By
    const foundOrder = PRODUCT_SORT_OPTIONS.find((o: SortOption) => o.slug === order);
    const orderBy = foundOrder ? foundOrder : PRODUCT_SORT_OPTIONS[0];

    
    // URL
    const baseURL = `${process.env.NEXT_PUBLIC_URL}shop${department ? '/' + department : ''}`;
    const currentURL = getURL(baseURL, searchParams);

    
    // Department + Category
    const foundDepartment = DEPARTMENTS.find((dept) => dept.slug === department);
    const currentDepartment =  foundDepartment !== undefined ? foundDepartment : {} as Department;
    const currentCategory = currentDepartment.categories.find((cat) => cat.slug === category);


    // Breadcrumbs
    const breadcrumbs = [
        {
            name: 'Shop',
            href: '/shop'
        },
        {
            name: department,
            href: `/shop/${department}`
        },
        ...(category ? [{ name: category, href: `shop/${department}?category=${category}` }] : [])
    ];


    // Init components
    const productQueryFilters = prepareProductQueryFilters(activeFilters);
    const currentBrands: Brand[] = await getBrands();


    // const currentCategory: Category | undefined = category ? currentDepartment.categories.find((cat: Category) => cat.slug === category) : undefined;
    // const activeFilters: ProductFilters = {
    //     category: currentCategory,
    //     subcategories: (subcategories && currentCategory) ? currentCategory.subcategories.filter((sub: Subcategory) => subcategories.includes(sub.slug)) : undefined,
    //     order: order ? PRODUCT_SORT_OPTIONS.find((opt: SortOption) => opt.slug === order) : PRODUCT_SORT_OPTIONS[0],
    //     brands: brands ? availableBrands.filter((brd: Brand) => brands.includes(brd.slug)) : undefined
    // };

    // const baseUrl = `${process.env.NEXT_PUBLIC_URL}shop${department ? '/' + department : ''}`

    return (
        <>
            {/* BREADCRUMBS */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 hidden md:block">
                <Breadcrumb
                    routes={breadcrumbs}
                />
            </div>

            {/* TITLE */}
            <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 md:pt-0 sm:px-6 lg:px-8">
                <h1 className="text-4xl tracking-tight text-gray-900 capitalize">
                    {currentDepartment?.name} {currentCategory ? `- ${currentCategory.name}` : ""}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-gray-700">
                    {currentDepartment?.description}
                </p>
            </div>

            {/* FILTERS */}
            <Filters
                currentURL={currentURL.toString()}
                currentDepartment={currentDepartment}
                activeFilters={activeFilters}
                currentBrands={currentBrands}
                orderBy={orderBy}
            />

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                {/* PRODUCTS */}
                <Suspense fallback={<ProductListSkeleton/>}>
                    {/* @ts-expect-error Server Component */}
                    <ProductList
                        queryFilters={productQueryFilters}
                        skip={skip}
                        take={take}
                        orderBy={orderBy}
                        baseURL={baseURL}
                    />
                </Suspense>

                {/* PAGINATION */}
                <div className='mt-8'>
                    <Suspense fallback={<p>Loading pagination...</p>}>
                        {/* @ts-expect-error Server Component */}
                        <Pagination
                            queryFilters={productQueryFilters}
                            currentUrl={currentURL}
                            skip={skip}
                            take={60}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}