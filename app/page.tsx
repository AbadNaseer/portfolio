import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { FeaturedCard, WorkCard } from '@/components/work-cards';
import { OpenSource, Experience, Contact, Footer, SectionHead } from '@/components/sections';
import { work } from '@/content/work';

export default function Home() {
  const featured = work.filter((w) => w.featured);
  const rest = work.filter((w) => !w.featured);

  return (
    <>
      <Nav />
      <main>
        <Hero />

        <section id="work" className="shell scroll-mt-20 py-14 sm:py-16">
          <SectionHead
            label="Selected work"
            title="Five things worth reading about"
            aside={
              <p className="max-w-[300px] text-[14.5px] leading-[1.6] text-dim sm:text-right">
                Every number below was measured, not estimated.
              </p>
            }
          />

          <div className="flex flex-col gap-5">
            {featured.map((item) => (
              <FeaturedCard key={item.slug} item={item} />
            ))}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {rest.map((item) => (
                <WorkCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <OpenSource />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
