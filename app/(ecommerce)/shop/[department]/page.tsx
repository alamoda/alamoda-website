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
import ProductListSkeleton from '@/app/(components)/skeletons/ProductListSkeleton';
import PaginationSkeleton from '@/app/(components)/skeletons/PaginationSkeleton';

export default async function Shop(
    {
        searchParams,
        params,
    }: {
        searchParams: { [key: string]: string | string[] | undefined },
        params: { department: string },
    }) {

    // Get all parameters
    const takeParam = 60;
    const skipParam = searchParams.skip ? Number(searchParams.skip) : 0;
    const queryParam = searchParams.q ? String(searchParams.q) : "";
    const departmentParam = params.department;
    const categoryParam = searchParams.category ? String(searchParams.category) : "";
    const subcategoriesParam = searchParams.subcategories ? String(searchParams.subcategories).split(',') : [];
    const orderParam = searchParams.orderBy ? String(searchParams.orderBy) : "";
    const brandsParam = searchParams.brands ? String(searchParams.brands).split(',') : [];

    // Order By
    const foundOrder = PRODUCT_SORT_OPTIONS.find((o: SortOption) => o.slug === orderParam);
    const orderBy = foundOrder ? foundOrder : PRODUCT_SORT_OPTIONS[0];

    // Department, Category, Subcategories
    const foundDepartment = DEPARTMENTS.find((dept) => dept.slug === departmentParam);
    const currentDepartment = foundDepartment !== undefined ? foundDepartment : {} as Department;
    const currentCategory = currentDepartment.categories.find((cat) => cat.slug === categoryParam);
    const paramSubcategoriesSet = new Set(subcategoriesParam);
    const currentSubcategories = currentCategory?.subcategories.filter((subcategory) => paramSubcategoriesSet.has(subcategory.slug))

    // Brands
    const availableBrands: Brand[] = await getBrands();
    const paramBrandSet = new Set(brandsParam);
    const currentBrands = availableBrands.filter(brand => paramBrandSet.has(brand.slug));

    // Breadcrumbs
    const breadcrumbs = [
        {
            name: 'Shop',
            href: '/shop'
        },
        {
            name: currentDepartment.name,
            href: `/shop/${currentDepartment.slug}`
        },
        ...(currentCategory ? [{ name: currentCategory.name, href: `shop/${currentDepartment}?category=${currentCategory.slug}` }] : [])
    ];

    // URL
    const baseURL = `${process.env.NEXT_PUBLIC_URL}shop${currentDepartment ? '/' + currentDepartment.slug : ''}`;
    const currentURL = getURL(baseURL, searchParams);

    // Init components
    const activeFilters: ProductFilters = {
        statuses: [2],
        available: true,
        department: currentDepartment,
        category: currentCategory,
        subcategories: currentSubcategories,
        brands: currentBrands,
        query: queryParam
    }

    const productQueryFilters = prepareProductQueryFilters(activeFilters);

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
                activeFilters={activeFilters}
                availableBrands={availableBrands}
                orderBy={orderBy}
            />

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                {/* PRODUCTS */}
                <Suspense fallback={<ProductListSkeleton items={60} />}>
                    {/* @ts-expect-error Server Component */}
                    <ProductList
                        queryFilters={productQueryFilters}
                        skip={skipParam}
                        take={takeParam}
                        orderBy={orderBy}
                        baseURL={baseURL}
                    />
                </Suspense>

                {/* PAGINATION */}
                <div className='mt-8'>
                    <Suspense fallback={<PaginationSkeleton />}>
                        {/* @ts-expect-error Server Component */}
                        <Pagination
                            queryFilters={productQueryFilters}
                            currentUrl={currentURL}
                            skip={skipParam}
                            take={takeParam}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}