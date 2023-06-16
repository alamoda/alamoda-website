'use client'

import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Feature, Product } from "../(types)";

interface ProductFeaturesProps {
    product: Product
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
    return (
        <>
            <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                    Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">

                    <Disclosure as="div" defaultOpen={true}>
                        {({ open }) => (
                            <>
                                <h3>
                                    <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                        <span
                                            className={classNames(open ? 'text-gray-800' : 'text-gray-900', 'text-sm font-medium')}
                                        >
                                            Features
                                        </span>
                                        <span className="ml-6 flex items-center">
                                            {open ? (
                                                <MinusIcon
                                                    className="block h-6 w-6 text-gray-900 group-hover:text-gray-800"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <PlusIcon
                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </span>
                                    </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                    <ul role="list">
                                        {product?.features?.map((feature: Feature) => (
                                            <li key={feature.id_feature}>
                                                <span className="capitalize">{feature.name.toLowerCase()}</span>: {feature.value.toUpperCase()}</li>
                                        ))}
                                        <li>
                                            SKU: {product?.sku}
                                        </li>
                                    </ul>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </section>
        </>
    )
}