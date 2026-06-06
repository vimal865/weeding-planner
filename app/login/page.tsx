'use client'
import { useState, useEffect, Suspense } from 'react'
import Link                               from 'next/link'
import { useRouter, useSearchParams }     from 'next/navigation'
import { Mail, Phone, Chrome, Eye, EyeOff, Loader2, ArrowRight, User } from 'lucide-react'
import { cn }                             from '@/lib/utils'
import { createClient }                   from '@/lib/supabase'
import toast                              from 'react-hot-toast'

type Tab  = 'password' | 'google' | 'phone'
type Mode = 'signin'   | 'signup'

function LoginForm() {
  const router        = useRouter()
  const searchParams  = useSearchParams()
  const supabase      = createClient()

  const [tab,             setTab]             = useState<Tab>('password')
  const [mode,            setMode]            = useState<Mode>('signin')

  // Sign-in fields
  const [email,           setEmail]           = useState('')
  const [password,        setPassword]        = useState('')
  const [showPwd,         setShowPwd]         = useState(false)

  // Extra sign-up fields
  const [name,            setName]            = useState('')
  const [signupPhone,     setSignupPhone]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirm,     setShowConfirm]     = useState(false)

  // Phone OTP fields
  const [phone,    setPhone]    = useState('')
  const [otp,      setOtp]      = useState('')
  const [step,     setStep]     = useState<'input' | 'otp'>('input')

  const [loading,  setLoading]  = useState(false)
  const [signedUp, setSignedUp] = useState(false)

  // Show error toast if redirected back from a failed/expired verification link
  useEffect(() => {
    if (searchParams.get('error') === 'link_expired') {
      toast.error('Verification link expired or already used. Please sign up again.')
    }
  }, [searchParams])

  function switchMode(next: Mode) {
    setMode(next)
    setPassword('')
    setConfirmPassword('')
    setShowPwd(false)
    setShowConfirm(false)
    setSignedUp(false)
  }

  // ── Sign in ─────────────────────────────────────────────────────────────────
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast.success('Signed in!')
      router.push('/dashboard')
    } catch {
      toast.error('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  // ── Sign up ─────────────────────────────────────────────────────────────────
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim())                { toast.error('Please enter your name.');            return }
    if (password !== confirmPassword){ toast.error('Passwords do not match.');            return }
    if (password.length < 6)         { toast.error('Password must be at least 6 chars.'); return }

    setLoading(true)
    try {
      // Call server-side signup — creates user already confirmed, returns session token
      const res  = await fetch('/api/auth/signup', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password, name: name.trim(), phone: signupPhone }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Sign-up failed.')
      }

      const { token_hash } = data.data as { token_hash: string; email: string; name: string }

      // Exchange the server-generated token for a live session
      const { error: sessionErr } = await supabase.auth.verifyOtp({
        token_hash,
        type: 'magiclink',
      })
      if (sessionErr) throw sessionErr

      toast.success(`Welcome, ${name.trim()}! Account created.`)
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign-up failed.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  // ── Google ──────────────────────────────────────────────────────────────────
  async function handleGoogle() {
    setLoading(true)
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
    } catch {
      toast.error('Google sign-in failed')
      setLoading(false)
    }
  }

  // ── Phone OTP ───────────────────────────────────────────────────────────────
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!phone) return
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action: 'send', phone }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error ?? 'Failed to send OTP')
      setStep('otp')
      toast.success('OTP sent to your phone!')
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!otp) return
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action: 'verify', phone, otp }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error ?? 'Invalid OTP')

      const { token_hash } = data.data as { token_hash: string; email: string }
      const { error } = await supabase.auth.verifyOtp({ token_hash, type: 'magiclink' })
      if (error) throw error

      toast.success('Logged in successfully!')
      router.push('/dashboard')
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-3xl font-bold text-brand-wine">
            Kalyanam<span className="text-brand-rose">Today</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Your complete wedding planning platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-brand-rose-light p-8">
          <h1 className="font-serif text-2xl font-semibold text-brand-wine text-center mb-6">
            {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
          </h1>

          {/* Tab switcher */}
          <div className="flex rounded-xl bg-brand-cream border border-brand-rose-light p-1 mb-6 gap-1">
            {[
              { id: 'password', label: 'Email',  icon: Mail   },
              { id: 'google',   label: 'Google', icon: Chrome },
              { id: 'phone',    label: 'Phone',  icon: Phone  },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id as Tab); setStep('input') }}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all',
                  tab === t.id
                    ? 'bg-white text-brand-wine shadow-sm border border-brand-rose-light'
                    : 'text-gray-400 hover:text-gray-600',
                )}
              >
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>

          {/* ── Email tab ── */}
          {tab === 'password' && (
            mode === 'signin' ? (
              /* ── Sign in form ── */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Email address</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="input pr-10"
                    />
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                  Sign In
                </button>
                <p className="text-center text-sm text-gray-500">
                  Don&apos;t have an account?{' '}
                  <button type="button" onClick={() => switchMode('signup')} className="text-brand-rose font-medium hover:underline">
                    Sign up
                  </button>
                </p>
              </form>
            ) : (
              /* ── Sign up form ── */
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Full name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="input pl-9"
                    />
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Email address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="input pl-9"
                    />
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">
                    Phone number <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 py-3 bg-brand-cream border border-gray-200 rounded-xl text-gray-600 text-sm font-medium">🇮🇳 +91</span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={signupPhone}
                      onChange={e => setSignupPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      maxLength={10}
                      className="input flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="input pr-10"
                    />
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Confirm password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="input pr-10"
                    />
                    <button type="button" onClick={() => setShowConfirm(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                  Create Account
                </button>
                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <button type="button" onClick={() => switchMode('signin')} className="text-brand-rose font-medium hover:underline">
                    Sign in
                  </button>
                </p>
              </form>
            )
          )}

          {/* ── Google tab ── */}
          {tab === 'google' && (
            <div className="space-y-4">
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continue with Google
              </button>
              <p className="text-center text-xs text-gray-400">
                We&apos;ll create your account automatically if you&apos;re new
              </p>
            </div>
          )}

          {/* ── Phone OTP tab ── */}
          {tab === 'phone' && (
            step === 'input' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Mobile number</label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 py-3 bg-brand-cream border border-gray-200 rounded-xl text-gray-600 text-sm font-medium">🇮🇳 +91</span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      maxLength={10}
                      required
                      className="input flex-1"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading || phone.length < 10} className="btn-primary w-full justify-center disabled:opacity-50">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Phone size={16} />}
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center mb-2">
                  <p className="text-sm text-gray-500">OTP sent to <strong>+91 {phone}</strong></p>
                  <button type="button" onClick={() => setStep('input')} className="text-xs text-brand-rose hover:underline mt-1">Change number</button>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Enter 6-digit OTP</label>
                  <input
                    type="text"
                    placeholder="• • • • • •"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="input text-center text-xl tracking-[0.5em] font-mono"
                    autoFocus
                  />
                </div>
                <button type="submit" disabled={loading || otp.length < 6} className="btn-primary w-full justify-center disabled:opacity-50">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                  Verify OTP
                </button>
              </form>
            )
          )}

          <div className="mt-6 pt-4 border-t border-brand-rose-light text-center">
            <p className="text-sm text-gray-500">Are you a wedding vendor?</p>
            <Link href="/vendors/list-your-business" className="text-brand-rose text-sm font-medium hover:underline flex items-center gap-1 justify-center mt-1">
              List your business free <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
