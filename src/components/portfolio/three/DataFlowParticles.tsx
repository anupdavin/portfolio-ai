import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

export default function DataFlowParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { scrollYProgress } = useScroll()
  const count = 300
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Particle data
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      // Cylindrical distribution
      const radius = 1 + Math.random() * 8
      const angle = Math.random() * Math.PI * 2
      temp.push({
        angle,
        radius,
        speed: 0.05 + Math.random() * 0.2,
        y: (Math.random() - 0.5) * 15,
        offset: Math.random() * Math.PI * 2
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const progress = scrollYProgress.get()

    if (meshRef.current) {
      particles.forEach((p, i) => {
        const currentAngle = p.angle + t * p.speed
        
        let targetX = Math.cos(currentAngle) * p.radius
        let targetZ = Math.sin(currentAngle) * p.radius
        let targetY = (p.y + t * p.speed * 2) % 15 - 7.5

        if (progress > 0.15 && progress <= 0.4) {
          // Flatten into a horizontal flow
          targetY = Math.sin(p.offset + t) * 0.5
          targetX = p.radius * Math.cos(currentAngle) - 4
        } else if (progress > 0.4 && progress <= 0.6) {
          // Flow downwards
          targetY = (p.y - t * p.speed * 5) % 15 - 7.5
          targetX = -2 + Math.cos(currentAngle) * 2
          targetZ = Math.sin(currentAngle) * 2
        }

        dummy.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05)
        dummy.scale.setScalar(Math.sin(t * 3 + p.offset) * 0.5 + 0.5)
        dummy.updateMatrix()
        meshRef.current!.setMatrixAt(i, dummy.matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, count]}>
      <boxGeometry args={[0.02, 0.02, 0.08]} />
      <meshBasicMaterial color="#a3e635" transparent opacity={0.4} />
    </instancedMesh>
  )
}

