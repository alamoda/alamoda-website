interface ProductListSkeletonProps {
    items: number
}

export default function ProductListSkeleton({ items }: ProductListSkeletonProps) {

    return (
        <>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20">

                {[...Array(items)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-end animate-pulse"
                    >
                        <div className="flex flex-col justify-center items-center">
                            <div className="relative aspect-h-13 aspect-w-10 w-full overflow-hidden">
                                <div className="flex items-center justify-center bg-gray-100 w-full h-full">
                                    <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="mt-4 h-2.5 bg-gray-100 w-full"></div>
                            <div className="mt-1 h-2.5 bg-gray-100 w-full"></div>
                            <div className="mt-1 h-2.5 bg-gray-100 w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}