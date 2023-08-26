import { cn } from "@/lib/util";

export default function PaginationSkeleton() {

    return (
        <nav className="flex items-center justify-center border-t border-gray-200 px-4 sm:px-0">
            <div className="hidden md:-mt-px md:flex space-x-1">
                {Array.from({ length: 5 }).map((_, index) =>
                    <div
                        key={index + 1}
                        className={cn(
                            index + 1 === 1
                                ? 'inline-flex items-center border-t-2 border-gray-500 px-4 pt-4 text-sm font-medium text-gray-600'
                                : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500',
                                'h-8 bg-gray-100 animate-pulse'
                        )}
                    >
                    </div>
                )}
            </div>
        </nav>
    )
}
