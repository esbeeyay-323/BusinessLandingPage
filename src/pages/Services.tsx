import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import { services } from '../data/site';
import { Packages } from '../components/Packages';
import { CallToAction } from '../components/CallToAction';
import { SectionHeading } from '../components/SectionHeading';

const faqs = [
  {
    question: 'Can the menu accommodate dietary requirements?',
    answer:
      'Tell us about allergies, dietary needs, and preferences when you enquire. We will discuss suitable options and preparation requirements with you before agreeing your menu.',
  },
  {
    question: 'What is included in the Essential package?',
    answer:
      'The Essential package starts at $45 USD per person for a minimum of 20 guests. It includes a 3-course set menu, one service staff member per 20 guests, and setup and cleanup. Your final quote will confirm the details for your event.',
  },
  {
    question: 'Can we arrange a tasting?',
    answer:
      'Yes. Use the enquiry form to tell us about your occasion and mention that you would like a private tasting. We will discuss the menu, timing, and arrangements with you.',
  },
  {
    question: 'How far in advance should we enquire?',
    answer:
      'As soon as you have an occasion in mind. Share your preferred date and location so we can discuss availability. An enquiry does not reserve a date; arrangements are confirmed directly with our team.',
  },
];

export function Services() {
  return (
    <>
      <section className="mx-auto w-[min(1240px,calc(100%-112px))] pt-[68px] pb-15 laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)] mobile:pt-11 mobile:pb-[38px] [&_.button]:mt-[22px] [&_.text-link]:mt-[22px] [&_h1]:mb-6 [&_h1]:max-w-[1000px] [&_h1_i]:text-green-hover [&>p:not(.eyebrow)]:max-w-[520px] [&>p:not(.eyebrow)]:text-[15px] mobile:[&>p:not(.eyebrow)]:text-sm">
        <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
          CATERING & MENUS
        </p>
        <h1>
          Good food.
          <br />
          <i>For your kind of gathering.</i>
        </h1>
        <p>
          An intimate dinner or a room full of celebration. The same care goes into every plate.
        </p>
        <a
          className="text-link inline-flex min-h-11 w-fit items-center gap-3 border-b border-green text-[13px] font-medium transition-[color,gap,border-color] duration-180 ease-[ease] hover:gap-4.5 hover:border-accent hover:text-accent"
          href="#packages"
        >
          Explore the packages <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </section>
      <section
        className="mx-auto w-[min(1240px,calc(100%-112px))] pb-5 laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)]"
        aria-label="Catering services"
      >
        {services.map((service, index) => (
          <article
            className="grid grid-cols-2 items-center gap-[76px] border-t border-line py-[54px] laptop:gap-12 tablet:gap-[35px] mobile:grid-cols-1 mobile:gap-7 mobile:py-[35px] even:[&_.service-row-image]:order-2 mobile:even:[&_.service-row-image]:order-0 [&_.text-link]:mt-5 [&_h2]:mb-5 [&_h2]:text-[44px] tablet:[&_h2]:text-[36px] mobile:[&_h2]:text-[38px] [&_p:not(.eyebrow)]:mb-4 [&_p:not(.eyebrow)]:text-sm"
            id={service.id}
            key={service.id}
            tabIndex={-1}
          >
            <div className="service-row-image [&_img]:aspect-4/3 [&_img]:object-cover">
              <img
                src={service.image}
                alt={service.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                width="800"
                height="600"
              />
            </div>
            <div>
              <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
                {service.number} / {service.category}
              </p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <p>
                {index === 0
                  ? 'From a box to share to a complete dessert table, choose handmade treats for a thoughtful gift, a celebration, or an afternoon worth slowing down for.'
                  : index === 1
                    ? 'Bring people together over working lunches, conferences, and company celebrations. We plan the food and service around the rhythm of your event.'
                    : 'Build a menu that reflects your tastes and traditions. From intimate dinner parties to the big day, we help make the occasion feel unmistakably yours.'}
              </p>
              <span className="mt-4.5 block text-xs font-medium text-green">{service.detail}</span>
              <Link
                className="text-link inline-flex min-h-11 w-fit items-center gap-3 border-b border-green text-[13px] font-medium transition-[color,gap,border-color] duration-180 ease-[ease] hover:gap-4.5 hover:border-accent hover:text-accent"
                to={`/contact?event=${encodeURIComponent(index === 0 ? 'Pastries & pies' : index === 1 ? 'Corporate event' : 'Wedding')}`}
              >
                Plan this occasion <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <Packages />
      <section className="bg-sage py-25 mobile:py-16">
        <div className="mx-auto grid w-[min(1240px,calc(100%-112px))] grid-cols-[0.8fr_1.2fr] gap-20 laptop:w-[calc(100%-72px)] tablet:grid-cols-1 tablet:gap-2.5 mobile:w-[calc(100%-40px)]">
          <SectionHeading
            eyebrow="A FEW HELPFUL DETAILS"
            title={
              <>
                Before we
                <br />
                <i>set the table.</i>
              </>
            }
          />
          <div className="[&_details]:border-t [&_details]:border-sage-dark [&_details_p]:pb-6 [&_details_p]:text-[13px] [&_details:last-child]:border-b [&_details[open]_summary_svg]:rotate-45 [&_summary]:flex [&_summary]:list-none [&_summary]:items-center [&_summary]:justify-between [&_summary]:gap-5 [&_summary]:py-[22px] [&_summary]:text-sm [&_summary]:font-medium [&_summary::-webkit-details-marker]:hidden">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
