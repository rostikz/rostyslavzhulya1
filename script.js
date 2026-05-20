
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const currentItem = btn.parentElement;
    const isAlreadyOpen = currentItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });

    if (!isAlreadyOpen) {
      currentItem.classList.add('active');
    }
  });
});

document.querySelectorAll('a[href^="pages/"]').forEach(link => {
  link.addEventListener('click', () => {
    sessionStorage.setItem('landingScroll', String(window.scrollY));
  });
});

window.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView();
    }, 100);
  }
});


/* =========================================================
   TESTIMONIANZE MOBILE — AUTO SCROLL + SWIPE
   ========================================================= */
(function () {
  function initMobileTestimonialsAutoSwipe() {
    const carousel = document.querySelector(".testimonial-carousel");
    const track = document.querySelector(".testimonial-track");

    if (!carousel || !track) return;
    if (carousel.dataset.autoSwipeInit === "true") return;
    carousel.dataset.autoSwipeInit = "true";

    const originalQuotes = Array.from(track.children);
    if (originalQuotes.length && !track.dataset.clonedForMobile) {
      originalQuotes.forEach(function (node) {
        track.appendChild(node.cloneNode(true));
      });
      track.dataset.clonedForMobile = "true";
    }

    let paused = false;
    let lastTime = null;
    let resumeTimer = null;

    function isMobile() {
      return window.matchMedia("(max-width: 1040px)").matches;
    }

    function pauseAuto() {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        paused = false;
      }, 2200);
    }

    function halfWidth() {
      return Math.max(0, track.scrollWidth / 2);
    }

    function tick(time) {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (isMobile() && !paused) {
        carousel.scrollLeft += delta * 0.045;

        const half = halfWidth();
        if (half > 20 && carousel.scrollLeft >= half) {
          carousel.scrollLeft -= half;
        }
      }

      requestAnimationFrame(tick);
    }

    ["touchstart", "pointerdown", "mousedown", "wheel"].forEach(function (eventName) {
      carousel.addEventListener(eventName, pauseAuto, { passive: true });
    });

    carousel.addEventListener("scroll", function () {
      if (!isMobile()) return;
      const half = halfWidth();
      if (half > 20 && carousel.scrollLeft >= half) {
        carousel.scrollLeft -= half;
      }
    }, { passive: true });

    requestAnimationFrame(tick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileTestimonialsAutoSwipe);
  } else {
    initMobileTestimonialsAutoSwipe();
  }
})();

