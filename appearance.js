(() => {
  const key = 'cikedushu-showcase-appearance';
  const system = matchMedia('(prefers-color-scheme: dark)');
  let choice = 'system';
  try { choice = localStorage.getItem(key) || 'system'; } catch (_) {}
  const valid = value => ['system', 'light', 'dark'].includes(value) ? value : 'system';
  const apply = () => {
    choice = valid(choice);
    const mode = choice === 'system' ? (system.matches ? 'dark' : 'light') : choice;
    document.documentElement.dataset.theme = mode;
    document.querySelectorAll('[data-appearance]').forEach(el => { el.value = choice; });
    document.querySelectorAll('meta[name="theme-color"]').forEach(el => {
      el.removeAttribute('media'); el.content = mode === 'dark' ? '#171e1b' : '#f5f3ec';
    });
  };
  apply();
  system.addEventListener('change', apply);
  addEventListener('storage', event => {
    if (event.key === key || event.key === null) { choice = event.newValue || 'system'; apply(); }
  });
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelectorAll('[data-appearance]').forEach(el => el.addEventListener('change', () => {
      choice = valid(el.value);
      try { localStorage.setItem(key, choice); } catch (_) {}
      apply();
    }));
  });
})();
