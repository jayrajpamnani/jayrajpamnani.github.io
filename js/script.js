/* ==========================================================================
   Academic Portfolio — Minimal JS
   ========================================================================== */

(function () {
  'use strict';

  // -----------------------------------------------------------------------
  // Theme: Respect system preference, allow manual override, persist choice
  // -----------------------------------------------------------------------

  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  // On load: use stored preference or fall back to system
  const stored = localStorage.getItem('theme');
  if (stored) {
    applyTheme(stored);
  } else {
    applyTheme(getSystemTheme());
  }

  // Listen for system preference changes (only if user hasn't manually chosen)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') || getSystemTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // -----------------------------------------------------------------------
  // Mobile Navigation
  // -----------------------------------------------------------------------

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // -----------------------------------------------------------------------
  // Smooth scroll for in-page anchors
  // -----------------------------------------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
