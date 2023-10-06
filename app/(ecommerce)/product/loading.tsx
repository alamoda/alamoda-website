import ProductListSkeleton from "@/components/skeleton/product-list-skeleton";

export default function Loading() {
  return (
    <>
      <div className="hidden md:block">
        <nav className="flex items-center justify-center">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <div className="h-4 bg-gray-100 w-8" />
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <div className="h-4 bg-gray-100 w-8" />
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="py-16 md:pt-0">
        <div className="h-16 bg-gray-100 w-24 animate-pulse" />
        <div className="mt-4 max-w-xl animate-pulse space-y-1">
          <div className="h-4 bg-gray-100 w-full" />
          <div className="h-4 bg-gray-100 w-full" />
          <div className="h-4 bg-gray-100 w-3/4" />
        </div>
      </div>

      <ProductListSkeleton items={32} />
    </>
  );
}
