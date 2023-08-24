import Testimonials from '@/app/(components)/Testimonials'
import Link from 'next/link'
import ProductListPreview from '@/app/(components)/ProductListPreview'
import { getDepartmentBySlug, prepareProductQueryFilters } from '@/app/(utils)/helpers'

import womenPreviewImage from '@/public/women-preview.webp';
import menPreviewImage from '@/public/men-preview.webp';
import lifestylePreviewImage from '@/public/lifestyle-preview.webp';
import Image from 'next/image';


export default function Page() {

    return (
        <div className="bg-white">
            <main>
                {/* Hero section */}
                <div className="relative">
                    <section aria-labelledby="collection-heading" className="relative pt-24">
                        <h2 id="collection-heading" className="sr-only">
                            Collections
                        </h2>
                        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
                            <div
                                className="group relative h-96 bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
                            >
                                <div>
                                    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                                            <Image
                                                src={womenPreviewImage}
                                                alt="Woman wearing a white dress posing for the Women collection preview."
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                                    </div>
                                    <div className="absolute inset-0 flex items-end p-6">
                                        <div>
                                            <p aria-hidden="true" className="text-xs text-white">
                                                Shop the collection
                                            </p>
                                            <h3 className="mt-1 text-sm font-semibold text-white">
                                                <Link href="shop/women">
                                                    <span className="absolute inset-0" />
                                                    Women
                                                </Link>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="group relative h-96 bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
                            >
                                <div>
                                    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                                            <Image
                                                src={menPreviewImage}
                                                alt="Man walking in the street with a long coat posing for the Men collection preview."
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                                    </div>
                                    <div className="absolute inset-0 flex items-end p-6">
                                        <div>
                                            <p aria-hidden="true" className="text-xs text-white">
                                                Discover
                                            </p>
                                            <h3 className="mt-1 text-sm font-semibold text-white">
                                                <Link href="shop/men">
                                                    <span className="absolute inset-0" />
                                                    Men
                                                </Link>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="group relative h-96 bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
                            >
                                <div>
                                    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                                            <Image
                                                src={lifestylePreviewImage}
                                                alt="A livingroom decorated with Versace items for the Lifestyle collection preview."
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                                    </div>
                                    <div className="absolute inset-0 flex items-end p-6">
                                        <div>
                                            <p aria-hidden="true" className="text-xs text-white">
                                                Discover the collection
                                            </p>
                                            <h3 className="mt-1 text-sm font-semibold text-white">
                                                <Link href="shop/lifestyle">
                                                    <span className="absolute inset-0" />
                                                    Lifestyle
                                                </Link>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Preview */}
                <section aria-labelledby="trending-heading">
                    <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-32 space-y-24 sm:space-y-32">

                        <ProductListPreview
                            queryFilters={prepareProductQueryFilters({
                                statuses: [2],
                                available: true,
                                department: getDepartmentBySlug("women"),
                            })}
                            take={4}
                            productBaseURL={'/shop'}
                            collectionTitle='New in for Women'
                            collectionURL={`/shop/women`}
                        />

                        <ProductListPreview
                            queryFilters={prepareProductQueryFilters({
                                statuses: [2],
                                available: true,
                                department: getDepartmentBySlug("men"),
                            })}
                            take={4}
                            productBaseURL={'/shop'}
                            collectionTitle='New in for Men'
                            collectionURL={`/shop/men`}
                        />

                        <ProductListPreview
                            queryFilters={prepareProductQueryFilters({
                                statuses: [2],
                                available: true,
                                department: getDepartmentBySlug("lifestyle"),
                            })}
                            take={4}
                            productBaseURL={'/shop'}
                            collectionTitle='New in for Lifestyle'
                            collectionURL={`/shop/lifestyle`}
                        />
                    </div>
                </section>

                <Testimonials />

            </main>
        </div>
    )
}