import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getCinematicProgress, smoothstep } from './sceneChoreography'

function makeCurve(points: Array<[number, number, number]>) {
  return new THREE.CatmullRomCurve3(
    points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,
    'catmullrom',
    0.45,
  )
}

export default function ScrollCameraRig() {
  const desktopCameraCurve = useMemo(() => makeCurve([
    [0.15, 0.05, 4.6],
    [0, 0.25, 6],
    [2.4, 0.45, 7.2],
    [-3.2, 1.15, 8.3],
    [-1.4, 0.55, 10.2],
    [0, -0.5, 17.8],
    [4, 0.15, 11],
    [0, 0, 8.6],
  ]), [])

  const mobileCameraCurve = useMemo(() => makeCurve([
    [0.05, 0.05, 5.8],
    [0, 0.2, 7],
    [0.7, 0.25, 8.4],
    [-0.8, 0.7, 10.2],
    [-0.4, 0.3, 12.2],
    [0, -0.25, 20],
    [1, 0, 13.4],
    [0, 0, 10.2],
  ]), [])

  const desktopLookCurve = useMemo(() => makeCurve([
    [0, 0, 0],
    [-0.4, 0.05, 0],
    [-1.6, 0.05, 0],
    [0, 0.2, -0.5],
    [0, 0, 0],
    [0, -0.15, 0],
    [1.8, 0.1, 0],
    [0, 0, 0],
  ]), [])

  const mobileLookCurve = useMemo(() => makeCurve([
    [0, 0, 0],
    [-0.2, 0.05, 0],
    [-0.45, 0.05, 0],
    [0, 0.1, -0.3],
    [0, 0, 0],
    [0, -0.05, 0],
    [0.5, 0.05, 0],
    [0, 0, 0],
  ]), [])

  const targetPosition = useRef(new THREE.Vector3())
  const targetLook = useRef(new THREE.Vector3())
  const smoothedLook = useRef(new THREE.Vector3())
  const finalPosition = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const progress = getCinematicProgress()
    const compact = state.size.width < 768
    const cameraCurve = compact ? mobileCameraCurve : desktopCameraCurve
    const lookCurve = compact ? mobileLookCurve : desktopLookCurve

    const directedProgress = progress < 0.58
      ? smoothstep(progress / 0.58) * 0.58
      : 0.58 + smoothstep((progress - 0.58) / 0.42) * 0.42

    cameraCurve.getPointAt(directedProgress, targetPosition.current)
    lookCurve.getPointAt(directedProgress, targetLook.current)

    const productionReveal = smoothstep((progress - 0.56) / 0.12)
    const parallaxStrength = compact ? 0 : THREE.MathUtils.lerp(0.22, 0.08, productionReveal)

    finalPosition.current.set(
      targetPosition.current.x + state.pointer.x * parallaxStrength,
      targetPosition.current.y + state.pointer.y * parallaxStrength,
      targetPosition.current.z,
    )

    const cameraDamping = 1 - Math.exp(-delta * 3.8)
    const lookDamping = 1 - Math.exp(-delta * 4.6)
    state.camera.position.lerp(finalPosition.current, cameraDamping)
    smoothedLook.current.lerp(targetLook.current, lookDamping)
    state.camera.lookAt(smoothedLook.current)
  })

  return null
}
