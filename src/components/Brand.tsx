import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { site } from '../data/site';

export function Brand() {
  return (
    <Link
      className="brand inline-flex items-center gap-3 font-display text-[28px] leading-[1.1] whitespace-nowrap mobile:gap-2 mobile:text-[24px] [&_i]:font-normal [&_i]:text-accent [&_small]:mt-[7px] [&_small]:block [&_small]:text-center [&_small]:font-body [&_small]:text-[8px] [&_small]:font-medium mobile:[&_small]:text-[7px]"
      to="/"
      aria-label={`${site.name}, home`}
    >
      <Sprout
        className="brand-mark h-11 w-[34px] mobile:h-[38px] mobile:w-7"
        strokeWidth={1.3}
        aria-hidden="true"
      />
      <span>
        Harvest <i>&</i> Grace<small>CATERING & CELEBRATIONS</small>
      </span>
    </Link>
  );
}
