
import Hero from '../(components)/Hero';
import Categories from '../(components)/Categories'
import Incentives from '../(components)/Incentives';
import Faqs from '../(components)/Faqs';
import BrandLogos from '../(components)/BrandLogos';
import Testimonials from '../(components)/Testimonials';
import InstagramFeed from '../(components)/InstagramFeed';
import Newsletter from '../(components)/Newsletter';
import { prepareProductQueryFilters } from '../(utils)/helpers';
import ProductListPreview from '../(components)/ProductListPreview';
import { Suspense } from 'react';
import InstagramFeedSkeleton from '../(components)/skeletons/InstagramFeedSkeleton';

export default async function Home() {
  return (
    <div>
      <Hero />
      <BrandLogos />
      <Categories />

      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <ProductListPreview
          queryFilters={prepareProductQueryFilters({
            statuses: [2],
            available: true,
          })}
          take={4}
          productBaseURL={'/shop'}
          collectionTitle='New Arrivals'
          collectionURL={`/shop`}
        />
      </div>

      <Testimonials />
      <Incentives />
      <Newsletter />
      <Faqs />

      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className="text-4xl tracking-tight text-gray-900">Follow <a className="hover:text-gray-700" href="https://www.instagram.com/alamodainc/">@alamodainc</a></h2>

        <Suspense fallback={<InstagramFeedSkeleton limit={4} />}>
          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {/* @ts-expect-error Server Component */}
            <InstagramFeed limit={4} />
          </div>
        </Suspense>

      </div>
    </div>
  )
}
