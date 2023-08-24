import Provider from './(components)/Provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Alamoda',
  description: 'Best deals for your favorite luxury brands like Dior, Dolce & Gabbana, Gucci, Prada, Valentino and more...',
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
