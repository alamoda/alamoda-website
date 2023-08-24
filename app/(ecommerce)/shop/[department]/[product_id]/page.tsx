import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import Breadcrumb from '@/app/(components)/Breadcrumb'
import ProductImageGallery from '@/app/(components)/ProductImageGallery'
import ProductFeatures from '@/app/(components)/ProductFeatures'
import CheckoutButton from '@/app/(components)/CheckoutButton'
import { getProduct } from '@/app/actions'
import { notFound } from 'next/navigation'
import { ProductWithRelations } from '@/app/(lib)/db'
import { getCategoryBySlug, getDepartmentBySlug, getSubcategoryBySlug, prepareProductQueryFilters } from '@/app/(utils)/helpers'
import ProductListPreview from '@/app/(components)/ProductListPreview'
import { Metadata } from 'next'

const policies = [
  { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

// Metadata
export async function generateMetadata({ params }: { params: { product_id: string } }): Promise<Metadata> {

  const product: ProductWithRelations | null = await getProduct(params.product_id, true);
  
  if (!product) {}

  return {
      title: `${product?.name} - ${product?.brand.name} | Alamoda`,
      description: product?.description
  }
}

export default async function Page({ params }: { params: { product_id: string } }) {

  const product: ProductWithRelations | null = await getProduct(params.product_id, true);

  if (!product) return notFound();

  const currentDepartment = getDepartmentBySlug(product.department);
  const currentCategory = getCategoryBySlug(product.category, currentDepartment);
  const currentSubcategory = getSubcategoryBySlug(product.subcategory, currentCategory);

  const breadcrumb = [
    {
      name: 'Shop',
      href: '/shop'
    },
    {
      name: currentDepartment?.name || "",
      href: `/shop/${currentDepartment?.slug}`
    },
    ...(currentCategory ? [{ name: currentCategory.name, href: `/shop/${currentDepartment?.slug}?category=${currentCategory.slug}` }] : []),
    ...((currentCategory && currentSubcategory) ? [{ name: currentSubcategory.name, href: `/shop/${currentDepartment?.slug}?category=${currentCategory.slug}&subcategories=${currentSubcategory.slug}` }] : []),
  ]

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
              <ProductListPreview
                queryFilters={prepareProductQueryFilters({
                  statuses: [2],
                  available: true,
                  department: currentDepartment,
                  category: currentCategory,
                  subcategories: currentSubcategory ? [currentSubcategory] : [],
                  exclude: [product],
                })}
                take={4}
                productBaseURL={'/shop'}
                collectionTitle='You might also like'
                collectionURL={`/shop/${product.department}?category=${product.category}${product.subcategory ? "&subcategories=" + product.subcategory : ""}`}
              />
            </div>

            {/* More from brand */}
            <div className="pt-16 md:pt-32">
              <ProductListPreview
                queryFilters={prepareProductQueryFilters({
                  statuses: [2],
                  available: true,
                  brands: [product.brand],
                  exclude: [product],
                })}
                take={4}
                productBaseURL={'/shop'}
                collectionTitle={`More from ${product?.brand.name.toLowerCase()}`}
                collectionURL={`/shop/${currentDepartment?.slug}?brands=${product?.brand.slug}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}