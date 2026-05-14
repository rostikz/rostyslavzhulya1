
/* =========================================================
   MOBILE MENU FIX
   ========================================================= */
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });
}



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