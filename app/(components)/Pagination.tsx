import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

interface ComponentProps {
  productCount: number
  skip: number
  baseUrl: string
  category: string
  subcategories: string[]
  order: string
  brands: string[]
  statuses?: string[]
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const productLimit = 60;

export default function Pagination({ productCount, skip, baseUrl, category, subcategories, order, brands, statuses }: ComponentProps) {

  const selectedPage = Math.ceil((skip + 60) / 60);
  const pageCount = Math.ceil(productCount / productLimit);

  const buildUrl = (updatedSkip: number) => {
    const url = new URL(baseUrl);
    const params = new URLSearchParams();

    if (category) params.append("category", category);

    if (subcategories && subcategories.length > 0) params.append("subcategories", subcategories.join(','));

    if (order) params.append("orderBy", order);
    
    if (brands && brands.length > 0) params.append("brands", brands.join(','));

    if (statuses && statuses.length > 0) params.append("statuses", statuses.join(','));

    params.append('skip', updatedSkip.toString());

    url.search = params.toString();
    return url.toString()
  };

  if (pageCount > 1) {
    return (
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        {selectedPage > 1 ?
          <div className="-mt-px flex w-0 flex-1">
            <Link
              href={buildUrl(skip - productLimit)}
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </Link>
          </div>
          :
          <div className="-mt-px flex w-0 flex-1">
          </div>
        }
        <div className="hidden md:-mt-px md:flex">
          {Array.from({ length: pageCount }).map((_, index) => {
            if (index + 1 == 1 || index + 1 === pageCount || (selectedPage > pageCount - 5 && index + 1 > pageCount - 5) || (index + 1 < selectedPage + 5 && selectedPage < 5) || (index + 1 >= selectedPage && index + 1 < selectedPage + 5 && selectedPage >= 5)) {
              return <Link
                key={index + 1}
                href={buildUrl((index) * productLimit)}
                className={classNames(
                  index + 1 === selectedPage
                    ? 'inline-flex items-center border-t-2 border-gray-500 px-4 pt-4 text-sm font-medium text-gray-600'
                    : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
                )}
              >
                {index + 1}
              </Link>;
            } else if ((selectedPage > pageCount - 5 && index + 1 === pageCount - 5) || (index + 1 === selectedPage - 1 && selectedPage >= 5) || index + 1 === selectedPage + 5) {
              return <p key={index + 1} className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500">...</p>; // Placeholder for skipped elements
            }
            return null; // Ignore elements in the middle
          })}
        </div>
        {selectedPage !== pageCount ?
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <Link
              href={buildUrl(skip + productLimit)}
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Link>
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
