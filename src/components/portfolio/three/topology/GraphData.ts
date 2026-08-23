import * as THREE from 'three'
import type { SceneState } from '../sceneChoreography'

export interface TopologyNode {
  id: string
  label: string
  group: 'core' | 'workflow' | 'codebase' | 'production' | 'evidence'
  positions: Record<SceneState, THREE.Vector3>
  presence: Partial<Record<SceneState, number>>
  revealAt?: number
}

export interface TopologyEdge {
  source: string
  target: string
  presence: Partial<Record<SceneState, number>>
  revealAt?: number
}

const stateOrder: SceneState[] = ['ORIGIN', 'SYSTEM_INIT', 'WORKFLOW', 'CODEBASE', 'PRODUCTION', 'EVIDENCE', 'HUMAN']
const v = (x: number, y: number, z = 0) => new THREE.Vector3(x, y, z)

function positions(partial: Partial<Record<SceneState, THREE.Vector3>>) {
  const result = {} as Record<SceneState, THREE.Vector3>
  let last = v(0, 0, 0)
  for (const state of stateOrder) {
    if (partial[state]) last = partial[state]!.clone()
    result[state] = last.clone()
  }
  return result
}

export function generateTopology() {
  const nodes: TopologyNode[] = []
  const edges: TopologyEdge[] = []

  const addNode = (
    id: string,
    label: string,
    group: TopologyNode['group'],
    nodePositions: Partial<Record<SceneState, THREE.Vector3>>,
    presence: Partial<Record<SceneState, number>>,
    revealAt?: number,
  ) => nodes.push({ id, label, group, positions: positions(nodePositions), presence, revealAt })

  const addEdge = (
    source: string,
    target: string,
    presence: Partial<Record<SceneState, number>>,
    revealAt?: number,
  ) => edges.push({ source, target, presence, revealAt })

  addNode(
    'core',
    'SYSTEM',
    'core',
    {
      ORIGIN: v(0, 0, 0),
      SYSTEM_INIT: v(-0.7, 0.15, 0),
      WORKFLOW: v(-5.4, 0, -0.3),
      CODEBASE: v(0, 4.5, -1.8),
      PRODUCTION: v(0, 2.2, 0),
      EVIDENCE: v(0, 2.2, 0),
      HUMAN: v(0, 0, 0),
    },
    { ORIGIN: 0.85, SYSTEM_INIT: 1, WORKFLOW: 0.7, CODEBASE: 0.4, PRODUCTION: 0.28, EVIDENCE: 0.18, HUMAN: 0.9 },
  )

  const workflow = [
    ['UNDERSTAND', -4.2, 0.6],
    ['PLAN', -2.8, -0.15],
    ['CHALLENGE', -1.35, 0.55],
    ['BUILD', 0.1, -0.45],
    ['VERIFY', 1.55, 0.35],
    ['OBSERVE', 3, -0.2],
    ['LEARN', 4.45, 0.45],
  ] as const

  workflow.forEach(([label, x, y], index) => {
    const id = `wf_${label.toLowerCase()}`
    addNode(
      id,
      label,
      'workflow',
      {
        ORIGIN: v(-0.2 + index * 0.04, 0, 0),
        SYSTEM_INIT: v(-0.2 + index * 0.22, (index % 2 === 0 ? 1 : -1) * (0.18 + index * 0.035), -index * 0.03),
        WORKFLOW: v(x, y, 0),
        CODEBASE: v(x * 0.28, y * 0.25 - 2.8, -2.5),
      },
      { SYSTEM_INIT: index < 2 ? 0.75 : 0.25, WORKFLOW: 1, CODEBASE: 0 },
      0.2 + index * 0.023,
    )
    if (index === 0) addEdge('core', id, { SYSTEM_INIT: 0.6, WORKFLOW: 0.8 }, 0.19)
    if (index > 0) addEdge(`wf_${workflow[index - 1][0].toLowerCase()}`, id, { WORKFLOW: 0.9 }, 0.2 + index * 0.023)
  })

  const codebase = [
    ['cb_ui', 'REACT / UI', 3.2, -0.45],
    ['cb_services', 'JAVA / SERVICES', 2.0, 0.45],
    ['cb_events', 'KAFKA / EVENTS', 0.75, -0.35],
    ['cb_data', 'DATA / MDM', -0.55, 0.3],
    ['cb_ai', 'AI / RETRIEVAL', -1.85, -0.25],
    ['cb_platform', 'KUBERNETES / PLATFORM', -3.2, 0.15],
  ] as const

  codebase.forEach(([id, label, y, x], index) => {
    addNode(
      id,
      label,
      'codebase',
      {
        WORKFLOW: v(0, -2.9, -2),
        CODEBASE: v(x, y, 0),
        PRODUCTION: v(x * 0.55, y * 0.5, 0),
        EVIDENCE: v(x * 0.55, y * 0.5, 0),
        HUMAN: v(0, 0, -4),
      },
      { CODEBASE: 1, PRODUCTION: 0.9, EVIDENCE: 0.72, HUMAN: 0 },
      0.41 + index * 0.014,
    )
    if (index > 0) addEdge(codebase[index - 1][0], id, { CODEBASE: 0.8, PRODUCTION: 0.6, EVIDENCE: 0.5 }, 0.42 + index * 0.012)
  })

  const production = [
    ['pd_client', 'CLIENT', -7.2, 3.4, 1.1, 'cb_ui'],
    ['pd_security', 'SECURITY', 7.3, 2.7, 0.3, 'cb_services'],
    ['pd_mdm', 'MASTER DATA', 6.3, -0.1, 1.4, 'cb_data'],
    ['pd_observe', 'OBSERVABILITY', -7.5, -1.9, -0.4, 'cb_services'],
    ['pd_delivery', 'DELIVERY / CI', 7.1, -3.2, -1.2, 'cb_platform'],
    ['pd_runtime', 'RUNTIME', -1.8, -5.4, -3.2, 'cb_platform'],
    ['pd_guardrails', 'AI GUARDRAILS', -5.4, 1.0, 1.9, 'cb_ai'],
  ] as const

  production.forEach(([id, label, x, y, z, target], index) => {
    addNode(
      id,
      label,
      'production',
      {
        CODEBASE: v(0, 0, -1.2),
        PRODUCTION: v(x, y, z),
        EVIDENCE: v(x, y, z),
        HUMAN: v(0, 0, -5),
      },
      { PRODUCTION: 1, EVIDENCE: 0.72, HUMAN: 0 },
      0.59 + index * 0.015,
    )
    addEdge(id, target, { PRODUCTION: 0.62, EVIDENCE: 0.42 }, 0.59 + index * 0.015)
  })

  const evidence = [
    ['ev_mdm', 'JDK 8  →  JDK 21', 6.15, -0.9, 1.8, 'pd_mdm'],
    ['ev_kafka', 'MULTI-HOUR  →  <20 MIN', -6.6, 0.2, 0.7, 'cb_events'],
    ['ev_ai', 'EVIDENCE  →  ANSWER  →  EVALUATE', -4.9, 2.15, 2.3, 'pd_guardrails'],
  ] as const

  evidence.forEach(([id, label, x, y, z, target], index) => {
    addNode(
      id,
      label,
      'evidence',
      {
        PRODUCTION: v(0, 0, -4),
        EVIDENCE: v(x, y, z),
        HUMAN: v(0, 0, -5),
      },
      { EVIDENCE: 1, HUMAN: 0 },
      0.78 + index * 0.035,
    )
    addEdge(target, id, { EVIDENCE: 0.9 }, 0.78 + index * 0.035)
  })

  return { nodes, edges }
}
