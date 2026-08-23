import { motion } from 'framer-motion'

const CASES = [
  {
    type: 'Production experience',
    title: 'Person MDM modernization',
    signal: 'JDK 8  →  JDK 21',
    detail: 'EBX / JBoss legacy runtime toward Tomcat, Maven, Jakarta and Kubernetes delivery.',
  },
  {
    type: 'Production experience',
    title: 'Event-driven reconciliation',
    signal: 'multi-hour  →  <20 min',
    detail: 'Kafka, CDC, idempotency, outbox and saga-oriented recovery patterns.',
  },
  {
    type: 'Portfolio lab',
    title: 'Grounded knowledge assistant',
    signal: 'evidence  →  answer  →  evaluate',
    detail: 'Retrieval, source requirements, abstention and prompt-injection evaluation.',
  },
] as const

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative h-[150vh] px-5 md:px-8">
      <div className="sticky top-0 h-screen max-w-[1500px] mx-auto flex items-center justify-end">
        <div className="w-full md:w-[39%] md:mr-[4%]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-25% 0px -25% 0px' }}
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/28 mb-6">04 / evidence</div>
            <h2 className="text-3xl md:text-5xl leading-[1.03] tracking-[-0.04em] font-medium mb-8">
              Architecture earns trust<br />when outcomes light up.
            </h2>
          </motion.div>

          <div className="space-y-7">
            {CASES.map((study, index) => (
              <motion.article
                key={study.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: '-15% 0px -15% 0px' }}
                transition={{ delay: index * 0.08 }}
                className="border-t border-white/10 pt-4"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/24">{study.type}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-lime-100/60">{study.signal}</span>
                </div>
                <h3 className="text-sm md:text-base text-white/82 mb-1">{study.title}</h3>
                <p className="text-xs leading-relaxed text-white/34 max-w-md">{study.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
