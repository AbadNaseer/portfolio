import Link from 'next/link';
import { profile } from '@/content/profile';

/*  A running head, the way a document has one.
 *
 *  Three things changed from the old nav and each was a measured defect.
 *  It is sticky, because the previous header scrolled away after 80px while
 *  four anchors reserved 80px of scroll offset for it. Contact is the one
 *  emphasised control, because the brightest element used to be a link that
 *  took the reader off the site to a PDF. And there is a navigation on
 *  phones at all: the old links were inside `hidden md:flex`, so below 768px
 *  the only control on a 9,000px page was that same PDF.
 */

const SECTIONS = [
  { label: 'Work', href: '/#work' },
  { label: 'Faults', href: '/#faults' },
  { label: 'Positions', href: '/#positions' },
];

export function Masthead({ caseLabel }: { caseLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <nav className="shell flex h-14 items-center justify-between gap-4" aria-label="Primary">
        <Link href="/" className="focusable group flex min-w-0 items-baseline gap-2.5">
          <span className="font-mono text-2xs uppercase text-ink-3 group-hover:text-ink">
            {profile.name}
          </span>
          <span className="hidden truncate font-mono text-2xs uppercase text-ink-3 sm:inline">
            {caseLabel ?? profile.role}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {(caseLabel ? [{ label: 'All work', href: '/#work' }] : SECTIONS).map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="focusable font-mono text-2xs uppercase text-ink-3 transition-colors duration-quick hover:text-ink"
              >
                {s.label}
              </Link>
            ))}
            <a
              href={profile.links.resume}
              className="focusable font-mono text-2xs uppercase text-ink-3 transition-colors duration-quick hover:text-ink"
            >
              CV
            </a>
          </div>

          <a
            href="#contact"
            className="focusable border-b border-mark pb-0.5 font-mono text-2xs uppercase text-mark transition-colors duration-quick hover:bg-mark-wash"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

/*  Phones get a persistent bar rather than a hamburger. A hamburger hides
 *  "where am I", "what else is there" and "how do I reach him" behind a tap
 *  and answers none of them; three labelled targets answer all three. */
export function MobileBar({ caseMode }: { caseMode?: boolean }) {
  const items = caseMode
    ? [{ label: 'All work', href: '/#work' }, { label: 'Faults', href: '/#faults' }, { label: 'Contact', href: '#contact' }]
    : [...SECTIONS.slice(0, 2), { label: 'Contact', href: '#contact' }];

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-rule bg-paper/95 backdrop-blur-sm md:hidden"
    >
      {items.map((i) => (
        <a
          key={i.href}
          href={i.href}
          className="focusable flex h-14 items-center justify-center font-mono text-2xs uppercase text-ink-2 active:bg-sunk"
        >
          {i.label}
        </a>
      ))}
    </nav>
  );
}
