import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import SceneManager from './SceneManager'
import ReducedMotionFallback from './ReducedMotionFallback'

export default function ExperienceCanvas() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [webGLFailed, setWebGLFailed] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  if (webGLFailed || prefersReducedMotion) {
    return <ReducedMotionFallback />
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0)
        }}
        onError={() => setWebGLFailed(true)}
      >
        <Suspense fallback={null}>
          <SceneManager />
          <EffectComposer disableNormalPass multisampling={4}>
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              intensity={1.5} 
              blendFunction={BlendFunction.SCREEN}
            />
            <ToneMapping />
          </EffectComposer>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

