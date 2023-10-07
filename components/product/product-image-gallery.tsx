'use client'

import { ProductWithRelations } from '@/lib/db'
import Image from 'next/image'
import { useState } from 'react'
import { GridTileImage } from './product-grid-tile-image'
import ImageScroll from '../image-scroll'

export default function ProductImageGallery({ product }: { product: ProductWithRelations }) {

    const [currentImage, setCurrentImage] = useState<number>(0);

    const images = product.images as string[];
    const alt = product.description || (`${product.name} - ${product.brand.name}`);

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

                    {/* Desktop */}
                    <div className="hidden md:block relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
                        {images[currentImage] && (
                            <Image
                                className="h-full w-full object-contain"
                                width={1000}
                                height={1333}
                                alt={alt}
                                src={images[currentImage]}
                                priority={true}
                            />
                        )}
                    </div>

                    {/* Mobile */}
                    <div className='md:hidden'>
                        <ImageScroll
                            images={images}
                            alt={alt}
                            onImageClick={() => console.log("test")}
                        />
                    </div>

                    {/* Desktop Only */}
                    {images.length > 1 ? (
                        <ul className="my-6
                         md:flex items-center justify-center gap-2 overflow-hidden py-1 lg:mb-0 hidden">
                            {images.map((image, index) => {
                                const isActive = index === currentImage;
                                return (
                                    <li key={index} className="w-20">
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