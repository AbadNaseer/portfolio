import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/content/profile';
import { ArrowRight, Download } from './icons';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[720px] w-[720px] translate-x-1/4 rounded-full opacity-90"
        style={{
          background:
            'radial-gradient(circle, rgba(199,240,75,0.10) 0%, rgba(199,240,75,0.03) 42%, rgba(10,11,13,0) 68%)',
        }}
      />

      <div className="shell relative pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:gap-16">
          <div className="flex w-full flex-col gap-7 lg:pb-2">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent" />
              <span className="sec-label">
                {profile.role} · {profile.location}
              </span>
            </div>

            <h1 className="h-display max-w-[720px] text-[34px] leading-[1.12] sm:text-[44px] lg:text-[55px] lg:leading-[1.1]">
              {profile.headline.before}
              <span className="text-accent">{profile.headline.accent}</span>
              {profile.headline.after}
            </h1>

            <p className="max-w-[610px] text-[16px] leading-[1.65] text-muted sm:text-[17.5px]">
              {profile.intro}
            </p>

            <ul className="flex max-w-[610px] flex-wrap gap-2">
              {profile.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5">
              <Link
                href="/#work"
                className="focusable flex h-12 items-center justify-center gap-2.5 rounded-lg bg-accent px-6 text-[15px] font-semibold text-ground transition-opacity hover:opacity-90"
              >
                See the work
                <ArrowRight />
              </Link>
              <a
                href={profile.links.resume}
                className="focusable flex h-12 items-center justify-center gap-2.5 rounded-lg border border-edge px-6 text-[15px] font-medium text-ink transition-colors hover:border-muted"
              >
                <Download />
                Résumé
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex w-[260px] shrink-0 items-end justify-center sm:w-[320px] lg:mx-0 lg:w-[360px]">
            <div
              aria-hidden="true"
              className="absolute bottom-8 h-[280px] w-[280px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(199,240,75,0.16) 0%, rgba(10,11,13,0) 70%)',
              }}
            />
            <Image
              src="/img/portrait.webp"
              alt={profile.name}
              width={515}
              height={712}
              priority
              className="relative w-[260px] sm:w-[320px] lg:w-[360px]"
            />
          </div>
        </div>

        <dl className="relative mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:mt-[72px] lg:grid-cols-4">
          {profile.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-[7px] bg-panel px-6 py-6 sm:px-7">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-display text-[30px] font-semibold tracking-[-0.03em] text-accent sm:text-[34px]">
                {m.value}
              </dd>
              <dd className="text-[13.5px] text-ink">{m.label}</dd>
              <dd className="text-[12.5px] leading-[1.5] text-dim">{m.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
