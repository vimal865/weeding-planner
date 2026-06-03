'use client'
import { useState, useRef }  from 'react'
import { useRouter }          from 'next/navigation'
import {
  Save, Eye, Globe, EyeOff, Image, Tag,
  Bold, Italic, Link, List, Quote, Code, Heading2,
  AlignLeft, Loader2, X, Plus,
} from 'lucide-react'
import toast                  from 'react-hot-toast'
import { cn, slugify }        from '@/lib/utils'

export interface BlogPostData {
  id?:          string
  title:        string
  slug:         string
  excerpt:      string
  content:      string
  cover_image:  string
  category:     string
  tags:         string[]
  author:       string
  read_time:    number
  published:    boolean
  meta_desc:    string
}

interface Props {
  initial?: Partial<BlogPostData>
  mode:     'create' | 'edit'
}

const CATEGORIES = ['Cultural Guide', 'Venue Guide', 'Photography Tips', 'Budget Tips', 'Vendor Spotlight', 'Muhurtham', 'Bridal Fashion', 'Real Weddings', 'Planning Tips', 'Honeymoon']

const TOOLBAR_ACTIONS = [
  { icon: Heading2, label: 'Heading',     syntax: '## '     },
  { icon: Bold,     label: 'Bold',        syntax: '**text**' },
  { icon: Italic,   label: 'Italic',      syntax: '_text_'  },
  { icon: Link,     label: 'Link',        syntax: '[text](url)' },
  { icon: List,     label: 'List',        syntax: '- item'  },
  { icon: Quote,    label: 'Blockquote',  syntax: '> quote' },
  { icon: Code,     label: 'Code',        syntax: '`code`'  },
  { icon: Image,    label: 'Image',       syntax: '![alt](url)' },
]

function estimateReadTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

export function BlogEditor({ initial, mode }: Props) {
  const router = useRouter()
  const textRef = useRef<HTMLTextAreaElement>(null)

  const [form, setForm] = useState<BlogPostData>({
    title:       initial?.title       ?? '',
    slug:        initial?.slug        ?? '',
    excerpt:     initial?.excerpt     ?? '',
    content:     initial?.content     ?? '',
    cover_image: initial?.cover_image ?? '',
    category:    initial?.category    ?? '',
    tags:        initial?.tags        ?? [],
    author:      initial?.author      ?? 'KalyanamToday Team',
    read_time:   initial?.read_time   ?? 5,
    published:   initial?.published   ?? false,
    meta_desc:   initial?.meta_desc   ?? '',
  })

  const [tagInput, setTagInput] = useState('')
  const [preview,  setPreview]  = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [tab,      setTab]      = useState<'write' | 'seo'>('write')

  function update<K extends keyof BlogPostData>(key: K, value: BlogPostData[K]) {
    setForm(prev => {
      const updated = { ...prev, [key]: value }
      if (key === 'title' && mode === 'create') {
        updated.slug = slugify(value as string)
      }
      if (key === 'content') {
        updated.read_time = estimateReadTime(value as string)
      }
      return updated
    })
  }

  function insertSyntax(syntax: string) {
    const ta   = textRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end   = ta.selectionEnd
    const sel   = ta.value.substring(start, end)
    const replacement = sel ? syntax.replace('text', sel).replace('item', sel).replace('quote', sel) : syntax
    const newVal = ta.value.substring(0, start) + replacement + ta.value.substring(end)
    update('content', newVal)
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + replacement.length, start + replacement.length) }, 10)
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase()
    if (t && !form.tags.includes(t) && form.tags.length < 10) {
      update('tags', [...form.tags, t])
      setTagInput('')
    }
  }

  function removeTag(tag: string) {
    update('tags', form.tags.filter(t => t !== tag))
  }

  async function handleSave(publish?: boolean) {
    if (!form.title || !form.content) {
      toast.error('Title and content are required')
      return
    }
    setSaving(true)
    try {
      const payload = { ...form, published: publish ?? form.published }
      const res = await fetch(
        mode === 'edit' ? `/api/blog/${initial?.id}` : '/api/blog',
        {
          method:  mode === 'edit' ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        }
      )
      if (!res.ok) throw new Error()
      toast.success(publish ? 'Post published!' : 'Draft saved!')
      if (mode === 'create') router.push('/admin/blog')
    } catch {
      toast.error('Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  // Simple markdown-to-HTML preview
  function renderPreview(md: string) {
    return md
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-6 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm,  '<h1 class="text-2xl font-bold mt-8 mb-3">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-brand-rose pl-4 italic text-gray-500 my-3">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/`(.+?)`/g,   '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/^/, '<p class="mb-3">')
      .replace(/$/, '</p>')
  }

  return (
    <div className="space-y-5 max-w-screen-xl">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-serif">
            {mode === 'create' ? 'New Blog Post' : 'Edit Post'}
          </h1>
          {form.read_time > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">Estimated {form.read_time} min read</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className={cn('flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border transition-colors', preview ? 'bg-blue-50 text-blue-600 border-blue-200' : 'border-gray-200 text-gray-600 hover:bg-gray-50')}
          >
            {preview ? <AlignLeft size={14} /> : <Eye size={14} />}
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-1.5 text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="btn-primary text-sm py-2 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
            {form.published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">

          {/* Title */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <input
              type="text"
              placeholder="Post title — make it SEO-friendly and specific"
              value={form.title}
              onChange={e => update('title', e.target.value)}
              className="w-full font-serif text-xl text-gray-800 placeholder-gray-300 focus:outline-none border-b border-gray-100 pb-3 mb-3"
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400 shrink-0">Slug:</span>
              <input
                type="text"
                value={form.slug}
                onChange={e => update('slug', e.target.value)}
                className="flex-1 text-brand-rose text-sm font-mono focus:outline-none bg-transparent"
                placeholder="post-url-slug"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Excerpt / Intro</label>
            <textarea
              rows={2}
              placeholder="A compelling summary shown in search results and the blog listing page (max 160 chars)"
              value={form.excerpt}
              onChange={e => update('excerpt', e.target.value)}
              maxLength={200}
              className="w-full text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none leading-relaxed"
            />
            <p className="text-xs text-gray-300 text-right mt-1">{form.excerpt.length}/200</p>
          </div>

          {/* Content editor */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Toolbar */}
            {!preview && (
              <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 flex-wrap">
                {TOOLBAR_ACTIONS.map(action => (
                  <button
                    key={action.label}
                    onClick={() => insertSyntax(action.syntax)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    title={action.label}
                  >
                    <action.icon size={15} />
                  </button>
                ))}
                <div className="ml-auto text-xs text-gray-300">{form.content.length} chars</div>
              </div>
            )}

            {/* Write / Preview */}
            {preview ? (
              <div
                className="p-6 prose max-w-none text-gray-700 min-h-64"
                dangerouslySetInnerHTML={{ __html: renderPreview(form.content) }}
              />
            ) : (
              <textarea
                ref={textRef}
                rows={22}
                placeholder={`Start writing your post in Markdown...\n\n## Section Heading\n\nYour content here. Use **bold**, _italic_, and - bullet lists.\n\n> Tip: Use ## for headings, - for bullet lists, **bold**, _italic_`}
                value={form.content}
                onChange={e => update('content', e.target.value)}
                className="w-full p-5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none font-mono leading-relaxed"
              />
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">

          {/* Publish status */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Post Status</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', form.published ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500')}>
                {form.published ? '● Published' : '● Draft'}
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-semibold text-gray-700 text-sm">Post Details</h3>

            {/* Category */}
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Category *</label>
              <select
                value={form.category}
                onChange={e => update('category', e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-rose/30 cursor-pointer"
              >
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={e => update('author', e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
              />
            </div>

            {/* Cover image */}
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Cover Image URL</label>
              <input
                type="url"
                placeholder="https://res.cloudinary.com/..."
                value={form.cover_image}
                onChange={e => update('cover_image', e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
              />
              {form.cover_image && (
                <img src={form.cover_image} alt="cover preview" className="w-full h-32 object-cover rounded-xl mt-2" />
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-brand-rose-light text-brand-wine px-2 py-0.5 rounded-full">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors"><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                />
                <button onClick={addTag} className="p-1.5 bg-brand-rose-light text-brand-wine rounded-lg hover:bg-brand-rose hover:text-white transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">SEO Settings</h3>

            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Meta Description</label>
              <textarea
                rows={3}
                placeholder="SEO meta description (150–160 chars). Defaults to excerpt if empty."
                value={form.meta_desc}
                onChange={e => update('meta_desc', e.target.value)}
                maxLength={165}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-rose/30 resize-none"
              />
              <div className="flex justify-between mt-1">
                <span className={cn('text-xs', form.meta_desc.length > 155 ? 'text-orange-500' : 'text-gray-300')}>
                  {form.meta_desc.length}/160
                </span>
                {form.meta_desc.length >= 150 && form.meta_desc.length <= 160 && (
                  <span className="text-xs text-green-500">✓ Good length</span>
                )}
              </div>
            </div>

            {/* Preview snippet */}
            <div className="mt-3 p-3 bg-gray-50 rounded-xl">
              <p className="text-[11px] text-gray-400 mb-1">Google preview</p>
              <p className="text-blue-600 text-sm font-medium line-clamp-1">{form.title || 'Your post title here'}</p>
              <p className="text-green-600 text-xs">kalyanamtoday.in/blog/{form.slug || 'post-slug'}</p>
              <p className="text-gray-500 text-xs line-clamp-2 mt-0.5">{form.meta_desc || form.excerpt || 'Your meta description here...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
