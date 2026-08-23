import { useScroll } from 'framer-motion'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

export default function ScrollCameraRig() {
  const { scrollYProgress } = useScroll()
  const vec = useRef(new THREE.Vector3())
  const lookAtVec = useRef(new THREE.Vector3())

  useFrame((state) => {
    const progress = scrollYProgress.get()
    
    let targetX = 0
    let targetY = 0
    let targetZ = 12
    let lookX = 0
    let lookY = 0

    if (progress <= 0.15) {
      // Hero
      targetZ = 12 - progress * 10
      targetY = progress * 2
    } else if (progress > 0.15 && progress <= 0.4) {
      // Workflow
      targetX = 3
      targetZ = 8
      targetY = 1
      lookX = -2
    } else if (progress > 0.4 && progress <= 0.6) {
      // Architecture
      targetX = 6
      targetZ = 10
      targetY = 2
      lookX = 0
    } else {
      // Rest
      targetX = 0
      targetZ = 15
      targetY = 5
      lookY = 2
    }
    
    vec.current.set(targetX, targetY, targetZ)
    state.camera.position.lerp(vec.current, 0.05)
    
    lookAtVec.current.lerp(new THREE.Vector3(lookX, lookY, 0), 0.05)
    
    // Add subtle parallax from pointer
    state.camera.position.x += (state.pointer.x * 1.5 - state.camera.position.x + targetX) * 0.02
    state.camera.position.y += (state.pointer.y * 1.5 + targetY - state.camera.position.y) * 0.02
    
    state.camera.lookAt(lookAtVec.current)
  })

  return null
}
