import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { TopologyEdge } from './GraphData'
import { getCinematicProgress, getSceneBlend, smoothstep, statePresence } from '../sceneChoreography'

export default function DataPulses({
  edges,
  nodePositions,
}: {
  edges: TopologyEdge[]
  nodePositions: Record<string, THREE.Vector3>
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = edges.length * 2
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const pulses = useMemo(
    () => Array.from({ length: count }, (_, index) => ({
      edgeIndex: index % edges.length,
      phase: (index * 0.381966) % 1,
      speed: 0.16 + (index % 5) * 0.035,
    })),
    [count, edges.length],
  )

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const progress = getCinematicProgress()
    const blend = getSceneBlend(progress)

    pulses.forEach((pulse, index) => {
      const edge = edges[pulse.edgeIndex]
      pulse.phase = (pulse.phase + delta * pulse.speed) % 1

      const reveal = edge.revealAt === undefined
        ? 1
        : smoothstep((progress - edge.revealAt) / 0.04)
      const active = statePresence(edge.presence, blend) * reveal
      const source = nodePositions[edge.source]
      const target = nodePositions[edge.target]

      if (source && target && active > 0.02) {
        dummy.position.lerpVectors(source, target, pulse.phase)
        const pulseEnvelope = Math.sin(pulse.phase * Math.PI)
        dummy.scale.setScalar(0.025 + pulseEnvelope * 0.045 * active)
      } else {
        dummy.position.set(0, 0, -50)
        dummy.scale.setScalar(0)
      }

      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        undefined as unknown as THREE.BufferGeometry,
        undefined as unknown as THREE.Material,
        count,
      ]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#d9f99d" transparent opacity={0.72} depthWrite={false} />
    </instancedMesh>
  )
}
