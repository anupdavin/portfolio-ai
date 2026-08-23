import { useMemo, useRef } from 'react'
import { Billboard, Line, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { generateTopology, type TopologyEdge } from './GraphData'
import DataPulses from './DataPulses'
import { getCinematicProgress, getSceneBlend, smoothstep, statePresence } from '../sceneChoreography'

const ZERO = new THREE.Vector3(0, 0, 0)

function revealGate(progress: number, revealAt?: number) {
  if (revealAt === undefined) return 1
  return smoothstep((progress - revealAt) / 0.035)
}

export default function SystemTopology() {
  const { nodes, edges } = useMemo(() => generateTopology(), [])
  const nodeGroupRefs = useRef<Record<string, THREE.Group | null>>({})

  const nodeCurrentPositions = useMemo(
    () => Object.fromEntries(nodes.map((node) => [node.id, node.positions.ORIGIN.clone()])) as Record<string, THREE.Vector3>,
    [nodes],
  )
  const nodeTargetPositions = useMemo(
    () => Object.fromEntries(nodes.map((node) => [node.id, new THREE.Vector3()])) as Record<string, THREE.Vector3>,
    [nodes],
  )

  useFrame((_, delta) => {
    const progress = getCinematicProgress()
    const blend = getSceneBlend(progress)
    const damping = 1 - Math.exp(-delta * 6)

    nodes.forEach((node) => {
      const target = nodeTargetPositions[node.id]
      target.lerpVectors(node.positions[blend.from], node.positions[blend.to], blend.mix)
      nodeCurrentPositions[node.id].lerp(target, damping)

      const group = nodeGroupRefs.current[node.id]
      if (!group) return

      group.position.copy(nodeCurrentPositions[node.id])
      const presence = statePresence(node.presence, blend) * revealGate(progress, node.revealAt)
      const targetScale = node.group === 'evidence' ? presence * 1.08 : presence
      const nextScale = THREE.MathUtils.damp(group.scale.x, targetScale, 10, delta)
      group.scale.setScalar(nextScale)
      group.visible = nextScale > 0.008
    })
  })

  return (
    <group>
      {edges.map((edge, index) => (
        <ConnectionLine
          key={`${edge.source}-${edge.target}-${index}`}
          edge={edge}
          nodePositions={nodeCurrentPositions}
        />
      ))}

      <DataPulses edges={edges} nodePositions={nodeCurrentPositions} />

      {nodes.map((node) => {
        const isCore = node.group === 'core'
        const isEvidence = node.group === 'evidence'
        const markerColor = isEvidence ? '#f8fafc' : node.group === 'workflow' ? '#a3e635' : '#60a5fa'

        return (
          <group
            key={node.id}
            ref={(element) => {
              nodeGroupRefs.current[node.id] = element
            }}
            scale={0}
          >
            <mesh rotation={[0.35, 0.45, 0]}>
              <boxGeometry args={isCore ? [0.13, 0.13, 0.13] : [0.075, 0.075, 0.075]} />
              <meshBasicMaterial color={isCore ? '#ffffff' : markerColor} transparent opacity={isCore ? 0.95 : 0.82} />
            </mesh>

            <mesh position={[0, 0, -0.03]}>
              <ringGeometry args={isCore ? [0.2, 0.205, 48] : [0.12, 0.123, 32]} />
              <meshBasicMaterial color={markerColor} transparent opacity={isCore ? 0.24 : 0.14} side={THREE.DoubleSide} />
            </mesh>

            <Billboard position={[0, isEvidence ? -0.3 : -0.22, 0]} follow>
              <Text
                fontSize={isEvidence ? 0.16 : isCore ? 0.12 : 0.115}
                color={isEvidence ? '#f8fafc' : '#dbeafe'}
                anchorX="center"
                anchorY="middle"
                fillOpacity={isEvidence ? 0.95 : 0.68}
                letterSpacing={isEvidence ? 0.04 : 0.015}
              >
                {node.label}
              </Text>
            </Billboard>
          </group>
        )
      })}
    </group>
  )
}

function ConnectionLine({
  edge,
  nodePositions,
}: {
  edge: TopologyEdge
  nodePositions: Record<string, THREE.Vector3>
}) {
  const lineRef = useRef<Line2>(null)

  useFrame((_, delta) => {
    const line = lineRef.current
    if (!line) return

    const source = nodePositions[edge.source] ?? ZERO
    const target = nodePositions[edge.target] ?? ZERO
    line.geometry.setPositions([source.x, source.y, source.z, target.x, target.y, target.z])

    const progress = getCinematicProgress()
    const blend = getSceneBlend(progress)
    const targetOpacity = statePresence(edge.presence, blend) * revealGate(progress, edge.revealAt) * 0.42
    line.material.opacity = THREE.MathUtils.damp(line.material.opacity, targetOpacity, 9, delta)
  })

  return (
    <Line
      ref={lineRef}
      points={[ZERO, ZERO]}
      color="#6ee7b7"
      opacity={0}
      transparent
      lineWidth={0.65}
      depthWrite={false}
    />
  )
}
