'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { cn } from '../(utils)/helpers';
import { DEPARTMENTS } from '../(utils)/constants';

interface SearchPaletteProps {
    open: boolean;
    path: string
    toggle: (val: boolean) => void;
}

export default function SearchPalette({ open, path, toggle }: SearchPaletteProps) {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchDepartment, setSearchDepartment] = useState<string>('women');
    const router = useRouter();

    function onSearch(e: React.FormEvent) {
        e.preventDefault();

        if (typeof searchQuery !== "string") {
            return;
        }

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`/${path}/${searchDepartment}?q=${encodedSearchQuery}`);

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
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/20" />
                </Transition.Child>

                <div className="fixed left-0 inset-16 z-10 overflow-y-auto p-4 sm:p-6 md:p-20 w-full">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="mx-auto max-w-2xl lg:max-w-md transform p-4 bg-gray-100 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                            <form onSubmit={onSearch}>
                                <input
                                    value={searchQuery}
                                    className="w-full border-0 bg-white px-4 py-2 text-gray-900 sm:text-sm outline-none"
                                    placeholder="Search..."
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                            </form>
                            <div className="flex justify-center items-center pt-4">
                                {DEPARTMENTS.map((dept) => (
                                    <div key={dept.slug} className='px-2'>
                                        <button
                                            onClick={() => setSearchDepartment(dept.slug)}
                                            className={cn(searchDepartment == dept.slug ?
                                                'border-b-2 border-gray-900 pb-2' : 'pb-2',
                                                'text-xs text-gray-900')}
                                        >
                                            {dept.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
