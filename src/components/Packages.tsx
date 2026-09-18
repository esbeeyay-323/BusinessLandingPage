import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { packages } from '../data/site';
import { SectionHeading } from './SectionHeading';
export function Packages() {
  return (
    <section className="py-25 mobile:py-16" id="packages" tabIndex={-1}>
      <div className="mx-auto w-[min(1240px,calc(100%-112px))] laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)]">
        <SectionHeading
          eyebrow="ROOM AT EVERY TABLE"
          title="A good place to start."
          description="From a beautifully simple menu to an entirely personal experience. We will find the right fit together."
        />
        <div className="grid grid-cols-3 gap-6 tablet:grid-cols-1">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`flex flex-col rounded-sm border border-line p-8 laptop:p-6.25 tablet:p-8 tiny:p-5.5 [&_.button]:mt-3 [&_.button]:text-xs tablet:[&_.button]:self-start [&_.eyebrow]:mb-3.5 [&_.eyebrow]:text-[9px] [&_h3]:mb-3.75 [&_h3]:text-[36px] [&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:text-xs [&_li_svg]:mt-[3px] [&_ul]:mb-auto [&_ul]:grid [&_ul]:list-none [&_ul]:gap-3 [&_ul]:border-t [&_ul]:border-line [&_ul]:px-0 [&_ul]:py-6 [&>p:not(.eyebrow)]:min-h-[68px] [&>p:not(.eyebrow)]:text-[13px] tablet:[&>p:not(.eyebrow)]:min-h-0 ${item.featured ? '[&]:border-green [&]:bg-green [&]:text-paper [&_.eyebrow]:text-apricot [&_.package-price_span]:text-light-muted [&_p]:text-light-muted [&_ul]:border-line-dark' : ''}`}
            >
              <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
                {item.label}
              </p>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="package-price py-6.5 font-display text-[48px] leading-[1.1] [&_span]:mt-[7px] [&_span]:block [&_span]:font-body [&_span]:text-[11px] [&_span]:leading-[1.6] [&_span]:text-muted">
                {item.price}
                <span>{item.unit}</span>
              </div>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                className={`button inline-flex min-h-12.5 items-center justify-center gap-3.5 rounded-sm border px-5.5 py-3.25 text-center text-[13px] leading-normal font-medium transition-[background,border-color,transform] duration-180 ease-[ease] hover:-translate-y-0.5 active:translate-y-0 ${item.featured ? 'border-paper bg-paper text-green hover:border-sage hover:bg-sage' : 'border-line bg-transparent text-green hover:border-green hover:bg-sage'}`}
                to={`/contact?package=${encodeURIComponent(item.name)}`}
              >
                Let's talk {item.name.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-[22px] text-[11px]">
          Starting prices are in USD. Your final quote reflects your menu, guest count, and event
          requirements.
        </p>
      </div>
    </section>
  );
}
