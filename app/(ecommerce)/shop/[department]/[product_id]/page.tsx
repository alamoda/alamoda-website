import { CurrencyDollarIcon, GlobeAmericasIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Feature, Route } from '@/app/(types)'
import Breadcrumb from '@/app/(components)/Breadcrumb'
import ProductList from '@/app/(components)/ProductList'
import SizeSelector from '@/app/(components)/SizeSelector'
import ProductImageGallery from '@/app/(components)/ProductImageGallery'
import ProductFeatures from '@/app/(components)/ProductFeatures'


const policies = [
  { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

async function fetchProduct(productId: string) {
  const response = await fetch(`http://localhost:3000/api/product?id=${productId}`);
  const resProd = await response.json();
  return resProd;
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

              {/* Title */}
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    <span className="capitalize">{product?.name}</span> by <span className="capitalize">{product?.brand.name.toLowerCase()}</span>
                  </h1>
                  <p className="text-xl font-medium text-red-700">
                    <span className="text-gray-600 line-through mr-2">${product ? Math.round(product.price * 1.6) : 0}</span>${product ? Math.round(product.price) : 0}
                  </p>
                </div>
              </div>

              <ProductImageGallery product={product} />

              {/* Product info */}
              <div className="mt-8 lg:col-span-5">

                {/* Sizes and Add to Cart */}
                <SizeSelector product={product} />

                {/* Product details */}
                {product?.description &&
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Description</h2>

                    <div
                      className="prose prose-sm mt-4 text-gray-500">
                      {product?.description.replace("&amp;", "&")}
                    </div>

                  </div>
                }

                {/* Product Features */}
                <ProductFeatures product={product} />

                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-10">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>

                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {policies.map((policy) => (
                      <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
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
              <ProductList
                listName="You might also like"
                listUrl={`shop/${product?.department.slug}?category=${product?.category.slug}${product?.subcategory ? "&subcategories=" + product?.subcategory.slug : ""}`}
                product={product}
                brandOnly={false}
              />
            </div>

            {/* More from brand */}
            <div className="pt-16 md:pt-32">
              {/* @ts-expect-error Server Component */}
              <ProductList
                listName={`More from ${product?.brand.name.toLowerCase()}`}
                listUrl={`shop/${product?.department.slug}?brands=${product?.brand.slug}`}
                product={product}
                brandOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}