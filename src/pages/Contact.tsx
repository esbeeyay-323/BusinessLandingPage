import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { images, site } from '../data/site';

export function Contact() {
  const location = useLocation();
  return (
    <>
      <section className="mx-auto w-[min(1240px,calc(100%-112px))] pt-[68px] pb-15 pb-[55px] laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)] mobile:pt-11 mobile:pb-[38px] [&_.button]:mt-[22px] [&_.text-link]:mt-[22px] [&_h1]:mb-6 [&_h1]:max-w-[1000px] [&_h1_i]:text-green-hover [&>p:not(.eyebrow)]:max-w-[520px] [&>p:not(.eyebrow)]:text-[15px] mobile:[&>p:not(.eyebrow)]:text-sm">
        <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
          LET'S MAKE SOMETHING MEMORABLE
        </p>
        <h1>
          A good gathering
          <br />
          <i>starts with hello.</i>
        </h1>
        <p>A few details, a little inspiration, and we will take it from there.</p>
      </section>
      <section
        className="mx-auto grid w-[min(1240px,calc(100%-112px))] grid-cols-[0.85fr_1.15fr] gap-[90px] pb-25 laptop:w-[calc(100%-72px)] laptop:gap-10 tablet:grid-cols-1 tablet:gap-10 mobile:w-[calc(100%-40px)] mobile:pb-16"
        aria-label="Get in touch"
      >
        <aside className="pr-[30px] laptop:pr-0 tablet:grid tablet:grid-cols-2 tablet:gap-x-10 tablet:gap-y-4 mobile:block [&_.text-link]:text-xs tablet:[&_.text-link]:col-start-1 [&_address]:my-8 [&_address]:grid [&_address]:gap-6 [&_address]:not-italic tablet:[&_address]:col-start-1 tablet:[&_address]:my-2.5 mobile:[&_address]:my-7 [&_address_.location-note]:mt-1 [&_address_.location-note]:mb-0 [&_address_.location-note]:text-xs [&_address_a:hover]:underline [&_address_small]:mb-[5px] [&_address_small]:block [&_address_small]:text-[9px] [&_address_small]:text-muted [&_address_span]:min-w-0 [&_address_span]:text-sm [&_address_span]:wrap-anywhere [&_address_svg]:mt-1 [&_address_svg]:text-accent [&_address>div]:flex [&_address>div]:items-start [&_address>div]:gap-4.5 [&_h2]:mb-5 [&_h2]:text-[36px] mobile:[&_h2]:text-[32px] [&>p]:max-w-[350px] [&>p]:text-[13px] tablet:[&>p]:max-w-none">
          <h2>
            We'd love to hear
            <br />
            what you're dreaming of.
          </h2>
          <p>
            From a box of pastries to the biggest day on your calendar, there is room for your idea
            at our table.
          </p>
          <address>
            <div>
              <Mail size={20} aria-hidden="true" />
              <span>
                <small>DROP US A NOTE</small>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </div>
            <div>
              <Phone size={20} aria-hidden="true" />
              <span>
                <small>LET'S TALK</small>
                <a href={site.phoneHref}>{site.phone}</a>
              </span>
            </div>
            <div>
              <MapPin size={20} aria-hidden="true" />
              <span>
                <small>OUR ROOTS</small>
                {site.location}
                <small className="location-note">Tell us where you're gathering.</small>
              </span>
            </div>
          </address>
          <a
            className="text-link inline-flex min-h-11 w-fit items-center gap-3 border-b border-green text-[13px] font-medium transition-[color,gap,border-color] duration-180 ease-[ease] hover:gap-4.5 hover:border-accent hover:text-accent"
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chat on WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <img
            className="mt-9 aspect-[1.7] object-cover tablet:col-start-2 tablet:row-start-2 tablet:row-end-5 tablet:m-0 tablet:aspect-auto tablet:h-full mobile:mt-7 mobile:aspect-[1.8] mobile:h-auto"
            src={images.pastries}
            alt="Fresh fruit tartlets and pastries, ready to share"
            width="1600"
            height="1067"
            loading="lazy"
          />
          <p className="tablet:col-span-full [&]:mt-2.5 [&]:text-[10px]">
            Sample contact details for this demo.
          </p>
        </aside>
        <ContactForm key={location.search} />
      </section>
    </>
  );
}
