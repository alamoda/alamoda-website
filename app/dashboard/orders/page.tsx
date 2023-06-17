import Breadcrumb from "@/app/(components)/Breadcrumb";
import { CartProduct, Order } from "@/app/(types)";

async function getOrders() {
    const response = await fetch('http://localhost:3000/api/orders', {
        cache: 'no-store',
        method: 'GET'
    });
    const orders = await response.json();

    return orders;
}

export default async function Page() {

    const breadcrumb = [
        {
            name: 'Dashboard',
            href: 'dashboard'
        },
        {
            name: 'Orders',
            href: ''
        }]

    const orders = await getOrders();

    console.log(orders);


    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <Breadcrumb routes={breadcrumb} />

            <div className="mt-16 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Orders</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the orders
                        </p>
                    </div>
                    {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add user
                        </button>
                    </div> */}
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Products
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Customer
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Date
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Transaction</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {orders.map((order: Order, index: number) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                ${order.amount}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                {order.paid ?
                                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                        Paid
                                                    </span>
                                                    :
                                                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                        Not Paid
                                                    </span>}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                {order.cart_products.map((cartProduct: any, index: number) => (
                                                    <div key={index} className="mb-1 text-xs text-gray-900">
                                                        <div>
                                                            <span className="font-semibold">{cartProduct.name}</span>
                                                            {" - qty: " + cartProduct.quantity + ", " + "sz: " + cartProduct.size}
                                                        </div>
                                                        <div className="font-medium"> {cartProduct.brand} </div>
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-xs text-gray-500">
                                                {order.name &&
                                                    <div className="text-gray-500">{order.name}</div>
                                                }
                                                <div className="text-gray-500">{order.email}</div>
                                                {order.street && order.city && order.state && order.country &&
                                                    <div className="text-gray-500">{order.street + ", " + order.city + " " + order.state + ", " + order.country}</div>
                                                }
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{order.created_at.getDate()}</td>
                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}