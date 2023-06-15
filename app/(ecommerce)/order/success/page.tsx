import Stripe from "stripe";
import Image from 'next/image';

interface pageProps {
    searchParams: { [key: string]: string | string[] | undefined },
}

const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        price: '$36.00',
        color: 'Charcoal',
        size: 'L',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg',
        imageAlt: "Model wearing men's charcoal basic tee in large.",
    },
    // More products...
]

export default async function page({ searchParams }: pageProps) {

    const session_id = searchParams.session_id ? String(searchParams.session_id) : '';

    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
        typescript: true,
        apiVersion: "2022-11-15"
    });

    const session = await stripe.checkout.sessions.retrieve(session_id) as Stripe.Checkout.Session;
    const shipping = session?.shipping_details;

    const orderId = session?.metadata?.orderId;

    const response = await fetch(`http://localhost:3000/api/order?id=${orderId}`, {
        method: 'GET'
    });

    const order = await response.json();
    console.log("order", order);

    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-16 xl:gap-x-24">
                <h1 className="text-sm font-medium text-gray-900">Payment successful</h1>
                <p className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">Thanks for shopping with us!</p>
                <div className="mt-4 text-sm text-gray-800">
                    <p> We appreciate your order, we’re currently processing it. </p>
                    <p> So hang tight and we’ll send you confirmation at {session.customer_email} very soon! </p>
                </div>
                <ul
                    role="list"
                    className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
                >
                    {products.map((product) => (
                        <li key={product.id} className="flex space-x-6 py-6">
                            <Image
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                width={100}
                                height={100}
                                className="flex-none rounded-md bg-gray-100 object-cover object-center"
                            />
                            <div className="flex-auto space-y-1">
                                <h3 className="text-gray-900">
                                    <a href={product.href}>{product.name}</a>
                                </h3>
                                <p>{product.color}</p>
                                <p>{product.size}</p>
                            </div>
                            <p className="flex-none font-medium text-gray-900">{product.price}</p>
                        </li>
                    ))}
                </ul>

                <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                    <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd className="text-gray-900">${session.amount_subtotal! / 100}</dd>
                    </div>

                    <div className="flex justify-between">
                        <dt>Shipping</dt>
                        <dd className="text-gray-900">${session?.shipping_cost?.amount_total! / 100}</dd>
                    </div>

                    <div className="flex justify-between">
                        <dt>Taxes</dt>
                        <dd className="text-gray-900">$0</dd>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                        <dt className="text-base">Total</dt>
                        <dd className="text-base">${session.amount_total! / 100}</dd>
                    </div>
                </dl>

                <div className='mt-8 text-sm'>
                    <dt className="font-medium text-gray-900">Shipping Address</dt>
                    <dd className="mt-2">
                        <address className="not-italic">
                            <span className="block">{shipping?.name}</span>
                            <span className="block">{shipping?.address?.line1}</span>
                            <span className="block">{shipping?.address?.city + ", " + shipping?.address?.state + " " + shipping?.address?.postal_code}</span>
                        </address>
                    </dd>
                </div>

                <div className="mt-8 border-t border-gray-200 py-6 text-right">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    )
}