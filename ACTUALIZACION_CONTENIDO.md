# 🔄 Plan de Actualización Regular - IA BRUTAL (Paso 5)

## Visión General

IA BRUTAL es un proyecto vivo que requiere actualización regular para mantener contenido fresco, relevante y competitivo. Este documento establece el calendario y proceso de actualización.

## Calendario de Actualización

### 🕐 DIARIO (5-10 minutos)
- Revisar comentarios de YouTube
- - Responder preguntas en comunidad
  - - Monitorear analytics en tiempo real
   
    - ### 📅 SEMANAL (30 minutos - viernes)
    - - Revisar analítica de la semana
      - - Actualizar precios si hay cambios importantes
        - - Agregar 2-3 nuevos prompts
          - - Identificar temas trending
           
            - **Tareas específicas:**
            - ```
              [ ] Revisar Google Analytics
              [ ] Actualizar precios en guías
              [ ] Agregar nuevos prompts
              [ ] Revisar comentarios YouTube
              [ ] Planificar contenido próximo mes
              ```

              ### 🔄 QUINCENAL (1-2 horas)
              - Crear 1 nuevo tutorial
              - - Expandir data.json con nuevo contenido
                - - Revisar y actualizar guías existentes
                  - - Hacer commit a GitHub
                   
                    - **Tareas específicas:**
                    - ```
                      [ ] Tutorial completo (30 min)
                      [ ] 5-10 prompts nuevos (20 min)
                      [ ] Actualizar guía existente (20 min)
                      [ ] Revisar links y URLs (10 min)
                      [ ] Hacer commit con mensaje claro
                      ```

                      ### 📊 MENSUAL (2-3 horas)
                      - Análisis completo de analytics
                      - - Actualizar guías de precios
                        - - Crear 1-2 tutoriales nuevos
                          - - Revisar estructura y diseño
                            - - Publicar resumen en YouTube
                             
                              - **Tareas específicas:**
                              - ```
                                [ ] Análisis analytics completo
                                [ ] Reporte de métricas
                                [ ] Actualización de precios
                                [ ] Nuevos tutoriales (x2)
                                [ ] Nuevos prompts (x20+)
                                [ ] Revisar SEO
                                [ ] Video resumen para YouTube
                                ```

                                ### 🎯 TRIMESTRAL (4-6 horas)
                                - Revisión estratégica completa
                                - - Actualizar todas las guías
                                  - - Agregar nuevas herramientas
                                    - - Corregir información desactualizada
                                      - - Análisis competitivo
                                        - - Mejoras de diseño
                                         
                                          - **Tareas específicas:**
                                          - ```
                                            [ ] Análisis completo de competencia
                                            [ ] Actualizar todos los precios
                                            [ ] Revisar información desactualizada
                                            [ ] Agregar 2-3 herramientas nuevas
                                            [ ] Crear 3-5 tutoriales nuevos
                                            [ ] Agregar 50+ prompts
                                            [ ] Mejoras de UI/UX si aplica
                                            [ ] Hacer release major si aplica
                                            ```

                                            ## Versionado de Contenido

                                            ### Archivos - Frecuencia de Cambio

                                            ```
                                            ┌─────────────────────┬──────────────┬─────────────────┐
                                            │ Archivo             │ Cambio       │ Responsable     │
                                            ├─────────────────────┼──────────────┼─────────────────┤
                                            │ data.json           │ Diario/Semanal│ Content Lead   │
                                            │ index.html          │ Mensual      │ Dev/Designer    │
                                            │ style.css           │ Trimestral   │ Designer        │
                                            │ script.js           │ Trimestral   │ Developer       │
                                            │ robots.txt          │ Anual        │ SEO Specialist  │
                                            │ sitemap.xml         │ Mensual      │ SEO Specialist  │
                                            │ README.md           │ Mensual      │ Content Lead    │
                                            │ GUIA_EXPANSION.md   │ Trimestral   │ Content Lead    │
                                            └─────────────────────┴──────────────┴─────────────────┘
                                            ```

                                            ## Proceso de Actualización data.json

                                            ### Agregar Nuevo Prompt

                                            1. Abrir `data.json` en GitHub
                                            2. 2. Navegar al array `"prompts"`
                                               3. 3. Agregar objeto:
                                                 
                                                  4. ```json
                                                     {
                                                       "title": "Nombre descriptivo",
                                                       "category": "Escritura|Programación|Marketing|Análisis|Negocio",
                                                       "description": "Descripción corta (1-2 líneas)",
                                                       "text": "Prompt completo con [PLACEHOLDERS]",
                                                       "tip": "Consejo de uso práctico"
                                                     }
                                                     ```

                                                     4. Hacer commit con mensaje: `feat: Add prompt - [Nombre]`
                                                    
                                                     5. ### Agregar Nuevo Tutorial
                                                    
                                                     6. ```json
                                                        {
                                                          "title": "Nombre del Tutorial",
                                                          "description": "Qué se aprenderá",
                                                          "duration": "Ej: 20 min",
                                                          "level": "Principiante|Intermedio|Avanzado",
                                                          "content": "Pasos numerados, comandos, ejemplos"
                                                        }
                                                        ```

                                                        Mensaje: `feat: Add tutorial - [Nombre]`

                                                        ### Agregar Nueva Guía

                                                        ```json
                                                        {
                                                          "title": "Nombre de la Guía",
                                                          "type": "Análisis|Comparativa|ROI|Seguridad|Otro",
                                                          "description": "Resumen breve",
                                                          "content": "Contenido completo con datos, números, análisis"
                                                        }
                                                        ```

                                                        Mensaje: `feat: Add guide - [Nombre]`

                                                        ### Agregar Ejemplo Automatización

                                                        ```json
                                                        {
                                                          "title": "Nombre del Ejemplo",
                                                          "tool": "Tecnologías/Lenguajes",
                                                          "complexity": "Básico|Intermedio|Avanzado",
                                                          "description": "Qué automatiza",
                                                          "timeSaving": "Ej: 5h/semana",
                                                          "code": "Código completamente funcional"
                                                        }
                                                        ```

                                                        Mensaje: `feat: Add automation example - [Nombre]`

                                                        ## Checklist de Actualización Mensual

                                                        ```markdown
                                                        ## Actualización Agosto 2026

                                                        ### Análisis
                                                        - [ ] Analytics - Visitantes, sesiones, top páginas
                                                        - [ ] Engagement - Duración promedio, tasa rebote
                                                        - [ ] Tráfico - Origen (YouTube, búsqueda, directo)
                                                        - [ ] Dispositivos - Desktop vs Mobile vs Tablet

                                                        ### Contenido
                                                        - [ ] ✏️ Actualizar precios (comparativa IA)
                                                        - [ ] ✏️ Agregar 20+ nuevos prompts
                                                        - [ ] ✏️ Crear 1-2 nuevos tutoriales
                                                        - [ ] ✏️ Revisar guías existentes

                                                        ### SEO & Técnico
                                                        - [ ] Actualizar sitemap.xml
                                                        - [ ] Revisar Google Search Console
                                                        - [ ] Revisar links rotos
                                                        - [ ] Verificar landing speed

                                                        ### YouTube
                                                        - [ ] [ ] Revisar comentarios del canal
                                                        - [ ] [ ] Responder preguntas
                                                        - [ ] [ ] Crear 1-2 videos cortos

                                                        ### Mantenimiento
                                                        - [ ] Revisar datos desactualizados
                                                        - [ ] Corregir errores tipográficos
                                                        - [ ] Actualizar fechas/versiones
                                                        - [ ] Limpiar commits antiguos

                                                        ### Comunicación
                                                        - [ ] Publicar resumen en YouTube
                                                        - [ ] Anunciar en Notion
                                                        - [ ] Agregar a changelog

                                                        **Completado:** [Fecha]
                                                        **Próxima actualización:** [Fecha]
                                                        ```

                                                        ## Estrategia de Contenido

                                                        ### Temas a Cubrir

                                                        **Q3 2026 (Julio-Septiembre):**
                                                        - ✅ Herramientas principales (Claude, ChatGPT, Gemini)
                                                        - - ⭕ Automatización avanzada (Zapier, Make)
                                                          - - ⭕ IA para productividad personal
                                                            - - ⭕ Prompts para diferentes industrias
                                                             
                                                              - **Q4 2026 (Oct-Dic):**
                                                              - - Local LLMs (Ollama, LLama 2)
                                                                - - Casos de uso empresariales
                                                                  - - ROI y métricas de IA
                                                                    - - Tendencias de fin de año
                                                                     
                                                                      - ### Prompts por Agregar
                                                                     
                                                                      - **Próximo mes:**
                                                                      - ```
                                                                        Escritura:
                                                                        - [ ] Social media captions
                                                                        - [ ] LinkedIn content
                                                                        - [ ] Storytelling
                                                                        - [ ] Product descriptions

                                                                        Programación:
                                                                        - [ ] Web scraping
                                                                        - [ ] Data processing
                                                                        - [ ] API integration
                                                                        - [ ] Database queries

                                                                        Marketing:
                                                                        - [ ] Email campaigns
                                                                        - [ ] Landing pages
                                                                        - [ ] Ad copy
                                                                        - [ ] Growth strategies

                                                                        Análisis:
                                                                        - [ ] Competitive analysis
                                                                        - [ ] Market research
                                                                        - [ ] SWOT analysis
                                                                        - [ ] Trend forecasting

                                                                        Negocio:
                                                                        - [ ] Product roadmap
                                                                        - [ ] Growth metrics
                                                                        - [ ] Investment pitch
                                                                        - [ ] Contract review
                                                                        ```

                                                                        ## Herramientas Recomendadas

                                                                        - **GitHub Desktop** - Editar archivos localmente
                                                                        - - **VSCode** - Editor profesional con JSON support
                                                                          - - **Hemingway Editor** - Mejorar redacción
                                                                            - - **Grammarly** - Revisar ortografía
                                                                              - - **SEMrush** - Análisis SEO competitivo
                                                                                - - **Google Trends** - Detectar tópicos trending
                                                                                 
                                                                                  - ## Automatización
                                                                                 
                                                                                  - ### GitHub Actions (Futuro)
                                                                                 
                                                                                  - Configurar automáticamente:
                                                                                  - - Daily backup de data.json
                                                                                    - - Weekly SEO validation
                                                                                      - - Monthly report generation
                                                                                        - - Automated sitemap updates
                                                                                         
                                                                                          - ### Notificaciones
                                                                                         
                                                                                          - Recibir alertas cuando:
                                                                                          - - Google Analytics muestre caída de tráfico
                                                                                            - - Alguien cree issue con error
                                                                                              - - Pull request pendiente de revisión
                                                                                                - - Nuevo comentario en YouTube
                                                                                                 
                                                                                                  - ## Gestión de Errores
                                                                                                 
                                                                                                  - ### Reporte de Bugs
                                                                                                 
                                                                                                  - Si encuentras error:
                                                                                                 
                                                                                                  - 1. Crear issue en GitHub: https://github.com/gti20v/ia-brutal-tutoriales/issues
                                                                                                    2. 2. Describir: qué, dónde, cómo reproducir
                                                                                                       3. 3. Prioridad: Critical/High/Medium/Low
                                                                                                          4. 4. Asignar a si aplica
                                                                                                            
                                                                                                             5. **Template:**
                                                                                                             6. ```
                                                                                                                ## Bug: [Título]
                                                                                                                **Descripción:** [Qué pasó]
                                                                                                                **Pasos:** [Cómo reproducir]
                                                                                                                **Esperado:** [Qué debería pasar]
                                                                                                                **Actual:** [Qué pasó]
                                                                                                                **Prioridad:** High
                                                                                                                ```
                                                                                                                
                                                                                                                ## Métricas de Éxito
                                                                                                                
                                                                                                                Objetivos mensuales:
                                                                                                                
                                                                                                                ```
                                                                                                                TRÁFICO
                                                                                                                - [ ] 500+ sesiones
                                                                                                                - [ ] 300+ usuarios únicos
                                                                                                                - [ ] <60% bounce rate
                                                                                                                - [ ] >2min sesión promedio

                                                                                                                CONTENIDO
                                                                                                                - [ ] 50+ prompts
                                                                                                                - [ ] 5+ tutoriales
                                                                                                                - [ ] 3+ guías
                                                                                                                - [ ] 0 links rotos

                                                                                                                ENGAGEMENT
                                                                                                                - [ ] >100 interacciones/mes (YouTube)
                                                                                                                - [ ] >50 clics a Notion
                                                                                                                - [ ] >100 clics a YouTube
                                                                                                                ```
                                                                                                                
                                                                                                                ## Checklist Anual
                                                                                                                
                                                                                                                ```
                                                                                                                [ ] Revisión estratégica completa
                                                                                                                [ ] Análisis competitivo detallado
                                                                                                                [ ] Actualización de branding si aplica
                                                                                                                [ ] Mejora mayor de UI/UX
                                                                                                                [ ] Agregar nuevas secciones/features
                                                                                                                [ ] Celebrar hitos (1M views, 10k usuarios, etc)
                                                                                                                ```
                                                                                                                
                                                                                                                ---
                                                                                                                
                                                                                                                **Status:** ✅ Operacional
                                                                                                                **Última revisión:** 2026-07-30
                                                                                                                **Próxima revisión:** 2026-08-30
