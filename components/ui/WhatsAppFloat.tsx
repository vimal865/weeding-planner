'use client'
import { MessageCircle } from 'lucide-react'

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={22} />
      <span className="text-sm font-medium hidden sm:block">Chat with us</span>
    </a>
  )
}
