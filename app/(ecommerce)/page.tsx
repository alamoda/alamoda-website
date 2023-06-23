
import Hero from '../(components)/Hero';
import Categories from '../(components)/Categories'
import CollectionPreview from '../(components)/CollectionPreview';
import Incentives from '../(components)/Incentives';
import Faqs from '../(components)/Faqs';
import BrandLogos from '../(components)/BrandLogos';
import Testimonials from '../(components)/Testimonials';
import InstagramFeed from '../(components)/InstagramFeed';
import Newsletter from '../(components)/Newsletter';


export default async function Home() {
  return (
    <div>
      <Hero />
      <BrandLogos />
      <Categories />
      {/* @ts-expect-error Server Component */}
      <CollectionPreview />
      <Testimonials />
      <Incentives />
      <Faqs />
      {/* @ts-expect-error Server Component */}
      <InstagramFeed />
      <Newsletter title="Want an extra 10%?" description='Subscribe to our newsletter' />
    </div>
  )
}
