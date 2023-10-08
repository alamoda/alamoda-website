'use client'

import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ProductFilters, ProductScrapeStatus } from '@/lib/index'
import { cn } from '@/lib/util'

interface AdminFiltersProps {
    currentURL: string
    activeFilters: ProductFilters
}

export default function AdminFilters({ currentURL, activeFilters }: AdminFiltersProps) {


    const getAvailabilityURL = (availability: boolean | undefined) => {

        const url = new URL(currentURL);

        if (availability === undefined) {
            url.searchParams.delete("available");
        }
        else {
            url.searchParams.set("available", String(availability));
        }

        url.searchParams.delete("skip");

        return url.toString();
    };

    const getStatusURL = (status: number) => {

        const url = new URL(currentURL);
        let filteredStatuses: number[] = [];

        // Remove from URL if filter already included
        if (activeFilters.statuses?.some((s) => s === status)) {
            filteredStatuses = activeFilters.statuses.filter((s) => s !== status);
        }
        // Otherwise, just add it to the url
        else {
            if (activeFilters.statuses) filteredStatuses = [...activeFilters.statuses, status];
            else filteredStatuses = [status];
        }

        if (filteredStatuses.length === 0) {
            url.searchParams.delete("statuses");
        }
        else {
            url.searchParams.set("statuses", filteredStatuses.map((s) => s).join(','))
        }
        url.searchParams.delete("skip");

        return url.toString();
    };

    return (
        <div className="bg-white max-w-7xl mx-auto">

            {/* Filters */}
            <section aria-labelledby="filter-heading">
                <h2 id="filter-heading" className="sr-only">
                    Filters
                </h2>

                <div className="bg-white pb-8">
                    <div className="mx-auto flex max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8 divide-x divide-gray-200">

                        {/* Availability */}
                        <Menu as="div" className="relative inline-block text-left pr-4">
                            <div>
                                <Menu.Button className="group inline-flex items-center justify-center text-xs font-medium text-gray-900 hover:text-gray-700">
                                    Availability
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
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href={getAvailabilityURL(true)}
                                                    className={cn(
                                                        activeFilters.available === true ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        active ? 'bg-gray-100' : '',
                                                        'text-xs block px-4 py-2 cursor-pointer'
                                                    )}
                                                >
                                                    Available
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href={getAvailabilityURL(false)}
                                                    className={cn(
                                                        activeFilters.available === false ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        active ? 'bg-gray-100' : '',
                                                        'text-xs block px-4 py-2 cursor-pointer'
                                                    )}
                                                >
                                                    Unavailable
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href={getAvailabilityURL(undefined)}
                                                    className={cn(
                                                        activeFilters.available === undefined ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        active ? 'bg-gray-100' : '',
                                                        'text-xs block px-4 py-2 cursor-pointer'
                                                    )}
                                                >
                                                    Any
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        {/* Statuses */}
                        <Popover className="relative inline-block text-left pl-4">
                            <Popover.Button className="group inline-flex items-center justify-center text-xs font-medium text-gray-900 hover:text-gray-600">
                                <span className="capitalize">Statuses</span>
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
                                        {Object.keys(ProductScrapeStatus)
                                            .filter(key => isNaN(Number(key))) // Filter out non-numeric keys
                                            .map((status: any) => (
                                                <div key={ProductScrapeStatus[status]} className="flex items-center whitespace-nowrap">
                                                    <a
                                                        href={getStatusURL(Number(ProductScrapeStatus[status]))}
                                                        className='p-1 cursor-pointer hover:bg-gray-100 w-full'
                                                    >
                                                        <input
                                                            name={`${ProductScrapeStatus[status]}[]`}
                                                            defaultValue={ProductScrapeStatus[status]}
                                                            type="checkbox"
                                                            readOnly
                                                            style={{ pointerEvents: 'none' }}
                                                            checked={activeFilters.statuses?.some((s) => s === Number(ProductScrapeStatus[status]))}
                                                            className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-900"
                                                        />
                                                        <span
                                                            className="ml-3 pr-6 text-xs text-gray-900 capitalize"
                                                        >
                                                            {status}
                                                        </span>
                                                    </a>
                                                </div>
                                            ))}
                                    </form>
                                </Popover.Panel>
                            </Transition>
                        </Popover>


                    </div>
                </div>

            </section>
        </div>
    )
}
