"use client";

import { useId, type ReactNode } from "react";
import type { Product } from "@/lib/types";

type Art = Product["art"];

const INK = "#5a3115";
const PAPER = "#fdf6ec";

// Illustrated candle used until real product photos are added.
export function CandleArt({
  art,
  lit = true,
  className = "",
}: {
  art: Art;
  lit?: boolean;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const scale = art.scale ?? 1;

  const flame = (x: number, y: number, flameScale = 1) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${flameScale})`}>
      {lit && <circle cx="0" cy="-16" r="30" fill={`url(#${id}-glow)`} />}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="-7"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {lit && (
        <path
          className="animate-flicker"
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          d="M0 -5 C -7 -11 -7 -21 0 -32 C 7 -21 7 -11 0 -5 Z"
          fill={`url(#${id}-flame)`}
        />
      )}
    </g>
  );

  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-flame`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#e07a3c" />
          <stop offset="45%" stopColor="#f6b24f" />
          <stop offset="100%" stopColor="#fff1c9" />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="207" rx={72 * scale} ry="6" fill={INK} opacity="0.1" />
      <g transform={`translate(100 206) scale(${scale}) translate(-100 -206)`}>
        {renderShape(art, id, flame)}
      </g>
    </svg>
  );
}

function petals(
  count: number,
  cy: number,
  rx: number,
  ry: number,
  distance: number,
  fill: string,
  offset = 0,
) {
  return Array.from({ length: count }, (_, i) => (
    <ellipse
      key={`${distance}-${i}`}
      cx="100"
      cy={cy - distance}
      rx={rx}
      ry={ry}
      fill={fill}
      stroke="#000"
      strokeOpacity="0.12"
      transform={`rotate(${offset + (i * 360) / count} 100 ${cy})`}
    />
  ));
}

const LOTUS_PETAL = "M100 202 C 70 176 72 122 100 94 C 128 122 130 176 100 202 Z";

const STAR_POINTS = Array.from({ length: 10 }, (_, i) => {
  const radius = i % 2 ? 38 : 82;
  const angle = -Math.PI / 2 + (i * Math.PI) / 5;
  return `${(100 + radius * Math.cos(angle)).toFixed(1)},${(128 + radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

function renderShape(
  art: Art,
  id: string,
  flame: (x: number, y: number, scale?: number) => ReactNode,
) {
  const sheen = `url(#${id}-sheen)`;

  switch (art.shape) {
    case "tealight":
      return (
        <>
          <path d="M44 150 L156 150 L148 200 Q147 205 141 205 L59 205 Q53 205 52 200 Z" fill="#d9d6d0" />
          <path d="M44 150 L156 150 L148 200 Q147 205 141 205 L59 205 Q53 205 52 200 Z" fill={sheen} />
          <ellipse cx="100" cy="150" rx="56" ry="12" fill="#c9c6c0" />
          <ellipse cx="100" cy="151" rx="50" ry="9" fill={art.wax} />
          {flame(100, 150)}
        </>
      );

    case "jar": {
      const glass = art.vessel ?? "#f6dccb";
      return (
        <>
          <rect x="52" y="78" width="96" height="126" rx="14" fill={glass} opacity="0.55" />
          <rect x="58" y="98" width="84" height="100" rx="9" fill={art.wax} />
          <ellipse cx="100" cy="98" rx="42" ry="6" fill="#000" opacity="0.05" />
          <rect x="52" y="78" width="96" height="126" rx="14" fill={sheen} />
          <rect x="50" y="72" width="100" height="10" rx="5" fill={glass} />
          <rect x="52" y="108" width="96" height="5" fill="#b98a55" />
          {art.label ? (
            <>
              <rect x="70" y="136" width="60" height="38" rx="3" fill={PAPER} />
              <text
                x="100"
                y="160"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="12"
                fill={INK}
                letterSpacing="1"
              >
                {art.label}
              </text>
            </>
          ) : (
            <path
              d="M100 170 C 84 158 80 150 80 144 C 80 136 92 133 100 143 C 108 133 120 136 120 144 C 120 150 116 158 100 170 Z"
              fill="#e82f74"
              opacity="0.8"
            />
          )}
          {flame(100, 98)}
        </>
      );
    }

    case "bubble":
      return (
        <>
          <rect x="54" y="96" width="92" height="108" rx="18" fill={art.wax} />
          {[118, 150, 182].flatMap((cy) =>
            [74, 100, 126].map((cx) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy + 3} r="13" fill="#000" opacity="0.06" />
                <circle cx={cx} cy={cy} r="13" fill={art.wax} />
                <circle cx={cx - 4} cy={cy - 4} r="4" fill="#fff" opacity="0.35" />
              </g>
            )),
          )}
          {flame(100, 98)}
        </>
      );

    case "daisy":
      return (
        <>
          {petals(12, 128, 13, 32, 42, art.wax)}
          <circle cx="100" cy="128" r="22" fill="#f7c948" />
          <circle cx="100" cy="128" r="22" fill={sheen} />
          {flame(100, 128)}
        </>
      );

    case "rose":
      return (
        <>
          {petals(6, 130, 28, 36, 38, art.wax)}
          {petals(5, 130, 24, 28, 22, art.wax, 30)}
          {petals(3, 130, 15, 18, 9, art.wax, 15)}
          {flame(100, 130)}
        </>
      );

    case "lotus":
      return (
        <>
          {[-58, 58, -36, 36, -16, 16, 0].map((angle) => (
            <path
              key={angle}
              d={LOTUS_PETAL}
              fill={art.wax}
              stroke="#000"
              strokeOpacity="0.12"
              transform={`rotate(${angle} 100 202)`}
            />
          ))}
          <path d={LOTUS_PETAL} fill={sheen} />
          {flame(100, 112)}
        </>
      );

    case "tulip":
      return (
        <>
          <path
            d="M58 92 L80 122 L100 88 L120 122 L142 92 C 154 150 138 200 100 205 C 62 200 46 150 58 92 Z"
            fill={art.wax}
          />
          <path d="M100 205 C 76 180 72 146 80 122 L100 88 L120 122 C 128 146 124 180 100 205 Z" fill="#000" opacity="0.06" />
          <path
            d="M58 92 L80 122 L100 88 L120 122 L142 92 C 154 150 138 200 100 205 C 62 200 46 150 58 92 Z"
            fill={sheen}
          />
          {flame(100, 112)}
        </>
      );

    case "heart":
      return (
        <>
          <path
            d="M100 204 C 40 164 26 126 26 102 C 26 72 52 58 74 62 C 88 65 96 74 100 86 C 104 74 112 65 126 62 C 148 58 174 72 174 102 C 174 126 160 164 100 204 Z"
            fill={art.wax}
          />
          <path
            d="M100 204 C 40 164 26 126 26 102 C 26 72 52 58 74 62 C 88 65 96 74 100 86 C 104 74 112 65 126 62 C 148 58 174 72 174 102 C 174 126 160 164 100 204 Z"
            fill={sheen}
          />
          {flame(100, 112)}
        </>
      );

    case "square":
      return (
        <>
          <rect x="44" y="114" width="100" height="90" rx="5" fill={art.wax} />
          <rect x="44" y="114" width="100" height="90" rx="5" fill={sheen} />
          <path d="M144 114 L164 94 L164 184 L144 204 Z" fill={art.wax} />
          <path d="M144 114 L164 94 L164 184 L144 204 Z" fill="#000" opacity="0.14" />
          <path d="M44 114 L64 94 L164 94 L144 114 Z" fill={art.wax} />
          <path d="M44 114 L64 94 L164 94 L144 114 Z" fill="#fff" opacity="0.3" />
          {flame(104, 105)}
        </>
      );

    case "star":
      return (
        <>
          <polygon
            points={STAR_POINTS}
            fill={art.wax}
            stroke={art.wax}
            strokeWidth="10"
            strokeLinejoin="round"
          />
          <polygon points={STAR_POINTS} fill={sheen} />
          {flame(100, 126)}
        </>
      );
  }
}
