/**
 * ENKUUKA Y'OMWAKA — Full App + Redesigned Masaza Page
 * ================================================
 * Royal Buganda New Year Festival · Lubiri Palace, Mengo, Kampala
 */

import { useState, useEffect, useRef, useMemo } from "react";

const T = {
  bg:       "#F7F2E8",
  bg2:      "#EDE5D0",
  bg3:      "#E4D9BF",
  bgNav:    "#FDFAF3",
  ink:      "#1C1A13",
  ink2:     "#3D3925",
  muted:    "#7A6E52",
  gold:     "#A67C2E",
  gold2:    "#C49A3C",
  gold3:    "#D4AE5E",
  goldBg:   "rgba(166,124,46,.08)",
  line:     "rgba(166,124,46,.18)",
  lineSoft: "rgba(166,124,46,.10)",
  red:      "#7A1515",
};

if (typeof document !== "undefined") {
  const fontId = "enkuuka-fonts";
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link");
    link.id = fontId; link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }
}

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body { background: ${T.bg}; color: ${T.ink}; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
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
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 999; height: 60px; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; background: ${T.bgNav}; border-bottom: 1px solid ${T.line}; box-shadow: 0 1px 16px rgba(28,26,19,.06); transition: height .3s; }
  .nav.slim { height: 50px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700; color: ${T.ink}; cursor: pointer; letter-spacing: 0.5px; white-space: nowrap; }
  .nav-logo em { color: ${T.gold}; font-style: italic; }
  .nav-links { display: flex; gap: 18px; list-style: none; }
  .nav-links li { font-size: .63rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: ${T.muted}; cursor: pointer; transition: color .2s; padding: 4px 0; border-bottom: 1.5px solid transparent; }
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

  /* CLANS */
  .clans-section { background: ${T.bg}; padding: 60px 48px; }
  .clans-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; margin-bottom: 44px; padding-bottom: 36px; border-bottom: 1px solid ${T.line}; }
  .clans-intro-text { font-size: .88rem; color: ${T.muted}; line-height: 1.9; margin-top: 12px; }
  .clan-filter-bar { display: flex; flex-direction: column; gap: 10px; }
  .clan-search-wrap { position: relative; }
  .clan-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: ${T.muted}; font-size: .9rem; pointer-events: none; }
  .clan-search { width: 100%; padding: 12px 14px 12px 38px; background: #fff; border: 1px solid ${T.line}; color: ${T.ink}; font-family: 'DM Sans', sans-serif; font-size: .85rem; outline: none; transition: border-color .2s, box-shadow .2s; }
  .clan-search:focus { border-color: ${T.gold}; box-shadow: 0 0 0 3px rgba(166,124,46,.1); }
  .clan-search::placeholder { color: ${T.muted}; opacity: .5; }
  .clan-filter-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .clan-filter-pill { padding: 5px 13px; font-size: .6rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border: 1px solid ${T.line}; background: #fff; color: ${T.muted}; cursor: pointer; transition: .2s; }
  .clan-filter-pill:hover, .clan-filter-pill.active { background: ${T.gold}; color: #fff; border-color: ${T.gold}; }
  .clans-grid-pro { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; }
  .clan-card-pro { position: relative; overflow: hidden; cursor: pointer; background: ${T.bg2}; aspect-ratio: 3/4; }
  .clan-card-pro .clan-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .65s cubic-bezier(.25,.46,.45,.94), filter .65s ease; display: block; }
  .clan-card-pro:hover .clan-img { filter: brightness(.85) saturate(.9); transform: scale(1.08); }
  .clan-card-pro .clan-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(28,26,19,.85) 0%, rgba(28,26,19,.25) 50%, rgba(28,26,19,0) 100%); transition: background .4s; }
  .clan-card-pro:hover .clan-gradient { background: linear-gradient(to top, rgba(28,26,19,.95) 0%, rgba(28,26,19,.55) 55%, rgba(28,26,19,.1) 100%); }
  .clan-card-pro .clan-badge { position: absolute; top: 12px; left: 12px; z-index: 3; display: flex; gap: 5px; }
  .clan-badge-pill { padding: 3px 8px; font-size: .52rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
  .clan-badge-num { background: rgba(28,26,19,.7); color: rgba(250,245,232,.55); backdrop-filter: blur(4px); border: 1px solid rgba(250,245,232,.12); }
  .clan-badge-orig { background: ${T.gold}; color: #fff; }
  .clan-badge-royal { background: #7A1515; color: #FAF5E8; }
  .clan-card-totem-label { font-size: .55rem; letter-spacing: 3.5px; text-transform: uppercase; color: ${T.gold3}; font-weight: 700; margin-bottom: 3px; display: block; opacity: .85; }
  .clan-card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 700; color: #FAF5E8; line-height: 1.05; margin-bottom: 2px; }
  .clan-card-totem { font-size: .72rem; color: rgba(250,245,232,.55); line-height: 1.4; }
  .clan-hover-panel { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; z-index: 4; background: transparent; transform: translateY(100%); transition: transform .4s cubic-bezier(.25,.46,.45,.94); }
  .clan-card-pro:hover .clan-hover-panel { transform: translateY(0); }
  .clan-hover-panel .clan-card-name { font-size: 1.3rem; margin-bottom: 4px; }
  .clan-head-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(250,245,232,.15); }
  .clan-head-icon { width: 20px; height: 20px; border-radius: 50%; background: ${T.gold}; display: flex; align-items: center; justify-content: center; font-size: .55rem; flex-shrink: 0; color: #fff; }
  .clan-head-label { font-size: .6rem; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(250,245,232,.4); display: block; line-height: 1; margin-bottom: 1px; }
  .clan-head-name { font-size: .78rem; color: rgba(250,245,232,.75); font-weight: 500; }
  .clan-static-bottom { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; z-index: 3; transition: opacity .35s; }
  .clan-card-pro:hover .clan-static-bottom { opacity: 0; pointer-events: none; }
  .clan-count-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; padding-top: 20px; border-top: 1px solid ${T.lineSoft}; }
  .clan-count { font-size: .75rem; color: ${T.muted}; }
  .clan-legend { display: flex; gap: 16px; flex-wrap: wrap; }
  .clan-legend-item { display: flex; align-items: center; gap: 6px; font-size: .62rem; color: ${T.muted}; letter-spacing: .5px; }
  .clan-legend-dot { width: 10px; height: 10px; flex-shrink: 0; }
  .clan-card-pro.featured { aspect-ratio: unset; grid-column: span 2; min-height: 380px; }
  .clan-card-pro.featured .clan-card-name { font-size: 1.6rem; }

  /* ─── MASAZA PAGE ──────────────────────────────── */

  /* Map + list layout */
  .masaza-main-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 0;
    min-height: 620px;
    border-bottom: 1px solid ${T.line};
  }

  /* Left: County list */
  .masaza-list-panel {
    padding: 0;
    overflow-y: auto;
    max-height: 620px;
    border-right: 1px solid ${T.line};
  }
  .masaza-list-panel::-webkit-scrollbar { width: 4px; }
  .masaza-list-panel::-webkit-scrollbar-track { background: ${T.bg2}; }
  .masaza-list-panel::-webkit-scrollbar-thumb { background: ${T.gold3}; border-radius: 2px; }

  .saza-list-item {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0;
    border-bottom: 1px solid ${T.lineSoft};
    cursor: pointer;
    transition: background .2s;
    overflow: hidden;
  }
  .saza-list-item:hover, .saza-list-item.active {
    background: ${T.bg3};
  }
  .saza-list-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: .75rem;
    letter-spacing: 2px;
    color: ${T.gold};
    min-width: 48px;
    text-align: center;
    padding: 20px 0;
    border-right: 1px solid ${T.lineSoft};
    flex-shrink: 0;
  }
  .saza-list-content { padding: 14px 18px; flex: 1; }
  .saza-list-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: ${T.ink};
    margin-bottom: 2px;
    line-height: 1;
  }
  .saza-list-chief { font-size: .68rem; color: ${T.muted}; }
  .saza-list-arrow {
    font-size: .7rem;
    color: ${T.gold};
    padding: 0 16px;
    opacity: 0;
    transition: opacity .2s;
  }
  .saza-list-item:hover .saza-list-arrow,
  .saza-list-item.active .saza-list-arrow { opacity: 1; }

  /* Right: Map panel */
  .masaza-map-panel {
    position: sticky;
    top: 60px;
    height: 620px;
    background: ${T.bg2};
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .masaza-map-header {
    padding: 20px 24px 14px;
    border-bottom: 1px solid ${T.lineSoft};
    flex-shrink: 0;
  }

  .masaza-map-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    position: relative;
  }

  /* SVG county map */
  .buganda-map { width: 100%; height: 100%; }
  .buganda-map .county {
    fill: ${T.bg3};
    stroke: ${T.gold3};
    stroke-width: 1.5;
    transition: fill .25s, stroke .25s;
    cursor: pointer;
  }
  .buganda-map .county:hover, .buganda-map .county.active {
    fill: ${T.gold};
    stroke: ${T.gold2};
  }
  .buganda-map .county-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 7px;
    fill: ${T.ink};
    pointer-events: none;
    font-weight: 600;
  }
  .buganda-map .county.active .county-label { fill: #fff; }

  /* Detail card below map */
  .masaza-detail-card {
    padding: 16px 24px 20px;
    border-top: 1px solid ${T.lineSoft};
    background: #fff;
    flex-shrink: 0;
    min-height: 110px;
    transition: all .3s;
  }
  .masaza-detail-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${T.ink};
    margin-bottom: 3px;
    line-height: 1;
  }
  .masaza-detail-chief {
    font-size: .68rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${T.gold};
    margin-bottom: 8px;
    font-weight: 600;
  }
  .masaza-detail-desc {
    font-size: .78rem;
    color: ${T.muted};
    line-height: 1.75;
  }

  /* County cards grid (below the map section) */
  .masaza-cards-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 2px;
  }
  .masaza-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    aspect-ratio: 2/3;
    background: ${T.bg3};
  }
  .masaza-card img {
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(.5);
    transition: filter .5s, transform .5s;
    display: block;
  }
  .masaza-card:hover img { filter: brightness(.28); transform: scale(1.07); }
  .masaza-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(28,26,19,.95) 0%, rgba(28,26,19,.1) 55%, transparent 100%);
  }
  .masaza-card-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 12px; }
  .masaza-card-num { font-family: 'Bebas Neue', sans-serif; font-size: .6rem; letter-spacing: 2px; color: ${T.gold3}; display: block; margin-bottom: 2px; }
  .masaza-card-name { font-family: 'Cormorant Garamond', serif; font-size: .9rem; font-weight: 700; color: #FAF5E8; line-height: 1.1; }
  .masaza-card-chief { font-size: .6rem; color: rgba(250,245,232,.45); margin-top: 2px; display: none; }
  .masaza-card:hover .masaza-card-chief { display: block; }
  .masaza-card-desc {
    font-size: .65rem; color: rgba(250,245,232,.38); line-height: 1.5;
    max-height: 0; overflow: hidden; transition: max-height .4s ease; margin-top: 4px;
  }
  .masaza-card:hover .masaza-card-desc { max-height: 60px; }

  /* History strip */
  .masaza-history {
    background: ${T.ink};
    padding: 56px 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .masaza-history-text h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 700; color: #FAF5E8; margin-bottom: 16px; line-height: 1; }
  .masaza-history-text h2 em { color: ${T.gold3}; font-style: italic; }
  .masaza-history-text p { font-size: .88rem; color: rgba(250,245,232,.5); line-height: 1.9; margin-bottom: 14px; }
  .masaza-history-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .masaza-history-fact {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(201,168,76,.12);
    padding: 22px 20px;
    text-align: center;
  }
  .masaza-history-fact-num { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: ${T.gold3}; display: block; line-height: 1; margin-bottom: 4px; }
  .masaza-history-fact-label { font-size: .58rem; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(250,245,232,.3); }

  /* Masaza Cup */
  .masaza-cup {
    padding: 56px 48px;
    background: ${T.bg2};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 52px;
    align-items: center;
    border-top: 1px solid ${T.line};
  }
  .masaza-cup-img-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4/3;
  }
  .masaza-cup-img-wrap img {
    width: 100%; height: 100%; object-fit: cover; filter: brightness(.6); display: block; transition: transform .6s;
  }
  .masaza-cup-img-wrap:hover img { transform: scale(1.04); }
  .masaza-cup-badge {
    position: absolute; top: 16px; left: 16px;
    background: ${T.gold}; color: #fff;
    font-size: .6rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
    padding: 6px 12px;
  }

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

  /* EVENTS PAGE */
  .ev-phase-nav { position: sticky; top: 60px; z-index: 90; background: ${T.bgNav}; border-bottom: 1px solid ${T.line}; padding: 0 48px; display: flex; gap: 0; overflow-x: auto; scrollbar-width: none; box-shadow: 0 2px 12px rgba(28,26,19,.06); }
  .ev-phase-nav::-webkit-scrollbar { display: none; }
  .ev-phase-btn { padding: 14px 22px; white-space: nowrap; border: none; background: none; font-family: 'DM Sans', sans-serif; font-size: .65rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${T.muted}; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: .2s; display: flex; align-items: center; gap: 7px; }
  .ev-phase-btn:hover, .ev-phase-btn.active { color: ${T.ink}; border-bottom-color: ${T.gold}; }
  .ev-phase-icon { font-size: .9rem; }
  .ev-block { padding: 0; border-bottom: 1px solid ${T.lineSoft}; }
  .ev-row { display: grid; grid-template-columns: 1fr 1fr; min-height: 520px; }
  .ev-row.flip { direction: rtl; }
  .ev-row.flip > * { direction: ltr; }
  .ev-media { position: relative; overflow: hidden; background: ${T.ink}; }
  .ev-media-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(.62); transition: transform .7s ease, filter .7s ease; }
  .ev-block:hover .ev-media-img { transform: scale(1.04); filter: brightness(.5); }
  .ev-video-wrap { position: relative; width: 100%; height: 100%; min-height: 320px; background: ${T.ink}; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; overflow: hidden; }
  .ev-video-wrap::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(-45deg, rgba(166,124,46,.03) 0px, rgba(166,124,46,.03) 1px, transparent 1px, transparent 12px); }
  .ev-video-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(.25) saturate(.4); display: block; }
  .ev-video-play-btn { position: relative; z-index: 2; width: 72px; height: 72px; border-radius: 50%; background: rgba(255,255,255,.1); border: 2px solid rgba(255,255,255,.35); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: .3s; backdrop-filter: blur(4px); }
  .ev-video-wrap:hover .ev-video-play-btn { background: ${T.gold}; border-color: ${T.gold}; transform: scale(1.08); }
  .ev-video-play-icon { font-size: 1.4rem; margin-left: 4px; color: #fff; }
  .ev-video-label { position: relative; z-index: 2; font-size: .65rem; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,.5); font-weight: 600; }
  .ev-video-title { position: relative; z-index: 2; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: rgba(255,255,255,.82); margin-top: 6px; text-align: center; padding: 0 24px; }
  .ev-replace-badge { position: absolute; top: 14px; right: 14px; z-index: 5; background: ${T.gold}; color: #fff; font-size: .52rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; }
  .ev-text { background: ${T.bg2}; padding: 56px 52px; display: flex; flex-direction: column; justify-content: center; position: relative; }
  .ev-time-chip { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 18px; }
  .ev-time-line { width: 28px; height: 1px; background: ${T.gold}; }
  .ev-time-val { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: ${T.gold}; letter-spacing: 3px; }
  .ev-time-phase { font-size: .58rem; letter-spacing: 3px; text-transform: uppercase; color: ${T.muted}; font-weight: 600; margin-left: 4px; }
  .ev-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 700; color: ${T.ink}; line-height: 1.0; margin-bottom: 6px; }
  .ev-title em { color: ${T.gold}; font-style: italic; }
  .ev-subtitle { font-size: .72rem; letter-spacing: 2px; text-transform: uppercase; color: ${T.muted}; font-weight: 600; margin-bottom: 20px; }
  .ev-desc { font-size: .88rem; color: ${T.muted}; line-height: 1.9; margin-bottom: 24px; }
  .ev-facts { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .ev-fact { display: inline-flex; align-items: center; gap: 6px; background: #fff; border: 1px solid ${T.line}; padding: 6px 12px; font-size: .68rem; color: ${T.ink2}; font-weight: 500; }
  .ev-fact-icon { font-size: .82rem; }
  .ev-highlights { border-top: 1px solid ${T.line}; padding-top: 20px; display: flex; flex-direction: column; gap: 10px; }
  .ev-highlight-item { display: flex; align-items: flex-start; gap: 10px; font-size: .8rem; color: ${T.muted}; line-height: 1.6; }
  .ev-highlight-dot { width: 6px; height: 6px; background: ${T.gold}; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .ev-phase-divider { padding: 20px 48px; display: flex; align-items: center; gap: 20px; background: ${T.bg}; border-bottom: 1px solid ${T.lineSoft}; }
  .ev-phase-divider-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 4px; color: ${T.gold}; white-space: nowrap; }
  .ev-phase-divider-line { flex: 1; height: 1px; background: ${T.line}; }
  .ev-phase-divider-time { font-family: 'Bebas Neue', sans-serif; font-size: .85rem; letter-spacing: 3px; color: ${T.muted}; white-space: nowrap; }
  .ev-midnight { position: relative; min-height: 600px; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center; }
  .ev-midnight-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(.22); display: block; }
  .ev-midnight-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(166,124,46,.08) 0%, rgba(28,26,19,.6) 100%); }
  .ev-midnight-content { position: relative; z-index: 2; padding: 60px 48px; max-width: 700px; }
  .ev-video-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
  .ev-video-mini { position: relative; aspect-ratio: 16/10; background: ${T.ink}; overflow: hidden; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px; }
  .ev-video-mini-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(.3) saturate(.5); display: block; }
  .ev-video-mini-play { position: relative; z-index: 2; width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.4); display: flex; align-items: center; justify-content: center; font-size: .9rem; color: #fff; transition: .3s; backdrop-filter: blur(4px); background: rgba(255,255,255,.1); }
  .ev-video-mini:hover .ev-video-mini-play { background: ${T.gold}; border-color: ${T.gold}; transform: scale(1.1); }
  .ev-video-mini-label { position: relative; z-index: 2; font-size: .58rem; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,.5); font-weight: 600; text-align: center; padding: 0 8px; }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .clans-grid-pro { grid-template-columns: repeat(3, 1fr); }
    .clan-card-pro.featured { grid-column: span 1; min-height: auto; aspect-ratio: 3/4; }
    .clans-header { grid-template-columns: 1fr; gap: 28px; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .ev-video-grid { grid-template-columns: repeat(2, 1fr); }
    .masaza-main-grid { grid-template-columns: 1fr; }
    .masaza-map-panel { position: static; height: 460px; }
    .masaza-list-panel { max-height: 400px; }
    .masaza-cards-grid { grid-template-columns: repeat(3, 1fr); }
    .masaza-history, .masaza-cup { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none; }
    .hamburger { display: flex; }
    .hero-content, .phero-content { padding: 0 24px; }
    .split, .timeline-grid, .ev-row { grid-template-columns: 1fr; }
    .ev-row.flip { direction: ltr; }
    .split-img { min-height: 260px; }
    .split-content { padding: 36px 24px; }
    .ev-text { padding: 36px 28px; }
    .ev-media { min-height: 300px; }
    .ev-video-wrap { min-height: 260px; }
    .event-grid, .gal-grid { grid-template-columns: repeat(2, 1fr); }
    .clans-grid-pro { grid-template-columns: repeat(2, 1fr); }
    .clans-section { padding: 40px 24px; }
    .hotel-grid { grid-template-columns: repeat(2, 1fr); }
    .biz-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
    .stats-strip { grid-template-columns: 1fr; }
    .kabaka-band { padding: 40px 24px; }
    .ev-phase-nav { padding: 0 20px; }
    .ev-phase-divider { padding: 16px 24px; }
    .ev-midnight-content { padding: 40px 24px; }
    .ev-video-grid { grid-template-columns: 1fr; }
    .masaza-cards-grid { grid-template-columns: repeat(3, 1fr); }
    .masaza-history { padding: 40px 24px; }
    .masaza-cup { padding: 40px 24px; }
  }
  @media (max-width: 480px) {
    .event-grid, .gal-grid, .clans-grid-pro, .hotel-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 3rem; }
    .masaza-cards-grid { grid-template-columns: repeat(2, 1fr); }
    .masaza-history-facts { grid-template-columns: 1fr 1fr; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────────────────────
const IMG = {
  hero:       "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/king_Saha.png",
  drums:      "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Maganda.jpeg",
  dance:      "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/maganda.png",
  market:     "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/trade.png",
  palace:     "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Buganda.png",
  fireworks:  "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/CountDown.png",
  music:      "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Afrigo_Band.png",
  culture:    "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Cultural_Exhibition.png",
  clans:      "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Clans.png",
  hotel:      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80",
  hotel2:     "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80",
  hotel3:     "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=80",
  crowd:      "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Enkkuka_Atmosphere.png",
  craft:      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  food:       "https://images.unsplash.com/photo-1565299715199-866c917206bb?w=700&q=80",
  kingdom:    "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Buganda.png",
  dress:      "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/DressCode.png",
  traditional:"http://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Barkcloth.png",
  king:       "http://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Kabaka.png",
  heli:       "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=80",
  gate:       "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  ceremony:   "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=900&q=80",
  speeches:   "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=80",
  tradeShow:  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80",
  concert:    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80",
  football:   "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80",
};

// ─────────────────────────────────────────────────────────────────────────────
// MASAZA DATA — enriched
// ─────────────────────────────────────────────────────────────────────────────
const MASAZA = [
  { n: "Kyadondo",  chief: "Ssabaganzi",        img: IMG.palace,    area: "Kampala & Metro", desc: "Home to Kampala. One of the four original Buganda counties — the royal heartland where Lubiri Palace stands. Seat of political and cultural power.", known: "Lubiri Palace · Kampala City" },
  { n: "Busiro",    chief: "Mugema",             img: IMG.culture,   area: "Central",         desc: "Ancient heartland of Buganda containing the UNESCO World Heritage Kasubi Royal Tombs. Home to the sacred burial grounds of four Kabakas.", known: "Kasubi Royal Tombs · Naggalabi" },
  { n: "Kyaggwe",   chief: "Kago",               img: IMG.crowd,     area: "Eastern",         desc: "Eastern county rich in Lake Victoria islands and fertile agricultural land. The Ssese island chains extend into its territory.", known: "Mukono · Lake Victoria Islands" },
  { n: "Buddu",     chief: "Pokino",             img: IMG.market,    area: "Southern",        desc: "Southern county with the Katonga River border. Fertile soils make it Buganda's agricultural breadbasket, rich in coffee and bananas.", known: "Masaka · Katonga River" },
  { n: "Ssingo",    chief: "Kasujju",            img: IMG.drums,     area: "Northern",        desc: "Largest county in Buganda by area. Major northern county with significant cultural and agricultural heritage stretching to the equator.", known: "Luwero · Zirobwe" },
  { n: "Mawokota",  chief: "Kangawo",            img: IMG.dance,     area: "Central-West",    desc: "Original Buganda county west of Kyadondo, known for Lake Victoria shores and fertile fishing communities.", known: "Mpigi · Lake Victoria Shore" },
  { n: "Busujju",   chief: "Kitunzi",            img: IMG.craft,     area: "Western",         desc: "Western county historically part of the core Buganda territory. Rolling hills and traditional homesteads.", known: "Mityana · Kiboga boundary" },
  { n: "Bulemeezi", chief: "Kimbugwe",           img: IMG.food,      area: "Northwest",       desc: "Northwestern county bordering Ssingo and Buruuli. Rolling landscape with diverse agriculture and cattle farming.", known: "Luweero Triangle · Makulubita" },
  { n: "Buruuli",   chief: "Kimbugwe",           img: IMG.fireworks, area: "North",           desc: "Northern county situated on the shores of Lake Kyoga. Known for its fishing and the vast papyrus wetlands.", known: "Lake Kyoga · Nakasongola" },
  { n: "Bugerere",  chief: "Mugema wa Bugerere", img: IMG.music,     area: "Northeast",       desc: "Eastern county bordered by the River Nile and Lake Kyoga. Gateway between Buganda and the Eastern region.", known: "River Nile · Kayunga" },
  { n: "Gomba",     chief: "Kasujju wa Gomba",   img: IMG.palace,    area: "Southwest",       desc: "Southwestern county bordering the greater Ankole region. Historically a frontier county with rich pastoralist traditions.", known: "Mpigi · Kabulasoke" },
  { n: "Butambala", chief: "Namasole",           img: IMG.culture,   area: "Central",         desc: "Small but culturally significant county in central Buganda. Named after the royal drum maker clan.", known: "Gombe · Bulo" },
  { n: "Mubende",   chief: "Mugema wa Mubende",  img: IMG.crowd,     area: "Western",         desc: "Western county historically contested with the Bunyoro Kingdom. Site of Nakayima Hill, a sacred Buganda spiritual site.", known: "Nakayima Tree · Mubende Town" },
  { n: "Buwekula",  chief: "Katambala",          img: IMG.market,    area: "Northwest",       desc: "Northwestern county known for rolling hills, pastoral farming, and the Kiboga forests.", known: "Kiboga · Kalangaala" },
  { n: "Ssese",     chief: "Gabunga",            img: IMG.drums,     area: "Lake Victoria",   desc: "Sacred island county on Lake Victoria — the autonomous islands of the gods. 84 islands, revered for spiritual significance since ancient times.", known: "84 Islands · Bugala Island · Lwazi" },
  { n: "Kabula",    chief: "Mukwenda",           img: IMG.dance,     area: "Southern",        desc: "Southern county, site of historically significant battles and migrations. Borders modern-day Tanzania across Lake Victoria.", known: "Lyantonde · Rakai District" },
  { n: "Kooki",     chief: "Ssabaganzi wa Kooki",img: IMG.craft,     area: "Southwest",       desc: "Southwestern county with close cultural ties to Rwanda. Has its own royal tradition as a sub-kingdom within Buganda.", known: "Rakai · Rwanda border region" },
  { n: "Buvuma",    chief: "Mugema wa Buvuma",   img: IMG.fireworks, area: "Lake Victoria",   desc: "Island county in Lake Victoria, renowned for its fishing communities and unique island culture. Buvuma Island is the largest.", known: "Buvuma Island · Lake Victoria" },
];

// ─────────────────────────────────────────────────────────────────────────────
// BUGANDA MAP — Schematic SVG (18 counties as abstract geographic shapes)
// ─────────────────────────────────────────────────────────────────────────────
// Simplified schematic positions representing the geographic arrangement
const MAP_COUNTIES = [
  { id: 0,  name: "Kyadondo",  cx: 195, cy: 220, w: 58,  h: 48  },
  { id: 1,  name: "Busiro",    cx: 130, cy: 240, w: 52,  h: 44  },
  { id: 2,  name: "Kyaggwe",   cx: 278, cy: 230, w: 64,  h: 50  },
  { id: 3,  name: "Buddu",     cx: 150, cy: 320, w: 70,  h: 52  },
  { id: 4,  name: "Ssingo",    cx: 110, cy: 160, w: 70,  h: 60  },
  { id: 5,  name: "Mawokota",  cx: 148, cy: 275, w: 54,  h: 42  },
  { id: 6,  name: "Busujju",   cx: 88,  cy: 215, w: 52,  h: 44  },
  { id: 7,  name: "Bulemeezi", cx: 175, cy: 138, w: 66,  h: 50  },
  { id: 8,  name: "Buruuli",   cx: 175, cy: 80,  w: 72,  h: 44  },
  { id: 9,  name: "Bugerere",  cx: 268, cy: 160, w: 58,  h: 52  },
  { id: 10, name: "Gomba",     cx: 88,  cy: 295, w: 50,  h: 44  },
  { id: 11, name: "Butambala", cx: 120, cy: 305, w: 46,  h: 38  },
  { id: 12, name: "Mubende",   cx: 55,  cy: 185, w: 54,  h: 50  },
  { id: 13, name: "Buwekula",  cx: 58,  cy: 135, w: 52,  h: 46  },
  { id: 14, name: "Ssese",     cx: 210, cy: 340, w: 52,  h: 38  },
  { id: 15, name: "Kabula",    cx: 155, cy: 368, w: 62,  h: 40  },
  { id: 16, name: "Kooki",     cx: 92,  cy: 358, w: 56,  h: 40  },
  { id: 17, name: "Buvuma",    cx: 300, cy: 295, w: 52,  h: 40  },
];

function BugandaMap({ activeId, onSelect }) {
  return (
    <svg
      className="buganda-map"
      viewBox="0 0 380 420"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxHeight: 380 }}
    >
      {/* Lake Victoria hint */}
      <ellipse cx="270" cy="360" rx="85" ry="50" fill="rgba(166,124,46,.08)" stroke="rgba(166,124,46,.15)" strokeWidth="1" strokeDasharray="4,3" />
      <text x="270" y="363" textAnchor="middle" fill="rgba(122,110,82,.45)" fontSize="8" fontFamily="'DM Sans',sans-serif" fontStyle="italic">Lake Victoria</text>

      {/* Lake Kyoga hint */}
      <ellipse cx="210" cy="60" rx="90" ry="30" fill="rgba(166,124,46,.06)" stroke="rgba(166,124,46,.1)" strokeWidth="1" strokeDasharray="4,3" />
      <text x="210" y="63" textAnchor="middle" fill="rgba(122,110,82,.4)" fontSize="7" fontFamily="'DM Sans',sans-serif" fontStyle="italic">Lake Kyoga</text>

      {/* County rectangles */}
      {MAP_COUNTIES.map((c) => {
        const isActive = activeId === c.id;
        return (
          <g key={c.id} onClick={() => onSelect(c.id)} style={{ cursor: "pointer" }}>
            <rect
              x={c.cx - c.w / 2} y={c.cy - c.h / 2}
              width={c.w} height={c.h}
              rx="3"
              fill={isActive ? T.gold : T.bg3}
              stroke={isActive ? T.gold2 : T.gold3}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: "fill .25s, stroke .25s" }}
            />
            <text
              x={c.cx} y={c.cy + 2}
              textAnchor="middle" dominantBaseline="middle"
              fill={isActive ? "#fff" : T.ink}
              fontSize={c.w > 60 ? "7.5" : "6.5"}
              fontFamily="'DM Sans',sans-serif"
              fontWeight="600"
              style={{ pointerEvents: "none", transition: "fill .25s" }}
            >
              {c.name.length > 9 ? c.name.slice(0, 8) + "…" : c.name}
            </text>
          </g>
        );
      })}

      {/* Compass rose */}
      <g transform="translate(344,30)">
        <circle cx="0" cy="0" r="14" fill="rgba(255,255,255,.7)" stroke={T.line} strokeWidth="1" />
        <text x="0" y="-6" textAnchor="middle" fill={T.gold} fontSize="8" fontWeight="700" fontFamily="'Bebas Neue',sans-serif">N</text>
        <line x1="0" y1="-3" x2="0" y2="3" stroke={T.gold} strokeWidth="1.5" />
        <line x1="-3" y1="0" x2="3" y2="0" stroke={T.muted} strokeWidth="1" />
      </g>

      {/* Legend */}
      <g transform="translate(10,395)">
        <rect x="0" y="0" width="10" height="10" rx="1" fill={T.gold} />
        <text x="14" y="8" fill={T.muted} fontSize="7" fontFamily="'DM Sans',sans-serif">Selected county</text>
        <rect x="90" y="0" width="10" height="10" rx="1" fill={T.bg3} stroke={T.gold3} strokeWidth="1" />
        <text x="104" y="8" fill={T.muted} fontSize="7" fontFamily="'DM Sans',sans-serif">Other county</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REMAINING DATA
// ─────────────────────────────────────────────────────────────────────────────
const CLANS = [
  { n: "Ffumbe",          totem: "African Civet",       head: "Walusimbi",           orig: true,  img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/civet.png" },
  { n: "Lugave",          totem: "Pangolin",            head: "Ndugwa",              orig: true,  img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/pangolin.jpg" },
  { n: "Ngonge",          totem: "Otter",               head: "Nakigoye Kisolo",     orig: true,  img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/otter.jpg" },
  { n: "Njaza",           totem: "Reedbuck",            head: "Kitanda",             orig: true,  img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/ReedBuck.jpg" },
  { n: "Abalangira",      totem: "Royal — no totem",    head: "Ssaabataka (Kabaka)", royal: true, img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Royals.jpg" },
  { n: "Mmamba Gabunga",  totem: "Lungfish",            head: "Gabunga",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/LungFish.jpg" },
  { n: "Mmamba Kakoboza", totem: "Lungfish",            head: "Nankere",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/LungFish.jpg" },
  { n: "Ngo",             totem: "Leopard",             head: "Muteesasira",                      img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Leopard.jpg" },
  { n: "Ngabi Nnyunga",   totem: "Bushbuck",            head: "Kannyana",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/BushBuck.jpg" },
  { n: "Ngabi Nsamba",    totem: "Bushbuck",            head: "Nsamba",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/BushBuck.jpg" },
  { n: "Ngaali",          totem: "Crested Crane",       head: "Mawesano",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/CrestedCrane.jpg" },
  { n: "Ngeye",           totem: "Colobus Monkey",      head: "Kasujja",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/ColobusMonkey.jpg" },
  { n: "Nkejje",          totem: "Sprat Fish",          head: "Kikwata",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/SpratFish2.jpg" },
  { n: "Njovu",           totem: "Elephant",            head: "Mukalo",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/elephant.jpg" },
  { n: "Nkima",           totem: "Monkey",              head: "Mugema",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/monkey.jpg" },
  { n: "Mpeewo",          totem: "Oribi Antelope",      head: "Kiggye",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Antelope.jpg" },
  { n: "Mbogo",           totem: "Buffalo",             head: "Kayiira Gajule",                   img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Buffalo.jpg" },
  { n: "Mbwa",            totem: "Dog",                 head: "Mutasingwa",                       img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Dog.jpg" },
  { n: "Nte",             totem: "Cow",                 head: "Katongole Muggatta",               img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/cow.jpg" },
  { n: "Musu",            totem: "Cane Rat",            head: "Muyingo",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/CaneRat2.png" },
  { n: "Mutima Musagi",   totem: "Heart",               head: "Nakirembeka",                      img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Heart1.png" },
  { n: "Mutima Omuyanja", totem: "Heart",               head: "Namugera Kakeeto",                 img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Heart1.png" },
  { n: "Kkobe",           totem: "Creeping Plant",      head: "Nnamwama",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Kkobe.jpg" },
  { n: "Kasimba",         totem: "Genet Cat",           head: "Kabazzi",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/GenetCat.jpg" },
  { n: "Kayozi",          totem: "Jerboa",              head: "Kafumu",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Jerboa.jpg" },
  { n: "Nseenene",        totem: "Grasshopper",         head: "Kalibbala",                        img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/GrassHoper.avif" },
  { n: "Ntalaganya",      totem: "Blue Duiker",         head: "Bbambaga",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Duiker.jpg" },
  { n: "Ndiisa",          totem: "Lark",                head: "Kaliika",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/LarkBird.jpg" },
  { n: "Mpologoma",       totem: "Lion",                head: "Ssebuganda Namuguzi",              img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Lion3.jpg" },
  { n: "Butiko",          totem: "Fungus",              head: "Ggunju",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Mushroom3.png" },
  { n: "Mpindi",          totem: "Black-eyed Pea",      head: "Mazige",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Mpindi.png" },
  { n: "Nvuma",           totem: "Water plant",         head: "Kyaddondo",                        img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Nvuma1.png" },
  { n: "Nkula",           totem: "Red Ochre",           head: "Muwangi",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Rhinocerous.jpg" },
  { n: "Nkerebwe",        totem: "Squirrel",            head: "Kidimbo",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Squirrel.jpg" },
  { n: "Ndiga",           totem: "Sheep",               head: "Lwomwa",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Sheep1.png" },
  { n: "Mazzi ga Kisasi", totem: "Water Droplets",      head: "Wooyo",                            img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/RainWater.png" },
  { n: "Nkebuka",         totem: "(Historical)",        head: "Kayizzi",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Nkebuka.png" },
  { n: "Lukato",          totem: "(Historical)",        head: "Magunda",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/LukatoClan.jpg" },
  { n: "Mbuzi",           totem: "Goat",                head: "Kisunsu",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Goat.jpg" },
  { n: "Nvubu",           totem: "Hippo",               head: "Kayita",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Hippo.jpg" },
  { n: "Nsuma",           totem: "Snout Fish",          head: "Kibondwe",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Nsuma3.png" },
  { n: "Nswaswa",         totem: "Nile monitor lizard", head: "Mayengo",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Lizard2.jpg" },
  { n: "Nnyonyi Nnyange", totem: "Heron Bird",          head: "Mbaziira",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/HeronBird2.jpg" },
  { n: "Kiwere",          totem: "Duiker",              head: "Luwonko",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Kiwere.png" },
  { n: "Babiito-Kooki",   totem: "Drum",                head: "Ssababiito",   royal: true,        img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Entenga.jpg" },
  { n: "Babiito-Kiziba",  totem: "Drum",                head: "Lutayinzibwato",royal: true,       img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Entenga.jpg" },
  { n: "Kibe",            totem: "Fox",                 head: "Muyige",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/fox3.jpg" },
  { n: "Kinyomo",         totem: "Large Black Ant",     head: "Nakigoye",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/BlackAnt2.png" },
  { n: "Nakinsige",       totem: "Oriole Bird",         head: "Kyeyune",                          img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/OrioleBird.jpg" },
  { n: "Namuŋŋoona",      totem: "Crow",                head: "Kajjabwongwa",                     img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Crow.jpg" },
  { n: "Nsunu",           totem: "Uganda Kob",          head: "Kibugaya",                         img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Kob1.jpg" },
  { n: "Kasanke",         totem: "African Firefinch",   head: "Kyangu",                           img: "https://raw.githubusercontent.com/AshrafGit256/enkuuka-site/main/public/assets/images/Kasanke.jpg" },
];

const TICKER_WORDS = ["31 December","Lubiri Palace","Mengo Kampala","52 Clans","18 Masaza","Cultural Performances","Trade Fair","Fireworks Midnight","Kabaka's Presence","Live Music","Open to All","Buganda Kingdom"];
const HOME_EVENTS = [
  { tag: "Culture",       title: "Royal Drumming & Dance", desc: "Ancient Kiganda royal drums and Baakisimba dancers in full regalia.", img: IMG.drums    },
  { tag: "Entertainment", title: "Live Music Stage",        desc: "Uganda's top artists performing through the night until midnight.",   img: IMG.music    },
  { tag: "Trade Fair",    title: "SME Marketplace",         desc: "200+ vendors, corporates and SMEs under one royal roof.",            img: IMG.market   },
  { tag: "Fireworks",     title: "New Year Countdown",      desc: "Spectacular fireworks over Lubiri Palace as the clock strikes 12.",  img: IMG.fireworks},
  { tag: "Heritage",      title: "Cultural Exhibitions",    desc: "Bark cloth, traditional dress, Buganda history on display.",         img: IMG.culture  },
  { tag: "Community",     title: "Festival Atmosphere",     desc: "50,000 people united — food, laughter and Kiganda pride.",           img: IMG.crowd    },
];
const ARTISTS = [
  { tag: "Headline",      title: "Eddy Kenzo",          desc: "Grammy-nominated afrobeat king — the biggest set of the night.", img: IMG.music   },
  { tag: "Cultural",      title: "Abasakiiko Ensemble",  desc: "Royal Buganda drumming and dance.", img: IMG.drums  },
  { tag: "DJ Set",        title: "DJ Slick Stuart",      desc: "Uganda's premier DJ spinning Afrobeats all night.", img: IMG.crowd },
  { tag: "Special Guest", title: "Zuena Kirema",         desc: "Beloved Ugandan singer under the Lubiri stars.", img: IMG.culture},
  { tag: "Dance",         title: "Muyinza Dance Troupe", desc: "Spectacular traditional Buganda dances in full ceremonial dress.", img: IMG.dance  },
  { tag: "Rising Star",   title: "Azawi",                desc: "New-generation Ugandan music, live at Enkuuka.", img: IMG.music  },
];
const BIZ_TABS = ["Small Businesses","Trade Fair","Services","Tourism","Transport"];
const BIZ_DATA = {
  "Small Businesses": [
    { tag: "Food",     title: "Fast Food Vendors",   desc: "Rolex, nyama choma, matoke — street food for thousands.", img: IMG.food    },
    { tag: "Crafts",   title: "Handmade Crafts",     desc: "Bark cloth, jewelry, pottery and bespoke Ugandan fashion.", img: IMG.craft },
    { tag: "Beverages",title: "Drink Stands",        desc: "Cold drinks, fresh juices, local brews.",                img: IMG.market  },
    { tag: "Services", title: "Photo Services",      desc: "Professional portrait and event photography on site.",    img: IMG.culture },
  ],
  "Trade Fair": [
    { tag: "Corporate",  title: "Corporate Exhibitions", desc: "Showcase products to 50,000+ attendees.",             img: IMG.crowd   },
    { tag: "SME",        title: "SME Marketplace",       desc: "Curated zone connecting small businesses to buyers.", img: IMG.market  },
    { tag: "Launch",     title: "Product Launches",      desc: "Announce new products to a massive New Year crowd.",  img: IMG.music   },
    { tag: "Networking", title: "B2B Zone",              desc: "Space for investors and entrepreneurs.",              img: IMG.palace  },
  ],
  "Services": [
    { tag: "Gov",    title: "NIRA Registration",  desc: "On-site National ID registration for all citizens.", img: IMG.crowd   },
    { tag: "Health", title: "Blood Donation",     desc: "Uganda Blood Transfusion Services drive.",           img: IMG.culture },
    { tag: "Telecom",title: "MTN · Airtel",       desc: "SIM registration, data bundles and mobile money.",   img: IMG.market  },
    { tag: "Medical",title: "Free Health Checks", desc: "Immunization, screening and first aid on site.",     img: IMG.palace  },
  ],
  "Tourism": [
    { tag: "UNESCO",  title: "Kasubi Tombs",      desc: "World Heritage Site — royal tombs of the kings.",    img: IMG.palace  },
    { tag: "Royal",   title: "Lubiri Palace Tour", desc: "Tour the historic Mengo Palace grounds.",           img: IMG.culture },
    { tag: "Wildlife",title: "Bwindi Forest",     desc: "Gorilla trekking packages at the tourism desk.",     img: IMG.drums   },
    { tag: "City",    title: "Discover Kampala",  desc: "Guided tours of Owino Market and the National Museum.", img: IMG.crowd},
  ],
  "Transport": [
    { tag: "Shuttle", title: "Festival Shuttle",  desc: "Buses from city center to Lubiri every 20 minutes.", img: IMG.crowd   },
    { tag: "Boda",    title: "Boda Boda Zones",   desc: "Marshaled boda drop-off inside and outside.",        img: IMG.market  },
    { tag: "Parking", title: "Private Parking",   desc: "3 parking zones with 24-hour security.",             img: IMG.palace  },
    { tag: "Ride",    title: "Bolt & SafeBoda",   desc: "Dedicated pick-up/drop-off at the main gate.",       img: IMG.culture },
  ],
};
const PROGRAMME = [
  { time: "8:00AM",  title: "Helicopter Arrival",    desc: "Royal Helicopter lands. Kabaka makes his grand aerial entry." },
  { time: "9:00AM",  title: "Gates Open",            desc: "Trade fair and service tents begin at Lubiri Palace." },
  { time: "9:30AM",  title: "Key Ceremony",          desc: "Okunoonya Engule — symbolic clan key-searching ritual." },
  { time: "10:00AM", title: "Business Exhibition",   desc: "200+ SME and corporate exhibitors officially open." },
  { time: "12:00PM", title: "Cultural Performances", desc: "Royal drumming, Baakisimba dance and traditional showcases." },
  { time: "2:00PM",  title: "Kabaka's Address",      desc: "His Majesty the Kabaka addresses the kingdom." },
  { time: "3:30PM",  title: "Clan Championships",    desc: "Inter-clan cultural competition — dress, dance, storytelling." },
  { time: "5:00PM",  title: "Sunset Concert",        desc: "Supporting artists warm up the crowd as the sun sets." },
  { time: "7:00PM",  title: "Headline Performances", desc: "Top Ugandan artists on the main stage." },
  { time: "9:30PM",  title: "Royal Bonfire",         desc: "Omuliro Gw'Omwaka — sacred year-fire ceremony with elders." },
  { time: "11:00PM", title: "Pre-Countdown Show",    desc: "Final DJ set and crowd preparation for the New Year." },
  { time: "12:00AM", title: "New Year Fireworks!",   desc: "Fireworks explode above Lubiri Palace. Happy New Year!" },
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
  { src: IMG.drums,    title: "Royal Drumming",     sub: "Culture"       },
  { src: IMG.dance,    title: "Traditional Dance",  sub: "Heritage"      },
  { src: IMG.market,   title: "Trade Fair",         sub: "Business"      },
  { src: IMG.fireworks,title: "New Year Fireworks", sub: "Celebration"   },
  { src: IMG.music,    title: "Live Music Stage",   sub: "Entertainment" },
  { src: IMG.culture,  title: "Cultural Exhibition",sub: "Heritage"      },
  { src: IMG.crowd,    title: "Festival Crowd",     sub: "Community"     },
  { src: IMG.palace,   title: "Lubiri Palace",      sub: "Venue"         },
  { src: IMG.food,     title: "Food Market",        sub: "Trade Fair"    },
];
const SPONSORS = ["MTN Uganda","Airtel Uganda","Roofings Group","Bank of Uganda","URA","Uganda Tourism Board","NBS TV","KCCA"];
const ALL_PAGES = ["Home","Culture","Clans","Masaza","Entertainment","Events","Business","Programme","Gallery","Accommodation","Invitation","Contact"];

const EVENTS_DATA = [
  { phase:"Morning", phaseIcon:"🌅", phaseTime:"8:00 AM – 12:00 PM", id:"morning", events:[
    { time:"8:00 AM", title:"Royal Helicopter", titleAccent:"Arrival", subtitle:"Kabaka's Grand Entry from the Sky", desc:"The day begins in dramatic fashion as the Royal Helicopter carrying His Majesty the Kabaka of Buganda descends over Lubiri Palace. Tens of thousands of Baganda look skyward, ululating and waving as the kingdom's sovereign makes his spectacular aerial arrival.", mediaType:"video", videoBg:IMG.heli, videoTitle:"Royal Helicopter Arrival — Enkuuka 2025", facts:[{icon:"🚁",text:"Royal Helicopter"},{icon:"👑",text:"Kabaka's Entry"},{icon:"📍",text:"Lubiri Palace Grounds"}], highlights:["Kabaka lands to thunderous ululations from 50,000 attendees","Royal Guard of Honour stands at attention","Aerial footage captured by official royal media crew"], flip:false },
    { time:"9:00 AM", title:"Gates Open —", titleAccent:"Welcome to Lubiri", subtitle:"Festival Grounds Open to the Public", desc:"The great gates of Lubiri Palace swing open. Festival stewards guide guests to the trade fair, cultural exhibition tents, food courts, and the main performance arena. The atmosphere hums with anticipation as vendors arrange their stalls.", mediaType:"image", img:IMG.gate, facts:[{icon:"🚪",text:"3 Entry Gates"},{icon:"👥",text:"50,000 Capacity"},{icon:"🎟",text:"Ticketed Entry"}], highlights:["VIP lane with dedicated welcome from clan leaders","Cultural dress encouraged — gomesi and kanzu welcome ceremonies","Festival map distributed at each gate"], flip:true },
    { time:"9:30 AM", title:"The Key-Searching", titleAccent:"Ceremony", subtitle:"Okunoonya Engule — Finding the Crown", desc:"One of Enkuuka's most beloved Kiganda traditions. A symbolic re-enactment of the ancient ritual where clan elders search for the royal keys — representing the unlocking of a new year. 52 clan representatives participate, guided by the Katikkiro and senior clan heads.", mediaType:"video", videoBg:IMG.ceremony, videoTitle:"Key Searching Ceremony — Okunoonya Engule", facts:[{icon:"🗝",text:"Ancient Ritual"},{icon:"🏰",text:"Palace Courtyard"},{icon:"📜",text:"All 52 Clans Represented"}], highlights:["52 clan representatives each carry a clan-specific symbolic token","Elders chant traditional Kiganda songs throughout","The found key is presented to the Katikkiro in formal handover","Ceremony lasts ~40 minutes with audience participation"], flip:false },
  ]},
  { phase:"Midday", phaseIcon:"☀️", phaseTime:"12:00 PM – 4:00 PM", id:"midday", events:[
    { time:"10:00 AM", title:"Trade Fair &", titleAccent:"SME Marketplace", subtitle:"200+ Vendors Open for Business", desc:"The trade fair grounds buzz with commerce. From bark cloth weavers to tech startups, the marketplace reflects Buganda's economic life. NIRA IDs, blood donation, and health screenings operate alongside craft sellers, food vendors, and product launchers.", mediaType:"video", videoBg:IMG.tradeShow, videoTitle:"Trade Fair Opening — SME Marketplace 2025", facts:[{icon:"🛒",text:"200+ Vendors"},{icon:"🏢",text:"Corporate & SME Zones"},{icon:"💰",text:"UGX 150K+ Packages"}], highlights:["Corporate pavilions from MTN, Airtel, Roofings Group","NIRA on-site national ID registration","Uganda Blood Transfusion Service life-saving drive","Tourism Uganda desk with gorilla trekking packages"], flip:false },
    { time:"12:00 PM", title:"Royal Cultural", titleAccent:"Performances Begin", subtitle:"Baakisimba · Nankasa · Mbaga", desc:"The cultural heart of Enkuuka. Royal drummers, Baakisimba dancers in full regalia, and performers representing all 18 Masaza fill the stage. The engalabi and empuunyi drums set a rhythm that has powered Kiganda celebration for centuries.", mediaType:"image", img:IMG.drums, facts:[{icon:"🥁",text:"Royal Drums"},{icon:"💃",text:"18 Masaza Troupes"},{icon:"🎶",text:"3-Hour Cultural Set"}], highlights:["Engalabi and empuunyi royal drums open the cultural programme","Baakisimba — the queen's dance — performed by royal troupe","Nankasa and Mbaga warrior dances by Ssingo and Kyaggwe","Bark cloth demonstration alongside stage"], flip:true },
    { time:"2:00 PM", title:"Kabaka's Address", titleAccent:"to the Nation", subtitle:"Royal Speech & Kingdom Announcements", desc:"His Majesty the Kabaka addresses the gathered Baganda and guests of honour. The Katikkiro and senior ministers speak in turn. Government representatives, foreign embassies, and traditional kingdoms of Uganda are formally welcomed.", mediaType:"video", videoBg:IMG.speeches, videoTitle:"Kabaka's Royal Address — Enkuuka 2025", facts:[{icon:"👑",text:"Kabaka Presides"},{icon:"🕑",text:"~90 Minutes"},{icon:"📺",text:"Live on NBS TV"}], highlights:["Full live broadcast on NBS TV and Buganda Kingdom Radio","Address in Luganda with simultaneous English translation","Special recognition of outstanding clan contributions","State of the Kingdom report presented"], flip:false },
    { time:"3:30 PM", title:"Clan Championships", titleAccent:"& Competitions", subtitle:"Inter-Clan Cultural Competition", desc:"Masaza and clan delegations compete in a cultural championship judged by senior elders. Categories include best traditional dress, finest cultural dance, most authentic food, and best oral history storytelling (okugamba).", mediaType:"image", img:IMG.culture, facts:[{icon:"🏆",text:"5 Categories"},{icon:"👗",text:"Traditional Dress Awards"},{icon:"🗣",text:"Oral Storytelling"}], highlights:["Best Gomesi & Kanzu awards by the Nnaabagereka","Traditional cooking competition — authentic Kiganda dishes","Storytelling competition — okugamba — historical Kiganda tales","Winning Masaza receive the Enkuuka Cultural Shield"], flip:true },
  ]},
  { phase:"Evening", phaseIcon:"🌆", phaseTime:"4:00 PM – 8:00 PM", id:"evening", events:[
    { time:"5:00 PM", title:"Sunset Concert —", titleAccent:"Supporting Acts", subtitle:"Rising Stars of Ugandan Music", desc:"As the sun descends over Mengo, the main stage transitions to live music. Supporting artists — Uganda's rising musicians — perform 30-minute sets across Afrobeats, Afropop, and Kiganda traditional fusion.", mediaType:"image", img:IMG.music, facts:[{icon:"🎤",text:"5+ Supporting Acts"},{icon:"🌇",text:"Golden Hour"},{icon:"🎶",text:"Afrobeats · Fusion"}], highlights:["Azawi performs a special 45-minute golden hour set","Muyinza Dance Troupe returns for a second performance","Food courts at peak — rolex, nyama choma, matoke fresh","Fireworks safety briefing at 6:00 PM"], flip:false },
    { time:"7:00 PM", title:"Headline Acts —", titleAccent:"Main Stage", subtitle:"Uganda's Biggest Artists Take the Stage", desc:"Night falls over Lubiri and the main stage blazes to life. Eddy Kenzo opens to a deafening reception, followed by Zuena Kirema's emotional classics. DJ Slick Stuart keeps energy at fever pitch between sets.", mediaType:"video", videoBg:IMG.concert, videoTitle:"Headline Concert — Enkuuka Night 2025", facts:[{icon:"🌟",text:"Eddy Kenzo Headlines"},{icon:"🎸",text:"Afrigo Band Special Set"},{icon:"🔊",text:"50,000-Person Crowd"}], highlights:["Eddy Kenzo opens with biggest catalogue hits — full band","Afrigo Band — Uganda's legendary orchestra — anniversary set","Zuena Kirema delivers emotional ballad set","DJ Slick Stuart and DJ Roja pre-midnight battle"], flip:true },
  ]},
  { phase:"Night", phaseIcon:"🌙", phaseTime:"8:00 PM – Midnight", id:"night", events:[
    { time:"9:30 PM", title:"Royal Bonfire &", titleAccent:"Fire Ceremony", subtitle:"Omuliro Gw'Omwaka — The Year's Fire", desc:"The Royal Bonfire is lit by a senior elder in the palace courtyard. The 'Omuliro Gw'Omwaka' symbolises the burning away of the old year. Thousands gather, some holding candles, as clan elders recite blessings in Luganda.", mediaType:"video", videoBg:IMG.ceremony, videoTitle:"Royal Bonfire — Omuliro Gw'Omwaka", facts:[{icon:"🔥",text:"Sacred Royal Fire"},{icon:"📿",text:"Elders' Blessing"},{icon:"🕯",text:"Candle Procession"}], highlights:["Senior clan elder lights the royal fire using traditional methods","All 52 clan heads encircle the fire for collective blessing","Candle procession from fire to main stage — 3,000 candles","Silence held for 60 seconds across 50,000 attendees"], flip:false },
    { time:"11:00 PM", title:"Pre-Countdown", titleAccent:"Show", subtitle:"The Final Hour Before the New Year", desc:"The final DJ set raises the festival to peak intensity. The giant screens flash the year's highlights: the helicopter arrival, the key ceremony, the performances, the bonfire. A last burst of traditional drumming signals midnight is minutes away.", mediaType:"image", img:IMG.crowd, facts:[{icon:"⏱",text:"60-Minute Final Set"},{icon:"📺",text:"Year Highlights Reel"},{icon:"🥁",text:"Final Royal Drum Roll"}], highlights:["Giant screen retrospective of the full day","Final royal drum roll by the Abasakiiko Ensemble","50,000 voices counting down from 10 minutes to midnight","Pyrotechnic warm-up sparks begin at 11:58 PM"], flip:true },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────
function useCountdown() {
  const calc = () => { const now = new Date(); const target = new Date(now.getFullYear(),11,31,23,59,59); if (now>target) target.setFullYear(target.getFullYear()+1); const diff=target-now; return {d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000)}; };
  const [cd,setCd]=useState(calc);
  useEffect(()=>{const t=setInterval(()=>setCd(calc()),1000);return()=>clearInterval(t);},[]);
  return cd;
}
function useFadeIn(delay=0){const ref=useRef(null);useEffect(()=>{const el=ref.current;if(!el)return;const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.style.transitionDelay=delay+"s";el.classList.add("visible");ob.disconnect();}},{threshold:0.1});ob.observe(el);return()=>ob.disconnect();},[delay]);return ref;}
const FU=({children,delay=0,style={}})=>{const ref=useFadeIn(delay);return <div ref={ref} className="fu" style={style}>{children}</div>;};
const pad=n=>String(n).padStart(2,"0");

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function Ticker(){const items=[...TICKER_WORDS,...TICKER_WORDS];return(<div className="ticker"><div className="ticker-track">{items.map((t,i)=><span key={i} className="ticker-item">{t}<span className="ticker-dot"/></span>)}</div></div>);}
function PageHero({img,label,title,titleAccent}){return(<div className="phero"><img src={img} alt={label} loading="lazy"/><div className="phero-ov"/><div className="phero-content"><p className="s-label">{label}</p><h1 className="s-title f-display" style={{fontSize:"clamp(1.8rem,5vw,3.6rem)"}}>{title} {titleAccent&&<em>{titleAccent}</em>}</h1></div></div>);}
function EventCard({tag,title,desc,img}){return(<div className="event-card"><img src={img} alt={title} loading="lazy"/><div className="event-card-overlay"/><div className="event-card-body"><span className="event-card-tag">{tag}</span><p className="event-card-title f-display">{title}</p><p className="event-card-desc">{desc}</p></div></div>);}
function SplitSection({img,label,title,titleAccent,body,cta,onCta,reverse=false,children}){return(<div className={`split${reverse?" rev":""}`}><div className="split-img"><img src={img} alt={title} loading="lazy"/><div className="split-img-overlay"/></div><div className="split-content"><FU><p className="s-label">{label}</p><h2 className="s-title f-display">{title}{titleAccent&&<> <em>{titleAccent}</em></>}</h2>{body&&<p className="s-body" style={{marginBottom:22}}>{body}</p>}{children}{cta&&<button className="btn-gold" onClick={onCta} style={{alignSelf:"flex-start"}}>{cta}</button>}</FU></div></div>);}
function PageFooter({setPage}){const go=p=>{setPage(p);window.scrollTo(0,0);};return(<footer className="footer"><div className="footer-grid"><div><p className="footer-brand f-display">Enkuuka <em>y'Omwaka</em></p><p className="footer-tagline">Uganda's premier cultural and economic festival. Every 31st December at Lubiri Palace, Mengo.</p><div className="social-row">{["𝕏","f","▶","📷"].map((s,i)=><div key={i} className="social-btn">{s}</div>)}</div></div><div><p className="footer-col-head">Event</p><ul className="footer-links">{["Home","Culture","Clans","Masaza","Entertainment","Events","Programme"].map(p=><li key={p} onClick={()=>go(p)}>{p}</li>)}</ul></div><div><p className="footer-col-head">Attend</p><ul className="footer-links">{["Accommodation","Business","Gallery","Invitation","Contact"].map(p=><li key={p} onClick={()=>go(p)}>{p}</li>)}</ul></div><div><p className="footer-col-head">Contact</p><ul className="footer-links"><li>Lubiri Palace, Mengo</li><li>Kampala, Uganda</li><li>info@enkuuka.ug</li><li>+256 414 000 000</li></ul></div></div><div className="footer-bottom"><p className="footer-copy">© 2025 Enkuuka y'Omwaka · Buganda Kingdom</p><div className="social-row">{["𝕏","f","▶","📷"].map((s,i)=><div key={i} className="social-btn">{s}</div>)}</div></div></footer>);}

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
function Nav({page,setPage}){
  const[slim,setSlim]=useState(false);const[mob,setMob]=useState(false);
  useEffect(()=>{const h=()=>setSlim(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  const go=p=>{setPage(p);setMob(false);window.scrollTo(0,0);};
  const NAV_PAGES=["Home","Culture","Clans","Masaza","Events","Entertainment","Business","Gallery","Accommodation"];
  return(<><nav className={`nav${slim?" slim":""}`}><div className="nav-logo f-display" onClick={()=>go("Home")}>Enkuuka <em>y'Omwaka</em></div><ul className="nav-links">{NAV_PAGES.map(p=><li key={p} className={page===p?"active":""} onClick={()=>go(p)}>{p}</li>)}</ul><div style={{display:"flex",alignItems:"center",gap:12}}><button className="nav-cta" onClick={()=>go("Invitation")}>Get Tickets</button><div className="hamburger" onClick={()=>setMob(o=>!o)}><span/><span/><span/></div></div></nav><div className={`mob-drawer${mob?" open":""}`}><ul>{ALL_PAGES.map(p=><li key={p} onClick={()=>go(p)}>{p}</li>)}</ul></div></>);
}

// ─────────────────────────────────────────────────────────────────────────────
// MASAZA PAGE — REDESIGNED
// ─────────────────────────────────────────────────────────────────────────────
function MasazaPage({ setPage }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = MASAZA[activeIdx];

  return (
    <div className="page-enter">
      <PageHero img={IMG.palace} label="Amasaza ga Buganda" title="The 18 Counties of" titleAccent="Buganda" />
      <Ticker />

      {/* ── INTRO BAR ── */}
      <div style={{ background: T.bg2, padding: "40px 48px", borderBottom: `1px solid ${T.line}`, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0 }}>
        {[["18","Counties (Amasaza)"],["250+","Sub-counties"],["6M+","Baganda People"],["1964","Last boundary change"]].map(([num,lbl])=>(
          <div key={lbl} style={{ textAlign:"center", padding:"8px 12px", borderRight:`1px solid ${T.lineSoft}` }}>
            <span className="stat-num f-block" style={{ fontSize:"1.8rem" }}>{num}</span>
            <span className="stat-label">{lbl}</span>
          </div>
        ))}
      </div>

      {/* ── MAP + LIST ── */}
      <FU>
        <div style={{ background: T.bg, padding: "0" }}>
          {/* Section heading above the map */}
          <div style={{ padding: "44px 48px 0" }}>
            <p className="s-label">Interactive Map</p>
            <h2 className="s-title f-display">Explore Every <em>County</em></h2>
            <p style={{ fontSize: ".85rem", color: T.muted, marginBottom: 24, lineHeight: 1.8, maxWidth: 560 }}>
              Select any county on the map or from the list to explore its history, Saza Chief, and landmarks. Each of the 18 Masaza sends a delegation to Enkuuka y'Omwaka every December 31st.
            </p>
          </div>

          <div className="masaza-main-grid" style={{ margin: "0 48px", border: `1px solid ${T.line}` }}>
            {/* Left: scrollable county list */}
            <div className="masaza-list-panel">
              {MASAZA.map((saza, i) => (
                <div
                  key={saza.n}
                  className={`saza-list-item${activeIdx === i ? " active" : ""}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <div className="saza-list-num">{String(i+1).padStart(2,"0")}</div>
                  <div className="saza-list-content">
                    <p className="saza-list-name f-display">{saza.n}</p>
                    <p className="saza-list-chief">Chief: {saza.chief} · {saza.area}</p>
                  </div>
                  <span className="saza-list-arrow">→</span>
                </div>
              ))}
            </div>

            {/* Right: map + detail */}
            <div className="masaza-map-panel">
              <div className="masaza-map-header">
                <p style={{ fontSize:".6rem", letterSpacing:3, textTransform:"uppercase", color:T.gold, fontWeight:700 }}>Buganda Kingdom — Schematic Map</p>
                <p style={{ fontSize:".72rem", color:T.muted, marginTop:2 }}>Click any county block to explore</p>
              </div>
              <div className="masaza-map-wrap">
                <BugandaMap activeId={activeIdx} onSelect={setActiveIdx} />
              </div>
              <div className="masaza-detail-card">
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <p className="masaza-detail-name f-display">{active.n}</p>
                    <p className="masaza-detail-chief">Saza Chief: {active.chief}</p>
                    <p className="masaza-detail-desc">{active.desc}</p>
                  </div>
                  <div style={{ flexShrink:0, textAlign:"right" }}>
                    <span style={{ fontSize:".55rem", letterSpacing:2, textTransform:"uppercase", color:T.muted, display:"block", marginBottom:3 }}>Known for</span>
                    <span style={{ fontSize:".72rem", color:T.ink, fontWeight:600 }}>{active.known}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FU>

      {/* ── COUNTY CARD GRID ── */}
      <div style={{ background: T.bg, padding: "44px 48px 0" }}>
        <FU>
          <p className="s-label">All 18 Counties</p>
          <h2 className="s-title f-display">The Kingdom's <em>Fabric</em></h2>
          <p style={{ fontSize:".85rem", color:T.muted, marginBottom:24, lineHeight:1.8, maxWidth:540 }}>
            Every Saza contributes its own culture, leadership, and delegation to Enkuuka y'Omwaka. Hover any card to learn more.
          </p>
        </FU>
      </div>
      <FU delay={0.1}>
        <div style={{ padding: "0 48px 48px" }}>
          <div className="masaza-cards-grid">
            {MASAZA.map((saza, i) => (
              <div key={saza.n} className="masaza-card" onClick={() => setActiveIdx(i)}>
                <img src={saza.img} alt={saza.n} loading="lazy" />
                <div className="masaza-card-overlay" />
                <div className="masaza-card-body">
                  <span className="masaza-card-num">SSAZA {String(i+1).padStart(2,"0")}</span>
                  <p className="masaza-card-name f-display">{saza.n}</p>
                  <p className="masaza-card-chief">{saza.chief}</p>
                  <p className="masaza-card-desc">{saza.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FU>

      {/* ── HISTORY STRIP ── */}
      <FU>
        <div className="masaza-history">
          <div className="masaza-history-text">
            <p style={{ fontSize:".65rem", letterSpacing:4, textTransform:"uppercase", color:T.gold3, fontWeight:700, marginBottom:14 }}>Historical Context</p>
            <h2>The Kingdom's <em>Administrative Genius</em></h2>
            <p>Buganda's county system is one of the most sophisticated pre-colonial administrative structures in sub-Saharan Africa. Each Masaza was governed by a Saza Chief appointed by the Kabaka, answerable to the Lukiiko (Parliament), and responsible for tax collection, military recruitment, and judicial matters.</p>
            <p>The counties are sub-divided into Gombolola (sub-counties), then Miluka (parishes), and finally individual family units called <em style={{ color:T.gold3 }}>Enju</em> — creating a hierarchy of governance that endured for centuries before colonial reorganisation.</p>
            <p style={{ marginBottom:0 }}>Buganda originally had 20 counties. In 1964, following a referendum, Buyaga and Bugangaizi counties were ceded to the Bunyoro Kingdom — reducing the total to the current 18 Masaza.</p>
          </div>
          <div>
            <div className="masaza-history-facts">
              {[
                ["20","Original Counties"], ["1964","Last Boundary Change"],
                ["6","Levels of Governance"], ["84","Ssese Islands in Ssese Saza"],
              ].map(([num,lbl])=>(
                <div key={lbl} className="masaza-history-fact">
                  <span className="masaza-history-fact-num f-block">{num}</span>
                  <span className="masaza-history-fact-label">{lbl}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:2, background:"rgba(255,255,255,.04)", border:"1px solid rgba(201,168,76,.12)", padding:"20px" }}>
              <p style={{ fontSize:".65rem", letterSpacing:3, textTransform:"uppercase", color:T.gold3, marginBottom:8, fontWeight:700 }}>The Hierarchy</p>
              {["Masaza (County)","Gombolola (Sub-county)","Miluka (Parish)","Mutala (Village)","Enju (Family Unit)"].map((level,i)=>(
                <div key={level} style={{ display:"flex", alignItems:"center", gap:10, marginBottom: i<4?8:0 }}>
                  <div style={{ width:20, height:20, background:"rgba(212,174,94,.15)", border:"1px solid rgba(212,174,94,.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:".65rem", color:T.gold3 }}>{i+1}</span>
                  </div>
                  <span style={{ fontSize:".8rem", color:"rgba(250,245,232,.55)" }}>{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FU>

      {/* ── MASAZA CUP ── */}
      <FU>
        <div className="masaza-cup">
          <div className="masaza-cup-img-wrap">
            <img src={IMG.football} alt="Masaza Cup Football" loading="lazy" />
            <span className="masaza-cup-badge">Since 2004</span>
          </div>
          <div>
            <p className="s-label">The Annual Tournament</p>
            <h2 className="s-title f-display">The <em>Masaza Cup</em></h2>
            <p style={{ fontSize:".88rem", color:T.muted, lineHeight:1.9, marginBottom:14 }}>
              Every year, Buganda Kingdom's 18 counties compete in the Masaza Cup — one of Uganda's most beloved football tournaments. More than a sporting event, the Cup is a celebration of county pride, clan identity, and Kiganda spirit. Communities pour into stadiums dressed in their county colours, waving flags, singing county anthems.
            </p>
            <p style={{ fontSize:".88rem", color:T.muted, lineHeight:1.9, marginBottom:24 }}>
              The tournament has been running since 2004 and has become a platform for discovering Uganda's grassroots football talent. Many Uganda Cranes players were first spotted at the Masaza Cup. County rivalries — Kyadondo vs Kyaggwe, Buddu vs Ssingo — are fiercely contested and deeply personal.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:28 }}>
              {[["18","Counties Compete"],["2004","Year Founded"],["Uganda Cranes","Talent Source"]].map(([top,bot])=>(
                <div key={bot} style={{ padding:"12px 16px", border:`1px solid ${T.line}`, background:"#fff", textAlign:"center", minWidth:110 }}>
                  <p className="f-block" style={{ color:T.gold, fontSize:".85rem" }}>{top}</p>
                  <p style={{ fontSize:".6rem", color:T.muted, letterSpacing:1.5, textTransform:"uppercase", marginTop:2 }}>{bot}</p>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button className="btn-gold" onClick={() => setPage("Culture")}>Explore Buganda Culture →</button>
              <button className="btn-outline" onClick={() => setPage("Events")}>Day Events at Enkuuka</button>
            </div>
          </div>
        </div>
      </FU>

      <PageFooter setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
function HomePage({setPage}){const cd=useCountdown();return(<div className="page-enter"><section className="hero"><div className="hero-bg" style={{backgroundImage:`url(${IMG.hero})`}}/><div className="hero-overlay"/><div className="hero-deco"/><div className="hero-content"><p className="hero-eyebrow">Lubiri Palace · Mengo · Kampala</p><h1 className="hero-title f-display">Enkuuka<br/><em>y'Omwaka</em></h1><p className="hero-sub">The Royal Buganda New Year Festival</p><div className="countdown"><div className="cd-block"><span className="cd-num">{pad(cd.d)}</span><span className="cd-label">Days</span></div><span className="cd-sep">:</span><div className="cd-block"><span className="cd-num">{pad(cd.h)}</span><span className="cd-label">Hours</span></div><span className="cd-sep">:</span><div className="cd-block"><span className="cd-num">{pad(cd.m)}</span><span className="cd-label">Mins</span></div><span className="cd-sep">:</span><div className="cd-block"><span className="cd-num">{pad(cd.s)}</span><span className="cd-label">Secs</span></div></div><div style={{display:"flex",gap:12,flexWrap:"wrap"}}><button className="btn-gold" onClick={()=>setPage("Invitation")}>Secure Your Tickets →</button><button className="btn-outline" style={{color:"rgba(250,245,232,.85)",borderColor:"rgba(250,245,232,.4)"}} onClick={()=>setPage("Events")}>See Day Events</button></div></div></section><Ticker/><div className="stats-strip"><div className="stat-cell"><span className="stat-num f-block">52</span><span className="stat-label">Buganda Clans</span></div><div className="stat-cell"><span className="stat-num f-block">18</span><span className="stat-label">Masaza Counties</span></div><div className="stat-cell"><span className="stat-num f-block">36</span><span className="stat-label">Kabakas of Buganda</span></div></div><div style={{background:T.bg,padding:"64px 48px"}}><FU><p className="s-label">What's On</p><h2 className="s-title f-display">Highlights at <em>Enkuuka 2025</em></h2></FU><div className="event-grid" style={{marginTop:24}}>{HOME_EVENTS.map((e,i)=><FU key={e.title} delay={i*.06}><EventCard {...e}/></FU>)}</div><FU delay={0.3} style={{marginTop:28,textAlign:"center"}}><button className="btn-outline" onClick={()=>setPage("Events")}>View Full Day Events →</button></FU></div><SplitSection img={IMG.drums} label="Culture & Heritage" title="600 Years of" titleAccent="Kiganda Pride" body="The Buganda Kingdom — one of East Africa's oldest and most organised kingdoms. Royal drumming, Baakisimba dance, bark cloth and the sacred clan system come alive at Lubiri Palace every 31st December." cta="Explore Culture →" onCta={()=>setPage("Culture")}/><SplitSection img={IMG.market} label="Business & Trade Fair" title="50,000 People." titleAccent="One Marketplace." body="Uganda's most impactful end-of-year economic platform. 200+ vendors, SMEs and corporates united under the royal roof of Lubiri." cta="Register as Vendor →" onCta={()=>setPage("Business")} reverse/><div className="sponsors-band"><span style={{fontSize:".62rem",letterSpacing:3,textTransform:"uppercase",color:T.gold,fontWeight:700,marginRight:8}}>Partners</span>{SPONSORS.map(s=><div key={s} className="sponsor-pill">{s}</div>)}</div><PageFooter setPage={setPage}/></div>);}

// CULTURE
function CulturePage({setPage}){const traditions=[{img:IMG.king,label:"Royalty",title:"Kabaka",accent:"of Buganda",body:"The Kabaka is the living embodiment of the Buganda Kingdom — sovereign, spiritual symbol, and guardian of Kiganda tradition."},{img:IMG.dance,label:"Tradition",title:"Traditional",accent:"Dance",body:"Baakisimba, Nankasa and Mbaga are sacred dances at royal gatherings. Every movement is a language of Kiganda identity.",reverse:true},{img:IMG.traditional,label:"Tradition",title:"Bark Cloth",accent:"(Olubugo)",body:"UNESCO-recognised bark cloth crafted entirely by hand from the mutuba fig tree — the defining textile of Buganda."},{img:IMG.dress,label:"Tradition",title:"Gomesi &",accent:"Kanzu",body:"The elegant gomesi and flowing kanzu are the formal traditional dress of the Baganda. Seeing thousands of them at Lubiri on December 31st is extraordinary.",reverse:true}];return(<div className="page-enter"><PageHero img={IMG.kingdom} label="Show Culture · Have Heritage" title="Buganda —" titleAccent="Kingdom of Grace"/><Ticker/>{traditions.map(t=><SplitSection key={t.title} {...t}/>)}<div className="kabaka-band"><FU style={{textAlign:"center"}}><p className="s-label" style={{justifyContent:"center"}}>His Majesty</p><h2 className="s-title f-display" style={{fontSize:"clamp(1.8rem,5vw,3.4rem)",textAlign:"center"}}>The Kabaka of <em>Buganda</em></h2><p style={{color:T.muted,lineHeight:1.9,maxWidth:620,margin:"16px auto 28px",fontSize:".9rem"}}>His Majesty Ronald Muwenda Mutebi II, the 36th Kabaka, has presided over the kingdom since 1993. At Enkuuka y'Omwaka, his presence transforms the celebration into a royal gathering.</p><div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>{[["👑","36th Kabaka","Since 1993"],["🏛","Lubiri Palace","Royal Seat"],["🌍","6M+ Baganda","Kingdom People"],["📜","52 Clans","All United"]].map(([icon,t1,t2])=>(<div key={t1} className="kab-stat"><div style={{fontSize:"1.4rem",marginBottom:6}}>{icon}</div><p className="f-block" style={{color:T.ink,fontSize:".9rem"}}>{t1}</p><p style={{fontSize:".62rem",color:T.muted,letterSpacing:2,textTransform:"uppercase",marginTop:2}}>{t2}</p></div>))}</div><div style={{display:"flex",gap:12,justifyContent:"center",marginTop:28,flexWrap:"wrap"}}><button className="btn-gold" onClick={()=>setPage("Clans")}>Explore All 52 Clans →</button><button className="btn-outline" onClick={()=>setPage("Masaza")}>View 18 Masaza</button></div></FU></div><PageFooter setPage={setPage}/></div>);}

// CLANS
function ClanCardPro({clan,index,featured=false}){return(<div className={`clan-card-pro${featured?" featured":""}`}><img className="clan-img" src={clan.img} alt={clan.totem} loading="lazy" onError={e=>{e.target.src="https://images.unsplash.com/photo-1549366021-9f761d450615?w=640&q=80";}}/><div className="clan-gradient"/><div className="clan-badge"><span className="clan-badge-pill clan-badge-num">{String(index+1).padStart(2,"00")}</span>{clan.orig&&<span className="clan-badge-pill clan-badge-orig">Banansangwa</span>}{clan.royal&&<span className="clan-badge-pill clan-badge-royal">👑 Royal</span>}</div><div className="clan-static-bottom"><span className="clan-card-totem-label">Totem</span><p className="clan-card-name f-display">{clan.n}</p><p className="clan-card-totem">{clan.totem}</p></div><div className="clan-hover-panel"><span className="clan-card-totem-label">Ekika · Clan {String(index+1).padStart(2,"0")}</span><p className="clan-card-name f-display">{clan.n}</p><p className="clan-card-totem" style={{color:"rgba(250,245,232,.65)",fontSize:".78rem",lineHeight:1.5}}>Omuziro: <strong style={{color:T.gold3}}>{clan.totem}</strong></p><div className="clan-head-row"><div className="clan-head-icon">♛</div><div><span className="clan-head-label">Clan Head</span><p className="clan-head-name">{clan.head}</p></div></div></div></div>);}
function ClansPage({setPage}){const[query,setQuery]=useState("");const[filter,setFilter]=useState("All");const filtered=useMemo(()=>{let list=CLANS;if(filter==="Original 5")list=list.filter(c=>c.orig);if(filter==="Royal")list=list.filter(c=>c.royal);if(filter==="Other")list=list.filter(c=>!c.orig&&!c.royal);if(query.trim()){const q=query.toLowerCase();list=list.filter(c=>c.n.toLowerCase().includes(q)||c.totem.toLowerCase().includes(q)||c.head.toLowerCase().includes(q));}return list;},[query,filter]);const FILTERS=["All","Original 5","Royal","Other"];return(<div className="page-enter"><PageHero img={IMG.clans} label="Ebika by'Obuganda" title="The 52 Clans of" titleAccent="Buganda"/><Ticker/><div className="clans-section"><div className="clans-header"><FU><p className="s-label">About the Clan System</p><h2 className="s-title f-display">Identity Through <em>Blood & Totem</em></h2><p className="clans-intro-text">Every Muganda must belong to one of Buganda's clans (<em>Ebika</em>). Membership is patrilineal — passed from father to child. Each clan is identified by a primary totem (<strong>Omuziro</strong>) and secondary totem (<strong>Akabbiro</strong>).</p></FU><FU delay={0.1}><div className="clan-filter-bar"><div className="clan-search-wrap"><span className="clan-search-icon">⌕</span><input className="clan-search" placeholder="Search by clan, totem, or head…" value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="clan-filter-pills">{FILTERS.map(f=><button key={f} className={`clan-filter-pill${filter===f?" active":""}`} onClick={()=>setFilter(f)}>{f}</button>)}</div></div></FU></div><FU delay={0.15}><div className="clans-grid-pro">{filtered.map((clan,i)=><ClanCardPro key={clan.n} clan={clan} index={CLANS.indexOf(clan)} featured={i<2&&filter==="All"&&!query}/>)}</div>{filtered.length===0&&(<div style={{textAlign:"center",padding:"60px 20px",color:T.muted}}><p style={{fontSize:"2rem",marginBottom:12}}>🔍</p><p className="f-display" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",color:T.ink,marginBottom:6}}>No clans found</p></div>)}<div className="clan-count-bar"><p className="clan-count">Showing <strong style={{color:T.gold}}>{filtered.length}</strong> of {CLANS.length} clans</p><div className="clan-legend"><div className="clan-legend-item"><div className="clan-legend-dot" style={{background:T.gold}}/><span>Banansangwa</span></div><div className="clan-legend-item"><div className="clan-legend-dot" style={{background:"#7A1515"}}/><span>Royal</span></div></div></div></FU></div><div style={{background:T.bg2,borderTop:`1px solid ${T.lineSoft}`,padding:"48px 48px"}}><FU><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>{[{icon:"🪶",title:"Patrilineal Heritage",body:"Clan membership passes exclusively through the father."},{icon:"🚫",title:"Clan Exogamy",body:"Marriage between members of the same clan is strictly forbidden."},{icon:"🐾",title:"The Sacred Totem",body:"Members never eat, hunt, or harm their clan's totem."}].map(({icon,title,body})=>(<div key={title} style={{padding:"32px 36px",borderRight:`1px solid ${T.lineSoft}`,background:"#fff"}}><div style={{fontSize:"1.6rem",marginBottom:12}}>{icon}</div><p className="f-display" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:T.ink,marginBottom:8}}>{title}</p><p style={{fontSize:".8rem",color:T.muted,lineHeight:1.85}}>{body}</p></div>))}</div></FU></div><PageFooter setPage={setPage}/></div>);}

// ENTERTAINMENT
function EntertainmentPage({setPage}){return(<div className="page-enter"><PageHero img={IMG.music} label="Live Performances" title="A Night of" titleAccent="Pure Magic"/><Ticker/><div style={{background:T.bg,padding:"52px 48px"}}><FU><p className="s-label">The Lineup</p><h2 className="s-title f-display">Artists & <em>Performers</em></h2><p className="s-body" style={{marginBottom:28}}>Uganda's finest artists and cultural performers take the Lubiri stage.</p></FU><div className="event-grid">{ARTISTS.map((a,i)=><FU key={a.title} delay={i*.06}><EventCard {...a}/></FU>)}</div></div><PageFooter setPage={setPage}/></div>);}

// EVENTS PAGE
function EventVideoPlaceholder({bg,title,label="Video Placeholder"}){return(<div className="ev-video-wrap">{bg&&<img className="ev-video-bg" src={bg} alt="" loading="lazy"/>}<span className="ev-replace-badge">Replace with Video</span><div className="ev-video-play-btn"><span className="ev-video-play-icon">▶</span></div><p className="ev-video-label">{label}</p>{title&&<p className="ev-video-title">{title}</p>}</div>);}
function EvBlock({ev,index}){return(<FU delay={index*.04}><div className="ev-block"><div className={`ev-row${ev.flip?" flip":""}`}><div className="ev-media">{ev.mediaType==="video"?<EventVideoPlaceholder bg={ev.videoBg} title={ev.videoTitle}/>:<img className="ev-media-img" src={ev.img} alt={ev.title} loading="lazy"/>}</div><div className="ev-text"><div className="ev-time-chip"><div className="ev-time-line"/><span className="ev-time-val">{ev.time}</span><span className="ev-time-phase">Dec 31</span></div><h2 className="ev-title f-display">{ev.title} <em>{ev.titleAccent}</em></h2><p className="ev-subtitle">{ev.subtitle}</p><p className="ev-desc">{ev.desc}</p>{ev.facts&&<div className="ev-facts">{ev.facts.map((f,i)=><div key={i} className="ev-fact"><span className="ev-fact-icon">{f.icon}</span><span>{f.text}</span></div>)}</div>}{ev.highlights&&<div className="ev-highlights">{ev.highlights.map((h,i)=><div key={i} className="ev-highlight-item"><div className="ev-highlight-dot"/><span>{h}</span></div>)}</div>}</div></div></div></FU>);}
function EventsPage({setPage}){const[activePhase,setActivePhase]=useState("morning");const scrollToPhase=id=>{setActivePhase(id);const el=document.getElementById("ev-"+id);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});};useEffect(()=>{const handler=()=>{for(const p of EVENTS_DATA){const el=document.getElementById("ev-"+p.id);if(el){const rect=el.getBoundingClientRect();if(rect.top<=140&&rect.bottom>=140){setActivePhase(p.id);break;}}}};window.addEventListener("scroll",handler,{passive:true});return()=>window.removeEventListener("scroll",handler);},[]);return(<div className="page-enter"><PageHero img={IMG.crowd} label="31st December · Lubiri Palace" title="A Day at" titleAccent="Enkuuka"/><Ticker/><div style={{background:T.bg2,padding:"48px 48px",borderBottom:`1px solid ${T.line}`}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}><FU><p className="s-label">The Full Day Chronicle</p><h2 className="s-title f-display">From Helicopter to <em>Fireworks</em></h2><p className="s-body">Enkuuka y'Omwaka is a full ceremonial day — from the royal helicopter's dawn arrival to the sacred bonfire and fireworks that light Kampala's sky.</p></FU><FU delay={0.1}><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:3}}>{[IMG.heli,IMG.drums,IMG.concert,IMG.fireworks].map((src,i)=><div key={i} style={{height:150,overflow:"hidden"}}><img src={src} alt="" loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.55)",display:"block"}}/></div>)}</div></FU></div></div><div className="ev-phase-nav">{EVENTS_DATA.map(p=><button key={p.id} className={`ev-phase-btn${activePhase===p.id?" active":""}`} onClick={()=>scrollToPhase(p.id)}><span className="ev-phase-icon">{p.phaseIcon}</span>{p.phase}<span style={{fontSize:".55rem",color:T.muted,fontWeight:400,letterSpacing:1,marginLeft:2}}>{p.phaseTime}</span></button>)}<button className={`ev-phase-btn${activePhase==="midnight"?" active":""}`} onClick={()=>scrollToPhase("midnight")}><span className="ev-phase-icon">🎆</span>Midnight<span style={{fontSize:".55rem",color:T.muted,fontWeight:400,letterSpacing:1,marginLeft:2}}>12:00 AM</span></button></div>{EVENTS_DATA.map(phase=><section key={phase.id} id={"ev-"+phase.id}><div className="ev-phase-divider"><div className="ev-phase-divider-line"/><span className="ev-phase-divider-label">{phase.phaseIcon} {phase.phase}</span><div className="ev-phase-divider-line"/><span className="ev-phase-divider-time">{phase.phaseTime}</span></div>{phase.events.map((ev,ei)=><EvBlock key={ev.time} ev={ev} index={ei}/>)}</section>)}<section id="ev-midnight"><div className="ev-phase-divider"><div className="ev-phase-divider-line"/><span className="ev-phase-divider-label">🎆 Midnight Climax</span><div className="ev-phase-divider-line"/><span className="ev-phase-divider-time">11:58 PM – 12:15 AM</span></div><div className="ev-midnight"><img className="ev-midnight-bg" src={IMG.fireworks} alt="Fireworks" loading="lazy"/><div className="ev-midnight-overlay"/><div className="ev-midnight-content"><FU><p style={{fontSize:".65rem",letterSpacing:5,textTransform:"uppercase",color:T.gold3,fontWeight:700,marginBottom:16}}>12:00 AM · 31st December → 1st January</p><h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.8rem,7vw,5.5rem)",fontWeight:700,color:"#FAF5E8",lineHeight:.9,marginBottom:12}}>Enkuuka<br/><em style={{color:T.gold3,fontStyle:"italic"}}>Fireworks</em></h2><p style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:4,color:"rgba(250,245,232,.4)",fontSize:".85rem",marginBottom:24}}>OMULIRO GW'OMWAKA GULABYE OMULEMBE</p><p style={{fontSize:".9rem",color:"rgba(250,245,232,.6)",lineHeight:1.9,maxWidth:540,margin:"0 auto 36px"}}>At the stroke of midnight, the night sky above Lubiri Palace explodes in gold, red and white. 50,000 Baganda raise their voices together. The fireworks last twelve full minutes. Happy New Year, Uganda.</p><div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}><button className="btn-gold" onClick={()=>setPage("Invitation")}>Secure Your Place →</button><button className="btn-outline" style={{color:"rgba(250,245,232,.7)",borderColor:"rgba(250,245,232,.3)"}} onClick={()=>setPage("Programme")}>Full Programme</button></div></FU></div></div><div style={{background:T.ink,padding:"4px 0"}}><div className="ev-video-grid">{[{bg:IMG.fireworks,label:"Replace · Fireworks Show"},{bg:IMG.crowd,label:"Replace · Crowd Reaction"},{bg:IMG.music,label:"Replace · Stage Final Moment"}].map((v,i)=><div key={i} className="ev-video-mini"><img className="ev-video-mini-bg" src={v.bg} alt="" loading="lazy"/><div className="ev-video-mini-play">▶</div><p className="ev-video-mini-label">{v.label}</p></div>)}</div></div></section><div style={{background:T.bg2,padding:"52px 48px",borderTop:`1px solid ${T.line}`,textAlign:"center"}}><FU><p className="s-label" style={{justifyContent:"center"}}>Be Part of It</p><h2 className="s-title f-display" style={{textAlign:"center"}}>Don't Miss <em>Enkuuka 2025</em></h2><p style={{color:T.muted,fontSize:".88rem",lineHeight:1.85,maxWidth:540,margin:"0 auto 28px"}}>From the helicopter arrival at dawn to the fireworks at midnight.</p><div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}><button className="btn-gold" onClick={()=>setPage("Invitation")}>Get Your Invitation →</button><button className="btn-outline" onClick={()=>setPage("Programme")}>View Full Programme</button></div></FU></div><PageFooter setPage={setPage}/></div>);}

// BUSINESS
function BusinessPage({setPage}){const[activeTab,setActiveTab]=useState("Small Businesses");return(<div className="page-enter"><PageHero img={IMG.market} label="Trade Fair & Opportunities" title="Business at" titleAccent="Enkuuka"/><Ticker/><div style={{background:T.bg,padding:"52px 48px"}}><FU><p className="s-label">Why Exhibit?</p><h2 className="s-title f-display">Uganda's Premier <em>End-of-Year Platform</em></h2><p className="s-body" style={{marginBottom:28}}>Enkuuka y'Omwaka connects 50,000 consumers with businesses of every scale.</p></FU><FU delay={0.1}><div className="tab-bar">{BIZ_TABS.map(t=><button key={t} className={`tab-btn${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)}>{t}</button>)}</div><div className="biz-grid">{(BIZ_DATA[activeTab]||[]).map(item=><div key={item.title} className="biz-card"><img src={item.img} alt={item.title} loading="lazy"/><div className="biz-body"><span className="biz-tag">{item.tag}</span><p className="biz-title f-display">{item.title}</p><p className="biz-desc">{item.desc}</p><span className="biz-cta">Register Now →</span></div></div>)}</div></FU></div><PageFooter setPage={setPage}/></div>);}

// PROGRAMME
function ProgrammePage({setPage}){return(<div className="page-enter"><PageHero img={IMG.crowd} label="31st December" title="The Day's" titleAccent="Programme"/><Ticker/><div style={{background:T.bg}}><div className="timeline-grid"><div style={{padding:"48px 48px"}}><FU><p className="s-label">Full Schedule</p><h2 className="s-title f-display">From <em>Dawn to Midnight</em></h2><p className="s-body" style={{marginBottom:36}}>Every hour at Enkuuka is crafted for celebration, culture and community.</p></FU>{PROGRAMME.map((p,i)=><FU key={p.time} delay={i*.05}><div className="tl-item"><div className="tl-time">{p.time}</div><div className="tl-body"><div className="tl-dot"/><p className="tl-title f-display">{p.title}</p><p className="tl-desc">{p.desc}</p></div></div></FU>)}</div><div style={{position:"relative",overflow:"hidden",minHeight:500}}><img src={IMG.fireworks} alt="Fireworks" loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.38)",display:"block"}}/><div style={{position:"absolute",inset:0,background:`linear-gradient(to top, ${T.bg}, transparent 50%)`,display:"flex",alignItems:"flex-end",padding:"36px 40px"}}><div><p className="s-label">Midnight Fireworks</p><h2 className="s-title f-display">Fireworks over <em>Lubiri Palace</em></h2></div></div></div></div></div><PageFooter setPage={setPage}/></div>);}

// GALLERY
function GalleryPage({setPage}){const[lightbox,setLightbox]=useState(null);return(<div className="page-enter"><PageHero img={IMG.crowd} label="Visual Memories" title="The" titleAccent="Gallery"/><Ticker/><div style={{background:T.bg,padding:"48px 48px 24px"}}><FU><p className="s-label">Enkuuka Through the Lens</p><h2 className="s-title f-display">Royal Culture, <em>Captured</em></h2><p className="s-body" style={{marginBottom:32}}>Click any image to explore in full.</p></FU><FU delay={0.1}><div className="gal-grid">{GALLERY_ITEMS.map(g=><div key={g.title} className="gal-item" onClick={()=>setLightbox(g)}><img src={g.src} alt={g.title} loading="lazy"/><div className="gal-item-overlay"><p className="gal-item-title f-display">{g.title}</p><p className="gal-item-sub">{g.sub}</p></div></div>)}</div></FU></div><PageFooter setPage={setPage}/>{lightbox&&<div className="lightbox" onClick={()=>setLightbox(null)}><img src={lightbox.src} alt={lightbox.title}/><p className="f-display" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:T.ink}}>{lightbox.title}</p><p style={{color:T.gold,fontSize:".6rem",letterSpacing:3,textTransform:"uppercase"}}>{lightbox.sub}</p><p style={{color:T.muted,fontSize:".72rem",marginTop:4}}>Click anywhere to close</p></div>}</div>);}

// ACCOMMODATION
function AccommodationPage({setPage}){return(<div className="page-enter"><PageHero img={IMG.hotel} label="Stay & Experience" title="Hospitality at" titleAccent="Enkuuka"/><Ticker/><div style={{background:T.bg,padding:"48px 48px 24px"}}><FU><p className="s-label">Where to Stay</p><h2 className="s-title f-display">Kampala's Finest <em>Hotels</em></h2><p className="s-body" style={{marginBottom:28}}>Book early — Kampala fills up fast on December 31st.</p></FU><FU delay={0.1}><div className="hotel-grid">{HOTELS.map(h=><div key={h.name} className="hotel-card"><img src={h.img} alt={h.name} loading="lazy"/><div className="hotel-body"><p className="hotel-stars">{h.stars}</p><p className="hotel-name f-display">{h.name}</p><p className="hotel-loc">📍 {h.loc}</p><p className="hotel-price">From {h.price}</p><button className="hotel-book">Book Now</button></div></div>)}</div></FU></div><PageFooter setPage={setPage}/></div>);}

// INVITATION
function InvitationPage({setPage}){const[name,setName]=useState("");const[preview,setPreview]=useState(false);return(<div className="page-enter"><div style={{background:T.bg,minHeight:"100vh",paddingTop:60}}><div style={{maxWidth:640,margin:"0 auto",padding:"64px 24px"}}><FU style={{textAlign:"center"}}><p className="s-label" style={{justifyContent:"center"}}>Digital E-Invitation</p><h1 className="s-title f-display" style={{textAlign:"center",marginBottom:8}}>Your <em>Royal Invitation</em></h1><p style={{color:T.muted,fontSize:".85rem",marginBottom:32}}>Personalise and share your digital invitation</p></FU>{!preview?<FU delay={0.1}><div style={{background:T.bg2,border:`1px solid ${T.line}`,padding:"32px"}}><p style={{color:T.muted,fontSize:".8rem",marginBottom:12}}>Enter your name to personalise</p><input className="contact-input" placeholder="Your full name…" value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setPreview(true)}/><button className="btn-gold" style={{width:"100%",marginTop:4}} onClick={()=>setPreview(true)}>Preview My Invitation →</button></div></FU>:<FU delay={0.05}><div className="inv-card"><div className="inv-top"><p style={{fontSize:".62rem",letterSpacing:4,textTransform:"uppercase",color:T.muted,marginBottom:7}}>The Buganda Kingdom · Lubiri Palace</p><h2 className="f-display" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.2rem",color:T.ink,fontWeight:700,lineHeight:.95}}>Enkuuka<br/><em style={{color:T.gold}}>y'Omwaka</em></h2></div><div className="inv-body"><p style={{fontSize:".65rem",color:T.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:10}}>Cordially Invites</p><p className="f-display" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.7rem",color:T.ink,fontWeight:700,marginBottom:16,lineHeight:1}}>{name.trim()||"Honoured Guest"}</p><div className="inv-divider"/><p style={{fontSize:".82rem",color:T.muted,lineHeight:1.85,marginBottom:16}}>to celebrate the New Year with the Baganda people</p><div style={{background:T.goldBg,border:`1px solid ${T.line}`,padding:"14px 20px",marginBottom:14}}><p className="f-block" style={{fontSize:".85rem",color:T.ink}}>31st December 2025</p><p style={{color:T.muted,fontSize:".75rem",marginTop:3}}>📍 Lubiri Palace, Mengo, Kampala</p><p style={{color:T.gold,fontSize:".72rem",marginTop:3,fontWeight:600}}>8:00 AM – Past Midnight</p></div><p className="f-display" style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".85rem",color:T.muted}}>Omuliro gw'omwaka gulabye omulembe!</p></div></div><div style={{display:"flex",gap:12,justifyContent:"center",marginTop:18,flexWrap:"wrap"}}><button className="btn-gold">Share Invitation 🔗</button><button className="btn-outline" onClick={()=>setPreview(false)} style={{padding:"12px 22px"}}>Edit Name</button></div></FU>}</div></div><PageFooter setPage={setPage}/></div>);}

// CONTACT
function ContactPage({setPage}){const[form,setForm]=useState({name:"",email:"",subject:"",msg:""});const[sent,setSent]=useState(false);const f=k=>e=>setForm({...form,[k]:e.target.value});return(<div className="page-enter"><PageHero img={IMG.palace} label="Reach Out" title="Contact" titleAccent="Us"/><Ticker/><div style={{background:T.bg}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}><div style={{padding:"52px 48px"}}><FU><p className="s-label">Get in Touch</p><h2 className="s-title f-display">We'd Love to <em>Hear from You</em></h2><p className="s-body" style={{marginBottom:32}}>For vendor inquiries, sponsorships, media partnerships or general information.</p><div style={{display:"flex",flexDirection:"column",gap:18,marginBottom:36}}>{[["📍","Location","Lubiri Palace, Mengo, Kampala"],["📞","Phone","+256 414 000 000"],["✉","Email","info@enkuuka.ug"],["🕒","Hours","Mon–Fri, 9:00 AM – 5:00 PM EAT"]].map(([icon,label,val])=><div key={label} style={{display:"flex",gap:14,alignItems:"flex-start"}}><span style={{fontSize:".95rem",marginTop:2}}>{icon}</span><div><p style={{fontSize:".6rem",letterSpacing:2,textTransform:"uppercase",color:T.gold,marginBottom:1}}>{label}</p><p style={{fontSize:".85rem",color:T.muted}}>{val}</p></div></div>)}</div></FU></div><div style={{padding:"52px 48px",background:T.bg2,borderLeft:`1px solid ${T.lineSoft}`}}><FU delay={0.1}>{!sent?<div><p className="f-display" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:T.ink,marginBottom:22}}>Send a Message</p><input className="contact-input" placeholder="Your name" value={form.name} onChange={f("name")}/><input className="contact-input" placeholder="Email address" value={form.email} onChange={f("email")}/><input className="contact-input" placeholder="Subject" value={form.subject} onChange={f("subject")}/><textarea className="contact-input" rows={5} placeholder="Your message…" value={form.msg} onChange={f("msg")}/><button className="btn-gold" style={{width:"100%"}} onClick={()=>setSent(true)}>Send Message →</button></div>:<div style={{textAlign:"center",padding:"48px 20px"}}><p className="f-display" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:T.gold,marginBottom:8}}>Message Sent!</p><p style={{color:T.muted,fontSize:".85rem",marginBottom:22}}>We'll get back to you within 24 hours.</p><button className="btn-outline" onClick={()=>{setSent(false);setForm({name:"",email:"",subject:"",msg:""});}}>Send Another</button></div>}</FU></div></div></div><PageFooter setPage={setPage}/></div>);}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_MAP={Home:HomePage,Culture:CulturePage,Clans:ClansPage,Masaza:MasazaPage,Entertainment:EntertainmentPage,Events:EventsPage,Business:BusinessPage,Programme:ProgrammePage,Gallery:GalleryPage,Accommodation:AccommodationPage,Invitation:InvitationPage,Contact:ContactPage};

export default function App(){
  const[page,setPage]=useState("Home");
  useEffect(()=>{const id="enkuuka-global-css";if(!document.getElementById(id)){const style=document.createElement("style");style.id=id;style.textContent=GLOBAL_CSS;document.head.appendChild(style);}else{document.getElementById(id).textContent=GLOBAL_CSS;}},[]);
  useEffect(()=>{window.scrollTo(0,0);},[page]);
  const PageComponent=PAGE_MAP[page]||HomePage;
  return(<div style={{minHeight:"100vh",background:T.bg}}><Nav page={page} setPage={setPage}/><main style={{paddingTop:60}}><PageComponent setPage={setPage}/></main></div>);
}