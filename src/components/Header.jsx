import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import PrimaryButton from "./Button";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-100/80 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/80 headerbg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8 plr0">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="focus-ring rounded text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-neutral-400 dark:hover:text-white linkhref"
            >
              {l.label}
            </Link>
          ))}

          <span className="h-4 w-px bg-stone-300 dark:bg-neutral-700" />

          <Link to="/waitlist">
            <PrimaryButton>Join the waitlist</PrimaryButton>
          </Link>
        </nav>

        <button
          className="focus-ring rounded-lg p-2 text-stone-700 dark:text-stone-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-stone-100 px-5 py-4 dark:border-neutral-900 dark:bg-neutral-950 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-stone-600 dark:text-neutral-300"
              >
                {l.label}
              </a>
            ))}

            <a href="#waitlist" onClick={() => setOpen(false)}>
              <PrimaryButton className="w-full">
                Join the waitlist
              </PrimaryButton>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}