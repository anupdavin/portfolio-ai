import * as THREE from 'three'

export type SceneState = 'ORIGIN' | 'SYSTEM_INIT' | 'WORKFLOW' | 'CODEBASE' | 'PRODUCTION' | 'EVIDENCE' | 'HUMAN'

export const SCENE_STOPS: Array<{ state: SceneState; at: number }> = [
  { state: 'ORIGIN', at: 0 },
  { state: 'SYSTEM_INIT', at: 0.09 },
  { state: 'WORKFLOW', at: 0.22 },
  { state: 'CODEBASE', at: 0.43 },
  { state: 'PRODUCTION', at: 0.62 },
  { state: 'EVIDENCE', at: 0.78 },
  { state: 'HUMAN', at: 1 },
]

export interface SceneBlend {
  from: SceneState
  to: SceneState
  mix: number
  progress: number
}

export function smoothstep(value: number) {
  const t = THREE.MathUtils.clamp(value, 0, 1)
  return t * t * (3 - 2 * t)
}

export function getCinematicProgress() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0
  const human = document.getElementById('human')
  const end = human?.offsetTop ?? Math.max(document.documentElement.scrollHeight * 0.72, 1)
  return THREE.MathUtils.clamp(window.scrollY / Math.max(end, 1), 0, 1)
}

export function getSceneBlend(progress: number): SceneBlend {
  const p = THREE.MathUtils.clamp(progress, 0, 1)
  for (let index = 0; index < SCENE_STOPS.length - 1; index += 1) {
    const current = SCENE_STOPS[index]
    const next = SCENE_STOPS[index + 1]
    if (p <= next.at) {
      const raw = (p - current.at) / Math.max(next.at - current.at, 0.0001)
      return { from: current.state, to: next.state, mix: smoothstep(raw), progress: p }
    }
  }
  return { from: 'HUMAN', to: 'HUMAN', mix: 1, progress: p }
}

export function statePresence(
  presence: Partial<Record<SceneState, number>>,
  blend: SceneBlend,
) {
  const from = presence[blend.from] ?? 0
  const to = presence[blend.to] ?? 0
  return THREE.MathUtils.lerp(from, to, blend.mix)
}
