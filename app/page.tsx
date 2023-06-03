
import Header from './(components)/Header';
import Hero from './(components)/Hero';
import Categories from './(components)/Categories'
import CollectionPreview from './(components)/CollectionPreview';
import Incentives from './(components)/Incentives';
import Faqs from './(components)/Faqs';
import Footer from './(components)/Footer';
import BrandLogos from './(components)/BrandLogos';
import Testimonials from './(components)/Testimonials';
import InstagramFeed from './(components)/InstagramFeed';


export default async function Home() {
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  )
}
