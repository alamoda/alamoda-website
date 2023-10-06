import Provider from '@/components/layout/provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME} | ${process.env.NEXT_PUBLIC_TAGLINE}`,
  description: process.env.NEXT_PUBLIC_DESCRIPTION,
  keywords: ["Fashion", "Deals", "Luxury", "Brands", "Gucci", "Valentino", "Dolce & Gabbana", "Dior", "Prada"],
  openGraph: {
    title: process.env.NEXT_PUBLIC_NAME,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_URL,
    siteName: process.env.NEXT_PUBLIC_NAME,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/logo.webp`,
        width: 1000,
        height: 1000,
        alt: process.env.NEXT_PUBLIC_DESCRIPTION,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider>
        <body suppressHydrationWarning={true} className={inter.className}>
          {children}
        </body>
      </Provider>
    </html>
  )
}
