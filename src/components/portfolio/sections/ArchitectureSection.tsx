import { motion } from 'framer-motion'

const ARCHITECTURE_LAYERS = [
  { name: 'Frontend', tools: 'React' },
  { name: 'API / Services', tools: 'Java 21 / Spring Boot' },
  { name: 'Events / Integration', tools: 'Kafka / REST / GraphQL' },
  { name: 'Data / MDM', tools: 'TIBCO EBX / Boomi DataHub' },
  { name: 'AI / Retrieval', tools: 'pgvector / Python / TS' },
  { name: 'Infrastructure', tools: 'Kubernetes / AWS' },
]

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="min-h-screen py-32 px-6 relative z-10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-24"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Codebase Intelligence</h2>
          <p className="text-gray-400">
            A beautiful, explorable system architecture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            {ARCHITECTURE_LAYERS.map((layer, index) => (
              <motion.div 
                key={layer.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold">{layer.name}</h4>
                  <span className="text-xs font-mono text-gray-500">{layer.tools}</span>
                </div>
                
                {layer.name === 'Events / Integration' && (
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs hidden group-hover:block text-gray-300">
                    <div className="font-mono text-green-400 mb-1">Kafka</div>
                    <div>Event-driven reconciliation</div>
                    <div className="text-white mt-1">multi-hour → &lt;20 min</div>
                  </div>
                )}
                
                {layer.name === 'API / Services' && (
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs hidden group-hover:block text-gray-300">
                    <div className="font-mono text-green-400 mb-1">Java 21</div>
                    <div>Legacy runtime modernization</div>
                    <div className="text-white mt-1">JDK 8 → containerized platform</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="p-8 border border-white/5 rounded-2xl bg-black/60 backdrop-blur-xl"
            >
              <h3 className="text-xl font-bold mb-4 text-center tracking-tight">Enterprise Reality</h3>
              <p className="text-gray-400 mb-8 text-center text-sm leading-relaxed">
                AI does not live alone. It must integrate into a broader reality.
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'idempotency', 'CDC', 'outbox', 'sagas', 
                  'authentication', 'authorization', 'evaluation', 
                  'observability', 'CI/CD', 'dependency governance', 
                  'security scanning', 'Kubernetes', 'rollback'
                ].map(concept => (
                  <span key={concept} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-gray-400 hover:text-white hover:border-white/30 transition-colors">
                    {concept}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}

