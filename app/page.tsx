
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories'
import CollectionPreview from './components/CollectionPreview';
import Incentives from './components/Incentives';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import BrandLogos from './components/BrandLogos';
import Testimonials from './components/Testimonials';


export default async function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <BrandLogos />
      <Categories />
      <CollectionPreview />
      <Testimonials />
      <Incentives />
      <Faqs />
      <Footer />
    </div>
  )
}
