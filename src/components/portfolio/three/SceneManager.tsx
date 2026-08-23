import { useRef } from 'react'
import * as THREE from 'three'
import ScrollCameraRig from './ScrollCameraRig'
import SystemTopology from './topology/SystemTopology'

export default function SceneManager() {
  const group = useRef<THREE.Group>(null)

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 10]} intensity={0.5} color="#a3e635" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
      
      <ScrollCameraRig />
      
      <group ref={group}>
        <SystemTopology />
      </group>
      
      <fog attach="fog" args={['#000000', 5, 25]} />
    </>
  )
}
