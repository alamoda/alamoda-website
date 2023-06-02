import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

interface ComponentProps {
  pageCount: number,
  selectedPage: number
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Pagination({ pageCount, selectedPage }: ComponentProps) {
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from({ length: pageCount }).map((_, index) => {
          if (index < 6 || index >= pageCount - 2) {
            return <a
              key={index + 1}
              href="#"
              className={classNames(
                index + 1 === selectedPage
                  ? 'inline-flex items-center border-t-2 border-gray-500 px-4 pt-4 text-sm font-medium text-gray-600'
                  : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
              )}
            >
              {index + 1}
            </a>;
          } else if (index === 6) {
            return <p key={index + 1} className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500">...</p>; // Placeholder for skipped elements
          }
          return null; // Ignore elements in the middle
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      </div>
    </nav>
  )
}
