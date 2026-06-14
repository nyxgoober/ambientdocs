const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ambient Docs</title>
<meta name="theme-color" content="#060609">
<link rel="apple-touch-icon" href="https://assetcdn.patchednexus.win/icons/ambient/apple-touch-icon.png">
<link rel="icon" type="image/png" href="https://assetcdn.patchednexus.win/icons/ambient/favicon-16x16.png" sizes="16x16">
<link rel="icon" type="image/png" href="https://assetcdn.patchednexus.win/icons/ambient/android-chrome-512x512.png" sizes="512x512">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<style>
/* ===================== CSS VARIABLES ===================== */
:root {
  --primary: #ff2d55;
  --primary-dim: rgba(255,45,85,.12);
  --primary-glow: rgba(255,45,85,.25);
  --bg: #f5f5f7;
  --surface: rgba(0,0,0,.04);
  --surface-2: rgba(0,0,0,.07);
  --border: rgba(0,0,0,.09);
  --border-strong: rgba(0,0,0,.16);
  --sidebar-bg: rgba(248,248,250,.97);
  --sidebar-w: 272px;
  --text: #1a1a2e;
  --text-dim: rgba(26,26,46,.65);
  --text-muted: rgba(26,26,46,.38);
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Inter', sans-serif;
  --r: 14px;
  --r-sm: 8px;
  --card-bg: #ffffff;
  --card-border: rgba(0,0,0,.08);
  --code-bg: rgba(0,0,0,.05);
  --code-color: #6c63ff;
  --pre-bg: rgba(0,0,0,.04);
  --topbar-bg: rgba(245,245,247,.93);
}

html.dark {
  --bg: #060609;
  --surface: rgba(255,255,255,.03);
  --surface-2: rgba(255,255,255,.055);
  --border: rgba(255,255,255,.07);
  --border-strong: rgba(255,255,255,.13);
  --sidebar-bg: rgba(7,7,11,.97);
  --text: #e2e2e8;
  --text-dim: rgba(226,226,232,.55);
  --text-muted: rgba(226,226,232,.3);
  --card-bg: var(--surface);
  --card-border: var(--border);
  --code-bg: rgba(165,180,252,.1);
  --code-color: #a5b4fc;
  --pre-bg: rgba(0,0,0,.55);
  --topbar-bg: rgba(6,6,9,.93);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }

body {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--text);
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  cursor: none;
  transition: background 0.3s ease, color 0.3s ease;
}

/* ===================== CUSTOM CURSOR ===================== */
.custom-cursor {
  position: fixed;
  top: 0; left: 0;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: var(--primary-glow);
  border: 1px solid var(--primary);
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s, transform 0.1s ease-out;
  mix-blend-mode: normal;
}
html:not(.dark) .custom-cursor {
  mix-blend-mode: multiply;
}
html.dark .custom-cursor {
  mix-blend-mode: screen;
}
.custom-cursor.active {
  transform: translate(-50%, -50%) scale(0.6);
  background: var(--primary);
}
.custom-cursor.hover {
  width: 40px; height: 40px;
  background: rgba(255,45,85,.15);
  border-color: rgba(255,45,85,.5);
}
body.no-custom-cursor { cursor: auto; }
body.no-custom-cursor .custom-cursor { display: none; }
body.no-custom-cursor a,
body.no-custom-cursor button,
body.no-custom-cursor input,
body.no-custom-cursor [onclick] { cursor: auto !important; }
body:not(.no-custom-cursor) a,
body:not(.no-custom-cursor) button,
body:not(.no-custom-cursor) input,
body:not(.no-custom-cursor) [onclick] { cursor: none !important; }

/* ===================== NO ANIMATIONS ===================== */
body.no-animations *,
body.no-animations *::before,
body.no-animations *::after {
  animation-duration: 0.001ms !important;
  animation-delay: 0ms !important;
  transition-duration: 0.001ms !important;
  transition-delay: 0ms !important;
}

/* ===================== SIDEBAR ===================== */
nav {
  width: var(--sidebar-w);
  background: var(--sidebar-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-right: 1px solid var(--border);
  height: 100vh;
  position: fixed;
  left: 0; top: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: background 0.3s ease, border-color 0.3s ease;
}
.sidebar-top {
  padding: 18px 16px 14px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sidebar-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; cursor: none; }
.sidebar-brand img { width: 26px; height: 26px; border-radius: 6px; object-fit: cover; }
.brand-name { font-size: .88rem; font-weight: 800; color: var(--text); letter-spacing: -.01em; }
.brand-sub { font-size: .7rem; color: var(--text-muted); font-weight: 400; }
.nav-close-btn {
  display: none;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text-dim);
  width: 28px; height: 28px;
  align-items: center; justify-content: center;
  cursor: none; font-size: .8rem; transition: .15s;
}
.nav-close-btn:hover { color: var(--text); border-color: var(--border-strong); }
.mode-wrap { padding: 10px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
.mode-tabs {
  display: flex;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 3px; gap: 2px;
}
.mode-btn {
  flex: 1; padding: 7px;
  font-family: var(--sans);
  font-size: .7rem; font-weight: 700; letter-spacing: .05em;
  text-transform: uppercase;
  cursor: none; border-radius: 6px;
  color: var(--text-muted);
  transition: .2s; text-align: center; user-select: none;
  background: none; border: none;
}
.mode-btn.active { background: var(--primary); color: #fff; box-shadow: 0 2px 14px var(--primary-glow); }
.scroll-nav { flex: 1; overflow-y: auto; padding: 8px 10px 8px; }
.scroll-nav::-webkit-scrollbar { width: 3px; }
.scroll-nav::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 10px; }
.nav-label {
  font-size: .62rem; font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase; color: var(--text-muted);
  padding: 12px 6px 5px;
}
nav ul { list-style: none; }
nav li { margin: 1px 0; }
nav a {
  text-decoration: none; color: var(--text-dim); font-size: .8rem;
  display: flex; align-items: center; gap: 7px;
  padding: 6px 8px; border-radius: var(--r-sm); transition: .15s;
  cursor: none;
}
nav a:hover { color: var(--text); background: var(--surface-2); }
.nav-idx { font-size: .68rem; color: var(--text-muted); font-family: var(--mono); flex-shrink: 0; }

/* sidebar bottom: settings button */
.sidebar-bottom {
  flex-shrink: 0;
  padding: 10px 12px;
  border-top: 1px solid var(--border);
}
.settings-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  background: none;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  color: var(--text-dim);
  font-family: var(--sans);
  font-size: .8rem;
  font-weight: 500;
  cursor: none;
  transition: .15s;
  text-align: left;
}
.settings-btn:hover {
  background: var(--surface-2);
  border-color: var(--border);
  color: var(--text);
}
.settings-btn svg {
  flex-shrink: 0;
  transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}
.settings-btn.spinning svg {
  animation: cogSpin 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes cogSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(180deg); }
}

/* ===================== SETTINGS MODAL ===================== */
.settings-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s;
  perspective: 1000px;
  z-index: 200;
}
.settings-overlay.active { opacity: 1; visibility: visible; }

.settings-card {
  background: var(--card-bg);
  width: 400px;
  padding: 36px 40px 40px;
  border-radius: 24px;
  border: 1px solid var(--card-border);
  box-shadow: -20px 20px 60px rgba(0,0,0,0.25);
  color: var(--text);
  transform-origin: right center;
  transform: rotateY(50deg) scale(0.7) translateX(-100px);
  filter: blur(25px);
  opacity: 0;
  transition:
    transform 0.7s cubic-bezier(0.19, 1, 0.22, 1),
    filter 0.25s ease-out,
    opacity 0.6s ease-out,
    background 0.3s ease,
    border-color 0.3s ease;
}
html.dark .settings-card {
  box-shadow: -20px 20px 60px rgba(0,0,0,0.7);
}
.settings-overlay.active .settings-card {
  transform: rotateY(0deg) scale(1) translateX(0);
  filter: blur(0);
  opacity: 1;
}
.settings-overlay.closing .settings-card {
  transform: rotateY(20deg) scale(0.85) translateX(-40px);
  filter: blur(10px);
  opacity: 0;
}

.settings-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.settings-header h2 {
  margin: 0;
  font-family: var(--sans);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: var(--text);
}
.settings-header svg { flex-shrink: 0; }

.settings-divider {
  height: 1px;
  background: var(--border);
  margin: 0 0 8px;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.toggle-row:last-child { border-bottom: none; }

.toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--sans);
  font-size: 0.93rem;
  font-weight: 500;
  color: var(--text-dim);
}

.icon-slot {
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  position: relative; flex-shrink: 0;
}

/* dark mode icon swap — light mode default: sun shows, moon hidden */
.dm-icon {
  position: absolute;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
}
.dm-icon.sun  { transform: rotate(0deg) scale(1); opacity: 1; }
.dm-icon.moon { transform: rotate(-90deg) scale(0.3); opacity: 0; }
.dm-active .dm-icon.sun  { transform: rotate(90deg) scale(0.3); opacity: 0; }
.dm-active .dm-icon.moon { transform: rotate(0deg) scale(1); opacity: 1; }

/* sparkle */
.sparkle-svg { transition: transform 0.4s ease, opacity 0.3s ease; }
.sparkle-off .sparkle-svg { opacity: 0.25; transform: scale(0.75); }

/* cursor icon swap */
.cur-icon {
  position: absolute;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.cur-icon.circle  { transform: scale(1); opacity: 1; }
.cur-icon.pointer { transform: scale(0.3) rotate(30deg); opacity: 0; }
.cur-off .cur-icon.circle  { transform: scale(0.3) rotate(-30deg); opacity: 0; }
.cur-off .cur-icon.pointer { transform: scale(1) rotate(0deg); opacity: 1; }

/* Toggle switch */
.switch {
  position: relative; width: 46px; height: 26px;
  flex-shrink: 0; cursor: none;
}
.switch input { display: none; }
.track {
  position: absolute; inset: 0;
  background: var(--surface-2);
  border-radius: 99px; transition: background 0.3s;
  border: 1px solid var(--border);
}
html:not(.dark) .track { background: rgba(0,0,0,.1); border-color: rgba(0,0,0,.15); }
.thumb {
  position: absolute;
  top: 3px; left: 3px;
  width: 20px; height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
html:not(.dark) .thumb { background: #fff; box-shadow: 0 1px 6px rgba(0,0,0,0.2); }
.switch input:checked ~ .track { background: #6c5ce7; border-color: #6c5ce7; }
.switch input:checked ~ .thumb { transform: translateX(20px); }

/* ===================== TOPBAR ===================== */
.topbar {
  display: none; align-items: center; gap: 10px;
  position: sticky; top: 0; z-index: 98;
  background: var(--topbar-bg);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 11px 14px;
  transition: background 0.3s ease;
}
.menu-btn {
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-sm);
  color: var(--text); width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center; cursor: none; transition: .15s;
}
.menu-btn:hover { border-color: var(--primary); color: var(--primary); }
.menu-btn svg { width: 15px; height: 15px; }
.topbar-logo { display: flex; align-items: center; gap: 7px; }
.topbar-logo img { width: 20px; height: 20px; border-radius: 4px; }
.topbar-logo b { font-size: .82rem; font-weight: 800; color: var(--text); }
.topbar-logo span { font-size: .75rem; color: var(--text-dim); }
.nav-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,.72); z-index: 99;
  backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
}
.nav-overlay.open { display: block; }

/* ===================== MAIN ===================== */
main {
  margin-left: var(--sidebar-w);
  width: calc(100% - var(--sidebar-w));
  display: flex; flex-direction: column; align-items: center;
}
.page { display: none; width: 100%; animation: fadeIn .22s ease; }
.page.active { display: block; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }

/* ===================== PAGE HERO ===================== */
.page-hero { padding: 52px 6% 44px; border-bottom: 1px solid var(--border); width: 100%; }
.page-hero-inner { max-width: 680px; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .68rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
  color: var(--primary); background: var(--primary-dim);
  border: 1px solid rgba(255,45,85,.2); border-radius: 100px;
  padding: 4px 12px; margin-bottom: 18px;
}
.page-hero h1 {
  font-size: clamp(1.9rem,3.5vw,2.8rem); font-weight: 800; color: var(--text);
  letter-spacing: -.03em; line-height: 1.1; margin-bottom: 12px;
}
.page-hero p { font-size: .92rem; color: var(--text-dim); line-height: 1.7; max-width: 500px; }
.hero-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 26px; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--primary); color: #fff; text-decoration: none;
  padding: 10px 20px; border-radius: var(--r-sm);
  font-size: .84rem; font-weight: 700; transition: .2s;
  box-shadow: 0 4px 20px var(--primary-glow); cursor: none;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 28px var(--primary-glow); }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--surface); color: var(--text); text-decoration: none;
  padding: 10px 20px; border-radius: var(--r-sm);
  font-size: .84rem; font-weight: 600;
  border: 1px solid var(--border-strong); transition: .2s; cursor: none;
}
.btn-ghost:hover { background: var(--surface-2); border-color: var(--border-strong); }

/* ===================== SECTIONS ===================== */
.section { padding: 52px 6%; }
.section-header { margin-bottom: 36px; }
.section-header h2 {
  font-size: clamp(1.4rem,2.5vw,2rem); font-weight: 800; color: var(--text);
  letter-spacing: -.025em; line-height: 1.15;
}

/* ===================== BENTO GRID ===================== */
.bento-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.bento-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--r); overflow: hidden;
  display: flex; flex-direction: column; transition: .2s;
}
.bento-card:hover { border-color: var(--border-strong); background: var(--surface-2); }
.bento-lg { grid-column: 1/2; grid-row: 1/2; flex-direction: row; align-items: stretch; }
.bento-lg .bento-visual { flex: 0 0 52%; overflow: hidden; min-height: 230px; }
.bento-lg .bento-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bento-lg .bento-info { flex: 1; padding: 24px 20px; display: flex; flex-direction: column; justify-content: flex-end; }
.bento-sm-col { grid-column: 2/3; grid-row: 1/2; display: flex; flex-direction: column; gap: 14px; }
.bento-card.with-img { flex-direction: row; align-items: stretch; }
.bento-card.with-img .card-thumb { width: 110px; flex-shrink: 0; object-fit: cover; display: block; }
.bento-card.with-img .bento-info { padding: 16px; display: flex; flex-direction: column; justify-content: center; }
.bento-bottom { grid-column: 1/2; grid-row: 2/3; display: flex; gap: 14px; }
.bento-md { flex: 1; }
.bento-md .bento-visual { height: 155px; overflow: hidden; }
.bento-md .bento-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bento-md .bento-info { padding: 14px 16px; }
.bento-lg-right { grid-column: 2/3; grid-row: 2/3; flex-direction: row-reverse; align-items: stretch; }
.bento-lg-right .bento-visual { flex: 0 0 52%; overflow: hidden; min-height: 230px; }
.bento-lg-right .bento-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bento-lg-right .bento-info { flex: 1; padding: 24px 20px; display: flex; flex-direction: column; justify-content: flex-end; }
.bento-icon { font-size: 1.1rem; color: var(--primary); margin-bottom: 8px; }
.bento-info h3 { font-size: .93rem; font-weight: 700; color: var(--text); margin-bottom: 5px; letter-spacing: -.01em; }
.bento-info p { font-size: .81rem; color: var(--text-dim); line-height: 1.55; }
.bento-info.compact h3 { font-size: .86rem; }
.bento-info.compact p { font-size: .77rem; }

/* ===================== MODULES ===================== */
.modules-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
.module-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--r); overflow: hidden; transition: .2s;
}
.module-card:hover { border-color: var(--border-strong); background: var(--surface-2); }
.module-card img { width: 100%; aspect-ratio: 9/16; object-fit: cover; display: block; }
.module-card h3 {
  font-size: .79rem; font-weight: 600; color: var(--text);
  padding: 11px 13px; border-top: 1px solid var(--border);
}

/* ===================== DOC SECTIONS ===================== */
.doc-section { padding: 0 6% 52px; }
.doc-inner { max-width: 820px; margin: 0 auto; }
h2.doc-h {
  font-size: 1.25rem; font-weight: 700; color: var(--text); letter-spacing: -.02em;
  margin: 44px 0 16px; display: flex; align-items: center; gap: 10px;
}
h2.doc-h::before {
  content: ''; display: block; width: 3px; height: 1em;
  background: var(--primary); border-radius: 2px; flex-shrink: 0;
}
h3.api-fn { font-size: .82rem; font-weight: 600; color: var(--primary); font-family: var(--mono); margin: 18px 0 7px; }
p.doc-p { font-size: .87rem; color: var(--text-dim); line-height: 1.7; margin-bottom: 10px; }
ul.doc-ul { list-style: none; margin-bottom: 12px; }
ul.doc-ul li { font-size: .85rem; color: var(--text-dim); padding: 4px 0 4px 16px; position: relative; line-height: 1.6; }
ul.doc-ul li::before { content: '—'; position: absolute; left: 0; color: var(--primary); font-size: .7rem; top: 6px; }
.path-box {
  background: rgba(0,200,65,.06); border: 1px solid rgba(0,200,65,.15);
  border-radius: var(--r-sm); padding: 13px 16px;
  font-family: var(--mono); font-size: .83rem; color: #16a34a; margin: 12px 0; word-break: break-all;
}
html.dark .path-box {
  background: rgba(0,255,65,.04); border-color: rgba(0,255,65,.12); color: #4dff91;
}
.api-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--r); padding: 18px 20px; margin: 12px 0; transition: .2s;
}
.api-card:hover { border-color: var(--border-strong); }
pre {
  background: var(--pre-bg); border: 1px solid var(--border);
  border-radius: var(--r-sm); padding: 14px; overflow-x: auto; margin: 9px 0;
}
pre code { font-family: var(--mono); font-size: .78rem; color: var(--text-dim); }
html.dark pre code { color: #d4d4d8; }
.ic {
  font-family: var(--mono); font-size: .78rem; color: var(--code-color);
  background: var(--code-bg); padding: 2px 6px; border-radius: 4px;
}
.badge {
  display: inline-flex; align-items: center; font-size: .63rem; font-weight: 700;
  letter-spacing: .05em; text-transform: uppercase;
  padding: 2px 8px; border-radius: 100px; vertical-align: middle; margin-left: 6px;
}
.badge-new { background: var(--primary-dim); color: var(--primary); border: 1px solid rgba(255,45,85,.2); }
.badge-removed { background: rgba(251,191,36,.1); color: #b45309; border: 1px solid rgba(251,191,36,.3); }
html.dark .badge-removed { color: #fbbf24; }
.changelog-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--r); padding: 22px; margin: 14px 0; }
.cl-title { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 2px; }
.cl-sub { font-size: .76rem; color: var(--text-muted); font-family: var(--mono); margin-bottom: 16px; }
.cl-group { font-size: .68rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--text-muted); margin: 14px 0 6px; }
.table-wrap {
  border: 1px solid var(--border); border-radius: var(--r);
  overflow-x: auto; margin: 14px 0; background: var(--card-bg);
}
table { width: 100%; border-collapse: collapse; min-width: 400px; }
th {
  padding: 11px 14px; font-size: .67rem; font-weight: 700; letter-spacing: .06em;
  text-transform: uppercase; color: var(--text-muted);
  background: var(--surface); text-align: left;
}
td {
  padding: 12px 14px; font-size: .84rem; border-top: 1px solid var(--border);
  color: var(--text-dim); vertical-align: top;
}
td code {
  font-family: var(--mono); font-size: .76rem;
  color: var(--code-color); background: var(--code-bg); padding: 2px 6px; border-radius: 4px;
}

/* ===================== CHANGELOG SHOW MORE ===================== */
.cl-show-more-btn {
  margin: 4px 0 0;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--r-sm);
  color: var(--text-dim);
  font-family: var(--sans);
  font-size: .78rem;
  font-weight: 600;
  padding: 9px 16px;
  cursor: none;
  width: 100%;
  transition: background .15s, border-color .15s, color .15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.cl-show-more-btn:hover {
  background: var(--surface-2);
  border-color: var(--border-strong);
  color: var(--text);
}
.cl-show-more-btn .cl-chevron {
  transition: transform .25s ease;
}

footer {
  width: 100%; padding: 28px 6%; border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;
}
.footer-note, .footer-recruit { font-size: .78rem; color: var(--text-muted); }
.footer-recruit b { color: var(--text-dim); }

/* ===================== MOBILE ===================== */
@media(max-width:767px){
  body { flex-direction: column; }
  nav { transform: translateX(-100%); transition: transform .3s cubic-bezier(.4,0,.2,1); width: min(82vw,290px); }
  nav.open { transform: translateX(0); }
  .nav-close-btn { display: flex; }
  .topbar { display: flex; }
  main { margin-left: 0; width: 100%; }
  .page-hero { padding: 28px 16px 32px; }
  .page-hero h1 { font-size: 1.75rem; }
  .hero-btns { flex-direction: column; }
  .btn-primary, .btn-ghost { justify-content: center; }
  .section { padding: 36px 16px; }
  .doc-section { padding: 0 16px 40px; }
  .bento-grid { grid-template-columns: 1fr; gap: 10px; }
  .bento-lg { grid-column: 1; grid-row: auto; flex-direction: column; }
  .bento-lg .bento-visual { flex: none; width: 100%; min-height: 180px; }
  .bento-sm-col { grid-column: 1; grid-row: auto; gap: 10px; }
  .bento-card.with-img .card-thumb { width: 95px; }
  .bento-bottom { grid-column: 1; grid-row: auto; flex-direction: column; gap: 10px; }
  .bento-lg-right { grid-column: 1; grid-row: auto; flex-direction: column; }
  .bento-lg-right .bento-visual { flex: none; width: 100%; min-height: 180px; }
  .modules-grid { grid-template-columns: repeat(2,1fr); gap: 10px; }
  footer { flex-direction: column; align-items: flex-start; }
  .settings-card { width: calc(100vw - 32px); padding: 28px 24px 32px; }
}
@media(max-width:400px){ .modules-grid { grid-template-columns: 1fr; } }
</style>
</head>
<body>

<div class="custom-cursor" id="custom-cursor"></div>

<!-- SETTINGS MODAL -->
<div class="settings-overlay" id="settingsOverlay">
  <div class="settings-card">
    <div class="settings-header">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(160,160,192,0.7)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
      <h2>Website Settings</h2>
    </div>
    <div class="settings-divider"></div>

    <!-- Dark Mode -->
    <div class="toggle-row">
      <div class="toggle-label">
        <div class="icon-slot" id="dmIconSlot">
          <svg class="dm-icon sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg class="dm-icon moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </div>
        Dark Mode
      </div>
      <label class="switch">
        <input type="checkbox" id="dmToggle">
        <div class="track"></div>
        <div class="thumb"></div>
      </label>
    </div>

    <!-- Animations -->
    <div class="toggle-row">
      <div class="toggle-label">
        <div class="icon-slot" id="animIconSlot">
          <svg class="sparkle-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2l1.8 5.4L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.6z"/>
            <path d="M19 14l1 2.8L23 18l-3 .8L19 21l-1-2.2L15 18l3-.8z"/>
            <path d="M5 17l.6 1.8L7.5 20l-1.9.6L5 22.4l-.6-1.8L2.5 20l1.9-.6z"/>
          </svg>
        </div>
        Animations
      </div>
      <label class="switch">
        <input type="checkbox" id="animToggle" checked>
        <div class="track"></div>
        <div class="thumb"></div>
      </label>
    </div>

    <!-- Custom Cursor -->
    <div class="toggle-row">
      <div class="toggle-label">
        <div class="icon-slot" id="curIconSlot">
          <svg class="cur-icon circle" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2">
            <circle cx="12" cy="12" r="8"/>
            <circle cx="12" cy="12" r="2.5" fill="#34d399" stroke="none"/>
          </svg>
          <svg class="cur-icon pointer" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 3l16 10-7 1.5-3.5 7.5z"/>
          </svg>
        </div>
        Custom Cursor
      </div>
      <label class="switch">
        <input type="checkbox" id="curToggle" checked>
        <div class="track"></div>
        <div class="thumb"></div>
      </label>
    </div>

  </div>
</div>

<div class="topbar">
  <button class="menu-btn" onclick="toggleNav()" aria-label="Menu">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  </button>
  <div class="topbar-logo">
    <img src="https://assetcdn.patchednexus.win/icons/ambient/apple-touch-icon.png" alt="Ambient">
    <b>Ambient</b><span>Docs</span>
  </div>
</div>

<div class="nav-overlay" id="nav-overlay" onclick="toggleNav()"></div>

<nav id="sidebar">
  <div class="sidebar-top">
    <a href="#" class="sidebar-brand">
      <img src="https://assetcdn.patchednexus.win/icons/ambient/apple-touch-icon.png" alt="Ambient">
      <div><div class="brand-name">Ambient</div><div class="brand-sub">Documentation</div></div>
    </a>
    <button class="nav-close-btn" onclick="toggleNav()" aria-label="Close">✕</button>
  </div>
  <div class="mode-wrap">
    <div class="mode-tabs">
      <button class="mode-btn active" id="btn-user" onclick="switchMode('user')">User</button>
      <button class="mode-btn" id="btn-dev" onclick="switchMode('dev')">Developers</button>
    </div>
  </div>
  <div class="scroll-nav">
    <div id="side-user">
      <div class="nav-label">Overview</div>
      <ul>
        <li><a href="#intro" onclick="closeNavOnMobile()"><span class="nav-idx">01</span>Introduction</a></li>
        <li><a href="#features" onclick="closeNavOnMobile()"><span class="nav-idx">02</span>Features</a></li>
        <li><a href="#modules" onclick="closeNavOnMobile()"><span class="nav-idx">03</span>More Tools</a></li>
      </ul>
      <div class="nav-label">Reference</div>
      <ul>
        <li><a href="#storage" onclick="closeNavOnMobile()"><span class="nav-idx">04</span>Storage &amp; Paths</a></li>
        <li><a href="#bugs" onclick="closeNavOnMobile()"><span class="nav-idx">05</span>Known Bugs</a></li>
        <li><a href="#changelog" onclick="closeNavOnMobile()"><span class="nav-idx">06</span>Changelog</a></li>
      </ul>
    </div>
    <div id="side-dev" style="display:none">
      <div class="nav-label">JS API</div>
      <ul>
        <li><a href="#js-logging" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>Logging</a></li>
        <li><a href="#js-utils" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>Utility Functions</a></li>
        <li><a href="#js-paths" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>Path Functions</a></li>
        <li><a href="#js-assets" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>Virtual Assets</a></li>
        <li><a href="#js-hook" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>Hooking</a></li>
      </ul>
      <div class="nav-label">System &amp; FMOD API</div>
      <ul>
        <li><a href="#js-system" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>System Functions</a></li>
        <li><a href="#js-fmod" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>FMOD Functions</a></li>
      </ul>
      <div class="nav-label">C++ API &amp; Env</div>
      <ul>
        <li><a href="#cpp-overview" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>Overview</a></li>
        <li><a href="#cpp-template" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>Template Workflow</a></li>
        <li><a href="#cpp-assets" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>VirtualAssets</a></li>
        <li><a href="#cpp-fmod" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>FMODHook</a></li>
        <li><a href="#cpp-render" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>RenderAPI</a></li>
        <li><a href="#cpp-touch" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>TouchAPI</a></li>
        <li><a href="#cpp-key" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>KeyAPI</a></li>
        <li><a href="#cpp-clientlog" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>ClientLog</a></li>
        <li><a href="#native-env" onclick="closeNavOnMobile()"><span class="nav-idx">→</span>Native Env Setup</a></li>
      </ul>
    </div>
  </div>
  <div class="sidebar-bottom">
    <button class="settings-btn" id="settingsBtn" aria-label="Open Settings">
      <svg class="cog-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
      Settings
    </button>
  </div>
</nav>

<main>
<div id="page-user" class="page active">
  <div class="page-hero" id="intro">
    <div class="page-hero-inner">
      <div class="hero-badge">&#9679; Official Release</div>
      <h1>Ambient Launcher</h1>
      <p>A dedicated utility environment for Minecraft Bedrock on Android. Zero memory leaks, zero input delay. Just Minecraft, the way it should run.</p>
      <div class="hero-btns">
        <a href="https://play.google.com/store/apps/details?id=io.kitsuri.mayape" class="btn-primary" target="_blank" rel="noopener noreferrer">
          <svg width="13" height="13" viewBox="0 0 448 512" fill="currentColor"><path d="M293.6 234.3L72.9 13 353.7 174.2 293.6 234.3zM15.3 0C2.3 6.8-6.4 19.2-6.4 35.3l0 441.3c0 16.1 8.7 28.5 21.7 35.3L271.9 255.9 15.3 0zM440.5 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM72.9 499L353.7 337.8 293.6 277.7 72.9 499z"/></svg>
          Get on Play Store
        </a>
        <a href="https://ambient.kitsuri.dev" class="btn-ghost" target="_blank" rel="noopener noreferrer">Visit Website</a>
      </div>
    </div>
  </div>
  <div class="section" id="features">
    <div class="section-header">
      <h2>Everything you need.<br>Nothing you don't.</h2>
    </div>
    <div class="bento-grid">
      <div class="bento-card bento-lg">
        <div class="bento-visual">
          <img src="https://ambient.kitsuri.dev/assets/version-selector.webp" alt="Version Selector" loading="lazy" decoding="async">
        </div>
        <div class="bento-info">
          <span class="material-symbols-outlined bento-icon">swap_vert</span>
          <h3>Version Selector</h3>
          <p>Switch between game versions instantly with isolated saves, mods, and settings.</p>
        </div>
      </div>
      <div class="bento-sm-col">
        <div class="bento-card with-img">
          <img src="https://ambient.kitsuri.dev/assets/shader.webp" alt="Shader Loader" class="card-thumb" loading="lazy" decoding="async">
          <div class="bento-info compact">
            <h3>Shader Loader</h3>
            <p>Apply and swap shader packs in seconds.</p>
          </div>
        </div>
        <div class="bento-card with-img">
          <img src="https://ambient.kitsuri.dev/assets/shader-loader.webp" alt="Pack Manager" class="card-thumb" loading="lazy" decoding="async">
          <div class="bento-info compact">
            <h3>Pack Manager</h3>
            <p>View and manage your packs with ease.</p>
          </div>
        </div>
      </div>
      <div class="bento-bottom">
        <div class="bento-card bento-md">
          <div class="bento-visual">
            <img src="https://ambient.kitsuri.dev/assets/worldmanager.webp" alt="World Manager" loading="lazy" decoding="async">
          </div>
          <div class="bento-info">
            <h3>World Manager</h3>
            <p>Duplicate, backup, import and export worlds.</p>
          </div>
        </div>
        <div class="bento-card bento-md">
          <div class="bento-visual">
            <img src="https://ambient.kitsuri.dev/assets/playtime-stats.webp" alt="Playtime Stats" loading="lazy" decoding="async">
          </div>
          <div class="bento-info">
            <h3>Playtime Stats</h3>
            <p>Track sessions, time and per-world activity.</p>
          </div>
        </div>
      </div>
      <div class="bento-card bento-lg-right">
        <div class="bento-visual">
           <img src="https://ambient.kitsuri.dev/assets/modloader.webp" alt="Mod Loader" loading="lazy" decoding="async">
        </div>
        <div class="bento-info">
          <span class="material-symbols-outlined bento-icon">extension</span>
          <h3>Curseforge Integration</h3>
          <p>Install and manage mods inside Ambient without extra tools.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="section" id="modules" style="padding-top:0">
    <div class="section-header">
      <h2>More tools built in.</h2>
    </div>
    <div class="modules-grid">
      <div class="module-card">
        <img src="https://ambient.kitsuri.dev/assets/nbtdataeditor.webp" alt="NBT Data Editor" loading="lazy" decoding="async">
        <h3>NBT Data Editor</h3>
      </div>
      <div class="module-card">
        <img src="https://ambient.kitsuri.dev/assets/structure-extractor.webp" alt="Structure Extractor" loading="lazy" decoding="async">
        <h3>Structure Extractor</h3>
      </div>
      <div class="module-card">
         <img src="https://ambient.kitsuri.dev/assets/skinloader.webp" alt="Skin Loader" loading="lazy" decoding="async">
        <h3>Skin Loader</h3>
      </div>
      <div class="module-card">
        <img src="https://ambient.kitsuri.dev/assets/resourcepackimportfromfilemanager-vertical.webp" alt="Resourcepack Import" loading="lazy" decoding="async">
        <h3>Resourcepack Import</h3>
      </div>
      <div class="module-card">
        <img src="https://ambient.kitsuri.dev/assets/ingame-menustats.webp" alt="In-game Stats" loading="lazy" decoding="async">
        <h3>In-game Stats</h3>
      </div>
      <div class="module-card">
        <img src="https://ambient.kitsuri.dev/assets/client-logs.webp" alt="Client Logs" loading="lazy" decoding="async">
        <h3>Client Logs</h3>
      </div>
    </div>
  </div>
  <div class="doc-section">
    <div class="doc-inner">
      <h2 class="doc-h" id="storage">Storage &amp; Paths</h2>
      <p class="doc-p">Storage is pre-defined for stability. Toggling Internal/External storage is not supported — this is expected. All game files remain accessible for manual backup or modding.</p>
      <div class="path-box">/Android/media/io.kitsuri.mayape/games</div>
      <p class="doc-p" style="font-size:.8rem">You may need a file manager that can access <span class="ic">Android/media</span> — Shizuku + ZArchiver or similar works on modern Android.</p>
      <h2 class="doc-h" id="bugs">Known Bugs</h2>
      <ul class="doc-ul">
        <li><b style="color:var(--text)">Persistence:</b> Settings reset when toggling between AmbientUI and OreUI.</li>
        <li><b style="color:var(--text)">Resource Packs:</b> Imported packs expose textures in gallery apps. Fix: add an empty <span class="ic">.nomedia</span> file in <span class="ic">Android/media/io.kitsuri.mayape/</span>.</li>
        <li><b style="color:var(--text)">Add-ons:</b> .mcaddon files aren't supported yet — force load them manually.</li>
      </ul>

      <!-- ==================== CHANGELOG ==================== -->
      <h2 class="doc-h" id="changelog">Changelog</h2>

      <!-- v1.0.23.1 — latest -->
      <div class="changelog-card">
        <div class="cl-title">V1.0.6 Minor <span class="badge badge-new">Latest</span></div>
        <div class="cl-sub">Minor Update</div>
        <div class="cl-group">Features</div>
        <ul class="doc-ul">
          <li>Added Minecraft 1.26.23.1 support for Toolbox menu</li>
        </ul>
        <div class="cl-group">Bug Fixes</div>
        <ul class="doc-ul">
          <li>Fixed various bugs and small details</li>
        </ul>
      </div>

      <!-- v1.0.6 -->
      <div class="changelog-card">
        <div class="cl-title">V1.0.6 Hotfix</div>
        <div class="cl-sub">Ambient: Pocket Edition</div>
        <div class="cl-group">Features &amp; Improvements</div>
        <ul class="doc-ul">
          <li>Added Minecraft 1.26.22 support</li>
          <li>All mods are now server-legal</li>
          <li>Key Mapper and Helper GUI moved back outside Toolbox — usable regardless of Toolbox toggle</li>
          <li><b style="color:var(--text)">Performance Mod</b> <span class="badge badge-new">Experimental</span> — hacks Minecraft GL swap chain, forwards to Swappy Swap Chain; forces AGDK frame pacing and GPU acceleration. Requires Render API. May cap FPS but improves frame stability</li>
          <li><b style="color:var(--text)">Max Refresh Rate</b> <span class="badge badge-new">Experimental</span> — attempts to automatically set device refresh rate to maximum. May not work on all OEMs or custom ROMs; switch manually if it fails</li>
        </ul>
        <div class="cl-group">Bug Fixes</div>
        <ul class="doc-ul">
          <li>Fixed Auto Sprint — now Forward Sprint only by default. Multi-direction toggle available in local worlds only</li>
          <li>Gamemode Switcher, Freecam, and Desync restricted to local worlds only</li>
          <li>Fixed specific crashes</li>
        </ul>
        <div class="cl-group">From the image changelog (V1.0.5 area)</div>
        <ul class="doc-ul">
          <li>Added Toolbox UI, Auto Sprint, Java Air Swing, Desync, Freecam, Material Reloader, Time Changer, Weather Changer, Gamemode Switcher, Zoom, Motion Blur, Particle Trails, Fullbright, Third-Person Nametag, Freelook, Point of View, Direction Bar, Java-Style Debug Menu, FPS Viewer, Coordinates, Keystrokes, Rotation Display, CPS Counter, Custom Joystick, Clarity, Command Shortcuts</li>
          <li>Chat Commands (type <span class="ic">\`!help\`</span> in-game for info)</li>
          <li>Server Skin Viewer and Downloader</li>
          <li>Fixed HXO Loader Slider</li>
          <li>Fixed Samsung/Xiaomi crashes</li>
          <li>Fixed long import delays — now routed directly through Minecraft</li>
          <li>Latest version support, Render API updates, Game Data and Message APIs, new overlay icon</li>
        </ul>
      </div>

      <!-- OLDER — hidden by default -->
      <div id="changelog-older" style="display:none">
        <div class="changelog-card">
          <div class="cl-title">V1.0.4 Hotfix</div>
          <div class="cl-sub">Ambient: Pocket Edition</div>
          <div class="cl-group">Bug Fixes</div>
          <ul class="doc-ul">
            <li>Fixed Marketplace issues</li>
            <li>Fixed Dressing Room / Skins not working</li>
            <li>Fixed servers not loading</li>
            <li>Fixed key mapper crash</li>
            <li>Fixed shader loader for version 1.26.10.4</li>
          </ul>
          <div class="cl-group">Features &amp; Improvements</div>
          <ul class="doc-ul">
            <li>Added more customization options</li>
            <li>Added keymap button lock</li>
            <li>Improved overall performance</li>
          </ul>
          <div class="cl-group">API Changes</div>
          <ul class="doc-ul">
            <li>Added <span class="ic">RenderAPI::Register(cb fun ptr)</span></li>
            <li>Added <span class="ic">RenderAPI::Unregister(cb fun ptr)</span></li>
            <li>Added <span class="ic">TouchAPI::RegisterCallback(cb)</span></li>
            <li>Added <span class="ic">TouchAPI::UnregisterCallback(cb)</span></li>
            <li>Added <span class="ic">KeyApi::RegisterHandler(handler)</span></li>
            <li>Added <span class="ic">KeyApi::UnregisterHandler(handler)</span></li>
            <li>Added TouchEvent fields: <span class="ic">action</span> <span class="ic">pointerId</span> <span class="ic">x</span> <span class="ic">y</span></li>
          </ul>
          <div class="cl-group">Removals</div>
          <ul class="doc-ul">
            <li><span class="badge badge-removed">Removed</span> Shader auto-fixer — removed to align with YSS changes.</li>
          </ul>
        </div>
      </div>

      <!-- Show more button -->
      <button class="cl-show-more-btn" id="cl-toggle-btn" onclick="toggleChangelog()">
        <span id="cl-toggle-label">Show older versions</span>
        <svg class="cl-chevron" id="cl-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

    </div>
  </div>
</div>

<div id="page-dev" class="page">
  <div class="page-hero">
    <div class="page-hero-inner">
      <div class="hero-badge">&#9679; For Developers</div>
      <h1>API Reference</h1>
      <p>JS API overview and Native API references for Ambient mod development. Primary template: <a href="https://github.com/Lodingglue/nise-api" target="_blank" rel="noopener noreferrer" style="color:var(--primary);text-decoration:none;">Lodingglue/nise-api</a></p>
    </div>
  </div>
  <div class="doc-section">
    <div class="doc-inner">
      
      <h2 class="doc-h" id="js-logging">JS: Logging</h2>
      <div class="api-card">
        <h3 class="api-fn">log(message)</h3>
        <p class="doc-p">Routes informational messages through the client logger (tag: "JS").</p>
        <pre><code>log("Script initialized successfully.");</code></pre>
        
        <h3 class="api-fn">logError(message)</h3>
        <p class="doc-p">Logs an error message to the client logger.</p>
        <pre><code>logError("Hook failed at address 0x" + addr.toString(16));</code></pre>
        
        <h3 class="api-fn">logWarn(message)</h3>
        <p class="doc-p">Logs a warning message to the client logger.</p>
        <pre><code>logWarn("Symbol not found, using fallback.");</code></pre>
      </div>

      <h2 class="doc-h" id="js-utils">JS: Utility Functions</h2>
      <div class="api-card">
        <h3 class="api-fn">sleep(milliseconds)</h3>
        <p class="doc-p">Pauses execution of the current script for the specified duration.</p>
        <pre><code>log("Waiting 500ms...");
sleep(500);
log("Done.");</code></pre>

        <h3 class="api-fn">readFile(path)</h3>
        <p class="doc-p">Reads the entire contents of a file from the real filesystem. Returns <span class="ic">ArrayBuffer</span>.</p>
        <pre><code>const data = readFile("/sdcard/MyMod/patch.bin");
Hook.writeMemory(targetAddr, data);</code></pre>
        
        <h3 class="api-fn">writeFile(path, data)</h3>
        <p class="doc-p">Writes data to a file on the real filesystem. Returns boolean true on success.</p>
        <pre><code>writeFile("/sdcard/MyMod/log.txt", "hello world");
const buf = new Uint8Array([0x90, 0x90, 0x90, 0x90]).buffer;
writeFile("/sdcard/MyMod/patch.bin", buf);</code></pre>

        <h3 class="api-fn">fileExists(path)</h3>
        <p class="doc-p">Checks whether a file exists on the real filesystem.</p>
        <pre><code>if (fileExists("/sdcard/MyMod/config.json")) {
  const cfg = readFile("/sdcard/MyMod/config.json");
}</code></pre>
      </div>

      <h2 class="doc-h" id="js-paths">JS: Path Functions</h2>
      <div class="api-card">
        <h3 class="api-fn">getScriptPath()</h3>
        <p class="doc-p">Returns the absolute file path of the currently executing script.</p>
        <pre><code>log("Running from: " + getScriptPath());</code></pre>

        <h3 class="api-fn">getScriptDir()</h3>
        <p class="doc-p">Returns the directory that contains the currently executing script.</p>
        <pre><code>const dir = getScriptDir();
const assetPath = joinPath(dir, "assets", "texture.webp");</code></pre>

        <h3 class="api-fn">joinPath(base, ...parts)</h3>
        <p class="doc-p">Joins two or more path segments into a single path string.</p>
        <pre><code>joinPath("/sdcard/MyMod", "assets", "texture.webp");
// =&gt; "/sdcard/MyMod/assets/texture.webp"</code></pre>
      </div>

      <h2 class="doc-h" id="js-assets">JS: Virtual Assets</h2>
      <div class="api-card">
        <h3 class="api-fn">VirtualAssets.blockFile(path)</h3>
        <p class="doc-p">Blocks an asset path so the game cannot open it.</p>
        <pre><code>VirtualAssets.blockFile("assets/music/game/creative.ogg");</code></pre>

        <h3 class="api-fn">VirtualAssets.unblockFile(path)</h3>
        <p class="doc-p">Lifts a block previously applied by blockFile().</p>
        <pre><code>VirtualAssets.unblockFile("textures/terrain/grass.webp");</code></pre>

        <h3 class="api-fn">VirtualAssets.addFile(path, data)</h3>
        <p class="doc-p">Injects a binary file (ArrayBuffer) or string into the virtual asset registry.</p>
        <pre><code>const buf = readFile("/sdcard/MyMod/custom_grass.webp");
VirtualAssets.addFile("textures/terrain/grass.webp", buf);</code></pre>

        <h3 class="api-fn">VirtualAssets.addTextFile(path, content)</h3>
        <p class="doc-p">Convenience wrapper for injecting a plain-text asset.</p>
        <pre><code>VirtualAssets.addTextFile("config/mod_settings.json", JSON.stringify({ enabled: true }));</code></pre>

        <h3 class="api-fn">VirtualAssets.removeFile(path)</h3>
        <p class="doc-p">Removes a virtual entry from the registry.</p>
        <pre><code>VirtualAssets.removeFile("textures/terrain/grass.webp");</code></pre>

        <h3 class="api-fn">VirtualAssets.hasFile(path)</h3>
        <p class="doc-p">Returns whether a virtual entry is registered for the path.</p>
        <pre><code>if (!VirtualAssets.hasFile("shaders/glsl/terrain.vertex")) {
  VirtualAssets.addTextFile("shaders/glsl/terrain.vertex", shaderSrc);
}</code></pre>

        <h3 class="api-fn">VirtualAssets.loadDir(storageDir, virtualBaseDir, recursive = false)</h3>
        <p class="doc-p">Bulk-registers all files in an on-device directory as virtual assets. Returns number of files registered.</p>
        <pre><code>const count = VirtualAssets.loadDir("/sdcard/MyMod/textures", "textures", true);
log("Loaded " + count + " assets.");</code></pre>

        <h3 class="api-fn">VirtualAssets.replaceFile(virtualPath, storagePath)</h3>
        <p class="doc-p">Points a virtual asset entry at an on-device file. Returns boolean true on success.</p>
        <pre><code>VirtualAssets.replaceFile("textures/terrain/grass.webp", "/sdcard/MyMod/grass.webp");</code></pre>

        <h3 class="api-fn">VirtualAssets.readFile(path)</h3>
        <p class="doc-p">Reads a virtual asset into an ArrayBuffer. Returns null if not found/blocked.</p>
        <pre><code>const data = VirtualAssets.readFile("config/mod_settings.json");
if (data) {
  const text = new TextDecoder().decode(data);
  const cfg  = JSON.parse(text);
}</code></pre>
      </div>

      <h2 class="doc-h" id="js-hook">JS: Hooking</h2>
      <div class="api-card">
        <h3 class="api-fn">Hook.hookAddr(name, targetAddr, hookFunc, originalFunc, hookType, priority)</h3>
        <p class="doc-p">Installs an inline hook at <span class="ic">targetAddr</span>. Returns trampoline address on success; 0 on failure.</p>
        <pre><code>const base = Hook.getBaseAddr();
const target = base + 0x1A2B3C;
const tramp = Hook.hookAddr(
  "myHook", target, myReplacementFn, origPtr, 
  Hook.Type.INLINE, Hook.Priority.HIGH
);
if (tramp === 0) logError("Hook failed.");</code></pre>

        <h3 class="api-fn">Hook.unhookAddr(name)</h3>
        <p class="doc-p">Removes a hook installed by hookAddr() and restores the original bytes.</p>
        <pre><code>Hook.unhookAddr("myHook");</code></pre>

        <h3 class="api-fn">Hook.patchNop(name, addr, size = 4)</h3>
        <p class="doc-p">Overwrites size bytes at addr with NOP instructions, saving the originals.</p>
        <pre><code>Hook.patchNop("disableBoundsCheck", Hook.getBaseAddr() + 0xDEAD, 8);</code></pre>

        <h3 class="api-fn">Hook.restoreNopPatch(name)</h3>
        <p class="doc-p">Restores the original bytes that were overwritten by patchNop().</p>
        <pre><code>Hook.restoreNopPatch("disableBoundsCheck");</code></pre>

        <h3 class="api-fn">Hook.writeMemory(addr, data)</h3>
        <p class="doc-p">Writes raw bytes from an ArrayBuffer to an arbitrary memory address.</p>
        <pre><code>const nop = new Uint8Array([0x1F, 0x20, 0x03, 0xD5]).buffer; // 4-byte ARM64 NOP
Hook.writeMemory(Hook.getBaseAddr() + 0xCAFE, nop);</code></pre>

        <h3 class="api-fn">Hook.readMemory(addr, size)</h3>
        <p class="doc-p">Reads size bytes from an arbitrary memory address into an ArrayBuffer.</p>
        <pre><code>const bytes = Hook.readMemory(Hook.getBaseAddr() + 0xCAFE, 16);
if (bytes) {
  const view = new Uint8Array(bytes);
  log("First byte: 0x" + view[0].toString(16));
}</code></pre>

        <h3 class="api-fn">Hook.getAddress(baseAddr, offsets)</h3>
        <p class="doc-p">Resolves a multi-level pointer chain.</p>
        <pre><code>const healthAddr = Hook.getAddress(Hook.getBaseAddr(), [0x10, 0x28, 0x08]);</code></pre>

        <h3 class="api-fn">Hook.getBaseAddr()</h3>
        <p class="doc-p">Returns the cached base load address of libminecraft.so.</p>
        <pre><code>const base = Hook.getBaseAddr();</code></pre>

        <h3 class="api-fn">Hook.getModuleAddr(moduleName, permissions = "")</h3>
        <p class="doc-p">Finds the base address of any named module from /proc/self/maps.</p>
        <pre><code>const fmodBase = Hook.getModuleAddr("libfmod.so");
const fmodExec = Hook.getModuleAddr("libfmod.so", "r-xp");</code></pre>

        <h3 class="api-fn">Hook.getProtection(addr)</h3>
        <p class="doc-p">Returns the current mmap protection flags for the page at addr.</p>
        <pre><code>const prot = Hook.getProtection(Hook.getBaseAddr());
log("Protection flags: " + prot.toString(16));</code></pre>

        <h3 class="api-fn">Hook.sigScanSetup(signature, libName, flags = 0)</h3>
        <p class="doc-p">Prepares a signature scan using an IDA-style pattern string.</p>
        <pre><code>const handle = Hook.sigScanSetup("48 8B 05 ?? ?? ?? ?? 48 85 C0", "libminecraft.so");</code></pre>

        <h3 class="api-fn">Hook.getSigScanResult(handle)</h3>
        <p class="doc-p">Executes the prepared scan and returns the address of the first match.</p>
        <pre><code>const result = Hook.getSigScanResult(handle);
if (result) log("Pattern found at: 0x" + result.toString(16));</code></pre>

        <h3 class="api-fn">Hook.sigScanCleanup(handle)</h3>
        <p class="doc-p">Frees all resources associated with a scan handle (always call this).</p>
        <pre><code>Hook.sigScanCleanup(handle);</code></pre>

        <h3 class="api-fn">Hook.debugStatus()</h3>
        <p class="doc-p">Emits a debug dump of the current hook table to the log.</p>
        <pre><code>Hook.debugStatus();</code></pre>
      </div>

      <h2 class="doc-h" id="js-system">JS: System API</h2>
      <div class="api-card">
        <h3 class="api-fn">System_loadLibrary(libraryId, path, flags)</h3>
        <p class="doc-p">Loads a shared library (.so) and registers it under a string ID.</p>
        <pre><code>if (!System_isLibraryLoaded("mylib")) {
  const ok = System_loadLibrary("mylib", "/data/local/tmp/mylib.so");
  if (!ok) logError(System_getLastError());
}</code></pre>

        <h3 class="api-fn">System_unloadLibrary(libraryId)</h3>
        <p class="doc-p">Unloads a managed library and removes it from the registry.</p>
        <pre><code>System_unloadLibrary("mylib");</code></pre>

        <h3 class="api-fn">System_isLibraryLoaded(libraryId)</h3>
        <p class="doc-p">Checks whether a library is currently loaded in the registry.</p>
        <pre><code>if (System_isLibraryLoaded("mylib")) {
  log("mylib is ready.");
}</code></pre>

        <h3 class="api-fn">System_getSymbol(libraryId, symbolName)</h3>
        <p class="doc-p">Looks up an exported symbol in a specific registered library.</p>
        <pre><code>const addr = System_getSymbol("mylib", "myExportedFunction");
if (addr) Hook.hookAddr("myHook", addr, replacement, orig);</code></pre>

        <h3 class="api-fn">System_getSymbolAddress(symbolName)</h3>
        <p class="doc-p">Searches all registered libraries for a symbol and returns the first match.</p>
        <pre><code>const fmodInit = System_getSymbolAddress("FMOD_System_Create");</code></pre>

        <h3 class="api-fn">System_getLibraryInfo(libraryId)</h3>
        <p class="doc-p">Returns metadata for a registered library.</p>
        <pre><code>const info = System_getLibraryInfo("mylib");
if (info) log("Loaded from: " + info.path);</code></pre>

        <h3 class="api-fn">System_getLoadedLibraries()</h3>
        <p class="doc-p">Returns the IDs of all currently registered libraries.</p>
        <pre><code>System_getLoadedLibraries().forEach(id =&gt; log("Registered: " + id));</code></pre>

        <h3 class="api-fn">System_getLastError()</h3>
        <p class="doc-p">Returns the last error string recorded by any System_* operation.</p>
        <pre><code>if (!System_loadLibrary("x", "/bad/path.so")) {
  logError(System_getLastError());
}</code></pre>

        <h3 class="api-fn">System_dlOpen(path, flags)</h3>
        <p class="doc-p">Raw dlopen wrapper. The returned handle is NOT tracked by the registry.</p>
        <pre><code>const h = System_dlOpen("/system/lib64/liblog.so");
const fn = System_dlSym(h, "__android_log_print");
System_dlClose(h);</code></pre>

        <h3 class="api-fn">System_dlSym(handle, symbolName)</h3>
        <p class="doc-p">Raw dlsym wrapper.</p>
        <pre><code>const logPrint = System_dlSym(liblogHandle, "__android_log_print");</code></pre>

        <h3 class="api-fn">System_dlClose(handle)</h3>
        <p class="doc-p">Raw dlclose wrapper. Returns true on success.</p>
        <pre><code>System_dlClose(handle);</code></pre>

        <h3 class="api-fn">System_dlError()</h3>
        <p class="doc-p">Returns and clears the last error from the dl* subsystem.</p>
        <pre><code>System_dlOpen("/bad/path.so");
const err = System_dlError();
if (err) logError("dlopen failed: " + err);</code></pre>
      </div>

      <h2 class="doc-h" id="js-fmod">JS: FMOD API</h2>
      <div class="api-card">
        <h3 class="api-fn">FMOD.addPathOverride(originalPath, customPath)</h3>
        <p class="doc-p">Redirects an FMOD audio file open from originalPath to customPath.</p>
        <pre><code>FMOD.addPathOverride(
  "assets/music/game/creative.ogg",
  "/sdcard/MyMod/music/creative.ogg"
);</code></pre>

        <h3 class="api-fn">FMOD.removePathOverride(originalPath)</h3>
        <p class="doc-p">Removes a single path override.</p>
        <pre><code>FMOD.removePathOverride("assets/music/game/creative.ogg");</code></pre>

        <h3 class="api-fn">FMOD.clearPathOverrides()</h3>
        <p class="doc-p">Removes ALL registered path overrides.</p>
        <pre><code>FMOD.clearPathOverrides();</code></pre>

        <h3 class="api-fn">FMOD.pauseCurrentTrack()</h3>
        <p class="doc-p">Pauses the channel of the currently tracked active track.</p>
        <pre><code>FMOD.pauseCurrentTrack();</code></pre>

        <h3 class="api-fn">FMOD.resumeCurrentTrack()</h3>
        <p class="doc-p">Resumes the currently paused track.</p>
        <pre><code>FMOD.resumeCurrentTrack();</code></pre>

        <h3 class="api-fn">FMOD.stopCurrentTrack()</h3>
        <p class="doc-p">Stops only the currently tracked active track.</p>
        <pre><code>FMOD.stopCurrentTrack();</code></pre>

        <h3 class="api-fn">FMOD.stopAll()</h3>
        <p class="doc-p">Stops EVERY FMOD channel that is currently playing.</p>
        <pre><code>FMOD.stopAll();</code></pre>

        <h3 class="api-fn">FMOD.getCurrentTrackPath()</h3>
        <p class="doc-p">Returns the original (pre-override) path of the currently active track.</p>
        <pre><code>const path = FMOD.getCurrentTrackPath();
if (path) log("Now playing: " + path);</code></pre>

        <h3 class="api-fn">FMOD.isTrackPlaying()</h3>
        <p class="doc-p">Returns whether a track is currently in the playing (non-paused, non-stopped) state.</p>
        <pre><code>if (FMOD.isTrackPlaying()) {
  log("Audio is currently active.");
}</code></pre>

        <h3 class="api-fn">FMOD.setVolume(volume)</h3>
        <p class="doc-p">Sets the volume on the currently active FMOD channel.</p>
        <pre><code>FMOD.setVolume(0.25); // 25%
FMOD.setVolume(0.0);  // mute</code></pre>

        <h3 class="api-fn">FMOD.getVolume()</h3>
        <p class="doc-p">Returns the last-known volume of the current track.</p>
        <pre><code>const vol = FMOD.getVolume();
log("Current volume: " + (vol * 100).toFixed(1) + "%");</code></pre>
      </div>

      <h2 class="doc-h" id="cpp-overview">C++ API Overview (nise-api)</h2>
      <div class="api-card">
        <p class="doc-p">The native API is exposed in <code>include/nise/stub.h</code> and is designed for Android native mods loaded from JavaScript. Core surfaces include <code>SystemUtils</code>, <code>HookManager</code>, <code>VirtualAssets</code>, <code>FMODHook</code>, plus runtime integration APIs like <code>RenderAPI</code>, <code>TouchAPI</code>, <code>KeyAPI</code>, and <code>ClientLog</code>.</p>
        <p class="doc-p"><strong>Repository:</strong> <a href="https://github.com/Lodingglue/nise-api" target="_blank" rel="noopener noreferrer" style="color:var(--primary)">https://github.com/Lodingglue/nise-api</a></p>
      </div>

      <h2 class="doc-h" id="cpp-template">C++: Template Workflow</h2>
      <div class="api-card">
        <h3 class="api-fn">1) Download the template</h3>
        <pre><code>https://github.com/Lodingglue/nise-api/archive/refs/heads/master.zip</code></pre>
        
        <h3 class="api-fn">2) Minimal exported native function</h3>
        <pre><code>// example_mod.h
extern "C" void StopAllMusic();

// example_mod.cpp
#include "example_mod.h"
#include "nise/stub.h"

extern "C" void StopAllMusic() {
    FMODHook::getInstance().stopAll();
}</code></pre>

        <h3 class="api-fn">3) Load and call from JavaScript</h3>
        <pre><code>System.loadLibrary("my_mod", "/sdcard/MyMod/libmymod.so");
const fn = System.getSymbol("my_mod", "StopAllMusic");
if (fn) {
    fn();
}</code></pre>
      </div>

      <h2 class="doc-h" id="cpp-assets">C++: VirtualAssets</h2>
      <div class="api-card">
        <p class="doc-p">C-style API for virtual asset injection and override of APK assets via hooked AAssetManager.</p>
        <h3 class="api-fn">VirtualAssets_BlockFile(path)</h3>
        <p class="doc-p">Blocks an asset path so open calls fail for that path.</p>
        
        <h3 class="api-fn">VirtualAssets_AddFile(path, data, size)</h3>
        <p class="doc-p">Registers binary data as a virtual asset entry.</p>
        
        <h3 class="api-fn">VirtualAssets_AddTextFile(path, content)</h3>
        <p class="doc-p">Registers UTF-8 text data as a virtual asset entry.</p>
        
        <h3 class="api-fn">VirtualAssets_LoadDir(storageDir, virtualBaseDir, recursive)</h3>
        <p class="doc-p">Bulk-registers directory files from storage into virtual assets tree. Returns <code>int</code> count.</p>
        <pre><code>int count = VirtualAssets_LoadDir("/sdcard/MyMod/textures", "textures", true);</code></pre>
        
        <h3 class="api-fn">VirtualAssets_ReplaceFile(virtualPath, storagePath)</h3>
        <p class="doc-p">Maps one virtual path to a real on-disk replacement file. Returns <code>bool</code>.</p>
      </div>

      <h2 class="doc-h" id="cpp-fmod">C++: FMODHook</h2>
      <div class="api-card">
        <p class="doc-p">Audio path override and playback control over Minecraft FMOD streams.</p>
        
        <h3 class="api-fn">addPathOverride(original_path, custom_path)</h3>
        <p class="doc-p">Redirects one in-game FMOD asset path to your custom file path.</p>
        <pre><code>FMODHook::getInstance().addPathOverride(
    "assets/music/game/creative.ogg",
    "/sdcard/MyMod/music/creative.ogg"
);</code></pre>
        
        <h3 class="api-fn">pauseCurrentTrack() / resumeCurrentTrack()</h3>
        <p class="doc-p">Pauses or resumes current track channel. Returns <code>bool</code>.</p>
        
        <h3 class="api-fn">stopCurrentTrack() / stopAll()</h3>
        <p class="doc-p">Stops current track only, or all active FMOD channels. Returns <code>bool</code>.</p>

        <h3 class="api-fn">getCurrentTrackPath()</h3>
        <p class="doc-p">Gets current original (pre-override) track path. Returns <code>std::string</code>.</p>

        <h3 class="api-fn">setVolume(volume) / getVolume()</h3>
        <p class="doc-p">Sets or reads volume of the current track channel.</p>
      </div>

      <h2 class="doc-h" id="cpp-render">C++: RenderAPI <span class="badge badge-new">V1.0.4</span></h2>
      <div class="api-card">
        <p class="doc-p">Frame render callbacks executed from the engine render thread inside the active OpenGL ES context.</p>
        <h3 class="api-fn">RenderCallback</h3>
        <p class="doc-p"><strong>Type:</strong> <code>typedef void (*RenderCallback)();</code></p>
        
        <h3 class="api-fn">RenderAPI::Register(RenderCallback cb)</h3>
        <p class="doc-p">Registers a render callback to run every frame after game rendering and before buffer swap.</p>
        <pre><code>void DrawOverlay() {
    // issue ImGui or OpenGL draw commands here
}
RenderAPI::Register(DrawOverlay);</code></pre>

        <h3 class="api-fn">RenderAPI::Unregister(RenderCallback cb)</h3>
        <p class="doc-p">Unregisters a previously registered render callback.</p>
        <pre><code>RenderAPI::Unregister(DrawOverlay);</code></pre>
      </div>

      <h2 class="doc-h" id="cpp-touch">C++: TouchAPI <span class="badge badge-new">V1.0.4</span></h2>
      <div class="api-card">
        <p class="doc-p">Touch event interception API for Android input events with optional event consumption.</p>

        <h3 class="api-fn">TouchEvent Fields</h3>
        <div class="table-wrap" style="margin-top:10px">
          <table>
            <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>action</code></td><td>int</td><td>Touch action type (down, move, up…)</td></tr>
              <tr><td><code>pointerId</code></td><td>int</td><td>Unique ID per active touch pointer</td></tr>
              <tr><td><code>x</code></td><td>float</td><td>X coordinate of the touch point</td></tr>
              <tr><td><code>y</code></td><td>float</td><td>Y coordinate of the touch point</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="api-fn">TouchAPI::RegisterCallback(TouchCallback cb)</h3>
        <p class="doc-p">Registers a callback to receive touch events. Return <code>true</code> to consume/block the event.</p>
        <pre><code>bool OnTouch(const TouchEvent* ev) {
    if (ev-&gt;action == 0) {
        ClientLog("Input", "Touch", "ACTION_DOWN received");
    }
    return false; // let the game also receive the touch
}

TouchAPI::RegisterCallback(OnTouch);</code></pre>

        <h3 class="api-fn">TouchAPI::UnregisterCallback(TouchCallback cb)</h3>
        <p class="doc-p">Unregisters a callback from the touch pipeline.</p>
        <pre><code>TouchAPI::UnregisterCallback(OnTouch);</code></pre>
      </div>

      <h2 class="doc-h" id="cpp-key">C++: KeyAPI <span class="badge badge-new">V1.0.4</span></h2>
      <div class="api-card">
        <p class="doc-p">Keyboard/button event interception from the engine input pipeline.</p>
        
        <h3 class="api-fn">KeyHandler</h3>
        <p class="doc-p"><strong>Type:</strong> <code>typedef bool (*KeyHandler)(int keyCode, int action, int unicodeChar);</code></p>
        <p class="doc-p">Return <code>true</code> to consume/block the key event.</p>

        <h3 class="api-fn">KeyAPI::RegisterHandler(KeyHandler handler)</h3>
        <p class="doc-p">Registers a key handler. Handlers run in registration order.</p>
        <pre><code>bool OnKey(int keyCode, int action, int unicodeChar) {
    if (action == 0) {
        ClientLog("Input", "Key", "Key down event");
    }
    return false;
}

KeyAPI::RegisterHandler(OnKey);</code></pre>

        <h3 class="api-fn">KeyApi::UnregisterHandler(KeyHandler handler)</h3>
        <pre><code>KeyAPI::UnregisterHandler(OnKey);</code></pre>
      </div>

      <h2 class="doc-h" id="cpp-clientlog">C++: ClientLog</h2>
      <div class="api-card">
        <p class="doc-p">Emits structured messages through the Apps client logger.</p>
        <h3 class="api-fn">ClientLog(threadName, tag, message)</h3>
        <p class="doc-p"><strong>Signature:</strong> <code>extern "C" void ClientLog(const char* threadName, const char* tag, const char* message);</code></p>
        <pre><code>ClientLog("ModInit", "MyMod", "Native module initialised.");
ClientLog("RenderThread", "Overlay", "Frame callback active.");</code></pre>
      </div>

      <h2 class="doc-h" id="native-env">Native Dev Env Setup</h2>
      
      <div class="api-card">
        <h3 class="api-fn">Linux: Build With CMake + Android NDK</h3>
        <pre><code># install prerequisites
sudo pacman -S --needed git cmake ninja clang lld jdk17-openjdk unzip

# install Android NDK (example path)
mkdir -p $HOME/Android/Sdk/ndk
export ANDROID_NDK_HOME=$HOME/Android/Sdk/ndk/27.1.12297006
export CC=clang
export CXX=clang++

git clone https://github.com/Lodingglue/nise-api.git
cd nise-api

cmake -S . \\
  -B build-arm64 \\
  -G Ninja \\
  -DCMAKE_BUILD_TYPE=Release \\
  -DANDROID_ABI=arm64-v8a \\
  -DANDROID_PLATFORM=android-26 \\
  -DCMAKE_TOOLCHAIN_FILE=$ANDROID_NDK_HOME/build/cmake/android.toolchain.cmake

cmake --build build-arm64 -j</code></pre>
      </div>

      <div class="api-card">
        <h3 class="api-fn">Windows: Build With CMake + Ninja</h3>
        <pre><code># install: Git, CMake, Ninja, LLVM/Clang, Android NDK

set ANDROID_NDK_HOME=C:\\Android\\Sdk\\ndk\\27.1.12297006
set CC=clang
set CXX=clang++

git clone https://github.com/Lodingglue/nise-api.git
cd nise-api

cmake -S . \\
  -B build-arm64 -G Ninja ^
  -DCMAKE_BUILD_TYPE=Release ^
  -DANDROID_ABI=arm64-v8a ^
  -DANDROID_PLATFORM=android-26 ^
  -DCMAKE_TOOLCHAIN_FILE=%ANDROID_NDK_HOME%\\build\\cmake\\android.toolchain.cmake

cmake --build build-arm64 -j</code></pre>
      </div>

      <div class="api-card">
        <h3 class="api-fn">Phone / Termux: Build In Termux + Android Toolchain</h3>
        <pre><code>pkg update
pkg install -y git cmake ninja clang lld

# If building directly with Android toolchain files:
export ANDROID_NDK_HOME=/sdcard/Android/Sdk/ndk/27.1.12297006

git clone https://github.com/Lodingglue/nise-api.git
cd nise-api

cmake -S . \\
  -B build-arm64 \\
  -G Ninja \\
  -DANDROID_ABI=arm64-v8a \\
  -DANDROID_PLATFORM=android-26 \\
  -DCMAKE_TOOLCHAIN_FILE=$ANDROID_NDK_HOME/build/cmake/android.toolchain.cmake

cmake --build build-arm64 -j</code></pre>
      </div>

    </div>
  </div>
</div>

<footer>
  <p class="footer-note">It looks quite empty in here. Maybe you can contribute to help fill it up.</p>
  <p class="footer-recruit">Recruitment: 1/9 — Contact <b>@nyxgoober</b> on Discord.</p>
</footer>
</main>

<script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script>
<script>
// ===================== LENIS SMOOTH SCROLL =====================
const lenis = new Lenis({ autoRaf: true, smoothWheel: true, lerp: 0.1 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// ===================== SETTINGS PERSISTENCE =====================
const STORAGE_KEYS = { dark: 'ambient_dark', anim: 'ambient_anim', cursor: 'ambient_cursor' };

function loadSettings() {
  const dark   = localStorage.getItem(STORAGE_KEYS.dark)   === 'true';
  const anim   = localStorage.getItem(STORAGE_KEYS.anim)   !== 'false';
  const cursor = localStorage.getItem(STORAGE_KEYS.cursor) !== 'false';
  return { dark, anim, cursor };
}

function saveSettings(key, val) {
  localStorage.setItem(key, String(val));
}

// ===================== APPLY SETTINGS TO DOM =====================
function applyDarkMode(enabled) {
  if (enabled) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  dmIconSlot.classList.toggle('dm-active', enabled);
  dmToggle.checked = enabled;
}

function applyAnimations(enabled) {
  document.body.classList.toggle('no-animations', !enabled);
  animIconSlot.classList.toggle('sparkle-off', !enabled);
  animToggle.checked = enabled;
}

function applyCustomCursor(enabled) {
  document.body.classList.toggle('no-custom-cursor', !enabled);
  curIconSlot.classList.toggle('cur-off', !enabled);
  curToggle.checked = enabled;
}

// ===================== DOM REFS =====================
const settingsBtn    = document.getElementById('settingsBtn');
const settingsOverlay = document.getElementById('settingsOverlay');
const dmToggle       = document.getElementById('dmToggle');
const animToggle     = document.getElementById('animToggle');
const curToggle      = document.getElementById('curToggle');
const dmIconSlot     = document.getElementById('dmIconSlot');
const animIconSlot   = document.getElementById('animIconSlot');
const curIconSlot    = document.getElementById('curIconSlot');

// ===================== INIT FROM STORAGE =====================
const saved = loadSettings();
applyDarkMode(saved.dark);
applyAnimations(saved.anim);
applyCustomCursor(saved.cursor);

// ===================== SETTINGS MODAL =====================
function openSettings() {
  settingsOverlay.classList.remove('closing');
  settingsOverlay.classList.add('active');
}

function closeSettings() {
  settingsOverlay.classList.add('closing');
  settingsOverlay.classList.remove('active');
  settingsOverlay.addEventListener('transitionend', () => {
    settingsOverlay.classList.remove('closing');
  }, { once: true });
}

settingsBtn.addEventListener('click', () => {
  settingsBtn.classList.add('spinning');
  settingsBtn.querySelector('.cog-svg').addEventListener('animationend', () => {
    settingsBtn.classList.remove('spinning');
    openSettings();
  }, { once: true });
});

settingsOverlay.addEventListener('click', e => {
  if (e.target === settingsOverlay) closeSettings();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && settingsOverlay.classList.contains('active')) closeSettings();
});

// ===================== TOGGLE LOGIC =====================
dmToggle.addEventListener('change', () => {
  applyDarkMode(dmToggle.checked);
  saveSettings(STORAGE_KEYS.dark, dmToggle.checked);
});

animToggle.addEventListener('change', () => {
  applyAnimations(animToggle.checked);
  saveSettings(STORAGE_KEYS.anim, animToggle.checked);
});

curToggle.addEventListener('change', () => {
  applyCustomCursor(curToggle.checked);
  saveSettings(STORAGE_KEYS.cursor, curToggle.checked);
  bindCursorHoverListeners();
});

// ===================== CUSTOM CURSOR =====================
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.addEventListener('mousedown', () => cursor.classList.add('active'));
document.addEventListener('mouseup',   () => cursor.classList.remove('active'));

function bindCursorHoverListeners() {
  document.querySelectorAll('a, button, .mode-btn, .nav-close-btn, [onclick]').forEach(el => {
    el.removeEventListener('mouseenter', onCursorHoverIn);
    el.removeEventListener('mouseleave', onCursorHoverOut);
    el.addEventListener('mouseenter', onCursorHoverIn);
    el.addEventListener('mouseleave', onCursorHoverOut);
  });
}
function onCursorHoverIn()  { cursor.classList.add('hover'); }
function onCursorHoverOut() { cursor.classList.remove('hover'); }
bindCursorHoverListeners();

// ===================== SIDEBAR & MOBILE NAV =====================
const sidebar    = document.getElementById('sidebar');
const navOverlay = document.getElementById('nav-overlay');
const isMobile   = () => window.innerWidth <= 767;

function toggleNav() {
  if (!isMobile()) return;
  const open = sidebar.classList.toggle('open');
  navOverlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeNavOnMobile() {
  if (!isMobile()) return;
  sidebar.classList.remove('open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function syncCloseBtn() {
  const btn = document.querySelector('.nav-close-btn');
  if (btn) btn.style.display = isMobile() ? 'flex' : 'none';
}

window.addEventListener('resize', () => {
  syncCloseBtn();
  if (!isMobile()) {
    sidebar.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});
syncCloseBtn();

// ===================== MODE SWITCH =====================
function switchMode(mode) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + mode).classList.add('active');
  document.getElementById('side-user').style.display = mode === 'user' ? 'block' : 'none';
  document.getElementById('side-dev').style.display  = mode === 'dev'  ? 'block' : 'none';
  document.getElementById('page-user').classList.toggle('active', mode === 'user');
  document.getElementById('page-dev').classList.toggle('active',  mode === 'dev');
  window.scrollTo(0, 0);
}

// ===================== CHANGELOG SHOW MORE =====================
function toggleChangelog() {
  var older   = document.getElementById('changelog-older');
  var label   = document.getElementById('cl-toggle-label');
  var chevron = document.getElementById('cl-chevron');
  var open    = older.style.display === 'none';
  older.style.display      = open ? 'block' : 'none';
  label.textContent        = open ? 'Hide older versions' : 'Show older versions';
  chevron.style.transform  = open ? 'rotate(180deg)' : 'rotate(0deg)';
}
</script>
</body>
</html>`;
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        ...CORS,
      },
    });
  },
};