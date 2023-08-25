'use client'

import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Feature } from "../(types)";
import { Product } from "@prisma/client";
import { cn } from "../(utils)/helpers";

interface ProductFeaturesProps {
    product: Product
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {

    const features = product.features as Feature[];

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
                                            className={cn(open ? 'text-gray-800' : 'text-gray-900', 'text-sm font-medium')}
                                        >
                                            Features
                                        </span>
                                        <span className="ml-6 flex items-center">
                                            {open ? (
                                                <MinusIcon
                                                    className="block h-5 w-5 text-gray-900 group-hover:text-gray-800"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <PlusIcon
                                                    className="block h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </span>
                                    </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel as="div" className="prose prose-sm">
                                    <ul role="list">
                                        {features.map((feature: Feature) => (
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