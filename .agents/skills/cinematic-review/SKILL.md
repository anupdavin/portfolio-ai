# Skill: Cinematic Landing Review

Use this skill when reviewing or refining the portfolio landing experience.

## Inputs
- Current branch code.
- `docs/CINEMATIC_LANDING_ORCHESTRATION.md`.
- `docs/CINEMATIC_REVIEW_CHECKLIST.md`.
- `.cinematic-review/` screenshots when available.
- Supplied external visual references via URL Context.

## Workflow
1. Inspect the current branch and current screenshots before proposing changes.
2. Classify findings as blocker, high-value improvement, or optional polish.
3. Verify the first five cinematic states form one continuous visual story rather than independent sections.
4. Check the signature production scale reveal: the codebase must visibly become one module inside a larger system.
5. Check mobile separately; do not judge it as a scaled desktop version.
6. Check reduced motion as a designed fallback, not a blank background.
7. Make only changes tied to concrete findings.
8. Run lint/build/local verification and regenerate review frames.
9. Compare before/after frames and stop when blockers/high-value findings are resolved.

## Review questions
- Does the opening frame look intentionally composed without headline copy?
- Does identity appear after the topology starts forming?
- Are workflow stages discovered progressively?
- Does the same topology morph into codebase architecture without resetting?
- Is the production pull-back an unmistakable scale reveal?
- Are evidence callouts attached to actual system branches?
- Does the human section create a quiet visual reset?
- Could this exact page belong to 100 generic AI developers? If yes, identify why before changing anything.

## Prohibited shortcuts
- No generic orb or galaxy replacement.
- No large skill cloud.
- No card-grid solution for the cinematic sequence.
- No gratuitous glow, bloom, particles, or scroll-jacking.
- No invented metrics or experience.
- No changes to `main`.

## Completion output
Return:
- blockers fixed;
- high-value improvements fixed;
- files changed;
- exact validation command results;
- remaining visual risks, if any;
- a concise verdict: `READY FOR HUMAN VISUAL REVIEW` or `NOT READY`.
