/* ============================================
   IA BRUTAL - Main JavaScript
   Dynamic content loading & interactions
   ============================================ */

'use strict';

// =============================================
// ACCESS CONTROL CONFIG
// =============================================
// Cambia esta clave por la que quieras usar.
// El acceso se recuerda durante la sesión (sessionStorage).
//
// ⚠️ NOTA: Al ser un sitio estático (GitHub Pages), la clave
// es visible en el código fuente del navegador (DevTools).
// Esto protege contra curiosos, pero NO es seguridad real.
// Es un candado de cortesía, no un cifrado.
const ACCESS_KEY = '3025';
const ACCESS_SESSION_KEY = 'ia_brutal_unlocked';

// =============================================
// ACCESS CONTROL
// =============================================

function requireAccess(callback) {
    // Check if already unlocked this session
    if (sessionStorage.getItem(ACCESS_SESSION_KEY) === 'true') {
        callback();
        return;
    }

    const modal = document.getElementById('access-modal');
    const input = document.getElementById('access-key-input');
    const submitBtn = document.getElementById('access-submit-btn');
    const closeBtn = document.getElementById('modal-close-btn');
    const errorEl = document.getElementById('modal-error');

    if (!modal || !input || !submitBtn || !errorEl) {
        // Fallback: if modal elements don't exist, allow access
        callback();
        return;
    }

    // Clean slate
    input.value = '';
    errorEl.classList.remove('show');
    input.classList.remove('error');

    // Show modal
    modal.classList.add('active');
    setTimeout(() => input.focus(), 100);

    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';

    function handleUnlock() {
        const enteredKey = input.value.trim();
        if (enteredKey === ACCESS_KEY) {
            // Success — store in session and unlock
            sessionStorage.setItem(ACCESS_SESSION_KEY, 'true');
            modal.classList.remove('active');
            document.body.style.overflow = '';
            errorEl.classList.remove('show');
            input.classList.remove('error');
            // Remove event listeners
            cleanup();
            // Execute the protected action
            callback();
            showToast('🔓 ¡Contenido desbloqueado!');
        } else {
            // Wrong key
            input.classList.add('error');
            errorEl.classList.add('show');
            input.value = '';
            setTimeout(() => input.focus(), 300);
            // Remove error after 2s
            setTimeout(() => {
                errorEl.classList.remove('show');
                input.classList.remove('error');
            }, 2500);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        errorEl.classList.remove('show');
        input.classList.remove('error');
        cleanup();
    }

    function getFocusable() {
        return Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
            .filter(el => !el.disabled && el.offsetParent !== null);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && document.activeElement === input) {
            e.preventDefault();
            handleUnlock();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
        } else if (e.key === 'Tab') {
            // Focus trap: mantiene el foco dentro del modal
            const focusable = getFocusable();
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    function handleOutsideClick(e) {
        if (e.target === modal) {
            closeModal();
        }
    }

    function cleanup() {
        submitBtn.removeEventListener('click', handleUnlock);
        if (closeBtn) closeBtn.removeEventListener('click', closeModal);
        modal.removeEventListener('keydown', handleKeyDown);
        modal.removeEventListener('click', handleOutsideClick);
    }

    submitBtn.addEventListener('click', handleUnlock);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('keydown', handleKeyDown);
    modal.addEventListener('click', handleOutsideClick);
}

// =============================================
// DATA LOADING
// =============================================

let contentData = null;

async function loadData() {
    const container = document.querySelector('#tutoriales-container');
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Network error');
        contentData = await response.json();
        renderAll();
    } catch (err) {
        console.warn('Error loading data.json:', err);
        // Fallback data embedded directly
        contentData = getFallbackData();
        renderAll();
    }
}

// =============================================
// NAVIGATION
// =============================================

function showSection(sectionId) {
    // Update tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        const isActive = tab.dataset.section === sectionId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive);
    });

    // Update sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });

    // Scroll to top of main content
    document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update URL hash
    history.pushState(null, '', `#${sectionId}`);

    // Analytics: qué sección engancha más
    if (typeof gtag === 'function') {
        gtag('event', 'section_view', { section_id: sectionId });
    }
}

// =============================================
// RENDER ALL SECTIONS
// =============================================

function renderAll() {
    if (!contentData) return;
    renderTutoriales();
    renderPrompts();
    renderGuias();
    renderAutomatizacion();
}

// =============================================
// PAGINACIÓN (evita renderizar cientos de tarjetas de golpe)
// =============================================
const PAGE_SIZE = 12;
const paginationState = { tutoriales: PAGE_SIZE, prompts: PAGE_SIZE, guias: PAGE_SIZE, automatizacion: PAGE_SIZE };

function appendLoadMore(container, key, total, rerenderFn) {
    if (paginationState[key] >= total) return;
    const btn = document.createElement('button');
    btn.className = 'load-more-btn';
    btn.textContent = `Cargar más (${total - paginationState[key]} restantes)`;
    btn.addEventListener('click', () => {
        paginationState[key] += PAGE_SIZE;
        rerenderFn();
    });
    container.insertAdjacentElement('afterend', btn);
}

// =============================================
// TUTORIALES
// =============================================

function renderTutoriales() {
    const container = document.querySelector('#tutoriales-container');
    if (!container || !contentData.tutoriales) return;

    const prevBtn = container.nextElementSibling;
    if (prevBtn && prevBtn.classList.contains('load-more-btn')) prevBtn.remove();

    const items = contentData.tutoriales.slice(0, paginationState.tutoriales);
    container.innerHTML = items.map((t, i) => `
        <div class="content-card" style="animation-delay: ${Math.min(i, 8) * 0.06}s">
            <h3>${t.title}</h3>
            <div class="card-meta">
                <span class="meta-level">${t.level}</span>
                <span class="meta-duration">⏱ ${t.duration}</span>
            </div>
            <p class="card-desc">${t.description}</p>
            <div class="card-content" id="tutorial-content-${i}">
                <code>${escapeHtml(t.content)}</code>
            </div>
            <button class="expand-btn" onclick="toggleContent('tutorial-content-${i}', this)">
                📖 Ver contenido
            </button>
        </div>
    `).join('');

    appendLoadMore(container, 'tutoriales', contentData.tutoriales.length, renderTutoriales);
}

function toggleContent(contentId, btn) {
    const content = document.getElementById(contentId);
    if (!content) return;

    // If already expanded, just toggle closed — no need to re-authenticate
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        btn.innerHTML = '📖 Ver contenido';
        return;
    }

    // Require access before expanding
    requireAccess(() => {
        content.classList.add('expanded');
        btn.innerHTML = '📕 Ocultar contenido';
    });
}

// =============================================
// PROMPTS
// =============================================

let currentPromptFilter = 'todos';

function renderPrompts(filter) {
    const container = document.querySelector('#prompts-container');
    if (!container || !contentData.prompts) return;

    if (filter !== undefined) {
        currentPromptFilter = filter;
        paginationState.prompts = PAGE_SIZE;
    }

    const prevBtn = container.nextElementSibling;
    if (prevBtn && prevBtn.classList.contains('load-more-btn')) prevBtn.remove();

    const normalize = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const allFiltered = currentPromptFilter === 'todos'
        ? contentData.prompts
        : contentData.prompts.filter(p => normalize(p.category) === normalize(currentPromptFilter));

    if (allFiltered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <p>No hay prompts en esta categoría todavía.</p>
            </div>
        `;
        return;
    }

    const filtered = allFiltered.slice(0, paginationState.prompts);
    container.innerHTML = filtered.map((p, i) => `
        <div class="prompt-card" style="animation-delay: ${Math.min(i, 8) * 0.06}s">
            <div class="prompt-header">
                <h3>${p.title}</h3>
                <span class="prompt-category">${p.category}</span>
            </div>
            ${p.level ? `<span class="meta-level">${p.level}</span>` : ''}
            <p class="prompt-desc">${p.description}</p>
            <div class="prompt-text" onclick="copyPrompt(this)" title="Click para copiar">
                ${escapeHtml(p.text)}
            </div>
            <div class="prompt-tip">${p.tip}</div>
        </div>
    `).join('');

    appendLoadMore(container, 'prompts', allFiltered.length, () => renderPrompts());
}

function copyPrompt(element) {
    // Require access before copying
    requireAccess(() => {
        const text = element.textContent.trim();
        if (typeof gtag === 'function') {
            gtag('event', 'prompt_copy', { prompt_title: element.closest('.prompt-card')?.querySelector('h3')?.textContent || '' });
        }
        navigator.clipboard.writeText(text).then(() => {
            showToast('✅ ¡Prompt copiado al portapapeles!');
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('✅ ¡Prompt copiado al portapapeles!');
        });
    });
}

// =============================================
// GUIAS
// =============================================

function renderGuias() {
    const container = document.querySelector('#guias-container');
    if (!container || !contentData.guias) return;

    const prevBtn = container.nextElementSibling;
    if (prevBtn && prevBtn.classList.contains('load-more-btn')) prevBtn.remove();

    const items = contentData.guias.slice(0, paginationState.guias);
    container.innerHTML = items.map((g, i) => `
        <div class="content-card" style="animation-delay: ${Math.min(i, 8) * 0.06}s">
            <h3>${g.title}</h3>
            <div class="card-meta">
                <span class="meta-type">${g.type}</span>
                ${g.level ? `<span class="meta-level">${g.level}</span>` : ''}
            </div>
            <p class="card-desc">${g.description}</p>
            <div class="card-content" id="guia-content-${i}">
                <code>${escapeHtml(g.content)}</code>
            </div>
            <button class="expand-btn" onclick="toggleContent('guia-content-${i}', this)">
                📖 Leer guía
            </button>
        </div>
    `).join('');

    appendLoadMore(container, 'guias', contentData.guias.length, renderGuias);
}

// =============================================
// AUTOMATIZACION
// =============================================

function renderAutomatizacion() {
    const container = document.querySelector('#automatizacion-container');
    if (!container || !contentData.automatizacion) return;

    const prevBtn = container.nextElementSibling;
    if (prevBtn && prevBtn.classList.contains('load-more-btn')) prevBtn.remove();

    const items = contentData.automatizacion.slice(0, paginationState.automatizacion);
    container.innerHTML = items.map((a, i) => `
        <div class="content-card" style="animation-delay: ${Math.min(i, 8) * 0.06}s">
            <h3>${a.title}</h3>
            <div class="card-meta">
                <span class="meta-tool">🔧 ${a.tool}</span>
                <span class="meta-complexity">${a.complexity}</span>
                <span class="meta-savings">⏱ Ahorra ${a.timeSaving}</span>
            </div>
            <p class="card-desc">${a.description}</p>
            <div class="card-content" id="automatizacion-content-${i}">
                <div class="code-block">${escapeHtml(a.code)}</div>
            </div>
            <button class="expand-btn" onclick="toggleContent('automatizacion-content-${i}', this)">
                💻 Ver código
            </button>
        </div>
    `).join('');

    appendLoadMore(container, 'automatizacion', contentData.automatizacion.length, renderAutomatizacion);
}

// =============================================
// TOAST NOTIFICATION
// =============================================

function showToast(message) {
    const toast = document.querySelector('#toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._hideTimeout);
    toast._hideTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// =============================================
// UTILITY
// =============================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =============================================
// FALLBACK DATA (if data.json fails to load)
// =============================================

function getFallbackData() {
    return {
        tutoriales: [
            {
                title: 'Instalación Freebuff',
                description: 'Guía completa para instalar Freebuff, la alternativa gratuita a Cursor',
                duration: '15 min',
                level: 'Principiante',
                content: '1. Descargar Freebuff desde freebuff.io\n2. Descomprimir archivo\n3. npm install\n4. Configurar .env\n5. npm start\n6. Acceder a localhost:3000'
            },
            {
                title: 'Claude API - Primeros Pasos',
                description: 'Integrar Claude API en proyectos Python',
                duration: '20 min',
                level: 'Intermedio',
                content: '1. Obtener API key en console.anthropic.com\n2. pip install anthropic\n3. Crear credentials.json\n4. client = Anthropic(api_key="key")\n5. message = client.messages.create(...)\n6. Procesar respuesta'
            },
            {
                title: 'ChatGPT Pro - Productividad',
                description: 'Estrategias avanzadas con ChatGPT Pro para maximizar tu productividad',
                duration: '18 min',
                level: 'Intermedio',
                content: '1. Suscribirse ChatGPT Plus $20/mes\n2. Usar GPT-4 para tareas complejas\n3. Custom instructions para consistencia\n4. Code Interpreter para datos\n5. DALL-E 3 para imágenes\n6. Guardar chats reutilizables'
            }
        ],
        prompts: [
            {
                title: 'Redactor SEO',
                category: 'Escritura',
                description: 'Artículos optimizados para motores de búsqueda',
                text: 'Escribe artículo de 2000 palabras sobre [TOPIC] con H2, H3, keywords [KEYWORDS], hook 100w, datos reales, CTA',
                tip: 'Especifica tópico, keywords y audiencia'
            },
            {
                title: 'Email Persuasivo',
                category: 'Escritura',
                description: 'Emails con alta tasa de apertura',
                text: 'Email de venta para [PRODUCT]: Hook gancho, Problema-Solución-Prueba-CTA, personalizado para [AUDIENCE], máx 150w, tone urgente, PS beneficio',
                tip: 'Los emails con PS generan +15% clicks'
            },
            {
                title: 'Marketing Manager',
                category: 'Marketing',
                description: 'Estrategia de marketing completa',
                text: 'Estrategia para [PRODUCT]: Target audience, canales, mensaje, KPIs, presupuesto, calendario 3m, tácticas',
                tip: 'Define buyer persona primero'
            }
        ],
        guias: [
            {
                title: 'Precios IA 2026',
                type: 'Análisis Precios',
                description: 'Comparativa completa de herramientas de IA y sus precios',
                content: 'CHAT:\n- Claude Pro: $20/mes\n- ChatGPT Plus: $20/mes\n- Gemini Advanced: $20/mes\n\nIMAGEN:\n- DALL-E 3: $15/mes o $0.08/imagen\n- Midjourney: $10-120/mes\n- Stable Diffusion: Gratis\n\nCODE:\n- GitHub Copilot: $10/mes\n- Cursor: $20/mes\n- Tabnine: Gratis + premium'
            },
            {
                title: 'Alternativas Gratis',
                type: 'Comparativa',
                description: 'Herramientas gratuitas que reemplazan a las de pago',
                content: 'CHAT: ChatGPT Gratis, Ollama local, Llama 2, HuggingFace\nIMAGEN: Stable Diffusion, Leonardo AI, Pixlr\nCODE: GitHub Copilot (estudiantes), Tabnine Community\nVIDEO: CapCut, DaVinci Resolve, Synthesia'
            },
            {
                title: 'ROI Herramientas IA',
                type: 'Análisis ROI',
                description: 'Retorno real de inversión en herramientas de IA',
                content: 'FREELANCER COPYWRITING:\nSin IA: 4h/artículo × $50 = $200/artículo\nCon IA: 1h/artículo × $50 = $50 + $40 tools = $90/artículo\nAhorro: $110/artículo\n30 artículos/mes = $3,300 ahorro\nROI: 82.5x en mes 1'
            }
        ],
        automatizacion: [
            {
                title: 'Email Automático',
                tool: 'Python+Gmail API',
                complexity: 'Intermedio',
                description: 'Responde correos automáticamente usando IA',
                timeSaving: '5h/semana',
                code: 'from google.oauth2 import Credentials\nimport anthropic\n\ndef auto_reply():\n    service = build("gmail","v1")\n    msgs = service.users().messages().list(q="unread").execute()\n    for m in msgs["messages"]:\n        msg = service.users().messages().get(id=m["id"]).execute()\n        reply = claude_reply(msg)\n        send_email(reply)'
            },
            {
                title: 'Blog Generator',
                tool: 'Python+Claude+WordPress',
                complexity: 'Avanzado',
                description: 'Genera artículos automáticamente con IA',
                timeSaving: '20h/semana',
                code: 'client = anthropic.Anthropic()\nmsg = client.messages.create(\n    model="claude-3-opus",\n    messages=[{"role":"user","content":f"Escribe artículo sobre {topic}"}]\n)\nwp.posts.create({"title":topic,"content":msg.content[0].text})'
            },
            {
                title: 'Social Media Posts',
                tool: 'Python+Buffer',
                complexity: 'Básico',
                description: 'Programa publicaciones en redes sociales automáticamente',
                timeSaving: '3h/semana',
                code: 'import requests\nfor post in posts:\n    requests.post("buffer.api/updates",\n        json={"text":post["text"],"scheduled_at":post["time"]})\n    print(f"Post programado: {post[\\"text\\"]}")'
            }
        ]
    };
}

// =============================================
// EVENT LISTENERS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Load data
    loadData();

    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            showSection(tab.dataset.section);
        });
    });

    // Prompt filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPrompts(btn.dataset.filter);
        });
    });

    // Handle hash on load
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`#${hash}`)) {
        showSection(hash);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            const tabMap = {
                '1': 'inicio',
                '2': 'tutoriales', 
                '3': 'prompts',
                '4': 'guias',
                '5': 'automatizacion'
            };
            const section = tabMap[e.key];
            if (section) {
                e.preventDefault();
                showSection(section);
            }
        }
    });
});
