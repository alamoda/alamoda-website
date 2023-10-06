import { ProductWithRelations } from '@/lib/db'
import AddToCart from '@/components/cart/add-to-cart'
import ProductFeatures from '@/components/product/product-features'
import ProductDescription from './product-description'
import ProductPolicies from './product-policies'
import ProductHeading from './product-heading'
import ProductImageGallery from './product-image-gallery'

export default function ProductDisplay({ product }: { product: ProductWithRelations }) {

    return (
        <div className="md:py-16 lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">

            <ProductHeading product={product}/>

            <ProductImageGallery product={product} />

            {/* Product info */}
            <div className="mt-8 lg:col-span-5">

                {/* Sizes and Add to Cart */}
                <AddToCart product={product} />

                <ProductDescription description={product.description}/>

                <ProductFeatures product={product} />

                <ProductPolicies/>
            </div>
        </div>
    )
}