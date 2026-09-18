import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
const FOOTER_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Waitlist", href: "/waitlist" },
  { label: "Features", href: "/#features" },
];

const SOCIALS = [
  { icon: BsTwitterX, label: "X" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaLinkedin, label: "LinkedIn" },
  { icon: FaGithub, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 px-6 py-8 dark:border-neutral-900 md:px-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
      <Logo />
      <nav className="flex items-center gap-6">
        {FOOTER_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="focus-ring rounded text-sm text-stone-500 hover:text-stone-900 dark:text-neutral-500 dark:hover:text-white linkhref"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        {SOCIALS.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="focus-ring rounded text-stone-400 transition-colors hover:text-accent dark:text-neutral-600. linkhref"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  </footer>
  );
}
