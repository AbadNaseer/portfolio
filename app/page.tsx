import { Masthead, MobileBar } from '@/components/nav';
import { DocHead, Contents, Faults, Positions, Colophon, Footer } from '@/components/doc';

export default function Home() {
  return (
    <>
      <Masthead />
      <main id="main">
        <DocHead />
        <Contents />
        <Faults />
        <Positions />
        <Colophon />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
