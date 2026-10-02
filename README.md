# Lila-Gerts

A design/frontend workspace with a vendored Claude Code skill library.

- **[SKILLS.md](SKILLS.md)** — all 167 skills, what each is for, and the upstream commit each is
  pinned to.
- **[CLAUDE.md](CLAUDE.md)** — which skill to reach for on which kind of task.
- **`.claude/skills/`** — the skills themselves, one directory each, available to any Claude Code
  session opened in this repo.
- **`.claude/skills-manifest.json`** — the same provenance data, machine-readable.
- **`licenses/`** — upstream licence for each source repo.

The library is assembled from 15 upstream repositories (Anthropic's `frontend-design`,
`vercel-labs/agent-skills`, `Owl-Listener/designer-skills`, `pbakaus/impeccable`,
`Leonxlnx/taste-skill`, `nextlevelbuilder/ui-ux-pro-max-skill`, `bencium/bencium-marketplace`,
and others). Upstream licences are collected in [`licenses/`](licenses/README.md); three sources ship no
licence file and are flagged there.
