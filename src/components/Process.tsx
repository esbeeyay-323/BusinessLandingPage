import { steps } from '../data/site';
import { SectionHeading } from './SectionHeading';
export function Process() {
  return (
    <section className="bg-sage py-25 mobile:py-16 [&_.section-heading]:items-start">
      <div className="mx-auto w-[min(1240px,calc(100%-112px))] laptop:w-[calc(100%-72px)] mobile:w-[calc(100%-40px)]">
        <SectionHeading
          eyebrow="THE ART OF EASY HOSTING"
          title={
            <>
              From enquiry
              <br />
              to the last bite.
            </>
          }
          description="A thoughtful process. A personal touch. And one less thing on your list."
        />
        <ol className="grid list-none grid-cols-3 gap-14 p-0 tablet:gap-6 mobile:grid-cols-1 mobile:gap-8 [&_h3]:mt-[22px] [&_h3]:mb-3.5 [&_h3]:text-[28px] mobile:[&_h3]:mt-0 mobile:[&_h3]:mb-3 [&_li]:border-t [&_li]:border-sage-dark [&_li]:pt-5 mobile:[&_li]:grid mobile:[&_li]:grid-cols-[60px_1fr] mobile:[&_li]:gap-x-5 [&_p]:text-[13px] mobile:[&_p]:col-start-2">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="font-display text-[68px] leading-none font-normal text-accent mobile:row-span-2 mobile:text-[54px]">
                0{index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
