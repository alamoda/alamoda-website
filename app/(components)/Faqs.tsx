"use client"

import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
        question: "How does Alamoda work?",
        answer:
            "Alamoda is an online retailer that brings the world's most luxurious designer brands to its clients at discounts of up to 80% off retail. All our items are new and authentic. We provide our clientele with the latest designer collections at a fraction of the cost.",
    },
    {
        question: "Where do you get your items, and why are the prices so competitive?",
        answer:
            "We exclusively work with the best boutiques and designers, across Europe and the US, that are authorized sellers of the luxury brands we carry. By closely working with these leading industry players, we guarantee our clients the same standards of authenticity as the world’s top boutiques. We do not work with third-party wholesalers or resellers.",
    },
    {
        question: "Do items arrive in the original packaging?",
        answer:
            "Absolutely. All items come in their original boxes and packaging, except for handbags that usually ship in their original dust bags.",
    },
    {
        question: "What is the return policy?",
        answer:
            "Items are returnable within 14 days of receipt. You will receive a credit for your next Alamoda purchase. All returned items must be wrapped in the original packaging and must be unaltered, undamaged, and in the same new condition they were shipped.",
    },
    {
        question: "How do I return my order?",
        answer:
            "Please DM us your order number, which items you'd like to exchange/return, and the reason for your return. We'll send you a pre-paid DHL return label with instructions for the item collection or drop-off.",
    },
    {
        question: "Which countries are you shipping to and what are the shipping costs?",
        answer:
            "Currently, we only ship in the US with DHL. US Shipping Costs: $20 Rest of the World, stay tuned :)",
    },
    {
        question: "When will my order ship?",
        answer:
            "Orders usually ship within 1-2 business days from Europe, and we will notify you as soon as it has shipped.",
    },
    {
        question: "Has my order been dispatched?",
        answer:
            "As soon as your order has been dispatched, you'll receive a shipping confirmation message from us with a tracking link to track your order.",
    },
    {
        question: "Do I have to pay duty and import charges?",
        answer:
            "Orders up to the value of 800 USD will not incur any extra charges (such as duties and taxes). For orders exceeding 800 USD, you may be liable for duty charges from your local customs authority. Please double check with them or send us a DM when in doubt.",
    },
    {
        question: "Can I change or cancel an order once it has been placed?",
        answer:
            "If you need to make any changes to your order, please DM us as soon as possible, and we'll do our best to accommodate your request. Please note that once our team has processed your order, we cannot make any changes.",
    },
]

export default function Faqs() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq, index) => (
                            <Disclosure as="div" key={index} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    {open ? (
                                                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    ) : (
                                                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
