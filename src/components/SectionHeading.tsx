import type { ReactNode } from 'react';
type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
};
export function SectionHeading({ eyebrow, title, description, children }: SectionHeadingProps) {
  return (
    <div className="section-heading mb-11 flex items-end justify-between gap-10 tablet:flex-col tablet:items-start tablet:gap-4.5 mobile:mb-[30px] [&_.text-link]:mb-[5px] [&_.text-link]:shrink-0">
      <div>
        <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p className="mt-4.5 max-w-[510px]">{description}</p>}
      </div>
      {children}
    </div>
  );
}
