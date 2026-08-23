import { motion } from 'framer-motion'

const WORKFLOW_STEPS = [
  ['UNDERSTAND', 'Build context before code.'],
  ['PLAN', 'Decompose the problem.'],
  ['CHALLENGE', 'Attack assumptions before implementation.'],
  ['BUILD', 'Use humans and agents where each is strongest.'],
  ['VERIFY', 'Build, lint, test, scan and evaluate.'],
  ['OBSERVE', 'Production behavior is the evidence.'],
  ['LEARN', 'Feed evidence into the next decision.'],
] as const

export default function WorkflowSection() {
  return (
    <section id="workflow" className="relative h-[150vh] px-5 md:px-8">
      <div className="sticky top-0 h-screen max-w-[1500px] mx-auto flex items-center justify-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-25% 0px -25% 0px' }}
          className="w-full md:w-[36%] md:mr-[4%]"
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-lime-200/45 mb-6">01 / intelligence loop</div>
          <h2 className="text-3xl md:text-5xl leading-[1.03] tracking-[-0.04em] font-medium text-white mb-7">
            Engineering is<br />a feedback loop.
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-white/42 max-w-md">
            AI increases leverage. Architecture, trade-offs and outcomes still remain human responsibilities.
          </p>
          <div className="mt-12 pt-5 border-t border-white/10 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25 flex justify-between">
            <span>problem enters</span>
            <span>evidence returns</span>
          </div>
        </motion.div>
      </div>

      <ol className="sr-only">
        {WORKFLOW_STEPS.map(([title, description]) => (
          <li key={title}><strong>{title}</strong>: {description}</li>
        ))}
      </ol>
    </section>
  )
}
