
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
      {/* @ts-expect-error Server Component */}
      <InstagramFeed />
    </div>
  )
}
