'use client'

import Breadcrumb from '@/app/components/Breadcrumb';
import Header from '@/app/components/Header';
import Pagination from '@/app/components/Pagination';
import ProductCard from '@/app/components/ProductCard';
import Filters from '@/app/components/Filters';
import Footer from '@/app/components/Footer';

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

async function getData(department: string | null, category: string | null, subcategory: string | null, skip: Number = 0) {

    const departementParam = department ? `department=${department}&` : ''
    const categoryParam = category ? `category=${category}&` : ''
    const subcategoryParam = subcategory ? `subcategory=${subcategory}&` : ''


    const res = await fetch(`http://localhost:3000/api/products?${departementParam}${categoryParam}${subcategoryParam}limit=60&skip=${skip}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}

export default async function Shop({ params }: { params: { slug: Array<string> } }) {

    const data = await getData(params.slug ? params.slug[0] : null, params.slug ? params.slug[1] : null, params.slug ? params.slug[2] : null);

    const pages = []
    if (params.slug && params.slug[0]) pages.push({ name: params.slug[0], href: "" })
    if (params.slug && params.slug[1]) pages.push({ name: params.slug[1], href: "" })
    if (params.slug && params.slug[2]) pages.push({ name: params.slug[2], href: "" })


    return (
        <>
            <Header />
            <Breadcrumb pages={pages} />
            <Filters />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {data.products.map((product: any) => (
                            <ProductCard key={product.mongo_id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}