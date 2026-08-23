import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';
import { SceneState, TopologyEdge } from './GraphData';

const SCROLL_THRESHOLDS = [
  { state: 'ORIGIN', max: 0.05 },
  { state: 'SYSTEM_INIT', max: 0.15 },
  { state: 'WORKFLOW', max: 0.35 },
  { state: 'CODEBASE', max: 0.55 },
  { state: 'PRODUCTION', max: 0.70 },
  { state: 'EVIDENCE', max: 0.90 },
  { state: 'HUMAN', max: 1.0 },
];

function getCurrentState(progress: number): SceneState {
  for (const t of SCROLL_THRESHOLDS) {
    if (progress <= t.max) return t.state as SceneState;
  }
  return 'HUMAN';
}

export default function DataPulses({ edges, nodePositions }: { edges: TopologyEdge[], nodePositions: Record<string, THREE.Vector3> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { scrollYProgress } = useScroll();
  
  const count = edges.length * 3; // 3 pulses per edge
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const pulses = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const edgeIndex = i % edges.length;
      arr.push({
        edgeIndex,
        progress: Math.random(), // 0 to 1
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return arr;
  }, [count, edges]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const scrollP = scrollYProgress.get();
    const currentState = getCurrentState(scrollP);
    
    pulses.forEach((pulse, i) => {
      const edge = edges[pulse.edgeIndex];
      const isVisible = edge.visibleIn.includes(currentState);
      
      pulse.progress += delta * pulse.speed;
      if (pulse.progress > 1) pulse.progress = 0;
      
      let scale = 0;
      
      if (isVisible) {
        const sourcePos = nodePositions[edge.source];
        const targetPos = nodePositions[edge.target];
        
        if (sourcePos && targetPos) {
           dummy.position.lerpVectors(sourcePos, targetPos, pulse.progress);
           scale = Math.sin(pulse.progress * Math.PI); // fade in and out at ends
        }
      }
      
      dummy.scale.setScalar(scale * 0.05); // particle size
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#a3e635" transparent opacity={0.6} />
    </instancedMesh>
  );
}
