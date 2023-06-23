interface NewsletterProps {
    title: string
    description?: string
}

export default function Newsletter({title, description}: NewsletterProps) {
    return (
        <div className="bg-white py-16 sm:py-24 lg:py-32">
            <div className="flex mx-auto gap-x-10 max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl tracking-tight text-gray-900">
                    <h2 className="inline sm:block lg:inline xl:block">{title}</h2>{' '}
                    <p className="inline sm:block lg:inline xl:block">{description}</p>
                </div>
                <form className="mx-auto lg:pt-2">
                    <div className="flex gap-x-4">
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                            placeholder="Enter your email"
                        />
                        <button
                            type="submit"
                            className="flex-none bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                        >
                            Subscribe
                        </button>
                    </div>
                    <p className="mt-4 text-xs leading-6 text-gray-900">
                        We care about your data. Read our{' '}
                        <a href="#" className="font-semibold hover:text-gray-800">
                            privacy&nbsp;policy
                        </a>
                        .
                    </p>
                </form>
            </div>
        </div>
    )
}