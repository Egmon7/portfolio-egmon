(function () {
  const header = document.getElementById('site-header');
  const burger = document.getElementById('burger-btn');
  const panel = document.getElementById('mobile-panel');
  const threshold = 24;
  let ticking = false;

  function updateHeader() {
    const scrolled = window.scrollY > threshold;
    header.classList.toggle('is-scrolled', scrolled);
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateHeader();

  function setMenuOpen(open) {
    burger.classList.toggle('is-open', open);
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('menu-open', open);
  }

  burger.addEventListener('click', function () {
    setMenuOpen(!panel.classList.contains('is-open'));
  });

  panel.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      setMenuOpen(false);
      burger.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768 && panel.classList.contains('is-open')) {
      setMenuOpen(false);
    }
  });

  const filterBar = document.getElementById('project-filters');
  const projectCards = document.querySelectorAll('#project-grid .project-card');
  const projectEmpty = document.getElementById('project-empty');

  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      const btn = e.target.closest('.project-filter');
      if (!btn) return;

      const filter = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('.project-filter').forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      let visible = 0;
      projectCards.forEach(function (card) {
        const stack = card.getAttribute('data-stack');
        const show = filter === 'all' || stack === filter;
        card.classList.toggle('is-hidden', !show);
        if (show) {
          card.classList.add('is-in');
          visible += 1;
        }
      });

      if (projectEmpty) {
        projectEmpty.classList.toggle('is-visible', visible === 0);
      }
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('is-in');
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  const themeBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    const light = theme === 'light';
    if (light) document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark');
    } catch (e) {}
    if (!themeBtn) return;
    themeBtn.setAttribute('aria-pressed', light ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', light ? 'Activer le mode sombre' : 'Activer le mode clair');
  }

  if (themeBtn) {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    themeBtn.addEventListener('click', function () {
      const light = document.documentElement.getAttribute('data-theme') === 'light';
      applyTheme(light ? 'dark' : 'light');
    });
  }
})();
