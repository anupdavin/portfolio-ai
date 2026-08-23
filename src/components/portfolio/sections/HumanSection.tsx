import { motion } from 'framer-motion'

export default function HumanSection() {
  return (
    <section id="human" className="min-h-screen py-32 px-6 flex items-center justify-center relative z-10">
      <div className="max-w-3xl mx-auto text-center space-y-16">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
            The system still needs judgment.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-xs md:text-sm text-gray-400 font-mono"
        >
          {[
            'architecture decisions',
            'trade-offs',
            'ownership',
            'mentoring',
            'stakeholder alignment',
            'regulated enterprise environments',
            'learning and adaptation'
          ].map((item, i) => (
            <span key={item} className="flex items-center gap-6">
              <span>{item}</span>
              {i < 6 && <span className="w-1 h-1 rounded-full bg-white/20" />}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

