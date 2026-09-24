# Revisión del tema «Despacho nocturno» (diff `bca91cc..HEAD`)

Revisor: `claude-opus-5-5` / `medium`. Scripts de verificación fuera del repo:
`D:\tmp\pw-curso\revision-extra.mjs` (Supabase simulado con la pizarra visible) y `rev-778.mjs`.

## Arreglado

- **`ImagenAmpliable.jsx`: foco del diálogo.** Antes: al abrir, el foco se quedaba en «Ampliar», detrás
  de la capa; con Tab salía a «Anterior» (Enter cambiaba de slide con la imagen abierta), y al cerrar
  con «Cerrar» se iba a `BODY`. Ahora: el foco entra a «Cerrar» (`autoFocus`), Tab no sale del diálogo
  y, al cerrar por cualquier vía, vuelve a «Ampliar». Prueba (`revision-extra.mjs`, v1-6-5):
  `al abrir, foco en «Cerrar | dentro del diálogo: true»; tras Escape, foco en «Ampliar: …»` y
  `Tab … «Cerrar | dentro del diálogo: true»; tras Enter en Cerrar, foco en «Ampliar: …»`.

## Listado, sin arreglar (necesita decisión)

1. **La pizarra se ve con los colores del básico** sobre el fondo oscuro: tarjeta blanca con barra
   azul `from-blue-600` y botón «Copiar contenido» azul. Funciona bien como admin (edita, el texto
   llega) y como alumno (lo ve), en escritorio y móvil: capturas `D:\tmp\pw-curso\revision\pizarra-*.png`.
   No está en la lista de «quedan claros a propósito». Arreglarlo es tocar `Whiteboard.jsx` (básico) o
   hacerle variante en `avanzado/tipos/`: decisión de José Luis.
2. **`rctf-formula.png` pesa 7,2 MB** (2080×2048, RGBA). Lo usan `v1-7-2` y el básico
   (`MODULO_2.js:46`). Reducirlo cambia un archivo del básico: decisión de José Luis.

## Comprobado sin defecto

- **Pizarra y `sessionState`:** `Whiteboard` no lo usa; lee `session_state` de Supabase por su cuenta
  (`Whiteboard.jsx:54-67`). Con la pizarra visible, el alumno llega a `wb-0` y ve el contenido.
- **`dangerouslySetInnerHTML`:** `bullets1` y `bullets2` solo existen en `data/avanzado/VIRTUAL_1.js` y
  `data/course-content.jsx`, que llegan por `COURSE_MODULES` (estático). Ninguna ruta desde Supabase.
- **Movimiento reducido:** en v1-2-2 las cifras dicen `200K` y `1M` de entrada y el remate tiene
  opacidad 1 sin transformación. En los 44 slides, lo único no opaco es el `input` de archivo
  invisible de `GallerySubmit` en v1-7-8 (a propósito).
- **`AppLayout` en el básico:** los 39 valores del mapa `M` del básico aparecen tal cual en el
  original, salvo 3 que venían dentro de un template y cambiaron de orden (`lateralColor`,
  `notasColor`, `panelDerechoColor`): mismas clases, otro orden, sin efecto en Tailwind. El resto
  del diff queda detrás de `ES_AVANZADO`.
- **Admin en pantalla baja:** a 1366×700 y 1366×600 la lista de módulos (93–285 px) y el guion
  (285–595 / 285–495 px) no se pisan; el cuerpo del guion baja a 171 px a 600 de alto y tiene su scroll.

## Cierre

`npx vite build` y `VITE_COURSE=avanzado npx vite build`: `✓ built`. `npx eslint .`: `✖ 52 problems`.
`rotulos.test.js`: `# fail 0`. `recorrido-avanzado.mjs`: `Sin problemas.`
