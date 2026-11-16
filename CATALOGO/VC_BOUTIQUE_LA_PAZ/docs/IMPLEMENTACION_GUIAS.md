# Matriz de trazabilidad — 15 guías PDF del docente

La implementación se basa en las quince guías del archivo `GUIA TODO.rar` y en las capturas de la plantilla Whataform incluidas en `GUIA TDO.pdf`.

| Documento de referencia | Aplicación en V&C Boutique |
|---|---|
| Guía de Bitácora de Eventos — Día 1 | Panel de actividad en vivo; delegación por Event Bubbling; eventos `click`, `dblclick` y `keyup`; productos destacados y chat. |
| Guía de Bitácora de Eventos — Día 2 | Cambio de variantes, formulario de pedido, `change`, `submit` y `preventDefault()`; pedido guardado localmente. |
| Guía de Clase — Jueves: jQuery y Efectos | Selectores jQuery, clases activas, acordeón `slideToggle`, animaciones y filtros visuales. |
| Guía de Clase — Viernes: Maquetación UI | Navbar, tarjetas, calculador, resumen, modal, temporizador asíncrono de 30 segundos y toast de 3 segundos. |
| Guía de Clase y Diagnóstico PWA — Event Bubbling y Código Limpio | Delegación de eventos, limpieza `.off().on()`, nombres semánticos de clases y ausencia de clases genéricas típicamente bloqueadas por Brave/Opera. |
| Guía de Estudio — Arquitectura PWA Offline-First | Manifest, Service Worker, Cache Storage, estado online/offline y cola de pedidos local. |
| Guía de Laboratorio — Subcarpeta y Práctica lab-jquery | Segunda página independiente en `lab-jquery/` con sus propios HTML, CSS y JS. |
| Guía de Maquetación UI — Layout y Componentes (3 Empresas) | Arquitectura de interfaz con encabezado, catálogo, controles, resumen y modal de confirmación. |
| Guía para Estudiantes — Karaoke PWA, Lazy Loading y Consumo Asíncrono | Adaptación a tienda: 16 productos en JSON, Fetch API, miniaturas `loading="lazy"` y delegación de botones dinámicos. |
| Guía para Estudiantes — Memory Leaks, Hidratación SSR y PWA | Limpieza de listeners, inicialización única, `data-hidratado` y simulación de hidratación del DOM. |
| Guía Parte 1 — Tree Shaking, Seguridad XSS y Bloque de Reservas | Reducción de dependencias, uso de `textContent`/jQuery `.text()` para datos no confiables y flujo de pedido con validación. |
| Guía Parte 2 — Responsividad UI Crítica y Bloque Lista de Canciones | `min-height: 100dvh`, controles táctiles de al menos 44 px, separación, `min-width: 0`, ellipsis y media query landscape. |
| Guía Técnica PWA y Código de Referencia — inge Miguel | Meta viewport, diseño adaptativo, menú hamburguesa, filtro de tres capas y validación de formulario. |
| Guía Visual y Conceptual del DOM — Diseño Web II | Manipulación del DOM, `dataset`, eventos, filtros, menú móvil, formularios y estructura de archivos independiente. |
| Layout Visual de Referencia (3 Empresas — jQuery) | Adaptación del patrón de catálogo, búsqueda, tarjetas, panel desplegable, contador/resumen y acciones dinámicas a una boutique. |

## Referencia visual Whataform

Las capturas de la plantilla Tienda de ropa orientan la paleta rosa/blanco, navegación superior, acceso de cuenta, carrito, filtros por categoría, tarjetas de producto con precio, carrito fijo/lateral, listas de compra y secciones informativas. V&C mantiene ese lenguaje visual, con una composición editorial propia y mejoras de navegación.

## Alcance y límites

Las guías se trasladaron al dominio de una tienda de ropa. Los ejemplos de salas, canciones, canchas y consolas se adaptaron a productos, tallas, estilos, carrito, pedidos y atención de boutique. La cola Offline-First conserva registros en el dispositivo; no se sincroniza con un servidor de pedidos porque no se proporcionó una API o backend.

## Actualización v1.1 — Auditoría contra las 15 guías

| Requisito de la guía | Implementación | Ubicación |
|---|---|---|
| Modo oscuro/claro con `classList.toggle('dark-mode')` (Guía DOM Ej. 1; Layout Visual «Theme Toggle») | Botón ◐/☀ en la cabecera; respeta `prefers-color-scheme`, guarda la elección y actualiza `theme-color` | `script.js` `setupTheme`, `styles.css` `body.dark-mode` |
| Filtro dinámico de 3 capas en cascada (Guía Técnica PWA) | `#capa1` categoría → `#capa2` estilo (deshabilitado hasta elegir) → capa 3 con resultado; sincronizado con el catálogo | `index.html #filtros`, `setupCascade` |
| Cambio dinámico de temática, `addClass/removeClass` + ícono (Jueves, reto PRO) | La sección de categorías cambia de degradado e ícono según la categoría | `applyCategoryTheme`, `.tema-*` |
| Acordeón `slideToggle('fast')` (Jueves) | «Ver detalles del servicio», con delegación `.off().on()` | `setupReservas` |
| Módulo de reservas anti-XSS (Parte 1) | Formulario «Apartado en boutique»: nodos construidos con `.text()`; `<script>` se muestra como texto | `#formReserva` |
| Lista táctil blindada (Parte 2) | Lista de deseos: botones de 44 px, `min-width:0` + `ellipsis`, quitar por delegación, landscape | `#listaDeseos`, `.btn-tactil` |
| Validación con `fadeIn/fadeOut` y `slideDown().delay(3000).slideUp()` (Guía Técnica PWA) | Errores con `fadeTo`; alerta de éxito en el formulario de contacto | `validateContact`, `#successAlert` |
| Resaltado del total con `.animate()` (Layout Visual) | Subtotal y contador del carrito se resaltan al cambiar | `persistCart` |
| Expiración con `.fadeOut()` (Viernes, reto PRO) | El modal de pedido se desvanece al terminar los 30 s | `expireCheckout` |
| Offline-First: cola local, UI optimista y verificación al reconectar | Pedidos «Guardado localmente» pasan a «Verificado (sincronización simulada)» al volver la red | `syncQueue` |
| SW con jQuery CDN en caché (Guía Offline-First) | `sw.js` v1.1.0 precachea jQuery y lo sirve offline | `sw.js` |
| Subcarpeta independiente con su propio `manifest.json` y `sw.js` (Checklist Karaoke / Lab) | `lab-jquery/manifest.json` y `lab-jquery/sw.js` + registro | `lab-jquery/` |
| Detección móvil/tablet, Método B (Guía Técnica PWA) | `detectDevice()` agrega `is-touch-device` | `script.js` |
| Herramienta de diagnóstico (Event Bubbling y Código Limpio) | Versión adaptada y segura (`.text()`), sin `innerHTML` | `docs/diagnostico.html` |
| Limpieza de temporizadores (Memory Leaks) | `pagehide` detiene el `setInterval` | `init` |

### Decisiones y límites
- **Marco de smartphone en PC (`@media (min-width:1025px)`):** pertenece a la guía del portafolio personal. No se aplicó a la boutique porque comprimiría el catálogo de escritorio; la adaptabilidad se resuelve con el layout responsive.
- **`user-scalable=no`:** se mantiene porque la guía lo marca como mandatorio, aunque limita el zoom por accesibilidad.
- **Axios y Tree Shaking real:** no se usa Axios (la comparativa Fetch / jQuery AJAX / Axios es conceptual); Tree Shaking requiere un bundler (Vite/Rollup) y aquí se aplicó como limpieza manual de dependencias.
- **Sincronización:** no hay backend; la verificación al reconectar es una simulación académica.
