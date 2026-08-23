import React from 'react'
import { Outlet } from 'react-router-dom'
import ChatWidget from '@/components/ChatWidget'

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="matrix-bg h-full w-full"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/80 border-b border-green-400/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-green-400 glow-text">
              &lt;DevPortfolio/&gt;
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Experience', href: '#experience' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:glow-text">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-500">$ whoami</div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        {children}
        <Outlet />
      </main>

      {/* Chatbot */}
      <ChatWidget />

      <style>{`
        .glow-text { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
        .glow-border { box-shadow: 0 0 10px rgba(34, 197, 94, 0.3), inset 0 0 10px rgba(34, 197, 94, 0.1); }
        .matrix-bg {
          background: linear-gradient(90deg, transparent 98%, #22c55e 100%), linear-gradient(180deg, transparent 98%, #22c55e 100%);
          background-size: 50px 50px; animation: matrix-move 20s linear infinite;
        }
        @keyframes matrix-move { 0% { transform: translate(0, 0); } 100% { transform: translate(-50px, -50px); } }
        @keyframes terminal-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .terminal-cursor::after { content: '█'; color: #22c55e; animation: terminal-blink 1s infinite; }
        .code-block { background: rgba(0,0,0,.8); border: 1px solid rgba(34,197,94,.3); backdrop-filter: blur(10px); }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .floating-element { animation: float 6s ease-in-out infinite; }
        
        /* Hide scrollbar but keep functionality */
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        *::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  )
}

