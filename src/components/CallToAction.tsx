import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export function CallToAction() {
  return (
    <section className="bg-green py-[74px] text-paper mobile:py-14">
      <div className="mx-auto flex w-[min(1240px,calc(100%-112px))] items-center justify-between gap-15 laptop:w-[calc(100%-72px)] tablet:flex-col tablet:items-start tablet:gap-7 mobile:w-[calc(100%-40px)] [&_.eyebrow]:text-apricot [&_h2]:text-[58px] [&_h2]:font-normal laptop:[&_h2]:text-[48px] mobile:[&_h2]:text-[42px] [&_h2_i]:text-sage-dark [&_p:not(.eyebrow)]:mb-6 [&_p:not(.eyebrow)]:text-[13px] [&_p:not(.eyebrow)]:text-light-muted">
        <div>
          <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
            SOMETHING GOOD STARTS HERE
          </p>
          <h2>
            Bring your people.
            <br />
            <i>We'll bring the flavour.</i>
          </h2>
        </div>
        <div>
          <p>
            A wedding, a milestone, or just because.
            <br />
            Let's make it a gathering to remember.
          </p>
          <Link
            className="button inline-flex min-h-[50px] items-center justify-center gap-3.5 rounded-sm border border-paper bg-paper px-[22px] py-[13px] text-center text-[13px] leading-normal font-medium text-green transition-[background,border-color,transform] duration-180 ease-[ease] hover:-translate-y-0.5 hover:border-sage hover:bg-sage active:translate-y-0"
            to="/contact"
          >
            Plan your occasion <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
