import type { Metadata } from 'next';
import { Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';
import { profile } from '@/content/profile';
import './globals.css';

/*  Two families, down from three.
 *
 *  Source Serif 4 is a variable face, so one file covers 400 and 600 and the
 *  display sizes get real optical sizing. IBM Plex Mono carries every number,
 *  label and figure reference. Space Grotesk and IBM Plex Sans are gone: the
 *  old site preloaded four woff2 files at render-critical priority, 10 KB of
 *  which was a weight nothing on the page used. */

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
});

const TITLE = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: TITLE, template: `%s — ${profile.name}` },
  description: profile.headlinePlain,
  keywords: [
    'Platform Engineer', 'Forward-Deployed Engineer', 'Kubernetes', 'GPU inference',
    'vLLM', 'AWS', 'GCP', 'Terraform', 'OpenTofu', 'observability', 'cloud cost',
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: profile.siteUrl },
  openGraph: {
    type: 'profile',
    locale: 'en_GB',
    url: profile.siteUrl,
    siteName: TITLE,
    title: TITLE,
    description: profile.headlinePlain,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: profile.headlinePlain,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: `mailto:${profile.links.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
  sameAs: [profile.links.linkedin, profile.links.upwork].filter(Boolean),
  knowsAbout: [
    'Kubernetes', 'GPU inference', 'vLLM', 'Terraform', 'OpenTofu',
    'Amazon Web Services', 'Google Cloud', 'Observability', 'Cloud cost optimisation',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-serif antialiased">
        {/* First tab stop on every page. The old site had none, so a keyboard
            user crossed the whole nav before reaching anything. */}
        <a
          href="#main"
          className="focusable sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
                     focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        {/* The entire motion system's JavaScript. Observes sections, adds one
            class. Content is never hidden by it: the resting opacity is .001
            and the rule set lives behind prefers-reduced-motion. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var n=document.querySelectorAll('[data-reveal]');if(!('IntersectionObserver'in window)){n.forEach(function(e){e.classList.add('is-in')});return;}
var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');o.unobserve(e.target);}})},{rootMargin:'0px 0px -12% 0px'});
n.forEach(function(e){o.observe(e)});}catch(e){document.querySelectorAll('[data-reveal]').forEach(function(x){x.classList.add('is-in')});}})();`,
          }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
