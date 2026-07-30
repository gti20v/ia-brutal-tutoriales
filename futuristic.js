/* IA BRUTAL — efectos visuales adicionales: partículas de fondo + tilt 3D en tarjetas.
   No interactúa con script.js/data.json existentes. */
(function () {
    // --- Red neuronal de fondo (plexus con glow) ---
    var canvas = document.getElementById('fx-particles');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var w, h, particles;
        var palette = ['rgba(168,85,247,', 'rgba(99,102,241,', 'rgba(236,72,153,', 'rgba(56,189,248,'];

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        function initParticles() {
            var count = Math.min(160, Math.floor((w * h) / 11000));
            particles = Array.from({ length: count }, function () {
                return {
                    x: Math.random() * w, y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
                    r: 0.8 + Math.random() * 1.8,
                    c: palette[Math.floor(Math.random() * palette.length)],
                    glow: Math.random() > 0.82
                };
            });
        }
        function tick() {
            ctx.clearRect(0, 0, w, h);
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
            }
            // conexiones
            for (var a = 0; a < particles.length; a++) {
                var pa = particles[a];
                for (var b = a + 1; b < particles.length; b++) {
                    var pb = particles[b];
                    var d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
                    if (d < 140) {
                        ctx.strokeStyle = 'rgba(139,92,246,' + (0.16 * (1 - d / 140)) + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
                    }
                }
            }
            // nodos (algunos con glow marcado, como estrellas)
            for (var k = 0; k < particles.length; k++) {
                var pk = particles[k];
                if (pk.glow) {
                    ctx.shadowBlur = 14;
                    ctx.shadowColor = pk.c + '0.9)';
                    ctx.fillStyle = pk.c + '1)';
                    ctx.beginPath(); ctx.arc(pk.x, pk.y, pk.r * 1.6, 0, Math.PI * 2); ctx.fill();
                    ctx.shadowBlur = 0;
                } else {
                    ctx.fillStyle = pk.c + '0.75)';
                    ctx.beginPath(); ctx.arc(pk.x, pk.y, pk.r, 0, Math.PI * 2); ctx.fill();
                }
            }
            requestAnimationFrame(tick);
        }
        window.addEventListener('resize', function () { resize(); initParticles(); });
        resize(); initParticles(); tick();
    }

    // --- Tilt 3D en tarjetas ---
    function attachTilt(el) {
        el.addEventListener('mousemove', function (e) {
            var r = el.getBoundingClientRect();
            var x = e.clientX - r.left, y = e.clientY - r.top;
            var rx = ((y / r.height) - 0.5) * -10;
            var ry = ((x / r.width) - 0.5) * 10;
            el.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
        });
        el.addEventListener('mouseleave', function () {
            el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
        });
    }
    function initTilt() {
        document.querySelectorAll('.intro-card, .content-card, .prompt-card').forEach(attachTilt);
    }
    initTilt();
    // Reaplica tilt cuando script.js inyecta tarjetas dinámicas (tutoriales/prompts/guias)
    var observer = new MutationObserver(function () { initTilt(); });
    var app = document.getElementById('app');
    if (app) observer.observe(app, { childList: true, subtree: true });

    // --- Buscador global ---
    var searchInput = document.getElementById('global-search');
    var searchWrap = document.querySelector('.nav-search');
    var searchClear = document.getElementById('global-search-clear');
    var resultsBox = document.getElementById('search-results');
    var SECTION_META = {
        tutoriales: { icon: '📖', label: 'Tutorial', section: 'tutoriales' },
        prompts: { icon: '💬', label: 'Prompt', section: 'prompts' },
        guias: { icon: '📋', label: 'Guía', section: 'guias' },
        automatizacion: { icon: '⚙️', label: 'Automatización', section: 'automatizacion' }
    };

    function waitForData(cb) {
        if (typeof contentData !== 'undefined' && contentData) { cb(); return; }
        setTimeout(function () { waitForData(cb); }, 200);
    }

    function runSearch(query) {
        var q = query.trim().toLowerCase();
        searchWrap.classList.toggle('has-value', q.length > 0);
        if (!q) {
            resultsBox.classList.remove('active');
            resultsBox.innerHTML = '';
            return;
        }
        if (typeof contentData === 'undefined' || !contentData) return;

        var results = [];
        (contentData.tutoriales || []).forEach(function (item) {
            if (matches(item, ['title', 'description', 'content'], q)) {
                results.push({ meta: SECTION_META.tutoriales, title: item.title, desc: item.description });
            }
        });
        (contentData.prompts || []).forEach(function (item) {
            if (matches(item, ['title', 'description', 'text', 'category'], q)) {
                results.push({ meta: SECTION_META.prompts, title: item.title, desc: item.description });
            }
        });
        (contentData.guias || []).forEach(function (item) {
            if (matches(item, ['title', 'description', 'content', 'type'], q)) {
                results.push({ meta: SECTION_META.guias, title: item.title, desc: item.description });
            }
        });
        (contentData.automatizacion || []).forEach(function (item) {
            if (matches(item, ['title', 'description', 'tool', 'code'], q)) {
                results.push({ meta: SECTION_META.automatizacion, title: item.title, desc: item.description });
            }
        });

        renderResults(results, query);
    }

    function matches(item, fields, q) {
        return fields.some(function (f) {
            return item[f] && String(item[f]).toLowerCase().indexOf(q) !== -1;
        });
    }

    function renderResults(results, query) {
        resultsBox.classList.add('active');
        if (!results.length) {
            resultsBox.innerHTML = '<div class="search-results-header">Sin resultados para "' + escapeHtmlLocal(query) + '"</div>';
            return;
        }
        var top = results.slice(0, 24);
        resultsBox.innerHTML =
            '<div class="search-results-header">' + results.length + ' resultado(s) para "' + escapeHtmlLocal(query) + '"</div>' +
            '<div class="search-results-grid">' +
            top.map(function (r) {
                return '<div class="search-result-card" data-section="' + r.meta.section + '">' +
                    '<span class="search-result-tag">' + r.meta.icon + ' ' + r.meta.label + '</span>' +
                    '<h4>' + escapeHtmlLocal(r.title) + '</h4>' +
                    '<p>' + escapeHtmlLocal((r.desc || '').slice(0, 90)) + '</p>' +
                    '</div>';
            }).join('') +
            '</div>';

        resultsBox.querySelectorAll('.search-result-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var section = card.getAttribute('data-section');
                if (typeof showSection === 'function') showSection(section);
                searchInput.value = '';
                searchWrap.classList.remove('has-value');
                resultsBox.classList.remove('active');
                resultsBox.innerHTML = '';
            });
        });
    }

    function escapeHtmlLocal(text) {
        var div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }

    if (searchInput) {
        waitForData(function () {
            searchInput.addEventListener('input', function () { runSearch(searchInput.value); });
            searchClear.addEventListener('click', function () {
                searchInput.value = '';
                runSearch('');
                searchInput.focus();
            });
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    runSearch('');
                    searchInput.blur();
                }
            });
        });
    }
})();
