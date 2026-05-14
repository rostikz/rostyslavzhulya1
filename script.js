
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
   MOBILE MENU DEFINITIVO
   ========================================================= */
(function(){
  function initMobileMenu(){
    const btn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (!btn || !nav) return;

    btn.setAttribute('type', 'button');

    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      document.body.classList.toggle('nav-open');
    });

    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        document.body.classList.remove('nav-open');
      });
    });

    document.addEventListener('click', function(e){
      if (!document.body.classList.contains('nav-open')) return;
      if (nav.contains(e.target) || btn.contains(e.target)) return;
      document.body.classList.remove('nav-open');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
