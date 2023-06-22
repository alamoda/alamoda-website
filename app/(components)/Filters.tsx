'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Category, Subcategory, Department, Brand, SortOption, ProductFilters } from '../(types)'
import { PRODUCT_SORT_OPTIONS } from '../(utils)/constants'

interface ComponentProps {
    route: string
    admin: boolean
    currentDepartment: Department
    currentBrands: Brand[]
    activeFilters: ProductFilters
    currentStatuses?: string[] | undefined
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const statuses = [
    "-1", "0", "1", "2"
]

export default function Filters({ admin, route, currentDepartment, currentBrands, activeFilters, currentStatuses: currentStatuses = ["2"] }: ComponentProps) {

    // State
    const [open, setOpen] = useState(false)
    const [brandSearchTerm, setBrandSearchTerm] = useState<string>("");
    const [displayFilters, setdisplayFilters] = useState<any>([]);

    const baseUrl = `${process.env.URL}${route}/${currentDepartment.slug}`

    useEffect(() => {
        prepareDisplayFilters();
    }, [activeFilters]);

    const prepareDisplayFilters = () => {
        const toDisplayFilters = [];
        if (activeFilters.category) toDisplayFilters.push(activeFilters.category)
        if (activeFilters.subcategories) toDisplayFilters.push(...activeFilters.subcategories)
        if (activeFilters.brands) toDisplayFilters.push(...activeFilters.brands)

        setdisplayFilters(toDisplayFilters)
    };

    const buildUrl = (newFilters: ProductFilters) => {
        const url = new URL(baseUrl);
        const params = new URLSearchParams();

        if (newFilters.category) params.append("category", newFilters.category.slug);

        if (newFilters.subcategories) params.append("subcategories", newFilters.subcategories.map(sub => sub.slug).join(","));

        if (newFilters.order) params.append("orderBy", newFilters.order.slug);

        if (newFilters.brands) params.append("brands", newFilters.brands.map(brd => brd.slug).join(","));

        if (newFilters.statuses) params.append("statuses", newFilters.statuses.join(","));

        url.search = params.toString();
        return url.toString()
    };

    const getCategoryUrl = (cat: Category) => {
        return buildUrl({
            category: cat,
        } as ProductFilters);
    };

    const getSubcategoryUrl = (sub: Subcategory) => {

        let filteredSubcategories: Subcategory[] = [];

        // Remove from URL if filter already included
        if (activeFilters.subcategories?.some((s: Subcategory) => s.slug === sub.slug)) {
            filteredSubcategories = activeFilters.subcategories.filter((val: Subcategory) => val.slug !== sub.slug);
        }
        // Otherwise, just add it to the url
        else {
            if (activeFilters.subcategories) filteredSubcategories = [...activeFilters.subcategories, sub];
            else filteredSubcategories = [sub];
        }

        return buildUrl({
            category: activeFilters.category,
            subcategories: filteredSubcategories,
            order: activeFilters.order,
            brands: activeFilters.brands,
        } as ProductFilters);
    };

    const getSortUrl = (srt: SortOption) => {
        return buildUrl({
            category: activeFilters.category,
            subcategories: activeFilters.subcategories,
            order: srt,
            brands: activeFilters.brands,
        } as ProductFilters);
    };

    const getBrandUrl = (brd: Brand) => {

        let filteredBrands: Brand[] = [];
        // Remove from URL if filter already included
        if (activeFilters.brands?.some((b: Brand) => b.slug === brd.slug)) {
            filteredBrands = activeFilters.brands.filter((val: Brand) => val.slug !== brd.slug);
        }
        // Otherwise, just add it to the url
        else {

            if (activeFilters.brands) filteredBrands = [...activeFilters.brands, brd];
            else filteredBrands = [brd];
        }

        return buildUrl({
            category: activeFilters.category,
            subcategories: activeFilters.subcategories,
            order: activeFilters.order,
            brands: filteredBrands,
        } as ProductFilters);
    };

    const getStatusUrl = (status: string) => {
        let filteredStatuses: string[] = [];
        // Remove from URL if filter already included

        if (currentStatuses && currentStatuses.some((s: string) => s === status)) {
            filteredStatuses = currentStatuses.filter((val: string) => val !== status);
        }
        // Otherwise, just add it to the url
        else {
            if (currentStatuses && currentStatuses.length > 0) filteredStatuses = [...currentStatuses, status];
            else filteredStatuses = [status];
        }

        return buildUrl({
            statuses: filteredStatuses
        } as ProductFilters);
    }

    const getRemoveFilterUrl = (filterSlug: string) => {

        // If it's a category
        // we also remove the category
        if (activeFilters.category?.slug === filterSlug) {
            return buildUrl({} as ProductFilters);
        }

        // If it's a subcategory
        if (activeFilters.subcategories?.some((s: Subcategory) => s.slug === filterSlug)) {
            return buildUrl({
                category: activeFilters.category,
                subcategories: activeFilters.subcategories.filter((val: Subcategory) => val.slug !== filterSlug),
                order: activeFilters.order,
                brands: activeFilters.brands,
            } as ProductFilters);
        }

        // If it's a brand
        if (activeFilters.brands?.some((b: Brand) => b.slug === filterSlug)) {
            return buildUrl({
                category: activeFilters.category,
                subcategories: activeFilters.subcategories,
                order: activeFilters.order,
                brands: activeFilters.brands.filter((val: Brand) => val.slug !== filterSlug),
            } as ProductFilters);
        }

        return "#";
    };

    return (
        <div className="bg-white max-w-7xl mx-auto">

            {/* Mobile filter dialog */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    {activeFilters.subcategories ? (
                                        <span className="ml-1.5 bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                            {activeFilters.subcategories.length}
                                        </span>
                                    ) : null}
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center bg-white p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <div className="mt-4">

                                    {/* Category */}
                                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                        <span className="font-medium text-gray-900">Category</span>
                                                        <span className="ml-6 flex items-center">
                                                            <ChevronDownIcon
                                                                className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>

                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-2">
                                                        {currentDepartment.categories.sort((a: Category, b: Category) => a.order - b.order).map((cat: Category) => (
                                                            <div key={cat.mongo_id} className="flex items-center">
                                                                <Link href={getCategoryUrl(cat)}
                                                                    className={classNames(
                                                                        activeFilters.category && activeFilters.category.slug == cat.slug ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                        'block px-4 py-2 text-sm cursor-pointer capitalize'
                                                                    )}
                                                                >
                                                                    {cat.name}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    {/* Subcategories */}
                                    {activeFilters.category &&
                                        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                            <span className="font-medium text-gray-900 capitalize">{activeFilters.category?.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                <ChevronDownIcon
                                                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>

                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-2">
                                                            {activeFilters.category?.subcategories.sort((a: Subcategory, b: Subcategory) => a.order - b.order).map((sub: Subcategory) => (
                                                                <div key={sub.mongo_id} className="flex items-center whitespace-nowrap">
                                                                    <Link
                                                                        href={getSubcategoryUrl(sub)}>
                                                                        <input
                                                                            name={`${sub.mongo_id}[]`}
                                                                            defaultValue={sub.slug}
                                                                            type="checkbox"
                                                                            readOnly
                                                                            checked={activeFilters.subcategories?.some((s: Subcategory) => s.slug === sub.slug)}
                                                                            className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-900"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${sub.slug}`}
                                                                            className="ml-3 pr-6 text-sm font-regular text-gray-900 capitalize"
                                                                        >
                                                                            {sub.name}
                                                                        </label>
                                                                    </Link>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Filters */}
            <section aria-labelledby="filter-heading">
                <h2 id="filter-heading" className="sr-only">
                    Filters
                </h2>

                <div className="border-b border-gray-200 bg-white pb-4">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                        {/* Sort */}
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="group inline-flex items-center justify-center text-xs font-medium text-gray-900 hover:text-gray-700">
                                    Sort
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-900 group-hover:text-gray-600"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {PRODUCT_SORT_OPTIONS.map((sortOption: SortOption) => (
                                            <Menu.Item key={sortOption.slug}>
                                                {({ active }) => (
                                                    <Link
                                                        href={getSortUrl(sortOption)}
                                                        className={classNames(
                                                            sortOption.slug === activeFilters.order?.slug ? 'font-medium text-gray-900' : 'text-gray-500',
                                                            active ? 'bg-gray-100' : '',
                                                            'text-xs block px-4 py-2'
                                                        )}
                                                    >
                                                        {sortOption.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        {/* Mobile open filters */}
                        <button
                            type="button"
                            className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                            onClick={() => setOpen(true)}
                        >
                            Filters
                            {(activeFilters.subcategories && activeFilters.subcategories.length > 0) ? (
                                <span className="ml-1.5 bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                    {activeFilters.subcategories.length}
                                </span>
                            ) : null}
                        </button>

                        <div className="hidden sm:block">
                            <div className="flow-root">

                                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">

                                    {/* Status */}
                                    {admin &&
                                        <Popover className="relative inline-block px-4 text-left">
                                            <Popover.Button className="group inline-flex items-center justify-center text-xs font-medium text-gray-900 hover:text-gray-600">
                                                <span className="capitalize">Statuses</span>
                                                {(currentStatuses && currentStatuses.length > 0) ? (
                                                    <span className="ml-1.5 bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                                        {currentStatuses.length}
                                                    </span>
                                                ) : null}
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >

                                                <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <form className="space-y-4">
                                                        {statuses.map((status: string) => (
                                                            <div key={status} className="flex items-center whitespace-nowrap">
                                                                <Link
                                                                    href={getStatusUrl(status)}>
                                                                    <input
                                                                        name={status}
                                                                        defaultValue={status}
                                                                        type="checkbox"
                                                                        readOnly
                                                                        checked={currentStatuses?.some((s: string) => s === status)}
                                                                        className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-900"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${status}`}
                                                                        className="ml-3 pr-6 text-xs text-gray-900 capitalize"
                                                                    >
                                                                        {status}
                                                                    </label>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </Popover.Panel>
                                            </Transition>
                                        </Popover>
                                    }

                                    {/* Brands */}
                                    <Popover className="relative inline-block px-4 text-left">
                                        <Popover.Button className="group inline-flex items-center justify-center text-xs font-medium text-gray-900 hover:text-gray-600">
                                            <span className="capitalize">Brands</span>
                                            {(activeFilters.brands && activeFilters.brands.length > 0) ? (
                                                <span className="ml-1.5 bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                                    {activeFilters.brands.length}
                                                </span>
                                            ) : null}
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-900 group-hover:text-gray-600"
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >

                                            <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <form className="space-y-4 w-48">

                                                    <div className="relative flex flex-1 items-center justify-center">
                                                        <div className="w-full sm:max-w-xs">
                                                            <label htmlFor="search" className="sr-only">
                                                                Search
                                                            </label>
                                                            <div className="relative">
                                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </div>
                                                                <input
                                                                    id="search"
                                                                    name="search"
                                                                    className="block w-full border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                                                    placeholder="Search"
                                                                    type="search"
                                                                    autoComplete="false"
                                                                    value={brandSearchTerm}
                                                                    onChange={event => setBrandSearchTerm(event.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="overflow-y-auto h-64">
                                                        {currentBrands
                                                            ?.filter((brand: Brand) => brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase()))
                                                            .map((brand: Brand) => (
                                                                <div key={brand.mongo_id} className="flex items-center truncate">
                                                                    <Link
                                                                        href={getBrandUrl(brand)} className="p-1">
                                                                        <input
                                                                            name={`${brand.mongo_id}[]`}
                                                                            defaultValue={brand.slug}
                                                                            type="checkbox"
                                                                            readOnly
                                                                            checked={activeFilters.brands?.some((b: Brand) => b.slug === brand.slug)}
                                                                            className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-900"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${brand.slug}`}
                                                                            className="ml-3 pr-6 text-xs font-normal text-gray-900 capitalize truncate"
                                                                        >
                                                                            {brand.name}
                                                                        </label>
                                                                    </Link>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </form>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>


                                    {/* Category */}
                                    <Menu as="div" className="relative inline-block text-left px-4">
                                        <div>
                                            <Menu.Button className="group inline-flex items-center justify-center text-xs font-medium text-gray-900 hover:text-gray-600">
                                                Category
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-900 group-hover:text-gray-600"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    {currentDepartment.categories.sort((a: Category, b: Category) => a.order - b.order).map((cat: Category) => (
                                                        <Menu.Item key={cat.mongo_id}>
                                                            {({ active }) => (
                                                                <Link href={getCategoryUrl(cat)}
                                                                    className={classNames(
                                                                        activeFilters.category && activeFilters.category.slug == cat.slug ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-xs cursor-pointer capitalize'
                                                                    )}
                                                                >
                                                                    {cat.name}
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    {/* Subcategory */}
                                    {activeFilters.category &&
                                        <Popover className="relative inline-block px-4 text-left">
                                            <Popover.Button className="group inline-flex items-center justify-center text-xs font-medium text-gray-900 hover:text-gray-600">
                                                <span className="capitalize">{activeFilters.category.name}</span>
                                                {(activeFilters.subcategories && activeFilters.subcategories.length > 0) ? (
                                                    <span className="ml-1.5 bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                                        {activeFilters.subcategories.length}
                                                    </span>
                                                ) : null}
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-900 group-hover:text-gray-600"
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >

                                                <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <form className="space-y-1">
                                                        {activeFilters.category.subcategories.sort((a: Subcategory, b: Subcategory) => a.order - b.order).map((sub: Subcategory) => (
                                                            <div key={sub.mongo_id} className="flex items-center whitespace-nowrap">
                                                                <Link
                                                                    href={getSubcategoryUrl(sub)}>
                                                                    <input
                                                                        name={`${sub.mongo_id}[]`}
                                                                        defaultValue={sub.slug}
                                                                        type="checkbox"
                                                                        readOnly
                                                                        checked={activeFilters.subcategories?.some((s: Subcategory) => s.slug === sub.slug)}
                                                                        className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-900"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${sub.slug}`}
                                                                        className="ml-3 pr-6 text-xs text-gray-900 capitalize"
                                                                    >
                                                                        {sub.name}
                                                                    </label>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </Popover.Panel>
                                            </Transition>
                                        </Popover>
                                    }
                                </Popover.Group>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active filters */}
                {displayFilters.length > 0 &&
                    <div className="bg-gray-100">
                        <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
                            <h3 className="text-sm font-medium text-gray-500">
                                Filters
                                <span className="sr-only">, active</span>
                            </h3>

                            <div aria-hidden="true" className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

                            <div className="mt-2 sm:ml-4 sm:mt-0">
                                <div className="-m-1 flex flex-wrap items-center">

                                    {displayFilters.map((activeFilter: any) => (
                                        <span
                                            key={activeFilter.slug}
                                            className="m-1 inline-flex items-center border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-xs font-medium text-gray-900"
                                        >
                                            <span className="capitalize">{activeFilter.name}</span>
                                            <Link
                                                type="button"
                                                href={getRemoveFilterUrl(activeFilter.slug)}
                                                className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                            >
                                                <span className="sr-only">Remove filter for {activeFilter.name}</span>
                                                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                                </svg>
                                            </Link>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </div>
    )
}
