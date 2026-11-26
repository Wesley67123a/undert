import { FNT, SPR, drawText, setVolume, isMuted, toggleMute, VOLUME } from './assets.js';
import { SETTINGS, saveSettings, resolution } from './settings.js';
import { isES, tr } from './i18n.js';
import { setTouchDirs, touchAction, touchEsc, touchTypeText } from './main.js';

// ============================================================================
//  Todo lo que va FUERA del área de combate (640x480): título, aviso de fan-game,
//  créditos, barra de volumen, "ESC" y control táctil responsivo móvil.
// ============================================================================
const GUTTER = 130, TOP = 46, BOTTOM = 102;          // márgenes desktop alrededor del combate

let forceTouchPad = null;
export function isTouchLayout() {
  if (forceTouchPad !== null) return forceTouchPad;
  const coarse = (() => { try { return matchMedia('(pointer: coarse)').matches; } catch { return false; } })();
  return innerWidth <= 820 || (coarse && innerWidth < 1024);
}

// Texto con fuente bitmap del juego en su propio <canvas> (nítido al escalar)
function textCanvas(lines, font, { color = '#fff', lh = 15, extra } = {}) {
  const widths = lines.map(l => drawText(document.createElement('canvas').getContext('2d'), font, l, 0, 0));
  const c = document.createElement('canvas');
  c.width = Math.max(1, ...widths) + 2; c.height = lh * lines.length;
  const g = c.getContext('2d');
  lines.forEach((l, i) => drawText(g, font, l, 0, i * lh, { color: typeof color === 'function' ? color(i) : color }));
  if (extra) extra(g);
  c.className = 'px';
  return c;
}
function el(tag, cls, parent) { const e = document.createElement(tag); if (cls) e.className = cls; (parent || document.body).appendChild(e); return e; }
function place(e, x, y, w, h) { Object.assign(e.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }); }

let parts = null, K = 1, drag = false;

function initTouchControls() {
  const dpad = document.getElementById('dbsDpad');
  const btnZ = document.getElementById('dbsBtnZ');
  const btnX = document.getElementById('dbsBtnX');
  const btnEsc = document.getElementById('dbsBtnEsc');
  const btnEscDeck = document.getElementById('dbsDeckEsc');
  const btnMute = document.getElementById('dbsBtnMute');
  const btnPad = document.getElementById('dbsBtnPad');
  const btnType = document.getElementById('dbsBtnType');
  const mobInput = document.getElementById('dbsMobInput');

  if (dpad && !dpad.dataset.bound) {
    dpad.dataset.bound = '1';
    const dTouches = new Map();
    let mDown = false;

    const dirsForPoint = (cx, cy) => {
      const r = dpad.getBoundingClientRect();
      const dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 10) return [];
      // 4-way crisp cardinal aim for menus and Undyne Green shield; 8-way diagonal for free SOUL dodge
      const fourWay = !window.battle || window.battle.soul === 'green' || window.battle.inMenu;
      const out = [];
      if (fourWay) {
        if (Math.abs(dx) >= Math.abs(dy)) out.push(dx > 0 ? 'right' : 'left');
        else out.push(dy > 0 ? 'down' : 'up');
      } else {
        const thresh = dist * 0.36;
        if (dx > thresh) out.push('right'); else if (dx < -thresh) out.push('left');
        if (dy > thresh) out.push('down'); else if (dy < -thresh) out.push('up');
      }
      return out;
    };

    const syncDpad = () => {
      const comb = new Set();
      for (const arr of dTouches.values()) for (const d of arr) comb.add(d);
      setTouchDirs([...comb]);
      for (const dir of ['up', 'down', 'left', 'right']) {
        const ind = dpad.querySelector(`.dp-${dir}`);
        if (ind) ind.classList.toggle('active', comb.has(dir));
      }
    };

    dpad.addEventListener('touchstart', e => {
      e.preventDefault();
      for (const t of e.changedTouches) dTouches.set(t.identifier, dirsForPoint(t.clientX, t.clientY));
      syncDpad();
    }, { passive: false });
    dpad.addEventListener('touchmove', e => {
      e.preventDefault();
      for (const t of e.changedTouches) dTouches.set(t.identifier, dirsForPoint(t.clientX, t.clientY));
      syncDpad();
    }, { passive: false });
    const endDpadTouch = e => {
      e.preventDefault();
      for (const t of e.changedTouches) dTouches.delete(t.identifier);
      syncDpad();
    };
    dpad.addEventListener('touchend', endDpadTouch, { passive: false });
    dpad.addEventListener('touchcancel', endDpadTouch, { passive: false });
    dpad.addEventListener('mousedown', e => { e.preventDefault(); mDown = true; dTouches.set('mouse', dirsForPoint(e.clientX, e.clientY)); syncDpad(); });
    addEventListener('mousemove', e => { if (!mDown) return; dTouches.set('mouse', dirsForPoint(e.clientX, e.clientY)); syncDpad(); });
    addEventListener('mouseup', () => { if (!mDown) return; mDown = false; dTouches.delete('mouse'); syncDpad(); });
  }

  const bindBtn = (elBtn, act) => {
    if (!elBtn || elBtn.dataset.bound) return;
    elBtn.dataset.bound = '1';
    const actIds = new Set();
    let mOn = false;
    elBtn.addEventListener('touchstart', e => {
      e.preventDefault();
      for (const t of e.changedTouches) actIds.add(t.identifier);
      elBtn.classList.add('active');
      touchAction(act, true);
    }, { passive: false });
    const release = e => {
      e.preventDefault();
      for (const t of e.changedTouches) actIds.delete(t.identifier);
      if (actIds.size === 0 && !mOn) { elBtn.classList.remove('active'); touchAction(act, false); }
    };
    elBtn.addEventListener('touchend', release, { passive: false });
    elBtn.addEventListener('touchcancel', release, { passive: false });
    elBtn.addEventListener('mousedown', e => { e.preventDefault(); mOn = true; elBtn.classList.add('active'); touchAction(act, true); });
    addEventListener('mouseup', () => { if (!mOn) return; mOn = false; if (actIds.size === 0) { elBtn.classList.remove('active'); touchAction(act, false); } });
  };
  bindBtn(btnZ, 'confirm');
  bindBtn(btnX, 'cancel');

  if (btnEsc && !btnEsc.dataset.bound) {
    btnEsc.dataset.bound = '1';
    btnEsc.addEventListener('click', () => touchEsc());
  }
  if (btnEscDeck && !btnEscDeck.dataset.bound) {
    btnEscDeck.dataset.bound = '1';
    btnEscDeck.addEventListener('click', () => touchEsc());
  }
  if (btnMute && !btnMute.dataset.bound) {
    btnMute.dataset.bound = '1';
    btnMute.addEventListener('click', () => { toggleMute(); refreshVolume(); });
  }
  if (btnPad && !btnPad.dataset.bound) {
    btnPad.dataset.bound = '1';
    btnPad.addEventListener('click', () => {
      forceTouchPad = !isTouchLayout();
      btnPad.classList.toggle('on', isTouchLayout());
      layout();
    });
  }
  if (btnType && mobInput && !btnType.dataset.bound) {
    btnType.dataset.bound = '1';
    btnType.addEventListener('click', () => { mobInput.focus(); });
    mobInput.addEventListener('input', () => {
      if (mobInput.value) { touchTypeText(mobInput.value); mobInput.value = ''; }
    });
    mobInput.addEventListener('keydown', e => {
      if (e.key === 'Backspace') { e.preventDefault(); touchTypeText('\b'); }
      else if (e.key === 'Enter') { e.preventDefault(); touchAction('confirm', true); setTimeout(() => touchAction('confirm', false), 60); mobInput.blur(); }
    });
  }
}

export function buildUI() {
  const tribute = el('a', 'ui'); tribute.href = 'https://undertale.com'; tribute.target = '_blank'; tribute.rel = 'noopener';
  const credits = el('a', 'ui credits'); credits.href = 'https://github.com/Giaxeri'; credits.target = '_blank'; credits.rel = 'noopener';
  credits.title = 'Gianfry (Giaxeri) on GitHub';
  const frame = el('div', 'avatar', credits);
  const img = el('img', '', frame); img.src = 'https://avatars.githubusercontent.com/u/149126315?s=100&v=4'; img.alt = 'Giaxeri';
  img.onerror = () => { const fb = (SPR.spr_menu_dog || SPR.spr_heart)?.frames?.[0]?.src; if (fb) img.src = fb; };

  // Barra de volumen vertical (arrastrable) con el alma como tirador y el número debajo
  const vol = el('div', 'ui vol');
  const track = el('div', 'track', vol), fill = el('div', 'fill', track);
  const knob = el('img', 'knob', track); knob.src = SPR.spr_heart.frames[0].src; knob.draggable = false;
  const num = el('canvas', 'px num', vol);
  const setFromY = y => {
    const r = track.getBoundingClientRect(), v = 1 - (y - r.top) / r.height;
    setVolume(Math.round(Math.max(0, Math.min(1, v)) * 100) / 100); SETTINGS.volume = VOLUME.master; saveSettings(); refreshVolume();
  };
  track.addEventListener('pointerdown', e => { drag = true; track.setPointerCapture(e.pointerId); setFromY(e.clientY); e.preventDefault(); });
  track.addEventListener('pointermove', e => { if (drag) setFromY(e.clientY); });
  track.addEventListener('pointerup', () => { drag = false; });
  track.addEventListener('pointercancel', () => { drag = false; });
  parts = { tribute, credits, frame, vol, track, fill, knob, num };
  initTouchControls();
  setVolume(SETTINGS.volume);
  refreshTexts();
  addEventListener('resize', layout);
}

// Textos de alrededor del combate en el idioma elegido (se rehacen al cambiar de idioma)
export function refreshTexts() {
  if (!parts) return;
  const p = parts, grey = '#909090';
  document.documentElement.lang = isES() ? 'es' : 'en';
  for (const k of ['title', 'tribCanvas', 'credText', 'esc', 'volLabel']) if (p[k]) p[k].remove();
  p.title = textCanvas(['DETERMINATION BATTLE SIMULATOR'], 'fnt_main', { lh: 30 });
  document.body.appendChild(p.title); p.title.classList.add('ui');
  const L = isES() ? [tr('tribute1'), tr('tribute2'), tr('tribute3'), tr('tribute4a') + tr('tribute4b')]
                   : ['This is a non-profit, fan-made tribute to UNDERTALE.', 'UNDERTALE    is owned by Toby Fox.', 'Please support the official release:', '     Buy UNDERTALE at undertale.com'];
  const link = isES() ? tr('tribute4a') : '     Buy UNDERTALE at ';
  p.tribute.title = tr('Buy UNDERTALE at undertale.com');
  p.tribCanvas = textCanvas(L, 'fnt_maintext', { color: i => i === 3 ? '#fff' : grey, extra: g => {
    const f = FNT.fnt_maintext, w = [...'UNDERTALE'].reduce((s, c) => s + f.glyphs[c][4], 0);
    registered(g, w + 2, 16, grey);                              // ® dibujado a mano (la fuente no lo trae)
    const w2 = [...link].reduce((s, c) => s + (f.glyphs[c] || f.glyphs['?'])[4], 0);
    drawText(g, 'fnt_maintext', 'undertale.com', w2, 45, { color: '#ff0' });
    const heart = SPR.spr_heart.frames[0]; g.drawImage(heart, 0, 46, 12, 12);
  } });
  p.tribute.appendChild(p.tribCanvas);
  p.credText = textCanvas([tr('Made by:'), 'Gianfry (Giaxeri)', tr('on Github!'), 'github.com/Giaxeri'], 'fnt_maintext',
    { color: i => i === 1 ? '#fff' : i === 3 ? '#ff0' : grey });
  p.credits.appendChild(p.credText);
  p.esc = textCanvas([tr('Press ESC to return to the menu')], 'fnt_maintext', { color: '#808080' });
  document.body.appendChild(p.esc); p.esc.classList.add('ui');
  p.volLabel = textCanvas([tr('VOLUME')], 'fnt_maintext');
  p.vol.insertBefore(p.volLabel, p.track);
  layout();
}

function registered(g, x, y, color) {
  g.save(); g.strokeStyle = color; g.lineWidth = 1; g.beginPath(); g.arc(x + 3.5, y + 3.5, 3.2, 0, Math.PI * 2); g.stroke();
  g.fillStyle = color; g.fillRect(x + 2, y + 2, 1, 4); g.fillRect(x + 3, y + 2, 2, 1); g.fillRect(x + 4, y + 3, 1, 1); g.fillRect(x + 3, y + 4, 1, 1); g.fillRect(x + 4, y + 5, 1, 1);
  g.restore();
}

export function refreshVolume() {
  const btnMute = document.getElementById('dbsBtnMute');
  const muted = isMuted();
  if (btnMute) btnMute.textContent = muted ? '🔇' : '🔊';
  if (!parts) return;
  const v = Math.round(VOLUME.master * 100);
  parts.fill.style.height = v + '%';
  parts.knob.style.bottom = `calc(${v}% - ${8 * K * 1.5}px)`;
  const c = parts.num, s = muted ? tr('MUTE') : String(v), f = FNT.fnt_main;
  c.width = [...s].reduce((w, ch) => w + f.glyphs[ch][4], 0) + 2; c.height = 30;
  const g = c.getContext('2d'); g.clearRect(0, 0, c.width, c.height);
  drawText(g, 'fnt_main', s, 0, 0, { color: muted ? '#f00' : '#ff0' });
  sizeCanvas(c, K * 0.8);
}
function sizeCanvas(c, s) { c.style.width = c.width * s + 'px'; c.style.height = c.height * s + 'px'; }

// Coloca el combate y todo lo de alrededor según el tamaño de la ventana y si usa controles táctiles
export function layout() {
  const cv = document.getElementById('game');
  const deck = document.getElementById('dbsTouchDeck');
  const nav = document.getElementById('dbsNav');
  const btnPad = document.getElementById('dbsBtnPad');
  const touch = isTouchLayout();

  if (btnPad) btnPad.classList.toggle('on', touch);
  if (deck) deck.classList.toggle('show', touch);
  if (nav) nav.classList.toggle('compact', touch);

  let x0, y0, W, H;
  if (touch) {
    const navH = nav ? Math.max(36, nav.getBoundingClientRect().height + 4) : 40;
    const deckH = Math.min(205, Math.max(150, Math.round(innerHeight * 0.25)));
    if (deck) deck.style.height = deckH + 'px';
    const full = Math.min((innerWidth - 10) / 640, (innerHeight - navH - deckH - 8) / 480);
    K = Math.max(0.25, full);
    W = 640 * K; H = 480 * K;
    x0 = (innerWidth - W) / 2;
    y0 = navH + Math.max(2, (innerHeight - navH - deckH - H) / 2);
  } else {
    const full = Math.min(innerWidth / (640 + GUTTER * 2), innerHeight / (480 + TOP + BOTTOM));
    K = full * resolution().scale;
    W = 640 * K; H = 480 * K;
    const totalH = (480 + TOP + BOTTOM) * K;
    x0 = (innerWidth - W) / 2;
    y0 = Math.max(0, (innerHeight - totalH) / 2) + TOP * K;
  }
  place(cv, x0, y0, W, H);
  // Resolución real del lienzo para mantener nítidos todos los sprites y fuentes bitmap
  const k = Math.min(3, Math.max(1, W * (window.devicePixelRatio || 1) / 640));
  const bw = Math.round(640 * k), bh = Math.round(480 * k);
  if (cv.width !== bw || cv.height !== bh) { cv.width = bw; cv.height = bh; }
  const g = cv.getContext('2d'); g.setTransform(bw / 640, 0, 0, bh / 480, 0, 0); g.imageSmoothingEnabled = false;

  if (!parts) return;
  const p = parts;
  if (!touch) {
    sizeCanvas(p.title, K * 1.1); p.title.style.left = (innerWidth - p.title.width * K * 1.1) / 2 + 'px'; p.title.style.top = y0 - 38 * K + 'px';
    sizeCanvas(p.tribCanvas, K * 1.15); p.tribute.style.left = x0 + 'px'; p.tribute.style.top = y0 + H + 14 * K + 'px';
    const av = 58 * K; place(p.frame, 0, 0, av, av); p.frame.style.borderWidth = Math.max(1, 3 * K) + 'px';
    sizeCanvas(p.credText, K * 1.15);
    p.credText.style.left = av + 12 * K + 'px'; p.credText.style.top = 0;
    p.credits.style.width = av + 12 * K + p.credText.width * K * 1.15 + 'px'; p.credits.style.height = av + 'px';
    p.credits.style.left = x0 + W - (av + 12 * K + p.credText.width * K * 1.15) + 'px'; p.credits.style.top = y0 + H + 14 * K + 'px';
    sizeCanvas(p.esc, K); p.esc.style.left = (innerWidth - p.esc.width * K) / 2 + 'px'; p.esc.style.top = y0 + H + 86 * K + 'px';
    sizeCanvas(p.volLabel, K * 1.1);
    const tw = 22 * K, th = 200 * K;
    Object.assign(p.track.style, { width: tw + 'px', height: th + 'px', borderWidth: Math.max(1, 3 * K) + 'px' });
    Object.assign(p.knob.style, { width: 16 * K * 1.5 + 'px', height: 16 * K * 1.5 + 'px' });
    p.vol.style.left = x0 + W + (GUTTER * K - Math.max(tw, p.volLabel.width * K * 1.1)) / 2 + 'px';
    p.vol.style.top = y0 + (H - th) / 2 - 24 * K + 'px';
    p.vol.style.gap = 8 * K + 'px';
  }
  refreshVolume();
  updateUI();
}

// Qué se ve en cada momento
export function updateUI() {
  const touch = isTouchLayout();
  const inBattle = !!window.battle;
  const btnEsc = document.getElementById('dbsBtnEsc');
  const btnEscDeck = document.getElementById('dbsDeckEsc');
  const btnType = document.getElementById('dbsBtnType');
  if (btnEsc) btnEsc.style.display = inBattle ? 'inline-flex' : 'none';
  if (btnEscDeck) btnEscDeck.style.display = inBattle ? 'inline-flex' : 'none';
  if (btnType) btnType.style.display = (inBattle && window.battle.typing) ? 'inline-flex' : 'none';
  if (!parts) return;
  if (touch) {
    for (const e of [parts.title, parts.tribute, parts.credits, parts.esc, parts.vol]) e.style.display = 'none';
  } else {
    parts.vol.style.display = 'flex';
    parts.esc.style.display = inBattle ? 'block' : 'none';
    for (const e of [parts.title, parts.tribute, parts.credits]) e.style.display = inBattle ? 'none' : 'block';
  }
}
