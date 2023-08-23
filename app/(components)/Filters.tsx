'use client'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { SortOption, ProductFilters, Category, Subcategory } from '../(types)'
import { PRODUCT_SORT_OPTIONS } from '../(utils)/constants'
import { cn } from '../(utils)/helpers'
import { Brand } from '@prisma/client'

interface FiltersProps {
    currentURL: string
    activeFilters: ProductFilters
    availableBrands: Brand[]
    orderBy: SortOption
}

export default function Filters({ currentURL, activeFilters, availableBrands, orderBy }: FiltersProps) {

    // State
    const [open, setOpen] = useState(false)
    const [brandSearchTerm, setBrandSearchTerm] = useState<string>("");

    const prepareDisplayFilters = () => {

        const toDisplayFilters = [];

        if (activeFilters.category) {
            const url = new URL(currentURL);
            url.searchParams.delete("category");
            url.searchParams.delete("subcategories");
            url.searchParams.delete("skip");

            toDisplayFilters.push({ name: activeFilters.category.name, url: url.toString() });
        }

        if (activeFilters.subcategories) {
            for (let i = 0; i < activeFilters.subcategories.length; i++) {
                const subcategory = activeFilters.subcategories[i];

                const url = new URL(currentURL);

                // Remove from URL if filter already included
                const filteredSubcategories = activeFilters.subcategories.filter((val) => val.slug !== subcategory.slug);

                if (filteredSubcategories.length === 0) url.searchParams.delete("subcategories")
                else url.searchParams.set("subcategories", filteredSubcategories.map(s => s.slug).join(','))

                url.searchParams.delete("skip");

                toDisplayFilters.push({ name: subcategory.name, url: url.toString() });
            }
        }

        if (activeFilters.brands) {
            for (let i = 0; i < activeFilters.brands.length; i++) {
                const brand = activeFilters.brands[i];

                const url = new URL(currentURL);

                // Remove from URL if filter already included
                const filteredBrands = activeFilters.brands.filter((val) => val.slug !== brand.slug);

                if (filteredBrands.length === 0) url.searchParams.delete("brands")
                else url.searchParams.set("brands", filteredBrands.map(b => b.slug).join(','))

                url.searchParams.delete("skip");

                toDisplayFilters.push({ name: brand.name, url: url.toString() });
            }
        }

        return toDisplayFilters;

    };

    const displayFilters = prepareDisplayFilters();

    const getCategoryUrl = (category: Category) => {

        const url = new URL(currentURL);
        url.searchParams.set("category", category.slug);
        url.searchParams.delete("subcategories");
        url.searchParams.delete("skip");

        return url.toString();
    };

    const getSubcategoryUrl = (subcategory: Subcategory) => {

        const url = new URL(currentURL);
        let filteredSubcategories: Subcategory[] = [];

        // Remove from URL if filter already included
        if (activeFilters.subcategories?.some((s) => s.slug === subcategory.slug)) {
            filteredSubcategories = activeFilters.subcategories.filter((s) => s.slug !== subcategory.slug);
        }
        // Otherwise, just add it to the url
        else {
            if (activeFilters.subcategories) filteredSubcategories = [...activeFilters.subcategories, subcategory];
            else filteredSubcategories = [subcategory];
        }

        url.searchParams.set("subcategories", filteredSubcategories.map((s) => s.slug).join(','))
        url.searchParams.delete("skip");

        return url.toString();
    };

    const getBrandUrl = (brand: Brand) => {

        const url = new URL(currentURL);

        let filteredBrands: Brand[] = [];
        // Remove from URL if filter already included
        if (activeFilters.brands?.some((b) => b.slug === brand.slug)) {
            filteredBrands = activeFilters.brands.filter((b) => b.slug !== brand.slug);
        }
        // Otherwise, just add it to the url
        else {
            if (activeFilters.brands) filteredBrands = [...activeFilters.brands, brand];
            else filteredBrands = [brand];
        }

        url.searchParams.set("brands", filteredBrands.map(b => b.slug).join(','))
        url.searchParams.delete("skip");

        return url.toString();
    };

    const getSortUrl = (sortOption: SortOption) => {
        const url = new URL(currentURL);
        url.searchParams.set("orderBy", sortOption.slug);
        url.searchParams.delete("skip");

        return url.toString();
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
                                                                className={cn(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>

                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-2">
                                                        {activeFilters.department?.categories.sort((a: Category, b: Category) => a.order - b.order).map((cat: Category) => (
                                                            <div key={cat.mongo_id} className="flex items-center">
                                                                <a href={getCategoryUrl(cat)}
                                                                    className={cn(
                                                                        activeFilters.category && activeFilters.category.slug == cat.slug ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                        'block px-4 py-2 text-sm cursor-pointer capitalize'
                                                                    )}
                                                                >
                                                                    {cat.name}
                                                                </a>
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
                                                                    className={cn(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>

                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-2">
                                                            {activeFilters.category?.subcategories.sort((a: Subcategory, b: Subcategory) => a.order - b.order).map((sub: Subcategory) => (
                                                                <div key={sub.mongo_id} className="flex items-center whitespace-nowrap">
                                                                    <a
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
                                                                    </a>
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
                                    {orderBy ? orderBy.name : "Sort"}
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
                                                    <a
                                                        href={getSortUrl(sortOption)}
                                                        className={cn(
                                                            sortOption.slug === orderBy.slug ? 'font-medium text-gray-900' : 'text-gray-500',
                                                            active ? 'bg-gray-100' : '',
                                                            'text-xs block px-4 py-2 cursor-pointer'
                                                        )}
                                                    >
                                                        {sortOption.name}
                                                    </a>
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
                                                        {availableBrands
                                                            ?.filter((brand: Brand) => brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase()))
                                                            .map((brand: Brand) => (
                                                                <div key={brand.mongo_id} className="flex items-center truncate">
                                                                    <a
                                                                        href={getBrandUrl(brand)} className="p-1 cursor-pointer hover:bg-gray-100 w-full">
                                                                        <input
                                                                            name={`${brand.mongo_id}[]`}
                                                                            defaultValue={brand.slug}
                                                                            type="checkbox"
                                                                            readOnly
                                                                            style={{ pointerEvents: 'none' }}
                                                                            checked={activeFilters.brands?.some((b) => b.slug === brand.slug)}
                                                                            className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-900"
                                                                        />
                                                                        <span
                                                                            className="ml-3 pr-6 text-xs font-normal text-gray-900 capitalize truncate"
                                                                        >
                                                                            {brand.name}
                                                                        </span>
                                                                    </a>
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
                                                    {activeFilters.department?.categories.sort((a: Category, b: Category) => a.order - b.order).map((cat: Category) => (
                                                        <Menu.Item key={cat.slug}>
                                                            {({ active }) => (
                                                                <a href={getCategoryUrl(cat)}
                                                                    className={cn(
                                                                        activeFilters.category && activeFilters.category.slug == cat.slug ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-xs cursor-pointer capitalize'
                                                                    )}
                                                                >
                                                                    {cat.name}
                                                                </a>
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
                                                        {activeFilters.category?.subcategories.sort((a: Subcategory, b: Subcategory) => a.order - b.order).map((sub: Subcategory) => (
                                                            <div key={sub.slug} className="flex items-center whitespace-nowrap">
                                                                <a
                                                                    href={getSubcategoryUrl(sub)}
                                                                    className='p-1 cursor-pointer hover:bg-gray-100 w-full'
                                                                >
                                                                    <input
                                                                        name={`${sub.mongo_id}[]`}
                                                                        defaultValue={sub.slug}
                                                                        type="checkbox"
                                                                        readOnly
                                                                        style={{ pointerEvents: 'none' }}
                                                                        checked={activeFilters.subcategories?.some((s: Subcategory) => s.slug === sub.slug)}
                                                                        className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-900"
                                                                    />
                                                                    <span
                                                                        className="ml-3 pr-6 text-xs text-gray-900 capitalize"
                                                                    >
                                                                        {sub.name}
                                                                    </span>
                                                                </a>
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

                                    {displayFilters.map((activeFilter, index) => (
                                        <span
                                            key={index}
                                            className="m-1 inline-flex items-center border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-xs font-medium text-gray-900"
                                        >
                                            <span className="capitalize">{activeFilter.name}</span>
                                            <a
                                                type="button"
                                                href={activeFilter.url}
                                                className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                            >
                                                <span className="sr-only">Remove filter for {activeFilter.name}</span>
                                                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                                </svg>
                                            </a>
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
