/* Lila Gerts. No scroll listeners: IntersectionObserver only. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme toggle. Persists per visitor; falls back to the system setting. */
  var root = document.documentElement;
  var toggle = document.getElementById("theme");
  var glyph = toggle && toggle.querySelector("[data-glyph]");

  function currentlyDark() {
    if (root.dataset.theme) return root.dataset.theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paintToggle() {
    var dark = currentlyDark();
    if (toggle) toggle.setAttribute("aria-pressed", String(dark));
    if (glyph) {
      var use = glyph.querySelector("use");
      if (use) use.setAttribute("href", dark ? "#sun" : "#moon");
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

  /* Mobile menu. A disclosure, not an overlay: the page stays reachable behind it. */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
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
  var noteField = document.getElementById("f-note");
  var itemField = document.getElementById("f-item");
  var colorField = document.getElementById("f-colors");

  function writeChoice(product, color) {
    if (colorField) colorField.value = color;
  }

  document.querySelectorAll("[data-palette]").forEach(function (group) {
    var product = group.dataset.palette;
    group.querySelectorAll("button.sw").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var was = chip.getAttribute("aria-pressed") === "true";
        group.querySelectorAll("button.sw").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", String(!was));
        if (was) return;
        writeChoice(product, chip.dataset.color);
        var form = document.getElementById("order-form");
        if (form) {
          form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
          window.setTimeout(function () { if (noteField) noteField.focus({ preventScroll: true }); }, reduce ? 0 : 500);
        }
      });
    });
  });

  /* Colour pairs write into the same field someone can type into, so the list is a
     shortcut rather than a limit. */
  document.querySelectorAll(".duos").forEach(function (group) {
    group.querySelectorAll("button.duo").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var was = btn.getAttribute("aria-pressed") === "true";
        group.querySelectorAll("button.duo").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", String(!was));
        if (colorField) colorField.value = was ? "" : btn.dataset.pair;
      });
    });
  });
  if (colorField) {
    colorField.addEventListener("input", function () {
      document.querySelectorAll("button.duo").forEach(function (o) {
        o.setAttribute("aria-pressed", String(o.dataset.pair === colorField.value));
      });
    });
  }

  /* The order form reshapes itself around the item: a candle needs a scent and a
     colour pair, a pet figurine needs photographs instead. */
  function syncItemFields() {
    if (!itemField) return;
    var pet = /питомц/i.test(itemField.value);
    document.querySelectorAll("[data-only]").forEach(function (el) {
      var wants = el.dataset.only === "pet" ? pet : !pet && itemField.value !== "";
      el.hidden = !wants;
      el.querySelectorAll("input, select, textarea").forEach(function (f) { f.disabled = !wants; });
    });
  }
  if (itemField) {
    itemField.addEventListener("change", syncItemFields);
    syncItemFields();
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
    status.textContent = "Отправляем заказ";

    if (!endpoint) {
      // No backend yet, so the request is handed to Telegram rather than
      // swallowed: the text goes to the clipboard and the chat opens.
      var data = new FormData(form);
      var rows = [
        ["Заказ", data.get("item")],
        ["Аромат", data.get("scent")],
        ["Цвета", data.get("colors")],
        ["Имя", data.get("name")],
        ["Телефон", data.get("phone")],
        ["ПВЗ Ozon", data.get("pvz")],
        ["Комментарий", data.get("note")]
      ];
      var text = "Заказ с сайта Lila Gerts\n" + rows
        .filter(function (r) { return r[1]; })
        .map(function (r) { return r[0] + ": " + r[1]; })
        .join("\n");

      var done = function (copied) {
        status.dataset.state = "sent";
        status.textContent = copied
          ? "Заказ собран и скопирован. Отправка на почту ещё не подключена: пришлите текст в Telegram или на почту, и мы оформим."
          : "Отправка на почту ещё не подключена. Напишите нам в Telegram или на почту, и мы оформим заказ.";
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    }).then(function (res) {
      if (!res.ok) throw new Error(String(res.status));
      status.dataset.state = "sent";
      status.textContent = "Заказ принят. Напишем вам, чтобы подтвердить и согласовать оплату.";
      form.reset();
      if (itemField) syncItemFields();
    }).catch(function () {
      status.dataset.state = "sent";
      status.textContent = "Не удалось отправить. Напишите нам в Telegram или на почту, заказ оформим вручную.";
    });
  });
})();

/* ── детали ───────────────────────────────────────────────────── */

/* Текущий раздел в меню. Наблюдатель отмечал сразу два раздела, когда один
   кончался на границе полосы, и подсветка отставала. Считаем прямо: активен
   последний раздел, начало которого уже прошло под шапкой. */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
  if (!links.length) return;
  var items = [];
  links.forEach(function (a) {
    var el = document.getElementById(a.getAttribute("href").slice(1));
    if (el) items.push({ link: a, el: el });
  });
  if (!items.length) return;

  var tick = false;
  function update() {
    tick = false;
    var line = window.scrollY + 110;
    var active = null;
    items.forEach(function (it) {
      if (it.el.getBoundingClientRect().top + window.scrollY <= line) active = it;
    });
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 4) {
      active = items[items.length - 1];
    }
    items.forEach(function (it) {
      if (it === active) it.link.setAttribute("aria-current", "true");
      else it.link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", function () {
    if (tick) return;
    tick = true;
    window.requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
})();

/* Фотографии проявляются. Уже загруженные помечаем сразу, чтобы не мигали. */
(function () {
  document.querySelectorAll("img").forEach(function (img) {
    if (img.classList.contains("hero-bg")) return;
    if (img.complete && img.naturalWidth) { img.classList.add("is-loaded"); return; }
    img.addEventListener("load", function () { img.classList.add("is-loaded"); });
    img.addEventListener("error", function () { img.classList.add("is-loaded"); });
  });
})();

/* Заполненное поле отмечается сразу, а не при отправке. */
(function () {
  var form = document.getElementById("order-form");
  if (!form) return;
  function mark(el) {
    var wrap = el.closest("[data-field]");
    if (!wrap) return;
    var filled = el.type === "checkbox" ? el.checked : String(el.value).trim() !== "";
    wrap.dataset.filled = String(filled);
  }
  form.querySelectorAll("input, select, textarea").forEach(function (el) {
    mark(el);
    el.addEventListener("input", function () { mark(el); });
    el.addEventListener("change", function () { mark(el); });
  });
  form.addEventListener("reset", function () {
    setTimeout(function () {
      form.querySelectorAll("input, select, textarea").forEach(mark);
    }, 0);
  });
})();

/* Возврат наверх, когда первый экран позади. */
(function () {
  var btn = document.getElementById("to-top");
  if (!btn) return;
  btn.hidden = false;
  btn.dataset.in = "false";
  btn.addEventListener("click", function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  var tick = false;
  function update() {
    tick = false;
    btn.dataset.in = window.scrollY > window.innerHeight * 0.9 ? "true" : "false";
  }
  window.addEventListener("scroll", function () {
    if (tick) return;
    tick = true;
    window.requestAnimationFrame(update);
  }, { passive: true });
  update();
})();
