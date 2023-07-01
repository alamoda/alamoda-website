import ProductList from '@/app/(components)/ProductList'
import Testimonials from '@/app/(components)/Testimonials'
import Link from 'next/link'

const collections = [
    {
        name: 'Desk and Office',
        description: 'Work from home accessories',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
    },
    {
        name: 'Self-Improvement',
        description: 'Journals and note-taking',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
    },
    {
        name: 'Travel',
        description: 'Daily commute essentials',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
    },
]

const testimonials = [
    {
        id: 1,
        quote:
            'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
        attribution: 'Sarah Peters, New Orleans',
    },
    {
        id: 2,
        quote:
            'I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!',
        attribution: 'Kelly McPherson, Chicago',
    },
    {
        id: 3,
        quote:
            'Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.',
        attribution: 'Chris Paul, Phoenix',
    },
]

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
                                            <img
                                                src="https://www.baseblu.com/img/cms/home/donna06.jpg"
                                                alt="Women collection"
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
                                            <img
                                                src="https://www.baseblu.com/img/cms/home/uomo06.jpg"
                                                alt="Men collection"
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
                                            <img
                                                src="https://luxurylivinggroup.com/wp-content/uploads/2021/11/Versace-Home-SuperSalone-2021_22-1.jpg"
                                                alt="Lifestyle collection"
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
                    <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-32">

                        <div className="">
                            {/* @ts-expect-error Server Component */}
                            <ProductList
                                listTitle="New in for Women"
                                filterParams={new URLSearchParams({
                                    department: "women",
                                })}
                                listUrl={`shop/women`}
                            />
                        </div>

                        <div className="py-24 sm:py-32">
                            {/* @ts-expect-error Server Component */}
                            <ProductList
                                listTitle="New in for Men"
                                filterParams={new URLSearchParams({
                                    department: "men",
                                })}
                                listUrl={`shop/men`}
                            />
                        </div>

                        <div className="">
                            {/* @ts-expect-error Server Component */}
                            <ProductList
                                listTitle="New in for Lifestyle"
                                filterParams={new URLSearchParams({
                                    department: "lifestyle",
                                })}
                                listUrl={`shop/lifestyle`}
                            />
                        </div>
                    </div>
                </section>

                <Testimonials />

            </main>
        </div>
    )
}