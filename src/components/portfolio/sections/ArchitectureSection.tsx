import { motion } from 'framer-motion'

const LAYERS = [
  ['UI', 'React'],
  ['SERVICES', 'Java / Spring Boot'],
  ['EVENTS', 'Kafka'],
  ['DATA', 'MDM / PostgreSQL'],
  ['AI', 'Retrieval / evaluation'],
  ['PLATFORM', 'Kubernetes / cloud'],
] as const

const PRODUCTION_CONCERNS = [
  'security', 'observability', 'delivery', 'identity', 'recovery', 'governance', 'runtime', 'data quality',
] as const

export default function ArchitectureSection() {
  return (
    <>
      <section id="codebase" className="relative h-[135vh] px-5 md:px-8">
        <div className="sticky top-0 h-screen max-w-[1500px] mx-auto flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: '-25% 0px -25% 0px' }}
            className="w-full md:w-[34%] md:ml-[5%]"
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-sky-200/45 mb-6">02 / codebase</div>
            <h2 className="text-3xl md:text-5xl leading-[1.03] tracking-[-0.04em] font-medium mb-7">
              The workflow becomes<br />a real system.
            </h2>
            <p className="text-sm md:text-base text-white/42 leading-relaxed max-w-md">
              The same decisions resolve into services, events, data, AI and platform boundaries. The graph should explain the architecture before the labels do.
            </p>
          </motion.div>
        </div>
        <ul className="sr-only">
          {LAYERS.map(([layer, tools]) => <li key={layer}>{layer}: {tools}</li>)}
        </ul>
      </section>

      <section id="production" className="relative h-[150vh] px-5 md:px-8">
        <div className="sticky top-0 h-screen max-w-[1500px] mx-auto flex items-end pb-[11vh] md:pb-[14vh]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-25% 0px -25% 0px' }}
            className="max-w-3xl"
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/28 mb-6">03 / scale reveal</div>
            <h2 className="text-[clamp(2.8rem,6vw,6rem)] leading-[0.96] tracking-[-0.055em] font-medium mb-7">
              A demo is<br />not a system.
            </h2>
            <p className="text-sm md:text-lg text-white/45 max-w-xl leading-relaxed">
              Production changes the boundary. Security, observability, delivery, runtime and governance emerge around the code you thought was the whole product.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/22">
              {PRODUCTION_CONCERNS.map((item) => <span key={item}>{item}</span>)}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
