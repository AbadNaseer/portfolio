import Link from 'next/link';
import { Masthead } from '@/components/nav';
import { Footer } from '@/components/doc';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <>
      <Masthead />
      <main id="main" className="shell py-24 sm:py-32">
        <p className="label">Error 404</p>
        <h1 className="display mt-6 max-w-[20ch] text-2xl sm:text-3xl">
          There is no page at this address.
        </h1>
        <p className="prose-body mt-6">
          The link may be old, or I may have moved something. The work index is the
          best place to start.
        </p>
        <Link
          href="/#work"
          className="focusable mt-8 inline-block border-b border-mark font-mono text-sm text-mark hover:bg-mark-wash"
        >
          Selected work →
        </Link>
      </main>
      <Footer />
    </>
  );
}
