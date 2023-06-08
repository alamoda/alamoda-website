'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import axios from 'axios'
import { Category, Subcategory, Department } from '../(types)'

interface ComponentProps {
    route: string,
    department: string,
    category: string,
    subcategories: string[],
}

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Filters({ route, department, category, subcategories }: ComponentProps) {

    // State
    const [open, setOpen] = useState(false)

    const [availableDepartment, setAvailableDepartment] = useState<Department>();

    useEffect(() => {
        fetchFilters();
    }, []);

    async function fetchFilters() {
        const resCat = await axios.get(`http://localhost:3000/api/departments/${department}`);
        setAvailableDepartment(resCat.data);
    }

    const activeFilters: string[] = [];

    if (category) {
        activeFilters.push(category);
    }

    if (category && subcategories) {
        activeFilters.push(...subcategories);
    }

    const getSubcategoryUrl = (sub: Subcategory) => {

        // Remove from URL if filter already included
        if (subcategories.includes(sub.slug.toLowerCase())) {
            return getRemoveSubcategoryUrl(sub.slug.toLowerCase());
        }
        // Otherwise, just add it to the url
        else {
            return getAddSubcategoryUrl(sub.slug.toLowerCase());
        }
    };

    const getAddSubcategoryUrl = (slug: string) => {
        return `${route}/${department}?category=${category.toLowerCase()}&subcategories=${[...subcategories, slug].join()}`
    };

    const getRemoveSubcategoryUrl = (slug: string) => {
        let filteredSubcategories = subcategories.filter(val => val !== slug);
        let subcategoriesStr = filteredSubcategories.join(',');
        return `${route}/${department}?category=${category.replace(' ', '-').toLowerCase()}&subcategories=${subcategoriesStr}`
    };

    const getRemoveFilterUrl = (filterSlug: string) => {

        // If it's a category
        // we also remove the category
        if (filterSlug === category) {
            return `${route}/${department}`;
        }

        // If it's a subcategory
        if (subcategories.some((s: string) => s === filterSlug)) {
            return getRemoveSubcategoryUrl(filterSlug);
        }
        return ""
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
                                    {subcategories.length > 0 ? (
                                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                            {subcategories.length}
                                        </span>
                                    ) : null}
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
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
                                                        {availableDepartment?.categories.map((cat: Category, catIdx: number) => (
                                                            <div key={cat.mongo_id} className="flex items-center">
                                                                <Link href={`${route}/${department}?category=${cat.slug.toLowerCase()}`}
                                                                    className={classNames(
                                                                        category && category.toLowerCase() == cat.slug.toLowerCase() ? 'font-medium text-gray-900' : 'text-gray-500',

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
                                    {category &&
                                        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                            <span className="font-medium text-gray-900 capitalize">{category.replace('-', ' ').toLowerCase()}</span>
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
                                                            {availableDepartment?.categories.find((cat: Category) => cat.slug === category)?.subcategories.map((sub: Subcategory) => (
                                                                <div key={sub.mongo_id} className="flex items-center whitespace-nowrap">
                                                                    <Link
                                                                        href={getSubcategoryUrl(sub)}>
                                                                        <input
                                                                            name={`${sub.mongo_id}[]`}
                                                                            defaultValue={sub.slug}
                                                                            type="checkbox"
                                                                            readOnly
                                                                            checked={subcategories.some((s: any) => s.toLowerCase() === sub.slug.toLowerCase())}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <button
                            type="button"
                            className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                            onClick={() => setOpen(true)}
                        >
                            Filters
                            {subcategories.length > 0 ? (
                                <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                    {subcategories.length}
                                </span>
                            ) : null}
                        </button>

                        <div className="hidden sm:block">
                            <div className="flow-root">

                                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">

                                    {/* Category */}
                                    <Menu as="div" className="relative inline-block text-left px-4">
                                        <div>
                                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                Category
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                                            <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    {availableDepartment?.categories.map((cat: Category) => (
                                                        <Menu.Item key={cat.mongo_id}>
                                                            {({ active }) => (
                                                                <Link href={`${route}/${department}?category=${cat.slug.toLowerCase()}`}
                                                                    className={classNames(
                                                                        category && category.toLowerCase() == cat.slug.toLowerCase() ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm cursor-pointer capitalize'
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
                                    {category &&
                                        <Popover className="relative inline-block px-4 text-left">
                                            <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                <span className="capitalize">{category.replace('-', ' ').toLowerCase()}</span>
                                                {subcategories.length > 0 ? (
                                                    <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                                        {subcategories.length}
                                                    </span>
                                                ) : null}
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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

                                                <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <form className="space-y-4">
                                                        {availableDepartment?.categories.find((cat: Category) => cat.slug === category)?.subcategories.map((sub: Subcategory) => (
                                                            <div key={sub.mongo_id} className="flex items-center whitespace-nowrap">
                                                                <Link
                                                                    href={getSubcategoryUrl(sub)}>
                                                                    <input
                                                                        name={`${sub.mongo_id}[]`}
                                                                        defaultValue={sub.slug}
                                                                        type="checkbox"
                                                                        readOnly
                                                                        checked={subcategories.some((s: any) => s.toLowerCase() === sub.slug.toLowerCase())}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${sub.slug}`}
                                                                        className="ml-3 pr-6 text-sm font-medium text-gray-900 capitalize"
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
                {activeFilters.length > 0 &&
                    <div className="bg-gray-100">
                        <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
                            <h3 className="text-sm font-medium text-gray-500">
                                Filters
                                <span className="sr-only">, active</span>
                            </h3>

                            <div aria-hidden="true" className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

                            <div className="mt-2 sm:ml-4 sm:mt-0">
                                <div className="-m-1 flex flex-wrap items-center">
                                    {activeFilters.map((activeFilter: string) => (
                                        <span
                                            key={activeFilter}
                                            className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                                        >
                                            <span className="capitalize">{activeFilter.replace('-', ' ').toLowerCase()}</span>
                                            <Link
                                                type="button"
                                                href={getRemoveFilterUrl(activeFilter)}
                                                className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                            >
                                                <span className="sr-only">Remove filter for {activeFilter}</span>
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
