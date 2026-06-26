/* ═══════════════════════════════════════════════════════════════
   BİR GÜNÜMDE BEN  —  script.js
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── VERİ ─────────────────────────────────────────────────────────────────── */

/**
 * Her bloğun renk zonu: 0-5 arası bir indeks.
 * Renkler ZONES dizisinde tanımlanıyor;
 * geçişler JS interpolasyon fonksiyonu ile yumuşatılıyor.
 */
const ZONES = [
  { start: [189, 227, 240], end: [165, 215, 232] },  // 0 #BDE3F0 — Sabah Mavisi
  { start: [245, 229,  54], end: [230, 215,  38] },  // 1 #F5E536 — Öğle Sarısı
  { start: [252, 149,  18], end: [240, 130,  10] },  // 2 #FC9512 — İkindi Turuncusu
  { start: [212,  43,  15], end: [195,  30,   8] },  // 3 #D42B0F — Akşam Kızılı
  { start: [ 46,   6, 112], end: [ 30,   2,  80] },  // 4 #2E0670 — Gece Laciverdisi
];

const WEEKDAY = [
  {
    time: '07:30', phase: 'Gün Doğumu & İlk Rutin',
    zone: 0, emoji: '☕',
    title: 'Sabah Ritüeli',
    subtitle: 'Açık Mavi / Yumuşak Tonlar',
    activity: 'Güne erken başlama. Sabahın ilk ışıklarıyla taze demlenmiş bir kahve (belki aromatik bir latte veya hafif bir filtre kahve) eşliğinde günün planını çıkarma.',
    thought: 'Günün en sessiz anı. Kahve kokusu eşliğinde zihni bugünkü yoğunluğa hazırlama.',
  },
  {
    time: '09:30', phase: 'Teori ve Bloklar',
    zone: 1, emoji: '📐',
    title: 'Derin Odak',
    subtitle: 'Parlak Gündüz Tonları',
    activity: 'Mantıksal devre tasarımları, algoritmalar veya veri tabanı mimarileri üzerine çalışma. Dijital tasarım ilkelerini kağıda dökme.',
    thought: 'Sonsuz döngüler ve mantık kapıları arasında kaybolma saati.',
  },
  {
    time: '13:30', phase: 'Uygulama & Kodlama',
    zone: 1, emoji: '💻',
    title: 'Kodlama Seansı',
    subtitle: 'Canlı Gün Işığı',
    activity: 'PyQt5 arayüzleri geliştirme, Python kodları yazma, SQLite veri tabanlarını optimize etme. Hatalarla (bug) mücadele ve StackOverflow seansları.',
    thought: '"Çalışıyor ama neden çalışıyor?" ile "Çalışmıyor ama neden çalışmıyor?" arasındaki ince çizgi.',
  },
  {
    time: '17:00', phase: 'Gün Batımına Doğru Mola',
    zone: 2, emoji: '🍵',
    title: 'Zihin Boşaltma',
    subtitle: 'Sıcak Turuncu / Bakır Tonlar',
    activity: 'Yoğun kodlama seansından sonra zihni boşaltmak için bir fincan Matcha çayı eşliğinde derin bir nefes alma.',
    thought: 'Gözleri ekrandan ayırıp birkaç dakika uzaklara bakma zamanı.',
  },
  {
    time: '20:00', phase: 'Geliştirme & Düzenleme',
    zone: 3, emoji: '🚀',
    title: 'GitHub & Paylaşım',
    subtitle: 'Gün Batımı / Kızıl-Mor',
    activity: 'Yazılan projeleri GitHub\'a yükleme, commit mesajlarını yazma, LinkedIn\'de sektörel gelişmeleri ve teknik yazıları inceleme.',
    thought: 'Bugün de repoya yeşil bir nokta ekledik, yavaş ama istikrarlı adımlar.',
  },
  {
    time: '23:00', phase: 'Gece Kapanışı',
    zone: 4, emoji: '🌙',
    title: 'Dinlenme Vakti',
    subtitle: 'Derin Lacivert / Gece Mavisi',
    activity: 'Ekranları kapatıp günün yorgunluğunu hafif bir müzikle atma. Yarının planını zihinde kurup dinlenmeye çekilme.',
    thought: 'Kodlar stabil, veri tabanları sakin, zihin dinlenmeye hazır.',
  },
];

const WEEKEND = [
  {
    time: '09:30', phase: 'Ağır Adımlarla Sabah',
    zone: 0, emoji: '🌸',
    title: 'Acelesi Yok Sabahı',
    subtitle: 'Yumuşak, Aydınlık Sarı',
    activity: 'Hafta içinin alarm seslerinden uzak, acelesiz bir uyanış. Özenle hazırlanan, Toffee Nut veya Rose Cookie aromalı özel bir kahve tarifi denemesi.',
    thought: 'Acele etmeye gerek yok, bugün zaman benim tarafımda.',
  },
  {
    time: '12:00', phase: 'Ruhun Sesi',
    zone: 1, emoji: '🎻',
    title: 'Müzik & Yaratıcılık',
    subtitle: 'Parlak ve Canlı Tonlar',
    activity: 'Kemanı kutusundan çıkarma, yayını reçineleme. Parmak egzersizleri ve ardından uzun yılların getirdiği aşinalıkla klasik veya modern bir eserin tınılarında kaybolma.',
    thought: 'Yay tellere değdiğinde zihindeki tüm kodlar susuyor.',
  },
  {
    time: '15:30', phase: 'Rekabet & Strateji',
    zone: 2, emoji: '🎮',
    title: 'Gaming Seansı',
    subtitle: 'Dinamik / Enerjik Tonlar',
    activity: 'Bilgisayar başına bir kez kod yazmak için değil, taktiksel bir FPS oyununda (Valorant) arkadaşlarla turnuva tadında maçlar atmak için geçme.',
    thought: 'Doğru strateji, iyi bir crosshair yerleşimi ve takım uyumu. Bu sefer spike\'ı ima edeceğiz!',
  },
  {
    time: '19:00', phase: 'Kültür & Keşif',
    zone: 3, emoji: '📚',
    title: 'Okuma Saati',
    subtitle: 'Sıcak Akşam Tonları',
    activity: 'Teknik dokümanların dışında, sevilen bir romanı veya yabancı dildeki bir makaleyi/dergiyi okuma. Yeni ufuklar keşfetme.',
    thought: 'Farklı dünyaların kapılarını aralamak, yeni kelimelerle düşünmek.',
  },
  {
    time: '22:00', phase: 'Sinematik Gece',
    zone: 4, emoji: '🎬',
    title: 'Film / Dizi Keyfi',
    subtitle: 'Koyu Gece Mavisi / Siyah',
    activity: 'Işıkları kapatıp arkaya yaslanarak güzel bir film veya dizi izlemek ya da sevilen bir eseri dinleyerek sadece tavanı seyretme.',
    thought: 'Yeni haftaya başlamadan önce bataryaları tamamen doldurma anı.',
  },
];

const CLOCK_LABELS = {
  weekday: [
    ['☀️', '07:30 — Sabah'],
    ['🌤️', '09:30 — Kuşluk'],
    ['☀️', '13:30 — Öğleden Sonra'],
    ['🌅', '17:00 — İkindi'],
    ['🌆', '20:00 — Akşam'],
    ['🌙', '23:00 — Gece'],
  ],
  weekend: [
    ['🌸', '09:30 — Sabah'],
    ['🎵', '12:00 — Öğle'],
    ['🎮', '15:30 — İkindi'],
    ['📚', '19:00 — Akşam'],
    ['🎬', '22:00 — Gece'],
  ],
};

/* ── DURUM ────────────────────────────────────────────────────────────────── */
let currentMode     = 'weekday';
let currentZoneIdx  = -1;   // -1: henüz ayarlanmadı
let targetRGB       = null; // { start:[r,g,b], end:[r,g,b] }
let currentRGB      = null;
let rafId           = null;
let isNight         = false;

/* ── YILDIZ ANİMASYONU ────────────────────────────────────────────────────── */
const canvas = document.getElementById('stars-canvas');
const ctx    = canvas.getContext('2d');
let   stars  = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = Array.from({ length: 130 }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.6 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.005 + 0.002,
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.phase += s.speed;
    const alpha = 0.25 + Math.abs(Math.sin(s.phase)) * 0.65;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220, 225, 255, ${alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resizeCanvas();
initStars();
drawStars();
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });

/* ── RENK YARDIMCILARI ────────────────────────────────────────────────────── */

/**
 * İki RGB dizisi arasında t (0-1) oranında lineer interpolasyon.
 */
function lerpColor(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/**
 * #bg-overlay'e yumuşak gradient uygula.
 * RAF döngüsüyle currentRGB → targetRGB'ye easing ile ilerler.
 */
function applyBackground(startRGB, endRGB) {
  const overlay = document.getElementById('bg-overlay');
  const s = startRGB.join(',');
  const e = endRGB.join(',');
  overlay.style.background = `linear-gradient(160deg, rgb(${s}) 0%, rgb(${e}) 100%)`;
}

const LERP_SPEED = 0.028; // küçüldükçe daha yavaş / yumuşak geçiş

function animateBackground() {
  if (!currentRGB || !targetRGB) return;

  const newStart = lerpColor(currentRGB.start, targetRGB.start, LERP_SPEED);
  const newEnd   = lerpColor(currentRGB.end,   targetRGB.end,   LERP_SPEED);

  currentRGB.start = newStart;
  currentRGB.end   = newEnd;

  applyBackground(newStart, newEnd);

  const doneStart = newStart.every((v, i) => Math.abs(v - targetRGB.start[i]) < 1);
  const doneEnd   = newEnd.every(  (v, i) => Math.abs(v - targetRGB.end[i])   < 1);

  if (doneStart && doneEnd) {
    cancelAnimationFrame(rafId);
    rafId = null;
  } else {
    rafId = requestAnimationFrame(animateBackground);
  }
}

function transitionToZone(zoneIdx) {
  const zone = ZONES[zoneIdx];

  if (!currentRGB) {
    // ilk yüklemede anında uygula
    currentRGB = { start: [...zone.start], end: [...zone.end] };
    applyBackground(currentRGB.start, currentRGB.end);
    return;
  }

  targetRGB = { start: [...zone.start], end: [...zone.end] };

  if (!rafId) rafId = requestAnimationFrame(animateBackground);
}

/* ── YILDIZ GÖRÜNÜRLÜKLERİ ───────────────────────────────────────────────── */
function setNightMode(night) {
  if (night === isNight) return;
  isNight = night;
  canvas.classList.toggle('visible', night);
}

/* ── METİN RENK UYUMU ────────────────────────────────────────────────────── */
function updateTextColor(zoneIdx) {
  // Zone 4-5 (gece) koyu arka plan → açık metin
  const dark = zoneIdx >= 4;
  document.body.style.color = dark
    ? 'rgba(232, 234, 246, 0.92)'
    : 'rgba(28, 30, 46, 0.90)';
}

/* ── TİMELINE OLUŞTURMA ───────────────────────────────────────────────────── */
function buildTimeline(data) {
  const container = document.getElementById('timeline');

  // soluklaştır
  container.classList.add('fading');

  setTimeout(() => {
    container.innerHTML = '';

    data.forEach((block) => {
      const div = document.createElement('div');
      div.className   = 'time-block';
      div.dataset.zone = block.zone;

      div.innerHTML = `
        <div class="time-label-wrap">
          <span class="time-label">${block.time}</span>
          <span class="time-phase">${block.phase}</span>
        </div>

        <div class="dot"></div>

        <div class="card-wrap">
          <div class="card" role="button" tabindex="0" aria-expanded="false">
            <div class="card-header">
              <span class="card-emoji">${block.emoji}</span>
              <div>
                <div class="card-title">${block.title}</div>
                <div class="card-subtitle">${block.subtitle}</div>
              </div>
              <span class="card-chevron" aria-hidden="true">▾</span>
            </div>
            <div class="card-detail" role="region">
              <div class="card-detail-inner">
                <div class="detail-row">
                  <div class="detail-label">🎯 Etkinlik</div>
                  <div class="detail-text">${block.activity}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">💭 Hissiyat / Düşünce</div>
                  <div class="thought-text">${block.thought}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // kart aç/kapat
      const card = div.querySelector('.card');
      card.addEventListener('click', () => toggleCard(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') toggleCard(card);
      });

      container.appendChild(div);
    });

    container.classList.remove('fading');
    observeBlocks();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // zona sıfırla
    currentZoneIdx = -1;
    updateZoneFromScroll();

  }, 360);
}

/* ── KART AÇ / KAPAT ─────────────────────────────────────────────────────── */
function toggleCard(card) {
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.card.open').forEach(c => {
    c.classList.remove('open');
    c.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    card.classList.add('open');
    card.setAttribute('aria-expanded', 'true');
  }
}

/* ── INTERSECTION OBSERVER ────────────────────────────────────────────────── */
function observeBlocks() {
  const blocks = document.querySelectorAll('.time-block');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  blocks.forEach(b => obs.observe(b));
}

/* ── SCROLL → ZONE ────────────────────────────────────────────────────────── */
function updateZoneFromScroll() {
  const data   = currentMode === 'weekday' ? WEEKDAY : WEEKEND;
  const clocks = CLOCK_LABELS[currentMode];
  const blocks = document.querySelectorAll('.time-block');

  // İlerleme çubuğu
  const scrollTop = window.scrollY;
  const docH      = document.documentElement.scrollHeight - window.innerHeight;
  const pct       = docH > 0 ? (scrollTop / docH) * 100 : 0;
  document.getElementById('progress-bar').style.width = pct + '%';

  // Hangi blok ekranın ortasına en yakın?
  let activeIdx = 0;
  blocks.forEach((b, i) => {
    const rect = b.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.58) activeIdx = i;
  });

  const zoneIdx = data[activeIdx]?.zone ?? 0;

  // Saat etiketi güncelle
  const clockIdx = Math.min(activeIdx, clocks.length - 1);
  const clock    = document.getElementById('sticky-clock');
  clock.textContent = clocks[clockIdx][0] + ' ' + clocks[clockIdx][1];

  if (zoneIdx === currentZoneIdx) return;
  currentZoneIdx = zoneIdx;

  transitionToZone(zoneIdx);
  updateTextColor(zoneIdx);
  setNightMode(zoneIdx >= 4);
}

window.addEventListener('scroll', updateZoneFromScroll, { passive: true });

/* ── MOD GEÇIŞI ───────────────────────────────────────────────────────────── */
function setMode(mode) {
  if (mode === currentMode) return;
  currentMode = mode;

  const isWeekday = mode === 'weekday';

  document.getElementById('mode-badge').textContent = isWeekday ? '📅 HAFTA İÇİ' : '🌿 HAFTA SONU';
  document.getElementById('day-icon').textContent   = isWeekday ? '☀️' : '🌿';

  document.getElementById('main-title').innerHTML = isWeekday
    ? 'Bir Günümde <span>Ben</span>'
    : 'Hafta Sonumda <span>Ben</span>';

  document.getElementById('header-sub').textContent = isWeekday
    ? 'Odaklanma ve Gelişim Günü — Rutin, projeler, öğrenme süreci ve zihinsel yoğunluk üzerine bir gün.'
    : 'Ruhun Dinlenmesi ve Yaratıcılık — Deşarj olmak, sanatsal üretim, oyun ve kişisel hobilere vakit ayırmak üzerine bir gün.';

  // Aktif modun butonu gizlenir, diğer mod butonu görünür
  document.getElementById('btn-left').classList.toggle('hidden',   isWeekday);
  document.getElementById('btn-right').classList.toggle('hidden', !isWeekday);

  document.getElementById('mob-weekday').classList.toggle('active',  isWeekday);
  document.getElementById('mob-weekend').classList.toggle('active', !isWeekday);

  // renk geçişini sıfırla — yeniden başlayacak
  currentRGB = null;
  cancelAnimationFrame(rafId);
  rafId = null;

  buildTimeline(isWeekday ? WEEKDAY : WEEKEND);
}

/* ── BAŞLAT ───────────────────────────────────────────────────────────────── */
document.getElementById('btn-left').classList.add('hidden');
buildTimeline(WEEKDAY);
