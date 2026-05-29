/* ═══════════════════════════════════════════════════════════════
   WC2026 — MatchdayMatrix × OffsideMind — Main Script
═══════════════════════════════════════════════════════════════ */

/* ── Group Data ── */
const groups = {
  A: {
    name: 'Group A',
    teams: [
      { flag: '🇲🇽', name: 'Mexico',       p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇰🇷', name: 'South Korea',  p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇿🇦', name: 'South Africa', p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇨🇿', name: 'Czechia',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  B: {
    name: 'Group B',
    teams: [
      { flag: '🇨🇦', name: 'Canada',       p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇨🇭', name: 'Switzerland',  p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇧🇦', name: 'Bosnia-Herz.', p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇶🇦', name: 'Qatar',        p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  C: {
    name: 'Group C',
    teams: [
      { flag: '🇧🇷', name: 'Brazil',       p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇲🇦', name: 'Morocco',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', name: 'Scotland',     p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇭🇹', name: 'Haiti',        p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  D: {
    name: 'Group D',
    teams: [
      { flag: '🇺🇸', name: 'USA',          p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇨🇴', name: 'Colombia',     p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇵🇾', name: 'Paraguay',     p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇸🇦', name: 'Saudi Arabia', p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  E: {
    name: 'Group E',
    teams: [
      { flag: '🇩🇪', name: 'Germany',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇨🇮', name: "Côte d'Ivoire",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇪🇨', name: 'Ecuador',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇨🇼', name: 'Curaçao',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  F: {
    name: 'Group F',
    teams: [
      { flag: '🇳🇱', name: 'Netherlands',  p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇯🇵', name: 'Japan',        p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇸🇪', name: 'Sweden',       p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇹🇳', name: 'Tunisia',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  G: {
    name: 'Group G',
    teams: [
      { flag: '🇧🇪', name: 'Belgium',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇪🇬', name: 'Egypt',        p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇦🇹', name: 'Austria',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇨🇱', name: 'Chile',        p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  H: {
    name: 'Group H',
    teams: [
      { flag: '🇪🇸', name: 'Spain',        p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇺🇾', name: 'Uruguay',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇨🇻', name: 'Cape Verde',   p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇸🇮', name: 'Slovenia',     p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  I: {
    name: 'Group I — Group of Death',
    teams: [
      { flag: '🇫🇷', name: 'France',       p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇳🇴', name: 'Norway',       p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇸🇳', name: 'Senegal',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇮🇶', name: 'Iraq',         p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  J: {
    name: 'Group J',
    teams: [
      { flag: '🇦🇷', name: 'Argentina',    p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇩🇿', name: 'Algeria',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇦🇹', name: 'Austria',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇯🇴', name: 'Jordan',       p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  K: {
    name: 'Group K',
    teams: [
      { flag: '🇵🇹', name: 'Portugal',     p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇨🇩', name: 'DR Congo',     p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇨🇴', name: 'Colombia',     p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇺🇿', name: 'Uzbekistan',   p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  },
  L: {
    name: 'Group L',
    teams: [
      { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇬🇭', name: 'Ghana',        p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: true },
      { flag: '🇭🇷', name: 'Croatia',      p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
      { flag: '🇵🇦', name: 'Panama',       p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0, qualified: false },
    ]
  }
};

/* ── African Teams Data ── */
const africanTeams = [
  {
    flag: '🇲🇦', country: 'Morocco', group: 'GROUP C',
    story: 'The 2022 semifinalists. The benchmark for African football. Every other African nation measures themselves against what Regragui built. Morocco don\'t just want to qualify — they want to go further.',
    key: 'Hakim Ziyech, Youssef En-Nesyri, Achraf Hakimi',
    firstMatch: 'Brazil vs Morocco — June 13, 11pm WAT'
  },
  {
    flag: '🇸🇳', country: 'Senegal', group: 'GROUP I',
    story: 'Post-Mané Senegal. The identity rebuild. Sadio left a hole. A new generation is filling it, but nobody agrees on who leads them now. France in the group of death is their opening test.',
    key: 'Ismaila Sarr, Nampalys Mendy, new guard',
    firstMatch: 'France vs Senegal — June 15'
  },
  {
    flag: '🇪🇬', country: 'Egypt', group: 'GROUP G',
    story: "Salah's last dance. At 33, this is likely his final World Cup. He carries 100 million eyes on his shoulders every time he touches the ball. Egypt's entire campaign runs through him.",
    key: 'Mohamed Salah, Omar Marmoush',
    firstMatch: 'Belgium vs Egypt — June 15'
  },
  {
    flag: '🇩🇿', country: 'Algeria', group: 'GROUP J',
    story: 'They open against the world champions. Argentina vs Algeria — defending champions against a team with everything to prove and nothing to lose. The ultimate David vs Goliath scenario.',
    key: 'Riyad Mahrez, Ismaël Bennacer',
    firstMatch: 'Argentina vs Algeria — June 16, 2am WAT'
  },
  {
    flag: '🇬🇭', country: 'Ghana', group: 'GROUP L',
    story: 'The Black Stars carry the Nigerian gaze. 200 million absent fans watching the country that hurt them most in AFCON — now rooting for them anyway, because they\'re African. Kudus is their lightning rod.',
    key: 'Mohammed Kudus, Inaki Williams, Jordan Ayew',
    firstMatch: 'England vs Ghana — June 23, 9pm WAT'
  },
  {
    flag: '🇹🇳', country: 'Tunisia', group: 'GROUP F',
    story: 'Consistent qualifiers. Rarely celebrated. Tunisia have been at five of the last six World Cups and still don\'t get the respect they\'ve earned. This time, they want to prove why.',
    key: 'Wahbi Khazri, Youssef Msakni',
    firstMatch: 'Tunisia vs Group F opponent — TBC'
  },
  {
    flag: '🇨🇮', country: "Côte d'Ivoire", group: 'GROUP E',
    story: "The post-golden generation. No Drogba, no Touré. But AFCON 2023 champions. They arrive with renewed belief and a squad hungry to show the golden generation didn't take everything with it.",
    key: 'Sébastien Haller, Franck Kessié, Simon Adingra',
    firstMatch: "Côte d'Ivoire vs Ecuador — June 14"
  },
  {
    flag: '🇿🇦', country: 'South Africa', group: 'GROUP A',
    story: 'THE opening match. Bafana Bafana at Azteca on June 11. The same fixture that opened the 2010 World Cup in South Africa. The symmetry is not lost on anyone. The symbolism is enormous.',
    key: 'Percy Tau, Bongani Zungu',
    firstMatch: 'Mexico vs South Africa — June 11, 8pm WAT — OPENER'
  },
  {
    flag: '🇨🇩', country: 'DR Congo', group: 'GROUP K',
    story: '1974. That was the last time. 52 years. Wars, instability, heartbreak — and then Kinshasa erupted when they qualified. They open against Ronaldo\'s Portugal on June 17. The longest absence ends.',
    key: 'Cédric Bakambu, Arthur Masuaku',
    firstMatch: 'Portugal vs DR Congo — June 17, 6pm WAT'
  },
  {
    flag: '🇨🇻', country: 'Cape Verde', group: 'GROUP H',
    story: 'Population: 500,000. World Cup debut. The smallest nation at the tournament. They will face Spain and Lamine Yamal. Nobody expects them to win. That\'s exactly what makes them dangerous.',
    key: 'Ryan Mendes, Garry Rodrigues',
    firstMatch: 'Spain vs Cape Verde — June 15'
  }
];

/* ════════════════════════════════════════════
   1. COUNTDOWN TIMER
════════════════════════════════════════════ */
function initCountdown() {
  const kickoff = new Date('2026-06-11T20:00:00-05:00'); // 8pm WAT = 3pm ET

  function update() {
    const now = new Date();
    const diff = kickoff - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    document.getElementById('cd-days').textContent  = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent  = pad(mins);
    document.getElementById('cd-secs').textContent  = pad(secs);

    const nextMatch = document.getElementById('next-match-countdown');
    if (nextMatch) {
      if (days > 0) nextMatch.textContent = `${days}d ${pad(hours)}h`;
      else nextMatch.textContent = `${pad(hours)}h ${pad(mins)}m`;
    }
  }

  update();
  setInterval(update, 1000);
}

/* ════════════════════════════════════════════
   2. PARTICLE CANVAS
════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.4 + 0.1,
    color: Math.random() > 0.7 ? '#f97316' : '#00b4ff'
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    particles.forEach(p => { p.x = Math.random() * W; p.y = Math.random() * H; });
  });
}

/* ════════════════════════════════════════════
   3. NAVIGATION
════════════════════════════════════════════ */
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Highlight active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(n => {
          n.classList.toggle('nav-link--active', n.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

/* ════════════════════════════════════════════
   4. MATCH CENTER TABS
════════════════════════════════════════════ */
function initMatchCenterTabs() {
  document.querySelectorAll('.mctab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.mctab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.mctab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = document.getElementById(`tab-${tab}`);
      if (content) content.classList.add('active');
    });
  });
}

/* ════════════════════════════════════════════
   5. SCHEDULE FILTER
════════════════════════════════════════════ */
function initScheduleFilter() {
  document.querySelectorAll('.sf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.md-match').forEach(match => {
        if (filter === 'all') {
          match.style.display = '';
        } else {
          const tags = match.dataset.tags || '';
          match.style.display = tags.includes(filter) ? '' : 'none';
        }
      });
    });
  });
}

/* ════════════════════════════════════════════
   6. GROUP STANDINGS
════════════════════════════════════════════ */
function renderGroup(groupKey) {
  const group = groups[groupKey];
  const panel = document.getElementById('standingsPanel');
  if (!panel || !group) return;

  const isDeathGroup = groupKey === 'I';

  panel.innerHTML = `
    <div class="standings-group-title">
      <span class="sgt-badge">GROUP ${groupKey}</span>
      ${group.name}
      ${isDeathGroup ? '<span style="color:var(--orange);font-size:14px;margin-left:8px;">⚡ Group of Death</span>' : ''}
    </div>
    <table class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>
        ${group.teams.map((t, i) => `
          <tr class="${i < 2 ? 'qualified' : 'eliminated'}">
            <td class="td-pos ${i < 2 ? 'pos-q' : 'pos-e'}">${i + 1}</td>
            <td>
              <div class="td-team">
                <span class="td-flag">${t.flag}</span>
                ${t.name}
              </div>
            </td>
            <td>${t.p}</td>
            <td>${t.w}</td>
            <td>${t.d}</td>
            <td>${t.l}</td>
            <td>${t.gf}</td>
            <td>${t.ga}</td>
            <td>${t.gf - t.ga}</td>
            <td class="td-pts ${i === 0 ? 'td-pts-lead' : ''}">${t.pts}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="qualify-bar">
      <div class="qb-item">
        <span class="qb-dot qb-dot--q"></span>
        Advance to Round of 32
      </div>
      <div class="qb-item">
        <span class="qb-dot qb-dot--e"></span>
        Eliminated
      </div>
      <span style="margin-left:auto;font-size:11px;color:var(--gray-600)">Pre-tournament (based on our predicted finish order)</span>
    </div>
  `;
}

function initStandings() {
  renderGroup('A');

  document.querySelectorAll('.gn-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gn-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGroup(btn.dataset.group);
    });
  });
}

/* ════════════════════════════════════════════
   7. AFRICAN TEAMS GRID
════════════════════════════════════════════ */
function initAfricanGrid() {
  const grid = document.getElementById('africaGrid');
  if (!grid) return;

  grid.innerHTML = africanTeams.map((t, i) => `
    <div class="africa-card" style="transition-delay: ${i * 60}ms">
      <div class="africa-card-flag">${t.flag}</div>
      <div class="africa-card-country">${t.country}</div>
      <div class="africa-card-group">${t.group}</div>
      <p class="africa-card-story">${t.story}</p>
      <div class="africa-card-key"><strong>Key Players:</strong> ${t.key}</div>
      <div class="africa-card-first-match">📅 ${t.firstMatch}</div>
    </div>
  `).join('');

  // Observe for animation
  const cards = grid.querySelectorAll('.africa-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  cards.forEach(c => obs.observe(c));
}

/* ════════════════════════════════════════════
   8. SCROLL REVEAL
════════════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ════════════════════════════════════════════
   9. FORMS
════════════════════════════════════════════ */
function initForms() {
  const predForm = document.getElementById('predForm');
  if (predForm) {
    predForm.addEventListener('submit', e => {
      e.preventDefault();
      const pick = document.getElementById('champPick').value;
      const results = document.getElementById('predResults');
      if (pick) {
        results.textContent = `Locked in: ${pick} 🏆 — We'll check back July 19.`;
        predForm.reset();
      }
    });
  }

  const lmForm = document.getElementById('lmForm');
  if (lmForm) {
    lmForm.addEventListener('submit', e => {
      e.preventDefault();
      lmForm.style.display = 'none';
      document.getElementById('lmThanks').style.display = 'block';
    });
  }
}

/* ════════════════════════════════════════════
   10. LIVE BADGE (simulated — will be real during tournament)
════════════════════════════════════════════ */
function initLiveBadge() {
  const badge = document.getElementById('liveBadge');
  if (!badge) return;
  const now = new Date();
  const kickoff = new Date('2026-06-11T20:00:00-05:00');
  if (now >= kickoff) {
    badge.classList.add('is-live');
  }
}

/* ════════════════════════════════════════════
   11. HERO TITLE ANIMATION
════════════════════════════════════════════ */
function initHeroAnimation() {
  const lines = document.querySelectorAll('.hero-title-line1, .hero-title-line2, .hero-title-line3');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(20px)';
    line.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 200 + i * 200);
  });

  const sub = document.querySelector('.hero-sub');
  if (sub) {
    sub.style.opacity = '0';
    sub.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { sub.style.opacity = '1'; }, 900);
  }

  const countdown = document.querySelector('.countdown-block');
  if (countdown) {
    countdown.style.opacity = '0';
    countdown.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { countdown.style.opacity = '1'; }, 1100);
  }
}

/* ════════════════════════════════════════════
   0. TICKER AUTO-UPDATE
════════════════════════════════════════════ */
function updateTicker() {
  const kickoff = new Date('2026-06-11T20:00:00-05:00');
  const now = new Date();
  const diff = kickoff - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.querySelectorAll('.ticker-item').forEach(item => {
    if (item.textContent.includes('TO KICKOFF')) {
      item.textContent = diff > 0
        ? `⚡ ${days} ${days === 1 ? 'DAY' : 'DAYS'} TO KICKOFF — MEXICO VS SOUTH AFRICA — ESTADIO AZTECA — JUNE 11`
        : `⚡ THE WORLD CUP IS LIVE — FOLLOW EVERY MATCH HERE`;
    }
  });
}

/* ════════════════════════════════════════════
   INIT ALL
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  updateTicker();
  initCountdown();
  initParticles();
  initNav();
  initMatchCenterTabs();
  initScheduleFilter();
  initStandings();
  initAfricanGrid();
  initReveal();
  initForms();
  initLiveBadge();
  initHeroAnimation();
});
