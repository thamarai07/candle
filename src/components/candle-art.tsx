"use client";

import { useId, type ReactNode } from "react";
import type { Product } from "@/lib/types";

type Art = Product["art"];

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

  const flame = (x: number, y: number, scale = 1) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${scale})`}>
      {lit && <circle cx="0" cy="-16" r="30" fill={`url(#${id}-glow)`} />}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="-7"
        stroke="#3a2a20"
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

      <ellipse cx="100" cy="207" rx="72" ry="6" fill="#3a2a20" opacity="0.1" />
      {renderShape(art, id, flame)}
    </svg>
  );
}

function renderShape(
  art: Art,
  id: string,
  flame: (x: number, y: number, scale?: number) => ReactNode,
) {
  const sheen = `url(#${id}-sheen)`;

  switch (art.shape) {
    case "jar":
      return (
        <>
          <rect x="52" y="78" width="96" height="126" rx="14" fill={art.vessel} opacity="0.55" />
          <rect x="58" y="98" width="84" height="100" rx="9" fill={art.wax} />
          <ellipse cx="100" cy="98" rx="42" ry="6" fill="#000" opacity="0.05" />
          <rect x="52" y="78" width="96" height="126" rx="14" fill={sheen} />
          <rect x="50" y="72" width="100" height="10" rx="5" fill={art.vessel} />
          {art.label && (
            <>
              <rect x="70" y="136" width="60" height="38" rx="3" fill="#fbf6ef" />
              <text
                x="100"
                y="160"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="12"
                fill="#3a2a20"
                letterSpacing="1"
              >
                {art.label}
              </text>
            </>
          )}
          {flame(100, 98)}
        </>
      );

    case "tumbler":
      return (
        <>
          <path
            d="M56 82 L144 82 L136 200 Q135 206 129 206 L71 206 Q65 206 64 200 Z"
            fill={art.vessel}
            opacity="0.88"
          />
          <ellipse cx="100" cy="94" rx="41" ry="6" fill={art.wax} />
          <path
            d="M56 82 L144 82 L136 200 Q135 206 129 206 L71 206 Q65 206 64 200 Z"
            fill={sheen}
          />
          <rect x="82" y="140" width="36" height="22" rx="2" fill="#fbf6ef" opacity="0.9" />
          <circle cx="100" cy="151" r="3" fill="#3a2a20" opacity="0.6" />
          {flame(100, 94)}
        </>
      );

    case "tin":
      return (
        <>
          <ellipse cx="148" cy="190" rx="34" ry="9" fill={art.vessel} opacity="0.6" />
          <rect x="40" y="142" width="120" height="62" rx="10" fill={art.vessel} />
          <rect x="40" y="166" width="120" height="18" fill="#fbf6ef" opacity="0.55" />
          <rect x="40" y="142" width="120" height="62" rx="10" fill={sheen} />
          <ellipse cx="100" cy="142" rx="60" ry="12" fill={art.vessel} />
          <ellipse cx="100" cy="143" rx="54" ry="9" fill={art.wax} />
          {flame(100, 143)}
        </>
      );

    case "pillar":
      return (
        <>
          <rect x="66" y="62" width="68" height="142" rx="8" fill={art.wax} />
          {[76, 86, 96, 106, 116, 126].map((x) => (
            <line
              key={x}
              x1={x}
              y1="66"
              x2={x}
              y2="200"
              stroke="#000"
              strokeOpacity="0.07"
              strokeWidth="3"
            />
          ))}
          <rect x="66" y="62" width="68" height="142" rx="8" fill={sheen} />
          <ellipse cx="100" cy="64" rx="34" ry="5" fill="#000" opacity="0.05" />
          {flame(100, 64)}
        </>
      );

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

    case "bowl":
      return (
        <>
          <path d="M28 140 Q30 206 100 206 Q170 206 172 140 Z" fill={art.vessel} />
          <path d="M28 140 Q30 206 100 206 Q170 206 172 140 Z" fill={sheen} />
          <ellipse cx="100" cy="140" rx="72" ry="13" fill={art.vessel} />
          <ellipse cx="100" cy="141" rx="65" ry="9" fill={art.wax} />
          <path d="M60 176 Q100 186 140 176" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" fill="none" />
          {flame(72, 141, 0.8)}
          {flame(100, 139, 0.9)}
          {flame(128, 141, 0.8)}
        </>
      );

    case "set": {
      const waxes = [art.wax, "#e5dcef", "#fbf7ee"];
      return (
        <>
          {[58, 100, 142].map((cx, i) => (
            <g key={cx}>
              <rect x={cx - 21} y="112" width="42" height="50" rx="6" fill={art.vessel} />
              <ellipse cx={cx} cy="112" rx="21" ry="5" fill={art.vessel} />
              <ellipse cx={cx} cy="113" rx="18" ry="4" fill={waxes[i]} />
              {flame(cx, 113, 0.7)}
            </g>
          ))}
          <rect x="22" y="148" width="156" height="58" rx="6" fill="#c9a77c" />
          <rect x="22" y="148" width="156" height="58" rx="6" fill={sheen} />
          <rect x="92" y="148" width="16" height="58" fill="#b8603b" opacity="0.85" />
          <rect x="56" y="166" width="30" height="20" rx="2" fill="#fbf6ef" opacity="0.9" />
        </>
      );
    }
  }
}
