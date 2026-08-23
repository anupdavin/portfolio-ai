import { motion } from 'framer-motion'

const WORKFLOW_STEPS = [
  { id: 'understand', title: 'UNDERSTAND', desc: 'Build context before code.' },
  { id: 'plan', title: 'PLAN', desc: 'Decompose complex engineering problems.' },
  { id: 'challenge', title: 'CHALLENGE', desc: 'Attack assumptions before implementation.' },
  { id: 'implement', title: 'IMPLEMENT', desc: 'Use humans and agents where each is strongest.' },
  { id: 'verify', title: 'VERIFY', desc: 'Build, lint, test, scan and evaluate.' },
  { id: 'observe', title: 'OBSERVE', desc: 'Production behavior matters more than demo behavior.' },
  { id: 'learn', title: 'LEARN', desc: 'Feed evidence back into the next decision.' },
]

export default function WorkflowSection() {
  return (
    <section id="workflow" className="min-h-screen py-32 px-6 relative z-10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto flex justify-end w-full">
        <div className="w-full md:w-[40%] space-y-24">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            className="mb-16"
          >
            <h2 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em]">Operating System</h2>
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed tracking-tight">
              AI increases engineering leverage.<br/>
              <span className="text-gray-500">Human judgment remains responsible for architecture and outcomes.</span>
            </p>
          </motion.div>

          <div className="space-y-6">
            {WORKFLOW_STEPS.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.1 }}
                className="flex items-baseline gap-6 group"
              >
                <div className="text-[10px] font-mono text-gray-600 w-4">0{index + 1}</div>
                <div>
                  <h3 className="text-xs font-mono tracking-widest mb-1 text-white group-hover:text-green-400 transition-colors">{step.title}</h3>
                  <p className="text-[13px] text-gray-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  )
}

