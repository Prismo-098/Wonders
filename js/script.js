// The New Seven Wonders of the World
// main script. all the wonder info is in data.js

// do they want less motion?
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// elements i need
const hero = document.querySelector('.hero');
const introText = document.querySelector('.intro p');
const wondersBox = document.getElementById('wonders');
const detail = document.getElementById('detail');
const rail = document.getElementById('rail');
const chips = document.getElementById('chips');
const tally = document.getElementById('tally');
const vote = document.getElementById('vote');
const progress = document.getElementById('progress');
const lightbox = document.getElementById('lightbox');
const toTop = document.getElementById('toTop');


/* ---------- hero ---------- */

// make 100 random stars
function makeStars() {
  let html = '';
  for (let i = 0; i < 100; i++) {
    html += '<i class="star" style="left:' + Math.random() * 100 + '%;top:' + Math.random() * 90 +
            '%;animation-delay:' + (-Math.random() * 3) + 's"></i>';
  }
  document.getElementById('stars').innerHTML = html;
}

// 3 shooting stars
function makeShootingStars() {
  if (reduceMotion) return;
  for (let i = 0; i < 3; i++) {
    const star = document.createElement('i');
    star.className = 'shoot';
    star.style.top = (6 + i * 13) + '%';
    star.style.left = (62 + i * 12) + '%';
    star.style.animationDelay = (2 + i * 4.5) + 's';
    star.style.animationDuration = (11 + i * 3) + 's';
    hero.appendChild(star);
  }
}

// clicking a dot on the orb scrolls to that wonder
function setupOrbDots() {
  const dots = hero.querySelectorAll('.ring i');
  dots.forEach(function (dot, i) {
    dot.title = wonders[i].name;
    dot.addEventListener('click', function () {
      document.getElementById(wonders[i].id).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
}

// the stars and orb move a little with the mouse
function setupMouseMove() {
  if (reduceMotion) return;
  hero.addEventListener('pointermove', function (e) {
    const box = hero.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;
    const y = (e.clientY - box.top) / box.height;
    hero.style.setProperty('--mx', ((x - 0.5) * 2).toFixed(3));
    hero.style.setProperty('--my', ((y - 0.5) * 2).toFixed(3));
    hero.style.setProperty('--px', (x * 100) + '%');
    hero.style.setProperty('--py', (y * 100) + '%');
    hero.classList.add('hover');
  });
  hero.addEventListener('pointerleave', function () {
    hero.classList.remove('hover');
    hero.style.setProperty('--mx', 0);
    hero.style.setProperty('--my', 0);
  });
}


/* ---------- intro text ---------- */

// put every word in a span so they can light up one by one
let introWords = [];
function splitIntro() {
  const words = introText.textContent.trim().split(/\s+/);
  introText.innerHTML = words.map(function (w) {
    return '<span class="wd">' + w + '</span>';
  }).join(' ');
  introWords = Array.from(introText.querySelectorAll('.wd'));
}


/* ---------- wonder sections ---------- */

// the colors of each wonder (css variables)
function colorStyle(w) {
  return '--sky1:' + w.colors.sky1 + ';--sky2:' + w.colors.sky2 +
         ';--accent:' + w.colors.accent + ';--ground:' + w.colors.ground;
}

// big photo at the top of a wonder section
function sceneHTML(w) {
  let letters = '';
  Array.from(w.name.toUpperCase()).forEach(function (ch, i) {
    letters += '<span style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>';
  });
  return '<div class="scene">' +
    '<div class="photo" role="img" aria-label="' + w.photoAlts[0] + '" data-speed=".1" style="background-image:url(' + w.photos[0] + ')"></div>' +
    '<div class="shade"></div>' +
    '<div class="big" data-x=".7" aria-hidden="true">' + letters + '</div>' +
    '</div>';
}

// build the 7 sections, the side dots and the buttons at the bottom
function buildWonders() {
  let sections = '';
  let dots = '';
  let buttons = '';

  wonders.forEach(function (w, n) {
    const num = function (v) { return (v < 10 ? '0' : '') + v; };
    sections += '<section class="w" id="' + w.id + '" style="' + colorStyle(w) + '">' +
      sceneHTML(w) +
      '<div class="ground">' +
      '<div class="idx" aria-hidden="true"><b>' + num(n + 1) + '</b><i></i><span>' + num(wonders.length) + '</span></div>' +
      '<div class="card">' +
        '<div><h2>' + w.name + '</h2><div class="meta">' + w.country + ', ' + w.when + '</div></div>' +
        '<p>' + w.intro + '</p>' +
        '<div class="fact"><b>' + w.bigNumber + '</b><span>' + w.bigNumberLabel + '</span></div>' +
        '<a class="more" href="#' + w.id + '-learn">Learn more</a>' +
      '</div></div>' +
      '</section>';

    dots += '<a href="#' + w.id + '" aria-label="' + w.name + '"></a>';
    buttons += '<button type="button" aria-pressed="false">' + w.name + '</button>';
  });

  wondersBox.innerHTML = sections;
  rail.innerHTML = dots;
  chips.innerHTML = buttons;
}


/* ---------- scrolling stuff ---------- */

// move things at different speeds (parallax)
function updateParallax() {
  if (reduceMotion) return;
  const vh = window.innerHeight;
  document.querySelectorAll('.hero, .w, #detail .scene').forEach(function (section) {
    const box = section.getBoundingClientRect();
    if (box.bottom < -100 || box.top > vh + 100) return;   // not on screen
    const p = box.top + box.height / 2 - vh / 2;
    section.querySelectorAll('[data-speed]').forEach(function (el) {
      el.style.transform = 'translate3d(0,' + (-p * parseFloat(el.dataset.speed)).toFixed(1) + 'px,0)';
    });
    const big = section.querySelector('[data-x]');
    if (big) big.style.transform = 'translate3d(' + (p * parseFloat(big.dataset.x)).toFixed(0) + 'px,0,0)';
  });
}

// progress bar + intro words
function updateScrollStuff() {
  const vh = window.innerHeight;
  const maxScroll = document.documentElement.scrollHeight - vh;
  const scrolled = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
  progress.style.transform = 'scaleX(' + scrolled.toFixed(4) + ')';
  toTop.style.setProperty('--p', scrolled.toFixed(3));
  toTop.classList.toggle('show', window.scrollY > vh * 0.6);

  if (!document.body.classList.contains('detail-open')) {
    const box = introText.getBoundingClientRect();
    const amount = Math.max(0, Math.min(1, (vh * 0.85 - box.top) / (box.height + vh * 0.25)));
    const lit = reduceMotion ? introWords.length : Math.round(amount * introWords.length);
    introWords.forEach(function (word, i) {
      word.classList.toggle('lit', i < lit);
    });
  }
}

// only run it once per frame so it stays smooth
let waiting = false;
function onScroll() {
  if (waiting) return;
  waiting = true;
  requestAnimationFrame(function () {
    updateParallax();
    updateScrollStuff();
    waiting = false;
  });
}

// when a wonder section comes into view add the class "in" and update the side dots
function watchSections() {
  const sections = Array.from(wondersBox.children);
  const dots = Array.from(rail.children);
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        const index = sections.indexOf(entry.target);
        dots.forEach(function (dot, i) { dot.classList.toggle('on', i === index); });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(function (s) { observer.observe(s); });
}

// vote section fades in
function watchVote() {
  const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(vote);
  vote.querySelectorAll('.pills span').forEach(function (pill, i) {
    pill.style.setProperty('--k', i);
  });
}


/* ---------- numbers that count up ---------- */

// add commas, like 21000 -> 21,000
function formatNumber(value, decimals, useComma) {
  let text = value.toFixed(decimals);
  if (useComma) {
    const parts = text.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    text = parts.join('.');
  }
  return text;
}

function setupCountUp() {
  const sections = Array.from(wondersBox.children);

  // find the number in each big fact (like "21,000" in "21,000 km")
  const facts = sections.map(function (section) {
    const el = section.querySelector('.fact b');
    const match = el.textContent.match(/^([\d,]*\.?\d+)(.*)$/);
    if (!match) return null;
    const fact = {
      el: el,
      end: parseFloat(match[1].replace(/,/g, '')),
      decimals: (match[1].split('.')[1] || '').length,
      useComma: match[1].indexOf(',') > -1,
      rest: match[2],
      done: false
    };
    if (!reduceMotion) el.textContent = formatNumber(0, fact.decimals, fact.useComma) + fact.rest;
    return fact;
  });

  function count(fact) {
    if (!fact || fact.done || reduceMotion) return;
    fact.done = true;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / 1600);
      const eased = 1 - Math.pow(1 - t, 3);
      fact.el.textContent = formatNumber(fact.end * eased, fact.decimals, fact.useComma) + fact.rest;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) count(facts[sections.indexOf(entry.target)]);
    });
  }, { threshold: 0.3 });
  sections.forEach(function (s) { observer.observe(s); });
}


/* ---------- plan list buttons + confetti ---------- */

const confettiColors = ['#ffc76b', '#e0607e', '#f1ecf8', '#8d5bd0'];

function confetti(x, y, amount, spread) {
  if (reduceMotion) return;
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('i');
    piece.className = 'spark';
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    piece.style.background = confettiColors[i % confettiColors.length];
    document.body.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const distance = (0.4 + Math.random() * 0.6) * spread;
    const animation = piece.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: 'translate(' + Math.cos(angle) * distance + 'px,' + (Math.sin(angle) * distance + 60) + 'px) scale(.2)', opacity: 0 }
    ], { duration: 800 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.2,1)' });
    animation.onfinish = function () { piece.remove(); };
  }
}

function updateTally() {
  const count = chips.querySelectorAll('[aria-pressed=true]').length;
  if (count === 0) tally.textContent = '';
  else if (count === 7) tally.textContent = 'All seven. That is a trip around the world.';
  else tally.textContent = count + ' of 7 on your list.';

  // little pop animation
  tally.classList.remove('pop');
  void tally.offsetWidth;
  tally.classList.add('pop');
}

function setupChips() {
  chips.addEventListener('click', function (e) {
    const button = e.target.closest('button');
    if (!button) return;

    const on = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', on ? 'false' : 'true');
    updateTally();

    if (!on) {
      const box = button.getBoundingClientRect();
      confetti(box.left + box.width / 2, box.top + box.height / 2, 12, 70);
      // all seven picked = big confetti
      if (chips.querySelectorAll('[aria-pressed=true]').length === 7) {
        const t = tally.getBoundingClientRect();
        confetti(window.innerWidth / 2, t.top, 90, Math.min(window.innerWidth, 700) / 1.6);
      }
    }
  });
}


/* ---------- learn more page ---------- */

function findIndex(id) {
  return wonders.findIndex(function (w) { return w.id === id; });
}

// is this wonder on the person's list?
function isSaved(w) {
  const button = chips.children[findIndex(w.id)];
  return !!button && button.getAttribute('aria-pressed') === 'true';
}

function saveButtonHTML(w) {
  const saved = isSaved(w);
  return '<button class="save" type="button" data-id="' + w.id + '" aria-pressed="' + saved + '">' +
         (saved ? '\u2665 Saved to your list' : '\u2661 Save to my list') + '</button>';
}

function quickFactsHTML(w) {
  let boxes = '';
  w.quickFacts.forEach(function (fact) {
    boxes += '<div><b>' + fact[1] + '</b><span>' + fact[0] + '</span></div>';
  });
  return '<div class="glance">' + boxes + '</div>';
}

function timelineHTML(w) {
  let items = '';
  w.timeline.forEach(function (item) {
    items += '<li><b>' + item[0] + '</b><span>' + item[1] + '</span></li>';
  });
  return '<h3>Timeline</h3><ol class="timeline">' + items + '</ol>';
}

function didYouKnowHTML(w) {
  return '<aside class="dyk"><div class="icon" aria-hidden="true">!</div>' +
         '<div><b>Did you know?</b><p>' + w.didYouKnow + '</p></div></aside>';
}

// second photo + more to know
function photoAndMoreHTML(w) {
  return '<figure><img src="' + w.photos[1] + '" alt="' + w.photoAlts[1] + '" loading="lazy">' +
         '<figcaption>' + w.caption + '</figcaption></figure>' +
         '<h3>More to know</h3><p>' + w.moreToKnow + '</p>';
}

// world map with the continents, a pin on the wonder and dots for the others
function mapHTML(w) {
  let lines = '';
  for (let x = -150; x <= 150; x += 30) {
    lines += '<line x1="' + (x + 180) + '" y1="0" x2="' + (x + 180) + '" y2="180"/>';
  }
  for (let y = -60; y <= 60; y += 30) {
    lines += '<line x1="0" y1="' + (90 - y) + '" x2="360" y2="' + (90 - y) + '"/>';
  }

  // continents and inland seas (drawn from world.js)
  let land = '';
  worldLand.forEach(function (d) { land += '<path d="' + d + '"/>'; });
  let lakes = '';
  worldLakes.forEach(function (d) { lakes += '<path d="' + d + '"/>'; });

  let otherDots = '';
  wonders.forEach(function (other) {
    if (other.id !== w.id) {
      otherDots += '<circle cx="' + (other.coords[1] + 180).toFixed(1) + '" cy="' + (90 - other.coords[0]).toFixed(1) + '" r="2.5" class="other"><title>' + other.name + '</title></circle>';
    }
  });

  const cx = (w.coords[1] + 180).toFixed(1);
  const cy = (90 - w.coords[0]).toFixed(1);
  const lat = Math.abs(w.coords[0]).toFixed(1) + '\u00b0 ' + (w.coords[0] < 0 ? 'S' : 'N');
  const lon = Math.abs(w.coords[1]).toFixed(1) + '\u00b0 ' + (w.coords[1] < 0 ? 'W' : 'E');

  // name label next to the pin (flips to the left side near the right edge)
  const onRight = w.coords[1] > 60;
  const labelX = onRight ? Number(cx) - 9 : Number(cx) + 9;
  const label = '<text class="pinlabel" x="' + labelX + '" y="' + (Number(cy) + 3) + '" text-anchor="' + (onRight ? 'end' : 'start') + '">' + w.name + '</text>';

  return '<h3>Where in the world</h3><figure class="map">' +
    '<svg viewBox="0 6 360 142" role="img" aria-label="Location of ' + w.name + ' on a world map">' +
    '<g class="grid">' + lines + '</g>' +
    '<g class="land">' + land + '</g><g class="lakes">' + lakes + '</g>' +
    otherDots +
    '<circle cx="' + cx + '" cy="' + cy + '" r="6" class="ping"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="5" class="here"/>' + label + '</svg>' +
    '<figcaption>' + lat + ', ' + lon + '. The faint dots are the other six wonders.</figcaption></figure>';
}

function visitInfoHTML(w) {
  let rows = '';
  w.visitInfo.forEach(function (row) {
    rows += '<div><b>' + row[0] + '</b><span>' + row[1] + '</span></div>';
  });
  return '<div class="visit-info">' + rows + '</div>';
}

function quizHTML(w) {
  let buttons = '';
  w.quiz.options.forEach(function (option) {
    buttons += '<button type="button">' + option + '</button>';
  });
  return '<h3>Test yourself</h3><div class="quiz" data-answer="' + w.quiz.answer + '">' +
         '<b>' + w.quiz.question + '</b><div class="options">' + buttons + '</div>' +
         '<p class="result" aria-live="polite"></p></div>';
}

// the next 3 wonders
function relatedHTML(w) {
  const start = findIndex(w.id);
  let cards = '';
  for (let k = 1; k <= 3; k++) {
    const other = wonders[(start + k) % wonders.length];
    cards += '<a href="#' + other.id + '-learn"><img src="' + other.photos[0] + '" alt="" loading="lazy">' +
             '<span>' + other.name + '</span></a>';
  }
  return '<h3>More wonders to see</h3><div class="related">' + cards + '</div>';
}

// put the whole learn more page together
function showDetail(w) {
  const next = wonders[(findIndex(w.id) + 1) % wonders.length];

  let bullets = '';
  w.bullets.forEach(function (b) { bullets += '<li>' + b + '</li>'; });

  detail.setAttribute('style', colorStyle(w));
  detail.innerHTML = sceneHTML(w) +
    '<div class="ground"><div class="dcard">' +
      '<h2>' + w.name + '</h2>' +
      '<div class="meta">' + w.place + ', ' + w.when + '</div>' +
      saveButtonHTML(w) +
      quickFactsHTML(w) +
      '<h3>The story</h3><p>' + w.story + '</p>' +
      timelineHTML(w) +
      didYouKnowHTML(w) +
      photoAndMoreHTML(w) +
      mapHTML(w) +
      '<h3>Visiting</h3><p>' + w.visitText + ' ' + w.tip + '</p>' +
      visitInfoHTML(w) +
      '<ul>' + bullets + '</ul>' +
      quizHTML(w) +
      relatedHTML(w) +
      '<div class="detail-buttons">' +
        '<a class="more" href="#' + w.id + '">Back to the wonders</a>' +
        '<a class="more alt" href="#' + next.id + '-learn">Next: ' + next.name + '</a>' +
      '</div>' +
    '</div></div>';

  detail.hidden = false;
  document.body.classList.add('detail-open');
  setupDetailExtras();
  setupDetailReveal();
}

// clicks inside the learn more page
detail.addEventListener('click', function (e) {
  const target = e.target;

  // save button
  const saveButton = target.closest('.save');
  if (saveButton) {
    const chip = chips.children[findIndex(saveButton.dataset.id)];
    chip.click();   // uses the same buttons as the plan list
    const saved = chip.getAttribute('aria-pressed') === 'true';
    saveButton.setAttribute('aria-pressed', saved);
    saveButton.textContent = saved ? '\u2665 Saved to your list' : '\u2661 Save to my list';
    return;
  }

  // quiz answer
  const answerButton = target.closest('.options button');
  if (answerButton) {
    const quiz = answerButton.closest('.quiz');
    const right = Number(quiz.dataset.answer);
    const all = Array.from(quiz.querySelectorAll('.options button'));
    const picked = all.indexOf(answerButton);

    all.forEach(function (b, i) {
      b.disabled = true;
      if (i === right) b.classList.add('right');
    });
    if (picked !== right) answerButton.classList.add('wrong');
    quiz.querySelector('.result').textContent = picked === right ?
      'Correct!' : 'Not quite. The answer is ' + all[right].textContent + '.';
    return;
  }

  // click a photo to make it bigger
  const photo = target.closest('figure img');
  if (photo) {
    lightbox.innerHTML = '<img src="' + photo.src + '" alt="' + photo.alt + '">';
    lightbox.hidden = false;
  }
});

lightbox.addEventListener('click', function () { lightbox.hidden = true; });
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') lightbox.hidden = true;
});


/* ---------- design extras: globe, name banner, cursor, tilt ---------- */

const fineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// the ball in the hero is a real 3D globe: drag to spin it, click a gold dot to fly to a wonder
function setupGlobe() {
  const core = document.querySelector('.core');
  if (!core || typeof worldLand === 'undefined') return;
  const orb = core.parentNode;
  const RAD = Math.PI / 180;

  // turn the map outlines into [longitude, sin(latitude), cos(latitude)] points (in radians),
  // with extra points added so long edges bend around the ball
  function outline(d) {
    const raw = [];
    const re = /(-?[\d.]+) (-?[\d.]+)/g;
    let m;
    while ((m = re.exec(d))) raw.push([parseFloat(m[1]) - 180, 90 - parseFloat(m[2])]);
    const pts = [];
    for (let i = 0; i < raw.length; i++) {
      const a = raw[i];
      const b = raw[(i + 1) % raw.length];
      const steps = Math.max(1, Math.ceil(Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) / 4));
      for (let k = 0; k < steps; k++) {
        const lon = (a[0] + (b[0] - a[0]) * k / steps) * RAD;
        const lat = (a[1] + (b[1] - a[1]) * k / steps) * RAD;
        pts.push([lon, Math.sin(lat), Math.cos(lat)]);
      }
    }
    return pts;
  }
  const shapes = worldLand.map(outline);

  // build the page bits: canvas + soft shading + a label under the globe
  const globe = document.createElement('div');
  globe.className = 'globe';
  const canvas = document.createElement('canvas');
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Interactive globe. Drag or use the arrow keys to turn it. Click a gold dot to fly to a wonder.');
  globe.appendChild(canvas);
  core.appendChild(globe);
  const tip = document.createElement('a');
  tip.className = 'globe-tip hint';
  tip.textContent = '\u2194  Drag the globe';
  orb.appendChild(tip);
  const ctx = canvas.getContext('2d');

  // where the globe is looking (radians) and how it is moving
  let lam0 = 15 * RAD;
  let phi0 = 22 * RAD;
  let velL = 0;
  let velP = 0;
  let dragging = false;
  let moved = 0;
  let last = null;
  let idleSince = performance.now();
  let fly = null;
  let selected = null;
  let hovered = null;
  let hits = [];
  let size = 0;
  let dpr = 1;
  let visible = true;
  let hasMoved = false;

  function setTip(text, href, mode) {
    tip.textContent = text;
    if (href) tip.setAttribute('href', href); else tip.removeAttribute('href');
    tip.className = 'globe-tip ' + mode;
  }

  // ----- drawing -----
  function draw() {
    const w = canvas.clientWidth;
    if (!w) return;
    if (w !== size || dpr !== (window.devicePixelRatio || 1)) {
      size = w;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    }
    const R = size / 2 * 0.985;
    const c = size / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const sinP0 = Math.sin(phi0);
    const cosP0 = Math.cos(phi0);
    function proj(lam, sinp, cosp) {
      const dl = lam - lam0;
      const cdl = Math.cos(dl);
      return [cosp * Math.sin(dl), cosP0 * sinp - sinP0 * cosp * cdl, sinP0 * sinp + cosP0 * cosp * cdl];
    }

    // faint grid lines
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = 'rgba(255,255,255,.13)';
    ctx.beginPath();
    function gridLine(points) {
      let pen = false;
      points.forEach(function (p) {
        const q = proj(p[0], Math.sin(p[1]), Math.cos(p[1]));
        if (q[2] > 0) {
          const x = c + R * q[0];
          const y = c - R * q[1];
          if (pen) ctx.lineTo(x, y); else ctx.moveTo(x, y);
          pen = true;
        } else {
          pen = false;
        }
      });
    }
    for (let lon = -180; lon < 180; lon += 30) {
      const line = [];
      for (let lat = -90; lat <= 90; lat += 5) line.push([lon * RAD, lat * RAD]);
      gridLine(line);
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const line = [];
      for (let lon = -180; lon <= 180; lon += 5) line.push([lon * RAD, lat * RAD]);
      gridLine(line);
    }
    ctx.stroke();

    // continents
    ctx.fillStyle = 'rgba(50,18,104,.72)';
    ctx.strokeStyle = 'rgba(255,226,168,.65)';
    ctx.lineWidth = 0.9;
    ctx.lineJoin = 'round';
    shapes.forEach(function (pts) {
      const out = [];
      let anyFront = false;
      pts.forEach(function (p) {
        const q = proj(p[0], p[1], p[2]);
        if (q[2] > 0) {
          anyFront = true;
          out.push([c + R * q[0], c - R * q[1], true]);
        } else {                                   // behind the ball: slide it onto the edge
          const len = Math.hypot(q[0], q[1]) || 1;
          out.push([c + R * q[0] / len, c - R * q[1] / len, false]);
        }
      });
      if (!anyFront) return;
      ctx.beginPath();
      out.forEach(function (p, i) {
        if (i === 0) { ctx.moveTo(p[0], p[1]); return; }
        const prev = out[i - 1];
        if (!p[2] && !prev[2]) {                   // two points on the edge: follow the edge
          const a1 = Math.atan2(prev[1] - c, prev[0] - c);
          const a2 = Math.atan2(p[1] - c, p[0] - c);
          let diff = a2 - a1;
          while (diff > Math.PI) diff -= 2 * Math.PI;
          while (diff < -Math.PI) diff += 2 * Math.PI;
          ctx.arc(c, c, R, a1, a2, diff < 0);
        } else {
          ctx.lineTo(p[0], p[1]);
        }
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    // gold dots for the 7 wonders
    hits = [];
    const t = performance.now() / 1000;
    wonders.forEach(function (w) {
      const lat = w.coords[0] * RAD;
      const q = proj(w.coords[1] * RAD, Math.sin(lat), Math.cos(lat));
      if (q[2] <= 0.03) return;
      const x = c + R * q[0];
      const y = c - R * q[1];
      const k = 0.65 + 0.35 * q[2];
      const isOn = selected === w.id || hovered === w.id;
      hits.push({ id: w.id, name: w.name, x: x, y: y });
      const glow = ctx.createRadialGradient(x, y, 0, x, y, (isOn ? 20 : 12) * k);
      glow.addColorStop(0, 'rgba(255,230,160,.95)');
      glow.addColorStop(1, 'rgba(255,199,107,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, (isOn ? 20 : 12) * k, 0, 7);
      ctx.fill();
      ctx.fillStyle = '#fff6d6';
      ctx.beginPath();
      ctx.arc(x, y, (isOn ? 4.5 : 3.2) * k, 0, 7);
      ctx.fill();
      if (selected === w.id) {                     // pulsing ring on the chosen wonder
        const pulse = (t * 0.9) % 1;
        ctx.strokeStyle = 'rgba(255,226,168,' + (1 - pulse).toFixed(2) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 6 + pulse * 16, 0, 7);
        ctx.stroke();
      }
    });
  }

  // ----- movement every frame -----
  let lastTime = performance.now();
  function frame(now) {
    const dt = Math.min(3, (now - lastTime) / 16.67);
    lastTime = now;
    if (visible && !document.body.classList.contains('detail-open') && !document.hidden) {
      if (fly) {
        let dl = fly.lam - lam0;
        while (dl > Math.PI) dl -= 2 * Math.PI;
        while (dl < -Math.PI) dl += 2 * Math.PI;
        const dp = fly.phi - phi0;
        lam0 += dl * Math.min(1, 0.09 * dt);
        phi0 += dp * Math.min(1, 0.09 * dt);
        if (Math.abs(dl) < 0.004 && Math.abs(dp) < 0.004) {
          fly = null;
          idleSince = now + 4000;                  // stay put for a few seconds
        }
      } else if (!dragging) {
        lam0 += velL * dt;
        phi0 += velP * dt;
        velL *= Math.pow(0.95, dt);
        velP *= Math.pow(0.95, dt);
        if (!reduceMotion && now - idleSince > 2500 && Math.abs(velL) < 0.0006) {
          lam0 += 0.0018 * dt;                     // slow turn when nobody is touching it
        }
      }
      phi0 = Math.max(-1.15, Math.min(1.15, phi0));
      draw();
    }
    requestAnimationFrame(frame);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(globe);
  }

  // ----- mouse and touch -----
  function pointIn(e) {
    const box = canvas.getBoundingClientRect();
    return { x: (e.clientX - box.left) / box.width * size, y: (e.clientY - box.top) / box.height * size };
  }
  function hitAt(e) {
    const p = pointIn(e);
    let best = null;
    let bestD = 16;
    hits.forEach(function (h) {
      const d = Math.hypot(h.x - p.x, h.y - p.y);
      if (d < bestD) { bestD = d; best = h; }
    });
    return best;
  }
  function flyTo(w) {
    selected = w.id;
    fly = { lam: w.coords[1] * RAD, phi: Math.max(-0.9, Math.min(0.9, w.coords[0] * RAD * 0.8)) };
    velL = 0;
    velP = 0;
    setTip(w.name + '  \u2192', '#' + w.id, 'link');
  }

  canvas.addEventListener('pointerdown', function (e) {
    dragging = true;
    moved = 0;
    last = { x: e.clientX, y: e.clientY };
    velL = 0;
    velP = 0;
    fly = null;
    canvas.setPointerCapture(e.pointerId);
    globe.classList.add('drag');
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!dragging) {
      if (e.pointerType !== 'mouse') return;
      const h = hitAt(e);
      const id = h ? h.id : null;
      if (id !== hovered) {
        hovered = id;
        globe.classList.toggle('pointing', !!id);
        if (id) setTip(h.name, null, 'hint');
        else if (selected) { const w = wonders[findIndex(selected)]; setTip(w.name + '  \u2192', '#' + w.id, 'link'); }
        else setTip(hasMoved ? '' : '\u2194  Drag the globe', null, hasMoved ? 'hint hide' : 'hint');
      }
      return;
    }
    const R = size / 2 * 0.985;
    const scale = size / canvas.getBoundingClientRect().width;
    const dx = (e.clientX - last.x) * scale;
    const dy = (e.clientY - last.y) * scale;
    last = { x: e.clientX, y: e.clientY };
    moved += Math.abs(dx) + Math.abs(dy);
    lam0 -= dx / R;
    phi0 += dy / R;
    velL = velL * 0.5 + (-dx / R) * 0.5;
    velP = velP * 0.5 + (dy / R) * 0.5;
    if (moved > 5 && !hasMoved) {
      hasMoved = true;
      setTip('', null, 'hint hide');
    }
  });
  function release(e) {
    if (!dragging) return;
    dragging = false;
    globe.classList.remove('drag');
    idleSince = performance.now();
    if (moved < 6) {                                // it was a click, not a drag
      const h = hitAt(e);
      if (h) { flyTo(wonders[findIndex(h.id)]); hasMoved = true; }
      velL = 0;
      velP = 0;
    } else if (selected) {
      selected = null;                               // you moved away from the chosen wonder
      setTip('', null, 'hint hide');
    }
    if (reduceMotion) { velL = 0; velP = 0; }
  }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('keydown', function (e) {
    const step = 0.12;
    if (e.key === 'ArrowLeft') lam0 -= step;
    else if (e.key === 'ArrowRight') lam0 += step;
    else if (e.key === 'ArrowUp') phi0 += step;
    else if (e.key === 'ArrowDown') phi0 -= step;
    else return;
    e.preventDefault();
    fly = null;
    idleSince = performance.now();
    if (!hasMoved) { hasMoved = true; setTip('', null, 'hint hide'); }
  });

  requestAnimationFrame(frame);
}

// scrolling banner with the wonder names. It speeds up when you scroll fast.
function setupMarquee() {
  let group = '';
  wonders.forEach(function (w) { group += '<span>' + w.name.toUpperCase() + '</span><i>\u2726</i>'; });
  const rows = [
    '<div class="marquee outline" aria-hidden="true"><div class="mq-track">' + group + group + group + group + '</div></div>',
    '<div class="marquee solid" aria-hidden="true"><div class="mq-track">' + group + group + group + group + '</div></div>'
  ];
  document.querySelector('.intro').insertAdjacentHTML('afterend', rows[0]);
  vote.insertAdjacentHTML('beforebegin', rows[1]);

  const tracks = Array.from(document.querySelectorAll('.mq-track')).map(function (el, i) {
    return { el: el, dir: i === 0 ? -1 : 1, x: 0, visible: false, row: el.parentNode };
  });
  if ('IntersectionObserver' in window) {
    const watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        tracks.forEach(function (t) { if (t.row === entry.target) t.visible = entry.isIntersecting; });
      });
    });
    tracks.forEach(function (t) { watcher.observe(t.row); });
  } else {
    tracks.forEach(function (t) { t.visible = true; });
  }
  if (reduceMotion) return;

  let lastY = window.scrollY;
  let speed = 0;
  function tick() {
    const dy = window.scrollY - lastY;
    lastY = window.scrollY;
    speed += (Math.min(60, Math.abs(dy)) - speed) * 0.12;
    tracks.forEach(function (t) {
      if (!t.visible) return;
      const half = t.el.scrollWidth / 2;
      t.x += t.dir * (0.7 + speed * 0.4);
      t.x = ((t.x % half) + half) % half - half;       // keep it between -half and 0
      t.el.style.transform = 'translate3d(' + t.x.toFixed(1) + 'px,0,0) skewX(' + (-t.dir * Math.min(10, speed * 0.3)).toFixed(2) + 'deg)';
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// glowing ring that follows the mouse (desktop only)
function setupCursor() {
  if (reduceMotion || !fineMouse) return;
  const ring = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  document.body.classList.add('has-cursor');
  let tx = -100, ty = -100, rx = -100, ry = -100;
  window.addEventListener('pointermove', function (e) {
    tx = e.clientX;
    ty = e.clientY;
    dot.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
    ring.classList.remove('hide');
    dot.classList.remove('hide');
    ring.classList.toggle('big', !!e.target.closest('a, button, .ring i, figure img, .chips button, .globe'));
  });
  document.documentElement.addEventListener('mouseleave', function () {
    ring.classList.add('hide');
    dot.classList.add('hide');
  });
  window.addEventListener('pointerdown', function () { ring.classList.add('press'); });
  window.addEventListener('pointerup', function () { ring.classList.remove('press'); });
  function follow() {
    rx += (tx - rx) * 0.16;
    ry += (ty - ry) * 0.16;
    ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
    requestAnimationFrame(follow);
  }
  requestAnimationFrame(follow);
}

// the wonder cards tilt toward the mouse and a shine follows it
function setupCardTilt() {
  if (reduceMotion || !fineMouse) return;
  wondersBox.addEventListener('pointermove', function (e) {
    const card = e.target.closest('.card');
    if (!card) return;
    const box = card.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width;
    const py = (e.clientY - box.top) / box.height;
    card.style.setProperty('--ry', ((px - 0.5) * 7).toFixed(2) + 'deg');
    card.style.setProperty('--rx', ((0.5 - py) * 5).toFixed(2) + 'deg');
    card.style.setProperty('--gx', (px * 100).toFixed(0) + '%');
    card.style.setProperty('--gy', (py * 100).toFixed(0) + '%');
  });
  wondersBox.addEventListener('pointerout', function (e) {
    const card = e.target.closest && e.target.closest('.card');
    if (card && !card.contains(e.relatedTarget)) {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    }
  });
}

// buttons pull toward the mouse a little
function setupMagnetic() {
  if (reduceMotion || !fineMouse) return;
  document.addEventListener('pointermove', function (e) {
    const btn = e.target.closest && e.target.closest('.card .more, .detail-buttons .more, .save');
    if (!btn) return;
    const box = btn.getBoundingClientRect();
    btn.style.translate = ((e.clientX - box.left - box.width / 2) * 0.18).toFixed(1) + 'px ' +
                          ((e.clientY - box.top - box.height / 2) * 0.3).toFixed(1) + 'px';
  });
  document.addEventListener('pointerout', function (e) {
    const btn = e.target.closest && e.target.closest('.card .more, .detail-buttons .more, .save');
    if (btn && !btn.contains(e.relatedTarget)) btn.style.translate = '';
  });
}

toTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
});


/* ---------- animations: loading screen, page wipe, scroll reveal ---------- */

// loading screen: counts up to 100%, lights the 7 dots, then splits open
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('ldbar');
const loaderCount = document.getElementById('ldcount');

function runLoader() {
  const body = document.body;
  function finish() {
    body.classList.remove('loading');
    loader.classList.add('done');
    setTimeout(function () { loader.remove(); }, 1300);
  }
  if (reduceMotion) { finish(); return; }

  const dots = loader.querySelectorAll('.ld-ring i');
  const minTime = 2400;                 // show it for at least this long (ms)
  const startTime = performance.now();
  let pageLoaded = document.readyState === 'complete';
  window.addEventListener('load', function () { pageLoaded = true; });

  let shown = 0;
  function tick(now) {
    const elapsed = now - startTime;
    // goes up smoothly, but waits at 92% until the page has really finished loading
    let target = Math.min(1, elapsed / minTime);
    target = 1 - Math.pow(1 - target, 2);
    if (!pageLoaded) target = Math.min(target, 0.92);
    shown += (target - shown) * 0.18;
    if (target >= 1 && shown > 0.995) shown = 1;

    const pct = Math.round(shown * 100);
    loaderBar.style.transform = 'scaleX(' + shown.toFixed(3) + ')';
    loaderCount.textContent = pct + '%';
    dots.forEach(function (dot, i) { dot.classList.toggle('lit', pct >= ((i + 1) / dots.length) * 100 - 1); });

    if (shown >= 1) { setTimeout(finish, 350); return; }
    if (elapsed > 8000) { finish(); return; }     // never get stuck
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// wipe between the home page and a learn more page
const curtain = document.getElementById('curtain');
const curtainText = document.getElementById('curtainText');
let wipeBusy = false;
let clickX = null;
let clickY = null;

// remember where you clicked so the wipe grows from there
document.addEventListener('click', function (e) {
  clickX = e.detail === 0 ? null : e.clientX;   // detail 0 = keyboard "click"
  clickY = e.detail === 0 ? null : e.clientY;
}, true);

function wipeTo(label, color, swap) {
  if (reduceMotion || wipeBusy) { swap(); return; }
  wipeBusy = true;
  curtain.style.setProperty('--curtain', color);
  curtain.style.setProperty('--cx', clickX === null ? '50%' : clickX + 'px');
  curtain.style.setProperty('--cy', clickY === null ? '50%' : clickY + 'px');
  curtainText.textContent = label;
  curtain.className = 'cover';

  setTimeout(function () {            // the screen is fully covered: swap the page now
    swap();
    curtain.className = 'leave';
    setTimeout(function () {
      curtain.className = '';
      wipeBusy = false;
    }, 750);
  }, 900);
}

// extras for the top picture: letters of the big name, floating sparkles
function setupDetailExtras() {
  const big = detail.querySelector('.big');
  if (big && !reduceMotion) {
    let html = '';
    Array.from(big.textContent).forEach(function (ch, i) {
      html += '<span style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>';
    });
    big.innerHTML = html;
  }
  const scene = detail.querySelector('.scene');
  if (scene && !reduceMotion) {
    let motes = '';
    for (let i = 0; i < 22; i++) {
      motes += '<i style="--x:' + (Math.random() * 100).toFixed(1) + '%;--s:' + (2 + Math.random() * 4).toFixed(1) +
               'px;--t:' + (6 + Math.random() * 7).toFixed(1) + 's;--d:' + (1.5 + Math.random() * 8).toFixed(1) +
               's;--dx:' + ((Math.random() - 0.5) * 90).toFixed(0) + 'px"></i>';
    }
    scene.insertAdjacentHTML('beforeend', '<div class="motes" aria-hidden="true">' + motes + '</div>');
  }
  detail.querySelectorAll('.visit-info div').forEach(function (row, i) { row.style.setProperty('--k', i); });
  detail.querySelectorAll('.dcard > ul li').forEach(function (li, i) { li.style.setProperty('--k', i); });
  detail.querySelectorAll('.map .other').forEach(function (dot, i) { dot.style.setProperty('--k', i); });
}

// numbers in the quick facts box count up when it appears
function countGlance(box) {
  if (reduceMotion) return;
  box.querySelectorAll('b').forEach(function (el) {
    const match = el.textContent.match(/^([\d,]*\.?\d+)(.*)$/);
    if (!match) return;
    const end = parseFloat(match[1].replace(/,/g, ''));
    const hasComma = match[1].indexOf(',') > -1;
    if (!hasComma && end >= 1000 && end <= 2100) return;     // looks like a year, leave it alone
    const decimals = (match[1].split('.')[1] || '').length;
    const rest = match[2];
    const start = performance.now() + 150;
    function step(now) {
      const t = Math.max(0, Math.min(1, (now - start) / 1400));
      el.textContent = formatNumber(end * (1 - Math.pow(1 - t, 3)), decimals, hasComma) + rest;
      if (t < 1) requestAnimationFrame(step);
    }
    el.textContent = formatNumber(0, decimals, hasComma) + rest;
    requestAnimationFrame(step);
  });
}

// the photo tilts toward the mouse and a shine follows it
detail.addEventListener('pointermove', function (e) {
  if (e.pointerType !== 'mouse' || reduceMotion) return;
  const fig = e.target.closest('figure:not(.map)');
  if (!fig) return;
  const box = fig.getBoundingClientRect();
  const px = (e.clientX - box.left) / box.width;
  const py = (e.clientY - box.top) / box.height;
  const img = fig.querySelector('img');
  img.style.setProperty('--ry', ((px - 0.5) * 8).toFixed(2) + 'deg');
  img.style.setProperty('--rx', ((0.5 - py) * 6).toFixed(2) + 'deg');
  fig.style.setProperty('--gx', (px * 100).toFixed(0) + '%');
  fig.style.setProperty('--gy', (py * 100).toFixed(0) + '%');
});
detail.addEventListener('pointerout', function (e) {
  const fig = e.target.closest && e.target.closest('figure:not(.map)');
  if (fig && !fig.contains(e.relatedTarget)) {
    const img = fig.querySelector('img');
    img.style.setProperty('--rx', '0deg');
    img.style.setProperty('--ry', '0deg');
  }
});

// things on the learn more page fade in one by one as you scroll to them
let detailObserver = null;
let detailShownAt = 0;
function setupDetailReveal() {
  if (document.body.classList.contains('loading')) {      // wait for the loading screen
    setTimeout(setupDetailReveal, 200);
    return;
  }
  if (detailObserver) detailObserver.disconnect();
  detailShownAt = performance.now();

  detail.querySelectorAll('.timeline li, .related a').forEach(function (el, i) {
    el.style.setProperty('--k', el.matches('.related a') ? i % 3 : i);
  });

  const items = detail.querySelectorAll('.dcard > *');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('shown'); });
    return;
  }
  detailObserver = new IntersectionObserver(function (entries) {
    // the first ones wait a moment so the page wipe can finish first
    const justOpened = performance.now() - detailShownAt < 1500;
    let n = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.transitionDelay = ((justOpened ? 450 : 0) + n * 90) + 'ms';
      el.classList.add('shown');
      if (el.classList.contains('glance')) countGlance(el);
      // delay only matters for the first fade, so clear it afterwards
      setTimeout(function () { el.style.transitionDelay = ''; }, 2500);
      n++;
      detailObserver.unobserve(el);
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { detailObserver.observe(el); });
}


/* ---------- which page to show ---------- */

// the address ends with #petra-learn when a learn more page is open
let firstRoute = true;
function route() {
  const match = location.hash.slice(1).match(/^(.+)-learn$/);
  const wonder = match && wonders[findIndex(match[1])];
  const isFirst = firstRoute;
  firstRoute = false;

  if (wonder) {
    const open = function () {
      showDetail(wonder);
      window.scrollTo({ top: 0, behavior: 'instant' });
      updateParallax();
      updateScrollStuff();
    };
    if (isFirst) open();
    else wipeTo(wonder.name, wonder.colors.accent, open);
  } else if (document.body.classList.contains('detail-open')) {
    // going back to the home page
    const hash = location.hash.slice(1);
    const goHome = function () {
      document.body.classList.remove('detail-open');
      detail.hidden = true;
      const section = document.getElementById(hash);
      if (section) section.scrollIntoView();
      updateParallax();
      updateScrollStuff();
    };
    wipeTo('The New Seven Wonders', '#ffc76b', goHome);
  }
}


/* ---------- start everything ---------- */

runLoader();
makeStars();
makeShootingStars();
splitIntro();
buildWonders();
setupOrbDots();
setupMouseMove();
setupChips();
watchSections();
watchVote();
setupCountUp();
setupGlobe();
setupMarquee();
setupCursor();
setupCardTilt();
setupMagnetic();

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
window.addEventListener('hashchange', route);

updateParallax();
updateScrollStuff();
route();
