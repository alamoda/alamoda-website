'use client'

import { ProductWithRelations } from '@/lib/db'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { GridTileImage } from './product-grid-tile-image'
import { cn } from '@/lib/util'
import ImageScroll from '../image-scroll'

export default function ProductImageGallery({ product }: { product: ProductWithRelations }) {
    // const [currentImage, setCurrentImage] = useState<{ src: string, alt: string } | null>(null);

    const [currentImage, setCurrentImage] = useState<number>(0);

    const images = product.images as string[];

    const goToImage = (index: number) => {
        setCurrentImage(index);
    }

    return (
        <>
            {/* <Transition appear show={currentImage != null} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setCurrentImage(null)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-auto transform overflow-hidden p-6 text-left align-middle transition-all">
                                    <Image
                                        src={currentImage?.src || ""}
                                        width={500}
                                        height={500}
                                        alt={currentImage?.alt || ""}
                                        className="mx-auto min-h-full"
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}

            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="h-full w-full basis-full lg:basis-4/6">
                    <ImageScroll images={images} onImageClick={() => console.log("test")} alt='hello' />
                    {/* <div className="relative aspect-square h-full w-full overflow-hidden">
                        {images[currentImage] && (
                            <Image
                                className="h-full w-full object-contain"
                                width={1000}
                                height={1333}
                                alt={product.description || (`${product.name} - ${product.brand.name}`)}
                                src={images[currentImage]}
                                priority={true}
                            />
                        )}
                    </div> */}

                    {images.length > 1 ? (
                        <ul className="my-6
                         md:flex items-center justify-center gap-2 overflow-hidden py-1 lg:mb-0 hidden ">
                            {images.map((image, index) => {
                                const isActive = index === currentImage;
                                return (
                                    <li key={index} className="">
                                        <button
                                            type="button"
                                            aria-label="Enlarge product image"
                                            onClick={() => goToImage(index)}
                                            className=""
                                        >
                                            <GridTileImage
                                                alt={product.description || (`${product.name} - ${product.brand.name}`)}
                                                src={image}
                                                width={80}
                                                height={80}
                                                active={isActive}
                                            />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : null}
                </div>
            </div>
        </>
    )
}