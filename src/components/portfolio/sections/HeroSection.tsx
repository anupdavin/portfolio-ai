import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 pt-20 pb-10">
      <div className="max-w-7xl mx-auto w-full z-10 flex-grow flex flex-col justify-center">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[10px] md:text-xs font-mono text-gray-500 mb-8 tracking-[0.2em] uppercase"
          >
            System / Initializing
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-base md:text-lg text-white font-medium mb-12 tracking-wide"
          >
            Anup Davin Mathivanan
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.0 }}
            className="text-3xl md:text-5xl font-medium leading-[1.2] mb-8 text-white tracking-tight"
          >
            I design systems where <br className="hidden md:block"/> software, data, and intelligence <br className="hidden md:block"/> work as one.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="text-xs md:text-sm font-mono text-gray-500 max-w-2xl leading-relaxed"
          >
            Java • Distributed Systems • Data & MDM • Cloud Platforms • AI Engineering
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="max-w-7xl mx-auto w-full flex justify-between items-end pb-8"
      >
        <div className="text-xs text-gray-600 font-mono">
          Principal AI-Native Platform Architect<br/>
          9+ years building enterprise systems
        </div>
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce opacity-50" />
        </div>
      </motion.div>
    </section>
  )
}

