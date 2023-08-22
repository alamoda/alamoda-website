import Breadcrumb from '@/app/(components)/Breadcrumb';

import { Brand } from "@prisma/client";
import Filters from '@/app/(components)/Filters';
import { ProductFilters, SortOption } from '@/app/(types)';
import { PRODUCT_SORT_OPTIONS } from '@/app/(utils)/constants';
import ProductList from '@/app/(components)/ProductList';
import { getBrands } from '@/app/actions';
import { getURL, prepareProductQueryFilters } from '@/app/(utils)/helpers';
import { Suspense } from 'react';
import Pagination from '@/app/(components)/Pagination';

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

    let orderFilter: SortOption = PRODUCT_SORT_OPTIONS[0];
    if (order) {
        const res = PRODUCT_SORT_OPTIONS.find((o: SortOption) => o.slug === order);
        if (res) orderFilter = res
    }

    const productQueryFilters = prepareProductQueryFilters(activeFilters);

    const brandsResult: Brand[] = await getBrands();

    const currentURL = getURL(`${process.env.NEXT_PUBLIC_URL}shop${department ? '/' + department : ''}`, searchParams);

    const breadcrumbs = [
        {
            name: 'Shop',
            href: '/shop'
        },
        {
            name: department,
            href: `/shop/${department}`
        }
    ];

    if (category) {
        breadcrumbs.push({ name: category, href: `shop/${department}?category=${category}` })
    }


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
                    {currentDepartment.name + (currentCategory ? ` - ${currentCategory.name}` : "")}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-gray-700">
                    {currentDepartment.description}
                </p>
            </div>

            {/* FILTERS */}
            {/* <Filters
                admin={false}
                route='shop'
                currentDepartment={currentDepartment}
                currentBrands={availableBrands}
                activeFilters={activeFilters}
            /> */}

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                {/* PRODUCTS */}
                <Suspense fallback={<p>Loading feed...</p>}>
                    {/* @ts-expect-error Server Component */}
                    <ProductList
                        queryFilters={productQueryFilters}
                        skip={skip}
                        take={take}
                        order={orderFilter}
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