import { motion } from 'framer-motion'
import { useRef } from 'react'

const EXPERIENCE = [
  {
    role: 'Principal Platform Architect',
    domain: 'Enterprise Modernization',
    challenge: 'Transitioning massive legacy monoliths into distributed event-driven systems safely.',
    systems: 'Kafka, Kubernetes, Java 21, AWS',
    outcome: 'Decoupled services scaling independently with zero-downtime deployments.'
  },
  {
    role: 'Senior Software Engineer',
    domain: 'Master Data Management',
    challenge: 'Reconciling disparate data sources in real-time under high consistency requirements.',
    systems: 'TIBCO EBX, Boomi, Spring Boot',
    outcome: 'Reduced reconciliation times from hours to minutes, unlocking operational insights.'
  },
  {
    role: 'AI-Native Systems Engineer',
    domain: 'Applied AI & Automation',
    challenge: 'Grounding generative models in enterprise realities without hallucination.',
    systems: 'pgvector, LlamaIndex, React',
    outcome: 'Context-aware assistants that respect authorization and require evidence.'
  }
]

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="experience" className="min-h-screen py-32 px-6 relative z-10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Systems Evolution</h2>
          <p className="text-gray-400">
            A history of complex technical environments.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12" ref={containerRef}>
          {EXPERIENCE.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group space-y-8 relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
              <div className="pt-6">
                <div className="text-[10px] font-mono text-green-400 mb-2 tracking-widest uppercase">{exp.domain}</div>
                <h3 className="text-2xl font-medium tracking-tight mb-8 group-hover:text-green-300 transition-colors">{exp.role}</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Challenge</div>
                    <p className="text-sm text-gray-300 leading-relaxed">{exp.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Systems</div>
                    <p className="text-xs font-mono text-gray-400 bg-white/5 inline-block px-2 py-1 rounded-sm">{exp.systems}</p>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Outcome</div>
                    <p className="text-sm text-white leading-relaxed">{exp.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

