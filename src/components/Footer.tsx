import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './Brand';
import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="bg-canvas pt-16 mobile:pt-[46px]">
      <div className="mx-auto grid w-[min(1240px,calc(100%-112px))] grid-cols-[1.5fr_0.8fr_0.9fr_1.25fr] gap-[34px] pb-[50px] laptop:w-[calc(100%-72px)] laptop:grid-cols-[1.3fr_0.8fr_0.8fr] mobile:w-[calc(100%-40px)] mobile:grid-cols-2 mobile:gap-x-5 mobile:gap-y-8 [&_.brand]:gap-2 [&_.brand]:text-[24px] [&_.brand-mark]:w-7 [&_.eyebrow]:text-[9px] [&_h2]:mb-4.5 [&_h2]:font-body [&_h2]:text-xs [&_h2]:font-semibold [&_p]:mt-[22px] [&_p]:mb-4.5 [&_p]:text-xs mobile:[&>div:first-child]:col-span-full [&>div>a:hover]:text-accent [&>div>a:not(.brand)]:block [&>div>a:not(.brand)]:min-h-[30px] [&>div>a:not(.brand)]:w-fit [&>div>a:not(.brand)]:text-xs [&>div>a:not(.brand)]:wrap-anywhere [&>div>a:not(.brand)]:text-muted">
        <div>
          <Brand />
          <p>
            Good food. Warm hospitality.
            <br />A little grace in every gathering.
          </p>
          <span className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
            Powered by SBA
          </span>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/about">Our story</Link>
          <Link to="/services">Catering & menus</Link>
          <Link to="/#gallery">From our kitchen</Link>
          <Link to="/contact">Get in touch</Link>
        </div>
        <div>
          <h2>Your occasion</h2>
          <Link to="/contact?event=Wedding">Weddings</Link>
          <Link to="/contact?event=Corporate%20event">Corporate events</Link>
          <Link to="/contact?event=Private%20dining">Private dining</Link>
          <Link to="/contact?event=Pastries%20%26%20pies">Pastries & pies</Link>
        </div>
        <div className="laptop:col-span-full [&_svg]:ml-[3px] [&_svg]:inline-block [&_svg]:align-middle laptop:[&>a:not(.brand)]:mr-[25px]">
          <h2>Let's talk</h2>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer">
            Connect on WhatsApp <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="mx-auto flex w-[min(1240px,calc(100%-112px))] justify-between gap-4 border-t border-line py-5 text-[10px] text-muted laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)] mobile:flex-col mobile:gap-1">
        <span>
          &copy; {new Date().getFullYear()} {site.name}
        </span>
        <span>For life's most memorable moments.</span>
      </div>
    </footer>
  );
}
