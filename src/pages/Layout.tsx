import { useEffect, useState, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import ChatWidget from '@/components/ChatWidget'

const NAV_LINKS = [
  { label: 'PROCESS', href: '#workflow' },
  { label: 'ARCHITECTURE', href: '#codebase' },
  { label: 'EVIDENCE', href: '#case-studies' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
] as const

export default function Layout({ children }: { children?: ReactNode }) {
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const update = () => {
      const human = document.getElementById('human')
      setShowChat(Boolean(human && window.scrollY >= human.offsetTop - window.innerHeight * 0.35))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#020203] text-white overflow-x-hidden selection:bg-lime-200 selection:text-black">
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none bg-gradient-to-b from-black/75 via-black/20 to-transparent">
        <div className="max-w-[1500px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a
            href="#origin"
            className="pointer-events-auto font-mono text-[9px] md:text-[10px] uppercase tracking-[0.24em] text-white/58 hover:text-white transition-colors"
          >
            AD <span className="text-white/20">/</span> SYSTEMS
          </a>

          <nav className="pointer-events-auto hidden md:flex items-center gap-7" aria-label="Portfolio navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/28 hover:text-white/75 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="pointer-events-auto md:hidden font-mono text-[8px] uppercase tracking-[0.2em] text-white/34"
          >
            CONTACT ↘
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {children}
        <Outlet />
      </main>

      {showChat && <ChatWidget />}
    </div>
  )
}
