import type { Metadata } from 'next'
import Image from 'next/image'
export const metadata: Metadata = { title: 'Wedding Inspiration Gallery — Kerala & Tamil Nadu', description: 'Browse wedding inspiration photos from Kerala and Tamil Nadu. Bridal looks, decor ideas, photography poses.' }
const PHOTOS = [
  { id:1, src:'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', tag:'Kerala Wedding' },
  { id:2, src:'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', tag:'Tamil Bride'    },
  { id:3, src:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', tag:'Christian'      },
  { id:4, src:'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', tag:'Photography'    },
  { id:5, src:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', tag:'Decor'          },
  { id:6, src:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', tag:'Couple Pose'    },
  { id:7, src:'https://images.unsplash.com/photo-1583195764036-46973a4e1522?w=600&q=80', tag:'Mehendi'        },
  { id:8, src:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', tag:'Bridal Makeup'  },
  { id:9, src:'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80', tag:'Sadya'          },
]
export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-brand-wine">Wedding Inspiration</h1>
        <p className="text-gray-500 mt-2">Browse thousands of Kerala and Tamil Nadu wedding photos</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {PHOTOS.map(p => (
            <div key={p.id} className="break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer">
              <Image src={p.src} alt={p.tag} width={300} height={400} className="w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              <span className="absolute bottom-2 left-2 text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">{p.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
