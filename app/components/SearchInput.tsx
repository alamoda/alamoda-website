"use client";

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function SearchInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathName = usePathname();

    function onSearch(e: React.FormEvent) {
        e.preventDefault();

        if (typeof searchQuery !== "string") {
            return;
        }

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`${pathName}/search?q=${encodedSearchQuery}`);
    };

    return (
        <>
            <form onSubmit={onSearch} className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                    Search
                </label>
                <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                />
                <input
                    id="search-field"
                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
        </>
    )
}