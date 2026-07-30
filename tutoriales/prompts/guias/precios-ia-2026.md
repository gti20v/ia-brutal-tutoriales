# Análisis de Precios IA 2026 - Sin Humo

Datos oficiales de Google, Anthropic y OpenAI (julio 2026). Sin benchmarks independientes, solo números de las propias compañías.

## Modelos de Entrada (Tier Barato)

### Google Gemini 3.5 Flash
**Cambio:** Entrada $0.30 → **$1.50** por millón de tokens  
**Salida:** $2.50 → **$9** por millón de tokens  
**Multiplicador:** x5 en entrada, x3.6 en salida

```
100k tokens entrada = $0.15 (antes) → $0.15 (2026) ✗
NO. 100k tokens = $0.30 → $1.50 ❌
```

### Anthropic Claude Sonnet 5
**Anuncio:** 40% del precio de Opus 4.8  
**Implicación:** Modelos medianos ahora = rendimiento de top hace 6 meses

### OpenAI GPT-5.6 Terra
**Anuncio:** 50% del precio de GPT-5.5  
**Estrategia:** Precio agresivo para ganar volumen

---

## Comparativa Costo-Beneficio

| Modelo | Entrada | Salida | Caso de Uso |
|--------|---------|--------|-------------|
| Gemini 3.5 Flash | $1.50/1M | $9/1M | ❌ Ya no es "barato" |
| Claude Sonnet 5 | TBD | TBD | ✅ Alternativa buena relación |
| GPT-5.6 Terra | TBD | TBD | ✅ Si buscas features OpenAI |

---

## La Pega (Como Siempre)

### Flash ya no es tan "flash" en precio
- Antes: Opción económica + rápida
- - Ahora: Precio subió tanto que competidores ganan
 
  - ### Qué significa?
  - - **Para startups:** Revisa tu contract con Google, podría subir mucho
    - - **Para makers:** Calcula ROI: ¿Sigue siendo viable tu precio?
      - - **Para devs:** Considera cambiar a Sonnet si necesitas mejor relación precio-calidad
       
        - ---

        ## ROI Por Caso de Uso

        ### Procesar 1M de tokens al mes

        **Escenario: Entrada + Salida (10:1 ratio)**

        ```
        Google Flash 3.5:
        - Entrada: (900k tokens × $1.50 / 1M) = $1.35
        - Salida: (100k tokens × $9 / 1M) = $0.90
        - TOTAL: $2.25 al mes ✅ Viable para hobby

        Para una app con 100 usuarios activos:
        - 100 usuarios × 10 queries/día = 1000 queries/día
        - 30 días = 30k queries = $$?
        ```

        ### Propuesta: Si tienes +$100/mes en API
        Consideración estrategia multi-modelo:
        1. Flash 3.5 para tasks simples (summarization, clasificación)
        2. 2. Sonnet 5 para razonamiento complejo
           3. 3. Mezcla = mejor precio total
             
              4. ---
             
              5. ## Alternativas Gratis/Baratas
             
              6. - **Ollama** (local) - Gratis, control total
                 - - **Freebuff** (como mencionamos) - Gratis, sin límites
                   - - **Mistal Small** - Barato, buena relación
                     - - **Perplexity API** - Competitivo
                      
                       - ---

                       ## Conclusión

                       La IA se abarata en modelos de gama alta, pero los "baratos" suben. Es un movimiento esperado: Amazon, Microsoft y Google compiten por volumen mientras mantienen márgenes en entrada.

                       **Acción recomendada:** Recalcula tu costo de producción en agosto. Si Flash sube tu factura > 20%, prueba alternativas.
