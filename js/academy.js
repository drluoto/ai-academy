/**
 * academy.js — Shared interactivity for academy.vitronia.ai
 *
 * Responsibilities:
 *   A) Intersection Observer — scroll-triggered fade-in animations
 *   B) Progress bar — scroll position indicator
 *   C) Expandable sections — toggle visibility
 *   D) Copy-to-clipboard — code block copy buttons
 *   E) Module navigation — active state highlighting
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // A) INTERSECTION OBSERVER — Scroll-triggered fade-in animations
  // ============================================================

  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // Apply staggered delay if specified via data-delay attribute
        const delay = el.dataset.delay;
        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }

        // Trigger the animation
        el.classList.add('visible');

        // One-time animation — stop observing once visible
        observer.unobserve(el);
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      animationObserver.observe(el);
    });
  }


  // ============================================================
  // B) PROGRESS BAR — Scroll position indicator
  // ============================================================

  const progressBar = document.querySelector('.progress-bar');

  if (progressBar) {
    let ticking = false;

    const updateProgressBar = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgressBar);
        ticking = true;
      }
    }, { passive: true });

    // Set initial state
    updateProgressBar();
  }


  // ============================================================
  // C) EXPANDABLE SECTIONS — Toggle visibility
  // ============================================================

  const expandableTriggers = document.querySelectorAll('.expandable-trigger');

  expandableTriggers.forEach(trigger => {
    // Ensure trigger has aria-expanded attribute
    if (!trigger.hasAttribute('aria-expanded')) {
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;

      if (!content || !content.classList.contains('expandable-content')) return;

      const isExpanded = content.classList.contains('expanded');

      // Toggle expanded state on content
      content.classList.toggle('expanded', !isExpanded);

      // Update aria-expanded on trigger
      trigger.setAttribute('aria-expanded', String(!isExpanded));

      // Rotate chevron icon if present
      const chevron = trigger.querySelector('.expandable-chevron');
      if (chevron) {
        chevron.classList.toggle('rotated', !isExpanded);
      }
    });
  });


  // ============================================================
  // D) COPY-TO-CLIPBOARD — Code block copy buttons
  // ============================================================

  const codeBlocks = document.querySelectorAll('.code-block');

  codeBlocks.forEach(block => {
    const copyBtn = block.querySelector('.code-copy-btn');
    const codeContent = block.querySelector('.code-content');

    if (!copyBtn || !codeContent) return;

    copyBtn.addEventListener('click', () => {
      const textToCopy = codeContent.textContent;

      const onSuccess = () => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Kopierad!';
        copyBtn.disabled = true;

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.disabled = false;
        }, 2000);
      };

      const onFailure = (err) => {
        console.warn('academy.js: Clipboard write failed', err);
      };

      // Modern clipboard API with fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(onSuccess).catch(() => {
          // Fallback on clipboard API rejection
          execCommandFallback(textToCopy, onSuccess, onFailure);
        });
      } else {
        execCommandFallback(textToCopy, onSuccess, onFailure);
      }
    });
  });

  /**
   * Fallback copy using deprecated execCommand for older browsers.
   */
  const execCommandFallback = (text, onSuccess, onFailure) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const success = document.execCommand('copy');
      if (success) {
        onSuccess();
      } else {
        onFailure(new Error('execCommand returned false'));
      }
    } catch (err) {
      onFailure(err);
    } finally {
      document.body.removeChild(textarea);
    }
  };


  // ============================================================
  // E) MODULE NAVIGATION — Active state highlighting
  // ============================================================

  const moduleNavLinks = document.querySelectorAll('.module-nav-link');

  if (moduleNavLinks.length > 0) {
    const currentPath = window.location.pathname;

    // Normalize path: strip trailing slash for consistent comparison
    const normalizePath = (path) => path.replace(/\/$/, '') || '/';
    const normalizedCurrent = normalizePath(currentPath);

    moduleNavLinks.forEach(link => {
      const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);

      if (linkPath === normalizedCurrent) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // Sticky section nav: highlight sections as user scrolls
    const sectionElements = document.querySelectorAll('[data-section]');

    if (sectionElements.length > 0) {
      let sectionTicking = false;

      const updateSectionNav = () => {
        const scrollMidpoint = window.scrollY + window.innerHeight / 3;

        let activeSection = null;

        sectionElements.forEach(section => {
          if (section.offsetTop <= scrollMidpoint) {
            activeSection = section.dataset.section;
          }
        });

        // Update nav links with matching data-section-target
        document.querySelectorAll('[data-section-target]').forEach(navLink => {
          const matches = navLink.dataset.sectionTarget === activeSection;
          navLink.classList.toggle('active', matches);
        });

        sectionTicking = false;
      };

      window.addEventListener('scroll', () => {
        if (!sectionTicking) {
          requestAnimationFrame(updateSectionNav);
          sectionTicking = true;
        }
      }, { passive: true });

      // Set initial state
      updateSectionNav();
    }
  }

  // --- Screenshot lightbox (click-to-zoom) ---
  {
    const lightbox = document.createElement('div');
    lightbox.className = 'screenshot-lightbox';
    const lightboxImg = document.createElement('img');
    lightboxImg.alt = '';
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    document.addEventListener('click', (e) => {
      const frame = e.target.closest('.screenshot-frame--zoomable');
      if (frame && e.target.classList.contains('screenshot-frame__img')) {
        lightboxImg.src = e.target.src;
        lightboxImg.alt = e.target.alt;
        lightbox.classList.add('is-active');
      }
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('is-active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('is-active');
    });
  }

}); // end DOMContentLoaded
