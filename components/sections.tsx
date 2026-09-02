import Link from 'next/link';
import { profile } from '@/content/profile';
import { repos } from '@/content/repos';
import { roles, credentials, skills } from '@/content/experience';
import { ArrowUpRight, GitHub, LinkedIn, Upwork, Download, Mail } from './icons';

export function SectionHead({
  label,
  title,
  aside,
  id,
}: {
  label: string;
  title: string;
  aside?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-3.5">
        <span className="sec-label" id={id}>
          {label}
        </span>
        <h2 className="h-display text-[28px] sm:text-[36px]">{title}</h2>
      </div>
      {aside}
    </div>
  );
}

export function OpenSource() {
  return (
    <section id="open-source" className="shell scroll-mt-20 py-14 sm:py-16">
      <SectionHead
        label="Open source"
        title="Infrastructure you can read"
        aside={
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable flex items-center gap-2 text-[14.5px] text-muted transition-colors hover:text-accent"
          >
            <GitHub />
            github.com/AbadNaseer
          </a>
        }
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <li key={r.name}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable card group flex h-full flex-col gap-2.5 p-[22px] transition-colors hover:border-edge"
            >
              <span className="flex items-center justify-between gap-2 font-mono text-sm text-ink">
                {r.name}
                <ArrowUpRight className="h-3 w-3 shrink-0 text-dim transition-colors group-hover:text-accent" />
              </span>
              <span className="flex-grow text-[13.5px] leading-[1.6] text-[#7E818A]">{r.blurb}</span>
              <span className="mt-0.5 flex flex-wrap gap-[7px]">
                {r.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-20 py-14 sm:py-16">
      <SectionHead label="Experience" title="Where this came from" />

      <ol className="flex flex-col">
        {roles.map((r, i) => (
          <li
            key={r.org}
            className={`grid grid-cols-1 gap-3 border-t border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-10 ${
              i === roles.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className={`font-mono text-[13px] ${r.current ? 'text-accent' : 'text-dim'}`}>
              {r.period}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-[17px] font-medium text-ink sm:text-[19px]">
                {r.title} <span className="font-normal text-dim">· {r.org}</span>
              </h3>
              <p className="max-w-[760px] text-[14.5px] leading-[1.65] text-muted">{r.blurb}</p>
            </div>
          </li>
        ))}
      </ol>

      <ul className="mt-6 flex flex-col gap-2 text-sm text-[#7E818A] sm:flex-row sm:flex-wrap sm:items-center sm:gap-7">
        {credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s) => (
          <div key={s.group} className="flex flex-col gap-3 bg-panel p-6">
            <h3 className="sec-label">{s.group}</h3>
            <ul className="flex flex-col gap-1.5">
              {s.items.map((i) => (
                <li key={i} className="text-[13.5px] leading-[1.5] text-muted">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const social = [
    { label: 'GitHub', href: profile.links.github, Icon: GitHub },
    { label: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedIn },
    ...(profile.links.upwork ? [{ label: 'Upwork', href: profile.links.upwork, Icon: Upwork }] : []),
    { label: 'Résumé, PDF', href: profile.links.resume, Icon: Download },
  ];

  return (
    <section id="contact" className="shell scroll-mt-20 pt-14 sm:pt-16">
      <div className="card relative overflow-hidden p-8 sm:p-12 lg:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-44 h-[460px] w-[460px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199,240,75,0.09) 0%, rgba(16,18,22,0) 70%)',
          }}
        />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex max-w-[620px] flex-col gap-4">
            <span className="sec-label">Contact</span>
            <h2 className="h-display text-[26px] leading-[1.18] sm:text-[32px] lg:text-[38px]">
              {profile.contactHeadline}
            </h2>
            <a
              href={`mailto:${profile.links.email}`}
              className="focusable mt-1 flex items-center gap-2.5 font-mono text-[15px] text-accent transition-opacity hover:opacity-80 sm:text-base"
            >
              <Mail className="h-4 w-4 shrink-0" />
              {profile.links.email}
            </a>
          </div>

          <div className="flex shrink-0 flex-col gap-2.5">
            {social.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="focusable flex min-w-[168px] items-center gap-2.5 rounded-lg border border-[#24262C] px-[18px] py-3 text-[14.5px] text-muted transition-colors hover:border-edge hover:text-ink"
              >
                <Icon />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="shell mt-11 flex flex-col gap-3 border-t border-line-soft py-8 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-mono text-[12.5px] text-faint">
        {profile.name} · {profile.role} · {profile.location}
      </span>
      <span className="font-mono text-[12.5px] text-faint">
        Built with Next.js, deployed on Vercel
      </span>
    </footer>
  );
}
