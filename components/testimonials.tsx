import { cn } from '@/lib/util';
import Script from 'next/script';
import Image from 'next/image';

const featuredTestimonial = {
    body: 'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.',
    author: {
        name: 'Brenna Goyette',
        handle: 'brennagoyette',
        imageUrl:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
    },
}
const testimonials = [
    [
        [
            {
                body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
                author: {
                    name: 'Leslie Alexander',
                    handle: 'lesliealexander',
                    imageUrl:
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
        ],
        [
            {
                body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.',
                author: {
                    name: 'Lindsay Walton',
                    handle: 'lindsaywalton',
                    imageUrl:
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
        ],
    ],
    [
        [
            {
                body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
                author: {
                    name: 'Tom Cook',
                    handle: 'tomcook',
                    imageUrl:
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
        ],
        [
            {
                body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
                author: {
                    name: 'Leonard Krasner',
                    handle: 'leonardkrasner',
                    imageUrl:
                        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
        ],
    ],
]

export default function Testimonials() {
    return (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-26'>
            <div className="mx-auto max-w-xl text-center">
                <h2 className="text-lg leading-8 tracking-tight text-gray-600">Testimonials</h2>
                <p className="mt-2 text-4xl tracking-tight text-gray-900 sm:text-4xl">
                    Shared by Our Clients
                </p>

                <div className="mt-4">
                    {/* Trustpilot */}
                    <Script src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" />

                    <div className="trustpilot-widget font-sans" data-locale="en-US" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="6477b767a164d7a66fa3f704" data-style-height="24px" data-style-width="100%" data-theme="light" data-min-review-count="10" data-without-reviews-preferred-string-id="1" data-style-alignment="left">
                        <a href="https://www.trustpilot.com/review/alamodainc.com" target="_blank" rel="noopener">Trustpilot</a>
                    </div>
                </div>


            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                <figure className="col-span-2 hidden sm:block sm:bg-white sm:shadow-md sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1">
                    <blockquote className="p-12 text-xl leading-8 tracking-tight text-gray-900">
                        <p>{`“${featuredTestimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
                        <Image
                            className="h-10 w-10 flex-none rounded-full bg-gray-50"
                            src={featuredTestimonial.author.imageUrl}
                            alt=""
                            width={1000}
                            height={1000}
                        />
                        <div className="flex-auto">
                            <div className="font-semibold">{featuredTestimonial.author.name}</div>
                            <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                        </div>
                    </figcaption>
                </figure>
                {testimonials.map((columnGroup, columnGroupIdx) => (
                    <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                        {columnGroup.map((column, columnIdx) => (
                            <div
                                key={columnIdx}
                                className={cn(
                                    (columnGroupIdx === 0 && columnIdx === 0) ||
                                        (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                                        ? 'xl:row-span-2'
                                        : 'xl:row-start-1',
                                    'space-y-8'
                                )}
                            >
                                {column.map((testimonial) => (
                                    <figure
                                        key={testimonial.author.handle}
                                        className="bg-white p-6 shadow-md ring-1 ring-gray-900/5"
                                    >
                                        <blockquote className="text-gray-900">
                                            <p>{`“${testimonial.body}”`}</p>
                                        </blockquote>
                                        <figcaption className="mt-6 flex items-center gap-x-4">
                                            <Image
                                                className="h-10 w-10 rounded-full bg-gray-50"
                                                src={testimonial.author.imageUrl}
                                                alt=""
                                                width={1000}
                                                height={1000}
                                            />
                                            <div>
                                                <div className="font-semibold">{testimonial.author.name}</div>
                                                <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                                            </div>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}