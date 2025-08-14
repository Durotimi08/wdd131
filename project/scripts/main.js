/* Utility functions */
function select(selector, scope = document) {
  return scope.querySelector(selector);
}
function selectAll(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/* State */
const STORAGE_KEYS = {
  theme: 'gah:theme',
  profile: 'gah:profile',
};

/* Theme */
function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme) || '';
}
function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
}
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
  const btn = select('#theme-toggle');
  if (btn) btn.setAttribute('aria-pressed', String(next === 'dark'));
}

/* Profile greeting */
function updateGreeting() {
  const greeting = select('#greeting');
  if (!greeting) return;
  const profileRaw = localStorage.getItem(STORAGE_KEYS.profile);
  const profile = profileRaw ? JSON.parse(profileRaw) : null;
  if (profile && profile.name) {
    greeting.hidden = false;
    greeting.textContent = `Welcome back, ${profile.name}!`;
  } else {
    greeting.hidden = true;
  }
}

/* Tips data (arrays, objects) */
const tips = [
  { id: 1, title: 'Water deeply, not often', topic: 'watering', experience: 'beginner', body: 'Aim for soil moisture like a wrung-out sponge. Deep watering encourages strong roots.' },
  { id: 2, title: 'Morning sun is gentle', topic: 'sunlight', experience: 'beginner', body: 'Place sun-loving plants where they receive 6–8 hours, ideally with morning light.' },
  { id: 3, title: 'Check before you water', topic: 'watering', experience: 'intermediate', body: 'Insert a finger 1–2 inches into the soil; if dry, it’s time to water. Overwatering is common.' },
  { id: 4, title: 'Scout for pests weekly', topic: 'pests', experience: 'beginner', body: 'Look under leaves. Remove pests by hand or spray with water before using treatments.' },
  { id: 5, title: 'Rotate containers', topic: 'sunlight', experience: 'intermediate', body: 'Rotate pots weekly for even growth when sunlight comes from one direction.' },
];

/* Resources data */
const resources = [
  { title: 'Beginner’s Guide to Container Gardening', url: 'https://www.almanac.com/container-gardening-beginners', source: 'The Old Farmer’s Almanac' },
  { title: 'Vegetable Garden Planning', url: 'https://extension.umn.edu/vegetables/garden-planning', source: 'UMN Extension' },
  { title: 'Integrated Pest Management Basics', url: 'https://ipm.ucanr.edu/GENERAL/whatisipm.html', source: 'UC IPM' },
];

/* Render helpers (template literals) */
function renderTipCard(tip) {
  return `
  <article class="tip-card" data-id="${tip.id}">
    <h4>${tip.title}</h4>
    <p class="tip-meta">Topic: ${tip.topic} • Level: ${tip.experience}</p>
    <p>${tip.body}</p>
  </article>`;
}

function renderResourceItem(r) {
  return `<li><a href="${r.url}" target="_blank" rel="noopener">${r.title}</a> — ${r.source}</li>`;
}

/* Latest tip selection (array methods, conditional) */
function selectLatestTip(preferredLevel) {
  let pool = preferredLevel ? tips.filter(t => t.experience === preferredLevel) : tips;
  if (!pool.length) pool = tips;
  // pick last item after sort by id for determinism
  return pool.slice().sort((a, b) => a.id - b.id).at(-1);
}

/* Page initializers */
function initHome() {
  const latestTipEl = select('#latest-tip');
  if (latestTipEl) {
    const profileRaw = localStorage.getItem(STORAGE_KEYS.profile);
    const profile = profileRaw ? JSON.parse(profileRaw) : null;
    const preferredLevel = profile?.experience || '';
    const tip = selectLatestTip(preferredLevel);
    if (tip) {
      latestTipEl.innerHTML = renderTipCard(tip);
    }
  }

  const form = select('#tip-form');
  if (form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const name = select('#name', form).value.trim();
      const email = select('#email', form).value.trim();
      const experience = select('#experience', form).value;
      const messageEl = select('#form-message', form);

      // Basic validation (HTML will enforce as well)
      if (!name || name.length < 2) {
        messageEl.textContent = 'Please enter your first name (at least 2 characters).';
        messageEl.style.color = '#b00020';
        return;
      }
      if (!email || !email.includes('@')) {
        messageEl.textContent = 'Please enter a valid email address.';
        messageEl.style.color = '#b00020';
        return;
      }
      if (!experience) {
        messageEl.textContent = 'Please select your experience level.';
        messageEl.style.color = '#b00020';
        return;
      }

      // Save profile (object) to localStorage
      const profile = { name, email, experience };
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));

      // UI feedback
      messageEl.textContent = `Thanks, ${name}! You’re subscribed. Look for your weekly tip soon.`;
      messageEl.style.color = 'var(--color-primary)';
      updateGreeting();
    });
  }
}

function initTipsPage() {
  const grid = select('#tips-grid');
  if (!grid) return;

  const render = () => {
    const exp = select('#filter-experience').value;
    const topic = select('#filter-topic').value;
    let results = tips.slice();
    if (exp !== 'all') results = results.filter(t => t.experience === exp);
    if (topic !== 'all') results = results.filter(t => t.topic === topic);
    // sort by title
    results.sort((a, b) => a.title.localeCompare(b.title));
    grid.innerHTML = results.map(renderTipCard).join('');
  };

  const form = select('#filter-form');
  form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
  render();
}

function initResourcesPage() {
  const list = select('#resource-list');
  if (!list) return;
  list.innerHTML = resources.map(renderResourceItem).join('');
}

/* Global init */
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = select('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Theme
  const saved = getSavedTheme();
  if (saved) applyTheme(saved);
  const toggleBtn = select('#theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
    toggleBtn.setAttribute('aria-pressed', String((saved || '') === 'dark'));
  }

  updateGreeting();
  initHome();
  initTipsPage();
  initResourcesPage();
});