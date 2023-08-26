import { Metadata } from 'next';
import { Suspense } from 'react';
import { Brand } from "@prisma/client";
import { getBrands } from '@/app/actions';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getDepartmentBySlug, getURL, prepareProductQueryFilters } from '@/lib/util';
import { PRODUCT_SORT_OPTIONS } from '@/lib/constants';
import { ProductFilters, SortOption } from '@/lib';
import Breadcrumb from '@/components/layout/breadcrumb';
import Filters from '@/components/product/product-filters';
import ProductListSkeleton from '@/components/skeleton/product-list-skeleton';
import ProductList from '@/components/grid/product-list';
import PaginationSkeleton from '@/components/skeleton/pagination-skeleton';
import Pagination from '@/components/layout/pagination';

// Metadata
export function generateMetadata({ params }: { params: { department_slug: string } }): Metadata {

    const department = getDepartmentBySlug(params.department_slug);

    return {
        title: `Shop ${department?.name} | Alamoda`,
        description: department?.description
    }
}

export default async function Shop(
    {
        searchParams,
        params,
    }: {
        searchParams: { [key: string]: string | string[] | undefined },
        params: { department_slug: string },
    }) {

    // Get all parameters
    const takeParam = 32;
    const skipParam = searchParams.skip ? Number(searchParams.skip) : 0;
    const queryParam = searchParams.q ? String(searchParams.q) : "";
    const departmentParam = params.department_slug;
    const categoryParam = searchParams.category ? String(searchParams.category) : "";
    const subcategoriesParam = searchParams.subcategories ? String(searchParams.subcategories).split(',') : [];
    const orderParam = searchParams.orderBy ? String(searchParams.orderBy) : "";
    const brandsParam = searchParams.brands ? String(searchParams.brands).split(',') : [];


    // Department, Category, Subcategories
    const currentDepartment = getDepartmentBySlug(departmentParam);
    const currentCategory = getCategoryBySlug(categoryParam, currentDepartment);
    const paramSubcategoriesSet = new Set(subcategoriesParam);
    const currentSubcategories = currentCategory?.subcategories.filter((subcategory) => paramSubcategoriesSet.has(subcategory.slug))

    if (!currentDepartment) return notFound()

    // Order By
    const foundOrder = PRODUCT_SORT_OPTIONS.find((o: SortOption) => o.slug === orderParam);
    const orderBy = foundOrder ? foundOrder : PRODUCT_SORT_OPTIONS[0];

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
        ...(currentCategory ? [{ name: currentCategory.name, href: `/shop/${currentDepartment.slug}?category=${currentCategory.slug}` }] : [])
    ];

    // URL
    const currentURL = getURL(`${process.env.NEXT_PUBLIC_URL}/shop${currentDepartment ? '/' + currentDepartment.slug : ''}`, searchParams);

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
            <div className="hidden md:block">
                <Breadcrumb
                    routes={breadcrumbs}
                />
            </div>

            {/* TITLE */}
            <div className="py-16 md:pt-0">
                <h1 className="text-4xl tracking-tight text-gray-900 capitalize">
                    {currentDepartment.name} {currentCategory ? `- ${currentCategory.name}` : ""}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-gray-700">
                    {currentDepartment.description}
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
                <Suspense fallback={<ProductListSkeleton items={takeParam} />}>
                    <ProductList
                        queryFilters={productQueryFilters}
                        skip={skipParam}
                        take={takeParam}
                        orderBy={orderBy}
                    />
                </Suspense>

                {/* PAGINATION */}
                <div className='mt-8'>
                    <Suspense fallback={<PaginationSkeleton />}>
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