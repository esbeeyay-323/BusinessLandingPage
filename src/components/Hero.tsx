import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { images } from '../data/site';

export function Hero() {
  return (
    <section
      className="relative isolate bg-hero-bg text-paper tiny:[&_.button]:px-4 tiny:[&_.button]:text-xs laptop:[&_.button-row]:gap-4.5 mobile:[&_.button-row]:gap-x-6 mobile:[&_.button-row]:gap-y-2.5 [&_.eyebrow]:mb-6 [&_.eyebrow]:text-apricot mobile:[&_.eyebrow]:max-w-[230px] mobile:[&_.eyebrow]:text-[9px] short-mobile:[&_.eyebrow]:mb-[15px] short-desktop:[&_.eyebrow]:mb-4.5 [&_h1]:mb-[22px] [&_h1]:text-[96px] [&_h1]:leading-[0.91] [&_h1]:font-normal laptop:[&_h1]:text-[84px] mobile:[&_h1]:text-[73px] tiny:[&_h1]:text-[65px] short-mobile:[&_h1]:mb-[15px] short-mobile:[&_h1]:text-[58px] short-desktop:[&_h1]:text-[76px] [&_h1_i]:text-apricot [&_h1_span]:mt-[26px] [&_h1_span]:block [&_h1_span]:font-display [&_h1_span]:text-[28px] [&_h1_span]:leading-[1.25] mobile:[&_h1_span]:max-w-[300px] mobile:[&_h1_span]:text-[25px] short-mobile:[&_h1_span]:mt-4 short-mobile:[&_h1_span]:text-[22px] short-desktop:[&_h1_span]:mt-4.5"
      aria-labelledby="hero-title"
    >
      <picture className="absolute inset-0 -z-3 overflow-hidden [&_img]:ml-auto [&_img]:h-full [&_img]:w-[78%] [&_img]:object-contain [&_img]:object-right wide:[&_img]:w-[76%] tablet:[&_img]:w-full tablet:[&_img]:object-cover tablet:[&_img]:object-[45%_center] mobile:[&_img]:object-[62%_center]">
        <source media="(max-width: 600px)" srcSet={images.heroMobile} />
        <img
          src={images.hero}
          alt="Golden pastries, ready to share"
          fetchPriority="high"
          width="2200"
          height="1233"
        />
      </picture>
      <div className="absolute inset-0 -z-2 bg-[linear-gradient(90deg,var(--color-hero-shade)_0%,var(--color-hero-shade)_23%,var(--color-hero-clear)_65%)] tablet:bg-[linear-gradient(90deg,var(--color-hero-shade),var(--color-hero-clear))] mobile:bg-[linear-gradient(90deg,var(--color-hero-shade)_0%,var(--color-hero-shade)_12%,var(--color-hero-clear)_125%)]" />
      <div className="mx-auto flex min-h-[min(660px,calc(100svh-160px))] w-[min(1240px,calc(100%-112px))] flex-col justify-between pt-[66px] wide:min-h-[min(730px,calc(100svh-170px))] laptop:w-[calc(100%-72px)] tablet:min-h-[660px] tablet:pt-[65px] mobile:min-h-[610px] mobile:w-[calc(100%-40px)] mobile:pt-11 short-mobile:min-h-0 short-mobile:pt-7 short-desktop:min-h-[530px] short-desktop:pt-[35px]">
        <div className="max-w-[590px] pb-[50px] laptop:max-w-[535px] mobile:pb-10 short-mobile:pb-5 short-desktop:pb-[22px] [&>p:not(.eyebrow)]:mb-7 [&>p:not(.eyebrow)]:max-w-[385px] [&>p:not(.eyebrow)]:text-sm [&>p:not(.eyebrow)]:text-light-muted mobile:[&>p:not(.eyebrow)]:max-w-[310px] mobile:[&>p:not(.eyebrow)]:text-[13px] short-mobile:[&>p:not(.eyebrow)]:mb-4">
          <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
            GHANAIAN ROOTS. GENEROUS HOSPITALITY.
          </p>
          <h1 id="hero-title">
            Harvest
            <br />
            <i>&</i> Grace<span>Catering for the moments that matter.</span>
          </h1>
          <p>
            Beautiful food, thoughtfully made. From the first conversation to the last bite, we
            bring your people together.
          </p>
          <div className="button-row flex flex-wrap items-center gap-[26px]">
            <Link
              className="button inline-flex min-h-[50px] items-center justify-center gap-3.5 rounded-sm border border-accent bg-accent px-[22px] py-[13px] text-center text-[13px] leading-normal font-medium text-paper transition-[background,border-color,transform] duration-180 ease-[ease] hover:-translate-y-0.5 hover:border-accent-hover hover:bg-accent-hover active:translate-y-0"
              to="/contact"
            >
              Let's plan something special <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link
              className="inline-flex min-h-11 items-center text-xs underline hover:text-apricot"
              to="/services"
            >
              Explore our catering
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line-dark py-5 text-[9px] text-light-muted mobile:py-3 mobile:text-[8px] short-mobile:py-2 [&_a]:flex [&_a]:min-h-7 [&_a]:items-center [&_a]:gap-2.5 mobile:[&>span:first-child]:hidden">
          <span>GATHER WELL. EAT BEAUTIFULLY.</span>
          <a href="#offerings" aria-label="Discover our catering">
            <ArrowDown size={18} aria-hidden="true" /> A taste of what we do
          </a>
          <span>EST. 2011</span>
        </div>
      </div>
    </section>
  );
}
