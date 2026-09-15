import { Heart, Leaf, HandHeart } from 'lucide-react';
import { images } from '../data/site';
import { SectionHeading } from '../components/SectionHeading';
import { CallToAction } from '../components/CallToAction';

const values = [
  {
    icon: Leaf,
    title: 'Care in the craft',
    description:
      'We give the little details their due, from a well-made pastry to a menu that feels right for the season and the occasion.',
  },
  {
    icon: Heart,
    title: 'Hospitality with heart',
    description:
      'Good service makes people feel at home. We approach every gathering with warmth, attention, and respect for your guests.',
  },
  {
    icon: HandHeart,
    title: 'Your table, your story',
    description:
      'We listen first. Your tastes, traditions, and dietary needs help shape an experience that belongs to you.',
  },
];

export function About() {
  return (
    <>
      <section className="mx-auto w-[min(1240px,calc(100%-112px))] pt-[68px] pb-15 laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)] mobile:pt-11 mobile:pb-[38px] [&_.button]:mt-[22px] [&_.text-link]:mt-[22px] [&_h1]:mb-6 [&_h1]:max-w-[1000px] [&_h1_i]:text-green-hover [&>p:not(.eyebrow)]:max-w-[520px] [&>p:not(.eyebrow)]:text-[15px] mobile:[&>p:not(.eyebrow)]:text-sm">
        <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
          OUR STORY
        </p>
        <h1>
          Harvest & Grace.
          <br />
          <i>A generous spirit.</i>
        </h1>
        <p>Rooted in Ghana. Brought to life around your table.</p>
      </section>
      <div className="h-[440px] w-full overflow-hidden mobile:h-[300px] [&_img]:h-full [&_img]:object-cover [&_img]:object-[center_45%]">
        <img
          src={images.kitchen}
          alt="A chef finishing handmade pastries in the kitchen"
          width="1200"
          height="800"
          fetchPriority="high"
        />
      </div>
      <section className="py-25 mobile:py-16">
        <div className="mx-auto grid w-[min(1240px,calc(100%-112px))] grid-cols-[1fr_1.15fr] gap-25 laptop:w-[calc(100%-72px)] tablet:gap-[45px] mobile:w-[calc(100%-40px)] mobile:grid-cols-1 mobile:gap-[34px]">
          <div>
            <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
              WHY WE GATHER
            </p>
            <h2>
              A meal is never
              <br />
              <i>just a meal.</i>
            </h2>
          </div>
          <div className="[&_.lead]:font-display [&_.lead]:text-[30px] [&_.lead]:leading-[1.4] [&_.lead]:text-ink mobile:[&_.lead]:text-[28px] [&_p]:mb-[22px]">
            <p className="lead">
              It is a reason to pause. To celebrate a milestone. To turn a room of people into a
              table of friends.
            </p>
            <p>
              That is the idea at the heart of Harvest & Grace. Our work brings handcrafted food and
              thoughtful hospitality to weddings, corporate events, private dinners, and everyday
              celebrations across Ghana.
            </p>
            <p>
              From pastries to a complete dining experience, we put care into what is on the plate
              and how it arrives at the table. We collaborate with you on the menu, then handle the
              details so you can enjoy the people you brought together.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-green py-[88px] text-center text-paper mobile:py-[58px] [&_.eyebrow]:text-apricot [&_h2]:font-normal mobile:[&_h2]:text-[36px] [&_h2_i]:text-sage-dark">
        <div className="mx-auto w-[min(1240px,calc(100%-112px))] laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)]">
          <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
            OUR MISSION
          </p>
          <h2>
            To bring people closer
            <br />
            through food made with care
            <br />
            <i>and hospitality that feels personal.</i>
          </h2>
        </div>
      </section>
      <section className="py-25 mobile:py-16">
        <div className="mx-auto w-[min(1240px,calc(100%-112px))] laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)]">
          <SectionHeading eyebrow="WHAT WE BRING TO THE TABLE" title="Our values, in practice." />
          <div className="grid grid-cols-3 gap-[50px] tablet:gap-7 mobile:grid-cols-1 mobile:gap-[34px] [&_article]:border-t [&_article]:border-line [&_article]:pt-7 mobile:[&_article]:pt-6 [&_h3]:mb-4.5 [&_p]:text-[13px] [&_svg]:mb-5 [&_svg]:text-accent">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title}>
                <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-sage py-25 mobile:py-16">
        <div className="mx-auto grid w-[min(1240px,calc(100%-112px))] grid-cols-[1.05fr_0.95fr] items-center gap-[90px] laptop:w-[calc(100%-72px)] laptop:gap-[50px] tablet:gap-[35px] mobile:w-[calc(100%-40px)] mobile:grid-cols-1 mobile:gap-[34px]">
          <div className="[&_.text-link]:mt-2 [&_h2]:mb-6 [&>p:not(.eyebrow)]:mb-4.5 [&>p:not(.eyebrow)]:text-sm">
            <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
              MANY HANDS. ONE SHARED PURPOSE.
            </p>
            <h2>
              The care behind
              <br />
              <i>every occasion.</i>
            </h2>
            <p>
              Great gatherings are a team effort. From planning to the last plate, every part of the
              experience deserves attention.
            </p>
            <dl className="mt-7 [&_dd]:mt-1 [&_dd]:text-xs [&_dd]:text-muted [&_dt]:text-[13px] [&_dt]:font-medium [&>div]:border-t [&>div]:border-sage-dark [&>div]:py-4">
              <div>
                <dt>In the kitchen</dt>
                <dd>Carefully prepared food and beautifully finished pastries.</dd>
              </div>
              <div>
                <dt>Behind the scenes</dt>
                <dd>Menu planning, coordination, and the details that make hosting easier.</dd>
              </div>
              <div>
                <dt>At your table</dt>
                <dd>Welcoming service that gives you space to enjoy your guests.</dd>
              </div>
            </dl>
          </div>
          <div className="relative [&_img]:aspect-[1.1] [&_img]:object-cover mobile:[&_img]:aspect-[1.2] [&>span]:absolute [&>span]:bottom-0 [&>span]:left-0 [&>span]:bg-green [&>span]:px-[22px] [&>span]:py-[13px] [&>span]:text-[9px] [&>span]:text-paper">
            <img
              src={images.pastries}
              alt="An array of carefully finished pastries and fruit tartlets"
              loading="lazy"
              width="1600"
              height="1067"
            />
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
