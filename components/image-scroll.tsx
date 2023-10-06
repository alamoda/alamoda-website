'use client'

import { useState, useRef } from 'react'
import Image from 'next/image';
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { cn } from '@/lib/util';

interface ComponentProps {
    images: string[]
    onImageClick: Function
    alt: string
}

export default function ImageScroll({ images, onImageClick, alt }: ComponentProps) {
    const [imgPaginationIndex, setImgPaginationIndex] = useState<number>(0)

    const flicking = useRef<any>();

    return (
        <>
            {/* Scoll */}
            <Flicking
                ref={flicking}
                align="prev"
                circular={false}
                onChanged={(e: any) => setImgPaginationIndex(e.index || 0)}
            >
                {images.map(image =>
                    <Image
                        onClick={() => onImageClick(image)}
                        key={image}
                        src={image}
                        alt={alt}
                        width={1000}
                        height={1333}
                        className="card-panel cursor-zoom-in h-full w-full object-cover object-center"
                    />
                )}
            </Flicking>

            {/* Pagination */}
            <div className="flex items-center justify-center">
                {images.map((img: string, imgIdx: number) =>
                    <div
                        key={img}
                        onClick={() => flicking.current.moveTo(imgIdx)}
                        className={cn(
                            imgIdx === imgPaginationIndex ? 'bg-gray-900' : 'bg-gray-200 hover:bg-gray-300',
                            'rounded-full h-3 w-3 mr-2 cursor-pointer'
                        )} />
                )}
            </div>
        </>
    )
}