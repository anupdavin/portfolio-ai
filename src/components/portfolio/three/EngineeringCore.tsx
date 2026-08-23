import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

export default function EngineeringCore() {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const ringsRef = useRef<THREE.Group>(null)
  
  const { scrollYProgress } = useScroll()

  // Generate architectural wireframe points
  const { edgesGeometry } = useMemo(() => {
    // A more complex architectural shape like an Icosahedron, but we only use edges
    const geo = new THREE.IcosahedronGeometry(1.2, 1)
    const edges = new THREE.EdgesGeometry(geo)
    return { edgesGeometry: edges }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const progress = scrollYProgress.get()

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1
      groupRef.current.rotation.z = t * 0.05
      
      // The core scales and moves based on scroll
      // 0-0.2: INTRO (Center)
      // 0.2-0.4: WORKFLOW (Shifts left/right depending on design)
      const scale = 1 - progress * 0.4
      groupRef.current.scale.set(scale, scale, scale)
    }

    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.x = t * (0.2 + i * 0.1)
        ring.rotation.y = t * (0.1 + i * 0.2)
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.05} />
      </mesh>

      {/* Architectural Wireframe */}
      <lineSegments ref={linesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#4ade80" transparent opacity={0.3} />
      </lineSegments>

      {/* Orbital rings */}
      <group ref={ringsRef}>
        {[1.6, 2.0, 2.4].map((radius, i) => (
          <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <torusGeometry args={[radius, 0.01, 16, 100]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#3b82f6" : "#a3e635"} transparent opacity={0.15} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

