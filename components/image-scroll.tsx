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

    const flicking = useRef<any>();
    const [imgPaginationIndex, setImgPaginationIndex] = useState<number>(0)
    
    const moveTo = (index: number) => {
        flicking.current.moveTo(index).catch(() => void 0);
    }

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


            <nav className="flex items-center border-t border-gray-200">
                    {images.map((img: string, imgIdx: number) =>
                        <div
                            key={img}
                            onClick={() => moveTo(imgIdx)}
                            className={cn(
                                imgIdx === imgPaginationIndex ? 'border-gray-900' : 'border-transparent hover:border-gray-300',
                                'inline-flex items-center border-t-2 px-4 pt-4 w-full'
                            )} />
                    )}
            </nav>
        </>
    )
}