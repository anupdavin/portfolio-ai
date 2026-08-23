import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text, Line } from '@react-three/drei'
import { useScroll } from 'framer-motion'

const CAPABILITIES = [
  'PLAN', 'CHALLENGE', 'RESEARCH', 'CODE', 
  'REVIEW', 'TEST', 'SECURITY', 'OBSERVE', 
  'DATA', 'AGENTS', 'ARCHITECTURE', 'PRODUCTION'
]

export default function CapabilityGraph() {
  const groupRef = useRef<THREE.Group>(null)
  const { scrollYProgress } = useScroll()

  // Pre-calculate target positions for different scroll states
  const nodes = useMemo(() => {
    return CAPABILITIES.map((label, i) => {
      // 1. Sphere layout (Hero)
      const phi = Math.acos(-1 + (2 * i) / CAPABILITIES.length)
      const theta = Math.sqrt(CAPABILITIES.length * Math.PI) * phi
      const radius = 3.5
      const spherePos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      )

      // 2. Pipeline layout (Workflow)
      const pipelineX = -4 + (i * 0.8)
      const pipelineY = Math.sin(i * 0.5) * 1.5
      const pipelineZ = -2
      const pipelinePos = new THREE.Vector3(pipelineX, pipelineY, pipelineZ)

      // 3. Stacked layout (Architecture)
      const col = i % 2
      const row = Math.floor(i / 2)
      const stackX = -2 + col * 4
      const stackY = 3 - row * 1.2
      const stackZ = 0
      const stackPos = new THREE.Vector3(stackX, stackY, stackZ)

      return {
        label,
        spherePos,
        pipelinePos,
        stackPos,
        currentPos: spherePos.clone(),
        ref: React.createRef<THREE.Group>()
      }
    })
  }, [])

  useFrame(() => {
    const progress = scrollYProgress.get()

    nodes.forEach((node) => {
      let targetPos = node.spherePos

      if (progress > 0.15 && progress <= 0.4) {
        targetPos = node.pipelinePos
      } else if (progress > 0.4 && progress <= 0.6) {
        targetPos = node.stackPos
      } else if (progress > 0.6) {
        // Fade out or move away
        targetPos = node.spherePos
      }

      // Smoothly interpolate position
      node.currentPos.lerp(targetPos, 0.05)
      
      if (node.ref.current) {
        node.ref.current.position.copy(node.currentPos)
      }
    })

    if (groupRef.current) {
      // Slight constant rotation only when in sphere mode
      if (progress < 0.15) {
        groupRef.current.rotation.y += 0.002
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.05)
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Dynamic connections */}
      {nodes.map((node, i) => {
        // Connect each node to the center or previous node
        return (
          <ConnectionLine 
            key={`line-${i}`} 
            nodePos={node.currentPos} 
            progress={scrollYProgress} 
            index={i}
            nodes={nodes}
          />
        )
      })}
      
      {nodes.map((node, i) => (
        <group key={`node-${i}`} ref={node.ref} position={node.currentPos}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#4ade80" : "#60a5fa"} transparent opacity={0.8} />
          </mesh>
          <Text
            position={[0, -0.25, 0]}
            fontSize={0.15}
            color={i % 3 === 0 ? "#bbf7d0" : "#93c5fd"}
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>
        </group>
      ))}
    </group>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ConnectionLine({ nodePos, progress, index, nodes }: { nodePos: THREE.Vector3, progress: any, index: number, nodes: any[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineRef = useRef<any>(null)
  const center = useMemo(() => new THREE.Vector3(0, 0, 0), [])
  const points = useMemo(() => [center, nodePos], [nodePos, center])

  useFrame(() => {
    const p = progress.get()
    if (lineRef.current) {
      if (p > 0.15 && p <= 0.4 && index > 0) {
        // Connect to previous node in pipeline
        const prevPos = nodes[index - 1].currentPos
        lineRef.current.geometry.setPositions([prevPos.x, prevPos.y, prevPos.z, nodePos.x, nodePos.y, nodePos.z])
      } else if (p > 0.4 && p <= 0.6) {
        // Disconnect or connect horizontally
        if (index % 2 === 1) {
          const prevPos = nodes[index - 1].currentPos
          lineRef.current.geometry.setPositions([prevPos.x, prevPos.y, prevPos.z, nodePos.x, nodePos.y, nodePos.z])
        } else {
          lineRef.current.geometry.setPositions([nodePos.x, nodePos.y, nodePos.z, nodePos.x, nodePos.y, nodePos.z])
        }
      } else {
        // Connect to center
        lineRef.current.geometry.setPositions([center.x, center.y, center.z, nodePos.x, nodePos.y, nodePos.z])
      }
    }
  })

  return (
    <Line 
      ref={lineRef}
      points={points}
      color="#3b82f6"
      opacity={0.15}
      transparent
      lineWidth={1}
    />
  )
}
