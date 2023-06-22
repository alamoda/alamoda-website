import Link from "next/link";
import Image from "next/image";

const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 2,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 3,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    }
]


export default function Page() {
    return (
        <>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white">
                <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="font text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                                Welcome to Alamoda!
                            </h1>
                            <h2 className="mt-4 font-semibold text-lg text-gray-800">
                                Alamoda is the premier platform for exploring 1000+ of the finest luxury brands at unbeatable prices.
                            </h2>
                            <p className="mt-2 text-gray-800">
                                We have a deep appreciation for the incredible luxury shopping experience Italy has to offer and wanted to share that with the world.
                            </p>
                            <p className="mt-1 text-gray-800">
                                Our cutting-edge website allows customers to effortlessly purchase brand-new, in-season, and completely authentic items at the retail price set in Italy, which is usually lower than prices found in the US.
                            </p>
                            <p className="mt-2 text-gray-800 font-semibold">
                                This translates to a consistent savings of 50 to 60% off US retail prices!
                            </p>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <Image
                                                        src="/hero1.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <Image
                                                        src="/hero2.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <Image
                                                        src="/hero3.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <Image
                                                        src="/hero4.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <Image
                                                        src="/hero5.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <Image
                                                        src="/hero6.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <Image
                                                        src="/hero7.jpg"
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl leading-8 text-gray-600">
                                    Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                                    eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
                                    Eleifend egestas fringilla sapien.
                                </p>
                                <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                    <p>
                                        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed
                                        amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius
                                        sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
                                        Mattis mauris semper sed amet vitae sed turpis id.
                                    </p>
                                    <p className="mt-10">
                                        Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie
                                        auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et
                                        ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:flex lg:flex-auto lg:justify-center">
                                <dl className="w-64 space-y-8 xl:w-80">
                                    <div className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-base leading-7 text-gray-600">Luxury fashion sales</dt>
                                        <dd className="text-5xl font-semibold tracking-tight text-gray-900">44 million</dd>
                                    </div>
                                    <div className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-base leading-7 text-gray-600">US Luxury fashion sales</dt>
                                        <dd className="text-5xl font-semibold tracking-tight text-gray-900">$50 billion</dd>
                                    </div>
                                    <div className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-base leading-7 text-gray-600">Americans overpaid luxury</dt>
                                        <dd className="text-5xl font-semibold tracking-tight text-gray-900">$20 billion</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner */}
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0">
                            <Image
                                src="/men.jpg"
                                alt="duomo"
                                className="h-full w-full object-cover object-center"
                                width={1000}
                                height={1000}
                            />
                        </div>
                        <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    <span className="block sm:inline">Experience Italian retail prices without leaving your doorstep.</span>
                                </h2>
                                <p className="mt-3 text-xl text-white">
                                    Make your desk beautiful and organized. Post a picture to social media and watch it get more likes than
                                    life-changing announcements. Reflect on the shallow nature of existence. At least you have a really nice
                                    desk setup.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Section */}
            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Learn how to grow your business with our expert advice.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <article key={post.id} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <Image
                                        src={post.imageUrl}
                                        alt=""
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                        width={1000}
                                        height={1000}
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.datetime} className="text-gray-500">
                                            {post.date}
                                        </time>
                                        <a
                                            href={post.category.href}
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {post.category.title}
                                        </a>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a href={post.href}>
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                    </div>
                                    <div className="relative mt-8 flex items-center gap-x-4">
                                        <Image
                                            src={post.author.imageUrl}
                                            alt=""
                                            className="h-10 w-10 rounded-full bg-gray-100"
                                            width={1000}
                                            height={1000}
                                        />
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                <a href={post.author.href}>
                                                    <span className="absolute inset-0" />
                                                    {post.author.name}
                                                </a>
                                            </p>
                                            <p className="text-gray-600">{post.author.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}