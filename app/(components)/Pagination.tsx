import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { countProducts } from '../actions';
import { cn } from '../(utils)/helpers';

interface ComponentProps {
  queryFilters: object[]
  currentUrl: URL
  take: number
  skip: number
}

export default async function Pagination({ queryFilters, currentUrl, take, skip }: ComponentProps) {

  const count: number = await countProducts(queryFilters);

  const selectedPage = Math.ceil((skip + take) / take);
  const pageCount = Math.ceil(count / take);

  const buildUrl = (updatedSkip: number) => {

    currentUrl.searchParams.set("skip", updatedSkip.toString());
    return currentUrl.toString();
  };

  if (pageCount > 1) {
    return (
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        {selectedPage > 1 ?
          <div className="-mt-px flex w-0 flex-1">
            <a
              href={buildUrl(skip - take)}
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </a>
          </div>
          :
          <div className="-mt-px flex w-0 flex-1">
          </div>
        }
        <div className="hidden md:-mt-px md:flex">
          {Array.from({ length: pageCount }).map((_, index) => {
            if (index + 1 == 1 || index + 1 === pageCount || (selectedPage > pageCount - 5 && index + 1 > pageCount - 5) || (index + 1 < selectedPage + 5 && selectedPage < 5) || (index + 1 >= selectedPage && index + 1 < selectedPage + 5 && selectedPage >= 5)) {
              return <a
                key={index + 1}
                href={buildUrl((index) * take)}
                className={cn(
                  index + 1 === selectedPage
                    ? 'inline-flex items-center border-t-2 border-gray-500 px-4 pt-4 text-sm font-medium text-gray-600'
                    : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
                )}
              >
                {index + 1}
              </a>;
            } else if ((selectedPage > pageCount - 5 && index + 1 === pageCount - 5) || (index + 1 === selectedPage - 1 && selectedPage >= 5) || index + 1 === selectedPage + 5) {
              return <p key={index + 1} className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500">...</p>; // Placeholder for skipped elements
            }
            return null; // Ignore elements in the middle
          })}
        </div>
        {selectedPage !== pageCount ?
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
              href={buildUrl(skip + take)}
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </a>
          </div>
          :
          <div className="-mt-px flex w-0 flex-1">
          </div>
        }
      </nav>
    )
  }
  return <></>
}
