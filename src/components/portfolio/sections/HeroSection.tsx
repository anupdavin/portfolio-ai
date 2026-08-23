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
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] md:text-xs font-mono text-gray-500 mb-8 tracking-[0.2em] uppercase"
          >
            Initializing Engineering System...
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-gray-400 font-mono mb-2"
          >
            Anup Davin Mathivanan
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-green-400 mb-12 tracking-wide"
          >
            Principal AI-Native Platform Architect
          </motion.h3>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-12 text-white tracking-tight"
          >
            I design systems where <br className="hidden md:block"/> software, data, and intelligence <br className="hidden md:block"/> work as one.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="space-y-6"
          >
            <div className="text-xs md:text-sm font-mono text-gray-500 max-w-2xl leading-relaxed">
              Java • Distributed Systems • Data & MDM • Cloud Platforms • AI Engineering
            </div>
            <div className="text-sm md:text-base text-gray-400">
              9+ years building and modernizing enterprise systems.
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap gap-6 mt-16"
          >
            <a href="#workflow" className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors text-sm font-medium">
              Explore the system
            </a>
            <a href="#case-studies" className="px-8 py-3 bg-transparent text-white border border-white/20 rounded-full hover:bg-white/5 transition-colors text-sm font-medium">
              View engineering evidence
            </a>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="max-w-7xl mx-auto w-full flex justify-end"
      >
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}

