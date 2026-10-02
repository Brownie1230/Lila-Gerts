---
name: awesome-claude-design
description: Reference library of production DESIGN.md files grouped by aesthetic family (editorial, terminal, warm, data-dense, cinematic, playful, glass, brutalist, indie), brand-remix recipes, and prompt packs for art-directing a UI. Use when choosing or defining a visual direction for a site or app, when the user names a brand or vibe to emulate ("make it feel like Linear / Vercel / Stripe / Warp"), when writing or auditing a DESIGN.md or design token set, or when a build needs an opinionated aesthetic instead of default framework styling.
---

# Awesome Claude Design — aesthetic reference library

The upstream repository (`rohitg00/awesome-claude-design`) ships no `SKILL.md`; it is a curated
corpus. This file is a locally written wrapper so the corpus is discoverable as a skill. All
content under `references/` is upstream, unmodified (image assets omitted).

## When to use

- Picking a visual direction before writing any UI code.
- The user names a brand or a vibe to borrow from.
- Authoring, extending, or reviewing a `DESIGN.md` / token set.
- A design feels like untouched Tailwind/shadcn defaults and needs art direction.

## How to use

1. **Pick a family.** `references/design-md/<family>/` holds a worked `DESIGN.md` per brand:
   `editorial`, `terminal`, `warm`, `data-dense`, `cinematic`, `playful`, `glass`, `brutalist`,
   `indie`, plus `remix/` for two-brand crossovers.
2. **Read one file end to end** before writing code. Each one fixes palette, type scale, spacing,
   motion, and the rules that make the look hold together — copy the *decisions*, not the hex codes.
3. **Remix deliberately.** `references/design-md/remix/` shows how two directions combine
   (structure from one, palette and voice from the other) without turning to mush.
4. **Use the prompt packs** in `references/prompts/` for art-direction moves: breaking the default
   AI aesthetic, running a designer debate, auditing a live site, deriving a DESIGN.md from a brand.
5. **Use the recipes** in `references/recipes/` for end-to-end workflows: repo → design system,
   wireframe → hi-fi, Figma → DESIGN.md, landing page in 20 minutes, token budget control.

## Rules

- Never paste a brand's `DESIGN.md` into a client project as that brand's identity — these are
  study references. Derive a direction, then name it as the project's own.
- One family per project. Mixing more than two is how a UI loses its point of view.
- Resolve conflicts with the project's own `DESIGN.md` or design tokens in favour of the project.
