# abadnaseer.com — portfolio

Personal site for Abad Naseer, Platform Engineer (Cloud, Kubernetes & AI Systems).

A landing page plus five case studies with measured results, built as a static
export so it can be handed to anyone as a single link.

## Stack

Next.js 14 (App Router, `output: 'export'`) · TypeScript · Tailwind · no runtime JS
beyond React hydration. Deploys to Vercel as static files.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into ./out
```

## Where the content lives

All copy is data, not markup. To change what the site says, edit `content/`:

| File | What it holds |
|---|---|
| `content/profile.ts` | Name, headline, intro, the four hero metrics, all outbound links |
| `content/work.ts` | The five case studies: summary, metric, problem, approach, results table |
| `content/repos.ts` | The open-source grid |
| `content/experience.ts` | Roles, credentials, skill groups |

`components/` renders that data and should rarely need touching.
`components/diagrams.tsx` holds one inline SVG architecture diagram per case study.

## House rules for the copy

- Every number is one that was actually measured, quoted with the conditions it was
  measured under. "787x faster" alone invites a reader to discount it; "787x, on a
  25,631 product catalog" does not.
- No em or en dashes.
- Freelance client names are never used. Their products (SmartZees and its three
  agents) are public brands and are linked directly.

## Assets

`public/img/portrait.webp` is the hero portrait, cropped to a torso shot with the
bottom faded to transparent so it dissolves into the dark ground.
`public/img/work/` holds live screenshots. `public/Abad_Naseer_Resume.pdf` is the CV.
