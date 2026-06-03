import type { Metadata } from 'next'
import './globals.css'
import { Navbar }         from '@/components/layout/Navbar'
import { Footer }         from '@/components/layout/Footer'
import { WhatsAppFloat }  from '@/components/ui/WhatsAppFloat'
import { Toaster }        from 'react-hot-toast'

export const metadata: Metadata = {
  title:       { default: 'KalyanamToday — Wedding Vendors in Kerala & Tamil Nadu', template: '%s | KalyanamToday' },
  description: 'Find verified wedding vendors in Kerala and Tamil Nadu. Venues, photographers, makeup artists, catering and more. Compare prices, read reviews, book easily.',
  keywords:    ['wedding vendors Kerala', 'wedding photographers Kochi', 'wedding venues Chennai', 'Kalyana Mandapam', 'bridal makeup Tamil Nadu'],
  authors:     [{ name: 'KalyanamToday' }],
  openGraph: {
    type:   'website',
    locale: 'en_IN',
    siteName: 'KalyanamToday',
  },
  twitter: { card: 'summary_large_image' },
  robots:  { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#6B2737',
              color:      '#fff',
              borderRadius: '12px',
              fontSize:   '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
