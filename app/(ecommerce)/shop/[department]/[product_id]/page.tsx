import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import { Route } from '@/app/(types)'
import Breadcrumb from '@/app/(components)/Breadcrumb'
import ProductListPreview from '@/app/(components)/ProductListPreview'
import ProductImageGallery from '@/app/(components)/ProductImageGallery'
import ProductFeatures from '@/app/(components)/ProductFeatures'
import CheckoutButton from '@/app/(components)/CheckoutButton'


const policies = [
  { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

async function fetchProduct(productId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/product?id=${productId}`);
  const product = await response.json();

  return product;
}

export default async function Page({ params }: { params: { product_id: string } }) {

  const product = await fetchProduct(params.product_id);

  const breadcrumb: Route[] = [];
  if (product) {
    breadcrumb.push(
      {
        name: 'Shop',
        href: 'shop'
      },
      {
        name: product.department.name,
        href: `shop/${product.department.slug}`
      })

    if (product.category) {
      breadcrumb.push({
        name: product.category.name,
        href: `shop/${product.department.slug}?category=${product.category.slug}`
      })
    }

    if (product.category && product.subcategory) {
      breadcrumb.push({
        name: product.subcategory.name,
        href: `shop/${product.department.slug}?category=${product.category.slug}&subcategories=${product.subcategory.slug}`
      })
    }
  }

  return (
    <>
      {/* BREADCRUMBS */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 hidden md:block">
        <Breadcrumb routes={breadcrumb} />
      </div>

      <div className="pt-16 md:pt-0 bg-white">
        <div className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">

            {/* Main Container */}
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">

              <div className="w-full lg:col-span-5">
                {/* Title and Brand */}
                <div className='text-gray-900 capitalize'>
                  <h1 className="text-4xl ">{product?.brand.name.toLowerCase()}</h1>
                  <h2 className="text-sm text-mediummt-2">{product?.name}</h2>
                </div>
                {/* Price */}
                <div className="text-2xl text-red-700 mt-4">
                  <span className="text-gray-900 line-through mr-2">${product ? Math.round(product.price * 1.6) : 0}</span>${product ? Math.round(product.price) : 0}
                </div>
              </div>

              {/* Product Images */}
              <ProductImageGallery product={product} />

              {/* Product info */}
              <div className="mt-8 lg:col-span-5">

                {/* Sizes and Add to Cart */}
                <CheckoutButton product={product} />

                {/* Product details */}
                {product?.description &&
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Description</h2>
                    <div
                      className="text-sm mt-2 text-gray-800">
                      {product?.description.replace("&amp;", "&")}
                    </div>
                  </div>
                }

                {/* Product Features */}
                <ProductFeatures product={product} />

                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-8">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>

                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {policies.map((policy) => (
                      <div key={policy.name} className="border border-gray-200 bg-gray-50 p-6 text-center">
                        <dt>
                          <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>

            {/* You might also like */}
            <div className="pt-16 md:pt-32">
              {/* @ts-expect-error Server Component */}
              <ProductListPreview
                listTitle="You might also like"
                filterParams={new URLSearchParams({
                  department: product?.department.slug,
                  category: product?.category.slug,
                  subcategory: product?.subcategory ? "&subcategories=" + product?.subcategory.slug : "",
                  exclude: product?.mongo_id
                })}
                listUrl={`shop/${product?.department.slug}?category=${product?.category.slug}${product?.subcategory ? "&subcategories=" + product?.subcategory.slug : ""}`}
              />
            </div>

            {/* More from brand */}
            <div className="pt-16 md:pt-32">
              {/* @ts-expect-error Server Component */}
              <ProductListPreview
                listTitle={`More from ${product?.brand.name.toLowerCase()}`}
                filterParams={new URLSearchParams({
                  brands: product?.brand.slug,
                  exclude: product?.mongo_id
                })}
                listUrl={`shop/${product?.department.slug}?brands=${product?.brand.slug}`}
              />
            </div>
          </div>
        </div >
      </div >
    </>

  )
}