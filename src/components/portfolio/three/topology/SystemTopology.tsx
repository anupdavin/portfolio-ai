import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Line } from '@react-three/drei';
import { useScroll, MotionValue } from 'framer-motion';
import { generateTopology, SceneState, TopologyEdge } from './GraphData';
import DataPulses from './DataPulses';

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

export default function SystemTopology() {
  const { scrollYProgress } = useScroll();
  const { nodes, edges } = useMemo(() => generateTopology(), []);
  
  const groupRef = useRef<THREE.Group>(null);
  
  // Create refs to store current positions
  const nodeCurrentPositions = useMemo(() => {
    return nodes.reduce((acc, node) => {
      acc[node.id] = new THREE.Vector3(0,0,0);
      return acc;
    }, {} as Record<string, THREE.Vector3>);
  }, [nodes]);
  
  const nodeGroupRefs = useRef<Record<string, THREE.Group | null>>({});

  useFrame((state, delta) => {
    const progress = scrollYProgress.get();
    const currentState = getCurrentState(progress);
    
    nodes.forEach(node => {
      const targetPos = node.positions[currentState] || node.positions['ORIGIN'];
      const currentPos = nodeCurrentPositions[node.id];
      
      // Lerp position
      currentPos.lerp(targetPos, delta * 3.0);
      
      // Update actual mesh
      if (nodeGroupRefs.current[node.id]) {
        nodeGroupRefs.current[node.id]!.position.copy(currentPos);
        
        // Visibility scaling
        const isVisible = node.visibleIn.includes(currentState);
        const targetScale = isVisible ? 1 : 0;
        nodeGroupRefs.current[node.id]!.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5.0);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map(node => (
        <group 
          key={node.id} 
          ref={(el) => (nodeGroupRefs.current[node.id] = el)}
        >
          {node.group === 'core' ? (
             <mesh>
               <sphereGeometry args={[0.2, 16, 16]} />
               <meshBasicMaterial color="#ffffff" />
             </mesh>
          ) : (
             <mesh>
               <sphereGeometry args={[0.08, 16, 16]} />
               <meshBasicMaterial color={node.group === 'workflow' ? '#a3e635' : '#3b82f6'} />
             </mesh>
          )}
          
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.12}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.8}
          >
            {node.label}
          </Text>
        </group>
      ))}
      
      {/* Edges */}
      {edges.map((edge, i) => (
        <ConnectionLine 
           key={`edge-${i}`} 
           edge={edge} 
           nodeCurrentPositions={nodeCurrentPositions}
           progress={scrollYProgress}
        />
      ))}
      
      <DataPulses edges={edges} nodePositions={nodeCurrentPositions} />
    </group>
  );
}

function ConnectionLine({ edge, nodeCurrentPositions, progress }: { edge: TopologyEdge, nodeCurrentPositions: Record<string, THREE.Vector3>, progress: MotionValue<number> }) {
  const lineRef = useRef<THREE.Line<THREE.BufferGeometry, THREE.Material>>(null);
  
  useFrame((state, delta) => {
    const p = progress.get();
    const currentState = getCurrentState(p);
    
    if (lineRef.current) {
        const sourcePos = nodeCurrentPositions[edge.source];
        const targetPos = nodeCurrentPositions[edge.target];
        if (sourcePos && targetPos) {
             lineRef.current.geometry.setPositions([sourcePos.x, sourcePos.y, sourcePos.z, targetPos.x, targetPos.y, targetPos.z]);
        }
        
        const isVisible = edge.visibleIn.includes(currentState);
        const targetOpacity = isVisible ? 0.3 : 0;
        lineRef.current.material.opacity = THREE.MathUtils.lerp(lineRef.current.material.opacity, targetOpacity, delta * 5.0);
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0)]}
      color="#4ade80"
      opacity={0}
      transparent
      lineWidth={1}
    />
  );
}
