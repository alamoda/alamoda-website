'use client'
import { useState, useEffect } from 'react'
import Breadcrumb from '@/app/components/Breadcrumb';
import Header from '@/app/components/Header';
import Pagination from '@/app/components/Pagination';
import ProductCard from '@/app/components/ProductCard';
import Filters from '@/app/components/Filters';
import Footer from '@/app/components/Footer';

async function getData(department: string | null, category: string | null, subcategories: string[] | null, skip: Number = 0) {

    const departementParam = department ? `department=${department}&` : ''
    const categoryParam = category ? `category=${category}&` : ''
    const subcategoriesParam = subcategories ? `subcategory=${subcategories.join(',')}&` : ''

    const res = await fetch(`http://localhost:3000/api/products?${departementParam}${categoryParam}${subcategoriesParam}limit=60&skip=${skip}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}

export default async function Shop(
    {
        searchParams,
        params
    }: {
        searchParams: { [key: string]: string | string[] | undefined },
        params: { department: string }
    }) {


    const skip = searchParams.skip ? Number(searchParams.skip) : 0;
    const department = params.department;
    const category = searchParams.category ? String(searchParams.category) : "";
    const subcategories = searchParams.subcategories ? String(searchParams.subcategories).split(',') : [];


    // const pages = []
    // if (params.slug && params.slug[0]) pages.push({ name: params.slug[0], href: "" })
    // if (params.slug && params.slug[1]) pages.push({ name: params.slug[1], href: "" })
    // if (params.slug && params.slug[2]) pages.push({ name: params.slug[2], href: "" })

    // const skip = searchParams.skip ? Number(searchParams.skip) : 0;

    // const department = params.slug && params.slug[0] ? params.slug[0] : '';
    // const category = params.slug && params.slug[1] ? params.slug[1] : '';
    // const subcategory = params.slug && params.slug[2] ? params.slug[2] : '';

    const data = await getData(department, category, subcategories, skip);
    const { products, count } = data;

    return (
        <>
            {/* HEADER */}
            <Header />

            {/* BREADCRUMBS */}
            {/* <Breadcrumb pages={pages} route="Shop" /> */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">
                    {category ? category.toLocaleLowerCase().replace('-', ' ') : department.toLowerCase().replace('-', ' ')}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-gray-700">
                    Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
                    organization with these sale items before we run out.
                </p>
            </div>
            {/* <Filters params={params} /> */}

            {/* PRODUCTS */}
            < div className="bg-white" >
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product: any) => (
                            <ProductCard key={product.mongo_id} product={product} />
                        ))}
                    </div>
                    {/* PAGINATION */}
                    {/* <div className='mt-8'>
                        <Pagination
                            productCount={count}
                            skip={skip}
                            route="shop"
                            department={department}
                            category={category}
                            subcategory={subcategory} />
                    </div> */}
                </div>
            </div >



            {/* FOOTER */}
            < Footer />
        </>
    )
}