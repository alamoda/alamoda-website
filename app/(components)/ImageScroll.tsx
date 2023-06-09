'use client'

import { useState, useRef } from 'react'
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

interface ComponentProps {
    images: string[]
    onImageClick: Function
}

export default function ImageScroll({ images, onImageClick }: ComponentProps) {
    const [imgPaginationIndex, setImgPaginationIndex] = useState<number>(0)

    const flicking = useRef<any>();

    return (
        <>
            {/* Scoll */}
            <Flicking
                ref={flicking}
                align="prev"
                circular={false}
                onChanged={(e: any) => setImgPaginationIndex(e.index || 0)}>
                {images.map(image =>
                    <img key={image} className="card-panel cursor-zoom-in" src={image} onClick={() => onImageClick(image)}/>
                )}
            </Flicking>

            {/* Pagination */}
            <div className="flex items-center justify-center">
                {images.map((img: string, imgIdx: number) =>
                    <div
                        key={img}
                        onClick={() => flicking.current.moveTo(imgIdx)}
                        className={classNames(
                            imgIdx === imgPaginationIndex ? 'bg-gray-900' : 'bg-gray-200 hover:bg-gray-300',
                            'rounded-full h-3 w-3 mr-2 cursor-pointer'
                        )} />
                )}
            </div>
        </>
    )
}










