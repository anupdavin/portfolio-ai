import { motion } from 'framer-motion'

const HUMAN_SIGNALS = ['architecture', 'trade-offs', 'ownership', 'mentoring', 'stakeholder alignment', 'regulated delivery'] as const

export default function HumanSection() {
  return (
    <section id="human" className="relative min-h-[120vh] px-5 md:px-8 flex items-center">
      <div className="max-w-[1500px] mx-auto w-full py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-20% 0px -20% 0px' }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/24 mb-8">05 / human judgment</div>
          <h2 className="text-[clamp(3rem,7.4vw,7.7rem)] leading-[0.92] tracking-[-0.06em] font-medium mb-10">
            Systems still<br />need judgment.
          </h2>
          <p className="text-sm md:text-lg leading-relaxed text-white/38 max-w-2xl">
            Models can accelerate research, coding and review. Responsibility for architecture, trade-offs, people and production outcomes stays human.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-20 border-t border-white/10 pt-5 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/22"
        >
          {HUMAN_SIGNALS.map((item) => <span key={item}>{item}</span>)}
        </motion.div>
      </div>
    </section>
  )
}
