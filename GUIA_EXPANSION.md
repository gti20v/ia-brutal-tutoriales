# 📚 Guía de Expansión de Contenido - IA BRUTAL

## Descripción General

Este documento explica cómo expandir el contenido de IA BRUTAL y optimizar SEO.

## Paso 2: Expandir Contenido

### Añadir Más Tutoriales

Edita `data.json` y agrega objetos tutorial en el array `tutoriales`:

```json
{
  "title": "Nombre del Tutorial",
  "description": "Descripción breve",
  "duration": "Ej: 15 min",
  "level": "Principiante/Intermedio/Avanzado",
  "content": "Contenido paso a paso..."
}
```

**Ideas de tutoriales para agregar:**
- Herramientas open-source (Ollama, LLama 2)
- - Integración con APIs específicas
  - - Casos de uso avanzados
    - - Comparativas detalladas
     
      - ### Añadir Más Prompts
     
      - Los prompts están en el array `prompts` con estructura:
     
      - ```json
        {
          "title": "Nombre del Prompt",
          "category": "Escritura/Programación/Marketing/Análisis/Negocio",
          "description": "Breve descripción",
          "text": "Contenido del prompt [PLACEHOLDER]",
          "tip": "Consejo de uso"
        }
        ```

        **Categorías existentes:**
        - **Escritura** - Copywriting, redacción, contenido
        - - **Programación** - Código, debugging, APIs
          - - **Marketing** - Estrategia, redes sociales, contenido
            - - **Análisis** - Datos, investigación, reportes
              - - **Negocio** - Modelos, estrategia, finanzas
               
                - ### Añadir Más Guías
               
                - Las guías van en array `guias`:
               
                - ```json
                  {
                    "title": "Nombre de la Guía",
                    "type": "Análisis/Comparativa/ROI/Seguridad/etc",
                    "description": "Descripción corta",
                    "content": "Contenido completo con datos"
                  }
                  ```

                  ### Añadir Ejemplos de Automatización

                  Array `automatizacion`:

                  ```json
                  {
                    "title": "Nombre del Ejemplo",
                    "tool": "Herramientas/Lenguajes usados",
                    "complexity": "Básico/Intermedio/Avanzado",
                    "description": "Qué hace",
                    "timeSaving": "Ej: 5h/semana",
                    "code": "Código de ejemplo"
                  }
                  ```

                  ## Paso 3: Mejoras de SEO

                  ### Meta Tags Ya Incluidos

                  ✅ Meta description
                  ✅ Keywords
                  ✅ Viewport (responsive)
                  ✅ Open Graph ready

                  ### Mejoras SEO Adicionales a Implementar

                  1. **Estructura de URL amigable**
                  2.    - Ya incluida: índice.html (raíz)
                    
                        - 2. **Sitemap XML**
                          3.    - Crear: `sitemap.xml` con URLs principales
                            
                                - 3. **robots.txt**
                                  4.    - Crear: archivo robots.txt para indexación
                                    
                                        - 4. **Schema.org Markup**
                                          5.    - Agregar JSON-LD en head para estructura de datos
                                            
                                                - 5. **Optimización de imágenes**
                                                  6.    - Convertir a WebP
                                                        -    - Optimizar con herramientas
                                                         
                                                             - ### Palabras Clave Recomendadas
                                                         
                                                             - - IA sin humo
                                                               - - Tutoriales IA 2026
                                                                 - - Prompts IA efectivos
                                                                   - - Automatización inteligente
                                                                     - - Herramientas IA gratis
                                                                       - - Claude API tutorial
                                                                         - - ChatGPT Pro guide
                                                                          
                                                                           - ## Paso 4: Analytics
                                                                          
                                                                           - ### Google Analytics
                                                                          
                                                                           - 1. Obtener código en: https://analytics.google.com
                                                                             2. 2. Crear propiedad: "IA BRUTAL"
                                                                                3. 3. Copiar ID de medición (GA-XXXXXXXX)
                                                                                   4. 4. Agregar en `<head>` de index.html:
                                                                                     
                                                                                      5. ```html
                                                                                         <!-- Google Analytics -->
                                                                                         <script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXX"></script>
                                                                                         <script>
                                                                                           window.dataLayer = window.dataLayer || [];
                                                                                           function gtag(){dataLayer.push(arguments);}
                                                                                           gtag('js', new Date());
                                                                                           gtag('config', 'GA-XXXXX');
                                                                                         </script>
                                                                                         ```

                                                                                         ### Métricas a Rastrear

                                                                                         - Visitantes únicos
                                                                                         - - Duración de sesión
                                                                                           - - Páginas por sesión
                                                                                             - - Tasa de rebote
                                                                                               - - Origen del tráfico (YouTube, redes, búsqueda)
                                                                                                 - - Sección más visitada
                                                                                                   - - Prompts más consultados
                                                                                                    
                                                                                                     - ## Paso 5: Actualización Regular
                                                                                                    
                                                                                                     - ### Calendario de Actualización
                                                                                                    
                                                                                                     - **Semanal:**
                                                                                                     - - Revisar comentarios en YouTube
                                                                                                       - - Actualizar precios si cambian
                                                                                                         - - Agregar nuevos prompts útiles
                                                                                                          
                                                                                                           - **Mensual:**
                                                                                                           - - Nuevo tutorial
                                                                                                             - - Revisar analytics
                                                                                                               - - Agregar 5-10 nuevos prompts
                                                                                                                
                                                                                                                 - **Trimestral:**
                                                                                                                 - - Actualizar guías de precios
                                                                                                                   - - Agregar nuevas herramientas
                                                                                                                     - - Revisar y corregir información desactualizada
                                                                                                                      
                                                                                                                       - ### Versionado de Contenido
                                                                                                                      
                                                                                                                       - ```
                                                                                                                         data.json → Cambios frecuentes
                                                                                                                         index.html → Cambios ocasionales
                                                                                                                         style.css → Actualizaciones de diseño
                                                                                                                         script.js → Nuevas funcionalidades
                                                                                                                         ```
                                                                                                                         
                                                                                                                         ## Herramientas Recomendadas
                                                                                                                         
                                                                                                                         - **Hemingway Editor** - Mejorar redacción
                                                                                                                         - - **Grammarly** - Revisar ortografía
                                                                                                                           - - **SEMrush** - Análisis SEO
                                                                                                                             - - **Canva** - Crear imágenes
                                                                                                                               - - **TinyPNG** - Optimizar imágenes
                                                                                                                                 - - **WAVE** - Prueba accesibilidad
                                                                                                                                  
                                                                                                                                   - ## URLs Finales (Una vez deployado)
                                                                                                                                  
                                                                                                                                   - - **Web Principal:** `https://gti20v.github.io/ia-brutal-tutoriales/`
                                                                                                                                     - - **YouTube:** `https://www.youtube.com/@IABRUTAL26`
                                                                                                                                       - - **Notion:** `https://iabrutal.notion.site`
                                                                                                                                        
                                                                                                                                         - ## Checklist de Lanzamiento
                                                                                                                                        
                                                                                                                                         - - ✅ GitHub Pages habilitado
                                                                                                                                           - - ⭕ Más tutoriales agregados (META: 8+)
                                                                                                                                             - - ⭕ Meta tags SEO completos
                                                                                                                                               - - ⭕ Google Analytics integrado
                                                                                                                                                 - - ⭕ robots.txt creado
                                                                                                                                                   - - ⭕ sitemap.xml creado
                                                                                                                                                     - - ⭕ Primera actualización completada
                                                                                                                                                      
                                                                                                                                                       - ---
                                                                                                                                                       
                                                                                                                                                       **Última actualización:** 2026-07-30
                                                                                                                                                       **Maintainer:** @IABRUTAL26
