# Cinematic Landing Orchestration Plan

## Goal
Turn `portfolio-ai` from a technically competent portfolio with a Three.js background into a directed, cinematic landing experience inspired by the pacing and visual ambition of the reference video:

- https://m.youtube.com/watch?v=QUI6Ug4cHnE
- https://www.linkedin.com/posts/nateherkelman_turn-claude-into-a-one-person-marketing-team-activity-7496543951882055680-cEP1

The experience must feel authored and memorable, while still communicating senior engineering credibility.

## Non-goals
- Do not build another generic glowing AI orb.
- Do not add more cards just to fill space.
- Do not make the Three.js layer decorative background only.
- Do not rewrite the portfolio content or invent achievements.
- Do not touch `main` until the feature branch is reviewed.

## Working branch
`feat/cinematic-landing-orchestration`

## Existing foundation to preserve
The repository already has React, TypeScript, Vite, React Three Fiber, Drei, postprocessing, Framer Motion, Playwright/Puppeteer, and a local verification command. Keep that foundation and refactor the scene architecture instead of restarting.

## Creative north star
The visitor should feel like they are entering a living engineering system, not reading a résumé with effects.

Narrative:

`SIGNAL -> IDENTITY -> INTELLIGENCE -> CODEBASE -> PRODUCTION -> EVIDENCE -> HUMAN`

The 3D experience is the primary storyteller. DOM copy confirms meaning after the visual event.

---

# 1. Visual storyboard

## Scene 0 — Signal
Duration: first viewport / first 5–8% scroll.

- Nearly black frame.
- One tiny luminous signal appears.
- A thin line grows from it.
- A second signal answers.
- No giant headline yet.
- Minimal text: `SYSTEM / ONLINE`.

Acceptance test: screenshot must still look intentional even with all hero text hidden.

## Scene 1 — Identity
Approx. 8–20% scroll.

- The initial signal branches into a small topology.
- The camera slowly pulls back and reveals structure.
- Name appears only after the topology forms.
- One sentence appears: `I design systems where software, data and intelligence work as one.`
- No pill-button-heavy hero.

Acceptance test: the 3D object must occupy meaningful foreground space and create depth; it must not feel like wallpaper behind text.

## Scene 2 — Intelligence / workflow
Approx. 20–38% scroll.

Reveal the engineering workflow progressively:

`UNDERSTAND -> PLAN -> CHALLENGE -> BUILD -> VERIFY -> OBSERVE -> LEARN`

- Never display all capabilities at once.
- Nodes are discovered in sequence.
- Data pulses travel between active stages.
- Inactive stages remain dormant and low contrast.
- Camera moves laterally through the flow rather than simply zooming.

Acceptance test: a muted screen recording without audio should make the workflow understandable.

## Scene 3 — Codebase morph
Approx. 38–55% scroll.

The workflow topology morphs without disappearing into a real system graph:

`UI -> SERVICES -> EVENTS -> DATA -> AI -> PLATFORM`

Example technologies can surface only when relevant:
- React
- Spring Boot / Java
- Kafka
- MDM
- PostgreSQL / Oracle / MSSQL
- AI retrieval/evaluation
- Kubernetes / AKS
- Observability

Key rule: preserve spatial continuity. The visitor should perceive that the engineering workflow became a codebase.

## Scene 4 — Production scale reveal
Approx. 55–72% scroll.

This is the signature moment.

- Visitor initially believes the visible architecture is complete.
- Camera then performs a smooth, dramatic pull-back.
- Existing architecture becomes one module inside a much larger production environment.
- Additional layers emerge from darkness:
  - CLIENT
  - SERVICES
  - EVENTS
  - DATA
  - AI
  - SECURITY
  - OBSERVABILITY
  - DELIVERY
- Text appears only after the reveal:
  `A demo is not a system.`
  `Production changes everything.`

Acceptance test: this must be the most memorable transition on the page. If it is merely another zoom-out, redesign it.

## Scene 5 — Evidence
Approx. 72–88% scroll.

Use the same architecture as an evidence map.

Illuminate one branch at a time and attach a concise DOM evidence statement:

- MDM modernization: `JDK 8 -> JDK 21 / containerized platform`
- Event-driven reconciliation: `multi-hour -> <20 min`
- Grounded assistant: `retrieval -> evidence -> generation -> evaluation`

Do not replace this with a grid of cards while the scene is active.

## Scene 6 — Human judgment
Approx. 88–100% scroll.

- Topology powers down gradually.
- Connections disappear in layers.
- One subtle node remains.
- Motion becomes quiet.
- Copy:
  `Systems still need judgment.`
  `Architecture. Trade-offs. Ownership. People.`
- Then reveal contact / résumé / GitHub actions.

Acceptance test: emotional contrast with the previous technical scene must be obvious.

---

# 2. Scene architecture

Replace percentage-based scattered conditions with a declarative scene system.

Create a single orchestration source of truth, e.g.:

```ts
export type SceneId =
  | 'SIGNAL'
  | 'IDENTITY'
  | 'WORKFLOW'
  | 'CODEBASE'
  | 'PRODUCTION'
  | 'EVIDENCE'
  | 'HUMAN'
```

Each scene owns:
- scroll range
- camera position
- camera target
- camera path / spline segment
- graph layout
- active nodes
- line opacity
- pulse routes
- lighting state
- postprocessing intensity
- DOM copy state
- mobile overrides

Do not put scene logic separately inside every component.

Suggested files:
- `three/orchestration/sceneConfig.ts`
- `three/orchestration/useSceneProgress.ts`
- `three/orchestration/SceneDirector.tsx`
- `three/topology/SystemTopology.tsx`
- `three/topology/DataPulseRoutes.tsx`
- `three/camera/CinematicCameraRig.tsx`
- `three/fallback/ReducedMotionExperience.tsx`

Current components may be refactored or replaced where appropriate.

---

# 3. Camera direction

Current hard-coded camera coordinates are not enough.

Use a directed camera path:
- CatmullRomCurve3 or an equivalent spline.
- Damped interpolation.
- Separate camera position from look target.
- No continuous idle orbit.
- Pointer parallax must be subtle and disabled/reduced on touch devices.

Camera beats:
1. macro-close signal
2. slow pull-back to identity
3. lateral move through workflow
4. controlled travel through codebase graph
5. signature production scale reveal
6. return to calm human-scale composition

No aggressive scroll-jacking.

---

# 4. Signature visual language

Replace the generic icosahedron/orb visual language.

Use:
- thin architectural paths
- luminous junctions
- sparse translucent structural planes
- active/inactive node hierarchy
- directional data pulses
- occasional technical labels
- depth haze only when helpful

Avoid:
- planets
- galaxy/starfield aesthetic
- AI brain
- glowing sphere as central hero
- excessive bloom
- cyberpunk HUD clutter
- random floating particles

The scene should resemble a spatial distributed-system diagram brought to life.

---

# 5. DOM / typography direction

The first viewport must contain less copy than the current hero.

Rules:
- One dominant sentence maximum in Scene 1.
- Secondary facts reveal later.
- Use asymmetrical composition.
- Avoid repeated centered headings.
- Avoid rounded pill CTAs as default visual language.
- No generic SaaS glass cards in the opening sequence.

The 3D event happens first; text confirms it second.

---

# 6. Interaction model

Meaningful interactions only:
- pulses illuminate actual paths
- pointer proximity can surface a nearby label
- active case-study branch brightens during evidence scene
- selected system paths dim/restore as scroll state changes

Do not add hover-scale effects or random rotations just because they are easy.

---

# 7. Mobile strategy

Mobile is a separate composition, not desktop shrunk down.

- Keep native vertical scrolling.
- Reduce topology density 30–50%.
- Reduce camera travel/depth.
- Hide secondary labels.
- Cap DPR aggressively.
- Reduce/disable bloom.
- Avoid tiny text inside WebGL.
- Keep all essential narrative copy in DOM.

---

# 8. Performance constraints

- Reuse geometry/materials.
- Avoid `new THREE.Vector3()` and similar allocations in `useFrame` loops.
- Prefer instancing for repeated nodes where useful.
- Use path-based pulses instead of ambient particle clouds.
- Pause/reduce work when document is hidden.
- Keep DPR capped around 1.5 desktop and lower on constrained mobile.
- Avoid expensive full-screen postprocessing unless the visual difference is material.
- Do not preload everything blindly if it delays first meaningful paint.

---

# 9. Accessibility / fallback

- Respect `prefers-reduced-motion`.
- Reduced-motion view must be designed, not blank.
- Essential information remains in semantic DOM.
- Keyboard navigation must work.
- Provide visible focus states.
- If WebGL fails, display a polished static topology composition plus the same narrative copy.

---

# 10. Implementation order

## Gate A — storyboard only
Before major code edits, write `docs/CINEMATIC_STORYBOARD.md` containing:
- 7 scene descriptions
- camera path
- signature reveal
- layout sketches in ASCII/Markdown
- mobile treatment
- components that will be removed/refactored

Do not proceed until the storyboard is internally coherent.

## Gate B — structural refactor
Implement the declarative scene director, camera rig, and topology state model without polishing every material.

## Gate C — signature transition
Implement and validate the PRODUCTION scale reveal before building minor details. If this moment is weak, do not continue polishing.

## Gate D — evidence integration
Map existing evidence content into the scene without inventing metrics.

## Gate E — polish
Typography, lighting, easing, responsive behavior, micro-interactions.

## Gate F — quality verification
Run:
- `npm run lint`
- `npm run build`
- `npm run verify:local`

Then use Playwright/Puppeteer already present in the repo to capture at minimum:
- desktop hero
- workflow
- production reveal
- human section
- mobile hero

Review those captures as a visual QA gate.

---

# 11. Hard acceptance criteria

The work is NOT complete unless all are true:

1. Opening screen still looks intentional with hero copy temporarily hidden.
2. Three.js is foreground storytelling, not decorative wallpaper.
3. No generic orb/icosahedron is the primary motif.
4. At least one transition creates a real scale/reveal moment.
5. Workflow is discovered progressively, not shown as a 12-label cloud.
6. Codebase and production views preserve visual continuity from prior scenes.
7. Evidence appears on the architecture itself, not only in generic cards.
8. Mobile feels intentionally composed.
9. Reduced-motion fallback is designed.
10. Lint/build/verification pass.
11. The experience could not plausibly belong unchanged to 100 other AI developers.

---

# 12. Orchestration protocol for ChatGPT

When the user says:

`execute the cinematic landing plan`

ChatGPT should:
1. Read this plan and current branch state.
2. Inspect the relevant current scene/section files.
3. Create/update `docs/CINEMATIC_STORYBOARD.md` first.
4. Implement the scene director and camera/topology refactor.
5. Build the signature production reveal before minor polish.
6. Integrate evidence content.
7. Run available verification paths.
8. Self-review code and generated visual captures where execution tools allow.
9. Commit changes only to `feat/cinematic-landing-orchestration`.
10. Report what is verified vs what could not be verified; do not claim a live preview unless one actually exists.

Do not ask the user to make minor design decisions during execution. Use this plan as the decision framework and make senior-level defaults.
