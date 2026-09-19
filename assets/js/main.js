// Fluentfolio — Home page interactions (class-based, no inline handlers)

document.addEventListener("DOMContentLoaded", function () {
  var mobileCards = window.matchMedia("(max-width: 559px)");
  [["why", 4], ["course", 3], ["way", 4]].forEach(function (entry) {
    var next = document.querySelector('[data-' + entry[0] + '-page="next"]');
    for (var n = 3; n <= entry[1]; n++) {
      var pageButton = document.createElement("button");
      pageButton.type = "button";
      pageButton.className = entry[0] + "-page mobile-extra-page";
      pageButton.setAttribute("data-" + entry[0] + "-page", n);
      pageButton.textContent = n;
      next.before(pageButton);
    }
  });
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  var header = document.getElementById("siteHeader");

  // Mobile menu toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header shadow on scroll
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  // Course level tabs
  var tabBtns = document.querySelectorAll("#courseTabs .tab");
  var cards = document.querySelectorAll("#coursesGrid .course-card");
  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        if (filter === "all" || card.getAttribute("data-level") === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // Course search
  var searchInput = document.getElementById("courseSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim().toLowerCase();
      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        if (!q || text.indexOf(q) !== -1) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  }

  // Compact course pager for narrow tablet layouts. It keeps the cards large
  // enough to read while retaining access to every course card.
  var coursePageButtons = document.querySelectorAll("[data-course-page]");
  var currentCoursePage = 1;
  function showCoursePage(page) {
    currentCoursePage = Math.max(1, Math.min(mobileCards.matches ? 3 : 2, page));
    cards.forEach(function (card, index) {
      card.classList.toggle("is-course-page-hidden", Math.floor(index / (mobileCards.matches ? 1 : 2)) + 1 !== currentCoursePage);
    });
    document.querySelectorAll(".course-page").forEach(function (button) {
      button.classList.toggle("is-active", Number(button.getAttribute("data-course-page")) === currentCoursePage);
    });
  }
  coursePageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var page = button.getAttribute("data-course-page");
      if (page === "prev") showCoursePage(currentCoursePage - 1);
      else if (page === "next") showCoursePage(currentCoursePage + 1);
      else showCoursePage(Number(page));
    });
  });
  showCoursePage(1);

  // Why Fluentfolio tablet pager - keeps all four cards available without
  // compressing them into an unreadable row.
  var whyCards = Array.prototype.slice.call(document.querySelectorAll(".why-cards .why-card"));
  var whyPageButtons = document.querySelectorAll("[data-why-page]");
  var currentWhyPage = 1;
  function showWhyPage(page) {
    currentWhyPage = Math.max(1, Math.min(mobileCards.matches ? 4 : 2, page));
    whyCards.forEach(function (card, index) {
      card.classList.toggle("is-tablet-hidden", Math.floor(index / (mobileCards.matches ? 1 : 2)) + 1 !== currentWhyPage);
    });
    document.querySelectorAll(".why-page").forEach(function (button) {
      button.classList.toggle("is-active", Number(button.getAttribute("data-why-page")) === currentWhyPage);
      button.setAttribute("aria-current", Number(button.getAttribute("data-why-page")) === currentWhyPage ? "page" : "false");
    });
  }
  whyPageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var page = button.getAttribute("data-why-page");
      if (page === "prev") showWhyPage(currentWhyPage - 1);
      else if (page === "next") showWhyPage(currentWhyPage + 1);
      else showWhyPage(Number(page));
    });
  });
  showWhyPage(1);

  // Find Your Way tablet pager - presents two readable stages at a time.
  var wayCards = Array.prototype.slice.call(document.querySelectorAll(".ways-grid .way-card"));
  var wayPageButtons = document.querySelectorAll("[data-way-page]");
  var currentWayPage = 1;
  function showWayPage(page) {
    currentWayPage = Math.max(1, Math.min(mobileCards.matches ? 4 : 2, page));
    wayCards.forEach(function (card, index) {
      card.classList.toggle("is-way-page-hidden", Math.floor(index / (mobileCards.matches ? 1 : 2)) + 1 !== currentWayPage);
    });
    document.querySelectorAll(".way-page").forEach(function (button) {
      button.classList.toggle("is-active", Number(button.getAttribute("data-way-page")) === currentWayPage);
    });
  }
  wayPageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var page = button.getAttribute("data-way-page");
      if (page === "prev") showWayPage(currentWayPage - 1);
      else if (page === "next") showWayPage(currentWayPage + 1);
      else showWayPage(Number(page));
    });
  });
  showWayPage(1);
  mobileCards.addEventListener("change", function () { showCoursePage(1); showWhyPage(1); showWayPage(1); });

  // FAQ accordion
  var faqItems = document.querySelectorAll("#faqList .faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var willOpen = !item.classList.contains("open");
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        var icon = other.querySelector(".faq-toggle i");
        var b = other.querySelector(".faq-toggle");
        if (icon) icon.className = "bi bi-chevron-down";
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        var icon = btn.querySelector("i");
        if (icon) icon.className = "bi bi-chevron-up";
      }
    });
  });

  // Back to top
  // Accessible footer accordions for tablet and smaller screens.
  var footerMedia = window.matchMedia("(max-width: 1023px)");
  document.querySelectorAll(".footer-col").forEach(function (column, index) {
    var heading = column.querySelector("h4");
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "footer-toggle";
    toggle.textContent = heading.textContent;
    heading.replaceChildren(toggle);
    var content = document.createElement("div");
    content.className = "footer-links";
    content.id = "footer-links-" + index;
    while (heading.nextSibling) content.appendChild(heading.nextSibling);
    column.appendChild(content);
    toggle.setAttribute("aria-controls", content.id);
    var expanded = index === 0;
    function syncFooter() {
      column.classList.toggle("is-open", expanded);
      toggle.disabled = !footerMedia.matches;
      toggle.setAttribute("aria-expanded", String(!footerMedia.matches || expanded));
    }
    toggle.addEventListener("click", function () { expanded = !expanded; syncFooter(); });
    footerMedia.addEventListener("change", syncFooter);
    syncFooter();
  });

  var backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.className = "btn-back-top";
  backBtn.setAttribute("aria-label", "Back to top");
  backBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.appendChild(backBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backBtn.classList.add("show");
    } else {
      backBtn.classList.remove("show");
    }
  }, { passive: true });

  backBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Smooth anchor scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = anchor.getAttribute("href");
      if (!target || target === "#") return;
      var el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
});
