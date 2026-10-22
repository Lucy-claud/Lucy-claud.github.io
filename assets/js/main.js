(function () {
  var cfg = window.SITE_CONFIG || {};

  // 사진 표시 여부
  if (cfg.showPhoto === false) {
    document.querySelectorAll('[data-config="showPhoto"]').forEach(function (el) { el.remove(); });
    var grid = document.querySelector('.hero-grid');
    if (grid) grid.style.gridTemplateColumns = '1fr';
  }

  // 연락처 표시 여부
  var shown = 0;
  function setContact(id, on, value, href) {
    var el = document.getElementById(id);
    if (!el) return;
    if (on && value) {
      el.href = href;
      el.querySelector('b').textContent = value;
      el.hidden = false;
      shown++;
    } else {
      el.remove();
    }
  }
  setContact('c-email', cfg.showEmail, cfg.email, 'mailto:' + cfg.email);
  setContact('c-phone', cfg.showPhone, cfg.phone, 'tel:' + String(cfg.phone || '').replace(/[^0-9+]/g, ''));
  if (shown === 0) {
    var list = document.getElementById('contact-list');
    if (list) list.remove();
    document.getElementById('contact-fallback').hidden = false;
  }

  // 모바일 메뉴
  var btn = document.querySelector('.menu-btn');
  var links = document.getElementById('nav-links');
  function closeMenu() {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', '메뉴 열기');
  }
  btn.addEventListener('click', function () {
    var open = !links.classList.contains('open');
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
  links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // 프로젝트 상세 펼치기
  function setOpen(button, open) {
    var panel = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? '접기' : '자세히 보기';
    panel.hidden = !open;
  }
  document.querySelectorAll('.p-toggle').forEach(function (b) {
    b.addEventListener('click', function () { setOpen(b, b.getAttribute('aria-expanded') !== 'true'); });
  });

  // 역량 카드의 "관련 프로젝트" 링크 → 해당 프로젝트 상세를 펼침
  document.querySelectorAll('a[href^="#p-"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var card = document.querySelector(a.getAttribute('href'));
      var b = card && card.querySelector('.p-toggle');
      if (b) setOpen(b, true);
    });
  });

  // 현재 섹션 내비게이션 강조
  var navMap = {};
  links.querySelectorAll('a[href^="#"]').forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove('active'); });
        var a = navMap[en.target.id];
        if (a && !a.classList.contains('nav-cta')) a.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }
})();
