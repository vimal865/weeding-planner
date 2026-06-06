'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BadgeCheck, X } from 'lucide-react'

export function VendorActions({ vendorId }: { vendorId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)

  async function doAction(action: 'approve' | 'reject') {
    setLoading(action)
    try {
      const res = await fetch(`/api/admin/vendors/${vendorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (res.ok) router.refresh()
      else {
        const data = await res.json()
        alert(data.error ?? 'Action failed')
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
      <button
        onClick={() => doAction('approve')}
        disabled={loading !== null}
        className="p-1.5 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
        title="Approve"
      >
        {loading === 'approve' ? (
          <span className="block w-3.5 h-3.5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <BadgeCheck size={14} />
        )}
      </button>
      <button
        onClick={() => doAction('reject')}
        disabled={loading !== null}
        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title="Reject"
      >
        {loading === 'reject' ? (
          <span className="block w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <X size={14} />
        )}
      </button>
    </>
  )
}
