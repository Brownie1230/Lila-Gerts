/* Lila Gerts. No scroll listeners: IntersectionObserver only. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme toggle. Persists per visitor; falls back to the system setting. */
  var root = document.documentElement;
  var toggle = document.getElementById("theme");
  var glyph = toggle && toggle.querySelector("[data-theme-glyph]");

  function currentlyDark() {
    if (root.dataset.theme) return root.dataset.theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paintToggle() {
    var dark = currentlyDark();
    if (toggle) toggle.setAttribute("aria-pressed", String(dark));
    if (glyph) {
      var use = glyph.querySelector("use");
      if (use) use.setAttribute("href", "assets/icons.svg#i-" + (dark ? "sun" : "moon"));
    }
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentlyDark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("lg-theme", next); } catch (e) { /* private mode */ }
      paintToggle();
    });
    paintToggle();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintToggle);
  }

  /* Headline split into masked lines, so it can rise line by line.
     Purely additive: without this the h1 renders as written. */
  var h1 = document.querySelector(".hero__copy h1");
  if (h1 && !reduce) {
    var parts = h1.innerHTML.split(/<br\s*\/?>/i);
    if (parts.length > 1) {
      h1.innerHTML = parts.map(function (part, i) {
        return '<span class="line"><span style="--i:' + i + '">' + part.trim() + "</span></span>";
      }).join("");
    }
  }

  /* Mobile menu. A disclosure, not an overlay: the page stays reachable behind it. */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("nav-menu");
  var desktop = window.matchMedia("(min-width: 901px)");

  function syncMenu() {
    if (!menu || !burger) return;
    if (desktop.matches) {
      menu.hidden = false;
      burger.setAttribute("aria-expanded", "false");
    } else {
      menu.hidden = burger.getAttribute("aria-expanded") !== "true";
    }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      syncMenu();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && !desktop.matches) {
        burger.setAttribute("aria-expanded", "false");
        syncMenu();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        burger.setAttribute("aria-expanded", "false");
        syncMenu();
        burger.focus();
      }
    });
    desktop.addEventListener("change", syncMenu);
    syncMenu();
  }

  /* Nav hairline appears once the page has moved off the top. */
  var nav = document.getElementById("nav");
  var sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px";
  document.body.prepend(sentinel);
  if ("IntersectionObserver" in window && nav) {
    new IntersectionObserver(function (entries) {
      nav.dataset.stuck = String(!entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* Scroll reveal: storytelling, one shot per element. */
  var targets = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* Order form: inline validation, then a local success state.
     Template only. Point `endpoint` at the real handler before launch. */
  var form = document.getElementById("order-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var endpoint = form.dataset.endpoint || "";

  function fieldOf(input) { return input.closest("[data-field]"); }

  function validate(input) {
    var wrap = fieldOf(input);
    if (!wrap) return true;
    var ok = input.checkValidity();
    wrap.dataset.invalid = String(!ok);
    input.setAttribute("aria-invalid", String(!ok));
    var err = wrap.querySelector("[data-error]");
    if (err) {
      if (!err.id) err.id = input.id + "-error";
      if (ok) input.removeAttribute("aria-describedby");
      else input.setAttribute("aria-describedby", err.id);
    }
    return ok;
  }

  form.querySelectorAll("input, select, textarea").forEach(function (input) {
    input.addEventListener("blur", function () { validate(input); });
    input.addEventListener("input", function () {
      var wrap = fieldOf(input);
      if (wrap && wrap.dataset.invalid === "true") validate(input);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var inputs = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));
    var bad = inputs.filter(function (i) { return !validate(i); });
    if (bad.length) {
      bad[0].focus();
      return;
    }

    status.dataset.state = "sending";
    status.textContent = "Отправляем заявку";

    if (!endpoint) {
      // No backend wired up yet: show the state the real handler will produce.
      window.setTimeout(function () {
        status.dataset.state = "sent";
        status.textContent = "Заявка принята. Отвечаем в течение дня.";
        form.reset();
      }, 650);
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    }).then(function (res) {
      if (!res.ok) throw new Error(String(res.status));
      status.dataset.state = "sent";
      status.textContent = "Заявка принята. Отвечаем в течение дня.";
      form.reset();
    }).catch(function () {
      status.dataset.state = "sent";
      status.textContent = "Не удалось отправить. Напишите нам в Telegram или позвоните.";
    });
  });
})();
