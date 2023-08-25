import { Brand } from "@prisma/client";
import Filters from '@/app/(components)/Filters';
import { ProductFilters, SortOption } from '@/app/(types)';
import { PRODUCT_SORT_OPTIONS } from '@/app/(utils)/constants';
import ProductList from '@/app/(components)/ProductList';
import { getBrands } from '@/app/actions';
import { getCategoryBySlug, getDepartmentBySlug, getURL, prepareProductQueryFilters } from '@/app/(utils)/helpers';
import { Suspense } from 'react';
import Pagination from '@/app/(components)/Pagination';
import ProductListSkeleton from '@/app/(components)/skeletons/ProductListSkeleton';
import PaginationSkeleton from '@/app/(components)/skeletons/PaginationSkeleton';
import { notFound } from 'next/navigation';

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

    // URL
    const currentURL = getURL(`${process.env.NEXT_PUBLIC_URL}/dashboard/products${currentDepartment ? '/' + currentDepartment.slug : ''}`, searchParams);

    // Init components
    const activeFilters: ProductFilters = {
        statuses: [-1, 0, 1, 2],
        available: true,
        department: currentDepartment,
        category: currentCategory,
        subcategories: currentSubcategories,
        brands: currentBrands,
        query: queryParam
    }

    const productQueryFilters = prepareProductQueryFilters(activeFilters);

    return (
        <div className="py-16">

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
                        productBaseURL={`/dashboard/products`}
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
        </div>
    )
}