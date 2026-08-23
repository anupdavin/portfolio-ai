import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getCinematicProgress, smoothstep } from './sceneChoreography'

export default function ScrollCameraRig() {
  const cameraCurve = useMemo(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.15, 0.05, 4.6),
      new THREE.Vector3(0.0, 0.25, 6.0),
      new THREE.Vector3(2.4, 0.45, 7.2),
      new THREE.Vector3(-3.2, 1.15, 8.3),
      new THREE.Vector3(-1.4, 0.55, 10.2),
      new THREE.Vector3(0.0, -0.5, 17.8),
      new THREE.Vector3(4.0, 0.15, 11.0),
      new THREE.Vector3(0.0, 0.0, 8.6),
    ], false, 'catmullrom', 0.45),
    [],
  )

  const lookCurve = useMemo(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.4, 0.05, 0),
      new THREE.Vector3(-1.6, 0.05, 0),
      new THREE.Vector3(0, 0.2, -0.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -0.15, 0),
      new THREE.Vector3(1.8, 0.1, 0),
      new THREE.Vector3(0, 0, 0),
    ], false, 'catmullrom', 0.45),
    [],
  )

  const targetPosition = useRef(new THREE.Vector3())
  const targetLook = useRef(new THREE.Vector3())
  const smoothedLook = useRef(new THREE.Vector3())
  const finalPosition = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const progress = getCinematicProgress()

    // Spend a little more scroll time on the close-up origin and accelerate into the scale reveal.
    const directedProgress = progress < 0.58
      ? smoothstep(progress / 0.58) * 0.58
      : 0.58 + smoothstep((progress - 0.58) / 0.42) * 0.42

    cameraCurve.getPointAt(directedProgress, targetPosition.current)
    lookCurve.getPointAt(directedProgress, targetLook.current)

    const productionReveal = smoothstep((progress - 0.56) / 0.12)
    const parallaxStrength = THREE.MathUtils.lerp(0.22, 0.08, productionReveal)

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
