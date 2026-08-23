import { motion } from 'framer-motion'
import { Server, Zap, BrainCircuit } from 'lucide-react'

const CASES = [
  {
    title: 'Person MDM Modernization',
    type: 'Production Experience',
    icon: Server,
    legacy: 'EBX / JBoss / JDK 8',
    modern: 'EBX 6.2.x / Tomcat / JDK 21 / Kubernetes',
    focus: [
      'runtime modernization',
      'Jakarta migration',
      'dependency governance',
      'Maven',
      'container deployment',
      'readiness checks',
      'security gates'
    ]
  },
  {
    title: 'Event-Driven Reconciliation',
    type: 'Production Experience',
    icon: Zap,
    legacy: 'Batch Processing',
    modern: 'multi-hour reconciliation → under 20 minutes',
    focus: [
      'Kafka',
      'CDC',
      'idempotency',
      'outbox',
      'saga patterns'
    ]
  },
  {
    title: 'Grounded Knowledge Assistant',
    type: 'Portfolio Lab',
    icon: BrainCircuit,
    legacy: 'Architecture',
    modern: 'Question → Retrieval → Evidence → Generation → Evaluation',
    focus: [
      'Sources required',
      'No evidence → abstain',
      'Prompt-injection tests',
      'Local-first mode'
    ]
  }
]

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="min-h-screen py-32 px-6 relative z-10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Selected Engineering Work</h2>
          <p className="text-gray-400">
            Evidence-supported outcomes over theoretical architecture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {CASES.map((study, index) => (
            <motion.div 
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-transparent border-t border-white/20 pt-8 relative overflow-hidden group hover:border-white/60 transition-colors"
            >
              <div className="absolute -top-10 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <study.icon className="w-48 h-48" />
              </div>
              
              <div className="text-[10px] font-mono text-green-400 mb-4 tracking-widest uppercase">{study.type}</div>
              <h3 className="text-2xl font-medium mb-12 relative z-10 tracking-tight">{study.title}</h3>
              
              <div className="space-y-6 mb-12 flex-grow relative z-10">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">From / Architecture</div>
                  <div className="font-mono text-xs text-gray-400">{study.legacy}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">To / Outcome</div>
                  <div className="font-mono text-xs text-white leading-relaxed">{study.modern}</div>
                </div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Focus</div>
                <div className="flex flex-wrap gap-2">
                  {study.focus.map(item => (
                    <span key={item} className="px-2 py-1 bg-white/5 text-gray-300 text-[10px] rounded-sm font-mono hover:text-white transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
