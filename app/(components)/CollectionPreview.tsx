import Link from "next/link";

const collectionName = "New Arrivals"

async function getNewArrivals() {

    const res = await fetch('http://localhost:3000/api/products/new-arrivals?limit=3');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}

export default async function CollectionPreview() {

    const products = await getNewArrivals();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{collectionName}</h2>
                    <a href="#" className="hidden text-sm font-semibold text-gray-900 hover:text-gray-700 sm:block">
                        Browse {collectionName}
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product: any) => (
                        <a key={product.id} className="group relative" href={('/' + product.department + '/' + product.category + '/' + (product.subcategory ? product.subcategory + "/" : "") + product.mongo_id).toLowerCase()} >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                                <img
                                    src={product.images[0]}
                                    alt={product.description ? product.description : product.name}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-500"
                                />
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-500 uppercase">{product.brand.name}</p>
                                <h3 className="mt-1 font-semibold text-gray-900">
                                    <span className="absolute inset-0" />
                                    {product.name}
                                </h3>
                                <p className="mt-1 text-red-700"><span className="text-gray-600 line-through mr-2">USD {Math.round(product.price * 1.6)}</span>USD {Math.round(product.price)}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}