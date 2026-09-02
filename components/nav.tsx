import Link from 'next/link';
import { profile } from '@/content/profile';
import { ArrowLeft, Download } from './icons';

const sections = [
  { label: 'Work', href: '/#work' },
  { label: 'Open source', href: '/#open-source' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

export function Nav({ variant = 'home' }: { variant?: 'home' | 'case' }) {
  return (
    <header className="border-b border-line-soft">
      <nav className="shell flex items-center justify-between py-5 sm:py-6">
        {variant === 'home' ? (
          <Link href="/" className="focusable flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[7px] border border-accent font-display text-[14px] font-bold text-accent"
            >
              AN
            </span>
            <span className="font-display text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
              {profile.name}
            </span>
          </Link>
        ) : (
          <Link
            href="/#work"
            className="focusable flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft />
            All work
          </Link>
        )}

        <div className="flex items-center gap-6 sm:gap-8">
          {variant === 'home' && (
            <div className="hidden items-center gap-8 md:flex">
              {sections.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="focusable text-[14.5px] text-muted transition-colors hover:text-accent"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          )}
          <a
            href={profile.links.resume}
            className="focusable flex items-center gap-2 rounded-full bg-accent px-[18px] py-[9px] text-sm font-medium text-ground transition-opacity hover:opacity-90"
          >
            <Download className="h-[13px] w-[13px] sm:hidden" />
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
