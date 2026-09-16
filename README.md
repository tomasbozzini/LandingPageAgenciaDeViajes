# Meridiano Sur — landing page

Landing de una sola página para una agencia de viajes. Astro (SSG) + islas de React
donde hace falta interacción real + Tailwind v4. Sin backend, sin base de datos.

```bash
npm install
npm run dev      # http://localhost:4330 (puerto fijo, ver astro.config.mjs)
npm run build    # genera dist/
npm run preview
npm run check    # tipos y diagnósticos de Astro
```

> **Node:** el proyecto quedó en Astro 5.18 porque esta máquina tiene Node 20.17.
> Astro 7 pide Node ≥ 22.12. Si actualizás Node, `npx @astrojs/upgrade` sube la versión.

---

## Sistema de diseño

**Concepto: cartografía editorial.** La marca gráfica es un mapa: curvas de nivel
generadas en build (no un degradé de stock), coordenadas reales, datos duros en vez de
adjetivos. La jerarquía se arma con escala tipográfica, color plano y *hairlines* —
no hay una sola sombra difusa en todo el sitio.

### Paleta

Derivada del logotipo de la marca (`referencias/elisa_medici_logo_hq.png`). Los tres
valores de anclaje se **muestrearon del archivo**, no se eligieron a ojo:

| Anclaje | Hex | De dónde sale |
| --- | --- | --- |
| Navy | `#1F344F` | Mediana de 40.585 píxeles del núcleo del lettering |
| Oro | `#A08554` | Percentil 25 del trazo de la brújula, descartando el antialias |
| Crema | `#FEFDFB` | Fondo plano del logo |

Cada rampa se construyó en OKLCH con pasos parejos de claridad, anclada en esos
valores. **La marca no tiene un cuarto color**: la jerarquía se arma con claridad y
saturación, no sumando tonos.

| Nombre | Hex | Uso |
| --- | --- | --- |
| Navy Hondo | `#0E1B2C` | Fondo más profundo: hero, paquetes, pie |
| Navy Alto | `#16283E` | Superficie sobre el fondo: experiencias, modales |
| Navy Marca | `#1F344F` | Sección intermedia: testimonios |
| Oro Hondo | `#7A6234` | Rótulos y líneas sobre las secciones claras |
| Oro Marca | `#A08554` | Trazo pleno |
| Oro Alto | `#C9AE78` | Rótulos, hairlines y curvas de nivel sobre navy |
| Oro Claro | `#E4D2AC` | Luz alta y realces |
| Marfil | `#F2EDE1` | **Fondo de las secciones claras** |
| Marfil Alto | `#FAF7EF` | Superficie dentro de una sección clara |
| Marfil Hondo | `#D9CEB8` | Bordes y detalle |
| Hueso | `#EDE9E0` | Texto sobre navy |
| Tinta | `#131F2E` | Texto sobre marfil |
| CTA | `#C8A45C` | **Sólo botones de WhatsApp**, sobre navy |
| CTA Hondo | `#8A6B32` | Botón sobre las secciones claras |
| CTA Alto | `#DFC085` | Hover del botón |

La regla que sostiene todo: **el oro pleno como relleno sólido existe únicamente en
los botones**. En el resto del sitio el oro aparece en hairlines de 1px, texto chico
y badges de 24–44px. Si un bloque grande se llena de oro, el botón deja de ser el
único punto que pide un clic.

El recorrido de fondos es
`navy → navy → marfil → navy marca → navy alto → marfil → navy`, siempre con una
banda degradada en el medio, nunca un borde duro.

Todos los pares de texto/fondo del sistema pasan WCAG AA y los principales llegan a
AAA (cuerpo sobre fondo, 14.3:1). Los textos atenuados no bajan de `/70`.

### Tipografía

- **Fraunces Variable** (`--font-display`) — títulos, cifras y rótulos. Con los ejes
  `SOFT 0` y `WONK 1` activados: es lo que le da el carácter raro a las descendentes.
- **Archivo Variable** (`--font-sans`) — cuerpo, UI, datos.

Las dos van self-hosteadas vía `@fontsource-variable`, así que no hay pedido a Google
Fonts en runtime.

### Reglas de layout

- Contenedor `.lienzo` (máx. 82rem, márgenes crecientes por breakpoint).
- Ritmo de fondos: ver la rampa de la sección Paleta. Cada cambio de tono va con una
  banda degradada de 7 a 11 rem, nunca con un borde duro.
- Los rótulos de sección son serif itálica con número, **no** eyebrows en mayúsculas.
  No hay separadores de punto medio ni flechas `→` en botones.
- Las tarjetas de paquete no son cards: son entradas de catálogo, con la foto arriba
  y el texto colgando de una hairline. Las destacadas ocupan el doble de ancho.

### Movimiento

Un solo momento de audacia (el hero) y movimiento con causa en el resto:

1. **Al cargar, una sola coreografía**: se dibujan las curvas de nivel, las líneas del
   titular entran con `clip-path` escalonado, el panel se revela de derecha a izquierda
   y la tira de datos cierra la secuencia.
2. **Paralaje del hero por puntero** (no por scroll), sólo en dispositivos con mouse.
3. **Filtro de paquetes con FLIP**: los que se van se desvanecen, los que quedan se
   trasladan a su posición nueva. Nadie salta. La grilla usa `grid-auto-flow: dense`
   para que las tarjetas anchas no dejen huecos al filtrar.
4. **Modal que crece desde la tarjeta** que lo disparó.
5. **Único gesto ligado al scroll**: la regla del encabezado de cada sección se dibuja
   al entrar en vista.

Todo respeta `prefers-reduced-motion: reduce` (las animaciones se anulan, no se
degradan a medias).

---

## Editar el contenido

Todo vive en **`src/data/site.ts`**. No hace falta tocar componentes para:

- datos de la agencia, WhatsApp, mail, dirección, horarios → `agencia`
- mensajes prellenados de WhatsApp → `mensajes`
- los 27 paquetes (precio, noches, incluye, itinerario día por día, foto) → `paquetes`
- las 9 regiones del filtro → `regiones`
- diferenciales → `diferenciales`
- testimonios → `testimonios`
- notas de la galería → `experiencias`
- datos duros del hero → `datosHero`

Los campos marcados con `// <-- REEMPLAZAR` son de ejemplo y hay que cambiarlos antes
de publicar: **número de WhatsApp, teléfono, mail, dirección, legajo EVT e Instagram**.

### Fotos

En `public/fotos/` hay 33 imágenes de los destinos, redimensionadas a 1400×1050 y
convertidas a WebP. **Son placeholders bajados de Wikipedia / Wikimedia Commons**:
el detalle de cada una, con el enlace a su ficha en Commons, está en
`public/fotos/CREDITOS.md`. La mayoría son CC BY-SA, así que antes de publicar hay
que reemplazarlas por fotos propias del cliente o acreditar a cada autor.

Cambiar una foto es cambiar la ruta en `src/data/site.ts`:

```ts
{ id: 'iguazu', /* ... */, foto: '/fotos/iguazu.webp' }
```

Si se saca el campo `foto`, la tarjeta cae en la ilustración vectorial de
`src/components/Escenario.tsx`, que sigue existiendo como respaldo y como color de
fondo mientras la imagen carga.

---

## Estructura

```
src/
  data/site.ts               todo el contenido editable
  styles/global.css          tokens, capas base y la coreografía del hero
  layouts/Base.astro         head, fuentes, JSON-LD, scripts globales
  pages/index.astro          la página (única)
  components/
    Navegacion.astro         nav sticky, sección activa, menú móvil
    Hero.astro               curvas de nivel + coreografía + paralaje
    Encabezado.astro         encabezado de sección reutilizable
    Escenario.tsx            ilustraciones SVG por destino
    PaquetesExplorador.tsx   [isla] filtro con FLIP + modal de detalle
    Diferenciales.astro      cómo trabajamos + credenciales
    Testimonios.tsx          [isla] carrusel con teclado y arrastre
    Galeria.tsx              [isla] carril horizontal + caja de luz
    Contacto.astro           CTA de WhatsApp + qué mandar
    Pie.astro                pie
```

Las tres islas se hidratan con `client:visible`: el HTML completo (los 27 paquetes,
los testimonios, las notas) se sirve estático y funciona sin JavaScript salvo por las
interacciones.

---

## Accesibilidad

- Foco visible propio (anillo ámbar) en todo lo interactivo.
- Los modales usan `<dialog>` nativo: trampa de foco y `Esc` gratis, con retorno del
  foco a la tarjeta que lo abrió.
- El carrusel se maneja con flechas del teclado, `Home`/`End` y botones; las diapositivas
  inactivas van con `inert`.
- Enlace de salto al contenido, `aria-current` en la sección activa, `aria-live` con la
  cantidad de paquetes filtrados.
- Sin autoplay en ningún lado.

---

## Deploy

Es un sitio estático: `npm run build` deja todo en `dist/`.

- **Vercel** — importar el repo; detecta Astro solo. Build `npm run build`, output `dist`.
- **Netlify** — build `npm run build`, publish `dist`.

Antes de publicar: reemplazar el número de WhatsApp y el resto de los campos marcados,
y cambiar `site` en `astro.config.mjs` por el dominio real.
