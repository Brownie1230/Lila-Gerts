# Design & frontend skill library

168 Claude Code skills vendored from 16 upstream repositories into [`.claude/skills/`](.claude/skills/), so every design or frontend task in this repo has the same reference material available.

## Sources

| Upstream repo | Pinned commit | Skills |
|---|---|---|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | `52c76441` | 1 |
| [claudekit/frontend-design-pro-demo](https://github.com/claudekit/frontend-design-pro-demo) | `756b8d99` | 1 |
| [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) | `2f9be320` | 1 |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | `508d7e89` | 1 |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | `ce26fc25` | 13 |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `09170eec` | 7 |
| [LovroPodobnik/refactoring-ui-skill](https://github.com/LovroPodobnik/refactoring-ui-skill) | `a9e776a7` | 1 |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `063bee94` | 9 |
| [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | `75d81f74` | 1 |
| [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) | `6e60b5e2` | 1 |
| [nutlope/hallmark](https://github.com/nutlope/hallmark) | `13ac0ec7` | 1 |
| [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills) | `9a6930cf` | 111 |
| [bencium/bencium-marketplace](https://github.com/bencium/bencium-marketplace) | `8b152ec0` | 16 |
| [wondelai/skills](https://github.com/wondelai/skills) | `c1729964` | 2 |
| [rohitg00/awesome-claude-design](https://github.com/rohitg00/awesome-claude-design) | `7f60ee56` | 1 |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | `18f96ea0` | 1 |

Nothing is a submodule: each skill is a plain copy of its upstream directory (`.git/` and `node_modules/` omitted), so it works offline and shows up in diffs.

### Local deviations from upstream

Everything is upstream byte-for-byte except these three, which are needed for Claude Code to load them:

- **15 directories renamed** to match the `name:` in their own frontmatter (e.g. `taste-skill/` -> `design-taste-frontend/`, `typography/` -> `ui-typography/`). File contents untouched.
- **`relationship-design`** — upstream frontmatter `name:` is the prose string `Agentic UX Design - Relationship-Centric Interfaces`, which is not a loadable skill name; normalised to `relationship-design`. Body untouched.
- **`awesome-claude-design`** — upstream ships no `SKILL.md` (it is a curated corpus, not a skill). A thin `SKILL.md` router was written locally; the corpus sits unmodified under `references/` with the repo's 1.1 MB of banner/preview images omitted.

## Index

### anthropics/claude-code — 1 skill

| Skill | What it is for |
|---|---|
| [`frontend-design`](.claude/skills/frontend-design/SKILL.md) | Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults. |

### claudekit/frontend-design-pro-demo — 1 skill

| Skill | What it is for |
|---|---|
| [`frontend-design-pro`](.claude/skills/frontend-design-pro/SKILL.md) | Creates jaw-dropping, production-ready frontend interfaces AND delivers perfectly matched real photos (Unsplash/Pexels direct links) OR flawless custom image-generation prompts for hero images, backgrounds, and illustrations. Zero AI… |

### Dammyjay93/interface-design — 1 skill

| Skill | What it is for |
|---|---|
| [`interface-design`](.claude/skills/interface-design/SKILL.md) | Craft-first interface design for dashboards, admin panels, SaaS apps, tools, settings pages, data interfaces, and interactive products. Use when designing, building, reviewing, auditing, or refining product UI where visual craft, layout… |

### pbakaus/impeccable — 1 skill

| Skill | What it is for |
|---|---|
| [`impeccable`](.claude/skills/impeccable/SKILL.md) | Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards,… |

### Leonxlnx/taste-skill — 13 skills

| Skill | What it is for |
|---|---|
| [`brandkit`](.claude/skills/brandkit/SKILL.md) | Premium brand-kit image generation skill for creating high-end brand-guidelines boards, logo systems, identity decks, and visual-world presentations. Trained for minimalist, cinematic, editorial, dark-tech, luxury, cultural, security,… |
| [`design-taste-frontend`](.claude/skills/design-taste-frontend/SKILL.md) | Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated. Real design systems when applicable, audit-first on… |
| [`design-taste-frontend-v1`](.claude/skills/design-taste-frontend-v1/SKILL.md) | The original v1 taste-skill, preserved for projects depending on its exact behavior. The current default is `design-taste-frontend` (v2 experimental), which is a substantial rewrite. Use this v1 install name only if you need exact… |
| [`full-output-enforcement`](.claude/skills/full-output-enforcement/SKILL.md) | Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns, and handles token-limit splits cleanly. Apply to any task requiring exhaustive, unabridged output. |
| [`gpt-taste`](.claude/skills/gpt-taste/SKILL.md) | Elite UX/UI & Advanced GSAP Motion Engineer. Enforces Python-driven true randomization for layout variance, strict AIDA page structure, wide editorial typography (bans 6-line wraps), gapless bento grids, strict GSAP ScrollTriggers… |
| [`high-end-visual-design`](.claude/skills/high-end-visual-design/SKILL.md) | Teaches the AI to design like a high-end agency. Defines the exact fonts, spacing, shadows, card structures, and animations that make a website feel expensive. Blocks all the common defaults that make AI designs look cheap or generic. |
| [`image-to-code`](.claude/skills/image-to-code/SKILL.md) | Elite website image-to-code skill for Codex. For visually important web tasks, it must first generate the design image(s) itself, deeply analyze them, then implement the website to match them as closely as possible. In Codex, it must… |
| [`imagegen-frontend-mobile`](.claude/skills/imagegen-frontend-mobile/SKILL.md) | Elite mobile app image-generation skill for creating premium, app-native screen concepts and flows. Designed for iOS, Android, and cross-platform mobile products. Prioritizes clean hierarchy, comfortably readable text, strong multi-screen… |
| [`imagegen-frontend-web`](.claude/skills/imagegen-frontend-web/SKILL.md) | Elite frontend image-direction skill for generating premium, conversion-aware website design references. CRITICAL OUTPUT RULE — generate ONE separate horizontal image FOR EVERY section. A landing page with 8 sections produces 8 images.… |
| [`industrial-brutalist-ui`](.claude/skills/industrial-brutalist-ui/SKILL.md) | Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type scale contrast, utilitarian color, analog degradation effects. For data-heavy dashboards, portfolios, or editorial sites… |
| [`minimalist-ui`](.claude/skills/minimalist-ui/SKILL.md) | Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows. |
| [`redesign-existing-projects`](.claude/skills/redesign-existing-projects/SKILL.md) | Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, and applies high-end design standards without breaking functionality. Works with any CSS framework or vanilla CSS. |
| [`stitch-design-taste`](.claude/skills/stitch-design-taste/SKILL.md) | Semantic Design System Skill for Google Stitch. Generates agent-friendly DESIGN.md files that enforce premium, anti-generic UI standards — strict typography, calibrated color, asymmetric layouts, perpetual micro-motion, and… |

### nextlevelbuilder/ui-ux-pro-max-skill — 7 skills

| Skill | What it is for |
|---|---|
| [`banner-design`](.claude/skills/banner-design/SKILL.md) | Design banners for social media, ads, website heroes, creative assets, and print. Multiple art direction options with optional generated or supplied visuals. Actions: design, create, generate banner. Platforms: Facebook, Twitter/X,… |
| [`brand`](.claude/skills/brand/SKILL.md) | Brand voice, visual identity, messaging frameworks, asset management, brand consistency. Activate for branded content, tone of voice, marketing assets, brand compliance, style guides. |
| [`design`](.claude/skills/design/SKILL.md) | Comprehensive design skill: brand identity, design tokens, UI styling, logo generation (55 styles, Gemini, Atlas Cloud, or MuAPI AI), corporate identity program (50 deliverables, CIP mockups), HTML presentations (Chart.js), banner design… |
| [`design-system`](.claude/skills/design-system/SKILL.md) | Token architecture, component specifications, and slide generation. Three-layer tokens (primitive→semantic→component), CSS variables, spacing/typography scales, component specs, strategic slide creation. Use for design tokens, systematic… |
| [`slides`](.claude/skills/slides/SKILL.md) | Create strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, and contextual slide strategies. |
| [`ui-styling`](.claude/skills/ui-styling/SKILL.md) | Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, and canvas-based visual designs. Use when building user interfaces, implementing design systems,… |
| [`ui-ux-pro-max`](.claude/skills/ui-ux-pro-max/SKILL.md) | UI/UX design intelligence for web, mobile, and desktop. This skill should be used when designing, building, reviewing, or fixing interfaces, including pages, components, design systems, accessibility, interaction, responsive layout,… |

### LovroPodobnik/refactoring-ui-skill — 1 skill

| Skill | What it is for |
|---|---|
| [`ui-refactor`](.claude/skills/ui-refactor/SKILL.md) | Tactical user interface design guide for fixing layouts, selecting colors/fonts, and creating professional UIs. Use when the user asks to "make this look better," needs help with CSS/styling decisions, wants to create a design system, or… |

### vercel-labs/agent-skills — 9 skills

| Skill | What it is for |
|---|---|
| [`deploy-to-vercel`](.claude/skills/deploy-to-vercel/SKILL.md) | Deploy applications and websites to Vercel. Use when the user requests deployment actions like "deploy my app", "deploy and give me the link", "push this live", or "create a preview deployment". |
| [`vercel-cli-with-tokens`](.claude/skills/vercel-cli-with-tokens/SKILL.md) | Deploy and manage projects on Vercel using token-based authentication. Use when working with Vercel CLI using access tokens rather than interactive login — e.g. "deploy to vercel", "set up vercel", "add environment variables to vercel". |
| [`vercel-composition-patterns`](.claude/skills/vercel-composition-patterns/SKILL.md) | React composition patterns that scale. Use when refactoring components with boolean prop proliferation, building flexible component libraries, or designing reusable APIs. Triggers on tasks involving compound components, render props,… |
| [`vercel-optimize`](.claude/skills/vercel-optimize/SKILL.md) | Use for Vercel cost and performance optimization on deployed projects, especially Next.js, SvelteKit, Nuxt, and limited Astro apps. Collect Vercel metrics, usage, project config, and code scan results first; investigate only metric-backed… |
| [`vercel-react-best-practices`](.claude/skills/vercel-react-best-practices/SKILL.md) | React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React… |
| [`vercel-react-native-skills`](.claude/skills/vercel-react-native-skills/SKILL.md) | React Native and Expo best practices for building performant mobile apps. Use when building React Native components, optimizing list performance, implementing animations, or working with native modules. Triggers on tasks involving React… |
| [`vercel-react-view-transitions`](.claude/skills/vercel-react-view-transitions/SKILL.md) | Guide for implementing smooth, native-feeling animations using React's View Transition API (`<ViewTransition>` component, `addTransitionType`, and CSS view transition pseudo-elements). Use this skill whenever the user wants to add page… |
| [`web-design-guidelines`](.claude/skills/web-design-guidelines/SKILL.md) | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices". |
| [`writing-guidelines`](.claude/skills/writing-guidelines/SKILL.md) | Review docs/prose for Writing Guidelines compliance. Use when asked to "review my docs", "check writing style", "audit prose", "review docs voice and tone", or "check this page against the writing handbook". |

### nateherkai/scroll-craft — 1 skill

| Skill | What it is for |
|---|---|
| [`scroll-craft`](.claude/skills/scroll-craft/SKILL.md) | Build premium scroll-driven landing pages for service, product, food, and drink brands. Plan the visitor journey, page grammar, emotional peak, and bespoke signature move. Create dimensional heroes with independent visual planes,… |

### img2threejs/img2threejs — 1 skill

| Skill | What it is for |
|---|---|
| [`img2threejs`](.claude/skills/img2threejs/SKILL.md) | Turn an object or character reference image into a quality-gated, animation-ready procedural Three.js model built in code. Use for image-to-3D reconstruction, detail-accurate object rebuilds, stylized/likeness-maximized human characters,… |

### nutlope/hallmark — 1 skill

| Skill | What it is for |
|---|---|
| [`hallmark`](.claude/skills/hallmark/SKILL.md) | Anti-AI-slop design skill for greenfield pages, audits, redesigns, and design extraction from URLs or screenshots. Use when the user asks to build a new app or landing page, wants to redesign something, invokes Hallmark by name, or uses… |

### Owl-Listener/designer-skills — 111 skills

| Skill | What it is for |
|---|---|
| [`a-b-test-design`](.claude/skills/a-b-test-design/SKILL.md) | Design an A/B experiment — hypothesis, variants, primary metric, and sample size. Use when a change can be measured quantitatively at scale. For observing behaviour qualitatively, use `test-scenario`. |
| [`accessibility-audit`](.claude/skills/accessibility-audit/SKILL.md) | Audit an existing interface against WCAG, producing findings with severity ratings and remediation steps. Use when you have a design or build to assess now. Not for planning future sessions with assistive-technology users — use… |
| [`accessibility-test-plan`](.claude/skills/accessibility-test-plan/SKILL.md) | Plan accessibility testing — assistive technologies, participant criteria, WCAG coverage, and session protocol. Use when scheduling testing with real AT users. Not for evaluating a design yourself — use `accessibility-audit`… |
| [`aesthetic-usability`](.claude/skills/aesthetic-usability/SKILL.md) | Apply the Aesthetic-Usability Effect — polished, consistent interfaces are perceived as more usable and forgive minor friction. Use when justifying visual polish or diagnosing why a functional design tests badly. For emotional resonance… |
| [`affinity-diagram`](.claude/skills/affinity-diagram/SKILL.md) | Cluster many qualitative data points into themes and insight statements. Use when synthesising across multiple sessions or sources. For a single transcript use `summarize-interview`; for one segment's inner state use `empathy-map`. |
| [`animation-principles`](.claude/skills/animation-principles/SKILL.md) | Apply animation principles — easing, staging, follow-through — to one specific UI motion. Use when tuning how an animation feels. For product-wide duration and easing tokens use `motion-system` (design-systems); for a full interaction… |
| [`behavioural-analytics`](.claude/skills/behavioural-analytics/SKILL.md) | Read funnels, retention curves, and event data as a designer — separating a design problem from a tracking artefact. Use when handed product data you did not design and asked why people drop off. For choosing what to measure, use… |
| [`business-design`](.claude/skills/business-design/SKILL.md) | Read financials, map competitive landscapes, and argue design decisions in the language of value. Use when defending design to commercial stakeholders. For the live negotiation itself, use `design-negotiation` (designer-toolkit). |
| [`card-sort-analysis`](.claude/skills/card-sort-analysis/SKILL.md) | Analyse open or closed card sort results into a proposed grouping and label set. Use after running a sort study. For turning that evidence into a full structure, use `information-architecture` (ux-strategy). |
| [`case-study`](.claude/skills/case-study/SKILL.md) | Craft a portfolio case study with narrative arc, process evidence, and outcomes. Use when telling a project's story to an external audience. For an internal stakeholder deck, use `presentation-deck`. |
| [`click-test-plan`](.claude/skills/click-test-plan/SKILL.md) | Design first-click and click tests for findability and navigation. Use when testing whether people can locate something. For full task-based observation, use `test-scenario`. |
| [`color-system`](.claude/skills/color-system/SKILL.md) | Build a product colour system — tonal scales, semantic roles, and contrast compliance. Use when defining or rebuilding colour from scratch. For dark-mode adaptation use `dark-mode-design`; for chart palettes use `data-visualization`; for… |
| [`competitive-analysis`](.claude/skills/competitive-analysis/SKILL.md) | Compare UX patterns, features, strengths, and gaps across rival products. Use when you need to know what others actually do. For deliberately adopting their conventions, use `jakobs-law` (interaction-design). |
| [`component-spec`](.claude/skills/component-spec/SKILL.md) | Specify one component — props, states, variants, accessibility, and usage rules. Use when defining a library component. For the reusable doc scaffold use `documentation-template`; for a problem-solution pattern use `pattern-library`. |
| [`concept-selection`](.claude/skills/concept-selection/SKILL.md) | Choose between competing concepts against criteria fixed in advance, and record what each rejected concept was testing. Use when several directions are alive and one has to win. For picking which problem to work on, use… |
| [`content-strategy`](.claude/skills/content-strategy/SKILL.md) | Define what content a product needs, how it is structured, and who owns it. Use when content itself is the problem. For the words in the interface use `ux-writing` (designer-toolkit); for structural hierarchy use `information-architecture`. |
| [`conversational-ux`](.claude/skills/conversational-ux/SKILL.md) | Design voice and conversational interfaces — dialog flows, error recovery, and persona. Use when the interface speaks and listens rather than being tapped. For graphical input collection, use `form-design`. |
| [`critique-affordance`](.claude/skills/critique-affordance/SKILL.md) | Critique a rendered screen's affordances — what looks clickable, state visibility, CTA clarity, and action discoverability. Use when reviewing an existing screen. For sizing and positioning targets in new work, use `fitts-law`… |
| [`critique-brand-consistency`](.claude/skills/critique-brand-consistency/SKILL.md) | Critique a rendered screen against mood.md, voice.md, and tokens.md. Use when those brand files exist and you are checking compliance. For defining the visual language itself, use `illustration-style` (ui-design). |
| [`critique-color`](.claude/skills/critique-color/SKILL.md) | Critique a rendered screen's colour — contrast ratios, palette coherence, and semantic meaning. Use when reviewing one screen. For a product-wide WCAG audit use `accessibility-audit` (design-systems); for building the palette use… |
| [`critique-composition`](.claude/skills/critique-composition/SKILL.md) | Critique a rendered screen's composition — balance, whitespace, rhythm, and gestalt grouping. Use when a layout feels off but hierarchy is fine. For emphasis and eye flow specifically, use `critique-visual-hierarchy`. |
| [`critique-information-density`](.claude/skills/critique-information-density/SKILL.md) | Critique a rendered screen's density — cognitive load, content prioritisation, scanning patterns, and progressive disclosure. Use when a screen feels overwhelming. For the underlying choice-count principle, use `hicks-law`… |
| [`critique-typography`](.claude/skills/critique-typography/SKILL.md) | Critique a rendered screen's typography — scale usage, readability, consistency, and token compliance. Use when reviewing type on a screen. For defining the scale itself, use `typography-scale` (ui-design). |
| [`critique-visual-hierarchy`](.claude/skills/critique-visual-hierarchy/SKILL.md) | Critique a rendered screen's hierarchy — entry point, eye flow, weight distribution, and emphasis. Use when attention lands in the wrong place. For establishing hierarchy in new work, use `visual-hierarchy` (ui-design). |
| [`dark-mode-design`](.claude/skills/dark-mode-design/SKILL.md) | Adapt an existing palette to dark mode — surface elevation, contrast rebalancing, and desaturation rules. Use when you already have a light palette to translate. For building the base palette first, use `color-system`. |
| [`data-visualization`](.claude/skills/data-visualization/SKILL.md) | Select chart types and design data encodings — marks, axes, labels, and accessible chart styling. Use when presenting data graphically. Owns chart selection and encoding only; the categorical colour ramp itself belongs to `color-system`. |
| [`design-brief`](.claude/skills/design-brief/SKILL.md) | Write a project brief — problem space, constraints, audience, and success criteria. Use at kickoff for one specific project. For long-horizon aspiration use `north-star-vision`; for reusable decision rules use `design-principles`. |
| [`design-critique`](.claude/skills/design-critique/SKILL.md) | Facilitate a structured team critique — framing, feedback rules, and actionable outcomes. Use when running a session with people in the room. For a solo expert review, use `heuristic-evaluation` (prototyping-testing). |
| [`design-debt-audit`](.claude/skills/design-debt-audit/SKILL.md) | Inventory and prioritise accumulated design inconsistencies across a product. Use when drift has built up over time. For token coverage specifically use `design-token-audit` (designer-toolkit); for WCAG gaps use `accessibility-audit`… |
| [`design-impact-reporting`](.claude/skills/design-impact-reporting/SKILL.md) | Communicate design's contribution to business and user outcomes in stakeholder language. Use when reporting results upward. For choosing the metrics in the first place, use `metrics-definition` (ux-strategy). |
| [`design-negotiation`](.claude/skills/design-negotiation/SKILL.md) | Advocate for design quality, scope, and timeline with partners and leadership using evidence and shared goals. Use in the conversation itself. For the commercial vocabulary behind it, use `business-design` (ux-strategy). |
| [`design-principles`](.claude/skills/design-principles/SKILL.md) | Define actionable principles that resolve trade-offs when the team disagrees. Use when the same decisions keep getting relitigated. For a single project's framing, use `design-brief`. |
| [`design-qa-checklist`](.claude/skills/design-qa-checklist/SKILL.md) | Build a QA checklist for verifying that a build matches the design. Use at implementation review. For the spec engineers build from, use `handoff-spec`. |
| [`design-rationale`](.claude/skills/design-rationale/SKILL.md) | Write rationale connecting decisions to user needs, business goals, and principles. Use when a decision needs defending in writing. For a live conversation, use `design-negotiation`. |
| [`design-review-process`](.claude/skills/design-review-process/SKILL.md) | Establish review gates — criteria, checkpoints, and approval flow. Use when work ships without consistent review. For running one individual session, use `design-critique`. |
| [`design-sprint-plan`](.claude/skills/design-sprint-plan/SKILL.md) | Plan and facilitate a design sprint from challenge framing through prototype testing. Use when compressing discovery into days. For ongoing team cadence, use `team-workflow`. |
| [`design-system-adoption`](.claude/skills/design-system-adoption/SKILL.md) | Create adoption strategy and enablement materials to drive design system usage. Use when the system exists but teams ignore it. For contribution and versioning rules, use `design-system-governance` (design-systems). |
| [`design-system-governance`](.claude/skills/design-system-governance/SKILL.md) | Define how the system evolves — contribution model, versioning, deprecation, and change management. Use when multiple teams contribute. For driving uptake use `design-system-adoption` (designer-toolkit); for design file history use… |
| [`design-token`](.claude/skills/design-token/SKILL.md) | Define and organise tokens for colour, spacing, type, and elevation with naming and usage rules. Use when establishing the token layer. For auditing existing usage use `design-token-audit` (designer-toolkit); for multi-brand mapping use… |
| [`design-token-audit`](.claude/skills/design-token-audit/SKILL.md) | Audit token usage across a product for coverage, drift, and hard-coded values. Use when tokens exist and you suspect they are being bypassed. For defining tokens in the first place, use `design-token` (design-systems). |
| [`diary-study-plan`](.claude/skills/diary-study-plan/SKILL.md) | Design a diary study — prompts, cadence, duration, participant criteria, and analysis frame. Use when behaviour unfolds over days or weeks. For a single-session study, use `usability-test-plan`. |
| [`documentation-template`](.claude/skills/documentation-template/SKILL.md) | Generate a reusable documentation scaffold for components, patterns, or guidelines. Use when standardising how the system is documented. For the content of one component's spec, use `component-spec`. |
| [`doherty-threshold`](.claude/skills/doherty-threshold/SKILL.md) | Apply the Doherty Threshold — keep system response under 400ms to preserve user flow. Use when diagnosing perceived slowness or setting a performance budget. For what to show during unavoidable waits, use `loading-states`. |
| [`empathy-map`](.claude/skills/empathy-map/SKILL.md) | Build a Says, Thinks, Does, Feels map for one user or segment. Use when sharing user understanding quickly. For a composite archetype with goals and behaviours use `user-persona`; for cross-session themes use `affinity-diagram`. |
| [`error-handling-ux`](.claude/skills/error-handling-ux/SKILL.md) | Design error prevention, detection, and recovery across a product — message content, placement, and escape routes. Use when errors span multiple flows. For validation inside a single form, use `form-design`. |
| [`experience-map`](.claude/skills/experience-map/SKILL.md) | Map the full ecosystem of touchpoints, channels, and relationships across a service. Use when the experience spans more than one product. For one persona's linear journey use `journey-map` (design-research); for backstage operations use… |
| [`feedback-patterns`](.claude/skills/feedback-patterns/SKILL.md) | Design confirmations, status updates, and notifications that tell users an action registered. Use when the system must acknowledge success or change. For waiting states use `loading-states`; for failures use `error-handling-ux`. |
| [`fitts-law`](.claude/skills/fitts-law/SKILL.md) | Apply Fitts's Law — target acquisition time depends on size and distance. Use when sizing and positioning controls, especially for touch. For how many controls to show at once, use `hicks-law`. |
| [`form-design`](.claude/skills/form-design/SKILL.md) | Design a form end to end — field order, grouping, validation, and completion. Use when the artifact is a form. For product-wide error strategy use `error-handling-ux`; for first-run signup use `onboarding-design`. |
| [`gesture-patterns`](.claude/skills/gesture-patterns/SKILL.md) | Design gesture interactions for touch and pointer — swipe, drag, long-press, and their discoverability. Use when input is gestural. For OS-standard gestures on iOS and Android, use `platform-conventions` (ui-design). |
| [`handoff-spec`](.claude/skills/handoff-spec/SKILL.md) | Write the implementation handoff — measurements, behaviours, assets, states, and edge cases. Use when engineering picks up the work. For verifying the result afterwards use `design-qa-checklist`; for reusable library components use… |
| [`heuristic-evaluation`](.claude/skills/heuristic-evaluation/SKILL.md) | Run an expert review against Nielsen's heuristics and domain criteria, with severity ratings. Use when you need findings without recruiting participants. For a facilitated team feedback session, use `design-critique` (design-ops). |
| [`hicks-law`](.claude/skills/hicks-law/SKILL.md) | Apply Hick's Law — decision time grows with the number of simultaneous choices. Use when a screen offers too many options at once. For how many items survive in memory afterwards, use `millers-law`. |
| [`icon-system`](.claude/skills/icon-system/SKILL.md) | Specify an icon system — grid, sizing, stroke weight, naming, categories, and implementation. Use when standardising iconography. For broader illustration, use `illustration-style` (ui-design). |
| [`illustration-style`](.claude/skills/illustration-style/SKILL.md) | Define an illustration style guide — visual language, colour usage, and application rules. Use when commissioning or standardising illustration. For icons, use `icon-system` (design-systems). |
| [`information-architecture`](.claude/skills/information-architecture/SKILL.md) | Design content structure, hierarchy, labelling, and the navigation model. Use when organising what exists. For the UI that exposes it use `navigation-patterns` (interaction-design); for user-generated grouping evidence use… |
| [`interfaces-that-feel`](.claude/skills/interfaces-that-feel/SKILL.md) | Apply an emotional resonance lens to a UI that is technically correct but flat, prescribing changes at the copy, motion, and interaction layer. Use when a design tests fine but lands cold. For the polish-perception argument, use… |
| [`interview-script`](.claude/skills/interview-script/SKILL.md) | Write a structured interview guide — warm-up, core exploration, and wrap-up. Use before running interviews. For analysing what comes back, use `summarize-interview`. |
| [`jakobs-law`](.claude/skills/jakobs-law/SKILL.md) | Apply Jakob's Law — users expect your product to work like the others they already use. Use when deciding whether to innovate on a familiar pattern. For OS-mandated conventions specifically, use `platform-conventions` (ui-design). |
| [`jobs-to-be-done`](.claude/skills/jobs-to-be-done/SKILL.md) | Map functional, emotional, and social jobs with outcome expectations. Use when reframing decisions around motivation rather than features. For who the user is, use `user-persona`. |
| [`journey-map`](.claude/skills/journey-map/SKILL.md) | Map one persona's end-to-end experience with stages, touchpoints, emotions, and pain points. Use when improving an existing experience. For the multi-channel ecosystem use `experience-map` (ux-strategy); for screen-level paths use… |
| [`law-of-closure`](.claude/skills/law-of-closure/SKILL.md) | Apply the Law of Closure — the eye completes implied shapes from partial forms. Use when reducing visual weight by dropping borders or letting negative space suggest structure. For explicit containers, use `law-of-common-region`. |
| [`law-of-common-region`](.claude/skills/law-of-common-region/SKILL.md) | Apply the Law of Common Region — a shared container, background, or border groups elements regardless of spacing. Use when grouping must survive a tight layout. For grouping by spacing alone, use `law-of-proximity`. |
| [`law-of-continuity`](.claude/skills/law-of-continuity/SKILL.md) | Apply the Law of Continuity — the eye follows alignment and unbroken paths. Use when sequencing steps, aligning content, or designing carousels and timelines. For grouping rather than sequencing, use `law-of-proximity`. |
| [`law-of-figure-ground`](.claude/skills/law-of-figure-ground/SKILL.md) | Apply the Law of Figure-Ground — establish which layer is foreground and actionable versus background. Use when designing modals, overlays, and depth. For emphasising one element among peers, use `von-restorff-effect`. |
| [`law-of-proximity`](.claude/skills/law-of-proximity/SKILL.md) | Apply the Law of Proximity — spatial closeness groups elements more strongly than any other cue. Use when spacing alone must carry grouping. For grouping via containers use `law-of-common-region`; via shared appearance use… |
| [`law-of-similarity`](.claude/skills/law-of-similarity/SKILL.md) | Apply the Law of Similarity — shared colour, shape, or size signals that elements belong to one category. Use when signalling relationships across distance. For grouping by position, use `law-of-proximity`. |
| [`layout-grid`](.claude/skills/layout-grid/SKILL.md) | Define a responsive grid — columns, gutters, margins, and breakpoint behaviour. Use when establishing page structure. For the spacing scale inside components use `spacing-system`; for cross-device behaviour use `responsive-design`. |
| [`loading-states`](.claude/skills/loading-states/SKILL.md) | Design waiting experiences — spinners, skeletons, optimistic updates, and progressive reveal. Use when content takes time to arrive. For the latency budget itself use `doherty-threshold`; for success confirmation use `feedback-patterns`. |
| [`localization-design`](.claude/skills/localization-design/SKILL.md) | Design for multiple languages, writing directions, and cultural contexts — text expansion, RTL mirroring, and locale formats. Use when shipping beyond one locale. For the words themselves, use `ux-writing` (designer-toolkit). |
| [`metrics-definition`](.claude/skills/metrics-definition/SKILL.md) | Define UX metrics and KPIs that connect design decisions to measurable outcomes. Use when choosing what to measure. For presenting the results afterwards, use `design-impact-reporting` (design-ops). |
| [`micro-interaction-spec`](.claude/skills/micro-interaction-spec/SKILL.md) | Specify one micro-interaction completely — trigger, rules, feedback, loops, and modes. Use when handing a single interaction to engineering. For motion craft alone use `animation-principles`; for multi-state components use `state-machine`. |
| [`millers-law`](.claude/skills/millers-law/SKILL.md) | Apply Miller's Law — chunk information into groups of about four to fit working memory. Use when grouping fields, menu items, or steps. For reducing the number of choices offered, use `hicks-law`. |
| [`motion-system`](.claude/skills/motion-system/SKILL.md) | Define motion tokens — durations, easing vocabulary, and reduced-motion handling — for consistency product-wide. Use when standardising motion across a system. For crafting one specific animation, use `animation-principles`… |
| [`naming-convention`](.claude/skills/naming-convention/SKILL.md) | Establish naming rules for components, tokens, and layers with patterns and worked examples. Use when names are inconsistent or being set. For what the tokens actually contain, use `design-token`. |
| [`navigation-patterns`](.claude/skills/navigation-patterns/SKILL.md) | Select and design a navigation pattern — tabs, drawer, hierarchy, or hub — matched to product structure and user tasks. Use when choosing how users move between sections. For the underlying content structure, use… |
| [`north-star-vision`](.claude/skills/north-star-vision/SKILL.md) | Articulate a long-horizon product vision that aligns teams and anchors strategy. Use when direction is contested or absent. For near-term project scope, use `design-brief`. |
| [`onboarding-design`](.claude/skills/onboarding-design/SKILL.md) | Design the first-run experience — activation path, progressive disclosure, and time to first value. Use for a user's very first session. For the mechanics of the signup form itself, use `form-design`. |
| [`opportunity-framework`](.claude/skills/opportunity-framework/SKILL.md) | Identify, score, and prioritise design opportunities against impact and effort. Use when there are more ideas than capacity. For framing the one you choose, use `design-brief`. |
| [`parallel-concepts`](.claude/skills/parallel-concepts/SKILL.md) | Build several genuinely different solutions to the same problem at once, spread across what the user does rather than how it looks. Use when one direction is on the table and the team is about to refine it by default. For choosing between… |
| [`pattern-library`](.claude/skills/pattern-library/SKILL.md) | Structure a pattern entry — problem context, solution, usage examples, and related patterns. Use when documenting a recurring solution rather than a component. For a single component's API, use `component-spec`. |
| [`peak-end-rule`](.claude/skills/peak-end-rule/SKILL.md) | Apply the Peak-End Rule — a flow is remembered by its most intense moment and its last. Use when designing completion, celebration, or cancellation moments. For sustaining engagement mid-flow, use `zeigarnik-effect`. |
| [`platform-conventions`](.claude/skills/platform-conventions/SKILL.md) | Design to iOS and Android conventions — what each OS mandates, where they diverge, and when to unify. Use when shipping native apps. For breakpoint adaptation use `responsive-design`; for matching competitor patterns use `jakobs-law`… |
| [`presentation-deck`](.claude/skills/presentation-deck/SKILL.md) | Structure a design presentation for a specific audience and decision. Use when presenting internally. For a portfolio narrative use `case-study`; for the written argument use `design-rationale`. |
| [`prototype-strategy`](.claude/skills/prototype-strategy/SKILL.md) | Choose prototype fidelity and method to match the design question and the decision at stake. Use before building a prototype. For what to test once it exists, use `test-scenario`. |
| [`qual-quant-triangulation`](.claude/skills/qual-quant-triangulation/SKILL.md) | Reconcile what the numbers say with what users say, and design the study that settles it rather than restates it. Use when behavioural data and research findings point different ways. For reading the data on its own, use… |
| [`readable-measure`](.claude/skills/readable-measure/SKILL.md) | Set line length and measure for comfortable reading across type sizes and breakpoints. Use when tuning body text. Covers measure only — for the full size and weight scale, use `typography-scale`. |
| [`research-repository`](.claude/skills/research-repository/SKILL.md) | Build a repository that makes findings findable, reusable, and cumulative across teams. Use when the same research keeps getting redone. For synthesising one study, use `affinity-diagram`. |
| [`responsive-design`](.claude/skills/responsive-design/SKILL.md) | Design layouts and interactions that adapt across screen sizes and input methods. Use when one design must serve many viewports. For the underlying column grid use `layout-grid`; for OS-specific patterns use `platform-conventions`. |
| [`search-ux`](.claude/skills/search-ux/SKILL.md) | Design search — query input, zero results, refinement, and result presentation. Use when users retrieve rather than browse. For browse structure, use `navigation-patterns`. |
| [`serial-position-effect`](.claude/skills/serial-position-effect/SKILL.md) | Apply the Serial Position Effect — first and last items in a sequence are recalled best. Use when ordering menus, lists, and steps. For emphasising one item regardless of its position, use `von-restorff-effect` (ui-design). |
| [`service-blueprint`](.claude/skills/service-blueprint/SKILL.md) | Map service delivery across frontstage actions, backstage processes, and supporting systems. Use when staff and operations are part of the experience. For the customer-visible layer only, use `experience-map`. |
| [`spacing-system`](.claude/skills/spacing-system/SKILL.md) | Create a spacing scale from a base unit with rules for when each step applies. Use when standardising padding and margins. For page-level columns and gutters, use `layout-grid`. |
| [`stakeholder-alignment`](.claude/skills/stakeholder-alignment/SKILL.md) | Build alignment artifacts — responsibility matrices, decision rights, and communication plans. Use when unclear ownership stalls decisions. For persuading in the moment, use `design-negotiation` (designer-toolkit). |
| [`state-machine`](.claude/skills/state-machine/SKILL.md) | Model component behaviour as explicit states, events, and transitions. Use when a component has many interacting states that must be exhaustive. For the feel and feedback of a single interaction, use `micro-interaction-spec`. |
| [`summarize-interview`](.claude/skills/summarize-interview/SKILL.md) | Turn one interview transcript into themes, supporting quotes, and action items. Use immediately after a session. For synthesising many sessions at once, use `affinity-diagram`. |
| [`survey-design`](.claude/skills/survey-design/SKILL.md) | Design unbiased survey instruments — question wording, scales, and sampling — to measure attitudes at scale. Use when you need quantitative breadth. For behavioural experiments, use `a-b-test-design` (prototyping-testing). |
| [`team-workflow`](.claude/skills/team-workflow/SKILL.md) | Design the team's operating rhythm — task management, collaboration rituals, and tooling. Use when the day-to-day cadence needs structure. For a time-boxed sprint, use `design-sprint-plan`. |
| [`teslers-law`](.claude/skills/teslers-law/SKILL.md) | Apply Tesler's Law — every process has irreducible complexity that someone must absorb. Use when deciding whether the product or the user carries it. For reducing apparent choice, use `hicks-law`. |
| [`test-scenario`](.claude/skills/test-scenario/SKILL.md) | Write realistic usability task scenarios with success criteria and facilitation notes. Use when you have a study and need the tasks. For the surrounding study design, use `usability-test-plan` (design-research). |
| [`theming-system`](.claude/skills/theming-system/SKILL.md) | Design theming architecture — brand variants, dark mode, and high-contrast — mapped through token layers. Use when one system must serve multiple themes. For a single palette use `color-system` (ui-design); for dark mode craft use… |
| [`typography-scale`](.claude/skills/typography-scale/SKILL.md) | Create a modular type scale with size, weight, and line-height relationships. Use when establishing typographic structure. For line length only use `readable-measure`; for judging type on an existing screen use `critique-typography`… |
| [`usability-test-plan`](.claude/skills/usability-test-plan/SKILL.md) | Design a usability study — research questions, methodology, participant criteria, metrics, and facilitation guide. Use when planning the study as a whole. For writing the task scenarios inside it, use `test-scenario` (prototyping-testing). |
| [`user-flow-diagram`](.claude/skills/user-flow-diagram/SKILL.md) | Diagram screen-level paths, decision points, and branch logic. Use when specifying how a feature is traversed. For the emotional end-to-end arc, use `journey-map` (design-research). |
| [`user-persona`](.claude/skills/user-persona/SKILL.md) | Build research-grounded personas with goals, frustrations, and behavioural patterns. Use when decisions need a consistent user reference. For one session's emotional snapshot use `empathy-map`; for motivation framing use `jobs-to-be-done`. |
| [`ux-writing`](.claude/skills/ux-writing/SKILL.md) | Write interface copy — microcopy, error messages, empty states, and CTAs. Use when the words are the deliverable. For content structure and ownership, use `content-strategy` (ux-strategy). |
| [`version-control-strategy`](.claude/skills/version-control-strategy/SKILL.md) | Define version control for design files, components, and libraries — branching, naming, and release. Use when file history is chaotic. For design system contribution rules, use `design-system-governance` (design-systems). |
| [`visual-hierarchy`](.claude/skills/visual-hierarchy/SKILL.md) | Establish hierarchy through size, weight, colour, spacing, and position so the eye lands in the intended order. Use when composing new work. For judging an existing screen, use `critique-visual-hierarchy` (visual-critique). |
| [`von-restorff-effect`](.claude/skills/von-restorff-effect/SKILL.md) | Apply the Von Restorff Effect — the element that differs from its neighbours is the one remembered. Use when a single action must dominate. For overall ordering rather than single-element emphasis, use `visual-hierarchy`. |
| [`wireframe-spec`](.claude/skills/wireframe-spec/SKILL.md) | Specify wireframe layout — content priority, component placement, and annotation. Use when defining structure before visual design. For grid mechanics, use `layout-grid` (ui-design). |
| [`zeigarnik-effect`](.claude/skills/zeigarnik-effect/SKILL.md) | Apply the Zeigarnik Effect — incomplete tasks stay mentally active. Use when designing progress indicators, saved drafts, and return hooks. For the emotional shape of the ending, use `peak-end-rule`. |

### bencium/bencium-marketplace — 16 skills

| Skill | What it is for |
|---|---|
| [`adaptive-communication`](.claude/skills/adaptive-communication/SKILL.md) | Use when detecting ambiguous user intent, hedging language, open-ended framing, personal context before requests, or when unsure whether user wants exploration vs direct answer. Applies to all conversations. |
| [`bencium-aeo`](.claude/skills/bencium-aeo/SKILL.md) | Generate AEO-optimized content (Answer Engine Optimization) for AI search visibility - ChatGPT, Claude, Gemini, AI Overviews. Use when optimizing websites for AI citations, creating FAQ schemas, evidence panels, or analyzing content for… |
| [`bencium-code-conventions`](.claude/skills/bencium-code-conventions/SKILL.md) | Bence's code style, tech stack, and workflow conventions |
| [`bencium-controlled-ux-designer`](.claude/skills/bencium-controlled-ux-designer/SKILL.md) | Expert UI/UX design guidance for unique, accessible interfaces. Use for visual decisions, colors, typography, layouts. Always ask before making design decisions. Use this skill when the user asks to build web components, pages, or… |
| [`bencium-impact-designer`](.claude/skills/bencium-impact-designer/SKILL.md) | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.… |
| [`bencium-innovative-ux-designer`](.claude/skills/bencium-innovative-ux-designer/SKILL.md) | Develop an independent visual language and turn the human-chosen direction into a production-ready graphic, brand, campaign, publication, web, or product system. Use when originality and differentiation matter enough to escape generic AI… |
| [`design-audit`](.claude/skills/design-audit/SKILL.md) | Premium UI/UX design audit and refinement skill. Conducts systematic visual audits of existing apps and produces phased, implementation-ready design plans. Use this skill whenever the user asks to audit a UI, improve an app's visual… |
| [`eu-ai-act-reviewer`](.claude/skills/eu-ai-act-reviewer/SKILL.md) | Review user journeys, public content, and codebases for potentially relevant EU AI Act provisions, with exact official citations, evidence gaps, application dates, and plain-language next actions. Use for EU AI Act issue-spotting, not… |
| [`human-architect-mindset`](.claude/skills/human-architect-mindset/SKILL.md) | Systematic architectural thinking for irreplaceable human capabilities - domain modeling, systems thinking, constraint navigation, and AI-aware problem decomposition. Use proactively when detecting architectural decisions, system design… |
| [`hungarian-humanizer`](.claude/skills/hungarian-humanizer/SKILL.md) | Detect and remove AI-generated markers from Hungarian text, making it sound like a native Hungarian speaker wrote it. Use when asked to "humanize", "naturalize", or "remove AI feel" from Hungarian text, or when editing .md/.txt files… |
| [`insurgent-campaign`](.claude/skills/insurgent-campaign/SKILL.md) | Grassroots-first campaign design for anyone being outspent — startups vs. incumbents, NGOs vs. corporate comms, movements vs. state-backed machines, solo brands vs. big-budget competitors. Ideates awareness, launch, fundraising,… |
| [`negentropy-lens`](.claude/skills/negentropy-lens/SKILL.md) | A decision-support framework that evaluates systems, architectures, and strategies through the entropy (decay) vs negentropy (growth) lens, while surfacing tacit knowledge gaps. Use this skill whenever the user is making architecture… |
| [`relationship-design`](.claude/skills/relationship-design/SKILL.md) | Design AI-first interfaces that build ongoing relationships through memory, trust evolution, and collaborative planning, not just isolated screen interactions |
| [`renaissance-architecture`](.claude/skills/renaissance-architecture/SKILL.md) | Software architecture and UI/UX principles for building genuinely new solutions, not derivative work. Use when designing features, architecting software, brainstorming apps, reviewing designs, or during strategy discussions. Focuses on… |
| [`ui-typography`](.claude/skills/ui-typography/SKILL.md) | Professional typography rules for UI design, web applications, software interfaces, and all screen-based text. Enforces timeless typographic correctness that LLMs consistently get wrong: proper quote marks, dashes, spacing, hierarchy, and… |
| [`vanity-engineering-review`](.claude/skills/vanity-engineering-review/SKILL.md) | Reviews codebases, architectures, PRs, and technical plans for vanity engineering — code and systems built for the developer's ego, resume, or intellectual pleasure rather than delivering user or business value. Triggers on: "review this… |

### wondelai/skills — 2 skills

| Skill | What it is for |
|---|---|
| [`design-sprint`](.claude/skills/design-sprint/SKILL.md) | Run a structured 5-day process to prototype, test, and validate product ideas with real users. Use when the user mentions "design sprint", "validate before we build", "rapid prototype", "test with users", or "should we build this". Also… |
| [`ux-heuristics`](.claude/skills/ux-heuristics/SKILL.md) | Evaluate and improve interface usability using heuristic analysis. Use when the user mentions "usability audit", "users are confused", "form usability", "navigation problems", "Nielsen heuristics", "cognitive walkthrough", or "is this… |

### rohitg00/awesome-claude-design — 1 skill

| Skill | What it is for |
|---|---|
| [`awesome-claude-design`](.claude/skills/awesome-claude-design/SKILL.md) | Reference library of production DESIGN.md files grouped by aesthetic family (editorial, terminal, warm, data-dense, cinematic, playful, glass, brutalist, indie), brand-remix recipes, and prompt packs for art-directing a UI. Use when… |

### vercel-labs/skills — 1 skill

| Skill | What it is for |
|---|---|
| [`find-skills`](.claude/skills/find-skills/SKILL.md) | Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the us |

Its registry search (`npx skills find`) needs skills.sh, which this build environment's egress policy
blocks; the CLI then reports no results. It works normally on a machine with open network.

## Updating a vendored skill

```bash
git clone --depth 1 https://github.com/<owner>/<repo> /tmp/upstream
# replace the skill directory wholesale, then re-pin the commit in the table above
rm -rf .claude/skills/<skill> && cp -r /tmp/upstream/<path-to-skill> .claude/skills/<skill>
```

Keep the directory name equal to the `name:` field in the skill's frontmatter — Claude Code resolves skills by directory, and a mismatch makes a skill invisible.
