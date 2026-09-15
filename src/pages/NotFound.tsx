import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
export function NotFound() {
  return (
    <section className="mx-auto min-h-[65vh] w-[min(1240px,calc(100%-112px))] pt-[68px] pb-15 laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)] mobile:pt-11 mobile:pb-[38px] [&_.button]:mt-[22px] [&_.text-link]:mt-[22px] [&_h1]:mb-6 [&_h1]:max-w-[1000px] [&_h1_i]:text-green-hover [&>p:not(.eyebrow)]:max-w-[520px] [&>p:not(.eyebrow)]:text-[15px] mobile:[&>p:not(.eyebrow)]:text-sm">
      <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
        404 / PAGE NOT FOUND
      </p>
      <h1>
        A little off
        <br />
        <i>the menu.</i>
      </h1>
      <p>We couldn't find that page. There is plenty to discover back at the table.</p>
      <Link
        className="button inline-flex min-h-[50px] items-center justify-center gap-3.5 rounded-sm border border-green bg-green px-[22px] py-[13px] text-center text-[13px] leading-normal font-medium text-paper transition-[background,border-color,transform] duration-180 ease-[ease] hover:-translate-y-0.5 hover:border-green-hover hover:bg-green-hover active:translate-y-0"
        to="/"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}
