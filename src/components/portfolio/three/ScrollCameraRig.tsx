import { useScroll } from 'framer-motion'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

const SCROLL_THRESHOLDS = [
  { state: 'ORIGIN', max: 0.05 },
  { state: 'SYSTEM_INIT', max: 0.15 },
  { state: 'WORKFLOW', max: 0.35 },
  { state: 'CODEBASE', max: 0.55 },
  { state: 'PRODUCTION', max: 0.70 },
  { state: 'EVIDENCE', max: 0.90 },
  { state: 'HUMAN', max: 1.0 },
];

function getCurrentState(progress: number): string {
  for (const t of SCROLL_THRESHOLDS) {
    if (progress <= t.max) return t.state;
  }
  return 'HUMAN';
}

export default function ScrollCameraRig() {
  const { scrollYProgress } = useScroll()
  const vec = useRef(new THREE.Vector3())
  const lookAtVec = useRef(new THREE.Vector3())

  // Track the actual base position without pointer offset for smooth damping
  const baseTargetPos = useRef(new THREE.Vector3(0, 0, 15))

  useFrame((state, delta) => {
    const progress = scrollYProgress.get()
    const currentState = getCurrentState(progress)
    
    let targetX = 0
    let targetY = 0
    let targetZ = 15
    
    let lookX = 0
    let lookY = 0

    switch (currentState) {
      case 'ORIGIN':
        targetZ = 12
        break;
      case 'SYSTEM_INIT':
        targetZ = 8
        break;
      case 'WORKFLOW':
        targetX = 2
        targetZ = 8
        lookX = -2
        break;
      case 'CODEBASE':
        targetX = -4
        targetY = 2
        targetZ = 10
        lookX = 0
        lookY = 0
        break;
      case 'PRODUCTION':
        targetX = 0
        targetY = -2
        targetZ = 18 // Reveal the full scale
        lookX = 0
        lookY = 0
        break;
      case 'EVIDENCE':
        targetX = 4
        targetY = 0
        targetZ = 12
        lookX = 2
        lookY = 0
        break;
      case 'HUMAN':
        targetX = 0
        targetY = 0
        targetZ = 12
        lookX = 0
        lookY = 0
        break;
    }

    // Determine the base target
    baseTargetPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 2.0)
    
    // Add subtle parallax from pointer, bounded
    const pointerOffsetX = state.pointer.x * 0.5;
    const pointerOffsetY = state.pointer.y * 0.5;
    
    vec.current.set(
      baseTargetPos.current.x + pointerOffsetX,
      baseTargetPos.current.y + pointerOffsetY,
      baseTargetPos.current.z
    )

    state.camera.position.lerp(vec.current, delta * 3.0)
    lookAtVec.current.lerp(new THREE.Vector3(lookX, lookY, 0), delta * 2.5)
    
    state.camera.lookAt(lookAtVec.current)
  })
  
  return null
}
