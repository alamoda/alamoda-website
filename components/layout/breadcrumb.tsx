import { cn } from "@/lib/util"

interface ComponentProps {
    routes: { name: string, href: string }[],
}

export default function Breadcrumb({ routes }: ComponentProps) {
    return (
        <nav className="flex items-center justify-center" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                {routes.length > 0 && routes.map((route, routeId) => (
                    <li key={route.name}>
                        <div className="flex items-center">
                            {routeId != 0 &&
                                <svg
                                    className="h-5 w-5 flex-shrink-0 text-gray-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                            }
                            <a
                                href={route.href}
                                className={cn(
                                    routeId != 0 ? 'ml-4' : '',
                                    "text-xs font-medium text-gray-500 hover:text-gray-700 capitalize"
                                    )}
                            >
                                {route.name.toLowerCase().replace('-', ' ')}
                            </a>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}