import React, { useMemo, useState } from "react";
import { Check, ArrowRight, Frame, Sun, Focus } from "lucide-react";

import angleGood from "../assets/img/challenges/angle-good.png";
import angleBad from "../assets/img/challenges/angle-bad.png";
import lightingGood from "../assets/img/challenges/lighting-good.png";
import lightingBad from "../assets/img/challenges/lighting-bad.png";
import focusGood from "../assets/img/challenges/focus-good.png";
import focusBad from "../assets/img/challenges/focus-good.png";

const T = (x, y, size, weight, fill, str, extra = "") =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" font-family="Helvetica, Arial, sans-serif" fill="${fill}" ${extra}>${str}</text>`;

const mockProduct = ({ zoom = false, dark = false, blur = false } = {}) => {
  const lines = (x, y, w, n, gap = 6) =>
    Array.from({ length: n })
      .map((_, i) => `<rect x="${x}" y="${y + i * gap}" width="${w - (i % 3) * 8}" height="2" rx="1" fill="#c9c9c4"/>`)
      .join("");

  const product = `
    <g ${zoom ? 'transform="translate(-72 -48) scale(1.45)"' : ""} ${blur ? 'filter="url(#blur)"' : ""}>
      <ellipse cx="240" cy="290" rx="170" ry="9" fill="#000" opacity=".10"/>

      <!-- box: side panel + front -->
      <rect x="96" y="46" width="30" height="236" fill="url(#side)"/>
      ${lines(101, 58, 20, 14, 5)}
      <rect x="126" y="38" width="140" height="244" fill="url(#front)" stroke="#dcdcd7" stroke-width=".8"/>
      <path d="M140 62 h14 a9 9 0 0 1 0 18 h-14 z M140 71 h12" fill="none" stroke="#1d1d1d" stroke-width="2.2"/>
      ${T(140, 96, 11, 700, "#1d1d1d", "BRANDLY")}
      ${T(140, 126, 15, 700, "#1d1d1d", "SALICYLIC")}
      ${T(140, 143, 15, 700, "#1d1d1d", "ACID 2%")}
      <rect x="140" y="151" width="62" height="11" fill="#1f5e4b"/>
      <rect x="202" y="151" width="40" height="11" fill="#777"/>
      ${T(144, 159.5, 6, 700, "#fff", "FACE WASH")}
      ${T(206, 159.5, 6, 700, "#fff", "CLEANSE")}
      ${T(140, 178, 7, 700, "#1f5e4b", "KEY ACTIVES")}
      ${T(140, 188, 7, 400, "#333", "++ Salicylic Acid")}
      ${T(140, 197, 7, 400, "#333", "++ Vitamin E")}
      ${T(140, 206, 7, 400, "#333", "++ Zinc PCA")}
      <rect x="140" y="212" width="112" height="1" fill="#bdbdb8"/>
      ${T(140, 224, 7, 700, "#1f5e4b", "CONCERN")}
      ${T(140, 233, 7, 400, "#333", "Acne &amp; Oil Control")}
      <rect x="126" y="246" width="140" height="36" fill="#1f5e4b"/>
      ${T(136, 262, 5.5, 400, "#cfe5dc", "DERMATOLOGICALLY TESTED")}
      ${T(136, 270, 5.5, 400, "#cfe5dc", "CLINICALLY PROVEN ACTIVES")}
      <path d="M232 252 h10 v10 h10 v10 h-10 v10 h-10 v-10 h-10 v-10 h10 z" fill="none" stroke="#e8f3ee" stroke-width="2" transform="translate(0 -4) scale(.9)"/>

      <!-- bottle -->
      <path d="M318 84 h26 v10 h-26 z" fill="#e2e2de" stroke="#cfcfca" stroke-width=".8"/>
      <rect x="312" y="94" width="38" height="26" rx="5" fill="url(#cap)" stroke="#d2d2cd" stroke-width=".8"/>
      <path d="M300 74 h30 a4 4 0 0 1 4 4 v6 h-34 z" fill="#ececea" stroke="#d2d2cd" stroke-width=".8"/>
      <rect x="284" y="118" width="94" height="164" rx="26" fill="url(#bottle)" stroke="#dcdcd7" stroke-width=".8"/>
      <path d="M298 150 h9 a6 6 0 0 1 0 12 h-9 z" fill="none" stroke="#1d1d1d" stroke-width="1.8"/>
      ${T(298, 178, 10, 700, "#1d1d1d", "SALICYLIC")}
      ${T(298, 191, 10, 700, "#1d1d1d", "ACID 2%")}
      <rect x="298" y="197" width="46" height="8" fill="#1f5e4b"/>
      ${T(300, 203, 5, 700, "#fff", "FACE WASH")}
      ${lines(298, 214, 62, 6, 6)}
      <path d="M284 252 h94 v4 a26 26 0 0 1 -26 26 h-42 a26 26 0 0 1 -26 -26 z" fill="#1f5e4b"/>
    </g>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 330">
    <defs>
      <filter id="blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6"/></filter>
      <linearGradient id="front" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ebebe8"/></linearGradient>
      <linearGradient id="side" x1="0" x2="1"><stop offset="0" stop-color="#d9d9d5"/><stop offset="1" stop-color="#ececea"/></linearGradient>
      <linearGradient id="bottle" x1="0" x2="1"><stop offset="0" stop-color="#e6e6e2"/><stop offset=".35" stop-color="#ffffff"/><stop offset="1" stop-color="#e4e4e0"/></linearGradient>
      <linearGradient id="cap" x1="0" x2="1"><stop offset="0" stop-color="#e2e2de"/><stop offset=".4" stop-color="#fff"/><stop offset="1" stop-color="#dcdcd8"/></linearGradient>
    </defs>
    <rect width="480" height="330" fill="${blur ? "#ececea" : "#ffffff"}"/>
    ${product}
    ${dark ? '<rect width="480" height="330" fill="#000" opacity=".34"/><rect x="0" y="165" width="270" height="165" fill="#000" opacity=".34"/>' : ""}
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/* ============================================================================
   CONTENT
   ========================================================================== */

const CHALLENGES = [
  {
    id: "angle",
    tag: "Angle",
    heading: "Get the angle right",
    question: "Which picture gives Mantios the clearest view of your product?",
    good: angleGood,
    bad: angleBad,
    correct: "That’s the angle! Keep the entire product in view",
    wrong:
      "Not quite. Parts of the packaging are hidden or cut off in that one. Look again for the shot that shows it all",
    tip: {
      icon: Frame,
      title: "Frame the whole product",
      text: "Keep the entire pack in view, straight on, with no edges cut off.",
    },
  },
  {
    id: "lighting",
    tag: "Lighting",
    heading: "Find the right lighting",
    question: "Which picture makes the product details easier to see?",
    good: lightingGood,
    bad: lightingBad,
    correct: "Great choice! Good lighting helps improve product details",
    wrong:
      "Not quite, shadows make the label hard to read in that one. Look for the photo where the details stand out",
    tip: {
      icon: Sun,
      title: "Light it evenly",
      text: "Use soft, even light. Avoid shadows and glare across the label.",
    },
  },
  {
    id: "focus",
    tag: "Focus",
    heading: "Focus on the details",
    question: "Which picture captures the product details more clearly?",
    good: focusGood,
    bad: mockProduct({ blur: true }),
    correct: "Exactly! Keep your camera steady and ensure important details are in focus.",
    wrong:
      "Not quite. The label text looks soft in that one. Look for the photo where the small print is crisp.",
    tip: {
      icon: Focus,
      title: "Hold steady, tap to focus",
      text: "Keep your camera still so the small print stays crisp.",
    },
  },
];

/* ============================================================================
   PIECES
   ========================================================================== */

const ProgressDashes = ({ current, total }) => (
  <div className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-200">
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-[3px] w-6 rounded-full transition-colors duration-300 ${
            i <= current ? "bg-[#F4A896]" : "bg-stone-300 dark:bg-neutral-700"
          }`}
        />
      ))}
    </div>
    <span>
      {current + 1} of {total}
    </span>
  </div>
);

const PictureOption = ({ label, src, state, disabled, onSelect }) => {
  // state: "idle" | "correct" | "wrong"
  const ring =
    state === "correct"
      ? "ring-[3px] ring-green-500 dark:ring-green-400"
      : state === "wrong"
      ? "ring-[3px] ring-red-600 dark:ring-red-500"
      : "";

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-label={`Picture ${label}`}
      className={`relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-white outline-none transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-stone-500 ${ring} ${
        disabled ? "cursor-default" : "cursor-pointer hover:ring-2 hover:ring-stone-400 dark:hover:ring-neutral-500"
      }`}
    >
      <span className="absolute left-4 top-4 z-10 rounded-full bg-black px-3.5 py-1.5 text-xs font-medium text-white">
        Picture {label}
      </span>
      <img src={src} alt="" className="h-full w-full object-contain" draggable={false} />
    </button>
  );
};

const FeedbackBar = ({ correct, message, buttonLabel, onNext }) => (
  <div
    role="status"
    className={`feedback-in mt-6 flex flex-col gap-4 rounded-xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
      correct
        ? "border-green-500/70 bg-green-50 dark:border-green-400/60 dark:bg-[#0f1a12]"
        : "border-orange-500/70 bg-orange-50 dark:border-orange-400/60 dark:bg-[#1c1511]"
    }`}
  >
    <div>
      <p
        className={`text-base font-medium ${
          correct ? "text-green-700 dark:text-green-400" : "text-orange-600 dark:text-orange-500"
        }`}
      >
        {correct ? "Correct" : "Not quite"}
      </p>
      <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">{message}</p>
    </div>
    <button
      type="button"
      onClick={onNext}
      autoFocus
      className="shrink-0 rounded-full bg-stone-900 px-8 py-2.5 text-sm font-semibold text-white transition-transform active:scale-[0.97] dark:bg-white dark:text-stone-900"
    >
      {buttonLabel}
    </button>
  </div>
);

const RoundCheck = () => (
  <span className="grid h-24 w-24 place-items-center rounded-full bg-[#2a2219] text-white">
    <Check size={40} strokeWidth={2.5} />
  </span>
);

const PillButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-transform active:scale-[0.97] dark:bg-white dark:text-stone-900"
  >
    {children}
    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
  </button>
);

/* ============================================================================
   SCREENS
   ========================================================================== */

// Intro: tips screen. "Try Mantios" starts the challenges.
const TipsScreen = ({ onStart }) => (
  <div className="flex flex-col items-center text-center">
    <RoundCheck />
    <h2 className="mt-8 text-3xl tracking-tight text-stone-900 dark:text-white sm:text-4xl">
      You’re one step closer to a better scan!
    </h2>
    <p className="mt-3 text-base text-stone-500 dark:text-neutral-400 sm:text-xl">
      Apply these tips when checking your products with Mantios
    </p>

    <ul className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
      {CHALLENGES.map(({ id, tip }) => (
        <li
          key={id}
          className="flex flex-col items-start gap-3 rounded-2xl bg-stone-100 p-6 text-left dark:bg-[#101010]"
        >
          <tip.icon size={22} className="text-stone-900 dark:text-stone-100" />
          <p className="text-base font-medium text-stone-900 dark:text-stone-50">{tip.title}</p>
          <p className="text-sm leading-relaxed text-stone-500 dark:text-neutral-400">{tip.text}</p>
        </li>
      ))}
    </ul>

    <div className="mt-14">
      <PillButton onClick={onStart}>Try Mantios</PillButton>
    </div>
  </div>
);

const ChallengeStep = ({ challenge, index, total, onDone }) => {
  const [picked, setPicked] = useState(null); // "A" | "B" | null

  // Which side holds the good image: random once per challenge, stable on retry.
  const goodSide = useMemo(() => (Math.random() < 0.5 ? "A" : "B"), []);
  const images = {
    [goodSide]: challenge.good,
    [goodSide === "A" ? "B" : "A"]: challenge.bad,
  };

  const answered = picked !== null;
  const isCorrect = picked === goodSide;

  const stateFor = (side) => (picked !== side ? "idle" : isCorrect ? "correct" : "wrong");

  return (
    <div>
      <header className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-3xl tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          Challenge {index + 1}
          <span className="flex items-center gap-2 text-sm tracking-normal text-stone-500 dark:text-neutral-400">
            <span className="h-2 w-2 rounded-full bg-[#7B0027]" aria-hidden="true" />
            {challenge.tag}
          </span>
        </h2>
        <ProgressDashes current={index} total={total} />
      </header>

      <div className="mt-8 rounded-xl bg-stone-100 p-5 dark:bg-[#0f0f0f] sm:p-10">
        <h3 className="text-xl text-stone-900 dark:text-stone-50 sm:text-2xl">{challenge.heading}</h3>
        <p className="mt-2 text-sm text-stone-500 dark:text-neutral-500 sm:text-base">{challenge.question}</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {["A", "B"].map((side) => (
            <PictureOption
              key={side}
              label={side}
              src={images[side]}
              state={stateFor(side)}
              disabled={answered}
              onSelect={() => setPicked(side)}
            />
          ))}
        </div>
      </div>

      {answered && (
        <FeedbackBar
          correct={isCorrect}
          message={isCorrect ? challenge.correct : challenge.wrong}
          buttonLabel={isCorrect ? "Continue" : "Try again"}
          // Wrong answer: clear the pick and look again. Only a correct answer moves on.
          onNext={isCorrect ? onDone : () => setPicked(null)}
        />
      )}
    </div>
  );
};

const DoneScreen = ({ onComplete }) => (
  <div className="flex flex-col items-center py-10 text-center">
    <RoundCheck />
    <h2 className="mt-8 text-3xl tracking-tight text-stone-900 dark:text-white sm:text-4xl">
      You’re ready to scan
    </h2>
    <p className="mt-3 max-w-md text-base text-stone-500 dark:text-neutral-400 sm:text-lg">
      Frame the whole product, light it evenly and keep it in focus.
    </p>
    <div className="mt-10">
      <PillButton onClick={onComplete}>Start scanning</PillButton>
    </div>
  </div>
);

/* ============================================================================
   MAIN
   Flow: tips ("Try Mantios") -> challenge 1 -> 2 -> 3 -> done -> onComplete
   ========================================================================== */

export default function ScanTipsChallenge({ onComplete = () => {} }) {
  // -1 = tips screen, 0..n-1 = challenges, n = done
  const [index, setIndex] = useState(-1);

  return (
    <section className="px-4 py-10 sm:px-6 md:px-10" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      <style>{`
        @keyframes feedbackIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .feedback-in { animation: feedbackIn .25s ease-out; }
        @media (prefers-reduced-motion: reduce) { .feedback-in { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-5 shadow-sm dark:bg-[#080808] dark:shadow-none sm:p-10">
        {index === -1 && <TipsScreen onStart={() => setIndex(0)} />}

        {index >= 0 && index < CHALLENGES.length && (
          // key remounts the step so each challenge starts fresh
          <ChallengeStep
            key={CHALLENGES[index].id}
            challenge={CHALLENGES[index]}
            index={index}
            total={CHALLENGES.length}
            onDone={() => setIndex((i) => i + 1)}
          />
        )}

        {index >= CHALLENGES.length && <DoneScreen onComplete={onComplete} />}
      </div>
    </section>
  );
}