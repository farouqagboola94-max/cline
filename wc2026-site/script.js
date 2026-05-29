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
  const kickoff = new Date('2026-06-11T20:00:00-05:00');

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
      const data = new FormData(lmForm);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      }).finally(() => {
        lmForm.style.display = 'none';
        document.getElementById('lmThanks').style.display = 'block';
      });
    });
  }
}

/* ════════════════════════════════════════════
   10. LIVE BADGE
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
   LIVE MATCH HUB
════════════════════════════════════════════ */
function initLiveMatch() {
  let clockMin = 67;
  setInterval(() => {
    if (clockMin < 90) {
      clockMin++;
      const el = document.getElementById('lsClock');
      if (el) el.textContent = clockMin;
    }
  }, 60000);

  const matches = [
    { home:'🇫🇷', homeName:'France', homeScore:2, homeRecord:'Group I · LIVE', away:'🇳🇴', awayName:'Norway', awayScore:1, awayRecord:"Group I · Haaland 54'", status:'live', clock:67 },
    { home:'🇦🇷', homeName:'Argentina', homeScore:0, homeRecord:'Group J · 19:00 WAT', away:'🇩🇿', awayName:'Algeria', awayScore:0, awayRecord:'Group J · Pre-Match', status:'pre-match', clock:0 },
    { home:'🇧🇷', homeName:'Brazil', homeScore:2, homeRecord:'Group C · FT', away:'🇲🇦', awayName:'Morocco', awayScore:2, awayRecord:"Group C · Ziyech 90+2'", status:'ft', clock:90 }
  ];

  document.querySelectorAll('#liveMatchSelector .match-sel-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#liveMatchSelector .match-sel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const m = matches[i];
      const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
      set('lsHomeFlag', m.home); set('lsHomeName', m.homeName); set('lsHomeScore', m.homeScore);
      set('lsHomeRecord', m.homeRecord); set('lsAwayFlag', m.away); set('lsAwayName', m.awayName);
      set('lsAwayScore', m.awayScore); set('lsAwayRecord', m.awayRecord); set('lsClock', m.clock);
      const pill = document.getElementById('lsStatusPill');
      if (pill) {
        pill.className = `ls-status-pill ${m.status}`;
        pill.textContent = { 'pre-match':'PRE-MATCH', live:'LIVE', ht:'HALF TIME', ft:'FULL TIME' }[m.status] || 'LIVE';
      }
    });
  });
}

/* ════════════════════════════════════════════
   STREAM
════════════════════════════════════════════ */
function loadStream(url) {
  const wrap = document.getElementById('streamPlayerWrap');
  const overlay = document.getElementById('streamOverlay');
  if (!wrap) return;
  if (overlay) overlay.style.display = 'none';
  const existing = wrap.querySelector('iframe');
  if (existing) existing.remove();

  let embedUrl = url;
  if (url.includes('youtube.com/watch?v=')) {
    const vid = url.split('v=')[1]?.split('&')[0];
    embedUrl = `https://www.youtube.com/embed/${vid}?autoplay=1`;
  } else if (url.includes('youtu.be/')) {
    const vid = url.split('youtu.be/')[1]?.split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${vid}?autoplay=1`;
  }
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  wrap.appendChild(iframe);
}

function initStream() {
  const loadBtn = document.getElementById('streamLoadBtn');
  const input = document.getElementById('streamUrlInput');
  const playBtn = document.getElementById('streamPlayBtn');
  if (loadBtn && input) {
    loadBtn.addEventListener('click', () => { if (input.value.trim()) loadStream(input.value.trim()); });
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && input.value.trim()) loadStream(input.value.trim()); });
  }
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const url = document.getElementById('streamUrlInput')?.value?.trim();
      loadStream(url || 'https://www.youtube.com/embed/live_stream?channel=UCsZ6K7m3DqhbASGIiPYRXIw');
    });
  }
}

/* ════════════════════════════════════════════
   INJURIES FILTER
════════════════════════════════════════════ */
function initInjuries() {
  document.querySelectorAll('#injuriesFilter .inj-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#injuriesFilter .inj-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#injuriesGrid .injury-team-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.continent === filter) ? '' : 'none';
      });
    });
  });
}

/* ════════════════════════════════════════════
   FAN ZONE
════════════════════════════════════════════ */
function voteMotm(idx) {
  if (localStorage.getItem('motmVote_wc26')) return;
  localStorage.setItem('motmVote_wc26', idx);
  const totals = [55, 32, 13];
  totals[idx] += 5;
  const sum = totals.reduce((a, b) => a + b, 0);
  totals.forEach((v, i) => {
    const pct = Math.round((v / sum) * 100);
    const bar = document.getElementById(`motmBar${i}`);
    const pctEl = document.getElementById(`motmPct${i}`);
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  });
  document.querySelectorAll('.motm-candidate').forEach((c, i) => { if (i === idx) c.classList.add('voted'); });
  const msg = document.getElementById('motmVotedMsg');
  if (msg) msg.style.display = 'block';
}

function hotTakeVote(btn, side) {
  const id = btn.dataset.id;
  if (localStorage.getItem(`ht_${id}`)) return;
  localStorage.setItem(`ht_${id}`, side);
  btn.closest('.ht-btns').querySelectorAll('.ht-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const countEl = document.getElementById(`${id}${side}`);
  if (countEl) countEl.textContent = (parseInt(countEl.textContent.replace(/,/g, '')) + 1).toLocaleString();
}

function rateStar(val) {
  if (localStorage.getItem('star_wc26')) return;
  localStorage.setItem('star_wc26', val);
  document.querySelectorAll('#starRating .star').forEach((s, i) => s.classList.toggle('active', i < val));
  const msg = document.getElementById('starVotedMsg');
  if (msg) msg.style.display = 'block';
}

function initFanZone() {
  const motmVote = localStorage.getItem('motmVote_wc26');
  if (motmVote !== null) {
    document.querySelectorAll('.motm-candidate').forEach((c, i) => { if (i === +motmVote) c.classList.add('voted'); });
    const msg = document.getElementById('motmVotedMsg');
    if (msg) msg.style.display = 'block';
  }
  ['ht1','ht2','ht3'].forEach(id => {
    const vote = localStorage.getItem(`ht_${id}`);
    if (vote) { const btn = document.querySelector(`.ht-btn[data-id="${id}"].${vote}`); if (btn) btn.classList.add('active'); }
  });
  const starVote = localStorage.getItem('star_wc26');
  if (starVote) {
    document.querySelectorAll('#starRating .star').forEach((s, i) => s.classList.toggle('active', i < +starVote));
    const msg = document.getElementById('starVotedMsg');
    if (msg) msg.style.display = 'block';
  }
  const stars = document.querySelectorAll('#starRating .star');
  stars.forEach((star, i) => {
    star.addEventListener('mouseenter', () => {
      if (localStorage.getItem('star_wc26')) return;
      stars.forEach((s, j) => { s.style.filter = j <= i ? 'none' : 'grayscale(1)'; s.style.opacity = j <= i ? '1' : '0.4'; });
    });
    star.addEventListener('mouseleave', () => {
      if (localStorage.getItem('star_wc26')) return;
      stars.forEach(s => { s.style.filter = ''; s.style.opacity = ''; });
    });
  });
}

/* ════════════════════════════════════════════
   GOAL CELEBRATION
════════════════════════════════════════════ */
function triggerGoalCelebration(scorer, minute) {
  const overlay = document.getElementById('goalOverlay');
  if (!overlay) return;
  const scorerEl = document.getElementById('goalScorerName');
  const minuteEl = document.getElementById('goalMinute');
  if (scorerEl) scorerEl.textContent = scorer;
  if (minuteEl) minuteEl.textContent = minute + "'";
  overlay.classList.add('active');
  startConfetti();
  setTimeout(closeGoalCelebration, 6000);
}

function closeGoalCelebration() {
  const overlay = document.getElementById('goalOverlay');
  if (overlay) overlay.classList.remove('active');
  stopConfetti();
}

let _confettiInterval = null;

function startConfetti() {
  const canvas = document.getElementById('goalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#00b4ff','#f97316','#39ff14','#facc15','#ef4444','#ffffff'];
  const particles = Array.from({length:120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 8 + 4,
    d: Math.random() * 120 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.floor(Math.random() * 10) - 10,
    ta: 0, tai: Math.random() * 0.07 + 0.05
  }));
  _confettiInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.ta += p.tai; p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.x += Math.sin(p.d) * 0.5; p.tilt = Math.sin(p.ta) * 15;
      if (p.y > canvas.height) { p.x = Math.random() * canvas.width; p.y = -10; }
      ctx.beginPath(); ctx.lineWidth = p.r / 2; ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4); ctx.stroke();
    });
  }, 20);
}

function stopConfetti() {
  if (_confettiInterval) { clearInterval(_confettiInterval); _confettiInterval = null; }
  const canvas = document.getElementById('goalCanvas');
  if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
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
  initLiveMatch();
  initStream();
  initInjuries();
  initFanZone();
});
