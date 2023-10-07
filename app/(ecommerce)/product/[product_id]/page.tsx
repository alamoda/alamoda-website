
import { Metadata } from 'next'
import { getProduct } from '@/app/actions'
import { notFound } from 'next/navigation'
import { ProductWithRelations } from '@/lib/db'
import { getCategoryBySlug, getDepartmentBySlug, getSubcategoryBySlug } from '@/lib/util'
import Breadcrumb from '@/components/layout/breadcrumb'
import ProductDisplay from '@/components/product/product-display'
import { Suspense } from 'react'
import RelatedProductsPreview from '@/components/preview/related-products-preview'
import OtherFromBrandPreview from '@/components/preview/other-from-brand-preview'


export async function generateMetadata({ params }: { params: { product_id: string } }): Promise<Metadata> {
  const product: ProductWithRelations | null = await getProduct(params.product_id, true);

  if (!product) return notFound();

  const indexable = product.available;
  const productImages = product.images as string[];

  return {
    title: `${product.name} - ${product.brand.name} | ${process.env.NEXT_PUBLIC_NAME}`,
    description: `${product.description}`,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: productImages.length > 0
      ? {
        images: [
          {
            url: productImages[0],
            width: 2000,
            height: 2668,
            alt: `${product.name} - ${product.brand.name}`
          }
        ]
      }
      : null
  };
}

export default async function Page({ params }: { params: { product_id: string } }) {

  const product: ProductWithRelations | null = await getProduct(params.product_id, true);

  if (!product) return notFound();

  const currentDepartment = getDepartmentBySlug(product.department);
  const currentCategory = getCategoryBySlug(product.category, currentDepartment);
  const currentSubcategory = getSubcategoryBySlug(product.subcategory, currentCategory);

  if (!currentDepartment) return notFound();

  // Breadcrumbs
  const breadcrumb = [
    {
      name: 'Shop',
      href: '/shop'
    },
    {
      name: currentDepartment.name || "",
      href: `/shop/${currentDepartment.slug}`
    },
    ...(currentCategory ? [{ name: currentCategory.name, href: `/shop/${currentDepartment.slug}?category=${currentCategory.slug}` }] : []),
    ...((currentCategory && currentSubcategory) ? [{ name: currentSubcategory.name, href: `/shop/${currentDepartment.slug}?category=${currentCategory.slug}&subcategories=${currentSubcategory.slug}` }] : []),
  ];

  return (
    <>
      <div className="hidden md:block">
        <Breadcrumb
          routes={breadcrumb}
        />
      </div>

      <Suspense>
        <ProductDisplay product={product} />
      </Suspense>

      <Suspense>
        <RelatedProductsPreview product={product} />
        <OtherFromBrandPreview product={product} />
      </Suspense>
    </>
  )
}