# V&C BOUTIQUE | LA PAZ

Proyecto académico de Diseño Web II — UPDS, construido con HTML5, CSS3, JavaScript, jQuery y arquitectura PWA.

## Estructura

```text
V&C_BOUTIQUE_LA_PAZ/
├── index.html                 # Tienda principal
├── styles.css                 # Diseño responsive de la tienda
├── script.js                  # Catálogo, DOM, carrito, validaciones y eventos
├── manifest.json              # Identidad instalable de la PWA
├── sw.js                      # Service Worker y caché Offline-First
├── data/products.json         # 16 productos consumidos con Fetch API
├── assets/images/             # 16 fotografías de catálogo optimizadas WebP
├── icons/                     # Iconos PWA 192 y 512 px
├── lab-jquery/
│   ├── index.html             # Segunda página: laboratorio independiente
│   ├── styles.css             # Estilos del laboratorio
│   ├── script.js              # Efectos jQuery, cálculo y temporizador
│   └── assets/images/         # Imágenes del laboratorio
└── docs/
    ├── IMPLEMENTACION_GUIAS.md  # Matriz de trazabilidad con las 15 guías
    └── diagnostico.html         # Herramienta de diagnóstico de la guía
```

Hay dos páginas HTML, dos hojas CSS y dos scripts de aplicación. `sw.js` es un tercer archivo JavaScript técnico, separado de la lógica de las páginas, porque el Service Worker es obligatorio para la PWA.

## Cómo ejecutar

No abrir los HTML con doble clic (`file://`), porque Fetch API y Service Worker necesitan un servidor HTTP/HTTPS.

1. Extrae el ZIP.
2. Abre una terminal dentro de esta carpeta.
3. Ejecuta `python -m http.server 8000`.
4. Visita `http://localhost:8000/`.
5. Laboratorio: `http://localhost:8000/lab-jquery/`.

Para instalar como PWA y probar el Service Worker se requiere `localhost` o un hosting HTTPS como GitHub Pages. En GitHub Pages, sube el contenido manteniendo la estructura de carpetas.

## Funciones incluidas

- Catálogo asíncrono de 16 productos desde `data/products.json` mediante Fetch API.
- Imágenes con `loading="lazy"`, filtros por categoría, estilo y rango de precio, búsqueda y ordenamiento.
- Fichas de producto, selección de talla, favoritos, carrito lateral con cantidades y subtotal en bolivianos.
- Perfil local, formulario de contacto con validación en tiempo real y confirmación de pedido.
- Persistencia local con `localStorage` y cola local de pedidos/consultas para uso sin conexión.
- Sección de actividad en vivo: click, dblclick, keyup, change y submit registrados en una bitácora.
- jQuery: selectores, `off().on()`, delegación de eventos, `slideDown()`, `slideUp()`, `slideToggle()`, `fadeIn()`, `fadeOut()`, `animate()`, `append()` y `text()`.
- Modal de confirmación con cuenta regresiva de 30 segundos y alerta de expiración; toast con permanencia de 3 segundos.
- PWA: manifest, iconos, Service Worker, Cache Storage, detector Online/Offline y fallback de navegación.
- Modo oscuro/claro, filtro de 3 capas en cascada, temática dinámica por categoría, apartado anti-XSS y lista de deseos táctil (v1.1).
- Responsive móvil/tablet/escritorio, áreas táctiles de 44 px, separación, textos truncados y ajuste landscape.

## Consideraciones técnicas importantes

- **No es una tienda conectada a un backend real:** las cuentas, pedidos y consultas se guardan en el navegador del dispositivo. No se procesa ningún pago ni se envía un pedido a un servidor. Para producción se necesita backend, base de datos, autenticación y pasarela de pago.
- **WhatsApp:** no se añadió un número ni enlace de contacto inventado. Se puede incorporar cuando la boutique proporcione el número oficial.
- **Hydration:** se implementa una simulación académica de hidratación sobre el DOM estático (`data-hidratado`), ya que el proyecto se entrega como sitio estático y no tiene servidor SSR.
- **Tree Shaking:** se aplicó limpieza de dependencias y de código no utilizado; no se configuró un bundler de producción. La técnica Tree Shaking real requiere un proceso de empaquetado como Vite/Rollup y se documenta como optimización conceptual en la guía del proyecto.
- jQuery y Google Fonts se cargan desde CDN cuando hay conexión. La tienda conserva la funcionalidad principal con JavaScript nativo si jQuery no está disponible, aunque los efectos visuales jQuery no se ejecutan sin descargar la librería.

## Recomendación de pruebas

Prueba en Chrome y Brave/Opera; móvil a 360 px; modo horizontal; modo avión después de abrir una vez; búsquedas con texto largo; cantidades; formularios vacíos; y entrada literal de texto como `<script>alert(1)</script>` en los campos para comprobar que se representa como texto y no se ejecuta.
