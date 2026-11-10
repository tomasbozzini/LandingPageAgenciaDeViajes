# Elisa Medici Viajes — landing page

Landing de una sola página para Elisa Medici Viajes, agencia de viajes de Tandil
(provincia de Buenos Aires). Publicada en **https://www.elisamediciviajes.tur.ar**.

Astro (SSG) + Tailwind v4. React se usa sólo para renderizar componentes en el
servidor: no hay islas hidratadas y la interacción es JavaScript plano. Sin backend,
sin base de datos.

```bash
npm install
npm run dev      # http://localhost:4330 (puerto fijo, ver astro.config.mjs)
npm run build    # genera dist/ (incluye sitemap-index.xml y sitemap-0.xml)
npm run preview
npm run check    # tipos y diagnósticos de Astro
```

> **Node:** el proyecto quedó en Astro 5.18 porque esta máquina tiene Node 20.17.
> Astro 7 pide Node ≥ 22.12. Por la misma razón `@astrojs/sitemap` está fijado en
> 3.7.0: desde 3.7.1 depende de `sitemap@9`, que pide Node ≥ 20.19.5. Si actualizás
> Node, `npx @astrojs/upgrade` sube las versiones.

---

## Sistema de diseño

**Concepto: cartografía editorial.** La marca gráfica es un mapa: rosa de los vientos,
curvas de nivel generadas en build (no un degradé de stock), coordenadas reales, datos
duros en vez de adjetivos. La jerarquía se arma con escala tipográfica, color plano y
*hairlines* — no hay una sola sombra difusa en todo el sitio.

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
saturación, no sumando tonos. Los tokens viven en el `@theme` de
`src/styles/global.css`.

| Nombre | Token | Hex | Uso |
| --- | --- | --- | --- |
| Navy Hondo | `noche` | `#0E1B2C` | Fondo más profundo: hero, paquetes, vitrina, pie |
| Navy Alto | `noche-alt` | `#16283E` | Superficie sobre el fondo: tarjetas de paquete |
| Navy Marca | `profundo` | `#1F344F` | El navy exacto del logo; hoy sin uso como fondo |
| Oro Hondo | `oro-hondo` | `#7A6234` | Rótulos y líneas sobre las secciones claras |
| Oro Marca | `oro` | `#A08554` | Trazo pleno |
| Oro Alto | `oro-alto` | `#C9AE78` | Rótulos, hairlines y emblema sobre navy |
| Oro Claro | `oro-claro` | `#E4D2AC` | Luz alta y realces |
| Marfil | `marfil` | `#F2EDE1` | **Fondo de las secciones claras** |
| Marfil Alto | `marfil-alto` | `#FAF7EF` | Superficie dentro de una sección clara |
| Marfil Hondo | `marfil-hondo` | `#D9CEB8` | Bordes y detalle |
| Hueso | `hielo` | `#EDE9E0` | Texto sobre navy |
| Crema | `crema` | `#F6ECD4` | Reservado al logotipo del hero |
| Tinta | `tinta` | `#131F2E` | Texto sobre marfil |
| CTA | `cta` | `#C8A45C` | **Sólo botones de WhatsApp**, sobre navy |
| CTA Hondo | `cta-hondo` | `#8A6B32` | Botón sobre las secciones claras |
| CTA Alto | `cta-alto` | `#DFC085` | Hover del botón |

La regla que sostiene todo: **el oro pleno como relleno sólido existe únicamente en
los botones de WhatsApp**. En el resto del sitio el oro aparece en hairlines de 1px,
texto chico y badges chicos. Si un bloque grande se llena de oro, el botón deja de
ser el único punto que pide un clic.

El recorrido de fondos es
`navy (hero, paquetes, vitrina) → marfil (cómo trabajamos, contacto) → navy (pie)`,
y cada cambio de tono va con una banda degradada en el medio, nunca un borde duro.

Todos los pares de texto/fondo del sistema pasan WCAG AA y los principales llegan a
AAA (cuerpo sobre fondo, 14.3:1). El texto atenuado de cuerpo usa `/70`; algunos
textos chicos bajan a `/55`–`/65`.

### Tipografía

- **Fraunces Variable** (`--font-display`) — títulos, cifras y rótulos. Con los ejes
  `SOFT 0` y `WONK 1` activados: es lo que le da el carácter raro a las descendentes.
- **Archivo Variable** (`--font-sans`) — cuerpo, UI, datos.

Las dos van self-hosteadas vía `@fontsource-variable`, así que no hay pedido a Google
Fonts en runtime.

### Reglas de layout

- Contenedor `.lienzo` (máx. 82rem, márgenes crecientes por breakpoint).
- Ritmo de fondos: ver la sección Paleta. Cada cambio de tono va con una banda
  degradada de 7 a 11 rem, nunca con un borde duro.
- Los rótulos de sección son serif itálica con número, **no** eyebrows en mayúsculas.
  No hay separadores de punto medio ni flechas `→` en botones.
- Las tarjetas de paquete no son cards: son entradas de catálogo, con la foto arriba
  y el texto colgando de una hairline, en una grilla de 2 columnas.

### Movimiento

Un solo momento de audacia (el hero) y movimiento con causa en el resto:

1. **Al cargar, una sola coreografía**: el emblema (globo, rosa de los vientos y
   avión) se dibuja trazo a trazo y después entra el lockup "Elisa Medici / Viajes".
2. **Paralaje del emblema por puntero** (no por scroll), sólo en dispositivos con mouse.
3. **Rotador de destinos** en la vitrina: cambia cada 5,2 s, se frena con la pestaña
   oculta y tiene botones para elegir a mano.
4. **Gestos ligados al scroll**: la regla del encabezado de cada sección se dibuja al
   entrar en vista, y los bloques marcados con `data-revelar` aparecen escalonados.

Todo respeta `prefers-reduced-motion: reduce` (las animaciones se anulan, no se
degradan a medias; el rotador no arranca solo).

---

## Editar el contenido

Todo vive en **`src/data/site.ts`**. No hace falta tocar componentes para:

- datos de la agencia (nombre, WhatsApp, teléfono visible, mail, ciudad, horarios,
  Instagram) → `agencia`
- mensajes prellenados de WhatsApp → `mensajes`
- destinos que rotan en la vitrina → `destinosHero`
- paquetes (precio, noches, incluye, itinerario día por día, foto) → `paquetes`
- cifras de servicio de la vitrina → `datosHero`
- cómo trabajamos → `diferenciales`

Los datos de contacto ya son los reales: WhatsApp `+54 9 11 5110-3146`, mail
`emediciviajes@gmail.com`, Instagram `@elisamediciviajes`, ciudad Tandil. No hay
dirección de calle ni teléfono fijo.

### Paquetes

`paquetes` está vacío a propósito: la agencia recién arranca. La grilla tiene seis
lugares; los paquetes con `destacado: true` los ocupan primero y los que sobran se
muestran como tarjetas "Próximamente", junto con un llamado a armar un viaje a medida
por WhatsApp. Cuando se carguen paquetes reales, actualizar también la bajada de la
sección en `src/pages/index.astro` ("Los primeros viajes, en preparación").

### Fotos

En `public/fotos/` hay imágenes de destinos, redimensionadas a 1400×1050 y
convertidas a WebP. **Son placeholders bajados de Wikipedia / Wikimedia Commons**:
el detalle de cada una, con el enlace a su ficha en Commons, está en
`public/fotos/CREDITOS.md`. La mayoría son CC BY-SA, así que antes de publicar hay
que reemplazarlas por fotos propias o acreditar a cada autor (y actualizar
`CREDITOS.md`).

Cambiar una foto es cambiar la ruta en `src/data/site.ts`:

```ts
{ escena: 'selva', foto: '/fotos/iguazu.webp', lugar: 'Cataratas del Iguazú', /* ... */ }
```

Si se saca el campo `foto`, queda la ilustración vectorial de
`src/components/Escenario.tsx`, que sigue existiendo como respaldo y como fondo
mientras la imagen carga.

---

## SEO

- `site` en `astro.config.mjs` es `https://www.elisamediciviajes.tur.ar` (el dominio
  sin `www` redirige al `www`).
- `@astrojs/sitemap` genera `sitemap-index.xml` y `sitemap-0.xml`;
  `public/robots.txt` apunta al índice.
- `Base.astro` arma el `<link rel="canonical">` y las etiquetas Open Graph a partir de
  `Astro.url` y `Astro.site`. La imagen para compartir es
  `public/og-elisa-medici-viajes.jpg` (1200×630, generada desde el logo).
- La home lleva datos estructurados JSON-LD `TravelAgency` (nombre, url, contacto,
  ciudad, Instagram) armados desde `agencia`.

---

## Estructura

```
src/
  data/site.ts               todo el contenido editable
  styles/global.css          tokens, capas base y la coreografía del hero
  layouts/Base.astro         head (SEO, Open Graph), fuentes, scripts globales
  pages/index.astro          la página (única), título, descripción y JSON-LD
  components/
    Navegacion.astro         nav sticky, sección activa, menú móvil
    Hero.astro               emblema + lockup de la marca + paralaje
    Encabezado.astro         encabezado de sección reutilizable
    Paquetes.astro           grilla de seis lugares, itinerario en <details>
    Vitrina.astro            rotador de destinos + cifras de servicio
    Diferenciales.astro      cómo trabajamos
    Contacto.astro           CTA de WhatsApp + datos + qué mandar para cotizar
    Pie.astro                pie
    Escenario.tsx            ilustraciones SVG por tipo de destino
```

Ningún componente se hidrata (no hay directivas `client:*`). Los scripts globales
están en `Base.astro` y los de cada componente, en su propio `<script>`.

---

## Accesibilidad

- Foco visible propio (contorno oro) en todo lo interactivo.
- Enlace de salto al contenido y `aria-current` en la sección activa del nav.
- Menú móvil con `aria-expanded`, cierre con `Esc` y retorno del foco al botón.
- El rotador de destinos marca el activo con `aria-current`, oculta los demás con
  `aria-hidden` y no arranca solo si el sistema pide menos movimiento.
- El itinerario de cada paquete usa `<details>` nativo.

---

## Deploy

Es un sitio estático: `npm run build` deja todo en `dist/`. Está desplegado en
**Vercel** (detecta Astro solo; build `npm run build`, output `dist`) con el dominio
https://www.elisamediciviajes.tur.ar.

Pendiente antes de dar por terminado: reemplazar las fotos de `public/fotos/` por
fotos propias.
