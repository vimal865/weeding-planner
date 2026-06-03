import type { Metadata }           from 'next'
import { SearchHero }              from '@/components/home/SearchHero'
import { CategoryGrid }            from '@/components/home/CategoryGrid'
import { MuhurthamSection }        from '@/components/home/MuhurthamSection'
import { PlanningToolsStrip }      from '@/components/home/PlanningToolsStrip'
import { CitiesSection }           from '@/components/home/CitiesSection'
import { FeaturedVendorsSection }  from '@/components/home/FeaturedVendorsSection'
import { TestimonialsSection }     from '@/components/home/TestimonialsSection'
import { HowItWorksSection }       from '@/components/home/HowItWorksSection'
import { RealWeddingsSection }     from '@/components/home/RealWeddingsSection'

export const metadata: Metadata = {
  title:       'Wedding Vendors in Kerala & Tamil Nadu — KalyanamToday',
  description: 'Find verified wedding venues, photographers, makeup artists, caterers and more in Kerala and Tamil Nadu. Compare prices, read reviews, book easily.',
}

export default function HomePage() {
  return (
    <>
      <SearchHero />
      <CategoryGrid />
      <HowItWorksSection />
      <FeaturedVendorsSection />
      <MuhurthamSection />
      <PlanningToolsStrip />
      <RealWeddingsSection />
      <CitiesSection />
      <TestimonialsSection />
    </>
  )
}
