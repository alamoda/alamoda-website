import { HomeIcon } from '@heroicons/react/20/solid'

interface ComponentProps {
    pages: Page[]
    route: string
}

type Page = {
    name: string,
    href: string,
}

export default function Breadcrumb({ route, pages }: ComponentProps) {
    return (
        <nav className="mb-8 flex items-center justify-center" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                <li>
                    <div className="flex items-center">
                        <a
                            href='#'
                            className="ml-4 text-xs font-medium text-gray-500 hover:text-gray-700"
                        >
                            {route}
                        </a>
                    </div>
                </li>
                {pages.map((page) => (
                    <li key={page.name}>
                        <div className="flex items-center">
                            <svg
                                className="h-5 w-5 flex-shrink-0 text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            <a
                                href={page.href}
                                className="ml-4 text-xs font-medium text-gray-500 hover:text-gray-700 capitalize"
                            >
                                {page.name.replace('-', ' ')}
                            </a>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}