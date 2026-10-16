/* Lila Gerts. No scroll listeners: IntersectionObserver only. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NBSP = " ";
  var $ = function (id) { return document.getElementById(id); };

  /* ── theme: cherry is the brand and the default, cream is the alternative ── */
  var root = document.documentElement;
  var toggle = $("theme");
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

  /* ── mobile menu: a disclosure, not an overlay ── */
  var burger = $("burger");
  var menu = $("menu");
  var desktop = window.matchMedia("(min-width: 901px)");
  function syncMenu() {
    if (!menu || !burger) return;
    if (desktop.matches) { menu.hidden = false; burger.setAttribute("aria-expanded", "false"); }
    else menu.hidden = burger.getAttribute("aria-expanded") !== "true";
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      burger.setAttribute("aria-expanded", String(burger.getAttribute("aria-expanded") !== "true"));
      syncMenu();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && !desktop.matches) { burger.setAttribute("aria-expanded", "false"); syncMenu(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        burger.setAttribute("aria-expanded", "false"); syncMenu(); burger.focus();
      }
    });
    desktop.addEventListener("change", syncMenu);
    syncMenu();
  }

  /* ── bar hairline once the page has moved ── */
  var nav = $("nav");
  var sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px";
  document.body.prepend(sentinel);
  if ("IntersectionObserver" in window && nav) {
    new IntersectionObserver(function (entries) {
      nav.dataset.stuck = String(!entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ── scroll reveal: one shot per element ── */
  var io = null;
  if (reduce || !("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("is-in"); });
  } else {
    io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  }

  /* ── dialogs: native <dialog> for focus trap and Esc; we only add the exit ── */
  function openDialog(d) {
    if (!d || d.open) return;
    d.classList.remove("closing");
    d.showModal();
  }
  function closeDialog(d, then) {
    if (!d || !d.open) { if (then) then(); return; }
    if (reduce) { d.close(); if (then) then(); return; }
    d.classList.add("closing");
    var done = false;
    var finish = function () {
      if (done) return; done = true;
      d.classList.remove("closing"); d.close(); if (then) then();
    };
    d.addEventListener("animationend", finish, { once: true });
    window.setTimeout(finish, 400); // in case the animation never runs
  }
  document.querySelectorAll("dialog").forEach(function (d) {
    // Esc: play the exit instead of vanishing.
    d.addEventListener("cancel", function (e) { e.preventDefault(); closeDialog(d); });
    // A click on the backdrop lands on the dialog element itself.
    d.addEventListener("click", function (e) { if (e.target === d) closeDialog(d); });
    d.querySelectorAll("[data-close]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        var href = b.getAttribute("href");
        if (href && href.charAt(0) === "#") {
          e.preventDefault();
          closeDialog(d, function () {
            var t = document.querySelector(href);
            if (t) t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
            history.replaceState(null, "", href);
          });
        } else closeDialog(d);
      });
    });
  });

  /* ─────────────────────────────────────────────────────────────────
     Cart. Lives in this browser only, in localStorage, and travels no
     further until the order is sent. Free shipping from 5 000 ₽.
     ───────────────────────────────────────────────────────────────── */
  var KEY = "lg-cart";
  var FREE_FROM = 5000;
  var drawer = $("cart-drawer");
  var linesEl = $("cart-lines");
  var emptyEl = $("cart-empty");
  var totalEl = $("cart-total");
  var sumEl = $("cart-sum");
  var hintEl = $("ship-hint");
  var countEl = $("cart-count");
  var form = $("order-form");

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
  function add(line, qty) {
    qty = qty || 1;
    var cart = read();
    var found = cart.filter(function (l) { return l.id === line.id; })[0];
    if (found) found.qty += qty;
    else cart.push({ id: line.id, name: line.name, sub: line.sub || "", price: line.price,
                     img: line.img || "", swatch: line.swatch || null, qty: qty });
    write(cart);
    render(true);
  }
  function setQty(id, delta) {
    write(read().map(function (l) { if (l.id === id) l.qty += delta; return l; })
                .filter(function (l) { return l.qty > 0; }));
    render();
  }
  function kill(id) { write(read().filter(function (l) { return l.id !== id; })); render(); }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function render(bump) {
    var cart = read();
    var total = cart.reduce(function (a, l) { return a + l.price * l.qty; }, 0);
    var count = cart.reduce(function (a, l) { return a + l.qty; }, 0);

    if (countEl) {
      countEl.textContent = String(count);
      countEl.hidden = count === 0;
      if (bump && count && !reduce) {
        countEl.classList.remove("bump"); void countEl.offsetWidth; countEl.classList.add("bump");
      }
    }
    var openBtn = $("cart-open");
    if (openBtn) openBtn.setAttribute("aria-label", count ? "Корзина, товаров: " + count : "Корзина, пусто");
    if (!linesEl) return;

    linesEl.textContent = "";
    cart.forEach(function (l) {
      var li = el("li", "line");
      if (l.img) {
        var img = el("img"); img.src = l.img; img.alt = ""; img.loading = "lazy"; li.appendChild(img);
      } else {
        var box = el("div", "line-no-img");
        // A constructor candle has no photo; show the colours that were picked.
        if (l.swatch && l.swatch.length === 2 && /^#[0-9a-f]{6}$/i.test(l.swatch[0]) && /^#[0-9a-f]{6}$/i.test(l.swatch[1])) {
          box.style.background = "linear-gradient(135deg," + l.swatch[0] + " 0 50%," + l.swatch[1] + " 50% 100%)";
        }
        li.appendChild(box);
      }
      var name = el("div", "line-name", l.name);
      if (l.sub) name.appendChild(el("span", "line-sub", l.sub));
      li.appendChild(name);

      var qty = el("div", "qty");
      var minus = el("button", null, "−"); minus.type = "button";
      minus.setAttribute("aria-label", "Убрать одну штуку: " + l.name);
      minus.addEventListener("click", function () { setQty(l.id, -1); });
      var out = el("output", null, String(l.qty));
      var plus = el("button", null, "+"); plus.type = "button";
      plus.setAttribute("aria-label", "Добавить ещё одну штуку: " + l.name);
      plus.addEventListener("click", function () { setQty(l.id, 1); });
      qty.append(minus, out, plus);
      li.appendChild(qty);

      li.appendChild(el("div", "line-sum", money(l.price * l.qty)));

      var rm = el("button", "line-kill", "убрать"); rm.type = "button";
      rm.setAttribute("aria-label", "Убрать из корзины: " + l.name);
      rm.addEventListener("click", function () { kill(l.id); });
      li.appendChild(rm);

      linesEl.appendChild(li);
    });

    if (emptyEl) emptyEl.hidden = count > 0;
    if (totalEl) totalEl.hidden = count === 0;
    if (form) form.hidden = count === 0;
    if (sumEl) sumEl.textContent = money(total);
    if (hintEl) {
      var free = total >= FREE_FROM;
      hintEl.dataset.free = String(free);
      hintEl.textContent = free ? "Доставка бесплатно." : "До бесплатной доставки " + money(FREE_FROM - total) + ".";
    }
  }

  function openCart() { render(); openDialog(drawer); }
  var cartOpen = $("cart-open");
  if (cartOpen) cartOpen.addEventListener("click", openCart);

  /* ── toast: acknowledge the add without taking the page away ── */
  var toast = $("toast");
  var toastText = $("toast-text");
  var toastTimer = 0;
  function say(text) {
    if (!toast) return;
    toastText.textContent = text;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 4500);
  }
  var toastOpen = $("toast-open");
  if (toastOpen) toastOpen.addEventListener("click", function () {
    toast.hidden = true; openCart();
  });

  /* ── catalogue filters ── */
  var shop = $("shop");
  document.querySelectorAll(".chip[data-filter]").forEach(function (chip, _, all) {
    chip.addEventListener("click", function () {
      var f = chip.dataset.filter;
      all.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      if (!shop) return;
      shop.querySelectorAll(".card").forEach(function (card) {
        var show = f === "all" || card.dataset.cat === f;
        var was = !card.hidden;
        card.hidden = !show;
        card.classList.add("is-in"); // a filtered card must never stay mid-reveal
        if (show && !was) { card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop"); }
      });
    });
  });

  /* ── product sheet ── */
  var qv = $("qv");
  var qvForm = $("qv-form");
  var qvScent = $("qv-scent");
  var qvScentField = $("qv-scent-field");
  var qvQty = $("qv-qty");
  var current = null;
  var qtyNow = 1;

  // One list of scents on the page: the constructor's. The sheet borrows it.
  var builderScent = $("b-scent");
  if (builderScent && qvScent) {
    Array.prototype.forEach.call(builderScent.options, function (o) {
      if (o.value) qvScent.appendChild(new Option(o.textContent, o.value));
    });
  }

  function openProduct(holder) {
    if (!qv || !holder) return;
    var shot = holder.querySelector("img");
    current = {
      sku: holder.dataset.sku,
      name: holder.dataset.name,
      sub: holder.dataset.sub || "",
      price: parseInt(holder.dataset.price, 10) || 0,
      img: holder.dataset.img || "",
      scent: holder.dataset.scent !== "no"
    };
    qtyNow = 1;
    qvQty.textContent = "1";
    $("qv-name").textContent = current.name;
    $("qv-sub").textContent = current.sub;
    $("qv-price").textContent = money(current.price);
    var img = $("qv-img");
    img.src = current.img;
    img.alt = shot ? shot.alt : current.name;
    qvScentField.hidden = !current.scent;
    qvScent.value = "";
    $("qv-incl").textContent = current.scent
      ? "В комплекте спички в стеклянной колбе и подарочная упаковка."
      : "В подарок спички, сменные чайные свечи, подарочная упаковка и открытка с посланием. Фото питомца попросим после оплаты.";
    openDialog(qv);
  }

  document.querySelectorAll("[data-open]").forEach(function (b) {
    b.addEventListener("click", function () { openProduct(b.closest("[data-sku]")); });
  });

  if (qv) {
    qv.querySelectorAll("[data-step]").forEach(function (b) {
      b.addEventListener("click", function () {
        qtyNow = Math.max(1, Math.min(20, qtyNow + parseInt(b.dataset.step, 10)));
        qvQty.textContent = String(qtyNow);
      });
    });
    qvForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!current) return;
      var scent = current.scent ? qvScent.value : "";
      var sub = [current.sub, scent ? "аромат: " + scent : ""].filter(Boolean).join(" · ");
      add({ id: current.sku + (scent ? "|" + scent : ""), name: current.name, sub: sub,
            price: current.price, img: current.img }, qtyNow);
      var label = current.name + (qtyNow > 1 ? " × " + qtyNow : "") + " в корзине";
      closeDialog(qv, function () { say(label); });
    });
  }

  render();

  /* ── constructor ── */
  var colorField = $("b-colors");
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

  var builder = $("builder-form");
  if (builder) {
    builder.addEventListener("submit", function (event) {
      event.preventDefault();
      var shape = $("b-shape");
      if (!validate(shape)) { shape.focus(); return; }
      var price = parseInt(shape.options[shape.selectedIndex].dataset.price, 10) || 0;
      var scent = builderScent ? builderScent.value : "";
      var colors = colorField ? colorField.value.trim() : "";
      var pressed = builder.querySelector(".duo[aria-pressed=\"true\"] i");
      var swatch = null;
      if (pressed && colors === pressed.parentNode.dataset.pair) {
        var a = pressed.style.getPropertyValue("--a").trim(), b = pressed.style.getPropertyValue("--b").trim();
        if (a && b) swatch = [a, b];
      }
      var parts = [];
      if (scent) parts.push("аромат: " + scent);
      if (colors) parts.push("цвета: " + colors);
      add({ id: "custom:" + shape.value + "|" + scent + "|" + colors, name: shape.value,
            sub: parts.join(" · ") || "аромат и цвет подберём в переписке",
            price: price, img: "", swatch: swatch });
      say(shape.value + " в корзине");
    });
    var shapeSel = $("b-shape");
    if (shapeSel) shapeSel.addEventListener("change", function () { validate(shapeSel); });
  }

  /* ── checkout ── */
  if (!form) return;
  var status = $("form-status");
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
    if (!cart.length) return;

    var bad = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"))
      .filter(function (i) { return !validate(i); });
    if (bad.length) { bad[0].focus(); return; }

    var data = new FormData(form);
    var total = cart.reduce(function (a, l) { return a + l.price * l.qty; }, 0);
    var order = {
      items: cart.map(function (l) { return { name: l.name, sub: l.sub, price: l.price, qty: l.qty }; }),
      total: total, name: data.get("name"), phone: data.get("phone"),
      pvz: data.get("pvz"), note: data.get("note")
    };

    status.dataset.state = "sending";
    status.textContent = "Отправляем заказ";

    if (!endpoint) {
      // No handler yet: the order is handed over rather than swallowed.
      var text = ["Заказ с сайта Lila Gerts", ""]
        .concat(cart.map(function (l) {
          return "— " + l.name + (l.sub ? " (" + l.sub + ")" : "") + " × " + l.qty + " — " + (l.price * l.qty) + " руб.";
        }))
        .concat(["", "Сумма: " + total + " руб.", "Имя: " + (order.name || ""),
                 "Телефон: " + (order.phone || ""), "ПВЗ Ozon: " + (order.pvz || "")]);
      if (order.note) text.push("Комментарий: " + order.note);
      var done = function (copied) {
        status.dataset.state = "sent";
        status.textContent = copied
          ? "Заказ собран и скопирован. Отправка на почту ещё не подключена: пришлите текст в Telegram или на почту, и мы оформим."
          : "Отправка на почту ещё не подключена. Напишите нам в Telegram или на почту, и мы оформим заказ.";
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text.join("\n")).then(function () { done(true); }, function () { done(false); });
      } else done(false);
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(order)
    }).then(function (res) {
      if (!res.ok) throw new Error(String(res.status));
      status.dataset.state = "sent";
      status.textContent = "Заказ принят. Напишем вам, чтобы подтвердить и прислать счёт на оплату.";
      form.reset();
      write([]);
      render();
      if (emptyEl) emptyEl.hidden = true; // keep the confirmation on screen, not the empty state
      form.hidden = false;
    }).catch(function () {
      status.dataset.state = "sent";
      status.textContent = "Не удалось отправить. Напишите нам в Telegram или на почту, заказ оформим вручную.";
    });
  });
})();
