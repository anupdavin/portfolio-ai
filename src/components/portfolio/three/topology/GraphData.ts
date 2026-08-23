import * as THREE from 'three';

export type SceneState = 'ORIGIN' | 'SYSTEM_INIT' | 'WORKFLOW' | 'CODEBASE' | 'PRODUCTION' | 'EVIDENCE' | 'HUMAN';

export interface TopologyNode {
  id: string;
  label: string;
  group: string;
  positions: Record<SceneState, THREE.Vector3>;
  visibleIn: SceneState[];
}

export interface TopologyEdge {
  source: string;
  target: string;
  visibleIn: SceneState[];
}

// Generate nodes and edges
export function generateTopology() {
  const nodes: TopologyNode[] = [];
  const edges: TopologyEdge[] = [];

  const addNode = (id: string, label: string, group: string, positions: Partial<Record<SceneState, THREE.Vector3>>, visibleIn: SceneState[]) => {
    // Fill missing positions with ORIGIN (0,0,0) or closest state to avoid jumping
    const fullPositions: Record<SceneState, THREE.Vector3> = {
      ORIGIN: new THREE.Vector3(0, 0, 0),
      SYSTEM_INIT: positions.SYSTEM_INIT || new THREE.Vector3(0, 0, 0),
      WORKFLOW: positions.WORKFLOW || new THREE.Vector3(0, 0, 0),
      CODEBASE: positions.CODEBASE || new THREE.Vector3(0, 0, 0),
      PRODUCTION: positions.PRODUCTION || new THREE.Vector3(0, 0, 0),
      EVIDENCE: positions.EVIDENCE || new THREE.Vector3(0, 0, 0),
      HUMAN: positions.HUMAN || new THREE.Vector3(0, 0, 0),
    };
    
    // Smooth out missing positions by carrying over from previous states if not explicitly defined
    const stateOrder: SceneState[] = ['ORIGIN', 'SYSTEM_INIT', 'WORKFLOW', 'CODEBASE', 'PRODUCTION', 'EVIDENCE', 'HUMAN'];
    let lastValidPos = new THREE.Vector3(0,0,0);
    for (const state of stateOrder) {
        if (positions[state]) {
            lastValidPos = positions[state]!;
            fullPositions[state] = lastValidPos;
        } else {
            fullPositions[state] = lastValidPos.clone();
        }
    }

    nodes.push({ id, label, group, positions: fullPositions, visibleIn });
  };

  const addEdge = (source: string, target: string, visibleIn: SceneState[]) => {
    edges.push({ source, target, visibleIn });
  };

  // 1. Core/Origin
  addNode('core', 'SYSTEM', 'core', {
    ORIGIN: new THREE.Vector3(0, 0, 0),
    SYSTEM_INIT: new THREE.Vector3(0, 0, 0),
    WORKFLOW: new THREE.Vector3(-6, 0, -2), // Move out of way
    CODEBASE: new THREE.Vector3(0, 4, -5),
    PRODUCTION: new THREE.Vector3(0, 8, -10),
    HUMAN: new THREE.Vector3(0, 0, 0),
  }, ['SYSTEM_INIT', 'WORKFLOW', 'CODEBASE', 'PRODUCTION', 'EVIDENCE', 'HUMAN']);

  // 2. Workflow Nodes
  const workflowSteps = ['UNDERSTAND', 'PLAN', 'CHALLENGE', 'IMPLEMENT', 'VERIFY', 'OBSERVE', 'LEARN'];
  workflowSteps.forEach((step, i) => {
    const x = -3 + i * 1.5;
    const y = Math.sin(i * 0.8) * 0.5;
    addNode(`wf_${step}`, step, 'workflow', {
      SYSTEM_INIT: new THREE.Vector3((Math.random()-0.5)*2, (Math.random()-0.5)*2, (Math.random()-0.5)*2),
      WORKFLOW: new THREE.Vector3(x, y, 0),
      CODEBASE: new THREE.Vector3(x, 2, -5), // Move back and up
    }, ['SYSTEM_INIT', 'WORKFLOW']);
    
    if (i > 0) {
      addEdge(`wf_${workflowSteps[i-1]}`, `wf_${step}`, ['WORKFLOW']);
    } else {
      addEdge('core', `wf_${step}`, ['WORKFLOW', 'SYSTEM_INIT']);
    }
  });

  // 3. Codebase Nodes
  const codebaseLayers = [
    { id: 'cb_ui', label: 'React', y: 3 },
    { id: 'cb_api', label: 'Spring Boot', y: 1.5 },
    { id: 'cb_events', label: 'Kafka', y: 0 },
    { id: 'cb_data', label: 'Postgres', y: -1.5 },
    { id: 'cb_ai', label: 'AI Retrieval', y: -3 },
  ];
  
  codebaseLayers.forEach((layer, i) => {
    addNode(layer.id, layer.label, 'codebase', {
      WORKFLOW: new THREE.Vector3(0, -2, 2), // hidden below
      CODEBASE: new THREE.Vector3(0, layer.y, 0),
      PRODUCTION: new THREE.Vector3(0, layer.y, 0), // stays same
      EVIDENCE: new THREE.Vector3(0, layer.y, 0),
    }, ['CODEBASE', 'PRODUCTION', 'EVIDENCE']);
    
    if (i > 0) {
      addEdge(codebaseLayers[i-1].id, layer.id, ['CODEBASE', 'PRODUCTION', 'EVIDENCE']);
    }
  });

  // 4. Production Nodes (The scale reveal)
  const prodNodes = [
    { id: 'pd_client', label: 'CLIENT', pos: new THREE.Vector3(-4, 3, 2) },
    { id: 'pd_auth', label: 'SECURITY', pos: new THREE.Vector3(4, 2, 2) },
    { id: 'pd_mdm', label: 'MDM', pos: new THREE.Vector3(4, -1, 1) },
    { id: 'pd_obs', label: 'OBSERVABILITY', pos: new THREE.Vector3(-5, 0, 0) },
    { id: 'pd_k8s', label: 'KUBERNETES', pos: new THREE.Vector3(0, -5, -2) },
  ];

  prodNodes.forEach((node) => {
    addNode(node.id, node.label, 'production', {
      CODEBASE: new THREE.Vector3(0, 0, 0), // originate from center
      PRODUCTION: node.pos,
      EVIDENCE: node.pos,
    }, ['PRODUCTION', 'EVIDENCE']);
    
    // Connect to relevant codebase layers
    if (node.id === 'pd_client') addEdge('pd_client', 'cb_ui', ['PRODUCTION', 'EVIDENCE']);
    if (node.id === 'pd_auth') addEdge('pd_auth', 'cb_api', ['PRODUCTION', 'EVIDENCE']);
    if (node.id === 'pd_mdm') addEdge('pd_mdm', 'cb_data', ['PRODUCTION', 'EVIDENCE']);
    if (node.id === 'pd_obs') addEdge('pd_obs', 'cb_api', ['PRODUCTION', 'EVIDENCE']);
    if (node.id === 'pd_k8s') addEdge('cb_data', 'pd_k8s', ['PRODUCTION', 'EVIDENCE']);
  });

  return { nodes, edges };
}
