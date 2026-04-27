/**
 * ENKUUKA Y'OMWAKA — Light Mode Edition
 * ================================================
 * Royal Buganda New Year Festival · Lubiri Palace, Mengo, Kampala
 * 31st December · Every Year
 *
 * Theme: Warm Ivory & Deep Ink — aged parchment with burnished gold
 * Fonts: Cormorant Garamond (display) + Bebas Neue (headlines) + DM Sans (body)
 */

import { useState, useEffect, useRef, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — Light Mode
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  bg:       "#F7F2E8",
  bg2:      "#EDE5D0",
  bg3:      "#E4D9BF",
  bgNav:    "#FDFAF3",
  ink:      "#1C1A13",
  ink2:     "#3D3925",
  muted:    "#7A6E52",
  gold:     "#c94c4c",
  gold2:    "#C43C3C",
  gold3:    "#D45E5E",
  goldBg:   "rgba(166,124,46,.08)",
  line:     "rgba(166,124,46,.18)",
  lineSoft: "rgba(166,124,46,.10)",
  red:      "#7A1515",
};

// ─────────────────────────────────────────────────────────────────────────────
// FONT INJECTION
// ─────────────────────────────────────────────────────────────────────────────
if (typeof document !== "undefined") {
  const fontId = "enkuuka-fonts";
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    background: ${T.bg};
    color: ${T.ink};
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${T.bg2}; }
  ::-webkit-scrollbar-thumb { background: ${T.gold3}; border-radius: 2px; }
  ::selection { background: ${T.gold3}; color: ${T.ink}; }

  .f-display { font-family: 'Cormorant Garamond', serif; }
  .f-block   { font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; }
  .f-body    { font-family: 'DM Sans', sans-serif; }

  .page-enter { animation: pgEnter 0.4s ease both; }
  @keyframes pgEnter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  .fu { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fu.visible { opacity: 1; transform: none; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    height: 60px; padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between;
    background: ${T.bgNav};
    border-bottom: 1px solid ${T.line};
    box-shadow: 0 1px 16px rgba(28,26,19,.06);
    transition: height .3s;
  }
  .nav.slim { height: 50px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700; color: ${T.ink}; cursor: pointer; letter-spacing: 0.5px; white-space: nowrap; }
  .nav-logo em { color: ${T.gold}; font-style: italic; }
  .nav-links { display: flex; gap: 20px; list-style: none; }
  .nav-links li { font-size: .68rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: ${T.muted}; cursor: pointer; transition: color .2s; padding: 4px 0; border-bottom: 1.5px solid transparent; }
  .nav-links li:hover, .nav-links li.active { color: ${T.ink}; border-bottom-color: ${T.gold}; }
  .nav-cta { background: ${T.gold}; color: #fff; border: none; padding: 8px 18px; font-family: 'DM Sans', sans-serif; font-size: .68rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: .2s; }
  .nav-cta:hover { background: ${T.gold2}; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
  .hamburger span { display: block; width: 22px; height: 1.5px; background: ${T.ink}; border-radius: 1px; transition: .3s; }
  .mob-drawer { display: none; position: fixed; top: 60px; left: 0; right: 0; background: ${T.bgNav}; padding: 20px 24px; z-index: 998; border-bottom: 1px solid ${T.line}; box-shadow: 0 8px 24px rgba(28,26,19,.08); }
  .mob-drawer.open { display: block; }
  .mob-drawer li { list-style: none; padding: 11px 0; font-size: .8rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: ${T.muted}; cursor: pointer; border-bottom: 1px solid ${T.lineSoft}; transition: color .2s; }
  .mob-drawer li:hover { color: ${T.gold}; }

  /* TICKER */
  .ticker { background: ${T.gold}; padding: 9px 0; overflow: hidden; }
  .ticker-track { display: flex; gap: 52px; white-space: nowrap; animation: tickerScroll 28s linear infinite; }
  .ticker-item { font-family: 'Bebas Neue', sans-serif; font-size: .85rem; letter-spacing: 3px; color: rgba(255,255,255,.88); display: inline-flex; align-items: center; gap: 16px; flex-shrink: 0; }
  .ticker-dot { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }
  @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* BUTTONS */
  .btn-gold { background: ${T.gold}; color: #fff; border: none; padding: 13px 30px; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: .75rem; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: .25s; }
  .btn-gold:hover { background: ${T.gold2}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(166,124,46,.22); }
  .btn-outline { background: transparent; color: ${T.gold}; border: 1.5px solid ${T.gold}; padding: 13px 30px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .75rem; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: .25s; }
  .btn-outline:hover { background: ${T.goldBg}; transform: translateY(-1px); }

  /* SECTION LABELS */
  .s-label { display: inline-flex; align-items: center; gap: 8px; font-size: .65rem; letter-spacing: 5px; text-transform: uppercase; color: ${T.gold}; font-weight: 700; margin-bottom: 10px; }
  .s-label::before { content: ''; display: block; width: 20px; height: 1px; background: ${T.gold}; }
  .s-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem, 4vw, 3rem); line-height: 1.05; color: ${T.ink}; margin-bottom: 14px; font-weight: 700; }
  .s-title em { color: ${T.gold}; font-style: italic; }
  .s-body { font-size: .9rem; color: ${T.muted}; line-height: 1.85; max-width: 560px; }

  /* HERO */
  .hero { position: relative; min-height: 100vh; display: flex; align-items: flex-end; padding-bottom: 80px; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(.36) saturate(.9); }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(247,242,232,.05) 0%, rgba(247,242,232,.12) 40%, ${T.bg} 100%); }
  .hero-deco { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, ${T.gold}, ${T.gold2}, ${T.gold}, transparent); }
  .hero-content { position: relative; z-index: 2; padding: 0 48px; max-width: 960px; }
  .hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: .65rem; letter-spacing: 5px; text-transform: uppercase; color: ${T.gold3}; font-weight: 700; margin-bottom: 18px; }
  .hero-eyebrow::before { content: ''; display: block; width: 24px; height: 1px; background: ${T.gold3}; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(3.2rem, 9vw, 7.5rem); line-height: .92; color: #FAF5E8; font-weight: 700; margin-bottom: 8px; text-shadow: 0 2px 40px rgba(28,26,19,.3); }
  .hero-title em { color: ${T.gold3}; font-style: italic; }
  .hero-sub { font-size: .8rem; font-weight: 300; letter-spacing: 6px; text-transform: uppercase; color: rgba(250,245,232,.55); margin-bottom: 28px; }

  /* COUNTDOWN */
  .countdown { display: flex; gap: 3px; margin-bottom: 32px; }
  .cd-block { background: rgba(247,242,232,.12); border: 1px solid rgba(250,245,232,.25); padding: 12px 16px; min-width: 68px; text-align: center; backdrop-filter: blur(4px); }
  .cd-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.6rem, 4vw, 2.4rem); color: #FAF5E8; line-height: 1; display: block; }
  .cd-label { font-size: .55rem; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(250,245,232,.45); margin-top: 4px; display: block; }
  .cd-sep { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: ${T.gold3}; align-self: center; line-height: 1; padding-bottom: 14px; opacity: .55; }

  /* PAGE HERO */
  .phero { position: relative; height: 340px; overflow: hidden; display: flex; align-items: flex-end; padding-bottom: 44px; }
  .phero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(.28) saturate(.85); }
  .phero-ov { position: absolute; inset: 0; background: linear-gradient(to top, ${T.bg} 0%, rgba(247,242,232,.2) 55%, transparent 100%); }
  .phero-content { position: relative; z-index: 2; padding: 0 48px; }
  .phero-content .s-label { color: ${T.gold3}; }
  .phero-content .s-label::before { background: ${T.gold3}; }
  .phero-content .s-title { color: #FAF5E8; }
  .phero-content .s-title em { color: ${T.gold3}; }

  /* SPLIT */
  .split { display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
  .split.rev { direction: rtl; }
  .split.rev > * { direction: ltr; }
  .split-img { position: relative; overflow: hidden; min-height: 420px; }
  .split-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.6); transition: transform .6s ease; display: block; }
  .split:hover .split-img img { transform: scale(1.04); }
  .split-img-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(247,242,232,.12), transparent); }
  .split.rev .split-img-overlay { background: linear-gradient(to left, rgba(247,242,232,.12), transparent); }
  .split-content { background: ${T.bg2}; padding: 60px 52px; display: flex; flex-direction: column; justify-content: center; position: relative; }
  .split-content::before { content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, ${T.gold}, transparent); }
  .split.rev .split-content::before { left: auto; right: 0; }

  /* EVENT CARDS */
  .event-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .event-card { position: relative; overflow: hidden; cursor: pointer; aspect-ratio: 3/4; background: ${T.bg2}; }
  .event-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.55); transition: filter .5s, transform .5s; display: block; }
  .event-card:hover img { filter: brightness(.28); transform: scale(1.06); }
  .event-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(28,26,19,.96) 0%, rgba(28,26,19,.12) 55%, transparent 100%); }
  .event-card-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; }
  .event-card-tag { font-size: .58rem; letter-spacing: 3px; text-transform: uppercase; color: ${T.gold3}; font-weight: 700; margin-bottom: 6px; display: block; }
  .event-card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; color: #FAF5E8; line-height: 1.1; font-weight: 700; }
  .event-card-desc { font-size: .75rem; color: rgba(250,245,232,.45); line-height: 1.55; max-height: 0; overflow: hidden; transition: max-height .4s ease; margin-top: 4px; }
  .event-card:hover .event-card-desc { max-height: 70px; }

  /* KABAKA */
  .kabaka-band { background: linear-gradient(135deg, ${T.bg3}, ${T.bg2}); padding: 60px 48px; text-align: center; border-top: 2px solid ${T.gold3}; border-bottom: 2px solid ${T.gold3}; }
  .kab-stat { padding: 18px 22px; border: 1px solid ${T.line}; background: rgba(255,255,255,.45); text-align: center; min-width: 120px; }

  /* ═══════════════════════════════════════════════════
     CLANS — PRO REDESIGN
  ═══════════════════════════════════════════════════ */

  .clans-section {
    background: ${T.bg};
    padding: 60px 48px;
  }

  .clans-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
    margin-bottom: 44px;
    padding-bottom: 36px;
    border-bottom: 1px solid ${T.line};
  }

  .clans-intro-text {
    font-size: .88rem;
    color: ${T.muted};
    line-height: 1.9;
    margin-top: 12px;
  }

  .clan-filter-bar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .clan-search-wrap {
    position: relative;
  }

  .clan-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${T.muted};
    font-size: .9rem;
    pointer-events: none;
  }

  .clan-search {
    width: 100%;
    padding: 12px 14px 12px 38px;
    background: #fff;
    border: 1px solid ${T.line};
    color: ${T.ink};
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .clan-search:focus {
    border-color: ${T.gold};
    box-shadow: 0 0 0 3px rgba(166,124,46,.1);
  }
  .clan-search::placeholder { color: ${T.muted}; opacity: .5; }

  .clan-filter-pills {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .clan-filter-pill {
    padding: 5px 13px;
    font-size: .6rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: 1px solid ${T.line};
    background: #fff;
    color: ${T.muted};
    cursor: pointer;
    transition: .2s;
  }
  .clan-filter-pill:hover,
  .clan-filter-pill.active {
    background: ${T.gold};
    color: #fff;
    border-color: ${T.gold};
  }

  /* Grid layout */
  .clans-grid-pro {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3px;
  }

  /* Individual clan card */
  .clan-card-pro {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: ${T.bg2};
    aspect-ratio: 3/4;
    group: true;
  }

  .clan-card-pro .clan-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(1) saturate(1);
    transition: transform .65s cubic-bezier(.25,.46,.45,.94), filter .65s ease;
    display: block;
  }

  .clan-card-pro:hover .clan-img {
    filter: brightness(.85) saturate(.9);
    transform: scale(1.08);
  }

  /* Gradient overlays */
  .clan-card-pro .clan-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
    to top,
    rgba(28,26,19,.85) 0%,
    rgba(28,26,19,.25) 50%,
    rgba(28,26,19,0) 100%
);
    transition: background .4s;
  }

  .clan-card-pro:hover .clan-gradient {
    background: linear-gradient(
    to top,
    rgba(28,26,19,.95) 0%,
    rgba(28,26,19,.55) 55%,
    rgba(28,26,19,.1) 100%
  );
  }

  /* Top badge */
  .clan-card-pro .clan-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 3;
    display: flex;
    gap: 5px;
  }

  .clan-badge-pill {
    padding: 3px 8px;
    font-size: .52rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .clan-badge-num {
    background: rgba(28,26,19,.7);
    color: rgba(250,245,232,.55);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(250,245,232,.12);
  }

  .clan-badge-orig {
    background: ${T.gold};
    color: #fff;
  }

  .clan-badge-royal {
    background: #7A1515;
    color: #FAF5E8;
  }

  /* Bottom content */
  .clan-card-pro .clan-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 18px 16px 16px;
    z-index: 3;
  }

  .clan-card-totem-label {
    font-size: .55rem;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: ${T.gold3};
    font-weight: 700;
    margin-bottom: 3px;
    display: block;
    opacity: .85;
  }

  .clan-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #FAF5E8;
    line-height: 1.05;
    margin-bottom: 2px;
  }

  .clan-card-totem {
    font-size: .72rem;
    color: rgba(250,245,232,.55);
    line-height: 1.4;
  }

  /* Hover reveal panel */
  .clan-hover-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    z-index: 4;
    background: transparent;
    transform: translateY(100%);
    transition: transform .4s cubic-bezier(.25,.46,.45,.94);
  }

  .clan-card-pro:hover .clan-hover-panel {
    transform: translateY(0);
  }

  .clan-hover-panel .clan-card-name {
    font-size: 1.3rem;
    margin-bottom: 4px;
  }

  .clan-head-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(250,245,232,.15);
  }

  .clan-head-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${T.gold};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .55rem;
    flex-shrink: 0;
    color: #fff;
  }

  .clan-head-label {
    font-size: .6rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(250,245,232,.4);
    display: block;
    line-height: 1;
    margin-bottom: 1px;
  }

  .clan-head-name {
    font-size: .78rem;
    color: rgba(250,245,232,.75);
    font-weight: 500;
  }

  /* Non-hover bottom (visible always) */
  .clan-static-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 16px;
    z-index: 3;
    transition: opacity .35s;
  }
  .clan-card-pro:hover .clan-static-bottom {
    opacity: 0;
    pointer-events: none;
  }

  /* Count footer */
  .clan-count-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid ${T.lineSoft};
  }

  .clan-count {
    font-size: .75rem;
    color: ${T.muted};
  }

  /* Legend */
  .clan-legend {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .clan-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: .62rem;
    color: ${T.muted};
    letter-spacing: .5px;
  }

  .clan-legend-dot {
    width: 10px;
    height: 10px;
    flex-shrink: 0;
  }

  /* Featured clan (first 2 clans span 2 columns) */
  .clan-card-pro.featured {
    aspect-ratio: unset;
    grid-column: span 2;
    min-height: 380px;
  }

  .clan-card-pro.featured .clan-card-name {
    font-size: 1.6rem;
  }

  .clan-card-pro.featured .clan-card-totem {
    font-size: .82rem;
  }

  /* MASAZA */
  .masaza-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .saza-card { background: #fff; overflow: hidden; transition: .3s; border: 1px solid ${T.lineSoft}; }
  .saza-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(28,26,19,.1); }
  .saza-card img { width: 100%; height: 160px; object-fit: cover; filter: brightness(.52); transition: .5s; display: block; }
  .saza-card:hover img { filter: brightness(.32); transform: scale(1.04); }
  .saza-body { padding: 16px; border-top: 2px solid ${T.lineSoft}; }
  .saza-num { font-family: 'Bebas Neue', sans-serif; font-size: .65rem; color: ${T.gold}; letter-spacing: 2px; margin-bottom: 4px; display: block; }
  .saza-name { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: ${T.ink}; margin-bottom: 2px; }
  .saza-chief { font-size: .72rem; color: ${T.muted}; }
  .saza-desc { font-size: .72rem; color: ${T.muted}; line-height: 1.55; margin-top: 6px; }

  /* TIMELINE */
  .timeline-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .tl-item { display: grid; grid-template-columns: 70px 1fr; gap: 0 16px; padding-bottom: 24px; position: relative; }
  .tl-item::before { content: ''; position: absolute; left: 69px; top: 10px; bottom: -14px; width: 1px; background: ${T.line}; }
  .tl-item:last-child::before { display: none; }
  .tl-time { font-family: 'Bebas Neue', sans-serif; font-size: .85rem; color: ${T.gold}; text-align: right; padding-top: 2px; letter-spacing: .5px; }
  .tl-body { position: relative; padding-left: 14px; }
  .tl-dot { width: 8px; height: 8px; background: ${T.gold}; border-radius: 50%; position: absolute; left: -14px; top: 4px; box-shadow: 0 0 0 3px rgba(166,124,46,.15); }
  .tl-title { font-family: 'Cormorant Garamond', serif; font-size: .95rem; color: ${T.ink}; font-weight: 700; margin-bottom: 2px; }
  .tl-desc { font-size: .75rem; color: ${T.muted}; line-height: 1.65; }

  /* BUSINESS */
  .tab-bar { display: flex; overflow-x: auto; border-bottom: 1px solid ${T.line}; margin-bottom: 28px; scrollbar-width: none; }
  .tab-bar::-webkit-scrollbar { display: none; }
  .tab-btn { padding: 11px 20px; white-space: nowrap; border: none; background: none; font-family: 'DM Sans', sans-serif; font-size: .68rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${T.muted}; cursor: pointer; border-bottom: 1.5px solid transparent; margin-bottom: -1px; transition: .2s; }
  .tab-btn.active, .tab-btn:hover { color: ${T.ink}; border-bottom-color: ${T.gold}; }
  .biz-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .biz-card { background: #fff; border: 1px solid ${T.lineSoft}; overflow: hidden; transition: .3s; }
  .biz-card:hover { border-color: ${T.line}; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(28,26,19,.08); }
  .biz-card img { width: 100%; height: 130px; object-fit: cover; filter: brightness(.62); transition: .4s; display: block; }
  .biz-card:hover img { filter: brightness(.38); transform: scale(1.04); }
  .biz-body { padding: 16px; }
  .biz-tag { font-size: .6rem; letter-spacing: 3px; text-transform: uppercase; color: ${T.gold}; margin-bottom: 4px; display: block; }
  .biz-title { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 700; color: ${T.ink}; margin-bottom: 4px; }
  .biz-desc { font-size: .77rem; color: ${T.muted}; line-height: 1.65; margin-bottom: 10px; }
  .biz-cta { font-size: .62rem; letter-spacing: 2px; text-transform: uppercase; color: ${T.gold}; cursor: pointer; transition: letter-spacing .2s; display: inline-block; font-weight: 700; }
  .biz-cta:hover { letter-spacing: 3px; }

  /* GALLERY */
  .gal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
  .gal-item { position: relative; overflow: hidden; cursor: pointer; aspect-ratio: 4/3; }
  .gal-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.65); transition: .45s; display: block; }
  .gal-item:hover img { filter: brightness(.3); transform: scale(1.05); }
  .gal-item-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(28,26,19,.35); opacity: 0; transition: opacity .3s; }
  .gal-item:hover .gal-item-overlay { opacity: 1; }
  .gal-item-title { font-family: 'Cormorant Garamond', serif; font-size: .95rem; font-weight: 700; color: #FAF5E8; letter-spacing: 1px; }
  .gal-item-sub { font-size: .6rem; letter-spacing: 3px; text-transform: uppercase; color: ${T.gold3}; margin-top: 4px; }

  /* LIGHTBOX */
  .lightbox { position: fixed; inset: 0; background: rgba(247,242,232,.97); z-index: 2000; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; cursor: pointer; padding: 20px; }
  .lightbox img { max-width: 100%; max-height: 75vh; object-fit: contain; display: block; border: 1px solid ${T.line}; box-shadow: 0 20px 60px rgba(28,26,19,.15); }

  /* HOTELS */
  .hotel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .hotel-card { position: relative; overflow: hidden; cursor: pointer; }
  .hotel-card img { width: 100%; height: 220px; object-fit: cover; filter: brightness(.52); transition: .5s; display: block; }
  .hotel-card:hover img { filter: brightness(.28); transform: scale(1.04); }
  .hotel-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(to top, rgba(28,26,19,.97), transparent); }
  .hotel-stars { font-size: .8rem; color: ${T.gold3}; margin-bottom: 3px; }
  .hotel-name { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: #FAF5E8; margin-bottom: 2px; }
  .hotel-loc { font-size: .7rem; color: rgba(250,245,232,.45); margin-bottom: 7px; }
  .hotel-price { font-size: .78rem; color: ${T.gold3}; font-weight: 600; }
  .hotel-book { display: none; background: ${T.gold}; color: #fff; border: none; padding: 7px 18px; font-size: .65rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; margin-top: 8px; transition: .2s; }
  .hotel-card:hover .hotel-book { display: block; }
  .hotel-book:hover { background: ${T.gold2}; }

  /* INVITATION */
  .inv-card { max-width: 440px; margin: 0 auto; background: #fff; border: 1px solid ${T.line}; overflow: hidden; box-shadow: 0 8px 40px rgba(28,26,19,.1); }
  .inv-top { background: linear-gradient(135deg, ${T.bg3}, ${T.bg2}); padding: 28px 36px; text-align: center; border-bottom: 1px solid ${T.line}; }
  .inv-body { padding: 32px 36px; text-align: center; }
  .inv-divider { height: 1px; background: ${T.line}; margin: 16px 0; }

  /* CONTACT */
  .contact-input { width: 100%; padding: 12px 14px; background: #fff; border: 1px solid ${T.line}; color: ${T.ink}; font-family: 'DM Sans', sans-serif; font-size: .85rem; outline: none; transition: border-color .2s; margin-bottom: 12px; resize: none; }
  .contact-input:focus { border-color: ${T.gold}; box-shadow: 0 0 0 3px rgba(166,124,46,.1); }
  .contact-input::placeholder { color: ${T.muted}; opacity: .55; }

  /* SPONSORS */
  .sponsors-band { background: ${T.bg2}; border-top: 1px solid ${T.lineSoft}; border-bottom: 1px solid ${T.lineSoft}; padding: 28px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: center; }
  .sponsor-pill { padding: 8px 20px; border: 1px solid ${T.line}; font-size: .65rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: ${T.muted}; cursor: pointer; transition: .2s; background: #fff; }
  .sponsor-pill:hover { border-color: ${T.gold}; color: ${T.ink}; background: ${T.goldBg}; }

  /* STATS */
  .stats-strip { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid ${T.line}; background: ${T.bg2}; }
  .stat-cell { padding: 28px 20px; text-align: center; border-right: 1px solid ${T.line}; }
  .stat-cell:last-child { border-right: none; }
  .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: ${T.gold}; display: block; line-height: 1; }
  .stat-label { font-size: .62rem; letter-spacing: 3px; text-transform: uppercase; color: ${T.muted}; margin-top: 4px; display: block; }

  /* FOOTER */
  .footer { background: ${T.bg3}; border-top: 2px solid ${T.gold2}; padding: 52px 48px 28px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 44px; margin-bottom: 44px; padding-bottom: 36px; border-bottom: 1px solid ${T.line}; }
  .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: ${T.ink}; }
  .footer-brand em { color: ${T.gold}; }
  .footer-tagline { font-size: .82rem; color: ${T.muted}; line-height: 1.75; margin: 10px 0 18px; max-width: 280px; }
  .footer-col-head { font-size: .62rem; letter-spacing: 3px; text-transform: uppercase; color: ${T.gold}; margin-bottom: 14px; font-weight: 700; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 9px; }
  .footer-links li { font-size: .82rem; color: ${T.muted}; cursor: pointer; transition: color .2s; }
  .footer-links li:hover { color: ${T.ink}; }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
  .footer-copy { font-size: .72rem; color: ${T.muted}; opacity: .6; }
  .social-row { display: flex; gap: 7px; }
  .social-btn { width: 32px; height: 32px; border: 1px solid ${T.line}; display: flex; align-items: center; justify-content: center; font-size: .78rem; color: ${T.muted}; cursor: pointer; transition: .2s; background: #fff; }
  .social-btn:hover { border-color: ${T.gold}; color: ${T.gold}; }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .clans-grid-pro { grid-template-columns: repeat(3, 1fr); }
    .clan-card-pro.featured { grid-column: span 1; min-height: auto; aspect-ratio: 3/4; }
    .clans-header { grid-template-columns: 1fr; gap: 28px; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none; }
    .hamburger { display: flex; }
    .hero-content, .phero-content { padding: 0 24px; }
    .split, .timeline-grid { grid-template-columns: 1fr; }
    .split-img { min-height: 260px; }
    .split-content { padding: 36px 24px; }
    .event-grid, .gal-grid, .masaza-grid { grid-template-columns: repeat(2, 1fr); }
    .clans-grid-pro { grid-template-columns: repeat(2, 1fr); }
    .clans-section { padding: 40px 24px; }
    .hotel-grid { grid-template-columns: repeat(2, 1fr); }
    .biz-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
    .stats-strip { grid-template-columns: 1fr; }
    .kabaka-band { padding: 40px 24px; }
  }
  @media (max-width: 480px) {
    .event-grid, .gal-grid, .clans-grid-pro, .masaza-grid, .hotel-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 3rem; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const IMG = {
  hero:      "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/king_Saha.png",
  drums:     "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Maganda.jpeg",
  dance:     "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/maganda.png",
  market:    "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/trade.png",
  palace:    "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Buganda.png",
  fireworks: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/CountDown.png",
  music:     "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Afrigo_Band.png",
  culture:   "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Cultural_Exhibition.png",
  hotel:     "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80",
  hotel2:    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80",
  hotel3:    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=80",
  crowd:     "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Enkkuka_Atmosphere.png",
  craft:     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  food:      "https://images.unsplash.com/photo-1565299715199-866c917206bb?w=700&q=80",
  kingdom:   "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Buganda.png",
  dress:     "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/DressCode.png",
  traditional:"http://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Barkcloth.png",
  king:       "http://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Kabaka.png",
};

// ─────────────────────────────────────────────────────────────────────────────
// CLANS DATA — with totem images
// ─────────────────────────────────────────────────────────────────────────────
const CLANS = [
  { n: "Ffumbe",          totem: "African Civet",         head: "Walusimbi",               orig: true,  img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/civet.png" },
  { n: "Lugave",          totem: "Pangolin",              head: "Ndugwa",                  orig: true,  img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/pangolin.jpg" },
  { n: "Ngonge",          totem: "Otter",                 head: "Nakigoye Kisolo",         orig: true,  img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/otter.jpg" },
  { n: "Njaza",           totem: "Reedbuck",              head: "Kitanda",                 orig: true,  img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/ReedBuck.jpg" },
  { n: "Nnyonyi",         totem: "Bird (General)",        head: "Mukwenda",                orig: true,  img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=640&q=80" },
  { n: "Abalangira",      totem: "Royal — no totem",      head: "Ssaabataka (Kabaka)",     royal: true, img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Royals.jpg" },
  { n: "Mmamba",          totem: "Lungfish",              head: "Ggunju",                              img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/LungFish.jpg" },
  { n: "Ngo",             totem: "Leopard",               head: "Muteesasira",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Leopard.jpg" },
  { n: "Ngabi",           totem: "Bushbuck",              head: "Nsamba Lukonge",                      img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/BushBuck.jpg" },
  { n: "Ngaali",          totem: "Crested Crane",         head: "Mawesano",                            img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/CrestedCrane.jpg" },
  { n: "Ngeye",           totem: "Colobus Monkey",        head: "Kasujja",                             img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/ColobusMonkey.jpg" },
  { n: "Nkejje",          totem: "Sprat Fish",            head: "Kikwata",                             img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/SpratFish2.jpg" },
  { n: "Njovu",           totem: "Elephant",              head: "Mukalo",                              img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/elephant.jpg" },
  { n: "Nkima",           totem: "Monkey",                head: "Mugema",                              img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/monkey.jpg" },
  { n: "Mbogo",           totem: "Buffalo",               head: "Kayiira Gajule",                      img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Buffalo.jpg" },
  { n: "Mbwa",            totem: "Dog",                   head: "Mutasingwa",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Dog.jpg" },
  { n: "Nte",             totem: "Cow",                   head: "Katongole",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/cow.jpg" },
  { n: "Musu",            totem: "Cane Rat",              head: "Jajja Muyingo",                       img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/CaneRat.png" },
  { n: "Mutima",          totem: "Heart",                 head: "Namugera Kakeeto",                    img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Heart.jpg" },
  { n: "Kkobe",           totem: "Creeping Plant",        head: "Bakiranze",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Kkobe.jpg" },
  { n: "Kasimba",         totem: "Genet Cat",             head: "Kizito",                              img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/GenetCat.jpg" },
  { n: "Kayozi",          totem: "White Ant (Nsenene)",   head: "Kafumu",                              img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Macrotermes.jpg/640px-Macrotermes.jpg" },
  { n: "Butiko",          totem: "Mushroom",              head: "Katumba",                             img: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=640&q=80" },
  { n: "Nseenene",        totem: "Grasshopper",           head: "Ssenga",                              img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Female_Grasshopper.jpg/640px-Female_Grasshopper.jpg" },
  { n: "Ntalaganya",      totem: "Oribi Antelope",        head: "Nakatudde",                           img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Oribi_antelope.jpg/640px-Oribi_antelope.jpg" },
  { n: "Ejjobyo",         totem: "Oriole Bird",           head: "Ssejjemba",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/OrioleBird.jpg" },
  { n: "Obutiko",         totem: "Fungus",                head: "Nkumba",                              img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Mushroom.jpg" },
  { n: "Mpindi",          totem: "Black-eyed Pea",        head: "Luyiga",                              img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/BlackEyedPea.jpg" },
  { n: "Nnume",           totem: "Male Reedbuck",         head: "Wasswa",                              img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Reedbuck.jpg" },
  { n: "Nvuma",           totem: "Granary",               head: "Ssemwanga",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Granary.jpg" },
  { n: "Nkula",           totem: "Red Ochre",             head: "Nkula Omutaka",                       img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Rhinocerous.jpg" },
  { n: "Tttege",          totem: "Francolin Bird",        head: "Sseggane",                            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Dendroperdix_sephaena%2C_gekuifde_frankolien%2C_at_Pilanesberg.jpg/640px-Dendroperdix_sephaena%2C_gekuifde_frankolien%2C_at_Pilanesberg.jpg" },
  { n: "Nkwavu",          totem: "Squirrel",              head: "Ssebukuuza",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Squirrel.jpg" },
  { n: "Ndiga",           totem: "Sheep",                 head: "Ssemwogerere",                        img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Sheep.jpg" },
  { n: "Mazzi ga Kisasi", totem: "Water Droplets",        head: "Wooyo",                               img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/RainWater.png" },
  { n: "Mamba Kakoboza",  totem: "Lungfish (sub-clan)",   head: "Bbosa",                               img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Protopterus_annectens.jpg/640px-Protopterus_annectens.jpg" },
  { n: "Ngabi Enyunga",   totem: "Bushbuck (sub-clan)",   head: "Nsamba",                              img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Tragelaphus_scriptus_sylvaticus_-_Kruger_National_Park.jpg/640px-Tragelaphus_scriptus_sylvaticus_-_Kruger_National_Park.jpg" },
  { n: "Omutima Omusaggi",totem: "Brave Heart",           head: "Namugera (new clan)",                 img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=640&q=80" },
  { n: "Lugave Omusajja", totem: "Male Pangolin",         head: "Kizito Lukyagalula",                  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Manis_javanica_-_Crane%2C_26_June_2012.jpg/640px-Manis_javanica_-_Crane%2C_26_June_2012.jpg" },
  { n: "Kasimba Akabbiro",totem: "Genet (secondary)",     head: "Mugamba",                             img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Genetta_genetta_felina_%28Wroclaw_zoo%29-2.jpg/640px-Genetta_genetta_felina_%28Wroclaw_zoo%29-2.jpg" },
  { n: "Nnyonyi Ennume",  totem: "Male Bird",             head: "Segawa",                              img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=640&q=80" },
  { n: "Nnyonyi Omukazi", totem: "Female Bird",           head: "Nassolo",                             img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=640&q=80" },
  { n: "Ngonge Omukazi",  totem: "Female Otter",          head: "Nakyeswa",                            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Fischotter%2C_Lutra_Lutra.JPG/640px-Fischotter%2C_Lutra_Lutra.JPG" },
  { n: "Mbogo Omukazi",   totem: "Female Buffalo",        head: "Najjemba",                            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/African_Buffalo_Syncerus_caffer.jpg/640px-African_Buffalo_Syncerus_caffer.jpg" },
  { n: "Ffumbe Omukazi",  totem: "Female Civet",          head: "Nakku",                               img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/African_civet.jpg/640px-African_civet.jpg" },
  { n: "Njaza Omukazi",   totem: "Female Reedbuck",       head: "Nakirya",                             img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Redunca_arundinum_%28Serengeti%2C_2009%29.jpg/640px-Redunca_arundinum_%28Serengeti%2C_2009%29.jpg" },
  { n: "Ngo Omukazi",     totem: "Female Leopard",        head: "Nakangu",                             img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Leopard_in_the_wild.jpg/640px-Leopard_in_the_wild.jpg" },
  { n: "Lugave Omukazi",  totem: "Female Pangolin",       head: "Nassuna",                             img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Manis_javanica_-_Crane%2C_26_June_2012.jpg/640px-Manis_javanica_-_Crane%2C_26_June_2012.jpg" },
  { n: "Enkebuka",        totem: "(Historical)",          head: "Extinct c.1993",                      img: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=640&q=80" },
  { n: "Olukato",         totem: "(Historical)",          head: "Extinct c.1993",                      img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/LukatoClan.jpg" },
  { n: "Embuzi",          totem: "Goat",                  head: "Historical clan",                     img: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=640&q=80" },
  { n: "Nkwavu Omukazi",  totem: "Female Squirrel",       head: "Nassolo Nkwavu",                      img: "https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=640&q=80" },
];

const MASAZA = [
  { n: "Kyadondo",  chief: "Ssabaganzi",       img: IMG.palace,    desc: "Home to Kampala. One of the four original Buganda counties, seat of the Kabaka." },
  { n: "Busiro",    chief: "Mugema",            img: IMG.culture,   desc: "Ancient heartland containing the UNESCO-listed Kasubi Royal Tombs." },
  { n: "Kyaggwe",   chief: "Kago",              img: IMG.crowd,     desc: "Eastern county rich in Lake Victoria islands and fertile agricultural land." },
  { n: "Buddu",     chief: "Pokino",            img: IMG.market,    desc: "Southern county with the Katonga River border, known for fertile soils." },
  { n: "Ssingo",    chief: "Kasujju",           img: IMG.drums,     desc: "Large northern county with significant cultural and agricultural heritage." },
  { n: "Mawokota",  chief: "Kangawo",           img: IMG.dance,     desc: "Original Buganda county west of Kyadondo, known for Lake Victoria shores." },
  { n: "Busujju",   chief: "Kitunzi",           img: IMG.craft,     desc: "Western county historically part of the core Buganda territory." },
  { n: "Bulemeezi", chief: "Kimbugwe",          img: IMG.food,      desc: "Northwestern county bordering Ssingo and Buruuli with rolling landscape." },
  { n: "Buruuli",   chief: "Kimbugwe",          img: IMG.fireworks, desc: "Northern county situated on the shores of Lake Kyoga." },
  { n: "Bugerere",  chief: "Mugema wa Bugerere",img: IMG.music,     desc: "Eastern county bordered by the River Nile and Lake Kyoga." },
  { n: "Gomba",     chief: "Kasujju wa Gomba",  img: IMG.palace,    desc: "Southwestern county bordering the greater Ankole region." },
  { n: "Butambala", chief: "Namasole",          img: IMG.culture,   desc: "Small but culturally significant county in central Buganda." },
  { n: "Mubende",   chief: "Mugema wa Mubende", img: IMG.crowd,     desc: "Western county historically contested with the Bunyoro Kingdom." },
  { n: "Buwekula",  chief: "Katambala",         img: IMG.market,    desc: "Northwestern county known for rolling hills and pastoral farming." },
  { n: "Ssese",     chief: "Gabunga",           img: IMG.drums,     desc: "Sacred island county on Lake Victoria — the autonomous islands of the gods." },
  { n: "Kabula",    chief: "Mukwenda",          img: IMG.dance,     desc: "Southern county, site of historically significant battles and migrations." },
  { n: "Kooki",     chief: "Ssabaganzi wa Kooki",img: IMG.craft,    desc: "Southwestern county with close cultural ties to Rwanda." },
  { n: "Buvuma",    chief: "Mugema wa Buvuma",  img: IMG.fireworks, desc: "Island county in Lake Victoria, renowned for its fishing communities." },
];

const TICKER_WORDS = [
  "31 December", "Lubiri Palace", "Mengo Kampala",
  "52 Clans", "18 Masaza", "Cultural Performances",
  "Trade Fair", "Fireworks Midnight", "Kabaka's Presence",
  "Live Music", "Open to All", "Buganda Kingdom",
];

const HOME_EVENTS = [
  { tag: "Culture",       title: "Royal Drumming & Dance", desc: "Ancient Kiganda royal drums and Baakisimba dancers in full regalia.", img: IMG.drums    },
  { tag: "Entertainment", title: "Live Music Stage",        desc: "Uganda's top artists performing through the night until midnight.", img: IMG.music    },
  { tag: "Trade Fair",    title: "SME Marketplace",         desc: "200+ vendors, corporates and SMEs under one royal roof.",           img: IMG.market   },
  { tag: "Fireworks",     title: "New Year Countdown",      desc: "Spectacular fireworks over Lubiri Palace as the clock strikes 12.", img: IMG.fireworks},
  { tag: "Heritage",      title: "Cultural Exhibitions",    desc: "Bark cloth, traditional dress, Buganda history on display.",        img: IMG.culture  },
  { tag: "Community",     title: "Festival Atmosphere",     desc: "50,000 people united — food, laughter and Kiganda pride.",          img: IMG.crowd    },
];

const ARTISTS = [
  { tag: "Headline",      title: "Eddy Kenzo",          desc: "Grammy-nominated afrobeat king — the biggest set of the night.", img: IMG.music   },
  { tag: "Cultural",      title: "Abasakiiko Ensemble",  desc: "Royal Buganda drumming and dance — cultural soul of the evening.", img: IMG.drums  },
  { tag: "DJ Set",        title: "DJ Slick Stuart",      desc: "Uganda's premier DJ spinning Afrobeats and Ugandan sounds all night.", img: IMG.crowd },
  { tag: "Special Guest", title: "Zuena Kirema",         desc: "Beloved Ugandan singer performing classics under the Lubiri stars.", img: IMG.culture},
  { tag: "Dance",         title: "Muyinza Dance Troupe", desc: "Spectacular traditional Buganda dances in full ceremonial dress.", img: IMG.dance  },
  { tag: "Rising Star",   title: "Azawi",                desc: "New-generation Ugandan music, live at Enkuuka for the first time.", img: IMG.music  },
];

const BIZ_TABS = ["Small Businesses", "Trade Fair", "Services", "Tourism", "Transport"];
const BIZ_DATA = {
  "Small Businesses": [
    { tag: "Food",     title: "Fast Food Vendors",   desc: "Rolex, nyama choma, matoke — street food for thousands of guests.",  img: IMG.food    },
    { tag: "Crafts",   title: "Handmade Crafts",     desc: "Bark cloth, jewelry, pottery and bespoke Ugandan fashion.",         img: IMG.craft   },
    { tag: "Beverages",title: "Drink Stands",        desc: "Cold drinks, fresh juices, local brews at prime locations.",       img: IMG.market  },
    { tag: "Services", title: "Photo Services",      desc: "Professional portrait and event photography on site.",             img: IMG.culture },
  ],
  "Trade Fair": [
    { tag: "Corporate",  title: "Corporate Exhibitions", desc: "Showcase products to 50,000+ attendees with premium stands.",  img: IMG.crowd   },
    { tag: "SME",        title: "SME Marketplace",       desc: "Curated zone connecting small businesses to buyers.",          img: IMG.market  },
    { tag: "Launch",     title: "Product Launches",      desc: "Announce new products to a massive New Year audience.",        img: IMG.music   },
    { tag: "Networking", title: "B2B Zone",              desc: "Space for investors and entrepreneurs to connect.",            img: IMG.palace  },
  ],
  "Services": [
    { tag: "Gov",     title: "NIRA Registration",  desc: "On-site National ID registration for all citizens.",       img: IMG.crowd   },
    { tag: "Health",  title: "Blood Donation",     desc: "Uganda Blood Transfusion Services life-saving drive.",     img: IMG.culture },
    { tag: "Telecom", title: "MTN · Airtel",       desc: "SIM registration, data bundles and mobile money services.",img: IMG.market  },
    { tag: "Medical", title: "Free Health Checks", desc: "Immunization, screening and first aid available on site.", img: IMG.palace  },
  ],
  "Tourism": [
    { tag: "UNESCO",   title: "Kasubi Tombs",      desc: "World Heritage Site — royal tombs of the Buganda kings.",   img: IMG.palace  },
    { tag: "Royal",    title: "Lubiri Palace Tour", desc: "Tour the historic Mengo Palace grounds during the event.", img: IMG.culture },
    { tag: "Wildlife", title: "Bwindi Forest",     desc: "Gorilla trekking packages available at the tourism desk.", img: IMG.drums   },
    { tag: "City",     title: "Discover Kampala",  desc: "Guided tours of Owino Market and the National Museum.",   img: IMG.crowd   },
  ],
  "Transport": [
    { tag: "Shuttle",  title: "Festival Shuttle",  desc: "Buses from Kampala city center to Lubiri every 20 minutes.", img: IMG.crowd   },
    { tag: "Boda",     title: "Boda Boda Zones",   desc: "Marshaled boda drop-off areas inside and outside the venue.", img: IMG.market },
    { tag: "Parking",  title: "Private Parking",   desc: "3 designated parking zones with 24-hour security guards.",  img: IMG.palace  },
    { tag: "Ride",     title: "Bolt & SafeBoda",   desc: "Dedicated pick-up and drop-off at the main entrance gate.", img: IMG.culture },
  ],
};

const PROGRAMME = [
  { time: "9:00AM",  title: "Gates Open",            desc: "Trade fair and service tents begin operations at Lubiri Palace." },
  { time: "10:00AM", title: "Business Exhibition",   desc: "200+ SME and corporate exhibitors officially open their stands." },
  { time: "12:00PM", title: "Cultural Performances", desc: "Royal drumming, Baakisimba dance and traditional showcases begin." },
  { time: "2:00PM",  title: "Kabaka's Arrival",      desc: "His Majesty the Kabaka of Buganda presides over celebrations." },
  { time: "3:30PM",  title: "Speeches & Addresses",  desc: "Kingdom leaders and government representatives address the nation." },
  { time: "5:00PM",  title: "Main Stage Opens",      desc: "Supporting artists warm up the crowd as the sun begins to set." },
  { time: "7:00PM",  title: "Headline Performances", desc: "Top Ugandan artists deliver full headline sets on the main stage." },
  { time: "11:00PM", title: "Pre-Countdown",         desc: "Final DJ set and crowd preparation for the New Year countdown." },
  { time: "12:00AM", title: "New Year Fireworks!",   desc: "Fireworks explode above Lubiri Palace. Happy New Year, Uganda!" },
];

const HOTELS = [
  { name: "Kampala Serena Hotel",  loc: "Kintu Road",    price: "UGX 380,000/night", stars: "★★★★★", img: IMG.hotel  },
  { name: "Sheraton Kampala",      loc: "Ternan Ave",    price: "UGX 290,000/night", stars: "★★★★★", img: IMG.hotel2 },
  { name: "Pearl of Africa Hotel", loc: "Nakasero",      price: "UGX 240,000/night", stars: "★★★★",  img: IMG.hotel3 },
  { name: "Protea Hotel Kampala",  loc: "Wampewo Ave",   price: "UGX 160,000/night", stars: "★★★★",  img: IMG.hotel  },
  { name: "Emin Pasha Hotel",      loc: "Akii-Bua Road", price: "UGX 140,000/night", stars: "★★★",   img: IMG.hotel2 },
  { name: "Mengo Palace Guest",    loc: "Mengo",         price: "UGX 85,000/night",  stars: "★★★",   img: IMG.hotel3 },
];

const GALLERY_ITEMS = [
  { src: IMG.drums,    title: "Royal Drumming",    sub: "Culture"       },
  { src: IMG.dance,    title: "Traditional Dance", sub: "Heritage"      },
  { src: IMG.market,   title: "Trade Fair",        sub: "Business"      },
  { src: IMG.fireworks,title: "New Year Fireworks",sub: "Celebration"   },
  { src: IMG.music,    title: "Live Music Stage",  sub: "Entertainment" },
  { src: IMG.culture,  title: "Cultural Exhibition",sub:"Heritage"      },
  { src: IMG.crowd,    title: "Festival Crowd",    sub: "Community"     },
  { src: IMG.palace,   title: "Lubiri Palace",     sub: "Venue"         },
  { src: IMG.food,     title: "Food Market",       sub: "Trade Fair"    },
];

const SPONSORS = [
  "MTN Uganda", "Airtel Uganda", "Roofings Group",
  "Bank of Uganda", "URA", "Uganda Tourism Board",
  "NBS TV", "KCCA",
];

const ALL_PAGES = [
  "Home","Culture","Clans","Masaza","Entertainment",
  "Business","Programme","Gallery","Accommodation","Invitation","Contact",
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY HOOKS
// ─────────────────────────────────────────────────────────────────────────────

function useCountdown() {
  const calc = () => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    if (now > target) target.setFullYear(target.getFullYear() + 1);
    const diff = target - now;
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [cd, setCd] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setCd(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return cd;
}

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transitionDelay = delay + "s";
        el.classList.add("visible");
        ob.disconnect();
      }
    }, { threshold: 0.1 });
    ob.observe(el);
    return () => ob.disconnect();
  }, [delay]);
  return ref;
}

const FU = ({ children, delay = 0, style = {} }) => {
  const ref = useFadeIn(delay);
  return <div ref={ref} className="fu" style={style}>{children}</div>;
};

const pad = (n) => String(n).padStart(2, "0");

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function Ticker() {
  const items = [...TICKER_WORDS, ...TICKER_WORDS];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} className="ticker-item">
            {t}<span className="ticker-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

function PageHero({ img, label, title, titleAccent }) {
  return (
    <div className="phero">
      <img src={img} alt={label} loading="lazy" />
      <div className="phero-ov" />
      <div className="phero-content">
        <p className="s-label">{label}</p>
        <h1 className="s-title f-display" style={{ fontSize: "clamp(1.8rem,5vw,3.6rem)" }}>
          {title} {titleAccent && <em>{titleAccent}</em>}
        </h1>
      </div>
    </div>
  );
}

function EventCard({ tag, title, desc, img }) {
  return (
    <div className="event-card">
      <img src={img} alt={title} loading="lazy" />
      <div className="event-card-overlay" />
      <div className="event-card-body">
        <span className="event-card-tag">{tag}</span>
        <p className="event-card-title f-display">{title}</p>
        <p className="event-card-desc">{desc}</p>
      </div>
    </div>
  );
}

function SplitSection({ img, label, title, titleAccent, body, cta, onCta, reverse = false, children }) {
  return (
    <div className={`split${reverse ? " rev" : ""}`}>
      <div className="split-img">
        <img src={img} alt={title} loading="lazy" />
        <div className="split-img-overlay" />
      </div>
      <div className="split-content">
        <FU>
          <p className="s-label">{label}</p>
          <h2 className="s-title f-display">{title}{titleAccent && <> <em>{titleAccent}</em></>}</h2>
          {body && <p className="s-body" style={{ marginBottom: 22 }}>{body}</p>}
          {children}
          {cta && <button className="btn-gold" onClick={onCta} style={{ alignSelf: "flex-start" }}>{cta}</button>}
        </FU>
      </div>
    </div>
  );
}

function PageFooter({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand f-display">Enkuuka <em>y'Omwaka</em></p>
          <p className="footer-tagline">Uganda's premier cultural and economic festival. Every 31st December at Lubiri Palace, Mengo — celebrating Buganda heritage with the world.</p>
          <div className="social-row">
            {["𝕏", "f", "▶", "📷"].map((s, i) => (
              <div key={i} className="social-btn">{s}</div>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-col-head">Event</p>
          <ul className="footer-links">
            {["Home","Culture","Clans","Masaza","Entertainment","Programme"].map(p => (
              <li key={p} onClick={() => go(p)}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-col-head">Attend</p>
          <ul className="footer-links">
            {["Accommodation","Business","Gallery","Invitation","Contact"].map(p => (
              <li key={p} onClick={() => go(p)}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-col-head">Contact</p>
          <ul className="footer-links">
            <li>Lubiri Palace, Mengo</li>
            <li>Kampala, Uganda</li>
            <li>info@enkuuka.ug</li>
            <li>+256 414 000 000</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Enkuuka y'Omwaka · Buganda Kingdom · All rights reserved</p>
        <div className="social-row">
          {["𝕏", "f", "▶", "📷"].map((s, i) => (
            <div key={i} className="social-btn">{s}</div>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────

function Nav({ page, setPage }) {
  const [slim, setSlim] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const h = () => setSlim(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (p) => { setPage(p); setMob(false); window.scrollTo(0, 0); };
  const NAV_PAGES = ["Home","Culture","Clans","Masaza","Entertainment","Business","Gallery","Accommodation"];
  return (
    <>
      <nav className={`nav${slim ? " slim" : ""}`}>
        <div className="nav-logo f-display" onClick={() => go("Home")}>
          Enkuuka <em>y'Omwaka</em>
        </div>
        <ul className="nav-links">
          {NAV_PAGES.map((p) => (
            <li key={p} className={page === p ? "active" : ""} onClick={() => go(p)}>{p}</li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="nav-cta" onClick={() => go("Invitation")}>Get Tickets</button>
          <div className="hamburger" onClick={() => setMob((o) => !o)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>
      <div className={`mob-drawer${mob ? " open" : ""}`}>
        <ul>
          {ALL_PAGES.map((p) => (
            <li key={p} onClick={() => go(p)}>{p}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  const cd = useCountdown();
  return (
    <div className="page-enter">
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${IMG.hero})` }} />
        <div className="hero-overlay" />
        <div className="hero-deco" />
        <div className="hero-content">
          <p className="hero-eyebrow">Lubiri Palace · Mengo · Kampala</p>
          <h1 className="hero-title f-display">
            Enkuuka<br /><em>y'Omwaka</em>
          </h1>
          <p className="hero-sub">The Royal Buganda New Year Festival</p>
          <div className="countdown">
            <div className="cd-block"><span className="cd-num">{pad(cd.d)}</span><span className="cd-label">Days</span></div>
            <span className="cd-sep">:</span>
            <div className="cd-block"><span className="cd-num">{pad(cd.h)}</span><span className="cd-label">Hours</span></div>
            <span className="cd-sep">:</span>
            <div className="cd-block"><span className="cd-num">{pad(cd.m)}</span><span className="cd-label">Mins</span></div>
            <span className="cd-sep">:</span>
            <div className="cd-block"><span className="cd-num">{pad(cd.s)}</span><span className="cd-label">Secs</span></div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setPage("Invitation")}>Secure Your Tickets →</button>
            <button className="btn-outline" style={{ color: "rgba(250,245,232,.85)", borderColor: "rgba(250,245,232,.4)" }} onClick={() => setPage("Business")}>Exhibit with Us</button>
          </div>
        </div>
      </section>

      <Ticker />

      <div className="stats-strip">
        <div className="stat-cell"><span className="stat-num f-block">52</span><span className="stat-label">Buganda Clans</span></div>
        <div className="stat-cell"><span className="stat-num f-block">18</span><span className="stat-label">Masaza Counties</span></div>
        <div className="stat-cell"><span className="stat-num f-block">36</span><span className="stat-label">Kabakas of Buganda</span></div>
      </div>

      <div style={{ background: T.bg, padding: "64px 48px" }}>
        <FU><p className="s-label">What's On</p><h2 className="s-title f-display">Highlights at <em>Enkuuka 2025</em></h2></FU>
        <div className="event-grid" style={{ marginTop: 24 }}>
          {HOME_EVENTS.map((e, i) => (
            <FU key={e.title} delay={i * 0.06}><EventCard {...e} /></FU>
          ))}
        </div>
      </div>

      <SplitSection
        img={IMG.drums} label="Culture & Heritage"
        title="600 Years of" titleAccent="Kiganda Pride"
        body="The Buganda Kingdom — one of East Africa's oldest and most organised kingdoms. Royal drumming, Baakisimba dance, bark cloth and the sacred clan system come alive at Lubiri Palace every 31st December."
        cta="Explore Culture →" onCta={() => setPage("Culture")}
      />
      <SplitSection
        img={IMG.market} label="Business & Trade Fair"
        title="50,000 People." titleAccent="One Marketplace."
        body="Uganda's most impactful end-of-year economic platform. 200+ vendors, SMEs and corporates united under the royal roof of Lubiri. Culture meets commerce at the kingdom's grandest gathering."
        cta="Register as Vendor →" onCta={() => setPage("Business")} reverse
      />

      <div className="sponsors-band">
        <span style={{ fontSize: ".62rem", letterSpacing: 3, textTransform: "uppercase", color: T.gold, fontWeight: 700, marginRight: 8 }}>Partners</span>
        {SPONSORS.map((s) => <div key={s} className="sponsor-pill">{s}</div>)}
      </div>

      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CULTURE PAGE
// ─────────────────────────────────────────────────────────────────────────────

function CulturePage({ setPage }) {
  const traditions = [
    { img: IMG.king,   label: "Royalty", title: "Kabaka", accent: "of Buganda", body: "The Kabaka is the living embodiment of the Buganda Kingdom — sovereign, spiritual symbol, and guardian of Kiganda tradition. From the royal palace at Lubiri, the king unites over sixty clans under one throne. The institution stretches back centuries, a living lineage that endures." },
    { img: IMG.dance,   label: "Tradition", title: "Traditional", accent: "Dance",      body: "Baakisimba, Nankasa and Mbaga are sacred dances at royal gatherings. Every movement — the grace of the knee, the arc of the hand — is a language of Kiganda identity spoken without words.", reverse: true },
    { img: IMG.traditional,   label: "Tradition", title: "Bark Cloth",  accent: "(Olubugo)",  body: "UNESCO-recognised bark cloth crafted entirely by hand from the mutuba fig tree. The defining textile of Buganda — worn in ceremony, honoured in museums worldwide, carried across the diaspora as living proof of African excellence." },
    { img: IMG.dress, label: "Tradition", title: "Gomesi &",    accent: "Kanzu",      body: "The elegant gomesi worn by women and the flowing kanzu worn by men are the formal traditional dress of the Baganda. Seeing thousands of them at Lubiri on December 31st is a sight of extraordinary collective pride.", reverse: true },
  ];
  return (
    <div className="page-enter">
      <PageHero img={IMG.kingdom} label="Show Culture · Have Heritage" title="Buganda —" titleAccent="Kingdom of Grace" />
      <Ticker />
      {traditions.map((t) => (
        <SplitSection key={t.title} img={t.img} label={t.label} title={t.title} titleAccent={t.accent} body={t.body} reverse={t.reverse} />
      ))}
      <div className="kabaka-band">
        <FU style={{ textAlign: "center" }}>
          <p className="s-label" style={{ justifyContent: "center" }}>His Majesty</p>
          <h2 className="s-title f-display" style={{ fontSize: "clamp(1.8rem,5vw,3.4rem)", textAlign: "center" }}>
            The Kabaka of <em>Buganda</em>
          </h2>
          <p style={{ color: T.muted, lineHeight: 1.9, maxWidth: 620, margin: "16px auto 28px", fontSize: ".9rem" }}>
            His Majesty Ronald Muwenda Mutebi II, the 36th Kabaka, has presided over the kingdom since 1993. At Enkuuka y'Omwaka, his presence transforms the celebration into a royal gathering — uniting over 6 million Baganda people across all 18 Masaza in one moment of shared heritage and joy.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {[["👑","36th Kabaka","Since 1993"],["🏛","Lubiri Palace","Royal Seat"],["🌍","6M+ Baganda","Kingdom People"],["📜","52 Clans","All United"]].map(([icon, t1, t2]) => (
              <div key={t1} className="kab-stat">
                <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{icon}</div>
                <p className="f-block" style={{ color: T.ink, fontSize: ".9rem" }}>{t1}</p>
                <p style={{ fontSize: ".62rem", color: T.muted, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>{t2}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setPage("Clans")}>Explore All 52 Clans →</button>
            <button className="btn-outline" onClick={() => setPage("Masaza")}>View 18 Masaza</button>
          </div>
        </FU>
      </div>
      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLANS PAGE — PRO REDESIGN
// ─────────────────────────────────────────────────────────────────────────────

function ClanCardPro({ clan, index, featured = false }) {
  return (
    <div className={`clan-card-pro${featured ? " featured" : ""}`}>
      {/* Totem image */}
      <img
        className="clan-img"
        src={clan.img}
        alt={clan.totem}
        loading="lazy"
        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1549366021-9f761d450615?w=640&q=80"; }}
      />

      {/* Gradient overlay */}
      <div className="clan-gradient" />

      {/* Top badge row */}
      <div className="clan-badge">
        <span className="clan-badge-pill clan-badge-num">
          {String(index + 1).padStart(2, "0")}
        </span>
        {clan.orig && <span className="clan-badge-pill clan-badge-orig">Banansangwa</span>}
        {clan.royal && <span className="clan-badge-pill clan-badge-royal">👑 Royal</span>}
      </div>

      {/* Static bottom (visible when not hovered) */}
      <div className="clan-static-bottom">
        <span className="clan-card-totem-label">Totem</span>
        <p className="clan-card-name f-display">{clan.n}</p>
        <p className="clan-card-totem">{clan.totem}</p>
      </div>

      {/* Hover reveal panel */}
      <div className="clan-hover-panel">
        <span className="clan-card-totem-label">Ekika · Clan {String(index + 1).padStart(2, "0")}</span>
        <p className="clan-card-name f-display">{clan.n}</p>
        <p className="clan-card-totem" style={{ color: "rgba(250,245,232,.65)", fontSize: ".78rem", lineHeight: 1.5 }}>
          Omuziro: <strong style={{ color: T.gold3 }}>{clan.totem}</strong>
        </p>
        <div className="clan-head-row">
          <div className="clan-head-icon">♛</div>
          <div>
            <span className="clan-head-label">Clan Head</span>
            <p className="clan-head-name">{clan.head}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClansPage({ setPage }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    let list = CLANS;
    if (filter === "Original 5")  list = list.filter(c => c.orig);
    if (filter === "Royal")       list = list.filter(c => c.royal);
    if (filter === "Other")       list = list.filter(c => !c.orig && !c.royal);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(c =>
        c.n.toLowerCase().includes(q) ||
        c.totem.toLowerCase().includes(q) ||
        c.head.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, filter]);

  const FILTERS = ["All", "Original 5", "Royal", "Other"];

  return (
    <div className="page-enter">
      <PageHero img={IMG.culture} label="Ebika by'Obuganda" title="The 52 Clans of" titleAccent="Buganda" />
      <Ticker />

      <div className="clans-section">
        {/* Header */}
        <div className="clans-header">
          <FU>
            <p className="s-label">About the Clan System</p>
            <h2 className="s-title f-display">Identity Through <em>Blood & Totem</em></h2>
            <p className="clans-intro-text">
              Every Muganda must belong to one of Buganda's clans (<em>Ebika</em>). Membership is patrilineal — passed from father to child. Each clan is identified by a primary totem (<strong>Omuziro</strong>) and a secondary totem (<strong>Akabbiro</strong>), both of which members may not eat or harm. Marriage within the same clan is strictly forbidden.
            </p>
          </FU>

          <FU delay={0.1}>
            <div className="clan-filter-bar">
              <div className="clan-search-wrap">
                <span className="clan-search-icon">⌕</span>
                <input
                  className="clan-search"
                  placeholder="Search by clan, totem, or head…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
              <div className="clan-filter-pills">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    className={`clan-filter-pill${filter === f ? " active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </FU>
        </div>

        {/* Clan grid */}
        <FU delay={0.15}>
          <div className="clans-grid-pro">
            {filtered.map((clan, i) => (
              <ClanCardPro key={clan.n} clan={clan} index={CLANS.indexOf(clan)} featured={i < 2 && filter === "All" && !query} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: T.muted }}>
              <p style={{ fontSize: "2rem", marginBottom: 12 }}>🔍</p>
              <p className="f-display" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: T.ink, marginBottom: 6 }}>No clans found</p>
              <p style={{ fontSize: ".82rem" }}>Try a different name, totem, or clan head.</p>
            </div>
          )}

          {/* Count bar + legend */}
          <div className="clan-count-bar">
            <p className="clan-count">
              Showing <strong style={{ color: T.gold }}>{filtered.length}</strong> of {CLANS.length} clans
            </p>
            <div className="clan-legend">
              <div className="clan-legend-item">
                <div className="clan-legend-dot" style={{ background: T.gold }} />
                <span>Banansangwa (5 original clans)</span>
              </div>
              <div className="clan-legend-item">
                <div className="clan-legend-dot" style={{ background: "#7A1515" }} />
                <span>Royal (Abalangira)</span>
              </div>
            </div>
          </div>
        </FU>
      </div>

      {/* Info band */}
      <div style={{ background: T.bg2, borderTop: `1px solid ${T.lineSoft}`, padding: "48px 48px" }}>
        <FU>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginBottom: 0 }}>
            {[
              { icon: "🪶", title: "Patrilineal Heritage", body: "Clan membership passes exclusively through the father — a child takes the father's clan at birth, regardless of where they are born or raised." },
              { icon: "🚫", title: "Clan Exogamy", body: "Marriage between members of the same clan is strictly forbidden in Kiganda custom. This ancient rule governs social structure across all 52 clans." },
              { icon: "🐾", title: "The Sacred Totem", body: "Each clan's totem — an animal, plant, or object — is revered and protected. Members never eat, hunt, or harm their clan's totem." },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ padding: "32px 36px", borderRight: `1px solid ${T.lineSoft}`, background: "#fff" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: 12 }}>{icon}</div>
                <p className="f-display" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: T.ink, marginBottom: 8 }}>{title}</p>
                <p style={{ fontSize: ".8rem", color: T.muted, lineHeight: 1.85 }}>{body}</p>
              </div>
            ))}
          </div>
        </FU>
      </div>

      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MASAZA PAGE
// ─────────────────────────────────────────────────────────────────────────────

function MasazaPage({ setPage }) {
  return (
    <div className="page-enter">
      <PageHero img={IMG.palace} label="Amasaza ga Buganda" title="The 18 Counties of" titleAccent="Buganda" />
      <Ticker />
      <div style={{ background: T.bg, padding: "52px 48px" }}>
        <FU>
          <p className="s-label">About the Counties</p>
          <h2 className="s-title f-display">The Kingdom's <em>Administrative Fabric</em></h2>
          <p className="s-body" style={{ maxWidth: 720, marginBottom: 32 }}>
            Buganda is divided into 18 official counties (<em>Amasaza</em>), each led by a Saza Chief. The kingdom originally comprised 20 counties, but Buyaga and Bugangaizi were returned to Bunyoro following a 1964 referendum.
          </p>
        </FU>
        <FU delay={0.1}>
          <div className="masaza-grid">
            {MASAZA.map((saza, i) => (
              <div key={saza.n} className="saza-card">
                <img src={saza.img} alt={saza.n} loading="lazy" />
                <div className="saza-body">
                  <span className="saza-num">SSAZA {String(i + 1).padStart(2, "0")}</span>
                  <p className="saza-name f-display">{saza.n}</p>
                  <p className="saza-chief">Saza Chief: <em style={{ color: T.gold }}>{saza.chief}</em></p>
                  <p className="saza-desc">{saza.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FU>
      </div>
      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTERTAINMENT PAGE
// ─────────────────────────────────────────────────────────────────────────────

function EntertainmentPage({ setPage }) {
  return (
    <div className="page-enter">
      <PageHero img={IMG.music} label="Live Performances" title="A Night of" titleAccent="Pure Magic" />
      <Ticker />
      <div style={{ background: T.bg, padding: "52px 48px" }}>
        <FU>
          <p className="s-label">The Lineup</p>
          <h2 className="s-title f-display">Artists & <em>Performers</em></h2>
          <p className="s-body" style={{ marginBottom: 28 }}>Uganda's finest artists and cultural performers take the Lubiri stage for an evening that blends heritage with modern entertainment.</p>
        </FU>
        <div className="event-grid">
          {ARTISTS.map((a, i) => (
            <FU key={a.title} delay={i * 0.06}><EventCard {...a} /></FU>
          ))}
        </div>
      </div>
      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS PAGE
// ─────────────────────────────────────────────────────────────────────────────

function BusinessPage({ setPage }) {
  const [activeTab, setActiveTab] = useState("Small Businesses");
  return (
    <div className="page-enter">
      <PageHero img={IMG.market} label="Trade Fair & Opportunities" title="Business at" titleAccent="Enkuuka" />
      <Ticker />
      <div style={{ background: T.bg, padding: "52px 48px" }}>
        <FU>
          <p className="s-label">Why Exhibit?</p>
          <h2 className="s-title f-display">Uganda's Premier <em>End-of-Year Platform</em></h2>
          <p className="s-body" style={{ marginBottom: 28 }}>Enkuuka y'Omwaka connects 50,000 consumers with businesses of every scale — from artisan food stalls to full corporate pavilions.</p>
        </FU>
        <FU delay={0.1}>
          <div className="tab-bar">
            {BIZ_TABS.map((t) => (
              <button key={t} className={`tab-btn${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
          <div className="biz-grid">
            {(BIZ_DATA[activeTab] || []).map((item) => (
              <div key={item.title} className="biz-card">
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="biz-body">
                  <span className="biz-tag">{item.tag}</span>
                  <p className="biz-title f-display">{item.title}</p>
                  <p className="biz-desc">{item.desc}</p>
                  <span className="biz-cta">Register Now →</span>
                </div>
              </div>
            ))}
          </div>
        </FU>
      </div>
      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMME PAGE
// ─────────────────────────────────────────────────────────────────────────────

function ProgrammePage({ setPage }) {
  return (
    <div className="page-enter">
      <PageHero img={IMG.crowd} label="31st December" title="The Day's" titleAccent="Programme" />
      <Ticker />
      <div style={{ background: T.bg }}>
        <div className="timeline-grid">
          <div style={{ padding: "48px 48px" }}>
            <FU>
              <p className="s-label">Full Schedule</p>
              <h2 className="s-title f-display">From <em>Dawn to Midnight</em></h2>
              <p className="s-body" style={{ marginBottom: 36 }}>Every hour at Enkuuka is crafted for celebration, culture and community.</p>
            </FU>
            {PROGRAMME.map((p, i) => (
              <FU key={p.time} delay={i * 0.05}>
                <div className="tl-item">
                  <div className="tl-time">{p.time}</div>
                  <div className="tl-body">
                    <div className="tl-dot" />
                    <p className="tl-title f-display">{p.title}</p>
                    <p className="tl-desc">{p.desc}</p>
                  </div>
                </div>
              </FU>
            ))}
          </div>
          <div style={{ position: "relative", overflow: "hidden", minHeight: 500 }}>
            <img src={IMG.fireworks} alt="Fireworks" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.38)", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${T.bg}, transparent 50%)`, display: "flex", alignItems: "flex-end", padding: "36px 40px" }}>
              <div>
                <p className="s-label">Midnight Fireworks</p>
                <h2 className="s-title f-display">Fireworks over <em>Lubiri Palace</em></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY PAGE
// ─────────────────────────────────────────────────────────────────────────────

function GalleryPage({ setPage }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <div className="page-enter">
      <PageHero img={IMG.crowd} label="Visual Memories" title="The" titleAccent="Gallery" />
      <Ticker />
      <div style={{ background: T.bg, padding: "48px 48px 24px" }}>
        <FU>
          <p className="s-label">Enkuuka Through the Lens</p>
          <h2 className="s-title f-display">Royal Culture, <em>Captured</em></h2>
          <p className="s-body" style={{ marginBottom: 32 }}>A visual journey through Enkuuka y'Omwaka. Click any image to explore in full.</p>
        </FU>
        <FU delay={0.1}>
          <div className="gal-grid">
            {GALLERY_ITEMS.map((g) => (
              <div key={g.title} className="gal-item" onClick={() => setLightbox(g)}>
                <img src={g.src} alt={g.title} loading="lazy" />
                <div className="gal-item-overlay">
                  <p className="gal-item-title f-display">{g.title}</p>
                  <p className="gal-item-sub">{g.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FU>
      </div>
      <PageFooter setPage={setPage} />
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.title} />
          <p className="f-display" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: T.ink }}>{lightbox.title}</p>
          <p style={{ color: T.gold, fontSize: ".6rem", letterSpacing: 3, textTransform: "uppercase" }}>{lightbox.sub}</p>
          <p style={{ color: T.muted, fontSize: ".72rem", marginTop: 4 }}>Click anywhere to close</p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCOMMODATION PAGE
// ─────────────────────────────────────────────────────────────────────────────

function AccommodationPage({ setPage }) {
  return (
    <div className="page-enter">
      <PageHero img={IMG.hotel} label="Stay & Experience" title="Hospitality at" titleAccent="Enkuuka" />
      <Ticker />
      <div style={{ background: T.bg, padding: "48px 48px 24px" }}>
        <FU>
          <p className="s-label">Where to Stay</p>
          <h2 className="s-title f-display">Kampala's Finest <em>Hotels</em></h2>
          <p className="s-body" style={{ marginBottom: 28 }}>Book early — Kampala fills up fast on December 31st.</p>
        </FU>
        <FU delay={0.1}>
          <div className="hotel-grid">
            {HOTELS.map((h) => (
              <div key={h.name} className="hotel-card">
                <img src={h.img} alt={h.name} loading="lazy" />
                <div className="hotel-body">
                  <p className="hotel-stars">{h.stars}</p>
                  <p className="hotel-name f-display">{h.name}</p>
                  <p className="hotel-loc">📍 {h.loc}</p>
                  <p className="hotel-price">From {h.price}</p>
                  <button className="hotel-book">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </FU>
      </div>
      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INVITATION PAGE
// ─────────────────────────────────────────────────────────────────────────────

function InvitationPage({ setPage }) {
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(false);
  return (
    <div className="page-enter">
      <div style={{ background: T.bg, minHeight: "100vh", paddingTop: 60 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "64px 24px" }}>
          <FU style={{ textAlign: "center" }}>
            <p className="s-label" style={{ justifyContent: "center" }}>Digital E-Invitation</p>
            <h1 className="s-title f-display" style={{ textAlign: "center", marginBottom: 8 }}>Your <em>Royal Invitation</em></h1>
            <p style={{ color: T.muted, fontSize: ".85rem", marginBottom: 32 }}>Personalise and share your digital invitation to Enkuuka y'Omwaka</p>
          </FU>
          {!preview ? (
            <FU delay={0.1}>
              <div style={{ background: T.bg2, border: `1px solid ${T.line}`, padding: "32px" }}>
                <p style={{ color: T.muted, fontSize: ".8rem", marginBottom: 12 }}>Enter your name to personalise your invitation</p>
                <input className="contact-input" placeholder="Your full name…" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setPreview(true)} />
                <button className="btn-gold" style={{ width: "100%", marginTop: 4 }} onClick={() => setPreview(true)}>Preview My Invitation →</button>
              </div>
            </FU>
          ) : (
            <FU delay={0.05}>
              <div className="inv-card">
                <div className="inv-top">
                  <p style={{ fontSize: ".62rem", letterSpacing: 4, textTransform: "uppercase", color: T.muted, marginBottom: 7 }}>The Buganda Kingdom · Lubiri Palace</p>
                  <h2 className="f-display" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", color: T.ink, fontWeight: 700, lineHeight: .95 }}>Enkuuka<br /><em style={{ color: T.gold }}>y'Omwaka</em></h2>
                </div>
                <div className="inv-body">
                  <p style={{ fontSize: ".65rem", color: T.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Cordially Invites</p>
                  <p className="f-display" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", color: T.ink, fontWeight: 700, marginBottom: 16, lineHeight: 1 }}>{name.trim() || "Honoured Guest"}</p>
                  <div className="inv-divider" />
                  <p style={{ fontSize: ".82rem", color: T.muted, lineHeight: 1.85, marginBottom: 16 }}>to celebrate the New Year with the Baganda people in the spirit of culture, unity and joy</p>
                  <div style={{ background: T.goldBg, border: `1px solid ${T.line}`, padding: "14px 20px", marginBottom: 14 }}>
                    <p className="f-block" style={{ fontSize: ".85rem", color: T.ink }}>31st December 2025</p>
                    <p style={{ color: T.muted, fontSize: ".75rem", marginTop: 3 }}>📍 Lubiri Palace, Mengo, Kampala</p>
                    <p style={{ color: T.gold, fontSize: ".72rem", marginTop: 3, fontWeight: 600 }}>9:00 AM – Past Midnight</p>
                  </div>
                  <p className="f-display" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: ".85rem", color: T.muted }}>Omuliro gw'omwaka gulabye omulembe!</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
                <button className="btn-gold">Share Invitation 🔗</button>
                <button className="btn-outline" onClick={() => setPreview(false)} style={{ padding: "12px 22px" }}>Edit Name</button>
              </div>
            </FU>
          )}
        </div>
      </div>
      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────

function ContactPage({ setPage }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", msg: "" });
  const [sent, setSent] = useState(false);
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div className="page-enter">
      <PageHero img={IMG.palace} label="Reach Out" title="Contact" titleAccent="Us" />
      <Ticker />
      <div style={{ background: T.bg }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          <div style={{ padding: "52px 48px" }}>
            <FU>
              <p className="s-label">Get in Touch</p>
              <h2 className="s-title f-display">We'd Love to <em>Hear from You</em></h2>
              <p className="s-body" style={{ marginBottom: 32 }}>For vendor inquiries, sponsorships, media partnerships or general information about Enkuuka y'Omwaka, reach out to our team.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 36 }}>
                {[["📍", "Location", "Lubiri Palace, Mengo, Kampala, Uganda"], ["📞", "Phone", "+256 414 000 000"], ["✉", "Email", "info@enkuuka.ug"], ["🕒", "Hours", "Mon–Fri, 9:00 AM – 5:00 PM EAT"]].map(([icon, label, val]) => (
                  <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: ".95rem", marginTop: 2 }}>{icon}</span>
                    <div>
                      <p style={{ fontSize: ".6rem", letterSpacing: 2, textTransform: "uppercase", color: T.gold, marginBottom: 1 }}>{label}</p>
                      <p style={{ fontSize: ".85rem", color: T.muted }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FU>
          </div>
          <div style={{ padding: "52px 48px", background: T.bg2, borderLeft: `1px solid ${T.lineSoft}` }}>
            <FU delay={0.1}>
              {!sent ? (
                <div>
                  <p className="f-display" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: T.ink, marginBottom: 22 }}>Send a Message</p>
                  <input className="contact-input" placeholder="Your name" value={form.name} onChange={f("name")} />
                  <input className="contact-input" placeholder="Email address" value={form.email} onChange={f("email")} />
                  <input className="contact-input" placeholder="Subject" value={form.subject} onChange={f("subject")} />
                  <textarea className="contact-input" rows={5} placeholder="Your message…" value={form.msg} onChange={f("msg")} />
                  <button className="btn-gold" style={{ width: "100%" }} onClick={() => setSent(true)}>Send Message →</button>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "48px 20px" }}>
                  <p className="f-display" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: T.gold, marginBottom: 8 }}>Message Sent!</p>
                  <p style={{ color: T.muted, fontSize: ".85rem", marginBottom: 22 }}>We'll get back to you within 24 hours.</p>
                  <button className="btn-outline" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", msg: "" }); }}>Send Another</button>
                </div>
              )}
            </FU>
          </div>
        </div>
      </div>
      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_MAP = {
  Home:          HomePage,
  Culture:       CulturePage,
  Clans:         ClansPage,
  Masaza:        MasazaPage,
  Entertainment: EntertainmentPage,
  Business:      BusinessPage,
  Programme:     ProgrammePage,
  Gallery:       GalleryPage,
  Accommodation: AccommodationPage,
  Invitation:    InvitationPage,
  Contact:       ContactPage,
};

export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => {
    const id = "enkuuka-global-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    } else {
      document.getElementById(id).textContent = GLOBAL_CSS;
    }
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const PageComponent = PAGE_MAP[page] || HomePage;

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <Nav page={page} setPage={setPage} />
      <main style={{ paddingTop: 60 }}>
        <PageComponent setPage={setPage} />
      </main>
    </div>
  );
}