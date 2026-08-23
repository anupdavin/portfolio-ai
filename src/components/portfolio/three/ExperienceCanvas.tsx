import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { Preload } from '@react-three/drei'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import SceneManager from './SceneManager'
import ReducedMotionFallback from './ReducedMotionFallback'

export default function ExperienceCanvas() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [webGLFailed, setWebGLFailed] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  if (webGLFailed || prefersReducedMotion) return <ReducedMotionFallback />

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0.15, 0.05, 4.6], fov: 42, near: 0.1, far: 60 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.setClearColor('#020203', 0)
          gl.domElement.addEventListener('webglcontextlost', () => setWebGLFailed(true), { once: true })
        }}
        onError={() => setWebGLFailed(true)}
      >
        <Suspense fallback={null}>
          <SceneManager />
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom
              luminanceThreshold={0.72}
              luminanceSmoothing={0.5}
              intensity={0.48}
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
