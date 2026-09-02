import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/sections';
import { diagrams } from '@/components/diagrams';
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHub } from '@/components/icons';
import { work, getWork } from '@/content/work';

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getWork(params.slug);
  if (!item) return {};
  const title = `${item.title} — ${item.kicker}`;
  return {
    title,
    description: item.summary,
    openGraph: { title, description: item.summary, type: 'article' },
    twitter: { card: 'summary_large_image', title, description: item.summary },
  };
}

/** A labelled block in the left rail, content on the right. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="shell grid grid-cols-1 gap-6 pb-14 sm:gap-14 lg:grid-cols-[260px_1fr]">
      <span className="sec-label lg:pt-2">{label}</span>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="h-display text-[24px] sm:text-[30px]">{children}</h2>;
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const item = getWork(params.slug);
  if (!item) notFound();

  const idx = work.findIndex((w) => w.slug === item.slug);
  const next = work[(idx + 1) % work.length];
  const Diagram = item.diagram ? diagrams[item.diagram] : null;

  return (
    <>
      <Nav variant="case" />
      <main>
        {/* Title */}
        <div className="shell flex flex-col gap-6 pb-10 pt-14 sm:pt-16">
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="font-mono text-xs text-accent">CASE STUDY {item.index}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#3A3D44]" />
            <span className="sec-label">{item.kicker}</span>
          </div>

          <h1 className="h-display max-w-[900px] text-[32px] leading-[1.1] sm:text-[44px] lg:text-[58px] lg:leading-[1.08]">
            {item.problem.heading}
          </h1>

          <p className="prose-body max-w-[780px] sm:text-[18px]">{item.lede}</p>

          <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {item.meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-1.5 bg-panel px-6 py-5">
                <dt className="sec-label">{m.label}</dt>
                <dd className="text-[14.5px] text-ink">
                  {m.href ? (
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focusable inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-80"
                    >
                      {m.value}
                      <ArrowUpRight />
                    </a>
                  ) : (
                    m.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Screenshot */}
        {item.shot && (
          <div className="shell pb-14 pt-5">
            <figure className="card overflow-hidden">
              <figcaption className="flex items-center gap-[7px] border-b border-line px-4 py-3">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-edge" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-edge" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-edge" />
                <span className="ml-3 font-mono text-[11.5px] text-dim">{item.shot.chrome}</span>
              </figcaption>
              <Image
                src={item.shot.src}
                alt={item.shot.alt}
                width={1400}
                height={722}
                priority
                className="block w-full"
              />
            </figure>
          </div>
        )}

        {/* Problem */}
        <Row label="The problem">
          {item.problem.paras.map((p) => (
            <p key={p.slice(0, 40)} className="prose-body max-w-[780px]">
              {p}
            </p>
          ))}
        </Row>

        {/* Agents, SmartZees only */}
        {item.agents && (
          <div className="pb-14">
            <div className="shell grid grid-cols-1 gap-6 pb-8 sm:gap-14 lg:grid-cols-[260px_1fr]">
              <span className="sec-label lg:pt-2">What it ships</span>
              <div className="flex max-w-[780px] flex-col gap-4">
                <H2>{item.agents.heading}</H2>
                <p className="prose-body">{item.agents.blurb}</p>
              </div>
            </div>
            <ul className="shell grid grid-cols-1 gap-[18px] md:grid-cols-3">
              {item.agents.items.map((a) => (
                <li key={a.name} className="card flex flex-col gap-3.5 p-[26px]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-[19px] font-medium text-ink">{a.name}</h3>
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <p className="flex-grow text-[14.5px] leading-[1.65] text-muted">{a.blurb}</p>
                  <ul className="flex flex-wrap gap-[7px]">
                    {a.chips.map((c) => (
                      <li key={c} className="chip">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focusable mt-0.5 flex items-center gap-[7px] font-mono text-[12.5px] text-accent transition-opacity hover:opacity-80"
                  >
                    {a.hrefLabel}
                    <ArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Architecture */}
        {Diagram && (
          <Row label="Architecture">
            <Diagram />
          </Row>
        )}

        {/* Approach */}
        <Row label="What I did">
          <H2>{item.approach.heading}</H2>
          {item.approach.paras.map((p) => (
            <p key={p.slice(0, 40)} className="prose-body max-w-[780px]">
              {p}
            </p>
          ))}
        </Row>

        {/* Results */}
        {item.results && (
          <Row label="Results">
            <H2>{item.results.heading}</H2>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-panel">
                    {['Measure', 'Before', 'After', 'Change'].map((h) => (
                      <th key={h} scope="col" className="sec-label px-5 py-3.5 font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.results.rows.map((r, i) => (
                    <tr
                      key={r.measure}
                      className={`bg-raised ${i === item.results!.rows.length - 1 ? '' : 'border-b border-line'}`}
                    >
                      <th scope="row" className="px-5 py-4 text-[14.5px] font-normal text-ink">
                        {r.measure}
                      </th>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-[13.5px] text-muted">
                        {r.before}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-[13.5px] text-ink">
                        {r.after}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-[13.5px] text-accent">
                        {r.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {item.results.footnote && (
              <p className="max-w-[780px] text-[14.5px] leading-[1.7] text-dim">
                {item.results.footnote}
              </p>
            )}
          </Row>
        )}

        {/* Links out */}
        {(item.live || item.repo) && (
          <Row label="See it">
            <div className="flex flex-wrap gap-3">
              {item.live && (
                <a
                  href={item.live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focusable flex items-center gap-2.5 rounded-lg bg-accent px-5 py-3 text-[14.5px] font-semibold text-ground transition-opacity hover:opacity-90"
                >
                  {item.live.label}
                  <ArrowUpRight />
                </a>
              )}
              {item.repo && (
                <a
                  href={item.repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focusable flex items-center gap-2.5 rounded-lg border border-edge px-5 py-3 text-[14.5px] font-medium text-ink transition-colors hover:border-muted"
                >
                  <GitHub />
                  {item.repo.label}
                </a>
              )}
            </div>
          </Row>
        )}

        {/* Prev / next */}
        <div className="shell flex flex-col gap-4 border-t border-line-soft py-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/#work"
            className="focusable flex items-center gap-2.5 text-[15px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft />
            All work
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="focusable group flex items-center gap-2.5 text-[15px] text-ink"
          >
            <span className="text-dim">Next:</span> {next.title}
            <ArrowRight className="h-[15px] w-[15px] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
