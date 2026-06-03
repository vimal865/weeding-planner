import type { Metadata }  from 'next'
import { BlogEditor }      from '@/components/admin/BlogEditor'

interface Props { params: { id: string } }

export const metadata: Metadata = { title: 'Edit Blog Post' }

// Replace with real Supabase fetch
async function getPost(id: string) {
  return {
    id,
    title:        '10 Best Wedding Venues in Chennai (2025)',
    slug:         '10-best-wedding-venues-chennai-2025',
    excerpt:      'Planning your dream wedding in Chennai? We reviewed 50+ venues and shortlisted the absolute best for every budget.',
    content:      `## Introduction\n\nChennai has some of the most stunning wedding venues in South India. Whether you're planning an intimate gathering or a grand celebration with 500+ guests, the city offers options for every taste and budget.\n\n## 1. ITC Grand Chola\n\nThe crown jewel of Chennai weddings. With its regal Chola architecture and world-class service, this 5-star hotel sets the gold standard.\n\n- Capacity: 1,200 guests\n- Starting price: ₹8,00,000\n- Signature: The Grand Ballroom`,
    cover_image:  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
    category:     'Venue Guide',
    tags:         ['venues', 'chennai', 'tamil-nadu', 'wedding-halls'],
    author:       'KalyanamToday Team',
    read_time:    6,
    published:    true,
    meta_desc:    'Find the best wedding venues in Chennai for 2025. Banquet halls, hotels, outdoor spaces — reviewed and ranked for every budget.',
  }
}

export default async function EditBlogPostPage({ params }: Props) {
  const post = await getPost(params.id)
  return <BlogEditor mode="edit" initial={post} />
}
