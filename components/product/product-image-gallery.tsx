'use client'

import { Dialog, Tab, Transition } from '@headlessui/react'
import Image from 'next/image'
import ImageScroll from '@/app/(components)/ImageScroll'
import { Fragment, useState } from 'react'
import { Product } from '../(types)'

interface ProductImageGalleryProps {
    product: Product
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
    const [currentImage, setCurrentImage] = useState<{ src: string, alt: string } | null>(null)

    const openImageModal = (image: string) => {

        setCurrentImage({ src: image, alt: product.description || product.mongo_id })
    };

    return (
        <>
            <Transition appear show={currentImage != null} as={Fragment}>
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
            </Transition>

            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                {/* Desktop images */}
                <Tab.Group as="div" className="hidden md:flex flex-col-reverse">
                    {/* Image selector */}
                    <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                        <Tab.List className="grid grid-cols-4 gap-6">
                            {product?.images.map((image: string, imageIdx: number) => (
                                <Tab
                                    key={imageIdx}
                                    className="relative flex aspect-h-13 aspect-w-10 cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className="sr-only">{product.name}</span>
                                            <span className="absolute inset-0 overflow-hidden">
                                                <Image 
                                                src={image} 
                                                alt="" 
                                                className="h-full w-full object-cover object-center" 
                                                width={1000}
                                                height={1000}
                                                />
                                            </span>
                                            <span
                                                className={classNames(
                                                    selected ? 'shadow-lg' : '',
                                                    'pointer-events-none absolute inset-0 rounded-md'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </>
                                    )}
                                </Tab>
                            ))}
                        </Tab.List>
                    </div>

                    <Tab.Panels className="aspect-h-13 aspect-w-10 w-full">
                        {product?.images.map((image: string, imageIdx: number) => (
                            <Tab.Panel key={imageIdx}>
                                <Image
                                    onClick={() => openImageModal(image)}
                                    key={image}
                                    src={image}
                                    alt={product.description || product.mongo_id}
                                    width={1000}
                                    height={1333}
                                    className="h-full w-full object-cover object-center"
                                />
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>

                {/* Mobile Images */}
                <div className="block md:hidden">
                    <ImageScroll images={product?.images ? product?.images : []} onImageClick={openImageModal} alt={product?.name ? product?.name : ""} />
                </div>
            </div>
        </>
    )
}