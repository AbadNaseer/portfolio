import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Masthead, MobileBar } from '@/components/nav';
import { Colophon, Footer } from '@/components/doc';
import { diagrams } from '@/components/diagrams';
import { work } from '@/content/work';

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = work.find((w) => w.slug === params.slug);
  if (!item) return {};
  return {
    title: `${item.title} — ${item.kicker}`,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary, images: ['/og.png'] },
  };
}

/*  One numbered section of the memorandum. A real <section> with a real <h2>,
 *  so the document outline is the navigation. The old template rendered the
 *  section label as a <span> in a grid rail, which meant the page had an h1
 *  and then no headings at all. */
function Part({
  n, title, children,
}: { n: string; title: string; children: React.ReactNode }) {
  const id = `s${n.replace('.', '-')}`;
  return (
    <section aria-labelledby={id} className="shell border-t border-rule py-12 sm:py-16">
      <h2 id={id} className="mb-8 flex items-baseline gap-4 sm:mb-10">
        <span className="label tnum shrink-0">{n}</span>
        <span className="display text-xl sm:text-2xl">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Paras({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((p) => <p key={p.slice(0, 40)} className="prose-body" data-reveal>{p}</p>)}
    </div>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const idx = work.findIndex((w) => w.slug === params.slug);
  if (idx === -1) notFound();
  const item = work[idx];
  const prev = work[(idx - 1 + work.length) % work.length];
  const next = work[(idx + 1) % work.length];
  const Diagram = item.diagram ? diagrams[item.diagram] : null;

  // Figures are numbered within the case, and the body refers to them.
  let fig = 0;
  const figNo = () => `Fig. ${item.index.replace(/^0/, '')}.${++fig}`;

  return (
    <>
      <Masthead caseLabel={`${item.index} · ${item.title}`} />

      <main id="main">
        {/* Title block */}
        <header className="shell pb-10 pt-12 sm:pb-14 sm:pt-16">
          <p className="label">
            Case {item.index} of {String(work.length).padStart(2, '0')} · {item.kicker} · {item.status}
          </p>
          <p className="display mt-6 text-lg text-ink-3 sm:text-xl">{item.title}</p>
          <h1 className="display mt-2 max-w-[22ch] text-2xl sm:text-3xl lg:text-4xl">
            {item.problem.heading}
          </h1>
          <p className="prose-body mt-7 text-lg">{item.lede}</p>

          <dl className="mt-10 border-t border-rule">
            {item.meta.map((m) => (
              <div key={m.label} className="grid grid-cols-[7rem_1fr] gap-x-6 border-b border-rule py-3 sm:grid-cols-[11rem_1fr]">
                <dt className="label">{m.label}</dt>
                <dd className="font-serif text-sm text-ink">
                  {m.href
                    ? <a className="focusable border-b border-mark text-mark" href={m.href} target="_blank" rel="noopener noreferrer">{m.value} ↗</a>
                    : m.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        {item.shot && (
          <figure className="shell pb-6" data-reveal>
            <Image
              src={item.shot.src}
              alt={item.shot.alt}
              width={item.shot.w}
              height={item.shot.h}
              className="w-full max-w-[470px] border border-rule"
              sizes="(max-width: 640px) 100vw, 470px"
            />
            <figcaption className="mt-3 max-w-measure font-mono text-xs text-ink-3">
              {figNo()} — {item.shot.caption}
            </figcaption>
          </figure>
        )}

        <Part n={`${item.index.replace(/^0/, '')}.1`} title="The problem">
          <Paras items={item.problem.paras} />
        </Part>

        {item.layers && (
          <Part n={`${item.index.replace(/^0/, '')}.2`} title={item.layers.heading}>
            <p className="prose-body mb-8" data-reveal>{item.layers.blurb}</p>
            <ol className="border-t border-rule">
              {item.layers.items.map((l) => (
                <li key={l.name} className="grid grid-cols-1 gap-2 border-b border-rule py-6 sm:grid-cols-[13rem_1fr] sm:gap-10" data-reveal>
                  <h3 className="display text-base">{l.name}</h3>
                  <div>
                    <p className="prose-body text-sm">{l.blurb}</p>
                    <p className="mt-2 font-mono text-2xs uppercase text-ink-3">{l.chips.join(' · ')}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Part>
        )}

        {item.agents && (
          <Part n={`${item.index.replace(/^0/, '')}.2`} title={item.agents.heading}>
            <p className="prose-body mb-8" data-reveal>{item.agents.blurb}</p>
            <ol className="border-t border-rule">
              {item.agents.items.map((a) => (
                <li key={a.name} className="grid grid-cols-1 gap-2 border-b border-rule py-6 sm:grid-cols-[13rem_1fr] sm:gap-10" data-reveal>
                  <h3 className="display text-base">{a.name}</h3>
                  <div>
                    <p className="prose-body text-sm">{a.blurb}</p>
                    <a className="focusable mt-2 inline-block font-mono text-2xs text-mark" href={a.href} target="_blank" rel="noopener noreferrer">
                      {a.hrefLabel} ↗
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </Part>
        )}

        <Part n={`${item.index.replace(/^0/, '')}.3`} title={item.approach.heading}>
          <Paras items={item.approach.paras} />
        </Part>

        {Diagram && (
          <section className="shell border-t border-rule py-12 sm:py-16">
            <figure data-reveal>
              <Diagram />
              <figcaption className="mt-3 max-w-measure font-mono text-xs text-ink-3">
                {figNo()} — The architecture described above.
              </figcaption>
            </figure>
          </section>
        )}

        {item.results && (
          <Part n={`${item.index.replace(/^0/, '')}.4`} title={item.results.heading}>
            {/* Desktop: a table. Mobile: cards, because the old table was
                700px wide inside a 342px scroller, which put the change
                column — the only number anyone cares about — offscreen with
                no indication it existed. */}
            <div className="hidden overflow-x-auto sm:block" tabIndex={0}>
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-y border-rule bg-sunk">
                    <th className="label py-3 pr-6 font-normal">Measure</th>
                    <th className="label py-3 pr-6 font-normal">Before</th>
                    <th className="label py-3 pr-6 font-normal">After</th>
                    <th className="label py-3 font-normal">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {item.results.rows.map((r) => (
                    <tr key={r.measure} className="border-b border-rule">
                      <td className="py-4 pr-6 font-serif text-sm text-ink">{r.measure}</td>
                      <td className="py-4 pr-6 font-mono text-xs text-ink-3">{r.before}</td>
                      <td className="py-4 pr-6 font-mono text-xs text-ink">{r.after}</td>
                      <td className="py-4 font-serif text-base text-mark">{r.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ol className="border-t border-rule sm:hidden">
              {item.results.rows.map((r) => (
                <li key={r.measure} className="border-b border-rule py-5">
                  <p className="font-serif text-sm text-ink">{r.measure}</p>
                  <p className="mt-1.5 font-mono text-xs text-ink-3">
                    {r.before} <span className="text-ink-3">→</span> <span className="text-ink">{r.after}</span>
                  </p>
                  <p className="tnum mt-2 font-serif text-xl text-mark">{r.change}</p>
                </li>
              ))}
            </ol>

            {item.results.footnote && (
              <p className="prose-body mt-7 text-sm">{item.results.footnote}</p>
            )}
          </Part>
        )}

        {item.live && (
          <section className="shell border-t border-rule py-10">
            <a
              href={item.live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable border-b border-mark font-mono text-sm text-mark transition-colors duration-quick hover:bg-mark-wash"
            >
              See it running at {item.live.label} ↗
            </a>
          </section>
        )}

        {/* The old page ended here, with "back" and "next" and no ask. A reader
            who has just finished 1,200 words on your GPU platform is at peak
            intent; handing them two navigation links was the largest leak on
            the site. */}
        <Colophon />

        <nav className="shell flex items-center justify-between gap-6 border-t border-rule py-8" aria-label="Case studies">
          <Link href={`/work/${prev.slug}/`} className="focusable group min-w-0">
            <span className="label block">← {prev.index}</span>
            <span className="display block truncate text-sm group-hover:text-mark">{prev.title}</span>
          </Link>
          <span className="label tnum shrink-0">{item.index} / {String(work.length).padStart(2, '0')}</span>
          <Link href={`/work/${next.slug}/`} className="focusable group min-w-0 text-right">
            <span className="label block">{next.index} →</span>
            <span className="display block truncate text-sm group-hover:text-mark">{next.title}</span>
          </Link>
        </nav>
      </main>

      <Footer />
      <MobileBar caseMode />
    </>
  );
}
