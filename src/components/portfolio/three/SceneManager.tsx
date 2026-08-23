import { useRef } from 'react'
import * as THREE from 'three'
import EngineeringCore from './EngineeringCore'
import CapabilityGraph from './CapabilityGraph'
import ScrollCameraRig from './ScrollCameraRig'
import DataFlowParticles from './DataFlowParticles'

export default function SceneManager() {
  const group = useRef<THREE.Group>(null)

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#a3e635" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <ScrollCameraRig />
      
      <group ref={group}>
        <EngineeringCore />
        <CapabilityGraph />
        <DataFlowParticles />
      </group>
      
      <fog attach="fog" args={['#000000', 10, 30]} />
    </>
  )
}
