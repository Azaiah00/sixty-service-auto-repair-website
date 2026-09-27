/* Sixty Service, Inc. — site behavior (vanilla, no dependencies) */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector('.menu-btn');
  var panel = document.getElementById('nav-panel');
  if (btn && panel) {
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
      panel.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && btn.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }

  /* ---------- Odometer counters ---------- */
  var odos = [].slice.call(document.querySelectorAll('.odo[data-value]'));
  odos.forEach(function (el) {
    var val = el.getAttribute('data-value');
    el.setAttribute('aria-label', el.getAttribute('aria-label') || val);
    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = val;
    var vis = document.createElement('span');
    vis.setAttribute('aria-hidden', 'true');
    vis.style.display = 'inline-flex';
    val.split('').forEach(function (ch, i) {
      if (!/[0-9]/.test(ch)) {
        var s = document.createElement('span');
        s.className = 'odo-sep';
        s.textContent = ch;
        vis.appendChild(s);
        return;
      }
      var col = document.createElement('span');
      col.className = 'odo-col';
      var reel = document.createElement('span');
      reel.className = 'odo-reel';
      // two full turns of the reel before settling, for a real odometer feel
      var target = parseInt(ch, 10);
      var html = '';
      for (var r = 0; r < 2; r++) for (var d = 0; d < 10; d++) html += '<span>' + d + '</span>';
      for (var k = 0; k <= target; k++) html += '<span>' + k + '</span>';
      reel.innerHTML = html;
      reel.setAttribute('data-stop', String(20 + target));
      reel.style.transitionDelay = (i * 0.09) + 's';
      col.appendChild(reel);
      vis.appendChild(col);
    });
    el.textContent = '';
    el.appendChild(sr);
    el.appendChild(vis);
    el.removeAttribute('aria-label');
  });
  var rollOdo = function (el) {
    [].forEach.call(el.querySelectorAll('.odo-reel'), function (reel) {
      reel.style.transform = 'translateY(-' + reel.getAttribute('data-stop') + 'em)';
    });
  };
  if (reduce || !hasIO) {
    odos.forEach(function (el) {
      [].forEach.call(el.querySelectorAll('.odo-reel'), function (reel) {
        reel.style.transition = 'none';
      });
      rollOdo(el);
    });
  } else {
    var odoIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { rollOdo(en.target); odoIO.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    odos.forEach(function (el) { odoIO.observe(el); });
  }

  /* ---------- Reveal, alignment grid squaring, ticket printing ---------- */
  var groups = [
    { sel: '.reveal', cls: 'is-in', th: 0.15 },
    { sel: '.grid-bg', cls: 'is-square', th: 0.2 },
    { sel: '.toe', cls: 'is-square', th: 0.5 }
  ];
  groups.forEach(function (g) {
    var els = [].slice.call(document.querySelectorAll(g.sel));
    if (reduce || !hasIO) { els.forEach(function (el) { el.classList.add(g.cls); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add(g.cls); io.unobserve(en.target); }
      });
    }, { threshold: g.th, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  });

  var tickets = [].slice.call(document.querySelectorAll('.tickets > li'));
  if (reduce || !hasIO) {
    tickets.forEach(function (t) { t.classList.add('is-printed'); });
  } else {
    var tIO = new IntersectionObserver(function (entries) {
      var shown = entries.filter(function (en) { return en.isIntersecting; });
      shown.forEach(function (en, i) {
        var t = en.target;
        setTimeout(function () { t.classList.add('is-printed'); }, i * 140);
        tIO.unobserve(t);
      });
    }, { threshold: 0.2 });
    tickets.forEach(function (t) { tIO.observe(t); });
  }

  /* ---------- Hero gauge needle: sweeps with scroll ---------- */
  var gauge = document.querySelector('.gauge');
  if (gauge && !reduce) {
    var needle = gauge.querySelector('.needle');
    var readout = gauge.querySelector('.readout');
    var ticking = false;
    var update = function () {
      ticking = false;
      var r = gauge.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      // 0 when the dial first appears at the bottom, 1 when it leaves the top
      var p = (vh - r.top) / (vh + r.height);
      p = Math.max(0, Math.min(1, p));
      var v = 6 + p * 94;               // dial value 6..100
      var deg = -120 + v * 2.4;         // 0 -> -120deg, 100 -> 120deg
      needle.style.setProperty('--needle', deg.toFixed(2) + 'deg');
      if (readout) readout.textContent = String(Math.round(v)).padStart(2, '0');
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ---------- Appointment form ---------- */
  var form = document.querySelector('form[data-appt]');
  if (form) {
    var dateInput = form.querySelector('#dropoff');
    if (dateInput) {
      var t = new Date();
      var iso = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
      dateInput.setAttribute('min', iso);
    }
    var summary = form.querySelector('.form-error-summary');
    var success = document.querySelector('.form-success');
    var messages = {
      name: 'Please enter your name.',
      phone: 'Please enter a phone number we can reach you at (10 digits).',
      email: 'Please enter a valid email address, or leave it blank.',
      vehicle: 'Please enter the vehicle year, make and model.',
      service: 'Please choose the service you need.',
      contact: 'Please choose how you would like to be contacted.'
    };
    var validateField = function (name) {
      var wrap = form.querySelector('[data-field="' + name + '"]');
      if (!wrap) return true;
      var ok = true;
      if (name === 'contact') {
        ok = !!form.querySelector('input[name="preferred-contact"]:checked');
        if (ok && form.querySelector('input[name="preferred-contact"][value="Email"]:checked')) {
          var em = form.querySelector('#email');
          if (!em.value.trim()) { ok = false; wrap.querySelector('.err').textContent = 'Add an email address above to be contacted by email.'; }
        } else if (!ok) {
          wrap.querySelector('.err').textContent = messages.contact;
        }
      } else {
        var input = wrap.querySelector('input,select,textarea');
        var v = input.value.trim();
        if (name === 'phone') ok = v.replace(/\D/g, '').length >= 10;
        else if (name === 'email') ok = !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        else ok = v.length > 0;
        input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      }
      wrap.classList.toggle('has-error', !ok);
      return ok;
    };
    ['name', 'phone', 'email', 'vehicle', 'service'].forEach(function (n) {
      var wrap = form.querySelector('[data-field="' + n + '"]');
      if (!wrap) return;
      var input = wrap.querySelector('input,select,textarea');
      input.addEventListener('blur', function () { if (input.value.trim() || wrap.classList.contains('has-error')) validateField(n); });
      input.addEventListener('input', function () { if (wrap.classList.contains('has-error')) validateField(n); });
    });
    [].forEach.call(form.querySelectorAll('input[name="preferred-contact"]'), function (r) {
      r.addEventListener('change', function () { validateField('contact'); });
    });
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = ['name', 'phone', 'email', 'vehicle', 'service', 'contact'];
      var bad = fields.filter(function (n) { return !validateField(n); });
      if (bad.length) {
        summary.textContent = 'Please fix ' + (bad.length === 1 ? '1 field' : bad.length + ' fields') + ' marked below.';
        summary.classList.add('is-shown');
        var first = form.querySelector('[data-field="' + bad[0] + '"] input, [data-field="' + bad[0] + '"] select, [data-field="' + bad[0] + '"] textarea');
        if (first) first.focus();
        return;
      }
      summary.classList.remove('is-shown');
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      var data = new FormData(form);
      var body = new URLSearchParams();
      data.forEach(function (value, key) { body.append(key, value); });
      fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      }).then(function (res) {
        if (!res.ok) throw new Error('Network');
        form.hidden = true;
        success.classList.add('is-shown');
        success.setAttribute('tabindex', '-1');
        success.focus();
      }).catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send request';
        summary.textContent = 'Sorry, the request could not be sent from here. Please call (804) 379-9240 and we will take care of you.';
        summary.classList.add('is-shown');
        summary.focus();
      });
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
})();
