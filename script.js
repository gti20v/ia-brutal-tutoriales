/* ============================================
   IA BRUTAL - Main JavaScript
   Dynamic content loading & interactions
   ============================================ */

'use strict';

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
// TUTORIALES
// =============================================

function renderTutoriales() {
    const container = document.querySelector('#tutoriales-container');
    if (!container || !contentData.tutoriales) return;

    container.innerHTML = contentData.tutoriales.map((t, i) => `
        <div class="content-card" style="animation-delay: ${i * 0.1}s">
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
}

function toggleContent(contentId, btn) {
    const content = document.getElementById(contentId);
    if (!content) return;
    
    const isExpanded = content.classList.toggle('expanded');
    btn.innerHTML = isExpanded ? '📕 Ocultar contenido' : '📖 Ver contenido';
}

// =============================================
// PROMPTS
// =============================================

function renderPrompts(filter = 'todos') {
    const container = document.querySelector('#prompts-container');
    if (!container || !contentData.prompts) return;

    const filtered = filter === 'todos'
        ? contentData.prompts
        : contentData.prompts.filter(p => p.category.toLowerCase() === filter);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <p>No hay prompts en esta categoría todavía.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map((p, i) => `
        <div class="prompt-card" style="animation-delay: ${i * 0.1}s">
            <div class="prompt-header">
                <h3>${p.title}</h3>
                <span class="prompt-category">${p.category}</span>
            </div>
            <p class="prompt-desc">${p.description}</p>
            <div class="prompt-text" onclick="copyPrompt(this)" title="Click para copiar">
                ${escapeHtml(p.text)}
            </div>
            <div class="prompt-tip">${p.tip}</div>
        </div>
    `).join('');
}

function copyPrompt(element) {
    const text = element.textContent.trim();
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
}

// =============================================
// GUIAS
// =============================================

function renderGuias() {
    const container = document.querySelector('#guias-container');
    if (!container || !contentData.guias) return;

    container.innerHTML = contentData.guias.map((g, i) => `
        <div class="content-card" style="animation-delay: ${i * 0.1}s">
            <h3>${g.title}</h3>
            <div class="card-meta">
                <span class="meta-type">${g.type}</span>
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
}

// =============================================
// AUTOMATIZACION
// =============================================

function renderAutomatizacion() {
    const container = document.querySelector('#automatizacion-container');
    if (!container || !contentData.automatizacion) return;

    container.innerHTML = contentData.automatizacion.map((a, i) => `
        <div class="content-card" style="animation-delay: ${i * 0.1}s">
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
