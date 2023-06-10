'use client'

import { Component, Fragment, useState } from 'react'
import { UsersIcon } from '@heroicons/react/24/outline'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { usePathname, useRouter } from 'next/navigation'

const people = [
    { id: 1, name: 'Leslie Alexander', url: '#' },
    // More people...
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type ComponentProps = {
    open: boolean;
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchPalettes({ open, toggle }: ComponentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathName = usePathname();

    function onSearch(e: React.FormEvent) {
        e.preventDefault();

        if (typeof searchQuery !== "string") {
            return;
        }

        console.log("pathname", pathName)

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`${pathName}?q=${encodedSearchQuery}`);

        toggle(false);
        setSearchQuery('');
    };

    return (
        <Transition.Root show={open} as={Fragment} appear>
            <Dialog as="div" className="relative z-10" onClose={toggle}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                </Transition.Child>

                <form onSubmit={onSearch}>

                    <div className="fixed inset-16 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                                <input
                                    value={searchQuery}
                                    className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 sm:text-sm outline-none"
                                    placeholder="Search..."
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </form>

            </Dialog>
        </Transition.Root>
    )
}
