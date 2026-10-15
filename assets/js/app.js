/* Lila Gerts. No scroll listeners: IntersectionObserver only. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NBSP = " ";

  /* Theme toggle. Cherry is the brand and the default; cream is the alternative. */
  var root = document.documentElement;
  var toggle = document.getElementById("theme");
  var glyph = toggle && toggle.querySelector("[data-glyph]");

  function currentlyDark() { return root.dataset.theme !== "light"; }
  function paintToggle() {
    var dark = currentlyDark();
    if (toggle) toggle.setAttribute("aria-pressed", String(dark));
    if (glyph) glyph.textContent = dark ? "☀" : "☾";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentlyDark() ? "light" : "dark";
      if (next === "dark") root.removeAttribute("data-theme");
      else root.dataset.theme = "light";
      try { localStorage.setItem("lg-theme", next); } catch (e) { /* private mode */ }
      paintToggle();
    });
    paintToggle();
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

  /* ─────────────────────────────────────────────────────────────────
     Cart. Lives in this browser only, in localStorage, and travels no
     further until the order is submitted. Free shipping from 5 000 ₽.
     ───────────────────────────────────────────────────────────────── */

  var KEY = "lg-cart";
  var FREE_FROM = 5000;

  var linesEl = document.getElementById("cart-lines");
  var emptyEl = document.getElementById("cart-empty");
  var totalEl = document.getElementById("cart-total");
  var sumEl = document.getElementById("cart-sum");
  var hintEl = document.getElementById("ship-hint");
  var countEl = document.getElementById("cart-count");

  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP) + NBSP + "₽"; }

  function read() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(raw)) return [];
      return raw.filter(function (l) {
        return l && typeof l.id === "string" && typeof l.name === "string" &&
               isFinite(l.price) && isFinite(l.qty) && l.qty > 0;
      });
    } catch (e) { return []; }
  }
  function write(cart) {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* private mode */ }
  }

  function add(line) {
    var cart = read();
    var found = cart.filter(function (l) { return l.id === line.id; })[0];
    if (found) found.qty += 1;
    else cart.push({ id: line.id, name: line.name, sub: line.sub || "", price: line.price, img: line.img || "", qty: 1 });
    write(cart);
    render();
  }
  function setQty(id, delta) {
    var cart = read().map(function (l) {
      if (l.id === id) l.qty += delta;
      return l;
    }).filter(function (l) { return l.qty > 0; });
    write(cart);
    render();
  }
  function kill(id) {
    write(read().filter(function (l) { return l.id !== id; }));
    render();
  }

  function render() {
    var cart = read();
    var total = cart.reduce(function (a, l) { return a + l.price * l.qty; }, 0);
    var count = cart.reduce(function (a, l) { return a + l.qty; }, 0);

    if (countEl) {
      countEl.textContent = String(count);
      countEl.hidden = count === 0;
    }
    if (!linesEl) return;

    linesEl.textContent = "";
    cart.forEach(function (l) {
      var li = document.createElement("li");
      li.className = "line";

      if (l.img) {
        var img = document.createElement("img");
        img.src = l.img; img.alt = ""; img.loading = "lazy";
        li.appendChild(img);
      } else {
        var box = document.createElement("div");
        box.className = "line-no-img";
        li.appendChild(box);
      }

      var name = document.createElement("div");
      name.className = "line-name";
      name.textContent = l.name;
      if (l.sub) {
        var sub = document.createElement("span");
        sub.className = "line-sub";
        sub.textContent = l.sub;
        name.appendChild(sub);
      }
      li.appendChild(name);

      var qty = document.createElement("div");
      qty.className = "qty";
      var minus = document.createElement("button");
      minus.type = "button"; minus.textContent = "−";
      minus.setAttribute("aria-label", "Убрать одну штуку: " + l.name);
      minus.addEventListener("click", function () { setQty(l.id, -1); });
      var out = document.createElement("output");
      out.textContent = String(l.qty);
      var plus = document.createElement("button");
      plus.type = "button"; plus.textContent = "+";
      plus.setAttribute("aria-label", "Добавить ещё одну штуку: " + l.name);
      plus.addEventListener("click", function () { setQty(l.id, 1); });
      qty.append(minus, out, plus);
      li.appendChild(qty);

      var sumCell = document.createElement("div");
      sumCell.className = "line-sum";
      sumCell.textContent = money(l.price * l.qty);
      li.appendChild(sumCell);

      var rm = document.createElement("button");
      rm.type = "button"; rm.className = "line-kill";
      rm.textContent = "убрать";
      rm.setAttribute("aria-label", "Убрать из корзины: " + l.name);
      rm.addEventListener("click", function () { kill(l.id); });
      li.appendChild(rm);

      linesEl.appendChild(li);
    });

    if (emptyEl) emptyEl.hidden = count > 0;
    if (totalEl) totalEl.hidden = count === 0;
    if (sumEl) sumEl.textContent = money(total);
    if (hintEl) {
      if (total >= FREE_FROM) {
        hintEl.dataset.free = "true";
        hintEl.textContent = "Доставка бесплатно.";
      } else {
        hintEl.dataset.free = "false";
        hintEl.textContent = "До бесплатной доставки " + money(FREE_FROM - total) + ".";
      }
    }
  }

  /* Acknowledge next to the button that caused it, never as a page-wide banner. */
  function flash(scope, text) {
    var note = scope && scope.querySelector("[data-added]");
    if (!note) return;
    note.textContent = text;
    note.dataset.on = "true";
    window.clearTimeout(note._t);
    note._t = window.setTimeout(function () { note.dataset.on = "false"; }, 2600);
  }

  document.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest("[data-sku]");
      if (!card) return;
      add({
        id: card.dataset.sku,
        name: card.dataset.name,
        sub: card.dataset.sub,
        price: parseInt(card.dataset.price, 10) || 0,
        img: card.dataset.img
      });
      flash(card, "Добавлено в корзину");
    });
  });

  render();

  /* ── Конструктор свечей ──────────────────────────────────────────
     The pairs write into the same field someone can type into, so the
     list is a shortcut rather than a limit. */
  var colorField = document.getElementById("b-colors");

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

  var builder = document.getElementById("builder-form");
  if (builder) {
    builder.addEventListener("submit", function (event) {
      event.preventDefault();
      var shape = document.getElementById("b-shape");
      if (!validate(shape)) { shape.focus(); return; }

      var opt = shape.options[shape.selectedIndex];
      var price = parseInt(opt.dataset.price, 10) || 0;
      var scent = (document.getElementById("b-scent") || {}).value || "";
      var colors = colorField ? colorField.value.trim() : "";

      var parts = [];
      if (scent) parts.push("аромат: " + scent);
      if (colors) parts.push("цвета: " + colors);
      var sub = parts.join(" · ") || "аромат и цвет подберём в переписке";

      add({
        id: "custom:" + shape.value + "|" + scent + "|" + colors,
        name: shape.value,
        sub: sub,
        price: price,
        img: ""
      });
      flash(builder, "Добавлено в корзину: " + shape.value);
    });
  }

  /* ── Оформление ──────────────────────────────────────────────────
     Inline validation, then the order. Point `endpoint` at the real
     handler before launch; until then the order goes to the clipboard. */
  var form = document.getElementById("order-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var endpoint = form.dataset.endpoint || "";

  form.querySelectorAll("input, select, textarea").forEach(function (input) {
    input.addEventListener("blur", function () { validate(input); });
    input.addEventListener("input", function () {
      var wrap = fieldOf(input);
      if (wrap && wrap.dataset.invalid === "true") validate(input);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var cart = read();
    if (!cart.length) {
      status.dataset.state = "sent";
      status.textContent = "Корзина пуста. Добавьте что-нибудь из каталога, и мы оформим заказ.";
      var shop = document.getElementById("candles");
      if (shop) shop.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      return;
    }

    var inputs = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));
    var bad = inputs.filter(function (i) { return !validate(i); });
    if (bad.length) { bad[0].focus(); return; }

    var data = new FormData(form);
    var total = cart.reduce(function (a, l) { return a + l.price * l.qty; }, 0);
    var order = {
      items: cart.map(function (l) {
        return { name: l.name, sub: l.sub, price: l.price, qty: l.qty };
      }),
      total: total,
      name: data.get("name"),
      phone: data.get("phone"),
      pvz: data.get("pvz"),
      note: data.get("note")
    };

    status.dataset.state = "sending";
    status.textContent = "Отправляем заказ";

    if (!endpoint) {
      // No backend yet, so the order is handed over rather than swallowed.
      var text = ["Заказ с сайта Lila Gerts", ""]
        .concat(cart.map(function (l) {
          return "— " + l.name + (l.sub ? " (" + l.sub + ")" : "") +
                 " × " + l.qty + " — " + (l.price * l.qty) + " руб.";
        }))
        .concat([
          "",
          "Сумма: " + total + " руб.",
          "Имя: " + (order.name || ""),
          "Телефон: " + (order.phone || ""),
          "ПВЗ Ozon: " + (order.pvz || "")
        ]);
      if (order.note) text.push("Комментарий: " + order.note);

      var done = function (copied) {
        status.dataset.state = "sent";
        status.textContent = copied
          ? "Заказ собран и скопирован. Отправка на почту ещё не подключена: пришлите текст в Telegram или на почту, и мы оформим."
          : "Отправка на почту ещё не подключена. Напишите нам в Telegram или на почту, и мы оформим заказ.";
      };
      var joined = text.join("\n");
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(joined).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    }).then(function (res) {
      if (!res.ok) throw new Error(String(res.status));
      status.dataset.state = "sent";
      status.textContent = "Заказ принят. Напишем вам, чтобы подтвердить и прислать счёт на оплату.";
      form.reset();
      write([]);
      render();
    }).catch(function () {
      status.dataset.state = "sent";
      status.textContent = "Не удалось отправить. Напишите нам в Telegram или на почту, заказ оформим вручную.";
    });
  });
})();
