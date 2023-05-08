"use client"

import Header from './components/Header';
import Hero from './components/Hero';
import CollectionPreview from './components/CollectionPreview';
import Features from './components/Features';
import Faqs from './components/Faqs';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <CollectionPreview />
      <Features />
      <Faqs />
      <Footer />
    </div>

  )
}
