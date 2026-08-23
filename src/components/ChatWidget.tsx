import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { rankBySimilarity } from '@/lib/embeddings'
import { generateAnswer } from '@/lib/generator'
import type { ChatDoc } from '@/chat/index.d'
import { MessageCircle, X, Send, Bot, User, Sparkles, Clock, Zap } from 'lucide-react'

type Message = { role: 'user' | 'assistant' | 'system'; content: string; timestamp?: Date }

// Expanded FAQ with client objection-handlers
const FAQ: Record<string, string> = {
  // Basic info
  'what is his name': 'Anup Davin Mathivanan.',
  "what's his name": 'Anup Davin Mathivanan.',
  'who is he': 'Anup Davin Mathivanan is a Senior Full‑Stack Java/DevOps Engineer with 8+ years of experience building enterprise systems that handle 100K+ daily transactions.',
  'what does he do': 'Anup is a Senior Full-Stack Java Developer specializing in Enterprise Architecture, Cloud Solutions, and DevOps. He helps companies scale their backend systems, migrate to microservices, and optimize performance.',
  
  // Skills
  'what are his skills': 'Anup specializes in Java, Spring Boot, React, AWS, Docker, Kubernetes. His core expertise: microservices architecture, cloud infrastructure, performance optimization, and CI/CD pipelines.',
  'what technologies does he use': 'Primary: Java 21, Spring Boot, Kubernetes, AWS, Docker, Kafka. Databases: Oracle, PostgreSQL, MongoDB, Redis. Frontend: React, TypeScript, Angular.',
  
  // Availability & Engagement (Client Objection Handlers)
  'is he available': 'Yes! Anup is currently open to new projects and opportunities. He can start within 2 weeks and offers flexible engagement models.',
  'where is he located': 'Anup is based in Singapore/India (GMT+8/+5:30) and works remotely with clients worldwide. He maintains 4+ hours overlap with US/EU timezones.',
  'does he work remotely': 'Yes, Anup is fully remote-ready and has successfully delivered projects for clients across different timezones. He uses async communication + scheduled syncs.',
  'what is his timezone': 'Singapore (GMT+8) / India (GMT+5:30). He offers flexible scheduling with 4+ hours overlap for US/EU clients.',
  
  // Engagement models
  'how does he charge': 'Anup offers flexible engagement: project-based (fixed scope), retainer (ongoing development), or consulting (architecture reviews). Contact him to discuss your specific needs.',
  'what are his rates': 'Rates depend on project scope and engagement type. Anup provides competitive pricing for enterprise Java projects. Reach out via the contact section for a custom quote.',
  'engagement models': 'Three options: (1) Project-based: fixed scope & timeline, (2) Retainer: ongoing support & development, (3) Consulting: architecture review & optimization.',
  
  // Experience
  'how many years experience': 'Anup has 8+ years of full-stack development experience, with a focus on enterprise Java systems handling millions of transactions.',
  'what projects has he built': 'Notable projects: (1) E-Commerce Microservices Platform — 100K+ daily transactions, 99.9% uptime, 40% cost reduction. (2) Real-time Analytics Dashboard — 1M+ events/minute, sub-100ms latency. (3) Payment Gateway — $5M+ daily volume.',
  
  // Client-focused
  'can he help with microservices': 'Absolutely! Anup has led multiple monolith-to-microservices migrations, including a platform now handling 500K+ daily transactions with 99.9% uptime.',
  'can he optimize performance': 'Yes! Performance optimization is a core specialty. Recent wins: 70% faster response times, 95% reduction in data latency, 60% faster deployments.',
  'does he work with startups': 'Yes, Anup works with both startups and enterprises. He adapts his approach to fit your team size, budget, and growth stage.',
  'what industries': 'Anup has experience across BFSI (banking/insurance), E-Commerce, Logistics/SaaS, and Fortune 500 enterprises.',
  
  // Communication
  'how to contact': 'Best ways to reach Anup: (1) WhatsApp: +65 8398 5072 (fastest), (2) Email: davinanup@gmail.com, (3) Use the contact form above. He responds within 24 hours.',
  'response time': 'Anup typically responds within 24 hours. For urgent inquiries, WhatsApp is the fastest channel.',
}

// Quick suggestion chips
const QUICK_QUESTIONS = [
  'What are his skills?',
  'Is he available?',
  'What projects has he built?',
  'Does he work remotely?',
  'How to contact?',
]

function safetyFilter(s: string): boolean {
  const forbidden = [/email/i, /phone/i, /whatsapp/i, /credit/i, /password/i]
  return !forbidden.some((re) => re.test(s))
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: '👋 Hi! I\'m Anup\'s portfolio assistant. Ask me about his experience building enterprise Java systems, microservices architecture, or how he can help with your project!', 
      timestamp: new Date() 
    },
  ])
  const [docs, setDocs] = useState<ChatDoc[] | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && !docs) {
      fetch(`${import.meta.env.BASE_URL}chat/index.json`)
        .then((r) => r.json())
        .then((d) => setDocs(d))
        .catch(() => setDocs([]))
    }
  }, [open, docs])

  useEffect(() => {
    if (open) {
      panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight })
    }
  }, [messages, open])

  function normalize(q: string) {
    return q.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
  }

  async function onSend(customQuery?: string) {
    const q = (customQuery || input).trim()
    if (!q) return
    
    setInput('')
    setShowSuggestions(false)
    setMessages((m) => [...m, { role: 'user', content: q, timestamp: new Date() }])
    setLoading(true)
    setIsTyping(true)
    
    // Simulate typing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    try {
      const norm = normalize(q)
      if (FAQ[norm]) {
        setMessages((m) => [...m, { role: 'assistant', content: FAQ[norm], timestamp: new Date() }])
        return
      }

      const top = docs && docs.length ? await rankBySimilarity(q, docs, 4) : []
      const context = top
        .map((t, i) => `[#${i + 1}] ${t.title}${t.url ? ` (${t.url})` : ''}\n${t.text}`)
        .join('\n\n')

      const system = [
        'You are an assistant for a personal portfolio site.',
        'Only answer from CONTEXT. If the answer is not in CONTEXT, reply: "I don\'t know."',
        'Be concise and professional. Do not request contact information or personal data.',
        'If asked for the person\'s name, reply exactly: "Anup Davin Mathivanan."',
      ].join(' ')

      const prompt = `${system}\n\nCONTEXT:\n${context || '(none)'}\n\nUSER: ${q}\nASSISTANT:`
      const completion = await generateAnswer(prompt, { maxNewTokens: 80 })
      let answer = completion.replace(/^[\s\S]*ASSISTANT:\s*/i, '').trim()

      if (!safetyFilter(answer)) {
        answer = 'I can\'t help with that. Please ask about experience, projects, or skills.'
      }

      if (!answer || /i don.?t know/i.test(answer)) {
        // Try to extract a fact from context for fallback
        const nameHit = top.find((d) => /Anup Davin Mathivanan/i.test(d.text))
        if (/name/i.test(q) && nameHit) answer = 'Anup Davin Mathivanan.'
        else if (!answer) answer = 'I don\'t have information about that. Try asking about Anup\'s skills, projects, or experience.'
      }

      setMessages((m) => [...m, { role: 'assistant', content: answer, timestamp: new Date() }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I ran into an issue. Please try again.', timestamp: new Date() }])
    } finally {
      setLoading(false)
      setIsTyping(false)
    }
  }

  return (
    <div>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 bg-green-600 text-black font-bold shadow-lg hover:bg-green-500 transition-all duration-300"
        whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <MessageCircle className="w-6 h-6" />
              <motion.span 
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-24 right-6 z-40 w-[380px] max-w-[90vw] rounded-2xl border border-green-400/30 bg-black/95 backdrop-blur-md text-green-300 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900/50 to-gray-900 p-4 border-b border-green-400/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center"
                    animate={{ boxShadow: ['0 0 0px rgba(34, 197, 94, 0.5)', '0 0 15px rgba(34, 197, 94, 0.5)', '0 0 0px rgba(34, 197, 94, 0.5)'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-5 h-5 text-black" />
                  </motion.div>
                  <div>
                    <div className="font-bold text-green-400 flex items-center gap-2">
                      Portfolio Assistant
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Replies instantly
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={panelRef} className="h-72 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-black" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === 'user' 
                        ? 'bg-green-600 text-black rounded-br-sm' 
                        : 'bg-gray-800 border border-gray-700 rounded-bl-sm'
                    }`}>
                      <div className="text-sm leading-relaxed">{message.content}</div>
                      {message.timestamp && (
                        <div className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-green-800' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Quick Suggestions */}
              {showSuggestions && messages.length <= 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {QUICK_QUESTIONS.map((q, i) => (
                    <motion.button
                      key={q}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => onSend(q)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-400/50 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {q}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-sm p-3">
                    <div className="flex items-center gap-2">
                      <motion.div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-green-400/20 bg-gray-900/50">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && onSend()}
                  placeholder="Ask about skills, projects, availability..."
                  className="flex-1 rounded-xl border border-gray-600 bg-black px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
                <motion.button
                  onClick={() => onSend()}
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-green-600 text-black px-4 py-2.5 font-bold hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>Powered by on-device AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

