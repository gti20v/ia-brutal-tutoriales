# 📊 Configuración de Analytics - IA BRUTAL

## Google Analytics 4 Setup (Paso 4)

### Paso 1: Crear Propiedad en Google Analytics

1. Ir a: https://analytics.google.com
2. 2. Hacer clic en **"Crear propiedad"**
   3. 3. Nombre: **IA BRUTAL**
      4. 4. Zona horaria: **América/Buenos Aires** (o tu zona)
         5. 5. Moneda: **USD**
            6. 6. Clickear **"Crear"**
              
               7. ### Paso 2: Obtener ID de Medición
              
               8. 1. En la sección **"Administración"** (engranaje abajo a la izquierda)
                  2. 2. Seleccionar propiedad **IA BRUTAL**
                     3. 3. En **"Fuentes de datos"** → **"Web"**
                        4. 4. Ingresar URL: `https://gti20v.github.io/ia-brutal-tutoriales/`
                           5. 5. Ingresar nombre: **IA BRUTAL Site**
                              6. 6. Copiar el **ID de medición** (formato: G-XXXXXXXXXX)
                                
                                 7. ### Paso 3: Integrar Google Analytics en el Sitio
                                
                                 8. Editar `index.html` y agregar este código en la sección `<head>`:
                                
                                 9. ```html
                                    <!-- Google Analytics -->
                                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
                                    <script>
                                      window.dataLayer = window.dataLayer || [];
                                      function gtag(){dataLayer.push(arguments);}
                                      gtag('js', new Date());
                                      gtag('config', 'G-XXXXXXXXXX');
                                    </script>
                                    ```

                                    **Reemplazar** `G-XXXXXXXXXX` con tu **ID de medición real**

                                    ### Paso 4: Verificar Funcionamiento

                                    1. Recargar sitio web
                                    2. 2. Abrir Google Analytics
                                       3. 3. Ir a **"Tiempo real"**
                                          4. 4. Deberías ver una sesión activa
                                            
                                             5. ## Métricas Importantes a Monitorear
                                            
                                             6. ### Engagement
                                             7. - **Sesiones activas** - Usuarios en el sitio ahora
                                                - - **Tasa de rebote** - % que solo visitan 1 página (objetivo: <60%)
                                                  - - **Duración promedio de sesión** - Objetivo: >2 minutos
                                                    - - **Páginas por sesión** - Cuántas páginas por visita
                                                     
                                                      - ### Tráfico
                                                      - - **Origen del tráfico** - De dónde vienen (YouTube, búsqueda, directo)
                                                        - - **Dispositivos** - Desktop vs Mobile (objetivo: 60% mobile)
                                                          - - **Países principales** - Geografía de audiencia
                                                            - - **Ciudades principales** - Ubicación más detallada
                                                             
                                                              - ### Conversión & Comportamiento
                                                              - - **Sección más visitada** - Tutoriales, Prompts, Guías, Automatización
                                                                - - **Prompts más consultados** - Cuáles generan interés
                                                                  - - **Clics en YouTube** - Tráfico hacia el canal
                                                                    - - **Clics en Notion** - Tráfico hacia prompts
                                                                     
                                                                      - ## Reporte Mensual Recomendado
                                                                     
                                                                      - Analizar cada mes:
                                                                     
                                                                      - ```
                                                                        Periodo: [Mes/Año]

                                                                        SESIONES
                                                                        - Total: ___
                                                                        - Nuevas: ___
                                                                        - Recurrentes: ___

                                                                        USUARIOS
                                                                        - Únicos: ___
                                                                        - Duración promedio: ___
                                                                        - Tasa rebote: ___%

                                                                        TOP PÁGINAS
                                                                        1. [Página] - [Sesiones]
                                                                        2. [Página] - [Sesiones]
                                                                        3. [Página] - [Sesiones]

                                                                        TRÁFICO
                                                                        - Búsqueda orgánica: ___%
                                                                        - Directo: ___%
                                                                        - Referral: ___%
                                                                        - YouTube: ___%

                                                                        DISPOSITIVOS
                                                                        - Desktop: ___%
                                                                        - Mobile: ___%
                                                                        - Tablet: ___%

                                                                        INSIGHTS & ACCIONES
                                                                        - Hallazgo principal: ...
                                                                        - Mejora a implementar: ...
                                                                        - Prueba a ejecutar: ...
                                                                        ```

                                                                        ## Eventos Personalizados (Avanzado)

                                                                        Para rastrear clics específicos, agregar en `script.js`:

                                                                        ```javascript
                                                                        // Rastrear clic en YouTube
                                                                        document.querySelector('.btn-primary').addEventListener('click', () => {
                                                                          gtag('event', 'click_youtube', {
                                                                            'event_category': 'engagement',
                                                                            'event_label': 'youtube_channel'
                                                                          });
                                                                        });

                                                                        // Rastrear cambio de sección
                                                                        function showSection(sectionName) {
                                                                          gtag('event', 'section_view', {
                                                                            'event_category': 'navigation',
                                                                            'event_label': sectionName
                                                                          });
                                                                          // resto del código...
                                                                        }
                                                                        ```

                                                                        ## Alertas Recomendadas

                                                                        En Google Analytics, configurar alertas para:

                                                                        1. **Caída en tráfico** - Si baja >50% en 1 día
                                                                        2. 2. **Aumento de rebote** - Si sube >15% vs promedio
                                                                           3. 3. **Tráfico alto** - Si supera 500 sesiones/día
                                                                              4. 4. **Nuevo país** - Si llega tráfico de país nuevo
                                                                                
                                                                                 5. ## Dashboard Personalizado
                                                                                
                                                                                 6. Crear dashboard con:
                                                                                 7. - Sesiones últimos 30 días (gráfica)
                                                                                    - - Top 5 páginas (tabla)
                                                                                      - - Tráfico por fuente (pie chart)
                                                                                        - - Usuarios nuevos vs recurrentes (gráfica)
                                                                                         
                                                                                          - ## Integración Avanzada: Google Search Console
                                                                                         
                                                                                          - 1. Ir a: https://search.google.com/search-console
                                                                                            2. 2. Agregar propiedad: `https://gti20v.github.io/ia-brutal-tutoriales/`
                                                                                               3. 3. Verificar ownership
                                                                                                  4. 4. Enviar sitemap.xml
                                                                                                     5. 5. Monitorear clics en búsqueda
                                                                                                       
                                                                                                        6. ## Privacidad y Cumplimiento
                                                                                                       
                                                                                                        7. ✅ Google Analytics está configurado para cumplir GDPR
                                                                                                        8. ✅ Sin rastreo de datos personales
                                                                                                        9. ✅ Anónimo por defecto
                                                                                                        10. ✅ Los datos se eliminan después de 14 meses
                                                                                                       
                                                                                                        11. ## Recursos
                                                                                                       
                                                                                                        12. - [Google Analytics Help](https://support.google.com/analytics)
                                                                                                            - - [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
                                                                                                              - - [Search Console Help](https://support.google.com/webmasters)
                                                                                                               
                                                                                                                - ---
                                                                                                                
                                                                                                                **Status:** ⭕ Pendiente de completar
                                                                                                                **Fecha recomendada:** Después del lanzamiento web
