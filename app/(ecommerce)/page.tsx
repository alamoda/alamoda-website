import { Suspense } from 'react';
import BrandLogos from '@/components/brand-logos';
import Hero from '@/components/hero';
import Incentives from '@/components/incentives';
import Testimonials from '@/components/testimonials';
import Newsletter from '@/components/newsletter';
import Faqs from '@/components/faqs';
import InstagramFeed from '@/components/instagram-feed';
import NewArrivalsPreview from '@/components/preview/new-arrivals-preview';
import DepartmentsSkewedGrid from '@/components/grid/departments-skewed-grid';

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Suspense>
        <div className='pt-16'>
          <BrandLogos />
        </div>
        <div className='pt-24'>
          <DepartmentsSkewedGrid />
        </div>
        <div className='pt-24'>
          <NewArrivalsPreview />
        </div>
        <div className='pt-36'>
          <Testimonials />
        </div>
        <div className='pt-24'>
          <Incentives />
        </div>
        <div className='pt-24'>
          <Newsletter />
        </div>
        <div className='pt-24'>
          <Faqs />
        </div>
        <div className='pt-24'>
          <Suspense>
            <InstagramFeed />
          </Suspense>
        </div>
      </Suspense>
    </>
  )
}
