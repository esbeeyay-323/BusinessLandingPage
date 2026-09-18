import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Brand } from './Brand';
import { navigation } from '../data/site';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  return (
    <header
      className="sticky top-0 z-30 border-b border-line bg-paper"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div className="mx-auto flex min-h-[88px] w-[min(1240px,calc(100%-112px))] items-center justify-between gap-7 laptop:w-[calc(100%-72px)] mobile:min-h-[76px] mobile:w-[calc(100%-40px)] mobile:gap-3">
        <Brand />
        <button
          ref={toggleRef}
          className="hidden size-11 items-center justify-center rounded-sm border border-line bg-transparent text-green hover:bg-sage tablet:inline-flex"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          title={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          className={`flex items-center gap-7 text-xs font-medium laptop:gap-4.5 tablet:absolute tablet:inset-x-0 tablet:top-full tablet:hidden tablet:flex-col tablet:items-stretch tablet:gap-2 tablet:border-b tablet:border-line tablet:bg-paper tablet:px-9 tablet:pt-5 tablet:pb-7 mobile:px-5 tablet:[&>.button]:mt-2.5 tablet:[&>a]:text-sm [&>a.active]:text-accent [&>a.active:not(.button)]:after:w-full [&>a:not(.button)]:relative [&>a:not(.button)]:flex [&>a:not(.button)]:min-h-11 [&>a:not(.button)]:items-center [&>a:not(.button)]:after:absolute [&>a:not(.button)]:after:bottom-[5px] [&>a:not(.button)]:after:left-0 [&>a:not(.button)]:after:h-px [&>a:not(.button)]:after:w-0 [&>a:not(.button)]:after:bg-accent [&>a:not(.button)]:after:transition-[width] [&>a:not(.button)]:after:duration-180 [&>a:not(.button)]:after:content-[''] tablet:[&>a:not(.button)]:after:max-w-[130px] [&>a:not(.button):hover]:after:w-full ${open ? '[&]:flex' : ''}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <Link
            className="button inline-flex min-h-11 items-center justify-center gap-3.5 rounded-sm border border-green bg-green px-4.5 py-2.5 text-center text-[13px] leading-normal font-medium text-paper transition-[background,border-color,transform] duration-180 ease-[ease] hover:-translate-y-0.5 hover:border-green-hover hover:bg-green-hover active:translate-y-0"
            to="/contact"
          >
            Plan your event <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
