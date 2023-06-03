'use client'

import { useRouter } from 'next/router'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Filter } from '../types'
import { HEADER_NAVIGATION } from '../utils/constants'
import { test } from 'node:test'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Filters({ params }: { params: { slug: Array<string> } }) {

    // State
    const [open, setOpen] = useState(false)
    const [activeFilters, setActiveFilters] = useState<Filter[]>([])
    const [currentDepartment, setCurrentDepartment] = useState<any>()
    const [currentCategory, setCurrentCategory] = useState<any>()
    const [currentSubcategories, setCurrentSubcategories] = useState<any>([])

    // Hooks
    useEffect(() => {
        setCurrentDepartment(HEADER_NAVIGATION.find(element => element.id === params.slug[0].toUpperCase()))
    }, []);

    const test = () => {
        console.log("called");
    };

    // Functions
    const handleCategoryUpdate = (category: any) => {

        if (currentCategory == null) {
            addCategory(category)
        }
        else {
            if (currentCategory.id == category.id) return
            handleFilterRemoved(currentCategory.id)
            addCategory(category)
        }

        // window.location.href = `/shop/${currentDepartment.id.toLowerCase().replace(' ', '-')}/${category.name.toLowerCase()}`;
        // router.push('/about');
    }

    const addCategory = (category: any) => {

        setCurrentCategory(category);

        const filter: Filter = {
            id: category.id,
            name: category.name,
            value: {
                category: category.name
            }
        }
        setActiveFilters((prev: any) => { return [...prev, filter] })
    };

    const removeCategory = (categoryId: any) => {
        setCurrentCategory(null);
        setActiveFilters(activeFilters.filter((element: any) => element.id !== categoryId))
    };

    const handleSubcategoryUpdate = (subcategory: any, event: any) => {
        if (event.target.checked) addSubcategory(subcategory)
        else removeSubcategory(subcategory.id)
    };

    const addSubcategory = (subcategory: any) => {

        setCurrentSubcategories((prev: any) => { return [...prev, { id: subcategory.id, name: subcategory.name }] })

        const filter: Filter = {
            id: subcategory.id,
            name: subcategory.name,
            value: {
                subcategory: subcategory.name
            }
        }

        setActiveFilters((prev: any) => { return [...prev, filter] });
    };

    const removeSubcategory = (subcategoryId: any) => {
        setCurrentSubcategories(currentSubcategories.filter((element: any) => element.id !== subcategoryId));
        setActiveFilters(activeFilters.filter((element: any) => element.id !== subcategoryId));
    };

    const handleFilterRemoved = (id: Number) => {

        // If it's a category
        // we also remove the category
        if (currentCategory.id === id) {
            setCurrentCategory(null);

            let newActiveFilters = [...activeFilters];

            currentSubcategories.forEach((subcategory: any) => {
                newActiveFilters = newActiveFilters.filter((element: any) => element.id !== subcategory.id);
            });
            newActiveFilters = newActiveFilters.filter((element: any) => element.id !== id);
            setActiveFilters(newActiveFilters);
            setCurrentSubcategories([])

            return;
        }

        // If it's a subcategory
        if (currentSubcategories.some((item: any) => item.id === id)) {
            removeSubcategory(id);
            return;
        }
    };

    return (
        <div className="bg-white">

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
                                <form className="mt-4">
                                    {/* Category */}
                                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                        <span className="font-medium text-gray-900">Categories</span>
                                                        <span className="ml-6 flex items-center">
                                                            <ChevronDownIcon
                                                                className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>


                                                {/* <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        {currentDepartment?.categories.map((category, categoryIdx) => (
                                                                <div key={category.id} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${category.id}-${categoryIdx}`}
                                                                        name={`${category.id}[]`}
                                                                        defaultValue={category.name}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </Disclosure.Panel> */}
                                            </>
                                        )}
                                    </Disclosure>
                                </form>
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
                                                    {currentDepartment?.categories.map((category: any) => (
                                                        <Menu.Item key={category.id}>
                                                            {({ active }) => (
                                                                <div
                                                                    onClick={() => handleCategoryUpdate(category)}
                                                                    className={classNames(
                                                                        currentCategory && currentCategory.id == category.id ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm cursor-pointer capitalize'
                                                                    )}
                                                                >
                                                                    {category.name.replace('-', ' ').toLowerCase()}
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    {/* Subcategory */}
                                    {currentCategory &&
                                        <Popover className="relative inline-block px-4 text-left">
                                            <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                <span className="capitalize">{currentCategory.name.replace('-', ' ').toLowerCase()}</span>
                                                {/* {sectionIdx === 0 ? (
                                                                                    <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                                                                        1
                                                                                    </span>
                                                                                ) : null} */}
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
                                                        {currentCategory.subcategories.map((subcategory: any) => (
                                                            <div key={subcategory.id} className="flex items-center">
                                                                <input
                                                                    name={`${subcategory.id}[]`}
                                                                    defaultValue={subcategory.name}
                                                                    type="checkbox"
                                                                    defaultChecked={currentSubcategories.some((sub: any) => sub.id === subcategory.id)}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    onChange={(event) => handleSubcategoryUpdate(subcategory, event)}
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${subcategory.name}`}
                                                                    className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900 capitalize"
                                                                >
                                                                    {subcategory.name.replace('-', ' ').toLowerCase()}
                                                                </label>
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
                                    {activeFilters.map((activeFilter: any) => (
                                        <span
                                            key={activeFilter.id}
                                            className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                                        >
                                            <span className="capitalize">{activeFilter.name.replace('-', ' ').toLowerCase()}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleFilterRemoved(activeFilter.id)}
                                                className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                            >
                                                <span className="sr-only">Remove filter for {activeFilter.name}</span>
                                                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                                </svg>
                                            </button>
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
