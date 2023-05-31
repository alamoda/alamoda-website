import { Disclosure } from '@headlessui/react'

const filters = [
    { id: 1, name: 'Categories', href: '/categories', current: false },
    { id: 2, name: 'Designers', href: '/designers', current: false },
    { id: 3, name: 'Sizes', href: '/sizes', current: false },
    { id: 4, name: 'Price', href: '/price', current: false },
]

export default function Filters() {
    const currentTab = '';

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className="bg-white">
                <dl className="mt-6 ">
                    {filters.map((filter) => (
                        <Disclosure as="div" key={filter.id} className="pt-6">
                            {({ open }) => (
                                <>
                                    <dt>
                                        <Disclosure.Button className="flex w-full items-start justify-between text-left pb-2 border-b">
                                            <span className="text-base leading-7">{filter.name}</span>
                                            <span className="ml-6 flex h-7 items-center">
                                                {open ? (
                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-md ">
                                                        -
                                                    </span>
                                                ) : (
                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-md ">
                                                        +
                                                    </span>
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </dt>
                                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                        <p className="text-base leading-7 text-gray-600">{filter.href}</p>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </dl>
            </div>
        </>
    )

}