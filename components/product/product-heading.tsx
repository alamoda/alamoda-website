import { ProductWithRelations } from '@/lib/db'

export default function ProductHeading({ product }: { product: ProductWithRelations }) {

    return (
        <div className="w-full lg:col-span-5">
            {/* Title and Brand */}
            <div className='text-gray-900 capitalize'>
                <h1 className="text-4xl">{product.brand.name.toLowerCase()}</h1>
                <h2 className="text-sm text-mediummt-2">{product.name}</h2>
            </div>

            {/* Price */}
            <div className="text-2xl text-red-700 mt-4">
                <span className="text-gray-900 line-through mr-2">${Math.round(product.price * 1.6)}</span>${Math.round(product.price)}
            </div>
        </div>
    )
}