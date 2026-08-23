import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const systemOpacity = useTransform(scrollYProgress, [0, 0.1, 0.7, 1], [0.35, 1, 0.75, 0])
  const identityOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.62, 0.82], [0, 1, 1, 0])
  const identityY = useTransform(scrollYProgress, [0.08, 0.22], [24, 0])
  const statementOpacity = useTransform(scrollYProgress, [0.2, 0.34, 0.7, 0.88], [0, 1, 1, 0])
  const statementY = useTransform(scrollYProgress, [0.2, 0.38], [34, 0])
  const detailsOpacity = useTransform(scrollYProgress, [0.36, 0.48, 0.78, 0.92], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="origin" className="relative h-[165vh] px-5 md:px-8">
      <div className="sticky top-0 h-screen max-w-[1500px] mx-auto overflow-hidden">
        <motion.div
          style={{ opacity: systemOpacity }}
          className="absolute top-7 left-0 md:left-4 font-mono text-[9px] md:text-[10px] tracking-[0.28em] text-white/40 uppercase"
        >
          <span className="inline-block w-1.5 h-1.5 mr-3 bg-lime-300/80 align-middle shadow-[0_0_16px_rgba(190,242,100,0.45)]" />
          system / online
        </motion.div>

        <motion.div
          style={{ opacity: identityOpacity, y: identityY }}
          className="absolute left-0 md:left-[7%] top-[19%] md:top-[21%] max-w-xl"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/35 mb-3">Architect / operator</div>
          <h2 className="text-[13px] md:text-sm tracking-[0.08em] uppercase text-white/78">Anup Davin Mathivanan</h2>
        </motion.div>

        <motion.div
          style={{ opacity: statementOpacity, y: statementY }}
          className="absolute left-0 md:left-[7%] bottom-[22%] md:bottom-[17%] max-w-4xl"
        >
          <h1 className="text-[clamp(2.5rem,6.7vw,6.8rem)] leading-[0.94] tracking-[-0.055em] font-medium text-white">
            Software. Data.<br />Intelligence.<br />One system.
          </h1>
        </motion.div>

        <motion.div
          style={{ opacity: detailsOpacity }}
          className="absolute right-0 md:right-[5%] bottom-[7%] md:bottom-[10%] max-w-sm text-right"
        >
          <p className="text-xs md:text-sm leading-relaxed text-white/48 mb-5">
            Principal AI-native platform engineering across distributed systems, data &amp; MDM, cloud and enterprise modernization.
          </p>
          <a
            href="#workflow"
            className="inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
          >
            enter the system <ArrowDownRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <div className="absolute right-0 top-7 font-mono text-[9px] text-white/20 tracking-[0.18em] hidden md:block">
          09+ YEARS / BUILD → OPERATE → MODERNIZE
        </div>
      </div>
    </section>
  )
}
