import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '../data/site';
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article>
      <Link
        className="relative block aspect-4/3 overflow-hidden rounded-sm [&_img]:h-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-400 [&_img]:ease-[ease] hover:[&_img]:scale-[1.035]"
        to={`/services#${service.id}`}
        aria-label={`Explore ${service.title}`}
      >
        <img src={service.image} alt={service.alt} loading="lazy" width="800" height="600" />
        <span className="absolute top-3 left-4 grid size-[43px] place-items-center rounded-full bg-green font-display text-[32px] leading-none text-paper">
          {service.number}
        </span>
        <span className="absolute right-3.5 bottom-3.5 grid size-[42px] place-items-center rounded-full bg-paper text-green">
          <ArrowUpRight size={22} aria-hidden="true" />
        </span>
      </Link>
      <div className="pt-[25px] [&_.eyebrow]:mb-2.5 [&_.eyebrow]:text-[10px] [&_h3]:mb-3 [&_h3]:text-[28px] tablet:[&_h3]:text-[25px] mobile:[&_h3]:text-[30px] [&_h3_a:hover]:text-accent [&>p:not(.eyebrow)]:text-[13px] [&>p:not(.eyebrow)]:leading-[1.8]">
        <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
          {service.category}
        </p>
        <h3>
          <Link to={`/services#${service.id}`}>{service.title}</Link>
        </h3>
        <p>{service.description}</p>
        <span className="mt-4.5 block text-xs font-medium text-green">{service.detail}</span>
      </div>
    </article>
  );
}
