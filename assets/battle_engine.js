// Undertale Audio, Sprite, Rich-Text, Flowey Encounter, Genocide & Full RPG Battle Engine (Ruins + Snowdin, 640x480 native)
(function() {
  'use strict';

  if (window.UT_FONTS_CSS) {
    const st = document.createElement('style');
    st.textContent = window.UT_FONTS_CSS;
    document.head.appendChild(st);
  }

  // Decode all packed sprite sheets (Core + Asriel 7-Souls)
  const SPR = {};
  function registerSprites(dict) {
    for (const [k, meta] of Object.entries(dict || {})) {
      if (SPR[k]) continue;
      const img = new Image();
      img.src = 'data:image/png;base64,' + meta.b64;
      SPR[k] = { ...meta, img };
    }
  }
  registerSprites(window.UT_SPRITES);
  registerSprites(window.UT_ASRIEL_SPRITES);
  registerSprites(window.UT_UNDYNE_SPRITES);

  function drawSpr(ctx, name, frame, x, y, scX = 1, scY = scX, useOrigin = false) {
    const s = SPR[name];
    if (!s || !s.img.complete || !s.img.naturalWidth) return;
    const f = ((Math.floor(frame) % s.n) + s.n) % s.n;
    const dx = useOrigin ? x - s.xo * Math.abs(scX) : x;
    const dy = useOrigin ? y - s.yo * Math.abs(scY) : y;
    ctx.save();
    if (scX < 0) {
      ctx.translate(Math.round(dx + s.w * Math.abs(scX)), Math.round(dy));
      ctx.scale(-1, 1);
      ctx.drawImage(s.img, f * s.w, 0, s.w, s.h, 0, 0, Math.round(s.w * Math.abs(scX)), Math.round(s.h * Math.abs(scY)));
    } else {
      ctx.drawImage(s.img, f * s.w, 0, s.w, s.h, Math.round(dx), Math.round(dy), Math.round(s.w * scX), Math.round(s.h * scY));
    }
    ctx.restore();
  }

  // Extended sprite renderer with rotation (GM counter-clockwise deg), origin support, alpha & tint (via reusable scratch canvas)
  let _tintCanv = null, _tintCtx = null;
  function drawSprExt(ctx, name, frame, x, y, scX = 1, scY = scX, deg = 0, tint = null, alpha = 1, useOrigin = false) {
    const s = SPR[name];
    if (!s || !s.img.complete || !s.img.naturalWidth || alpha <= 0) return;
    const f = ((Math.floor(frame) % s.n) + s.n) % s.n;
    const ox = useOrigin ? s.xo : 0;
    const oy = useOrigin ? s.yo : 0;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.translate(x, y);
    if (deg) ctx.rotate(-deg * Math.PI / 180);
    ctx.scale(scX, scY);
    if (tint) {
      if (!_tintCanv) { _tintCanv = document.createElement('canvas'); _tintCtx = _tintCanv.getContext('2d'); }
      if (_tintCanv.width !== s.w || _tintCanv.height !== s.h) { _tintCanv.width = s.w; _tintCanv.height = s.h; }
      _tintCtx.globalCompositeOperation = 'source-over';
      _tintCtx.clearRect(0, 0, s.w, s.h);
      _tintCtx.drawImage(s.img, f * s.w, 0, s.w, s.h, 0, 0, s.w, s.h);
      _tintCtx.globalCompositeOperation = 'multiply';
      _tintCtx.fillStyle = tint;
      _tintCtx.fillRect(0, 0, s.w, s.h);
      _tintCtx.globalCompositeOperation = 'destination-in';
      _tintCtx.drawImage(s.img, f * s.w, 0, s.w, s.h, 0, 0, s.w, s.h);
      _tintCtx.globalCompositeOperation = 'source-over';
      ctx.drawImage(_tintCanv, -ox, -oy);
    } else {
      ctx.drawImage(s.img, f * s.w, 0, s.w, s.h, -ox, -oy, s.w, s.h);
    }
    ctx.restore();
  }

  const COLOR_MAP = { Y: '#ffff00', R: '#ff4040', B: '#38b8ff', G: '#40ff40', O: '#ffa028', W: '#ffffff' };
  function stripCodes(str) { return (str || '').replace(/\\[YRBOGW]/g, ''); }

  // Character-specific Undertale font stacks (both English pixel fonts & distinct CJK pairings!)
  function getCharFontSpec(who, size, isCJK) {
    const px = isCJK ? Math.round(size * 0.84) : Math.round(size);
    if (who === 'sans') {
      return isCJK
        ? `600 ${px}px "UT Comic Sans", "Comic Sans MS", "PingFang TC", "Microsoft JhengHei UI", cursive, sans-serif`
        : `${Math.round(size * 0.96)}px "UT Comic Sans", "Comic Sans MS", cursive, sans-serif`;
    }
    if (who === 'papyrus') {
      return isCJK
        ? `bold ${Math.round(size * 0.88)}px "UT Papyrus", "Papyrus", "Kaiti TC", "DFKai-SB", "STKaiti", serif`
        : `${Math.round(size * 1.02)}px "UT Papyrus", "Papyrus", fantasy, serif`;
    }
    if (who === 'toriel' || who === 'asgore') {
      return isCJK
        ? `600 ${px}px "Determination Sans", "Songti TC", "PMingLiU", "Noto Serif CJK TC", serif`
        : `${px}px "Determination Sans", "Georgia", serif`;
    }
    if (who === 'undyne' || who === 'undying') {
      return isCJK
        ? `900 ${px}px "Determination Sans", "Noto Sans CJK TC", "Microsoft JhengHei", sans-serif`
        : `bold ${px}px "Determination Sans", "Determination Mono", sans-serif`;
    }
    if (who === 'flowey' || who === 'asrielboss') {
      return isCJK
        ? `bold ${px}px "Determination Mono", "Noto Sans Mono CJK TC", monospace`
        : `${px}px "Determination Mono", monospace`;
    }
    if (who === 'alphys') {
      return isCJK
        ? `500 ${Math.round(size * 0.82)}px "Determination Mono", "PingFang TC", monospace`
        : `${Math.round(size * 0.94)}px "Determination Mono", monospace`;
    }
    return isCJK
      ? `bold ${px}px "Determination Mono", "Noto Sans Mono CJK TC", "PingFang TC", "Microsoft JhengHei", monospace`
      : `${px}px "Determination Mono", monospace`;
  }

  // Tokenize rich text into colored characters, then wrap to maxWidth & auto-shrink to fit maxHeight!
  function layoutRichLines(ctx, rawText, fontFn, size, maxW) {
    ctx.font = fontFn(size);
    const lines = [[]];
    let col = null;
    let curW = 0;

    // Split by explicit newlines first, then wrap words/CJK chars cleanly
    let i = 0;
    const tokens = [];
    while (i < rawText.length) {
      if (rawText[i] === '\\' && COLOR_MAP[rawText[i + 1]]) {
        col = COLOR_MAP[rawText[i + 1]];
        i += 2;
        continue;
      }
      const ch = rawText[i];
      if (ch === '\n') { tokens.push({ nl: true }); i++; continue; }
      // Group ASCII word (non-space, non-CJK) so words wrap cleanly without mid-word breaks
      if (ch !== ' ' && ch.charCodeAt(0) < 0x2E80) {
        let word = [];
        while (i < rawText.length) {
          if (rawText[i] === '\\' && COLOR_MAP[rawText[i + 1]]) { col = COLOR_MAP[rawText[i + 1]]; i += 2; continue; }
          const c2 = rawText[i];
          if (c2 === '\n' || c2 === ' ' || c2.charCodeAt(0) >= 0x2E80) break;
          word.push({ ch: c2, col });
          i++;
        }
        tokens.push({ word });
      } else {
        tokens.push({ word: [{ ch, col }] });
        i++;
      }
    }

    for (const tk of tokens) {
      if (tk.nl) {
        lines.push([]);
        curW = 0;
        continue;
      }
      let wPx = 0;
      for (const g of tk.word) {
        g.w = ctx.measureText(g.ch).width;
        wPx += g.w;
      }
      if (curW > 0 && curW + wPx > maxW) {
        // Trim leading space on wrapped line
        if (tk.word.length === 1 && tk.word[0].ch === ' ') continue;
        lines.push([]);
        curW = 0;
      }
      // If a single long token exceeds maxW, split character-by-character
      if (wPx > maxW) {
        for (const g of tk.word) {
          if (curW > 0 && curW + g.w > maxW) { lines.push([]); curW = 0; }
          lines[lines.length - 1].push(g);
          curW += g.w;
        }
      } else {
        for (const g of tk.word) lines[lines.length - 1].push(g);
        curW += wPx;
      }
    }
    return lines;
  }

  function drawRichText(ctx, rawText, x, y, maxChars = 9999, opts = {}) {
    if (!rawText) return;
    let text = String(rawText);
    const who = opts.who || '';
    const isCJK = /[^\x00-\x7F]/.test(stripCodes(text).replace(/[∞★♥]/g, ''));
    // Canonical Sans lowercase style in English!
    if (who === 'sans' && !isCJK && !opts.keepCase) text = text.toLowerCase();

    let size = opts.size || 26;
    const lineRatio = opts.lineH ? (opts.lineH / size) : 1.28;
    const baseCol = opts.color || '#ffffff';
    // Never allow text to exceed the 640px canvas width (or explicit box maxWidth)!
    const maxW = opts.maxWidth || Math.max(64, 626 - x);
    const maxH = opts.maxHeight || Math.max(36, 474 - y);
    const minSize = opts.minSize || 13;
    const fontFn = (sz) => getCharFontSpec(who, sz, isCJK);

    ctx.textBaseline = 'top';
    let lines = layoutRichLines(ctx, text, fontFn, size, maxW);
    let lineH = Math.round(size * lineRatio);

    // Auto-scale font size down if wrapped lines would exceed maxHeight!
    while (size > minSize && lines.length * lineH > maxH + 4) {
      size -= 1.5;
      lineH = Math.round(size * lineRatio);
      lines = layoutRichLines(ctx, text, fontFn, size, maxW);
    }

    ctx.font = fontFn(size);
    const jitter = (who === 'flowey' && (opts.expr === 'evil' || opts.expr === 'pissed')) || opts.jitter;
    let count = 0;
    for (let li = 0; li < lines.length && count < maxChars; li++) {
      let cx = x;
      const cy = y + li * lineH;
      const ln = lines[li];
      for (let gi = 0; gi < ln.length && count < maxChars; gi++) {
        const g = ln[gi];
        ctx.fillStyle = g.col || baseCol;
        const jx = jitter ? (Math.random() - 0.5) * 1.4 : 0;
        const jy = jitter ? (Math.random() - 0.5) * 1.4 : 0;
        ctx.fillText(g.ch, Math.round(cx + jx), Math.round(cy + jy));
        cx += g.w;
        count++;
      }
      count++; // account for line break in typewriter budget
    }
  }

  class UTSoundEngine {
    constructor() {
      this.ctx = null;
      this.buffers = {};
      this.decodedKeys = new Set();
      this.muted = false;
      this.bgmName = null;
      this.bgmAudio = null;
      this.bgmVol = 0.5;
      this.bgmCache = {};
    }
    _decodeDict(dict) {
      if (!this.ctx || !dict) return;
      for (const [k, b64] of Object.entries(dict)) {
        if (this.decodedKeys.has(k)) continue;
        this.decodedKeys.add(k);
        try {
          const bin = atob(b64);
          const arr = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
          this.ctx.decodeAudioData(arr.buffer.slice(0), buf => { this.buffers[k] = buf; }, () => {});
        } catch {}
      }
    }
    unlock() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      this._decodeDict(window.UT_SFX_B64);
      this._decodeDict(window.UT_ASRIEL_SFX);
      this._decodeDict(window.UT_UNDYNE_SFX);
      if (this.bgmAudio && !this.muted && this.bgmAudio.paused && this.bgmName) {
        this.bgmAudio.play().catch(() => {});
      }
    }
    sfx(name, vol = 0.55, rate = 1.0) {
      if (this.muted || !this.ctx) return;
      const buf = this.buffers[name];
      if (buf) {
        const src = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();
        src.buffer = buf;
        src.playbackRate.value = rate;
        gain.gain.value = vol;
        src.connect(gain);
        gain.connect(this.ctx.destination);
        src.start(0);
      } else {
        const osc = this.ctx.createOscillator(), g = this.ctx.createGain();
        osc.type = 'square'; osc.frequency.value = name === 'hurt' ? 140 : 380;
        g.gain.setValueAtTime(0.04, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);
        osc.connect(g); g.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.07);
      }
    }
    voice(who, expr) {
      if (who === 'toriel') this.sfx('txttor', 0.5, 0.98 + Math.random() * 0.05);
      else if (who === 'sans') this.sfx('txtsans', 0.52, 0.97 + Math.random() * 0.05);
      else if (who === 'papyrus') this.sfx('txtpap', 0.52, 0.98 + Math.random() * 0.06);
      else if (who === 'asriel') this.sfx('txtasr', 0.54, 0.97 + Math.random() * 0.06);
      else if (who === 'asrielboss') this.sfx('txtasr2', 0.56, 0.96 + Math.random() * 0.07);
      else if (who === 'undying') this.sfx('txtund_h', 0.54, 0.96 + Math.random() * 0.07);
      else if (who === 'undyne') this.sfx('txtund', 0.52, 0.97 + Math.random() * 0.05);
      else if (who === 'alphys') this.sfx('txtal', 0.5, 0.97 + Math.random() * 0.05);
      else if (who === 'asgore') this.sfx('txtasg', 0.54, 0.97 + Math.random() * 0.05);
      else if (who === 'flowey') {
        const evil = expr === 'evil' || expr === 'laugh' || expr === 'pissed';
        this.sfx(evil ? 'txtflw2' : 'txtflw', 0.5, 0.96 + Math.random() * 0.08);
      } else if (who === 'intro') this.sfx('txt2', 0.4, 0.92);
      else this.sfx('txt1', 0.42, 0.98 + Math.random() * 0.05);
    }
    playBGM(name, loop = true, vol = 0.5) {
      this.bgmVol = vol;
      if (this.bgmName === name) {
        if (this.bgmAudio) this.bgmAudio.volume = this.muted ? 0 : vol;
        return;
      }
      this.stopBGM();
      this.bgmName = name;
      if (!name) return;
      let a = this.bgmCache[name];
      if (!a) {
        a = new Audio(`assets/bgm/${name}.mp3`);
        a.preload = 'auto';
        this.bgmCache[name] = a;
      }
      a.loop = loop;
      a.volume = this.muted ? 0 : vol;
      a.currentTime = 0;
      this.bgmAudio = a;
      if (!this.muted) a.play().catch(() => {});
    }
    setBGMVolume(vol) {
      this.bgmVol = Math.max(0, Math.min(1, vol));
      if (this.bgmAudio && !this.muted) this.bgmAudio.volume = this.bgmVol;
    }
    stopBGM() {
      if (this.bgmAudio) { this.bgmAudio.pause(); this.bgmAudio.currentTime = 0; }
      this.bgmAudio = null;
      this.bgmName = null;
    }
    setMuted(m) {
      this.muted = m;
      if (this.bgmAudio) {
        this.bgmAudio.volume = m ? 0 : (this.bgmVol || 0.5);
        if (!m && this.bgmName && this.bgmAudio.paused) this.bgmAudio.play().catch(() => {});
      }
    }
  }

  // =========================================================================
  // FLOWEY TUTORIAL BATTLE (640x480)
  // =========================================================================
  const FLW_FACE = { normal: 0, wink: 1, side: 2, pissed: 3, evil: 4, hurt: 5, laugh: 6 };

  function createFloweyBattle(G) {
    return {
      phase: 'intro', wave: 0, timer: 0, shake: 0, invuln: 0,
      soulX: 320, soulY: 332,
      box: { x: 228, y: 256, w: 184, h: 152 },
      flwX: 320, flwY: 138, flwVx: 0, expr: 'normal',
      pellets: [], fireball: null,
      q: [], qi: 0, qc: 0, qt: 0,

      start() {
        this.phase = 'intro'; this.wave = 0; this.timer = 0; this.shake = 0; this.invuln = 0;
        this.soulX = 320; this.soulY = 332;
        this.flwX = 320; this.flwY = 138; this.flwVx = 0; this.expr = 'normal';
        this.pellets = []; this.fireball = null;
        G.sfx.playBGM('flowey');
        this.queue(G.D().floweyBattle.intro);
      },
      queue(arr) {
        this.q = arr; this.qi = 0; this.qc = 0; this.qt = 0;
        if (arr[0] && arr[0].expr) this.expr = arr[0].expr;
      },
      confirm() {
        if (!this.q.length) return;
        const cur = this.q[this.qi];
        const plain = stripCodes(cur.text);
        if (this.qc < plain.length) { this.qc = plain.length; return; }
        this.qi++;
        if (this.qi < this.q.length) {
          this.qc = 0; this.qt = 0;
          if (this.q[this.qi].expr) this.expr = this.q[this.qi].expr;
        } else {
          this.q = [];
          if (this.phase === 'intro') this.spawnWave(1.0);
          else if (this.phase === 'wave') this.spawnWave(this.wave === 1 ? 1.3 : 1.65);
          else if (this.phase === 'evil_dlg') this.spawnRing();
        }
      },
      skip() {
        if (this.q.length) this.qc = stripCodes(this.q[this.qi].text).length;
      },
      spawnWave(mul) {
        this.pellets = [];
        for (let i = 0; i < 5; i++) {
          this.pellets.push({ x: 236 + i * 42, y: 196 + Math.abs(i - 2) * 10, vx: 0, vy: 0, delay: 24 + i * 5, spd: 3.1 * mul, go: false });
        }
        this.timer = 0; this.phase = 'wave';
      },
      spawnRing() {
        this.pellets = [];
        G.sfx.sfx('flwlaugh', 0.6);
        for (let i = 0; i < 18; i++) {
          const ang = (Math.PI * 2 * i) / 18;
          this.pellets.push({ ang, r: 146, x: this.soulX + Math.cos(ang) * 146, y: this.soulY + Math.sin(ang) * 146 });
        }
        this.timer = 0; this.phase = 'ring';
      },
      update(keys) {
        if (this.shake > 0) this.shake--;
        if (this.invuln > 0) this.invuln--;
        if (this.phase === 'wave' || this.phase === 'ring') {
          let dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
          let dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
          if (dx && dy) { dx *= 0.75; dy *= 0.75; }
          const ramp = keys.moveScale != null ? keys.moveScale : 1;
          const spd = (keys.cancel ? 1.15 : 2.25) * ramp;
          this.soulX = Math.max(this.box.x + 12, Math.min(this.box.x + this.box.w - 12, this.soulX + dx * spd));
          this.soulY = Math.max(this.box.y + 12, Math.min(this.box.y + this.box.h - 12, this.soulY + dy * spd));
        }
        if (this.q.length) {
          const cur = this.q[this.qi], plain = stripCodes(cur.text);
          if (this.qc < plain.length) {
            this.qt++;
            if (this.qt >= 2) {
              this.qt = 0; this.qc++;
              const ch = plain[this.qc - 1];
              if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('flowey', cur.expr);
            }
          }
          return;
        }
        if (this.phase === 'wave') {
          this.timer++;
          let alive = 0;
          for (const p of this.pellets) {
            if (!p.go) {
              if (--p.delay <= 0) {
                p.go = true;
                const a = Math.atan2(this.soulY - p.y, this.soulX - p.x);
                p.vx = Math.cos(a) * p.spd; p.vy = Math.sin(a) * p.spd;
              }
              alive++;
            } else {
              p.x += p.vx; p.y += p.vy;
              if (p.x > -30 && p.x < 670 && p.y > -30 && p.y < 510) alive++;
              if (Math.hypot(p.x - this.soulX, p.y - this.soulY) < 13 && !this.invuln) {
                if (G.noHitShield || window.UT_NO_HIT_SHIELD) {
                  this.invuln = 28; G.sfx.sfx('bell', 0.45);
                  continue;
                }
                G.state.hp = 1; this.shake = 22; this.invuln = 40;
                G.sfx.stopBGM(); G.sfx.sfx('hurt', 0.75);
                this.phase = 'evil_dlg'; this.pellets = [];
                this.queue(G.D().floweyBattle.evilHit);
                return;
              }
            }
          }
          if (!alive && this.timer > 60) {
            this.wave++;
            if (this.wave === 1) this.queue(G.D().floweyBattle.dodge1);
            else if (this.wave === 2) this.queue(G.D().floweyBattle.dodge2);
            else {
              G.sfx.stopBGM(); this.phase = 'evil_dlg'; this.pellets = [];
              this.queue(G.D().floweyBattle.evilDodge);
            }
          }
        } else if (this.phase === 'ring') {
          this.timer++;
          for (const p of this.pellets) {
            p.ang += 0.011;
            if (p.r > 32) p.r -= 0.85;
            p.x = this.soulX + Math.cos(p.ang) * p.r;
            p.y = this.soulY + Math.sin(p.ang) * p.r;
          }
          if (this.timer === 120) { this.pellets = []; G.state.hp = G.state.maxHp; G.sfx.sfx('heal', 0.75); this.expr = 'hurt'; }
          if (this.timer === 158) { this.phase = 'fireball'; this.fireball = { x: 610, y: this.flwY }; G.sfx.sfx('power', 0.7); }
        } else if (this.phase === 'fireball') {
          this.fireball.x -= 12;
          if (this.fireball.x <= this.flwX + 16 && !this.flwVx) { this.flwVx = -14; this.shake = 16; G.sfx.sfx('damage', 0.8); }
          if (this.flwVx) { this.flwX += this.flwVx; this.flwY -= 3; }
          if (this.flwX < -80) G.finishFloweyRescue();
        }
      },
      render(ctx, time) {
        ctx.save();
        if (this.shake > 0) ctx.translate((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);

        const bob = Math.sin(time * 0.1) * 3;
        const fi = FLW_FACE[this.expr] ?? 0;
        const ff = SPR['flowey_faces'];
        if (ff && ff.img.complete && ff.img.naturalWidth) {
          ctx.drawImage(ff.img, fi * 27, 0, 27, 29, Math.round(this.flwX - 54), Math.round(this.flwY - 58 + bob), 108, 116);
        } else {
          drawSpr(ctx, 'spr_flowey', Math.floor(time / 15) % 2, this.flwX - 42, this.flwY - 42, 4, 4);
        }

        if (this.fireball) {
          drawSpr(ctx, 'spr_torielflame', Math.floor(time / 4), this.fireball.x - 32, this.fireball.y - 32, 2, 2);
        }

        if (this.q.length) {
          const cur = this.q[this.qi];
          ctx.fillStyle = '#fff';
          ctx.fillRect(386, 44, 236, 134);
          ctx.beginPath(); ctx.moveTo(386, 94); ctx.lineTo(370, 104); ctx.lineTo(386, 114); ctx.fill();
          drawRichText(ctx, cur.text, 398, 54, this.qc, { size: 19, lineH: 24, color: '#000000', who: 'flowey', expr: cur.expr, maxWidth: 214, maxHeight: 116 });
        }

        ctx.fillStyle = '#000'; ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeRect(this.box.x, this.box.y, this.box.w, this.box.h);

        if (!this.invuln || Math.floor(this.invuln / 4) % 2 === 0) {
          drawSpr(ctx, 'spr_heart', 0, this.soulX - 8, this.soulY - 8, 1, 1);
        }
        if (G.noHitShield || window.UT_NO_HIT_SHIELD) {
          ctx.save(); ctx.strokeStyle = 'rgba(80,235,255,0.85)'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(this.soulX, this.soulY, 14, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        }
        const pel = SPR['pellet'];
        for (const p of this.pellets) {
          if (pel && pel.img.complete) {
            const pf = Math.floor(time / 4) % 2;
            ctx.drawImage(pel.img, pf * 10, 0, 10, 10, Math.round(p.x - 9), Math.round(p.y - 9), 18, 18);
          } else {
            ctx.fillStyle = '#fff'; ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
          }
        }
        drawBattleHUD(ctx, G.state, 430);
        ctx.restore();
      }
    };
  }

  function drawBattleHUD(ctx, st, y = 400) {
    drawRichText(ctx, `${st.name}   LV ${st.lv}`, 32, y, 999, { size: 24 });
    drawRichText(ctx, 'HP', 244, y + 2, 999, { size: 20, color: '#ffff00' });
    const barW = Math.max(44, Math.min(180, st.maxHp * 2.1));
    ctx.fillStyle = '#c00000'; ctx.fillRect(280, y + 2, barW, 21);
    ctx.fillStyle = '#ffff00'; ctx.fillRect(280, y + 2, Math.max(0, Math.round(barW * (Math.min(st.hp, st.maxHp) / st.maxHp))), 21);
    drawRichText(ctx, `${st.hp} / ${st.maxHp}`, 290 + barW, y, 999, { size: 23 });
    if (window.UT_NO_HIT_SHIELD) {
      drawRichText(ctx, 'SHIELD', 536, y + 2, 999, { size: 18, color: '#58e8ff' });
    }
  }

  // Undertale Canonical EXP -> LOVE Table
  const LV_THRESHOLDS = [0, 10, 30, 70, 120, 200, 300, 500, 800, 1200, 1700, 2500];

  // =========================================================================
  // FULL UNDERTALE 1:1 RPG BATTLE ENGINE (640x480 native)
  // =========================================================================
  function createRPGBattle(G) {
    return {
      id: 'froggit', m: null, hp: 30, prevHp: 30, maxHp: 30, spare: false, turns: 0,
      menu: 'main', // main | target | fight_bar | glove_mash | slash | boss_death_dlg | act | item | mercy | msg | dodge | flee | vapor | gameover | nobody
      cur: 0, sub: 0, msg: '', mc: 0, nextState: 'main',
      bubble: '', bubTimer: 0,
      barX: 46, barDir: 1, barSpd: 8.6, isCrit: false, targetScale: 1,
      gloveCount: 0, gloveTick: 0, punches: [],
      slashTick: 0, lastDmg: 0, dmgY: 0, dmgVy: 0, monsterShake: 0,
      box: { x: 32, y: 250, w: 575, h: 140 },
      targetBox: { x: 32, y: 250, w: 575, h: 140 },
      soulX: 320, soulY: 320, soulVy: 0, soulMoving: false, blueSoul: false,
      invuln: 0, shake: 0,
      bullets: [], handSweep: null, timer: 0, patternIdx: 0,
      dapperHat: false, greenDinner: false, neckLen: 0, actStep: 0,
      bossDeathLines: [], bossDeathIdx: 0, papDecap: false,
      dustParticles: [],
      fleeX: 0, vaporTick: 0, goTick: 0, shards: [], onEnd: null, outcome: 'spared',

      start(enemyId, onEnd) {
        this.onEnd = onEnd;
        this.box = { x: 32, y: 250, w: 575, h: 140 };
        this.targetBox = { x: 32, y: 250, w: 575, h: 140 };
        this.bullets = []; this.invuln = 0; this.shake = 0; this.monsterShake = 0;
        this.blueSoul = false; this.soulVy = 0; this.papDecap = false;
        this.dustParticles = []; this.handSweep = null;

        // Genocide "But nobody came." encounter!
        if (enemyId === 'nobody') {
          this.id = 'nobody';
          this.m = window.UT_MONSTERS.froggit;
          this.menu = 'nobody';
          this.msg = G.lang === 'zh' ? '\\R* 但是誰也沒有來。' : '\\R* But nobody came.';
          this.mc = 0;
          G.sfx.playBGM('toomuch');
          return;
        }

        const M = window.UT_MONSTERS[enemyId] || window.UT_MONSTERS.froggit;
        this.id = enemyId; this.m = M;
        this.hp = M.hp; this.prevHp = M.hp; this.maxHp = M.maxHp;
        this.spare = !!M.spareStart;
        this.turns = 0; this.patternIdx = 0;
        this.dapperHat = false; this.greenDinner = false; this.neckLen = 0; this.actStep = 0;
        this.menu = 'main'; this.cur = 0; this.sub = 0;
        this.msg = G.lang === 'zh' ? M.encounterZh : M.encounterEn;
        this.mc = 0; this.bubble = ''; this.bubTimer = 0;

        // In Snowdin Genocide, Papyrus immediately spares you with open arms!
        if (enemyId === 'papyrus' && G.isGenocideSnowdin?.()) {
          this.spare = true;
          this.msg = G.lang === 'zh'
            ? '* 帕派瑞斯正對你敞開雙臂，\n  毫無防備地打算寬恕你。'
            : '* Papyrus is sparing you\n  with open arms.';
          this.bubble = G.lang === 'zh' ? '我相信你能\n做得更好！' : 'I BELIEVE\nIN YOU!';
          this.bubTimer = 300;
          G.sfx.stopBGM();
        } else {
          G.sfx.playBGM(M.bgm);
        }
      },

      move(dir) {
        if (this.menu === 'main') {
          if (dir === 'left' || dir === 'right') {
            this.cur = (this.cur + (dir === 'left' ? 3 : 1)) % 4;
            G.sfx.sfx('squeak', 0.5);
          }
        } else if (this.menu === 'act') {
          const n = this.m.acts.length;
          if (n > 1) {
            if (dir === 'left' || dir === 'right') this.sub ^= 1;
            else if (dir === 'up' || dir === 'down') this.sub = (this.sub + 2) % n;
            if (this.sub >= n) this.sub = n - 1;
            G.sfx.sfx('squeak', 0.5);
          }
        } else if (this.menu === 'item') {
          const n = G.state.items.length;
          if (n > 1) {
            this.sub = (this.sub + (dir === 'up' || dir === 'left' ? -1 : 1) + n) % n;
            G.sfx.sfx('squeak', 0.5);
          }
        } else if (this.menu === 'mercy') {
          const canFlee = !['toriel', 'papyrus', 'doggo', 'dogi', 'greaterdog'].includes(this.id);
          if (canFlee && (dir === 'up' || dir === 'down')) {
            this.sub ^= 1; G.sfx.sfx('squeak', 0.5);
          }
        }
      },

      cancel() {
        if (this.menu === 'msg' || this.menu === 'nobody') { this.mc = stripCodes(this.msg).length; return; }
        if (['target', 'act', 'item', 'mercy'].includes(this.menu)) {
          this.menu = 'main'; G.sfx.sfx('squeak', 0.5);
        }
      },

      showMsg(txt, next = 'dodge', bub = '') {
        this.msg = txt; this.mc = 0; this.menu = 'msg'; this.nextState = next;
        this.targetBox = { x: 32, y: 250, w: 575, h: 140 };
        if (bub) { this.bubble = bub; this.bubTimer = 175; }
      },

      confirm() {
        const zh = G.lang === 'zh';
        const mName = zh ? this.m.nameZh : this.m.nameEn;

        if (this.menu === 'gameover') {
          if (this.goTick > 110) G.reloadFromSave();
          return;
        }
        if (this.menu === 'nobody') {
          const plain = stripCodes(this.msg);
          if (this.mc < plain.length) { this.mc = plain.length; return; }
          this.finish('nobody');
          return;
        }
        if (this.menu === 'boss_death_dlg') {
          this.bossDeathIdx++;
          if (this.bossDeathIdx < this.bossDeathLines.length) {
            this.bubble = this.bossDeathLines[this.bossDeathIdx];
            this.bubTimer = 999;
            G.sfx.voice(this.id === 'papyrus' ? 'papyrus' : 'toriel');
          } else {
            this.bubble = '';
            this.startVaporize();
          }
          return;
        }
        if (this.menu === 'msg') {
          const plain = stripCodes(this.msg);
          if (this.mc < plain.length) { this.mc = plain.length; return; }
          if (this.nextState === 'win') { this.finish(this.outcome); return; }
          if (this.nextState === 'vapor') { this.startVaporize(); return; }
          if (this.nextState === 'flee') { this.menu = 'flee'; this.fleeX = 68; G.sfx.sfx('escaped', 0.7); return; }
          if (this.nextState === 'dodge') { this.beginDodge(); return; }
          this.menu = 'main';
          const idle = zh ? this.m.idleZh : this.m.idleEn;
          this.msg = idle[this.turns % idle.length]; this.mc = 0;
          return;
        }
        if (this.menu === 'main') {
          G.sfx.sfx('select', 0.55);
          if (this.cur === 0) { this.menu = 'target'; }
          else if (this.cur === 1) { this.menu = 'act'; this.sub = 0; }
          else if (this.cur === 2) {
            if (!G.state.items.length) return;
            this.menu = 'item'; this.sub = 0;
          } else if (this.cur === 3) { this.menu = 'mercy'; this.sub = 0; }
          return;
        }
        if (this.menu === 'target') {
          G.sfx.sfx('select', 0.55);
          this.menu = 'fight_bar';
          this.barDir = Math.random() < 0.5 ? 1 : -1;
          this.barX = this.barDir > 0 ? 44 : 596;
          this.targetScale = 0.25;
          return;
        }
        if (this.menu === 'fight_bar') {
          const dist = Math.abs(this.barX - 320);
          this.isCrit = dist <= 16;
          const acc = this.isCrit ? 1.32 : Math.max(0.22, 1.05 - dist / 280);
          const wAtk = (window.UT_ITEMS[G.state.weapon]?.atk || 0) + G.state.atk;
          let dmg = Math.max(5, Math.round((wAtk - this.m.def * 0.35 + 14) * acc * 1.55));

          // Genocide / Betrayal Critical Strikes (1:1 Undertale numbers!)
          if (this.id === 'toriel' && (G.isGenocideRuins?.() || this.turns >= 12 || this.hp < 140)) {
            dmg = G.isGenocideRuins?.() ? 22424 : 9999;
            this.isCrit = true;
          } else if (this.id === 'papyrus' && (G.isGenocideSnowdin?.() || this.spare)) {
            dmg = 41800;
            this.isCrit = true;
          } else if (['doggo', 'dogi', 'greaterdog'].includes(this.id) && G.isGenocideSnowdin?.()) {
            dmg = 999;
            this.isCrit = true;
          } else if (this.id === 'blook') {
            dmg = 10;
          }
          this.lastDmg = dmg;

          // Tough Glove 4-punch mash mechanic!
          if (G.state.weapon === 'ToughGlove') {
            this.menu = 'glove_mash';
            this.gloveCount = 1;
            this.gloveTick = 0;
            this.punches = [{ x: 320 + (Math.random() - 0.5) * 44, y: 110 + (Math.random() - 0.5) * 34, t: 12 }];
            G.sfx.sfx('damage', 0.65, 1.15);
            return;
          }

          this.menu = 'slash'; this.slashTick = 0;
          G.sfx.sfx('laz', this.isCrit ? 0.9 : 0.75, this.isCrit ? 1.06 : 1.0);
          return;
        }
        if (this.menu === 'glove_mash') {
          if (this.gloveCount < 4) {
            this.gloveCount++;
            this.punches.push({ x: 320 + (Math.random() - 0.5) * 56, y: 110 + (Math.random() - 0.5) * 44, t: 12 });
            G.sfx.sfx('damage', 0.72, 1.1 + this.gloveCount * 0.08);
            this.lastDmg = Math.round(this.lastDmg * 1.12);
            if (this.gloveCount === 4) {
              this.menu = 'slash'; this.slashTick = 12;
            }
          }
          return;
        }
        if (this.menu === 'act') {
          G.sfx.sfx('select', 0.55);
          const act = this.m.acts[this.sub].id;
          this.handleAct(act);
          return;
        }
        if (this.menu === 'item') {
          const key = G.state.items[this.sub];
          const it = window.UT_ITEMS[key];
          if (it.type === 'weapon') {
            const old = G.state.weapon; G.state.weapon = key; G.state.items[this.sub] = old;
            G.sfx.sfx('select', 0.6);
            this.showMsg(zh ? `* 你裝備了${it.zh}！` : `* You equipped the ${it.en}.`, 'dodge');
          } else if (it.type === 'armor') {
            const old = G.state.armor; G.state.armor = key; G.state.items[this.sub] = old;
            G.sfx.sfx('select', 0.6);
            this.showMsg(zh ? `* 你穿戴了${it.zh}！` : `* You put on the ${it.en}.`, 'dodge');
          } else {
            if (it.nextItem) G.state.items[this.sub] = it.nextItem;
            else G.state.items.splice(this.sub, 1);
            G.state.hp = Math.min(G.state.maxHp, G.state.hp + it.hp);
            G.sfx.sfx('heal', 0.75);
            const maxed = G.state.hp >= G.state.maxHp;
            this.showMsg(zh
              ? `* 你吃下了${it.zh}。\n* ${maxed ? 'HP 完全恢復了！' : `恢復了 ${it.hp} 點 HP！`}`
              : `* You ate the ${it.en}.\n* ${maxed ? 'Your HP was maxed out.' : `You recovered ${it.hp} HP!`}`, 'dodge');
          }
          return;
        }
        if (this.menu === 'mercy') {
          G.sfx.sfx('select', 0.55);
          if (this.sub === 1) {
            this.outcome = 'fled';
            this.showMsg(zh ? '* 我閃人了……' : "* Escaped...", 'flee');
            return;
          }
          if (this.id === 'toriel') {
            this.advanceTorielSpare();
            return;
          }
          if (this.id === 'papyrus' && !this.spare) {
            this.turns++;
            if (this.turns >= 9) {
              this.spare = true;
              this.outcome = 'spared';
              this.showMsg(zh
                ? '* 帕派瑞斯喘著氣停下了攻擊！\n* 「呼……呼……我放棄抓你了，人類！」'
                : "* Papyrus is huffing and puffing!\n* He decides to spare you!", 'win', 'HUFF... PUFF...\nI GIVE UP!!');
            } else {
              this.showMsg(zh ? '* 你選擇不攻擊帕派瑞斯。' : "* You spare Papyrus.", 'dodge', this.getPapyrusBubble());
            }
            return;
          }
          if (this.spare) {
            const g = this.m.gold;
            G.state.gold += g;
            this.outcome = 'spared';
            this.showMsg(zh ? `* 戰鬥勝利！\n* 獲得 0 EXP 與 ${g} 金幣。` : `* YOU WON!\n* You earned 0 EXP and ${g} gold.`, 'win');
          } else {
            this.turns++;
            if (this.id === 'dummy' && this.turns >= 4) {
              this.outcome = 'fled';
              this.showMsg(zh ? '* 假人覺得太無聊，自己飄走了。' : "* Dummy tires of your aimless\n  shenanigans and floats away.", 'win');
            } else {
              this.showMsg(zh ? `* 你選擇寬恕 ${mName}，\n  但對方的名字還沒變黃色。` : `* You spared ${mName},\n  but its name wasn't yellow.`, 'dodge');
            }
          }
        }
      },

      getPapyrusBubble() {
        const zh = G.lang === 'zh';
        const linesEn = [
          "YOU'RE BLUE NOW!\nTHAT'S MY ATTACK!\nNYEH HEH HEH!",
          "PRESS [UP] TO\nJUMP OVER MY\nFAMOUS BONES!!",
          "BLUE BONES WON'T\nHURT IF YOU\nSTAND STILL!!",
          "CAPTURED YOU!!\nWAIT, YOU JUMPED\nOVER IT!?",
          "BEHOLD! MY\nSPECIAL 'COOL\nDUDE' ATTACK!!",
          "ALMOST AT MY\nLIMIT... NO!!\nPAPYRUS NEVER\nTIRES!!",
          "WHY ARE YOU\nBEING SO NICE\nTO ME!?",
          "ONE FINAL BONE\nGAUNTLET!!"
        ];
        const linesZh = [
          "你現在變成藍色了！\n這就是我的必殺技！\n喔呵呵呵呵！",
          "按 [上方向鍵] 就能\n跳過我著名的骨頭！",
          "看到藍色骨頭時，\n只要站著不動\n就不會受傷喔！",
          "抓到你了！！\n咦，你居然跳過去了！？",
          "見識我的王牌——\n「COOL DUDE」\n酷哥骨頭海吧！！",
          "呼……呼……\n本大爺才不會累呢！",
          "為什麼你一直\n不肯攻擊我！？",
          "接招吧！最後一波\n骨頭大進擊！！"
        ];
        const arr = zh ? linesZh : linesEn;
        return arr[Math.min(arr.length - 1, this.turns - 1)];
      },

      handleAct(act) {
        const zh = G.lang === 'zh';
        const m = this.m;
        if (act === 'check') {
          const stat = `* ${(zh ? m.nameZh : m.nameEn).toUpperCase()} - AT ${m.atk} DF ${m.def}\n`;
          const desc = {
            dummy: zh ? '* 棉花心臟與鈕扣眼睛。\n* 托麗爾最喜歡的人偶。' : "* A cotton heart and a button eye.\n* You are the apple of my eye.",
            froggit: zh ? '* 生活對這隻青蛙來說很不容易。' : "* Life is difficult for this\n  enemy.",
            whimsun: zh ? '* 膽小到連攻擊都不太敢看你。' : "* This monster is too sensitive\n  to fight.",
            moldsmal: zh ? '* 刻板印象：豐滿而沒有大腦。' : "* Stereotypical: Curvaceously\n  attractive, but no brains...",
            loox: zh ? '* 別欺負牠！牠也有家人喔。' : "* Don't pick on him.\n* Family name: Eyewalker.",
            vegetoid: zh ? '* 每一口都富含維他命 A！' : "* Serving Size: 1 Monster.\n* Not monitored by the USDA.",
            migosp: zh ? '* 沒有別人在旁邊時超開心！' : "* It seems evil, but it's just\n  with the wrong crowd.",
            blook: zh ? '* 這隻怪物似乎完全沒有幽默感。' : "* This monster doesn't seem to\n  have a sense of humor...",
            toriel: zh ? '* 最為你著想的遺跡看守者。' : "* Knows best for you.",
            snowdrake: zh ? '* 這位喜劇演員很希望大家笑牠的冷笑話。' : "* This comedian fights to keep\n  a captive audience.",
            icecap: zh ? '* 非常在意頭上那頂冰帽。' : "* This teen wonders why it isn't\n  named 'Ice Hat.'",
            lesserdog: zh ? '* 手上的劍和盾牌都只是玩具。\n* 超級喜歡被摸頭！' : "* Wields a stone dogger made of\n  pomeraisian granite. Loves pets!",
            gyftrot: zh ? '* 有人惡作劇在牠鹿角上掛滿了裝飾品。' : "* Some teens decorated it as a\n  prank.",
            doggo: zh ? '* 看不見靜止不動的東西！\n* 遇到\\B藍色攻擊\\W時請站著別動！' : "* Easily excited by movement.\n* CANNOT see stationary things!",
            dogi: zh ? '* 皇家衛隊的狗夫婦搭檔，嗅覺極為靈敏。' : "* Husband and wife Royal Guards.\n* They use their noses to hunt!",
            greaterdog: zh ? '* 厚重鎧甲裡面其實是一隻超愛撒嬌的小狗！' : "* It's so excited that it thinks\n  fighting is just playing!",
            papyrus: zh ? '* 最喜歡說：「喔呵呵呵呵 (NYEH HEH HEH)！」' : "* He likes to say:\n  'NYEH HEH HEH!'"
          }[this.id] || '';
          this.showMsg(stat + desc, 'dodge');
          return;
        }
        if (this.id === 'dummy') {
          this.outcome = 'spared';
          this.showMsg(zh ? '* 你親切地和假人聊天。\n* ……它似乎不擅長對話。\n* 托麗爾看起來非常開心！' : "* You talk to the DUMMY.\n* ...It doesn't seem much for\n  conversation.\n* Toriel seems happy with you!", 'win');
        } else if (this.id === 'froggit') {
          this.spare = true;
          this.showMsg(act === 'compliment'
            ? (zh ? '* 你稱讚了 Froggit。\n* 牠雖然聽不懂，但還是受寵若驚！' : "* You complimented Froggit.\n* It didn't understand what you\n  said, but was flattered anyway.")
            : (zh ? '* 你威嚇了 Froggit。\n* 牠雖然沒聽懂，但嚇得發抖！' : "* You threatened Froggit.\n* It didn't understand, but was\n  scared anyway."), 'dodge', 'Ribbit,\nribbit.');
        } else if (this.id === 'whimsun') {
          if (act === 'terrorize') {
            this.outcome = 'spared';
            this.showMsg(zh ? '* 你對 Whimsun 扮鬼臉，\n  牠哭著飛走了！' : "* You raised your arms.\n* Whimsun burst into tears and\n  ran away!", 'win');
          } else {
            this.spare = true;
            this.showMsg(zh ? '* 你溫柔安慰 Whimsun……' : "* You weren't even halfway through\n  your sentence before Whimsun\n  started apologizing.", 'dodge', "I'm sorry...");
          }
        } else if (this.id === 'moldsmal') {
          this.spare = true;
          this.showMsg(act === 'flirt'
            ? (zh ? '* 你扭了扭腰，Moldsmal 也跟著晃動。\n* 多麼富有意義的交流！' : "* You wiggle your hips.\n* Moldsmal wiggles back.\n* What a meaningful conversation!")
            : (zh ? '* 你趴在地上和 Moldsmal 一起發呆。' : "* You lie immobile with Moldsmal.\n* You feel like you understand\n  the world a little better."), 'dodge', '*Slime\nsounds*');
        } else if (this.id === 'loox') {
          if (act === 'dontpick') {
            this.spare = true;
            this.showMsg(zh ? '* 你決定不去欺負 Loox。\n* Loox 鬆了一口氣！' : "* You didn't pick on Loox.\n* Loox looks relieved!", 'dodge', 'Finally,\nsomeone\ngets it.');
          } else {
            this.showMsg(zh ? '* 你捉弄了 Loox 一番。' : "* You picked on Loox.\n* It seems upset.", 'dodge', 'Please\ndon\'t...');
          }
        } else if (this.id === 'vegetoid') {
          if (act === 'dinner') {
            this.greenDinner = true;
            this.showMsg(zh ? '* 你拍了拍肚子。\n* Vegetoid 決定請你吃綠色健康蔬菜！\n  (躲避時去吃\\G綠色蔬菜\\W！)' : "* You patted your stomach.\n* Vegetoid offers a healthy meal!\n  (Touch the \\GGREEN\\W vegetable!)", 'dodge', 'Eat Your\nGreens!');
          } else {
            this.showMsg(zh ? '* 你試著生啃一口，但牠還太硬了！' : "* You tried to eat Vegetoid,\n  but it wasn't weakened enough.", 'dodge', 'Plants\ncan\'t\ntalk!');
          }
        } else if (this.id === 'migosp') {
          this.spare = true;
          this.showMsg(zh ? '* 你稱讚了 Migosp 的舞步。\n* 牠開心地扭來扭去！' : "* You told Migosp it's cool.\n* It swings happily without a\n  care in the world!", 'dodge', 'Cha cha\nreal\nsmooth~');
        } else if (this.id === 'blook') {
          if (act === 'cheer' || act === 'flirt') {
            this.turns++;
            if (this.turns === 1) this.showMsg(zh ? '* 你對 Napstablook 露出耐心的微笑。' : "* You gave Napstablook a patient\n  smile.", 'dodge', 'heh...');
            else if (this.turns === 2) {
              this.dapperHat = true; this.spare = true;
              this.showMsg(zh ? '* Napstablook 用眼淚變出了一頂高禮帽！' : "* Napstablook wants to show you\n  something!", 'dodge', "i call it\n'dapper\nblook'...\ndo you\nlike it?");
            } else {
              this.spare = true;
              this.showMsg(zh ? '* 你大力稱讚了牠的紳士帽！' : "* You complimented Dapper Blook!\n* Napstablook is ready to leave.", 'dodge', 'oh gee...');
            }
          } else {
            this.spare = false; this.dapperHat = false;
            this.showMsg(zh ? '* 你對幽靈扮鬼臉，牠難過地哭了……' : "* You insulted Napstablook...", 'dodge', 'oh no...');
          }
        } else if (this.id === 'toriel') {
          const tMsg = this.turns === 0
            ? (zh ? '* 你想不出任何聊天話題。' : "* You couldn't think of any\n  conversation topics.")
            : (zh ? '* 諷刺的是，現在聊天似乎毫無幫助。\n* (試試持續選擇 \\YMERCY -> Spare\\W！)' : "* Ironically, talking does not\n  seem to be the solution here.");
          this.advanceTorielSpare(tMsg);
        }
        // SNOWDIN MONSTER ACTS
        else if (this.id === 'snowdrake') {
          if (act === 'laugh') {
            this.spare = true;
            this.showMsg(zh ? '* 你對 Snowdrake 的冰雪雙關笑話\n  捧腹大笑！牠超得意！' : "* You laugh at Snowdrake's pun!\n* Snowdrake is puffed up with\n  pride!", 'dodge', 'Ice to\nmeet you!');
          } else {
            this.showMsg(zh ? '* 你吐槽牠的笑話一點也不好笑。' : "* You boo Snowdrake's joke.", 'dodge', 'What?!\nThat was\nmy best\none!');
          }
        } else if (this.id === 'icecap') {
          if (act === 'ignore') {
            this.actStep++;
            this.showMsg(zh ? '* 你故意不看牠頭上的冰帽。\n* Ice Cap 急著想引起你的注意！' : "* You managed to tear your eyes\n  away from Ice Cap's hat.\n* It looks desperate for attention!", 'dodge', 'Notice\nmy hat!!');
          } else if (act === 'steal') {
            this.spare = true;
            this.showMsg(zh ? '* 你趁機把牠的冰帽摘了下來！\n* 牠變成了一顆害羞的小冰塊！' : "* You knocked off Ice Cap's hat!\n* Now it's just a harmless\n  Ice Cube!", 'dodge', 'My hat!!\nI\'m just\nice now!');
          } else {
            this.showMsg(zh ? '* 你稱讚了牠的冰帽，牠更驕傲了！' : "* You complimented its hat.\n* Its ego grew even bigger!", 'dodge', 'Too cool\nfor you!');
          }
        } else if (this.id === 'lesserdog') {
          this.neckLen++;
          this.spare = true;
          this.showMsg(zh
            ? `* 你摸了摸小犬座的頭 (第 ${this.neckLen} 次)！\n* 牠興奮得脖子越伸越長了！`
            : `* You pet Lesser Dog (${this.neckLen}x)!\n* Its neck grows longer with\n  excitement!`, 'dodge', '*Excited\ndog noises*');
        } else if (this.id === 'gyftrot') {
          if (act === 'undecorate') {
            this.actStep++;
            this.spare = true;
            this.showMsg(zh
              ? '* 你幫 Gyftrot 取下了鹿角上沉重的惡作劇裝飾！\n* 牠看起來輕鬆多了！'
              : "* You removed the prank\n  decorations from Gyftrot's\n  antlers! It looks relieved!", 'dodge', 'Finally...\nThank you.');
          } else {
            this.spare = true;
            this.showMsg(zh ? '* 你送了牠一份真誠的心意。' : "* You gave Gyftrot a nice smile.", 'dodge', 'Hmph...');
          }
        } else if (this.id === 'doggo') {
          this.spare = true;
          this.showMsg(zh
            ? '* 你摸了摸道格的頭！\n* 道格激動得跳了起來：「什麼！？我被摸了！！」'
            : "* You pet Doggo!\n* Doggo leaps in shock!", 'dodge', "WHAT!?\nI'VE BEEN\nPET!!");
        } else if (this.id === 'dogi') {
          if (act === 'roll') {
            this.actStep = Math.max(this.actStep, 1);
            this.showMsg(zh ? '* 你在雪地裡打滾，全身沾滿了小狗般的雪味！' : "* You roll around in the snow.\n* Now you smell like a weird\n  puppy!", 'dodge', 'Wait...\nWhat is\nthat smell?');
          } else if (act === 'resniff') {
            this.actStep = Math.max(this.actStep, 2);
            this.spare = true;
            this.showMsg(zh ? '* 狗夫婦重新聞了聞你……\n* 牠們把你當成迷路的小狗了！現在撫摸牠們吧！' : "* The Dogi re-sniff you...\n* They think you're a lost\n  puppy! Pet them!", 'dodge', 'Oh! Just a\nweird puppy!');
          } else if (act === 'pet') {
            this.spare = true;
            this.showMsg(zh ? '* 你同時摸了摸狗夫婦兩人的頭！\n* 牠們開心地搖尾巴！' : "* You pet both Dogamy and\n  Dogaressa! They realize dogs\n  can pet other dogs!", 'dodge', 'Dogs CAN\npet other\ndogs!!');
          }
        } else if (this.id === 'greaterdog') {
          this.actStep++;
          if (this.actStep >= 2) this.spare = true;
          const msgMap = {
            beckon: zh ? '* 你呼喚了大犬座，牠蹦蹦跳跳地湊了過來！' : "* You call Greater Dog.\n* It bounds toward you, flecks\n  of slobber flying!",
            play:   zh ? '* 你丟出一顆雪球，大犬座開心地撲了過去！' : "* You throw a snowball and\n  Greater Dog fetches it happily!",
            pet:    zh ? '* 你溫柔地摸了摸大犬座的頭！\n* 牠開心地把整個身體塞進你懷裡！' : "* You pet Greater Dog!\n* It flops into your lap\n  contentedly!"
          };
          this.showMsg(msgMap[act] || msgMap.pet, 'dodge', 'Woof!!\nWoof!!');
        } else if (this.id === 'papyrus') {
          this.turns++;
          if (act === 'flirt') {
            this.showMsg(zh
              ? '* 你向帕派瑞斯提出約會請求！\n* 「什麼！？你在跟我告白嗎！？等我抓到你我們就去約會！！」'
              : "* You flirt with Papyrus!\n* He blushes furiously and agrees\n  to hang out after the battle!", 'dodge', 'W-WHAT!?\nA DATE WITH\nME!? NYEH!!');
          } else {
            this.showMsg(zh
              ? '* 你挑釁了帕派瑞斯。\n* 他反而當成了對他的讚美！'
              : "* You insult Papyrus.\n* He takes it as a compliment!", 'dodge', this.getPapyrusBubble());
          }
        }
      },

      advanceTorielSpare(customMsg = null) {
        const lines = G.D().torielSpareLines;
        const idx = Math.min(lines.length - 1, this.turns);
        this.turns++;
        const bub = lines[idx];
        if (this.turns >= lines.length) {
          this.spare = true;
          this.outcome = 'spared';
          this.showMsg(G.lang === 'zh' ? '* 托麗爾放下了雙手，不再攻擊。' : "* Toriel stops attacking.", 'win', bub);
        } else {
          this.showMsg(customMsg || (G.lang === 'zh' ? '* 你選擇不戰鬥，靜靜寬恕托麗爾。' : "* You spare Toriel."), 'dodge', bub);
        }
      },

      startVaporize() {
        this.menu = 'vapor';
        this.vaporTick = 0;
        this.dustParticles = [];
        for (let i = 0; i < 84; i++) {
          this.dustParticles.push({
            x: 265 + Math.random() * 110,
            y: 55 + Math.random() * 125,
            vx: (Math.random() - 0.5) * 2.2,
            vy: -0.9 - Math.random() * 2.2,
            sz: 2 + Math.floor(Math.random() * 3),
            delay: Math.floor((i / 84) * 24)
          });
        }
        G.sfx.stopBGM();
        G.sfx.sfx('vaporized', 0.8);
      },

      beginDodge() {
        if (this.id === 'dummy') {
          this.turns++;
          this.menu = 'main';
          this.msg = G.lang === 'zh' ? '* 假人一動也不動。' : "* Dummy stands around\n  absentmindedly.";
          this.mc = 0;
          return;
        }
        if (this.id === 'froggit' && G.state.scriptedFrog) {
          G.state.scriptedFrog = false;
          this.outcome = 'spared';
          this.showMsg(G.lang === 'zh'
            ? '* 托麗爾走進戰場，嚴厲地瞪了 Froggit 一眼！\n* Froggit 嚇得立刻道歉跳走了！'
            : "* Toriel steps in and gives\n  Froggit a stern glare!\n* Froggit hops away nervously!", 'win');
          return;
        }
        // In Genocide Snowdin, Papyrus never attacks!
        if (this.id === 'papyrus' && G.isGenocideSnowdin?.()) {
          this.menu = 'main';
          this.msg = G.lang === 'zh' ? '* 帕派瑞斯正對你敞開雙臂。' : '* Papyrus is sparing you.';
          this.mc = 0;
          return;
        }

        this.menu = 'dodge';
        const wideBox = ['papyrus', 'doggo', 'dogi', 'greaterdog'].includes(this.id);
        this.targetBox = wideBox
          ? { x: 180, y: 250, w: 280, h: 140 }
          : { x: 228, y: 250, w: 184, h: 140 };

        if (this.id === 'papyrus' && !this.blueSoul) {
          this.blueSoul = true;
          G.sfx.sfx('bell', 0.85);
          this.bubble = this.getPapyrusBubble();
          this.bubTimer = 150;
        }

        this.soulX = 320;
        this.soulY = this.blueSoul ? (this.targetBox.y + this.targetBox.h - 12) : 320;
        this.soulVy = 0;
        this.bullets = [];
        this.handSweep = null;
        this.timer = 0;
        this.patternIdx = (this.patternIdx + 1) % 3;
      },

      update(keys) {
        if (this.shake > 0) this.shake--;
        if (this.monsterShake > 0) this.monsterShake--;
        if (this.invuln > 0) this.invuln--;
        if (this.bubTimer > 0) this.bubTimer--;

        for (const k of ['x', 'y', 'w', 'h']) {
          this.box[k] += (this.targetBox[k] - this.box[k]) * 0.28;
        }

        if (this.menu === 'gameover') {
          this.goTick++;
          if (this.goTick === 35) G.sfx.sfx('break1', 0.8);
          if (this.goTick === 75) {
            G.sfx.sfx('break2', 0.85);
            for (let i = 0; i < 6; i++) {
              this.shards.push({ x: this.soulX, y: this.soulY, vx: (Math.random() - 0.5) * 9, vy: -5 - Math.random() * 5, f: i % 4 });
            }
          }
          if (this.goTick === 105) G.sfx.playBGM('gameover');
          for (const s of this.shards) { s.x += s.vx; s.y += s.vy; s.vy += 0.28; }
          return;
        }

        if (this.menu === 'vapor') {
          this.vaporTick++;
          for (const p of this.dustParticles) {
            if (this.vaporTick > p.delay) {
              p.x += p.vx;
              p.y += p.vy;
            }
          }
          if (this.vaporTick > 46) this.finish('killed');
          return;
        }
        if (this.menu === 'flee') {
          this.fleeX -= 4.5;
          if (this.fleeX < -30) this.finish('fled');
          return;
        }

        if (this.menu === 'main' || this.menu === 'msg' || this.menu === 'nobody') {
          const plain = stripCodes(this.msg);
          if (this.mc < plain.length) {
            this.mc += 0.85;
            if (Math.floor(this.mc) !== Math.floor(this.mc - 0.85)) {
              const ch = plain[Math.floor(this.mc) - 1];
              if (ch && ch !== ' ' && ch !== '\n' && ch !== '*') G.sfx.voice('narrator');
            }
          }
          return;
        }

        if (this.menu === 'fight_bar') {
          if (this.targetScale < 1) this.targetScale = Math.min(1, this.targetScale + 0.15);
          this.barX += this.barSpd * this.barDir;
          if ((this.barDir > 0 && this.barX > 598) || (this.barDir < 0 && this.barX < 42)) {
            this.lastDmg = 0; this.isCrit = false; this.menu = 'slash'; this.slashTick = 18;
          }
          return;
        }

        if (this.menu === 'glove_mash') {
          this.gloveTick++;
          for (const p of this.punches) if (p.t > 0) p.t--;
          if (this.gloveTick > 36) {
            this.menu = 'slash'; this.slashTick = 14;
          }
          return;
        }

        if (this.menu === 'slash') {
          this.slashTick++;
          if (this.slashTick === 18) {
            if (this.lastDmg > 0) {
              G.sfx.sfx('damage', 0.9);
              this.shake = this.isCrit ? 20 : 12;
              this.monsterShake = 22;
              this.prevHp = this.hp;
              if (this.id !== 'blook') this.hp = Math.max(0, this.hp - this.lastDmg);
              else this.hp = Math.max(12, this.hp - 10);
              if (this.hp > 0 && this.hp <= this.maxHp * 0.28 && !['toriel', 'papyrus'].includes(this.id)) {
                this.spare = true;
              }
            }
            this.dmgY = 0;
            this.dmgVy = -7.6;
          }
          if (this.slashTick > 18) {
            this.dmgY += this.dmgVy;
            this.dmgVy += 0.54;
            if (this.dmgY > 0) { this.dmgY = 0; this.dmgVy *= -0.35; }
            this.prevHp += (this.hp - this.prevHp) * 0.22;
          }
          if (this.slashTick > 56) {
            const zh = G.lang === 'zh';
            if (this.id === 'blook') {
              this.dapperHat = false;
              this.showMsg(zh
                ? '* (幽靈沒有實體，物理攻擊無效……)\n* Napstablook 為了不讓場面尷尬，\n  禮貌地自己扣了一點血。'
                : "* Ghosts are incorporeal...\n* Napstablook lowered its HP\n  just to be polite.", 'dodge', 'umm...\nawkward...');
            } else if (this.hp <= 0) {
              if (this.id === 'dummy') {
                this.outcome = 'killed';
                this.showMsg(zh ? '* 你打壞了假人。獲得 0 EXP。' : "* YOU WON!\n* You earned 0 EXP and 0 gold.", 'vapor');
              } else {
                // Record area kill & EXP / LOVE progression
                G.recordKill?.(this.id);
                G.state.exp += this.m.exp;
                G.state.gold += this.m.gold;
                let lvUp = '';
                while (G.state.lv < LV_THRESHOLDS.length && G.state.exp >= LV_THRESHOLDS[G.state.lv]) {
                  G.state.lv++;
                  G.state.maxHp = 16 + G.state.lv * 4;
                  G.state.hp = G.state.maxHp;
                  G.state.atk = (G.state.lv - 1) * 2;
                  G.state.def = Math.floor((G.state.lv - 1) / 4);
                  G.sfx.sfx('levelup', 0.8);
                  lvUp = zh ? '\n* 你的 LOVE 提升了！' : '\n* Your LOVE increased!';
                }
                this.outcome = 'killed';

                // Special Genocide / Boss death dialogue before dust vaporization!
                if (this.id === 'toriel' && this.menu !== 'boss_death_dlg') {
                  this.menu = 'boss_death_dlg';
                  this.bossDeathIdx = 0;
                  this.bossDeathLines = (G.isGenocideRuins?.() || this.lastDmg >= 9999)
                    ? (zh
                      ? ["你……\n就這麼恨我嗎？", "現在我終於明白，\n我把你留在这里\n究竟是在保護誰了。", "不是保護你……\n而是保護外面的大家！\n哈……哈……"]
                      : ["Y... you...\nreally hate me\nthat much?", "Now I see who\nI was protecting\nby keeping you\nhere.", "Not you...\nBut them!\nHa... ha..."])
                    : (zh
                      ? ["唔……\n你比我想像中\n還要強大……", "請答應我……\n出去之後一定要\n好好活下去……"]
                      : ["Urgh...\nYou are stronger\nthan I thought...", "Be good, won't\nyou? My child..."]);
                  this.bubble = this.bossDeathLines[0];
                  this.bubTimer = 999;
                  G.sfx.stopBGM();
                  return;
                }
                if (this.id === 'papyrus' && this.menu !== 'boss_death_dlg') {
                  this.papDecap = true;
                  this.menu = 'boss_death_dlg';
                  this.bossDeathIdx = 0;
                  this.bossDeathLines = zh
                    ? ["哇……這跟我想像的\n不太一樣……", "但……但是！\n我依然相信你！", "你一定還能做得\n更好一點點！\n就算你自己不這麼認為！", "我……\n我向你保證……"]
                    : ["W-WELL, THAT'S\nNOT WHAT I\nEXPECTED...", "BUT... ST... STILL!\nI BELIEVE IN YOU!", "YOU CAN DO A\nLITTLE BETTER!\nEVEN IF YOU DON'T\nTHINK SO!", "I... I\nPROMISE..."];
                  this.bubble = this.bossDeathLines[0];
                  this.bubTimer = 999;
                  G.sfx.stopBGM();
                  return;
                }

                this.showMsg((zh
                  ? `* 戰鬥勝利！\n* 獲得 ${this.m.exp} EXP 與 ${this.m.gold} 金幣。`
                  : `* YOU WON!\n* Earned ${this.m.exp} EXP and ${this.m.gold} gold.`) + lvUp, 'vapor');
              }
            } else {
              this.turns++;
              this.beginDodge();
            }
          }
          return;
        }

        if (this.menu === 'dodge') {
          this.timer++;
          let dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
          let dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
          const ramp = keys.moveScale != null ? keys.moveScale : 1;
          const spd = (keys.cancel ? 1.15 : 2.25) * ramp;
          const oldX = this.soulX, oldY = this.soulY;

          if (this.blueSoul) {
            // Blue SOUL Gravity & Variable-Height Jump (Papyrus Boss Fight!)
            this.soulX = Math.max(this.box.x + 12, Math.min(this.box.x + this.box.w - 12, this.soulX + dx * spd));
            const floorY = this.box.y + this.box.h - 10;
            const onFloor = this.soulY >= floorY - 1;
            if (keys.up && onFloor) {
              this.soulVy = -6.7;
            } else if (!keys.up && this.soulVy < -2.1) {
              this.soulVy = -2.1;
            }
            this.soulVy += 0.32;
            this.soulY = Math.max(this.box.y + 12, Math.min(floorY, this.soulY + this.soulVy));
            if (this.soulY >= floorY) this.soulVy = 0;
          } else {
            const diag = (dx && dy) ? 0.75 : 1;
            this.soulX = Math.max(this.box.x + 12, Math.min(this.box.x + this.box.w - 12, this.soulX + dx * spd * diag));
            this.soulY = Math.max(this.box.y + 12, Math.min(this.box.y + this.box.h - 12, this.soulY + dy * spd * diag));
          }

          this.soulMoving = Math.hypot(this.soulX - oldX, this.soulY - oldY) > 0.12;

          this.spawnEnemyPattern();

          if (this.handSweep) {
            this.handSweep.x += this.handSweep.vx;
            if (this.handSweep.x > this.box.x + this.box.w + 20 || this.handSweep.x < this.box.x - 20) {
              this.handSweep = null;
            }
          }

          for (let i = this.bullets.length - 1; i >= 0; i--) {
            const b = this.bullets[i];
            if (b.step) b.step(b, this);
            else { b.x += b.vx; b.y += b.vy; }

            // Toriel Mercy Deflection at low HP or 9+ spare turns
            if (this.id === 'toriel' && (G.state.hp <= 3 || this.turns >= 9)) {
              const dist = Math.hypot(b.x - this.soulX, b.y - this.soulY);
              if (dist < 50 && dist > 0.1) {
                b.x += ((b.x - this.soulX) / dist) * 5.4;
                b.y += ((b.y - this.soulY) / dist) * 5.4;
              }
            }

            // Collision check (supports rectangular bones/spears or circular bullets)
            let hit = false;
            if (b.w && b.h) {
              hit = Math.abs(b.x - this.soulX) < (b.w * 0.5 + 5) && Math.abs(b.y - this.soulY) < (b.h * 0.5 + 5);
            } else {
              hit = Math.hypot(b.x - this.soulX, b.y - this.soulY) < (b.r || 9);
            }

            if (hit) {
              if (b.green) {
                G.state.hp = Math.min(G.state.maxHp, G.state.hp + 5);
                G.sfx.sfx('heal', 0.75);
                this.spare = true;
                this.greenDinner = false;
                this.bullets.splice(i, 1);
                continue;
              }
              // Blue Attack rule: ONLY hurts if SOUL is moving!
              if (b.blue && !this.soulMoving) continue;
              // Orange Attack rule: ONLY hurts if SOUL is stationary!
              if (b.orange && this.soulMoving) continue;

              if (!this.invuln) {
                if (G.noHitShield || window.UT_NO_HIT_SHIELD) {
                  this.invuln = 28;
                  G.sfx.sfx('bell', 0.45);
                  continue;
                }
                const armDef = (window.UT_ITEMS[G.state.armor]?.def || 0) + (G.state.def || 0);
                const hitDmg = Math.max(1, this.m.atk - Math.floor(armDef * 0.6));
                G.state.hp = Math.max(0, G.state.hp - hitDmg);
                this.invuln = 36; this.shake = 12;
                G.sfx.sfx('hurt', 0.8);
                if (G.state.hp <= 0) {
                  G.sfx.stopBGM();
                  this.menu = 'gameover'; this.goTick = 0; this.shards = [];
                  return;
                }
              }
            }
          }

          const maxTime = this.id === 'papyrus' ? 210 : 185;
          if (this.timer > maxTime) {
            this.targetBox = { x: 32, y: 250, w: 575, h: 140 };
            this.handSweep = null;
            this.menu = 'main';
            const idle = G.lang === 'zh' ? this.m.idleZh : this.m.idleEn;
            this.msg = (this.spare && this.id === 'vegetoid')
              ? (G.lang === 'zh' ? '* 你吃了健康的綠色蔬菜！可以寬恕了！' : '* Vegetoid seems satisfied!')
              : idle[this.turns % idle.length];
            this.mc = 0;
          }
        }
      },

      spawnEnemyPattern() {
        const t = this.timer, bx = this.targetBox, pat = this.patternIdx;

        // 1. FROGGIT (Pattern A: Homing Pause-Dart Flies | Pattern B: Leaping Frog)
        if (this.id === 'froggit') {
          if (pat % 2 === 0) {
            if (t % 26 === 1 && t < 150) {
              const x = bx.x + 20 + Math.random() * (bx.w - 40);
              this.bullets.push({
                x, y: bx.y + 10, vx: 0, vy: 0, age: 0, spr: 'spr_flybullet', r: 8,
                step(p, self) {
                  p.age++;
                  const phase = p.age % 34;
                  if (phase === 1) {
                    const a = Math.atan2(self.soulY - p.y, self.soulX - p.x);
                    p.vx = Math.cos(a) * 2.8; p.vy = Math.sin(a) * 2.8;
                  } else if (phase > 20) {
                    p.vx *= 0.8; p.vy *= 0.8;
                  }
                  p.x += p.vx; p.y += p.vy;
                }
              });
            }
          } else {
            if (t === 8) {
              this.bullets.push({
                x: bx.x + bx.w - 22, y: bx.y + bx.h - 16, vx: 0, vy: 0, age: 0, spr: 'spr_frogbullet_stop', r: 12,
                step(p, self) {
                  p.age++;
                  if (p.age === 42) {
                    p.spr = 'spr_frogbullet_go';
                    const dx = self.soulX - p.x;
                    p.vx = Math.max(-4.5, Math.min(-2.4, dx / 28));
                    p.vy = -5.6;
                  } else if (p.age > 42) {
                    p.x += p.vx; p.y += p.vy; p.vy += 0.22;
                    if (p.y > bx.y + bx.h - 14 && p.vy > 0) {
                      p.y = bx.y + bx.h - 14; p.vx = 0; p.vy = 0; p.spr = 'spr_frogbullet_stop';
                      p.age = 10;
                    }
                  }
                }
              });
            }
          }
        }
        // 2. WHIMSUN (Flapping Butterfly Ring OR Butterfly Curtain)
        else if (this.id === 'whimsun') {
          if (pat % 2 === 0) {
            if (t % 12 === 1 && t < 150) {
              const ang = t * 0.24;
              this.bullets.push({
                x: 320 + Math.cos(ang) * 92, y: 320 + Math.sin(ang) * 68,
                vx: -Math.cos(ang) * 1.65, vy: -Math.sin(ang) * 1.65, spr: 'spr_butterflybullet', r: 8
              });
            }
          } else {
            if (t % 16 === 1 && t < 150) {
              this.bullets.push({ x: bx.x + 18, y: bx.y + 8, vx: 0.7, vy: 2.3, spr: 'spr_butterflybullet', r: 8 });
              this.bullets.push({ x: bx.x + bx.w - 18, y: bx.y + 8, vx: -0.7, vy: 2.3, spr: 'spr_butterflybullet', r: 8 });
            }
          }
        }
        // 3. MOLDSMAL (Spore Burst OR Sine Wave Spores)
        else if (this.id === 'moldsmal') {
          if (pat % 2 === 0) {
            if (t % 34 === 6 && t < 145) {
              const sx = bx.x + 36 + Math.random() * (bx.w - 72);
              this.bullets.push({
                x: sx, y: bx.y + 10, vx: 0, vy: 2.0, age: 0, r: 8,
                step(p, self) {
                  p.y += p.vy; p.age++;
                  if (p.age === 32) {
                    p.x = -999;
                    for (let k = 0; k < 6; k++) {
                      const a = (Math.PI * 2 * k) / 6;
                      self.bullets.push({ x: sx, y: bx.y + 74, vx: Math.cos(a) * 2.3, vy: Math.sin(a) * 2.3, r: 6 });
                    }
                  }
                }
              });
            }
          } else {
            if (t % 14 === 1 && t < 150) {
              const sx = bx.x + 28 + ((t * 23) % (bx.w - 56));
              this.bullets.push({
                x: sx, y: bx.y + 8, vx: 0, vy: 2.1, age: t, r: 7,
                step(p) { p.y += p.vy; p.x += Math.sin((p.age++) * 0.14) * 1.8; }
              });
            }
          }
        }
        // 4. LOOX (Bouncing Eyeball Rings & Linked Gaze Chain)
        else if (this.id === 'loox') {
          if (t % 20 === 1 && t < 150) {
            const dir = (t % 40 === 1) ? 1 : -1;
            this.bullets.push({
              x: dir > 0 ? bx.x + 12 : bx.x + bx.w - 12, y: bx.y + 24 + Math.random() * 90,
              vx: dir * 2.7, vy: 1.9, r: 10, ring: true,
              step(p) {
                p.x += p.vx; p.y += p.vy;
                if (p.y < bx.y + 12 || p.y > bx.y + bx.h - 12) p.vy *= -1;
              }
            });
          }
        }
        // 5. VEGETOID (Bouncing Vegetables + Green Healing Carrot)
        else if (this.id === 'vegetoid') {
          if (t % 16 === 1 && t < 150) {
            const isGreen = this.greenDinner && (t === 33 || t === 65);
            this.bullets.push({
              x: bx.x + 20 + Math.random() * (bx.w - 40), y: bx.y + 8,
              vx: (Math.random() - 0.5) * 2.5, vy: 2.7, green: isGreen, carrot: true, r: 8,
              step(p) {
                p.x += p.vx; p.y += p.vy;
                if (p.y > bx.y + bx.h - 10 && p.vy > 0) p.vy = -2.9;
                p.vy += 0.09;
              }
            });
          }
        }
        // 6. MIGOSP (Hopping Roaches & Butterfly Arcs)
        else if (this.id === 'migosp') {
          if (t % 22 === 1 && t < 150) {
            const fromLeft = (t % 44 === 1);
            this.bullets.push({
              x: fromLeft ? bx.x + 12 : bx.x + bx.w - 12,
              y: bx.y + bx.h - 16,
              vx: fromLeft ? 2.7 : -2.7, vy: -2.6, spr: 'spr_flybullet', r: 8,
              step(p) {
                p.x += p.vx; p.y += p.vy; p.vy += 0.13;
                if (p.y > bx.y + bx.h - 14) p.vy = -2.6;
              }
            });
          }
        }
        // 7. NAPSTABLOOK (Dual Tear Streams curving along the floor)
        else if (this.id === 'blook') {
          if (t % 8 === 1 && t < 155 && !this.dapperHat) {
            const side = (t % 16 === 1) ? -16 : 16;
            this.bullets.push({
              x: 320 + side, y: 122, vx: (Math.random() - 0.5) * 1.4, vy: 3.1, spr: 'spr_teardrop', r: 7,
              step(p) {
                p.x += p.vx; p.y += p.vy;
                if (p.y > bx.y + bx.h - 12) {
                  p.y = bx.y + bx.h - 12;
                  p.vy = 0;
                  p.vx = side < 0 ? -2.6 : 2.6;
                }
              }
            });
          }
        }
        // 8. BOSS TORIEL (Pattern 0: Hand Sweep Fire Cascade | Pattern 1: Helix Spiral | Pattern 2: Side Fire Volley)
        else if (this.id === 'toriel') {
          if (pat === 0) {
            if (t === 2) {
              this.handSweep = { x: bx.x, y: bx.y - 18, vx: 4.4 };
            }
            if (this.handSweep && t % 6 === 0 && t < 50) {
              const hx = this.handSweep.x;
              this.bullets.push({
                x: hx, y: bx.y - 4, vx: (this.soulX - hx) * 0.015, vy: 0, delay: 20, fire: true, r: 9,
                step(p) {
                  if (p.delay > 0) p.delay--;
                  else { p.x += p.vx; p.y += 3.2; }
                }
              });
            }
            if (t > 60 && t % 12 === 0 && t < 155) {
              const sx = bx.x + 16 + Math.random() * (bx.w - 32);
              this.bullets.push({
                x: sx, y: bx.y - 12, vx: 0, vy: 2.8, fire: true, r: 9,
                step(p) { p.x += Math.sin(p.y * 0.06) * 1.3; p.y += p.vy; }
              });
            }
          } else if (pat === 1) {
            if (t % 9 === 1 && t < 155) {
              for (const s of [-1, 1]) {
                this.bullets.push({
                  x: 320 + s * 64, y: bx.y - 10, vx: 0, vy: 2.7, side: s, age: 0, fire: true, r: 9,
                  step(p) {
                    p.age++;
                    p.y += p.vy;
                    p.x = 320 + Math.cos(p.age * 0.085) * 68 * p.side;
                  }
                });
              }
            }
          } else {
            if (t % 14 === 1 && t < 155) {
              const side = (t % 28 === 1) ? -1 : 1;
              const sy = bx.y + 18 + Math.random() * (bx.h - 36);
              const sx = side < 0 ? bx.x - 10 : bx.x + bx.w + 10;
              const a = Math.atan2(this.soulY - sy, this.soulX - sx);
              this.bullets.push({
                x: sx, y: sy, vx: Math.cos(a) * 2.9, vy: Math.sin(a) * 2.9, fire: true, r: 9
              });
            }
          }
        }
        // 9. SNOWDIN MONSTERS (Snowdrake, Ice Cap, Lesser Dog, Gyftrot)
        else if (this.id === 'snowdrake' || this.id === 'icecap' || this.id === 'gyftrot') {
          if (t % 15 === 1 && t < 155) {
            const ang = (t * 0.35);
            const sx = bx.x + 20 + Math.random() * (bx.w - 40);
            this.bullets.push({
              x: sx, y: bx.y - 8, vx: Math.sin(ang) * 1.8, vy: 2.8,
              spr: this.id === 'gyftrot' ? 'spr_gyftbullet' : null, ice: true, r: 8
            });
          }
        }
        else if (this.id === 'lesserdog') {
          if (t % 24 === 1 && t < 150) {
            const fromLeft = (t % 48 === 1);
            this.bullets.push({
              x: fromLeft ? bx.x - 10 : bx.x + bx.w + 10,
              y: bx.y + bx.h - 22,
              vx: fromLeft ? 3.4 : -3.4, vy: -2.2,
              spr: 'spr_dogspear', w: 14, h: 28,
              step(p) {
                p.x += p.vx; p.y += p.vy; p.vy += 0.11;
                if (p.y > bx.y + bx.h - 18) p.vy = -2.4;
              }
            });
          }
        }
        // 10. DOGGO (Famous BLUE Moving-Detection Sword Sweep!)
        else if (this.id === 'doggo') {
          if (t % 42 === 4 && t < 150) {
            const fromLeft = ((t / 42) | 0) % 2 === 0;
            // occasional white bone/treat on edge, main blade is BLUE (stand still!)
            this.bullets.push({
              x: fromLeft ? bx.x - 12 : bx.x + bx.w + 12,
              y: bx.y + bx.h * 0.5,
              vx: fromLeft ? 4.4 : -4.4, vy: 0,
              blue: true, blade: true, w: 16, h: bx.h - 10
            });
          }
        }
        // 11. DOGAMY & DOGARESSA (Twin Axes & White/Blue Heart Streams)
        else if (this.id === 'dogi') {
          if (t % 20 === 1 && t < 155) {
            const isBlue = (t % 40 === 1);
            const fromLeft = (t % 60 < 30);
            this.bullets.push({
              x: fromLeft ? bx.x - 10 : bx.x + bx.w + 10,
              y: bx.y + 22 + Math.random() * (bx.h - 44),
              vx: fromLeft ? 3.2 : -3.2, vy: Math.sin(t) * 0.8,
              blue: isBlue, spr: 'spr_dogspear', w: 14, h: 26
            });
          }
        }
        // 12. GREATER DOG (Spear Sweep & BARK! Homing Barks)
        else if (this.id === 'greaterdog') {
          if (t % 22 === 1 && t < 155) {
            const sx = bx.x + 24 + Math.random() * (bx.w - 48);
            const a = Math.atan2(this.soulY - bx.y, this.soulX - sx);
            this.bullets.push({
              x: sx, y: bx.y + 6, vx: Math.cos(a) * 2.9, vy: Math.sin(a) * 2.9,
              bark: true, r: 9
            });
          }
        }
        // 13. BOSS PAPYRUS (Blue SOUL Jumping over Ground Bones, Blue Bones & COOL DUDE wave!)
        else if (this.id === 'papyrus') {
          if (t % 28 === 4 && t < 175) {
            const isBlue = (t % 56 === 4) && (pat !== 1);
            const bh = isBlue ? 88 : (26 + ((t * 7) % 34));
            const fromRight = true;
            this.bullets.push({
              x: fromRight ? bx.x + bx.w + 10 : bx.x - 10,
              y: bx.y + bx.h - bh * 0.5 - 3,
              vx: -3.7, vy: 0,
              bone: true, blue: isBlue, w: 12, h: bh
            });
            // Top ceiling gap bone on pattern 2
            if (!isBlue && pat === 2) {
              const topH = Math.max(18, bx.h - bh - 56);
              this.bullets.push({
                x: bx.x + bx.w + 10,
                y: bx.y + topH * 0.5 + 3,
                vx: -3.7, vy: 0,
                bone: true, blue: false, w: 12, h: topH
              });
            }
          }
        }
      },

      finish(outcome) {
        G.endRPGBattle(this.id, outcome, this.onEnd);
      },

      render(ctx, time) {
        if (this.menu === 'gameover') {
          ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);
          if (this.goTick < 35) drawSpr(ctx, 'spr_heart', 0, this.soulX - 8, this.soulY - 8, 1, 1);
          else if (this.goTick < 75) drawSpr(ctx, 'spr_heartbreak', 0, this.soulX - 10, this.soulY - 8, 1, 1);
          else {
            for (const s of this.shards) drawSpr(ctx, 'spr_heartshards', s.f + Math.floor(time / 6), s.x, s.y, 1.5, 1.5);
          }
          if (this.goTick > 100) {
            drawSpr(ctx, 'spr_gameoverbg', 0, 109, 44, 1, 1);
            const msg = G.lang === 'zh'
              ? `${G.state.name}！不要放棄……\n請保持你的決心！ [按 Z 重新開始]`
              : `${G.state.name}! Stay determined...\n[Press Z to return to SAVE]`;
            drawRichText(ctx, msg, 128, 300, Math.floor((this.goTick - 100) * 1.2), { size: 26 });
          }
          return;
        }

        ctx.save();
        if (this.shake > 0) ctx.translate((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);

        // Background green grid
        ctx.strokeStyle = this.id === 'nobody' ? '#240c0c' : '#143818';
        ctx.lineWidth = 1;
        for (let gx = 16; gx < 624; gx += 48) ctx.strokeRect(gx, 12, 48, 224);

        // Monster Sprite (with hurt sprite swap, horizontal shake, Lesser Dog extending neck, Papyrus decapitation & dust vaporization!)
        if (this.id !== 'nobody') {
          const mShakeX = this.monsterShake > 0
            ? (this.monsterShake % 2 === 0 ? 1 : -1) * Math.round(this.monsterShake * 0.75)
            : 0;
          ctx.save();
          if (this.menu === 'vapor') {
            // Clip bottom portion as top dissolves into dust!
            const cutY = 24 + (this.vaporTick / 36) * 190;
            ctx.beginPath(); ctx.rect(0, cutY, 640, 260); ctx.clip();
            ctx.globalAlpha = Math.max(0, 1 - this.vaporTick / 42);
          } else {
            ctx.globalAlpha = this.spare ? 0.85 : 1;
          }

          const bob = Math.sin(time * 0.08) * 3;
          const isHurt = (this.menu === 'slash' && this.slashTick >= 18) || this.menu === 'boss_death_dlg';

          if (this.id === 'toriel') {
            let tspr = 'spr_torielboss';
            if (this.menu === 'boss_death_dlg') {
              tspr = (G.isGenocideRuins?.() || this.lastDmg >= 9999) ? 'spr_torielboss_reallyhurt' : 'spr_torielboss_hurt';
            } else if (isHurt) tspr = 'spr_torielboss_hurt';
            else if (this.turns >= 10) tspr = 'spr_torielboss_sad';
            else if (this.turns >= 5) tspr = 'spr_torielboss_sidesad';
            else if (this.turns >= 2) tspr = 'spr_torielboss_side';
            drawSpr(ctx, tspr, 0, 248 + mShakeX, 36, 2, 2);
          } else if (this.id === 'papyrus') {
            if (this.papDecap) {
              drawSpr(ctx, 'spr_papyrusboss_body', 0, 256 + mShakeX, 68, 1.8, 1.8);
              const headDrop = Math.min(72, this.bossDeathIdx * 24 + 18);
              drawSpr(ctx, 'spr_papyrusboss_head', 0, 282 + mShakeX, 36 + headDrop, 1.8, 1.8);
            } else {
              drawSpr(ctx, 'spr_papyrusboss', 0, 250 + mShakeX, 24 + bob * 0.5, 1.75, 1.75);
            }
          } else if (this.id === 'dogi') {
            drawSpr(ctx, 'spr_mandoge', Math.floor(time / 16), 196 + mShakeX, 58 + bob, 1.65, 1.65);
            drawSpr(ctx, 'spr_womandoge', Math.floor(time / 16), 336 + mShakeX, 58 - bob, 1.65, 1.65);
          } else {
            const sprKey = (isHurt && this.m.hurtSpr && SPR[this.m.hurtSpr])
              ? this.m.hurtSpr
              : (this.id === 'icecap' && this.spare && SPR['spr_icecaphurt'] ? 'spr_icecaphurt' : this.m.spr);
            const ms = SPR[sprKey];
            if (ms) {
              const sc = ms.h < 65 ? 2 : 1.7;
              const mx = 320 - (ms.w * sc) / 2 + mShakeX, my = 132 - (ms.h * sc) / 2 + bob;
              drawSpr(ctx, sprKey, Math.floor(time / 16), mx, my, sc, sc);
              // Lesser Dog extending neck when petted!
              if (this.id === 'lesserdog' && this.neckLen > 0) {
                for (let n = 0; n < Math.min(8, this.neckLen); n++) {
                  drawSpr(ctx, 'spr_dogneck1', 0, mx + 36, my - 10 - n * 18, sc, sc);
                }
                drawSpr(ctx, 'spr_lesserdogehead', 0, mx + 24, my - 22 - Math.min(8, this.neckLen) * 18, sc, sc);
              }
              if (this.id === 'blook' && this.dapperHat) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(298, my - 30, 44, 24);
                ctx.fillRect(286, my - 8, 68, 6);
              }
            }
          }
          ctx.restore();

          // Render rising dust particles during vaporization!
          if (this.menu === 'vapor') {
            ctx.fillStyle = '#ffffff';
            for (const p of this.dustParticles) {
              if (this.vaporTick > p.delay) {
                ctx.globalAlpha = Math.max(0, 1 - (this.vaporTick - p.delay) / 28);
                ctx.fillRect(Math.round(p.x), Math.round(p.y), p.sz, p.sz);
              }
            }
            ctx.globalAlpha = 1;
          }
        }

        // Tough Glove Punch Impacts
        if (this.menu === 'glove_mash') {
          for (const p of this.punches) {
            if (p.t > 0) drawSpr(ctx, 'spr_strike', Math.floor((12 - p.t) / 2), p.x - 24, p.y - 24, 2.2, 2.2);
          }
          drawRichText(ctx, G.lang === 'zh' ? '\\Y[連按 Z 鍵出拳！]' : '\\Y[PRESS Z REPEATEDLY!]', 205, 198, 999, { size: 22 });
        }

        // Monster HP bar & Bouncing Damage Numbers during slash
        if (this.menu === 'slash' && this.slashTick >= 18) {
          ctx.fillStyle = '#404040'; ctx.fillRect(230, 122, 180, 18);
          ctx.fillStyle = '#a00000'; ctx.fillRect(230, 122, Math.max(0, Math.round(180 * (this.prevHp / this.maxHp))), 18);
          ctx.fillStyle = '#00e800'; ctx.fillRect(230, 122, Math.max(0, Math.round(180 * (this.hp / this.maxHp))), 18);
          ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.strokeRect(230, 122, 180, 18);

          const dy = Math.round(this.dmgY);
          if (this.lastDmg <= 0) {
            drawSpr(ctx, 'spr_dmgmiss_o', 0, 261, 78 + dy, 1, 1);
          } else {
            const digits = String(this.lastDmg);
            const sx = 320 - digits.length * 15;
            for (let i = 0; i < digits.length; i++) {
              drawSpr(ctx, 'spr_dmgnum_o', Number(digits[i]), sx + i * 30, 76 + dy, 1, 1);
            }
            if (this.isCrit && this.slashTick < 42) {
              drawRichText(ctx, '\\YCRITICAL!', 265, 48, 999, { size: 20 });
            }
          }
        }
        if (this.menu === 'slash' && this.slashTick < 20) {
          const f = Math.min(5, Math.floor(this.slashTick / 3));
          if (SPR['spr_slice_o']) {
            drawSpr(ctx, 'spr_slice_o', f, 302, 52, 2.2, 2.2);
          } else {
            drawSpr(ctx, 'spr_strike', f, 296, 68, 3.5, 5.5);
          }
        }

        // Monster Speech Bubble (with authentic character-specific font & auto-fit!)
        if (this.bubTimer > 0 && this.bubble) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(402, 44, 226, 126);
          ctx.beginPath(); ctx.moveTo(402, 92); ctx.lineTo(384, 102); ctx.lineTo(402, 112); ctx.fill();
          const bubWho = this.id === 'papyrus' ? 'papyrus' : (this.id === 'toriel' ? 'toriel' : 'narrator');
          drawRichText(ctx, this.bubble, 412, 52, 999, { size: 19, lineH: 24, color: '#000', who: bubWho, maxWidth: 206, maxHeight: 110 });
        }

        // Battle Box
        const bx = this.box;
        ctx.fillStyle = '#000'; ctx.fillRect(bx.x, bx.y, bx.w, bx.h);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeRect(bx.x, bx.y, bx.w, bx.h);

        const zh = G.lang === 'zh';
        const mName = zh ? this.m.nameZh : this.m.nameEn;

        if (this.menu === 'dodge') {
          if (this.handSweep) {
            drawSpr(ctx, 'spr_handbullet', 0, this.handSweep.x - 16, this.handSweep.y - 12, 1.5, 1.5);
          }
          if (!this.invuln || Math.floor(this.invuln / 4) % 2 === 0) {
            const heartSpr = (this.blueSoul && SPR['spr_heartblue']) ? 'spr_heartblue' : 'spr_heart';
            drawSpr(ctx, heartSpr, 0, this.soulX - 8, this.soulY - 8, 1, 1);
          }
          if (G.noHitShield || window.UT_NO_HIT_SHIELD) {
            ctx.save(); ctx.strokeStyle = 'rgba(80,235,255,0.85)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(this.soulX, this.soulY, 14, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
          }
          for (const b of this.bullets) {
            if (b.fire) {
              const fs = SPR['spr_firebullet'] ? 'spr_firebullet' : 'spr_torielflame';
              drawSpr(ctx, fs, Math.floor(time / 4), b.x - 12, b.y - 12, 1.1, 1.1);
            } else if (b.blade) {
              // Doggo's Blue Moving-Detection Sword!
              ctx.fillStyle = '#28b8ff';
              ctx.fillRect(Math.round(b.x - 6), Math.round(b.y - b.h * 0.5), 12, Math.round(b.h));
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(Math.round(b.x - 10), Math.round(b.y - b.h * 0.5 - 6), 20, 8);
            } else if (b.bone) {
              // Papyrus's White & Blue Bones!
              const col = b.blue ? '#28b8ff' : '#ffffff';
              const topY = Math.round(b.y - b.h * 0.5), botY = Math.round(b.y + b.h * 0.5);
              ctx.fillStyle = col;
              ctx.fillRect(Math.round(b.x - 4), topY + 4, 8, Math.max(4, Math.round(b.h - 8)));
              ctx.fillRect(Math.round(b.x - 7), topY, 14, 6);
              ctx.fillRect(Math.round(b.x - 7), botY - 6, 14, 6);
            } else if (b.spr && SPR[b.spr]) {
              const s = SPR[b.spr];
              ctx.save();
              if (b.blue) ctx.filter = 'sepia(1) saturate(6) hue-rotate(170deg)';
              drawSpr(ctx, b.spr, Math.floor(time / 5), b.x - s.w * 0.7, b.y - s.h * 0.7, 1.4, 1.4);
              ctx.restore();
            } else if (b.ring) {
              ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3;
              ctx.beginPath(); ctx.arc(b.x, b.y, b.r || 9, 0, Math.PI * 2); ctx.stroke();
              ctx.fillStyle = '#ffffff';
              ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, Math.PI * 2); ctx.fill();
            } else if (b.carrot) {
              ctx.fillStyle = b.green ? '#38ff38' : '#ffffff';
              ctx.beginPath();
              ctx.moveTo(b.x, b.y + 9);
              ctx.lineTo(b.x - 6, b.y - 6);
              ctx.lineTo(b.x + 6, b.y - 6);
              ctx.closePath();
              ctx.fill();
            } else if (b.bark) {
              drawRichText(ctx, 'BARK!', b.x - 22, b.y - 8, 999, { size: 16, color: '#ffffff' });
            } else {
              ctx.fillStyle = b.green ? '#38ff38' : (b.blue ? '#28b8ff' : (b.orange ? '#ffa028' : '#ffffff'));
              ctx.beginPath(); ctx.arc(b.x, b.y, b.r || 6, 0, Math.PI * 2); ctx.fill();
            }
          }
        } else if (this.menu === 'fight_bar' || this.menu === 'glove_mash' || this.menu === 'slash') {
          ctx.save();
          const sc = this.targetScale || 1;
          ctx.translate(320 * (1 - sc), 0);
          ctx.scale(sc, 1);
          drawSpr(ctx, 'spr_target', 0, 39, 256, 1, 1);
          ctx.restore();
          // Bullseye center indicator
          ctx.strokeStyle = 'rgba(255,255,0,0.45)';
          ctx.lineWidth = 2;
          ctx.strokeRect(312, 256, 16, 128);
          drawSpr(ctx, 'spr_targetchoice', Math.floor(time / 3) % 2, this.barX - 7, 256, 1, 1);
        } else if (this.menu === 'target') {
          drawSpr(ctx, 'spr_heart', 0, 64, 278, 1, 1);
          drawRichText(ctx, `* ${mName}`, 96, 272, 999, { color: this.spare ? '#ffff00' : '#ffffff' });
          ctx.fillStyle = '#800000'; ctx.fillRect(380, 278, 120, 18);
          ctx.fillStyle = '#00d800'; ctx.fillRect(380, 278, Math.round(120 * (this.hp / this.maxHp)), 18);
        } else if (this.menu === 'act') {
          this.m.acts.forEach((a, i) => {
            const ax = (i % 2 === 0) ? 96 : 356, ay = 272 + Math.floor(i / 2) * 40;
            drawRichText(ctx, `* ${zh ? a.zh : a.en}`, ax, ay, 999, { maxWidth: 235 });
            if (this.sub === i) drawSpr(ctx, 'spr_heart', 0, ax - 32, ay + 6, 1, 1);
          });
        } else if (this.menu === 'item') {
          const pageStart = Math.floor(this.sub / 4) * 4;
          G.state.items.slice(pageStart, pageStart + 4).forEach((k, idx) => {
            const realIdx = pageStart + idx;
            const it = window.UT_ITEMS[k];
            const ax = (idx % 2 === 0) ? 96 : 356, ay = 272 + Math.floor(idx / 2) * 40;
            drawRichText(ctx, `* ${zh ? it.zh : it.short}`, ax, ay, 999, { maxWidth: 235 });
            if (this.sub === realIdx) drawSpr(ctx, 'spr_heart', 0, ax - 32, ay + 6, 1, 1);
          });
        } else if (this.menu === 'mercy') {
          const canFlee = !['toriel', 'papyrus', 'doggo', 'dogi', 'greaterdog'].includes(this.id);
          drawRichText(ctx, zh ? '* 寬恕 (Spare)' : '* Spare', 96, 272, 999, { color: this.spare ? '#ffff00' : '#ffffff' });
          if (canFlee) drawRichText(ctx, zh ? '* 逃跑 (Flee)' : '* Flee', 96, 312);
          drawSpr(ctx, 'spr_heart', 0, 64, 278 + this.sub * 40, 1, 1);
        } else if (this.menu === 'flee') {
          drawSpr(ctx, 'spr_heartgtfo', Math.floor(time / 4), this.fleeX, 286, 1.5, 1.5);
          drawRichText(ctx, this.msg, 110, 272, 999, { maxWidth: 480, maxHeight: 110 });
        } else if (this.menu === 'boss_death_dlg') {
          drawRichText(ctx, zh ? '* (按 [Z] 繼續……)' : '* (Press [Z] to continue...)', 52, 268, 999, { color: '#888888' });
        } else {
          drawRichText(ctx, this.msg, 52, 266, Math.floor(this.mc), { maxWidth: 536, maxHeight: 114 });
        }

        drawBattleHUD(ctx, G.state, 398);
        const btSprs = ['spr_fightbt', 'spr_talkbt', 'spr_itembt', 'spr_sparebt'];
        const btX = [32, 185, 338, 491];
        for (let i = 0; i < 4; i++) {
          const sel = (this.menu === 'main' && this.cur === i);
          drawSpr(ctx, btSprs[i], sel ? 0 : 1, btX[i], 430, 1, 1);
          if (sel) drawSpr(ctx, 'spr_heart', 0, btX[i] + 8, 444, 1, 1);
        }
        ctx.restore();
      }
    };
  }

  window.UTEngineCore = { SPR, registerSprites, drawSpr, drawSprExt, drawRichText, stripCodes, drawBattleHUD, UTSoundEngine, createFloweyBattle, createRPGBattle };
})();
