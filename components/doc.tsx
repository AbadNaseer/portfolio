import Link from 'next/link';
import { profile } from '@/content/profile';
import { roles, credentials } from '@/content/experience';
import { findings } from '@/content/findings';
import { work } from '@/content/work';

/*  The document primitives.
 *
 *  The content was already shaped like a technical memorandum: a fault table,
 *  a results table per project, a meta block per project that is literally a
 *  document header. The old design wrapped all of that in SaaS marketing
 *  chrome and lost both. These components stop the fight.
 */

/* A numbered section with a real heading, so find-in-page, the screen-reader
   rotor and heading navigation all answer "where am I" without JavaScript. */
export function Section({
  id, number, title, aside, children,
}: {
  id: string; number: string; title: string; aside?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section id={id} className="shell scroll-mt-20 border-t border-rule py-14 sm:py-20">
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <h2 className="flex items-baseline gap-4" data-reveal>
          <span className="label tnum shrink-0">{number}</span>
          <span className="display text-2xl sm:text-3xl">{title}</span>
        </h2>
        {aside && <p className="max-w-measure font-serif text-sm text-ink-3 sm:text-right" data-reveal>{aside}</p>}
      </div>
      {children}
    </section>
  );
}

/* ── the document head ─────────────────────────────────────────────────── */

export function DocHead() {
  return (
    <header className="shell pb-12 pt-10 sm:pb-16 sm:pt-14">
      <p className="label settle" style={{ ['--d' as string]: '0ms' }}>
        {profile.name} · {profile.role} · {profile.location}
      </p>

      <h1
        className="display settle mt-6 max-w-[30ch] text-2xl sm:text-3xl lg:text-4xl"
        style={{ ['--d' as string]: '70ms' }}
      >
        {profile.headline}
      </h1>

      <p
        className="prose-body settle mt-6"
        style={{ ['--d' as string]: '140ms' }}
      >
        {profile.intro}
      </p>

      {/* The abstract. Four measurements with the conditions they were taken
          under, above the fold, as a table. The old site put these 1,100px
          down in a bordered card grid, so a reader deciding in ten seconds
          saw a claim and no evidence. */}
      <div className="settle mt-10 sm:mt-12" style={{ ['--d' as string]: '210ms' }}>
        <p className="label mb-4">Abstract</p>
        <dl className="border-t border-rule">
          {profile.metrics.map((m) => (
            <div
              key={m.label}
              className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-rule py-3.5
                         sm:grid-cols-[7rem_14rem_1fr] sm:gap-x-8 sm:py-4"
            >
              <dd className="tnum font-serif text-xl text-ink sm:text-2xl">{m.value}</dd>
              <dt className="font-serif text-sm text-ink sm:text-base">{m.label}</dt>
              <dd className="col-span-2 font-mono text-xs text-ink-3 sm:col-span-1">{m.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

/* ── contents ──────────────────────────────────────────────────────────── */

function statusWord(s?: string) {
  if (!s) return '';
  if (s.startsWith('Reference')) return 'Reference';
  if (s.startsWith('Production')) return 'Production';
  if (s.startsWith('Live, migration')) return 'Complete';
  return 'Live';
}

export function Contents() {
  const flagship = work.find((w) => w.tier === 'flagship')!;
  const rest = work.filter((w) => w.tier !== 'flagship');

  return (
    <Section
      id="work"
      number="01"
      title="Selected work"
      aside="Five of the six run in production. Every figure is quoted with the conditions it was measured under."
    >
      {/* The flagship is not row one of a list. It is the current role, it is
          the positioning, and it gets its own block. */}
      <Link
        href={`/work/${flagship.slug}/`}
        className="focusable group block border-y border-rule bg-sunk px-5 py-9 sm:px-8 sm:py-12"
        data-reveal
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="label tnum">{flagship.index} · {flagship.kicker}</span>
          <span className="label">{flagship.status}</span>
        </div>
        <h3 className="display mt-5 text-2xl group-hover:text-mark sm:text-3xl">{flagship.title}</h3>
        <p className="prose-body mt-5">{flagship.summary}</p>
        <p className="mt-7 font-mono text-xs text-mark">Read the case study →</p>
      </Link>

      {/* Everything else as a contents page: leader dots, right-aligned
          status. No cards, no thumbnails, no chip rows. */}
      <ol className="mt-12">
        {rest.map((w) => (
          <li key={w.slug} data-reveal>
            <Link
              href={`/work/${w.slug}/`}
              className="focusable group grid grid-cols-[2.2rem_1fr] items-baseline gap-x-3 border-b border-rule
                         py-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:py-6"
            >
              <span className="label tnum">{w.index}</span>

              <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 sm:flex-nowrap">
                <span className="display text-lg group-hover:text-mark sm:text-xl">{w.title}</span>
                <span aria-hidden="true" className="leader hidden sm:block" />
                <span className="font-mono text-2xs uppercase text-ink-3">{w.kicker}</span>
              </span>

              <span className="col-start-2 flex items-baseline gap-3 sm:col-start-3">
                {w.metric && <span className="tnum font-serif text-base text-mark">{w.metric.value}</span>}
                <span className="font-mono text-2xs uppercase text-ink-3">{statusWord(w.status)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ── appendix A: faults ────────────────────────────────────────────────── */

export function Faults() {
  return (
    <Section
      id="faults"
      number="02"
      title="Faults, and what they actually were"
      aside="The symptom is never the cause. Seven real ones; the right-hand column is what each turned out to be."
    >
      <ol className="border-t border-rule">
        {findings.map((f) => (
          <li
            key={f.symptom}
            className="grid grid-cols-1 gap-2 border-b border-rule py-7 sm:grid-cols-[1fr_1.3fr] sm:gap-12 sm:py-8"
            data-reveal
          >
            <div>
              <p className="display text-base sm:text-lg">{f.symptom}</p>
              <p className="label mt-3">{f.where}</p>
            </div>
            {/* Italic is used for exactly one thing on this site, so the
                reader learns in row one that italic means cause. */}
            <p className="max-w-measure font-serif text-sm italic text-ink-2 sm:text-base">{f.cause}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ── positions held ────────────────────────────────────────────────────── */

export function Positions() {
  return (
    <Section id="positions" number="03" title="Positions held">
      <ol className="border-t border-rule">
        {roles.map((r) => (
          <li
            key={r.org}
            className="grid grid-cols-1 gap-2 border-b border-rule py-7 sm:grid-cols-[11rem_1fr] sm:gap-10 sm:py-8"
            data-reveal
          >
            <p className="flex items-baseline gap-2 font-mono text-2xs uppercase text-ink-3">
              {r.current && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-mark" />}
              {r.period}
            </p>
            <div>
              <h3 className="display text-lg">
                {r.title}
                <span className="text-ink-3"> · {r.org}</span>
              </h3>
              <p className="prose-body mt-2 text-sm">{r.blurb}</p>
            </div>
          </li>
        ))}
      </ol>
      <ul className="mt-7 flex flex-col gap-1.5 font-mono text-xs text-ink-3 sm:flex-row sm:gap-8">
        {credentials.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </Section>
  );
}

/* ── colophon ──────────────────────────────────────────────────────────── */

export function Colophon() {
  return (
    <section id="contact" className="shell scroll-mt-20 border-t border-rule py-16 sm:py-24">
      <p className="label">Contact</p>
      <p className="display mt-6 max-w-[26ch] text-xl sm:text-2xl" data-reveal>
        {profile.contactHeadline}
      </p>

      {/* Availability sits above the address, at the same weight. It removes
          both reasons people do not write: is he looking, and will he reply. */}
      <p className="mt-8 font-mono text-sm text-ink-2">{profile.availability}</p>

      <a
        href={`mailto:${profile.links.email}`}
        className="focusable mt-3 inline-block border-b border-mark font-mono text-lg text-mark transition-colors duration-quick hover:bg-mark-wash"
      >
        {profile.links.email}
      </a>

      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-ink-3">
        <li><a className="focusable hover:text-ink" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
        <li><a className="focusable hover:text-ink" href={profile.links.upwork} target="_blank" rel="noopener noreferrer">Upwork ↗</a></li>
        <li><a className="focusable hover:text-ink" href={profile.links.resume}>Curriculum vitae, PDF</a></li>
      </ul>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="shell border-t border-rule py-8 pb-24 md:pb-8">
      <p className="font-mono text-2xs uppercase text-ink-3">
        {profile.name} · {profile.location} · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
