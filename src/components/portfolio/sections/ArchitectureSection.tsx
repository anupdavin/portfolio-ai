import { motion } from 'framer-motion'

const ARCHITECTURE_LAYERS = [
  { name: 'Frontend', tools: 'React / Next.js' },
  { name: 'API / Services', tools: 'Java 21 / Spring Boot' },
  { name: 'Events / Integration', tools: 'Kafka / GraphQL' },
  { name: 'Data / MDM', tools: 'TIBCO EBX / PostgreSQL' },
  { name: 'AI / Retrieval', tools: 'pgvector / Python' },
  { name: 'Infrastructure', tools: 'Kubernetes / AWS' },
]

export default function ArchitectureSection() {
  return (
    <>
      {/* CODEBASE STATE */}
      <section id="codebase" className="min-h-screen py-32 px-6 relative z-10 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full flex justify-end">
          <div className="w-full md:w-[40%]">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              className="mb-12"
            >
              <h2 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em]">Codebase</h2>
              <p className="text-xl font-medium text-white tracking-tight">
                From abstract workflows to <br/>
                <span className="text-gray-500">concrete technology layers.</span>
              </p>
            </motion.div>
            
            <div className="space-y-2">
              {ARCHITECTURE_LAYERS.map((layer, index) => (
                <motion.div 
                  key={layer.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex justify-between items-center py-4 border-b border-white/5"
                >
                  <h4 className="text-sm font-medium text-white/80">{layer.name}</h4>
                  <span className="text-[10px] font-mono text-gray-500">{layer.tools}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTION STATE */}
      <section id="production" className="min-h-screen py-32 px-6 relative z-10 flex flex-col justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto w-full pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            className="max-w-xl"
          >
            <h2 className="text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-[0.2em]">Enterprise Reality</h2>
            <p className="text-2xl md:text-4xl font-medium text-white tracking-tight leading-tight mb-8">
              A demo is not a system.<br/>
              <span className="text-gray-500">Production changes everything.</span>
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-12">
              AI does not live alone. It must integrate into a broader reality of security, observability, and distributed data.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {[
                'idempotency', 'CDC', 'outbox', 'sagas', 
                'authentication', 'authorization', 'evaluation', 
                'observability', 'CI/CD', 'dependency governance', 
                'security scanning', 'Kubernetes', 'rollback'
              ].map(concept => (
                <span key={concept} className="px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">
                  {concept}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

