import { Link } from 'react-router-dom';
import { ArrowUpRight, Sprout } from 'lucide-react';
import { Hero } from '../components/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { Process } from '../components/Process';
import { Packages } from '../components/Packages';
import { CallToAction } from '../components/CallToAction';
import { images, services } from '../data/site';

export function Home() {
  return (
    <>
      <Hero />
      <div className="border-b border-line bg-sage [&_span]:font-display [&_span]:text-[24px] laptop:[&_span]:text-[20px] mobile:[&_span]:text-[18px] [&_span:first-child]:font-body [&_span:first-child]:text-[9px] [&_span:first-child]:font-medium tablet:[&_span:first-child]:w-full tablet:[&_span:first-child]:text-center mobile:[&_span:last-child]:w-full mobile:[&_span:last-child]:text-center [&_svg]:text-accent mobile:[&_svg]:size-[13px] mobile:[&_svg:last-of-type]:hidden [&>div]:flex [&>div]:min-h-[78px] [&>div]:items-center [&>div]:justify-between [&>div]:gap-5 tablet:[&>div]:flex-wrap tablet:[&>div]:justify-center tablet:[&>div]:gap-x-[22px] tablet:[&>div]:gap-y-3 tablet:[&>div]:py-4.5 mobile:[&>div]:gap-x-3 mobile:[&>div]:gap-y-2">
        <div className="mx-auto w-[min(1240px,calc(100%-112px))] laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)]">
          <span>GOOD FOOD BRINGS US TOGETHER</span>
          <span>Weddings</span>
          <Sprout size={17} aria-hidden="true" />
          <span>Corporate gatherings</span>
          <Sprout size={17} aria-hidden="true" />
          <span>Private celebrations</span>
        </div>
      </div>
      <section className="py-25 mobile:py-16" id="offerings" tabIndex={-1}>
        <div className="mx-auto w-[min(1240px,calc(100%-112px))] laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)]">
          <SectionHeading
            eyebrow="A LITTLE TASTE OF WHAT WE DO"
            title={
              <>
                Every occasion deserves
                <br />
                <i>something delicious.</i>
              </>
            }
          >
            <Link
              className="text-link inline-flex min-h-11 w-fit items-center gap-3 border-b border-green text-[13px] font-medium transition-[color,gap,border-color] duration-180 ease-[ease] hover:gap-4.5 hover:border-accent hover:text-accent"
              to="/services"
            >
              Discover our catering <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </SectionHeading>
          <div className="grid grid-cols-3 gap-7 tablet:gap-4.5 mobile:grid-cols-1 mobile:gap-10">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-canvas py-25 mobile:py-16">
        <div className="mx-auto grid w-[min(1240px,calc(100%-112px))] grid-cols-[1.05fr_0.95fr] items-center gap-[90px] laptop:w-[calc(100%-72px)] laptop:gap-[50px] tablet:gap-[35px] mobile:w-[calc(100%-40px)] mobile:grid-cols-1 mobile:gap-[34px]">
          <div className="relative [&_img]:aspect-[1.1] [&_img]:object-cover mobile:[&_img]:aspect-[1.2] [&>span]:absolute [&>span]:bottom-0 [&>span]:left-0 [&>span]:bg-green [&>span]:px-[22px] [&>span]:py-[13px] [&>span]:text-[9px] [&>span]:text-paper">
            <img
              src={images.kitchen}
              alt="A pastry chef dusting freshly prepared pastries with icing sugar"
              loading="lazy"
              width="1200"
              height="800"
            />
            <span>FROM OUR KITCHEN, WITH CARE.</span>
          </div>
          <div className="[&_.text-link]:mt-2 [&_h2]:mb-6 [&>p:not(.eyebrow)]:mb-4.5 [&>p:not(.eyebrow)]:text-sm">
            <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
              THE HEART OF HARVEST & GRACE
            </p>
            <h2>
              Good food.
              <br />
              Even better <i>company.</i>
            </h2>
            <p>
              We believe the most memorable gatherings begin with something simple: a table, a
              little generosity, and food made with care.
            </p>
            <p>
              Rooted in Ghana and inspired by the joy of sharing, we bring a personal touch to every
              pastry, plate, and celebration.
            </p>
            <Link
              className="text-link inline-flex min-h-11 w-fit items-center gap-3 border-b border-green text-[13px] font-medium transition-[color,gap,border-color] duration-180 ease-[ease] hover:gap-4.5 hover:border-accent hover:text-accent"
              to="/about"
            >
              A little about us <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section
        className="border-y border-line py-[42px] mobile:py-8"
        aria-label="Harvest and Grace in numbers"
      >
        <dl className="mx-auto grid w-[min(1240px,calc(100%-112px))] grid-cols-4 laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)] mobile:grid-cols-2 mobile:gap-y-8 [&_dd]:font-display [&_dd]:text-[58px] [&_dd]:leading-none mobile:[&_dd]:text-[50px] [&_dd_span]:text-[40px] [&_dd_span]:text-accent [&_dt]:text-[11px] [&_dt]:text-muted mobile:[&_dt]:text-[10px] [&>div]:flex [&>div]:flex-col-reverse [&>div]:items-center [&>div]:gap-2.5 [&>div]:border-r [&>div]:border-line [&>div:last-child]:border-0 mobile:[&>div:nth-child(2)]:border-0">
          <div>
            <dt>Events catered</dt>
            <dd>
              200<span>+</span>
            </dd>
          </div>
          <div>
            <dt>Cities served</dt>
            <dd>
              10<span>+</span>
            </dd>
          </div>
          <div>
            <dt>Satisfaction rate</dt>
            <dd>
              95<span>%</span>
            </dd>
          </div>
          <div>
            <dt>Years of excellence</dt>
            <dd>15</dd>
          </div>
        </dl>
      </section>
      <Process />
      <section className="py-25 pb-5 mobile:py-16 mobile:pb-0" id="gallery" tabIndex={-1}>
        <div className="mx-auto w-[min(1240px,calc(100%-112px))] laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)]">
          <SectionHeading
            eyebrow="FRESH FROM THE KITCHEN"
            title={
              <>
                A feast for <i>your eyes.</i>
              </>
            }
            description="Flaky layers. Beautiful little details. Food worth gathering around."
          />
          <div className="grid grid-cols-[1.35fr_0.85fr_1fr] items-start gap-[22px] mobile:grid-cols-2 mobile:gap-4 [&_figcaption]:mt-3 [&_figcaption]:text-[10px] [&_figcaption]:text-muted mobile:[&_figcaption]:text-[9px] mobile:[&_figure_img]:aspect-[0.8] mobile:[&_figure:first-child]:col-span-full mobile:[&_figure:first-child_img]:aspect-[1.5] [&_figure:nth-child(2)]:mt-16 mobile:[&_figure:nth-child(2)]:mt-0 [&_figure:nth-child(2)_img]:aspect-[0.75] mobile:[&_figure:nth-child(2)_img]:aspect-[0.8] [&_figure:nth-child(3)]:mt-6 mobile:[&_figure:nth-child(3)]:mt-0 [&_img]:aspect-[0.95] [&_img]:object-cover">
            <figure>
              <img
                src={images.pastries}
                alt="Rows of handmade pastries and fresh fruit tartlets"
                loading="lazy"
                width="1600"
                height="1067"
              />
              <figcaption>Little bites, lasting impressions.</figcaption>
            </figure>
            <figure>
              <img
                src={images.dessert}
                alt="A sweet creation from the pastry collection"
                loading="lazy"
                width="800"
                height="1000"
              />
              <figcaption>Something for your sweet side.</figcaption>
            </figure>
            <figure>
              <img
                src={images.muffins}
                alt="Freshly baked muffins on a serving plate"
                loading="lazy"
                width="1600"
                height="1067"
              />
              <figcaption>Baked with a little extra care.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <Packages />
      <CallToAction />
    </>
  );
}
