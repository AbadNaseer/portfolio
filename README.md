# abad.falcoflow.com

A technical memorandum rather than a landing page: a document head with an
abstract of measured results, a contents page of six case studies, an appendix
of faults, positions held, and a colophon. Static Next.js export on Vercel.

## Why it looks like this

The content was always document-shaped — a fault table, a results table per
project, a header block per project — and the previous design wrapped it in
marketing chrome and lost both. Paper ground, one serif at 400, one mono for
every number, one oxide red used only where it carries meaning.

## Layout

| Path | What it holds |
|---|---|
| `app/tokens.css` | The only place a colour or duration is defined |
| `tailwind.config.ts` | Ten type sizes. `text-[...]` is banned |
| `content/profile.ts` | Headline, abstract metrics, contact, links |
| `content/work.ts` | Six case studies, `tier`-ranked, with their results tables |
| `content/findings.ts` | Seven real faults, symptom and cause |
| `content/experience.ts` | Four roles and credentials |
| `components/doc.tsx` | Document primitives: head, contents, faults, positions, colophon |
| `components/diagrams.tsx` | Five hand-drawn SVG architecture figures |
| `components/inference-sim.tsx` | The running inference model on case 01 |

## House rules

- Every colour is a CSS custom property in `tokens.css`. A hex literal in a
  component is a bug.
- Every type size comes from the scale. No arbitrary values.
- Contrast is checked, not assumed: `ink` 17.2:1, `ink-2` 6.9:1, `ink-3` 4.5:1,
  `mark` 6.4:1, interactive borders 3.0:1, all against `paper`.
- Motion lives behind `prefers-reduced-motion` and its resting opacity is
  `.001`, never `0`, so nothing is ever hidden from find-in-page or a reader.
- No number appears without the conditions it was measured under.

## Build

```
export PATH="$HOME/.local/node/bin:$PATH"
npm run build      # static export into out/
```
