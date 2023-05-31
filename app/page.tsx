
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories'
import CollectionPreview from './components/CollectionPreview';
import Incentives from './components/Incentives';
import Faqs from './components/Faqs';
import Footer from './components/Footer';


export default async function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Categories />
      <CollectionPreview />
      <Incentives />
      <Faqs />
      <Footer />
    </div>
  )
}
