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

  /* ── dialogs: native <dialog> for focus trap and Esc; we only add the exit ──
     Old Safari (before iOS 15.4) has no <dialog>: there the open attribute is
     toggled by hand, a scrim stands in for the backdrop and Esc is ours. */
  var nativeDialog = typeof HTMLDialogElement === "function" &&
                     typeof HTMLDialogElement.prototype.showModal === "function";
  if (!nativeDialog) root.classList.add("no-dialog");
  var scrim = null;
  var lastFocus = null;

  function isOpen(d) { return !!d && d.hasAttribute("open"); }
  function anyOpen() { return Array.prototype.some.call(document.querySelectorAll("dialog"), isOpen); }
  function syncLock() { root.classList.toggle("is-locked", anyOpen()); }

  function openDialog(d) {
    if (!d || isOpen(d)) return;
    d.classList.remove("closing");
    lastFocus = document.activeElement;
    if (nativeDialog) d.showModal();
    else {
      if (!scrim) {
        scrim = document.createElement("div");
        scrim.className = "scrim";
        scrim.addEventListener("click", function () {
          document.querySelectorAll("dialog[open]").forEach(function (x) { closeDialog(x); });
        });
      }
      document.body.appendChild(scrim);
      d.setAttribute("open", "");
      var first = d.querySelector("button, select, input, a[href]");
      if (first) first.focus();
    }
    syncLock();
  }
  function shut(d) {
    if (nativeDialog) d.close();
    else {
      d.removeAttribute("open");
      if (scrim && !anyOpen() && scrim.parentNode) scrim.parentNode.removeChild(scrim);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    syncLock();
  }
  function closeDialog(d, then) {
    if (!isOpen(d)) { if (then) then(); return; }
    if (reduce) { shut(d); if (then) then(); return; }
    d.classList.add("closing");
    var done = false;
    var finish = function () {
      if (done) return; done = true;
      d.classList.remove("closing"); shut(d); if (then) then();
    };
    d.addEventListener("animationend", finish, { once: true });
    window.setTimeout(finish, 400); // in case the animation never runs
  }
  if (!nativeDialog) {
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      document.querySelectorAll("dialog[open]").forEach(function (x) { closeDialog(x); });
    });
  }
  document.querySelectorAll("dialog").forEach(function (d) {
    // Esc: play the exit instead of vanishing.
    d.addEventListener("cancel", function (e) { e.preventDefault(); closeDialog(d); });
    // A native close (form method=dialog, browser UI) must release the page too.
    d.addEventListener("close", syncLock);
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
  var SHIP = 300; // flat, to any Ozon pickup point; her call, 18 Oct
  var drawer = $("cart-drawer");
  var linesEl = $("cart-lines");
  var emptyEl = $("cart-empty");
  var totalEl = $("cart-total");
  var sumEl = $("cart-sum");
  var goodsEl = $("cart-goods");
  var shipEl = $("cart-ship");
  var hintEl = $("ship-hint");
  var countEl = $("cart-count");
  var form = $("order-form");
  var doneEl = $("order-done");
  var justOrdered = false; // keep the thank-you on screen until the cart is reopened

  function shipFor(goods) { return goods >= FREE_FROM ? 0 : SHIP; }
  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP) + NBSP + "₽"; }

  // When the browser refuses storage, the cart still lives for this visit.
  var memCart = null;
  function read() {
    try {
      var raw = memCart || JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(raw)) return [];
      return raw.filter(function (l) {
        return l && typeof l.id === "string" && typeof l.name === "string" &&
               isFinite(l.price) && isFinite(l.qty) && l.qty > 0;
      });
    } catch (e) { return []; }
  }
  function write(cart) {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); memCart = null; }
    catch (e) { memCart = cart; }
  }
  function add(line, qty) {
    qty = qty || 1;
    justOrdered = false;
    var cart = read();
    var found = cart.filter(function (l) { return l.id === line.id; })[0];
    if (found) found.qty += qty;
    else cart.push({ id: line.id, name: line.name, sub: line.sub || "", price: line.price,
                     img: line.img || "", qty: qty });
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
        li.appendChild(el("div", "line-no-img"));
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

    if (emptyEl) emptyEl.hidden = count > 0 || justOrdered;
    if (doneEl) doneEl.hidden = !(justOrdered && count === 0);
    if (totalEl) totalEl.hidden = count === 0;
    if (form) form.hidden = count === 0;
    var ship = shipFor(total);
    if (goodsEl) goodsEl.textContent = money(total);
    if (shipEl) shipEl.textContent = ship ? money(ship) : "бесплатно";
    if (sumEl) sumEl.textContent = money(total + ship);
    if (hintEl) {
      hintEl.dataset.free = String(!ship);
      hintEl.textContent = ship ? "Добавьте товаров на " + money(FREE_FROM - total) + ", и доставка станет бесплатной." : "";
      hintEl.hidden = !ship;
    }
  }

  function openCart() { justOrdered = false; render(); openDialog(drawer); }
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

  /* ── structured data for search: built from the cards themselves, so a price
     edited on a card is the price the search engines read. One source. ── */
  (function () {
    var base = location.href.split("#")[0].replace(/index\.html$/, "");
    var abs = function (u) { try { return new URL(u, base).href; } catch (e) { return u; } };
    var items = Array.prototype.map.call(document.querySelectorAll("[data-sku][data-price]"), function (c, i) {
      var desc = [c.dataset.incl, c.dataset.size, c.dataset.burn].filter(Boolean).join(". ");
      return {
        "@type": "ListItem", position: i + 1,
        item: {
          "@type": "Product",
          name: c.dataset.name + (c.dataset.sub ? ", " + c.dataset.sub : ""),
          image: abs(c.dataset.img),
          description: desc || "Ручная работа Lila Gerts. Изготовление 10–14 дней.",
          brand: { "@type": "Brand", name: "Lila Gerts" },
          offers: {
            "@type": "Offer", price: c.dataset.price, priceCurrency: "RUB",
            availability: "https://schema.org/MadeToOrder", url: base + "#" + (c.closest("section") || {}).id
          }
        }
      };
    });
    var data = [{
      "@context": "https://schema.org", "@type": "OnlineStore",
      name: "Lila Gerts", url: base, logo: abs("assets/img/logo.png"), image: abs("assets/img/og.jpg"),
      description: "Авторские свечи и гипсовые подсвечники ручной работы.",
      email: "lila_gerts@mail.ru", sameAs: ["https://t.me/Nina.G1999"], areaServed: "RU", currenciesAccepted: "RUB"
    }, { "@context": "https://schema.org", "@type": "ItemList", name: "Свечи, наборы и подсвечники", itemListElement: items }];
    var tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
  })();

  /* ── catalogue filters ── */
  var shop = $("shop");
  // Counts come from the cards, so adding or removing a card never leaves a stale number.
  if (shop) document.querySelectorAll(".chip[data-filter]").forEach(function (chip) {
    var f = chip.dataset.filter;
    var n = shop.querySelectorAll(f === "all" ? ".card" : '.card[data-cat="' + f + '"]').length;
    var badge = chip.querySelector("span");
    if (badge) badge.textContent = String(n);
  });
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
  if (qvScent) qvScent.addEventListener("change", function () { qvScentField.dataset.invalid = "false"; });
  var qvQty = $("qv-qty");
  var current = null;
  var qtyNow = 1;

  var qvColorField = $("qv-color-field");
  var qvColors = $("qv-colors");

  // A card with data-colors ("Name:#hex;Name:#hex") gets a colour choice in the
  // sheet: one radio per colour, none picked, so the buyer says which one.
  function paintColors(spec) {
    qvColors.textContent = "";
    var list = (spec || "").split(";").map(function (pair) {
      var bits = pair.split(":");
      return { name: (bits[0] || "").trim(), hex: (bits[1] || "").trim() };
    }).filter(function (c) { return c.name; });
    list.forEach(function (c) {
      var label = el("label", "pick");
      var input = el("input");
      input.type = "radio"; input.name = "color"; input.value = c.name;
      input.addEventListener("change", function () { qvColorField.dataset.invalid = "false"; });
      var face = el("span");
      var dot = el("i");
      if (/^#[0-9a-f]{6}$/i.test(c.hex)) dot.style.background = c.hex;
      face.append(dot, document.createTextNode(c.name));
      label.append(input, face);
      qvColors.appendChild(label);
    });
    qvColorField.hidden = !list.length;
    qvColorField.dataset.invalid = "false";
    return list.length > 0;
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
      scent: holder.dataset.scent !== "no",
      colors: false,
      set: holder.dataset.cat === "set",
      spec: [["Состав", holder.dataset.incl], ["Размер", holder.dataset.size],
             ["Горение", holder.dataset.burn], ["Изготовление", "10–14 дней"]]
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
    current.colors = paintColors(holder.dataset.colors);
    var spec = $("qv-spec");
    if (spec) {
      spec.textContent = "";
      current.spec.forEach(function (row) {
        if (!row[1]) return;
        var d = el("div");
        d.append(el("dt", null, row[0]), el("dd", null, row[1]));
        spec.appendChild(d);
      });
    }
    qvScent.value = "";
    qvScentField.dataset.invalid = "false";
    // Matches in a glass tube are promised with every candle set, not with a
    // single candle; the gift wrap goes with every order.
    $("qv-incl").textContent = !current.scent
      ? "В подарок спички, сменные чайные свечи, подарочная упаковка и открытка с посланием. Фото кошки попросим после оплаты."
      : current.set ? "В комплекте спички в стеклянной колбе и подарочная упаковка."
      : "Отправим в подарочной упаковке.";
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
      var color = "";
      if (current.colors) {
        var picked = qvColors.querySelector("input:checked");
        if (!picked) {
          qvColorField.dataset.invalid = "true";
          qvColors.querySelector("input").focus();
          return;
        }
        color = picked.value;
      }
      // Every candle needs a scent: no "decide later in a chat" any more.
      if (current.scent && !qvScent.value) {
        qvScentField.dataset.invalid = "true";
        qvScent.focus();
        return;
      }
      var scent = current.scent ? qvScent.value : "";
      var sub = [color ? "цвет: " + color.toLowerCase() : current.sub,
                 scent ? "аромат: " + scent : ""].filter(Boolean).join(" · ");
      add({ id: [current.sku, color, scent].filter(Boolean).join("|"), name: current.name, sub: sub,
            price: current.price, img: current.img }, qtyNow);
      var label = current.name + (qtyNow > 1 ? " × " + qtyNow : "") + " в корзине";
      closeDialog(qv, function () { say(label); });
    });
  }

  /* ── the cart against today's catalogue ──
     A cart can sit in a browser for weeks while prices and the range change.
     On every visit each line takes its price, name and photo from the current
     card; a line whose product is gone is dropped.
     Either way the buyer is told, never surprised at checkout. */
  (function reconcile() {
    var cart = read();
    if (!cart.length) return;
    var dropped = 0, repriced = 0;
    var kept = cart.filter(function (l) {
      var sku = l.id.split("|")[0];
      var card = null;
      try { card = document.querySelector('[data-sku="' + (window.CSS && CSS.escape ? CSS.escape(sku) : sku) + '"]'); } catch (e) { card = null; }
      if (!card) { dropped++; return false; }
      var price = parseInt(card.dataset.price, 10);
      l.name = card.dataset.name || l.name;
      l.img = card.dataset.img || l.img;
      if (price && price !== l.price) { l.price = price; repriced++; }
      return true;
    });
    if (!dropped && !repriced) return;
    write(kept);
    say(dropped
      ? (dropped === 1 ? "Одного товара больше нет в каталоге, он убран из корзины." : "Некоторых товаров больше нет в каталоге, они убраны из корзины.")
      : "Цены в корзине обновлены по каталогу.");
  })();

  render();

  function fieldOf(input) { return input.closest("[data-field]"); }
  function validate(input) {
    var wrap = fieldOf(input);
    if (!wrap) return true;
    if (input.id === "f-phone") {
      var digits = input.value.replace(/\D/g, "").length;
      input.setCustomValidity(input.value && (digits < 10 || digits > 15) ? "phone" : "");
    }
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

  /* ── checkout ── */
  /* ── payment: the ЮKassa form she built, posted with this order's sum ──
     The shop has no server, so the order goes to her mail first and then the
     buyer pays on ЮKassa's page. The order number rides in the comment, so her
     payment notice says which order it is. ЮKassa mails the receipt. */
  var PAY = {
    action: "https://yookassa.ru/integration/simplepay/payment",
    shopId: "1503798",
    ok: "https://lila-gerts.github.io/?oplata=ok",
    fail: "https://lila-gerts.github.io/?oplata=oshibka"
  };
  var LAST = "lg-last-order";
  function pay(o) {
    var f = document.createElement("form");
    f.method = "post"; f.action = PAY.action; f.acceptCharset = "utf-8"; f.hidden = true;
    [["shopId", PAY.shopId], ["sum", String(o.sum)], ["cps_email", o.email || ""],
     ["orderDetails", (o.details || "Заказ " + o.no).slice(0, 1000)],
     ["shopSuccessURL", PAY.ok], ["shopFailURL", PAY.fail]
    ].forEach(function (kv) {
      var i = document.createElement(kv[0] === "orderDetails" ? "textarea" : "input");
      if (i.tagName === "INPUT") i.type = "hidden";
      i.name = kv[0]; i.value = kv[1];
      f.appendChild(i);
    });
    document.body.appendChild(f);
    f.submit();
  }
  function lastOrder() {
    try { var o = JSON.parse(localStorage.getItem(LAST) || "null"); return o && o.no && o.sum ? o : null; }
    catch (e) { return null; }
  }
  // The order just placed is kept in memory too: some in-app browsers refuse
  // localStorage, and the button must still work there.
  var justPlaced = null;
  var payNow = $("pay-now");
  if (payNow) payNow.addEventListener("click", function () { var o = justPlaced || lastOrder(); if (o) pay(o); });

  // Back from ЮKassa: say how it went, then drop the parameter from the address.
  (function () {
    var m = /[?&]oplata=(ok|oshibka)/.exec(location.search);
    var note = $("pay-note");
    if (!m || !note) return;
    var o = lastOrder();
    var again = $("pay-again");
    if (m[1] === "ok") {
      $("pay-note-title").textContent = o ? "Спасибо за заказ!" : "Спасибо!";
      // Her sticker, only when there really is a paid order to thank for.
      if (o) { $("pay-note-sticker").hidden = false; note.classList.add("pay-note--thanks"); }
      $("pay-note-text").textContent = o
        ? "Заказ " + o.no + " оплачен. Чек придёт на почту. Как только заказ будет готов, отправим его в ваш пункт выдачи Ozon."
        : "Если вы оплатили заказ, чек придёт на почту. Вопросы — в Telegram.";
      if (o) {
        // Paid: now the cart is done with, and her copy of the order goes out,
        // marked paid. The ЮKassa notice already carries the full order, so a
        // failed letter loses nothing.
        write([]);
        render();
        try { localStorage.removeItem("lg-pending"); } catch (e) { /* private mode */ }
        var to = (document.getElementById("order-form") || {}).dataset;
        if (o.payload && to && to.endpoint) {
          try {
            fetch(to.endpoint, {
              method: "POST", keepalive: true,
              headers: { "Content-Type": "application/json", "Accept": "application/json" },
              body: JSON.stringify(o.payload)
            }).catch(function () { /* the ЮKassa notice has it */ });
          } catch (e) { /* the ЮKassa notice has it */ }
        }
      }
      try { localStorage.removeItem(LAST); } catch (e) { /* private mode */ }
    } else {
      $("pay-note-title").textContent = "Оплата не прошла";
      $("pay-note-text").textContent = o
        ? "Заказ " + o.no + " сохранён, деньги не списаны. Попробуйте оплатить ещё раз или напишите в Telegram."
        : "Деньги не списаны. Напишите в Telegram, поможем с оплатой.";
      if (o && again) { again.hidden = false; again.addEventListener("click", function () { pay(o); }); }
    }
    note.hidden = false;
    $("pay-note-close").addEventListener("click", function () { note.hidden = true; });
    if (window.history && history.replaceState) history.replaceState(null, "", location.pathname + location.hash);
  })();

  if (!form) return;
  var status = $("form-status");
  var endpoint = form.dataset.endpoint || "";

  // The buyer's details survive a closed drawer and come back for the next order.
  var BUYER = "lg-buyer";
  var remembered = ["f-name", "f-phone", "f-email", "f-pvz"];
  try {
    var saved = JSON.parse(localStorage.getItem(BUYER) || "{}");
    remembered.forEach(function (id) { if (typeof saved[id] === "string" && $(id)) $(id).value = saved[id]; });
  } catch (e) { /* private mode or junk: start empty */ }
  function rememberBuyer() {
    var o = {};
    remembered.forEach(function (id) { if ($(id)) o[id] = $(id).value; });
    try { localStorage.setItem(BUYER, JSON.stringify(o)); } catch (e) { /* private mode */ }
  }
  remembered.forEach(function (id) { if ($(id)) $(id).addEventListener("input", rememberBuyer); });

  // Short, readable, said aloud in a chat: LG-ДДММ-NNNN.
  function orderNumber() {
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    return "LG-" + pad(d.getDate()) + pad(d.getMonth() + 1) + "-" + String(1000 + Math.floor(Math.random() * 9000));
  }
  var submitBtn = form.querySelector("button[type=submit]");

  // A slow network tempts a second tap, and a send that "failed" in the browser
  // may still have reached her mail. So: one send at a time, and a retry of the
  // same cart by the same buyer keeps the same order number, so a duplicate
  // letter is plainly the same order, not a new one.
  var sending = false;
  function unlock() {
    sending = false;
    if (submitBtn) submitBtn.disabled = false;
    delete status.dataset.state;
    status.textContent = "";
  }
  // Back from the payment page with the browser's Back button: the page may be
  // restored frozen, so unlock the form for another try.
  window.addEventListener("pageshow", function (e) { if (e.persisted) unlock(); });
  var PEND = "lg-pending";
  var pending = null;
  function numberFor(sig) {
    var p = pending;
    if (!p) { try { p = JSON.parse(localStorage.getItem(PEND) || "null"); } catch (e) { p = null; } }
    if (p && p.sig === sig && Date.now() - p.at < 3 * 3600 * 1000) return p.no;
    pending = { no: orderNumber(), sig: sig, at: Date.now() };
    try { localStorage.setItem(PEND, JSON.stringify(pending)); } catch (e) { /* private mode */ }
    return pending.no;
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
    if (sending) return;
    var cart = read();
    if (!cart.length) return;

    var bad = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"))
      .filter(function (i) { return !validate(i); });
    if (bad.length) { bad[0].focus(); return; }

    var data = new FormData(form);
    var total = cart.reduce(function (a, l) { return a + l.price * l.qty; }, 0);
    var ship = shipFor(total);
    var no = numberFor(JSON.stringify([
      cart.map(function (l) { return [l.id, l.qty]; }),
      data.get("name"), data.get("phone"), data.get("email"), data.get("pvz")
    ]));
    var order = {
      no: no,
      items: cart.map(function (l) { return { name: l.name, sub: l.sub, price: l.price, qty: l.qty }; }),
      total: total, ship: ship, name: data.get("name"), phone: data.get("phone"),
      email: data.get("email"), pvz: data.get("pvz"), note: data.get("note")
    };

    var sum = total + ship;
    var lines = cart.map(function (l) {
      return l.name + (l.sub ? " (" + l.sub + ")" : "") + " × " + l.qty + " = " + (l.price * l.qty) + " руб.";
    }).join("\n");

    // What rides with the payment: the whole order, short, so the ЮKassa
    // notice alone is enough to make and send it.
    // ЮKassa's notice drops line breaks, so every part also ends with ";".
    var details = [no, lines.split("\n").join(";\n"),
      "Доставка: " + (ship ? ship + " руб." : "бесплатно") + ", итого " + sum + " руб.",
      "Имя: " + (order.name || ""), "Телефон: " + (order.phone || ""),
      "ПВЗ Ozon: " + (order.pvz || "")]
      .concat(order.note ? ["Комментарий: " + order.note] : []).join(";\n");

    // Her letter, sent only once the buyer is back from a successful payment.
    // FormSubmit mails one table row per field; the keys are the row names.
    var payload = {
      _subject: "Оплачен заказ " + no + ": " + (order.name || "") + ", " + sum + " руб.",
      _template: "table",
      _captcha: "false",
      "Номер заказа": no,
      "Оплата": "оплачен через ЮKassa",
      "Заказ": lines,
      "Товары": total + " руб.",
      "Доставка": ship ? ship + " руб." : "бесплатно",
      "Итого": sum + " руб.",
      "Имя": order.name || "",
      "Телефон": order.phone || "",
      "Почта для чека": order.email || "",
      _replyto: order.email || "",
      "ПВЗ Ozon": order.pvz || "",
      "Комментарий": order.note || "—"
    };

    sending = true;
    if (submitBtn) submitBtn.disabled = true; // one tap, one payment
    status.dataset.state = "sending";
    status.textContent = "Переходим к оплате…";

    justPlaced = { no: no, sum: sum, email: order.email, details: details, payload: payload };
    try { localStorage.setItem(LAST, JSON.stringify(justPlaced)); } catch (e) { /* private mode */ }
    // The cart stays until the payment succeeds: a failed or abandoned payment
    // leaves it as it was, and a retry keeps the same order number.
    pay(justPlaced);
    window.setTimeout(unlock, 8000);
  });
})();
