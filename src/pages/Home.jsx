import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Flame,
  Camera,
  ScanLine,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Store,
  MapPin,
  Package,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import logo1 from "../assets/img/logo1.png";
import scanimg from "../assets/img/88e2061e8c09ff06d3ab40f1ab5ef599fd71c708.png";
import faceless from "../assets/img/65833875ecbe535ae27f441f6a65320cc29d8d99.jpg";
import profile from "../assets/img/profile.jpg";
import profile1 from "../assets/img/profile1.jpg";
import profile2 from "../assets/img/profile2.jpg";
import PrimaryButtontwo from "../components/Buttontwo";
import { Link } from "react-router-dom";

/** Fires once an element enters the viewport; used for scroll-reveal. */
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/** Small staggered mount-in flag, used on the hero. */
function useMounted(delay = 0) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return mounted;
}

/**
 * Drives the vendor-onboarding stepper from scroll position.
 * The wrapper is a tall (steps * 100vh) block; while it's in view its inner
 * content stays pinned (position: sticky) and the step advances as the user
 * scrolls through that block. Once they scroll past it, the page continues
 * normally to the next section — no scroll-jacking, just CSS sticky + math.
 */
// function useScrollStepper(stepCount) {
//   const wrapperRef = useRef(null);
//   const [step, setStep] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const rafRef = useRef(null);

//   const measure = useCallback(() => {
//     const el = wrapperRef.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const vh = window.innerHeight;
//     const total = Math.max(el.offsetHeight - vh, 1);
//     const scrolled = Math.min(Math.max(-rect.top, 0), total);
//     const p = scrolled / total;
//     setProgress(p);
//     setStep(Math.min(stepCount - 1, Math.floor(p * stepCount + 1e-6)));
//   }, [stepCount]);

//   useEffect(() => {
//     const onScroll = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(measure);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     measure();
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [measure]);

//   const goToStep = useCallback(
//     (index) => {
//       const el = wrapperRef.current;
//       if (!el) return;
//       const vh = window.innerHeight;
//       const total = Math.max(el.offsetHeight - vh, 1);
//       const targetWithinWrapper = (index / stepCount) * total + total / (stepCount * 2);
//       const targetY = el.offsetTop + targetWithinWrapper;
//       window.scrollTo({ top: targetY, behavior: "smooth" });
//     },
//     [stepCount]
//   );

//   return { wrapperRef, step, progress, goToStep };
// }

/** Basic desktop/mobile media query flag. */
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : true
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isDesktop;
}

/**
 * Drives the vendor-onboarding stepper from scroll position on desktop.
 * On mobile, scroll-jacking is disabled entirely: the wrapper has no extra
 * height, nothing is pinned, and `step` only advances via goToStep (Continue
 * button / StepperTrack clicks), which just sets state directly instead of
 * scrolling the page.
 */
function useScrollStepper(stepCount, isDesktop) {
  const wrapperRef = useRef(null);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  const measure = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = Math.max(el.offsetHeight - vh, 1);
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    const p = scrolled / total;
    setProgress(p);
    setStep(Math.min(stepCount - 1, Math.floor(p * stepCount + 1e-6)));
  }, [stepCount]);

  useEffect(() => {
    if (!isDesktop) return; // mobile: no scroll-driven step changes

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measure, isDesktop]);

  const goToStep = useCallback(
    (index) => {
      const clamped = Math.min(Math.max(index, 0), stepCount - 1);

      if (!isDesktop) {
        // Mobile: just move straight to that step, no scrolling involved
        setStep(clamped);
        setProgress(clamped / (stepCount - 1));
        return;
      }

      const el = wrapperRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const total = Math.max(el.offsetHeight - vh, 1);
      const targetWithinWrapper = (clamped / stepCount) * total + total / (stepCount * 2);
      const targetY = el.offsetTop + targetWithinWrapper;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      // scroll listener + measure() will pick up the resulting step/progress
    },
    [stepCount, isDesktop]
  );

  return { wrapperRef, step, progress, goToStep };
}

/* ============================================================================
   CONTENT
   ========================================================================== */



const PIPELINE_STATS = [
  {
    id: "01",
    title: "Capture",
    icon: Camera,
    desc: "Take a photo of a product with a phone, a fixed inspection camera, or an existing scanning setup — no special hardware required.",
  },
  {
    id: "02",
    title: "Analyze",
    icon: ScanLine,
    desc: "Our computer vision model compares packaging, print detail, and material cues against verified authentic references in seconds.",
  },
  {
    id: "03",
    title: "Verify",
    icon: ShieldCheck,
    desc: "Get a clear result — authentic, counterfeit, or uncertain — along with a confidence score you can act on and defend.",
  },
  {
    id: "98.4%",
    title: "Accuracy",
    icon: BadgeCheck,
    desc: "Benchmarked against a growing reference library, kept current as new packaging and counterfeit patterns appear.",
  },
];

const ONBOARDING_STEPS = [
  {
    id: 1,
    label: "Store information",
    icon: Store,
    heading: "Tell us about your store",
    sub: "This is what customers and regulators will see on your verified profile.",
    fields: [
      { key: "storeName", label: "Store name", placeholder: "Enter store name" },
      { key: "ownerName", label: "Owner's name", placeholder: "Owners name" },
      { key: "email", label: "Email address", placeholder: "Email address" },
      { key: "phone", label: "Phone number", placeholder: "Phone number" },
    ],
  },
  {
    id: 2,
    label: "Location",
    icon: MapPin,
    heading: "Where should customers find you",
    sub: "We use this to route nearby shoppers and match you to local regulators.",
    fields: [
      { key: "address", label: "Street address", placeholder: "Street address" },
      { key: "city", label: "City", placeholder: "City" },
      { key: "state", label: "State", placeholder: "State" },
    ],
  },
  {
    id: 3,
    label: "Products",
    icon: Package,
    heading: "What do you sell",
    sub: "List the categories you'll run through the verification pipeline.",
    fields: [
      { key: "category", label: "Primary category", placeholder: "e.g. Skincare, Body care" },
      { key: "productName", label: "Flagship product", placeholder: "Faceless Toner serum" },
      { key: "priceRange", label: "Typical price range", placeholder: "e.g. ₦8,000 – ₦25,000" },
    ],
  },
  {
    id: 4,
    label: "Payment",
    icon: CreditCard,
    heading: "Where we send your payouts",
    sub: "Verified vendors are paid out weekly once orders are confirmed authentic.",
    fields: [
      { key: "bankName", label: "Bank name", placeholder: "Bank name" },
      { key: "accountName", label: "Account name", placeholder: "Account name" },
      { key: "accountNumber", label: "Account number", placeholder: "Account number" },
    ],
  },
  {
    id: 5,
    label: "Approval",
    icon: BadgeCheck,
    heading: "Last look before we review",
    sub: "Submissions are reviewed within 48 hours by our vendor trust team.",
    fields: [],
  },
];

const TESTIMONIALS = [
  {
    quote: "Mantios is more than a tool, it is a movement",
    name: "Adeyeye M.",
    role: "Nestlé Inc",
    tone: "salmon",
  },
  {
    quote: "As a dermatologist, we see the aftermaths of these products first hand",
    name: "Dr. Nkechi O.",
    role: "Dermatologist, Columbus",
    tone: "maroon",
  },
];



/* ============================================================================
   PRIMITIVES
   ========================================================================== */

const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-soft">
      <Flame size={16} className="text-accent" strokeWidth={2.4} />
    </span>
    <span className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
      Mantios
    </span>
  </div>
);

const Pill = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-stone-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300 pointscanknowborder ${className}`}
  >
    {children}
  </span>
);
const Pill2 = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-stone-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300 pointscanknowborder2 ${className}`}
  >
    {children}
  </span>
);

const Dot = () => <span className="h-1 w-1 rounded-full bg-accent dotcolor" />;

const PrimaryButton = ({ children, className = "", ...props }) => (
  <button
    className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97] dark:bg-white dark:text-stone-900 dark:hover:bg-accent dark:hover:text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Field = ({ label, placeholder, value, onChange }) => (
  <label className="block">
    {/* <span className="mb-1.5 block text-xs font-medium text-stone-500 dark:text-neutral-400">
      {label}
    </span> */}
    <input
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="focus-ring w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-accent dark:border-neutral-800 dark:bg-neutral-900 dark:text-stone-100 dark:placeholder:text-neutral-600"
      disabled
    />
  </label>
);




/* ============================================================================
   SECTION: Hero + Scan visual
   ========================================================================== */


const ScanVisual = () => (
  <div
    className="relative mx-auto w-full max-w-4xl"
    style={{ aspectRatio: "1000 / 430" }}
  >
    {/* connector lines / arrows */}
    <svg
      viewBox="0 0 1000 430"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <marker
          id="scanArrow"
          markerWidth="8"
          markerHeight="8"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" className="fill-stone-400 dark:fill-neutral-600" />
        </marker>
      </defs>
 
      {/* capture -> verification score */}
      <path
        d="M260 140 H440"
        strokeWidth="1.5"
        // strokeDasharray="5 5"
        markerEnd="url(#scanArrow)"
        className="stroke-stone-300 dark:stroke-neutral-700"
      />
 
      {/* score title -> pills */}
      <path
        d="M530 41 V98"
        strokeWidth="1.5"
        markerEnd="url(#scanArrow)"
        className="stroke-stone-300 dark:stroke-neutral-700 "
      />
      <path
        d="M670 41 V98"
        strokeWidth="1.5"
        markerEnd="url(#scanArrow)"
        className="stroke-stone-300 dark:stroke-neutral-700 overwaitlistdisplaybn"
      />
 
      {/* counterfeit -> verified vendors / regulatory bodies (the missing fork) */}
      <path
        d="M670 167 V236"
        strokeWidth="1.5"
        className="stroke-stone-300 dark:stroke-neutral-700 overwaitlistdisplaybn"
      />
      <path
        d="M670 233 C 675 258, 690 273, 810 270"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#scanArrow)"
        className="stroke-stone-300 dark:stroke-neutral-700 overwaitlistdisplaybn"
      />
      <path
        d="M670 236 C 674 385, 635 359, 810 360"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#scanArrow)"
        className="stroke-stone-300 dark:stroke-neutral-700 overwaitlistdisplaybn"
      />
    </svg>
 
    {/* "Analyzing......." label */}
    <div className="absolute left-[3%] top-[2%] flex items-center gap-1.5 text-[11px] font-medium text-accent analyze">
      {/* <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" /> */}
      Analyzing…….
    </div>
 
    {/* capture frame + product */}
    <div className="anim-float absolute left-[2%] top-[13%] h-[67%] w-[24%] ctalhw">
      <span className="absolute -left-3.5 -top-3.5 h-5 w-5 border-l-2 border-t-2 border-stone-300 dark:border-neutral-700" />
      <span className="absolute -right-3.5 -top-3.5 h-5 w-5 border-r-2 border-t-2 border-stone-300 dark:border-neutral-700 " />
      <span className="absolute -bottom-3.5 -left-3.5 h-5 w-5 border-b-2 border-l-2 border-stone-300 dark:border-neutral-700 " />
      <span className="absolute -bottom-3.5 -right-3.5 h-5 w-5 border-b-2 border-r-2 border-stone-300 dark:border-neutral-700 " />
      <span className="scan-sweep absolute -left-2.5 -right-2.5 top-1/2 h-px bg-accent ctalhwborder " />
 
       <img src={scanimg} alt="Mantios"/>
    </div>
 
    {/* verification score label */}
    <div className="absolute left-[38%] top-0 w-[22%] text-center text-[13px] font-medium text-stone-600 dark:text-neutral-300 verificationtxtgc">
      Verification score
    </div>
 
    {/* result pills */}
    <div className="absolute left-[46%] top-[35.5%] flex h-[8.5%] w-[14%] items-center justify-center rounded-full border border-violet-300 bg-violet-50 text-[11px] font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300 genuine">
      87% Genuine
    </div>
    <div className="absolute left-[61%] top-[35.5%] flex h-[8.5%] w-[14%] items-center justify-center rounded-full border border-red-300 bg-red-50 text-[11px] font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400 counterfeit">
      13% Counterfeit
    </div>
 
    {/* downstream outcomes */}
    <div className="absolute left-[82%] top-[59%] flex h-[8.5%] w-[18%] items-center gap-1.5 rounded-full bg-stone-100 pl-[6%] text-[11px] text-stone-600 dark:bg-neutral-900 dark:text-neutral-300 pl27px regularbody overwaitlistdisplaybn">
      <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-accent">
        <CheckCircle2 size={9} className="text-white" />
      </span>
      Verified vendors
    </div>
    <div className="absolute left-[82%] top-[78.5%] flex h-[8.5%] w-[18%] items-center rounded-full bg-stone-100 pl-[6%] text-[11px] text-stone-600 dark:bg-neutral-900 dark:text-neutral-300 pl27px regularbody overwaitlistdisplaybn">
      Regulatory Bodies
    </div>
  </div>
);

const Hero = () => {
  const mounted = useMounted(50);
  const step = (delay) => ({
    animation: mounted ? undefined : "none",
    opacity: mounted ? undefined : 0,
    transitionDelay: `${delay}ms`,
  });

  return (
    <section className="relative overflow-hidden px-5 pt-14 sm:px-6 md:pt-20 lg:px-8 mt4em sectiondesigncolorfir">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1.8fr_1fr]">
          <div>
            <div className={mounted ? "anim-fade-up" : "opacity-0"}>
              <Pill>
                Point <Dot /> Scan <Dot /> Know
              </Pill>
            </div>

         
          </div>

          <p
            
          >
           
          </p>
        </div>
         <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1.8fr_1fr]">
          <div>
            

            <h1
              className={`font-display mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-stone-900 dark:text-stone-50 sm:text-6xl verifyh1 ${
                mounted ? "anim-fade-up" : "opacity-0 "
              }`}
              style={{ animationDelay: "80ms" }}
            >
              Verify Authenticity
              <br />
              Of your skincare and <br /> 
              cosmetic Products
            </h1>
          </div>

          <p
            className={`font-body max-w-sm text-base leading-relaxed text-stone-500 dark:text-neutral-400 md:justify-self-end md:pt-3 verifyp ${
              mounted ? "anim-fade-up verifyp" : "opacity-0 verifyp"
            }`}
            style={{ animationDelay: "160ms" }}
          >
            The complete counterfeit detection pipeline. Verify authenticity of
            supply chain products. Fast, efficient and dependable.
          </p>
        </div>

        <div
          id="about"
          className={`relative mt-16 overflow-hidden  px-6 py-14 md:px-12 hmeabtbg ${
            mounted ? "anim-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "240ms" }}
        >
          <div className="flex flex-col items-center text-center abtnexreposnep">
            <Pill2>
              <img src={logo1} alt="Mantios" className="text-accent" /> About us
            </Pill2>
            <h2 className="font-display mt-5 text-3xl font-semibold text-stone-900 dark:text-stone-50 abthmeh1">
              One scan, a clear answer
            </h2>
            <p className="mt-3 max-w-md text-sm text-stone-500 dark:text-neutral-400 abthmep">
              Mantios turns product authentication into a three-step pipeline,
              built to run wherever a camera already exists.
            </p>
          </div>

          <div className="mt-14">
            <ScanVisual />
          </div>
 
         
          <div className="relative overflow-hidden rounded-[18px] border border-[#232323] relative mx-auto w-full max-w-4xl">
            {/* vertical divider — full height, always meets top & bottom edge */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#232323] md:block" />
            {/* horizontal divider — full width, always meets left & right edge */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#232323]" />

            <div className="grid grid-cols-1 md:grid-cols-2">
              {PIPELINE_STATS.map((s, i) => (
                <div
                  key={s.title}
                  className={`px-10 py-[34px] paddinginline20px ${i % 2 === 0 ? "" : ""}`}
                >
                  <h3 className="mb-2.5 flex items-baseline gap-2.5 text-[22px] font-semibold pipelineh1">
                    <span className="text-[17px] font-normal text-[#5c5c5c] pipelineh1color">
                      {s.id}
                    </span>
                    <span className="pipelineh1color1">{s.title}</span>
                  </h3>
                  <p className="max-w-[36ch] text-[14.5px] leading-[1.65] text-[#8a8a8a] pipelinep">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   SECTION: Verified vendor onboarding (scroll-driven stepper)
   ========================================================================== */

const StepperTrack = ({ steps, step, progress, onJump }) => (
  <div className="mb-10 flex items-start justify-between md:mb-14">
    {steps.map((s, i) => {
      const state = i < step ? "done" : i === step ? "active" : "upcoming";
      return (
        <React.Fragment key={s.id}>
          <button
            onClick={() => onJump(i)}
            className="focus-ring group flex flex-col items-center gap-2.5 rounded-xl px-1"
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-full text-sm font-semibold transition-all duration-500 vendortxtnumber ${
                state === "upcoming"
                  ? "bg-stone-100 text-stone-400 dark:bg-neutral-900 dark:text-neutral-600 vendortxtnumber474747"
                  : "bg-accent  vendortxtnumberfff474747"
              } ${state === "active" ? "" : ""}`}
            >
              {state === "done" ? <CheckCircle2 size={18} /> : String(s.id).padStart(2, "0")}
            </span>
            <span
              className={`hidden text-xs font-medium sm:block  ${
                state === "upcoming"
                  ? "text-stone-400 dark:text-neutral-600 vendortxtnumberlabel "
                  : "text-stone-700 dark:text-stone-200 vendortxtnumberlabel1"
              }`}
            >
              {s.label}
            </span>
          </button>
          {i < steps.length - 1 && (
            <div className="relative mt-6 h-px flex-1 self-start bg-stone-200 dark:bg-neutral-800">
              <div
                className="absolute left-0 top-0 h-px bg-accent transition-all duration-200"
                style={{
                  width: `${Math.max(0, Math.min(1, progress * steps.length - i)) * 100}%`,
                }}
              />
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const VendorPreviewCard = ({ formData, verified }) => (
  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 borderfacelessexamptp">
    <div className="flex flex-col items-center text-center">
      <span>
        <img src={faceless}  className="grid h-16 w-16 place-items-center rounded-full bg-stone-200 dark:bg-neutral-800" />
      </span>
      <h4 className="font-display mt-3 text-base font-semibold text-stone-900 dark:text-stone-50 storenametxt">
        {formData.storeName?.trim() || "Abidemi stores"}
      </h4>
      <span
        key={verified ? "verified" : "pending"}
        className={`anim-pop mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${
          verified
            ? "bg-accent text-white borderfacelessexamptxtverified"
            : "bg-stone-200 text-stone-500 dark:bg-neutral-800 dark:text-neutral-400 "
        }`}
      >
        <CheckCircle2 size={12}  className="borderverfiedcheck"/>
        {verified ? "Verified" : "Pending review"}
      </span>
    </div>

    <div className="mt-6 border-t border-stone-200 pt-5 text-center dark:border-neutral-800 borderfacelessexamp">
      <p className="font-display text-sm font-semibold text-stone-900 dark:text-stone-50 borderfacelessexamptxt">
        {formData.productName?.trim() || "Faceless Toner serum"}
      </p>
      <p className="mt-1 text-xs text-stone-500 dark:text-neutral-400 borderfacelessexampproceed">
        Proceed to purchase this product
      </p>
      <div className=" mt-4">
       <img src={scanimg} />
      </div>
    </div>
  </div>
);

const VendorOnboarding = () => {
  const isDesktop = useIsDesktop();
  const { wrapperRef, step, progress, goToStep } = useScrollStepper(ONBOARDING_STEPS.length, isDesktop);
  const [formData, setFormData] = useState({});
  const current = ONBOARDING_STEPS[step];
  const isLast = step === ONBOARDING_STEPS.length - 1;
  const [headRef, headVisible] = useReveal();

  const setField = (key) => (e) => setFormData((d) => ({ ...d, [key]: e.target.value }));

  return (
    <section className="px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headRef}
          className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between py-20 md:py-24 pb5em verifiedvenonbppaddingre ${
            headVisible ? "anim-fade-up" : "opacity-0"
          }`}
        >
          <h2 className="font-display max-w-md text-4xl font-semibold text-stone-900 dark:text-stone-50 verifiedvenonbh2">
            Verified vendor onboarding
          </h2>
          <p className="max-w-lg text-sm text-stone-500 dark:text-neutral-400 verifiedvenonbp">
            Join the community of verified vendors, we send customers to
            you.
          </p>
        </div>
      </div>

      {/* tall scroll wrapper (desktop only): pins the card while the user scrolls through it.
          On mobile there's no extra height and nothing is pinned — step only
          advances via Continue / StepperTrack taps. */}
      <div
        ref={wrapperRef}
        className="relative"
        style={isDesktop ? { height: `${ONBOARDING_STEPS.length * 100}vh` } : undefined}
      >
        <div className={isDesktop ? "sticky top-0 flex min-h-screen items-center py-10" : "flex items-center py-10"}>
          <div className="mx-auto w-full max-w-7xl rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-neutral-900 dark:bg-neutral-900/60 md:p-10 vendononborder">
              <div className="vendononborder1">
                <StepperTrack steps={ONBOARDING_STEPS} step={step} progress={progress} onJump={goToStep} />

                <div className="grid grid-cols-1 gap-8 rounded-2xl bg-stone-50/60 p-4 dark:bg-neutral-950/40 md:grid-cols-2 md:p-8 borderfieldonboard">
                  {/* left: dynamic form */}
                  <div key={step} className="anim-fade-up">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft vendorlinksnumber">
                        <current.icon size={16} className="text-accent vendorlinksnumbernext" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-stone-900 dark:text-stone-50">
                          {current.heading}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-neutral-400">{current.sub}</p>
                      </div>
                    </div>

                    {!isLast ? (
                      <div className="space-y-4">
                        {current.fields.map((f) => (
                          <Field
                            key={f.key}
                            label={f.label}
                            placeholder={f.placeholder}
                            value={formData[f.key]}
                            onChange={setField(f.key)}
                          />
                        ))}
                        <button
                          onClick={() => goToStep(Math.min(step + 1, ONBOARDING_STEPS.length - 1))}
                          className="focus-ring group mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 dark:text-stone-50"
                        >
                          Continue
                          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="rounded-xl border border-stone-200 bg-white p-4 text-xs text-stone-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                          <p className="mb-2 font-medium text-stone-700 dark:text-stone-200">Ready for review</p>
                          <p>
                            {formData.storeName?.trim() || "Your store"} will be checked against our
                            vendor trust standards. You'll hear back within 48 hours.
                          </p>
                        </div>
                        <PrimaryButton className="w-full">
                          Submit for approval
                          <ArrowUpRight size={15} />
                        </PrimaryButton>
                      </div>
                    )}
                  </div>

                  {/* right: live preview */}
                  <div className="flex items-center justify-center">
                    <VendorPreviewCard formData={formData} verified={isLast} />
                  </div>
                </div>
              </div>


          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   SECTION: Testimonials
   ========================================================================== */

const TestimonialCard = ({ quote, name, role, tone }) => {
  const [ref, visible] = useReveal();
  const bg = tone === "salmon" ? "bg-salmon" : "bg-maroon";
  const text = tone === "salmon" ? "text-stone-900" : "text-white";
  return (
    <div
      ref={ref}
      className={`relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl p-8 ${bg} ${text} ${
        visible ? "" : ""
      }`}
    >
      <span
        className="pointer-events-none absolute -right-16 bottom-[-20px] select-none rotate-[-78deg] whitespace-nowrap text-[7rem] font-bold leading-none tracking-tight opacity-[0.10] watermarktestimonial"
        aria-hidden="true"
      >
        Mantios
      </span>
      <p className="font-display relative text-2xl font-semibold leading-snug quotetestimonial">
        “{quote}”
      </p>
      <div className="relative flex items-center gap-3">
        <span
          className={`grid h-9 w-9 place-items-center rounded-full text-xs font-semibold ${
            tone === "salmon" ? "bg-stone-900 text-white" : "bg-white/15 text-white"
          }`}
        >
          {/* {name.charAt(0)} */}
          <img src={profile} alt="Mantios" className="bordrimgtestimonial"/>
        </span>
        <div>
          <p className="text-sm font-medium testimonialname">{name}</p>
          <p className={`text-xs testimonialtitle ${tone === "salmon" ? "text-stone-700" : "text-white/60"}`}>{role}</p>
        </div>
      </div>
    </div>
  );
};

// const Testimonials = () => (
//   <section className="px-6 py-16 md:px-10">
//     <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 bordertestimonial" >
//       {TESTIMONIALS.map((t) => (
//         <TestimonialCard key={t.name} {...t} />
//       ))}
//     </div>
//   </section>
// );

const Testimonials = () => (
  <section className="px-6 py-16 md:px-10 ">
    <div
      className="
        mx-auto max-w-6xl
        flex gap-5 overflow-x-auto
        snap-x snap-mandatory
        touch-pan-x
        pb-4
        scrollbar-hide
        md:grid md:grid-cols-2 md:gap-6
        md:overflow-visible
        md:pb-0 bordertestimonial1
      "
    >
      {TESTIMONIALS.map((t) => (
        <div
          key={t.name}
          className="
            min-w-[88%]
            snap-start
            md:min-w-0
          "
        >
          <TestimonialCard {...t} />
        </div>
      ))}
    </div>
  </section>
);

/* ============================================================================
   SECTION: CTA / waitlist
   ========================================================================== */

const CTA = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="waitlist" className="px-6 py-16 md:px-10">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl rounded-3xl border border-stone-200 bg-white px-6 py-20 text-center dark:border-neutral-900 dark:bg-neutral-900/60 ctabgjoin ${
          visible ? "anim-fade-up" : "opacity-0"
        }`}
      >
        <div className="mb-6 flex items-center justify-center gap-3 ctabgjointxttopimggg">
            <div className="flex -space-x-2">
              {[profile, profile1, profile2].map((src, i) => (
                <span
                  key={i}
                  className="h-7 w-7 overflow-hidden rounded-full border-2 border-white dark:border-neutral-900"
                >
                  <img
                    src={src}
                    alt={`User ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </span>
              ))}
            </div>
            <span className="text-xs text-stone-500 dark:text-neutral-400 ctabgjoinp overwaitlistdisplaybn">
              Over 500+ people have signed up
            </span>
        </div>
        
        <h2 className="ctabgjointxt">
          Be a part of the movement
          <br />
          Join the waitlist
        </h2>
       <span className="text-xs text-stone-500 dark:text-neutral-400 ctabgjoinp overwaitlistdisplaynb">
              Over 500+ people have signed up
        </span>
        <div className="mt-8 mt3em primarybuttontwomargintop">
          <Link to="/waitlist">
            <PrimaryButtontwo>Join the waitlist</PrimaryButtontwo>
          </Link>
        </div>
      </div>
    </section>
  );
};



/* ============================================================================
   APP
   ========================================================================== */

export default function App() {
  return (
    <div>
     
      <Hero />
      <VendorOnboarding />
      <Testimonials />
      <CTA />
      
    </div>
  );
}
