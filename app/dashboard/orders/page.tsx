import Breadcrumb from "@/app/(components)/Breadcrumb";
import { Order } from "@/app/(types)";

async function getOrders() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/orders`, {
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

    const convertToDate = (dateString: string) => {
        const date = new Date(dateString);

        console.log(date.getTime())
        return '';
    }

    return (
        <div className="px-4 py-4">

            {/* BREADCRUMBS */}
            <Breadcrumb routes={breadcrumb} />

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-0">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                                        Products
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                                        Customer
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
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
                                            ${order.amount! / 100}
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
                                        <td className="whitespace-nowrap px-3 py-5 text-xs text-gray-900">
                                            {order.cart_products.map((cartProduct: any, index: number) => (
                                                <div key={index} className="mb-1">
                                                    <div>
                                                        <span className="font-semibold">{cartProduct.name}</span>
                                                        {" - qty: " + cartProduct.quantity + ", " + "sz: " + cartProduct.size}
                                                    </div>
                                                    <div className="font-medium"> {cartProduct.brand} </div>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-xs text-gray-900">
                                            {order.name &&
                                                <div className="text-gray-500">{order.name}</div>
                                            }
                                            <div className="text-gray-500">{order.email}</div>
                                            {order.street &&
                                                <div className="text-gray-500">{order.street}</div>
                                            }
                                            {order.city && order.state &&
                                                <div className="text-gray-500">{order.city + " " + order.state + ", " + order.country}</div>
                                            }
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{(new Date(order.created_at)).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}