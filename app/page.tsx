"use client"

import Hero from './components/Hero';
import CollectionPreview from './components/CollectionPreview';
import Features from './components/Features';
import Faqs from './components/Faqs';

export default function Home() {
  return (
    <div>
      <Hero />
      <CollectionPreview />
      <Features />
      <Faqs />
    </div>

  )
}
