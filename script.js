
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
  function initMobileTestimonials() {
    const carousel = document.querySelector(".testimonial-carousel");
    const track = document.querySelector(".testimonial-track");

    if (!carousel || !track) return;

    let paused = false;
    let resumeTimer = null;
    let rafId = null;
    let lastTime = null;

    function isMobile() {
      return window.matchMedia("(max-width: 1040px)").matches;
    }

    function pauseAuto() {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        paused = false;
      }, 2600);
    }

    function getHalfScrollWidth() {
      return track.scrollWidth / 2;
    }

    function animate(time) {
      if (!isMobile()) {
        lastTime = time;
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!paused) {
        carousel.scrollLeft += delta * 0.025;

        const half = getHalfScrollWidth();
        if (half > 0 && carousel.scrollLeft >= half) {
          carousel.scrollLeft = carousel.scrollLeft - half;
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    ["touchstart", "pointerdown", "mousedown", "wheel"].forEach(function (eventName) {
      carousel.addEventListener(eventName, pauseAuto, { passive: true });
    });

    carousel.addEventListener("scroll", function () {
      const half = getHalfScrollWidth();
      if (half > 0 && carousel.scrollLeft >= half) {
        carousel.scrollLeft = carousel.scrollLeft - half;
      }
    }, { passive: true });

    if (!carousel.dataset.mobileAutoScrollReady) {
      carousel.dataset.mobileAutoScrollReady = "true";
      rafId = requestAnimationFrame(animate);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileTestimonials);
  } else {
    initMobileTestimonials();
  }
})();

