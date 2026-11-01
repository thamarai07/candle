import type { CSSProperties } from "react";

// Purely decorative animated layers for the home page, all in the logo's
// colours. Positions are fixed so the server and browser render the same thing.

/** Soft, slowly moving washes of colour. The parent must be `relative isolate`. */
export function Aurora({ vivid = false }: { vivid?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${vivid ? "" : "[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)]"}`}
    >
      <div className="absolute -top-32 -left-24 h-96 w-96 animate-aurora rounded-full bg-blush blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 animate-aurora rounded-full bg-lilac-light blur-3xl [animation-delay:-6s]" />
      <div className="absolute top-1/4 left-1/2 h-80 w-80 animate-aurora rounded-full bg-sun-light blur-3xl [animation-delay:-11s]" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 animate-aurora rounded-full bg-sage-light blur-3xl [animation-delay:-3s]" />
      {vivid && (
        <>
          <div className="absolute -top-24 right-[8%] hidden h-[28rem] w-[28rem] animate-aurora rounded-full bg-ember/30 blur-3xl lg:block [animation-delay:-8s]" />
          <div className="absolute right-[28%] bottom-0 hidden h-80 w-80 animate-aurora rounded-full bg-gold/35 blur-3xl lg:block [animation-delay:-14s]" />
          <div className="absolute top-1/3 -right-20 hidden h-96 w-96 animate-aurora rounded-full bg-lilac/30 blur-3xl lg:block [animation-delay:-4s]" />
        </>
      )}
    </div>
  );
}

const risers = [
  { char: "♥", color: "text-ember", left: "4%", size: "1.5rem", delay: "0s", duration: "11s" },
  { char: "✦", color: "text-gold", left: "11%", size: "1.1rem", delay: "-7s", duration: "9s" },
  { char: "●", color: "text-sky", left: "18%", size: "0.7rem", delay: "-3s", duration: "12s" },
  { char: "♥", color: "text-lilac", left: "26%", size: "1.2rem", delay: "-9s", duration: "10s" },
  { char: "✦", color: "text-ember", left: "34%", size: "0.9rem", delay: "-1s", duration: "13s" },
  { char: "●", color: "text-gold", left: "42%", size: "0.6rem", delay: "-5s", duration: "9s" },
  { char: "♥", color: "text-sky", left: "49%", size: "1.1rem", delay: "-11s", duration: "12s" },
  { char: "✦", color: "text-lilac", left: "56%", size: "1.4rem", delay: "-2s", duration: "10s" },
  { char: "●", color: "text-ember", left: "63%", size: "0.8rem", delay: "-8s", duration: "11s" },
  { char: "♥", color: "text-gold", left: "70%", size: "1.6rem", delay: "-4s", duration: "13s" },
  { char: "✦", color: "text-sky", left: "77%", size: "1rem", delay: "-10s", duration: "9s" },
  { char: "●", color: "text-lilac", left: "84%", size: "0.7rem", delay: "-6s", duration: "12s" },
  { char: "♥", color: "text-ember", left: "90%", size: "1.3rem", delay: "-12s", duration: "10s" },
  { char: "✦", color: "text-gold", left: "96%", size: "1.2rem", delay: "-3.5s", duration: "11s" },
];

/** Hearts, sparkles and little bubbles rising up the section. */
export function RisingSparks({ light = false }: { light?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {risers.map((r) => (
        <span
          key={r.left}
          className={`absolute bottom-0 animate-rise opacity-0 ${light ? "text-cream" : r.color}`}
          style={{ left: r.left, fontSize: r.size, animationDelay: r.delay, animationDuration: r.duration }}
        >
          {r.char}
        </span>
      ))}
    </div>
  );
}

const WAVE = "M0 60 Q 300 0 600 60 T 1200 60 T 1800 60 T 2400 60 V120 H0 Z";

const waveLayers: { color: string; height: string; duration: string; opacity: number }[] = [
  { color: "var(--color-sky)", height: "100%", duration: "16s", opacity: 0.35 },
  { color: "var(--color-gold)", height: "82%", duration: "11s", opacity: 0.45 },
  { color: "var(--color-lilac)", height: "64%", duration: "13s", opacity: 0.5 },
  { color: "var(--color-ember)", height: "46%", duration: "9s", opacity: 0.75 },
];

/** Layers of rolling colour along the bottom of a section. */
export function Waves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 overflow-hidden sm:h-28">
      {waveLayers.map((layer) => (
        <svg
          key={layer.color}
          viewBox="0 0 2400 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-[200%] animate-wave"
          style={{ height: layer.height, animationDuration: layer.duration } as CSSProperties}
        >
          <path d={WAVE} fill={layer.color} opacity={layer.opacity} />
        </svg>
      ))}
    </div>
  );
}

/** The tagline slowly turning around the logo, in the logo's colours. */
export function SpinningTagline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 500"
      className="pointer-events-none absolute inset-0 animate-ring [animation-duration:32s]"
    >
      <defs>
        <linearGradient id="tagline-colours" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-ember)" />
          <stop offset="35%" stopColor="#c2470a" />
          <stop offset="65%" stopColor="var(--color-lilac)" />
          <stop offset="100%" stopColor="#0a6f8f" />
        </linearGradient>
        <path id="tagline-circle" d="M250 250 m-234 0 a234 234 0 1 1 468 0 a234 234 0 1 1 -468 0" />
      </defs>
      <text fontSize="17" fontWeight="600" fill="url(#tagline-colours)">
        <textPath href="#tagline-circle" textLength="1465">
          SMALL FLAMES ✦ BIG HAPPINESS ✦ SMALL FLAMES ✦ BIG HAPPINESS ✦ SMALL FLAMES ✦ BIG HAPPINESS ✦
        </textPath>
      </text>
    </svg>
  );
}
