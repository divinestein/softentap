/* SoftenTap — small progressive enhancements. Everything works without JS. */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile menu */
  var header = document.querySelector(".site-header");
  var btn = document.querySelector(".menu-btn");
  if (btn && header) {
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("menu-open")) {
        header.classList.remove("menu-open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  /* Condensing header + reading progress (one rAF-throttled scroll handler) */
  var bar = document.querySelector(".progress");
  var body = document.querySelector("[data-progress]");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("is-condensed", y > 12);
    if (bar && body) {
      var r = body.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* Collapse the in-page contents list on small screens */
  var tocDet = document.querySelector(".toc details");
  if (tocDet && window.innerWidth <= 1020) tocDet.open = false;

  /* Table of contents: highlight the section in view */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var current;
    var tocObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (current) current.classList.remove("is-active");
          current = map[en.target.id];
          if (current) current.classList.add("is-active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) {
      var h = document.getElementById(id);
      if (h) tocObs.observe(h);
    });
    /* close the mobile TOC after choosing a section */
    var det = document.querySelector(".toc details");
    tocLinks.forEach(function (a) {
      a.addEventListener("click", function () {
        if (det && window.innerWidth <= 1020) det.open = false;
      });
    });
  }

  /* Reveal on scroll. Only elements that start below the fold are hidden,
     and only when motion is allowed, so nothing is ever hidden for no-JS
     visitors, crawlers, or reduced-motion users. */
  if (!reduce && "IntersectionObserver" in window) {
    var items = document.querySelectorAll("[data-reveal]");
    var vh = window.innerHeight;
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("reveal-in");
          en.target.classList.remove("reveal-pending");
          revealObs.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh) {
        el.classList.add("reveal-pending");
        revealObs.observe(el);
      }
    });
  }

  /* Hardness converter (ppm or mg/L to grains per gallon) */
  var form = document.getElementById("hard-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("ppm");
      var out = document.getElementById("hard-out");
      var n = parseFloat(input.value);
      if (isNaN(n) || n < 0) {
        out.textContent = "Enter a hardness number in ppm or mg/L.";
        return;
      }
      var gpg = n / 17.1;
      out.innerHTML = n + " ÷ 17.1 = <strong>" + gpg.toFixed(1) + " gpg</strong>";
    });
  }
})();
