'use client'
import { useState }      from 'react'
import { useRouter }     from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'
import { createClient }  from '@/lib/supabase'
import toast             from 'react-hot-toast'

export default function AdminLoginPage() {
  const router   = useRouter()
  const supabase = createClient()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showPwd,  setShowPwd]  = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      const isAdmin = data.user?.app_metadata?.role === 'admin' || data.user?.user_metadata?.role === 'admin'
      if (!isAdmin) {
        await supabase.auth.signOut()
        toast.error('Access denied — admin only')
        return
      }
      toast.success('Welcome, Admin!')
      router.push('/admin')
    } catch (err: any) {
      toast.error(err?.message ?? 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-wine flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-rose rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-white/50 text-sm mt-1">KalyanamToday Control Panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-float p-7">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@kalyanamtoday.in"
                className="input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  {showPwd ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2 disabled:opacity-60">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
              Sign In to Admin
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-5">
          Not an admin? <a href="/" className="text-white/50 hover:text-white">Back to site</a>
        </p>
      </div>
    </div>
  )
}
