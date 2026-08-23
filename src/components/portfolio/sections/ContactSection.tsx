import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-[80vh] py-32 px-6 flex items-center justify-center relative z-10">
      <div className="max-w-4xl mx-auto text-center w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">
            Build the next system.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <a 
              href="mailto:davinanup@gmail.com" 
              className="px-8 py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center text-sm"
            >
              <Mail className="w-4 h-4" />
              Start a conversation
            </a>
            <a 
              href="https://github.com/anupdavin" 
              target="_blank" rel="noreferrer"
              className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center text-sm"
            >
              <Github className="w-4 h-4" />
              View GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/anup-davin-mathivanan" 
              target="_blank" rel="noreferrer"
              className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>

          <div className="pt-24 text-gray-500 text-xs font-mono uppercase tracking-widest">
            <button className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
              Request résumé
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

