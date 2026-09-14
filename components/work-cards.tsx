import Image from 'next/image';
import Link from 'next/link';
import type { Work } from '@/content/work';
import { ArrowRight } from './icons';

function Metric({ value, note }: { value: string; note: string }) {
  return (
    <div className="flex items-baseline gap-3 border-t border-line pt-[18px]">
      <span className="font-display text-[25px] font-semibold tracking-[-0.03em] text-ink sm:text-[27px]">
        {value}
      </span>
      <span className="text-[13px] leading-[1.5] text-dim sm:text-[13.5px]">{note}</span>
    </div>
  );
}

function Tags({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className={
            accent
              ? 'rounded-[5px] border border-accent/20 bg-accent/[0.08] px-[9px] py-[5px] font-mono text-[11px] text-accent'
              : 'rounded-[5px] border border-[#24262C] bg-[#16181C] px-[9px] py-[5px] font-mono text-[11px] text-muted'
          }
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Provenance line. Says whether a visitor is looking at a shipped system or a
 *  reference build, and surfaces the live host before anyone has to click. */
function Status({ item }: { item: Work }) {
  if (!item.status) return null;
  return (
    <div className="-mt-2 flex flex-wrap items-center gap-2 text-[13px]">
      <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
      <span className="text-ink">{item.status}</span>
      {item.live && (
        <>
          <span aria-hidden="true" className="text-faint">
            ·
          </span>
          <span className="font-mono text-[12.5px] text-dim">{item.live.label}</span>
        </>
      )}
    </div>
  );
}

function ReadLink({ slug }: { slug: string }) {
  return (
    <span className="mt-0.5 flex items-center gap-2 text-[14.5px] font-medium text-accent">
      Read the case study
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </span>
  );
}

function CardHead({ index, kicker }: { index: string; kicker: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-mono text-xs text-accent">{index}</span>
      <span className="sec-label text-right">{kicker}</span>
    </div>
  );
}

export function FeaturedCard({ item }: { item: Work }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={`focusable group card grid grid-cols-1 overflow-hidden transition-colors hover:border-edge ${
        item.shot ? 'lg:grid-cols-2' : ''
      }`}
    >
      <div className="flex flex-col gap-[18px] p-7 sm:p-8">
        <CardHead index={item.index} kicker={item.kicker} />
        <h3 className="h-display text-[25px] sm:text-[28px]">{item.title}</h3>
        <Status item={item} />
        <p className="max-w-[62ch] text-[14.8px] leading-[1.65] text-muted">{item.summary}</p>
        <Tags items={item.tags} accent />
        {item.metric && <Metric value={item.metric.value} note={item.metric.note} />}
        <ul className="flex flex-wrap gap-[7px]">
          {item.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <ReadLink slug={item.slug} />
      </div>

      {item.shot && (
        <div className="relative order-first min-h-[220px] border-b border-line bg-panel lg:order-last lg:border-b-0 lg:border-l">
          <Image
            src={item.shot.src}
            alt={item.shot.alt}
            width={1400}
            height={657}
            className="h-full w-full object-cover object-left-top"
          />
        </div>
      )}
    </Link>
  );
}

export function WorkCard({ item }: { item: Work }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="focusable group card flex flex-col gap-[18px] p-7 transition-colors hover:border-edge sm:p-[30px]"
    >
      <CardHead index={item.index} kicker={item.kicker} />
      <h3 className="h-display text-[22px] sm:text-[25px]">{item.title}</h3>
      <Status item={item} />
      <p className="flex-grow text-[14.8px] leading-[1.65] text-muted">{item.summary}</p>
      <Tags items={item.tags} />
      {item.metric && <Metric value={item.metric.value} note={item.metric.note} />}
      <ul className="flex flex-wrap gap-[7px]">
        {item.stack.slice(0, 5).map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>
      <ReadLink slug={item.slug} />
    </Link>
  );
}
