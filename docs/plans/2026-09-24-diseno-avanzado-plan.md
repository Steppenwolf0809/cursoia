# Tema «Despacho nocturno» para el curso avanzado: plan de implementación

> **Para quien ejecute:** usa `superpowers:executing-plans` (o `superpowers:subagent-driven-development`)
> y avanza tarea por tarea. Cada paso tiene casilla `- [ ]`. Ejecutor previsto: `sonnet` / `medium`.
> Revisión después, en otra sesión: `claude-opus-5-5` / `medium`.

**Objetivo:** que la Virtual 1 (44 slides) se vea con la dirección B, «Despacho nocturno», y tenga
animaciones al entrar a cada slide, solo cuando `VITE_COURSE=avanzado`. El básico queda igual.

**Arquitectura:** la clase `tema-avanzado` va en `<html>` y define los tokens (variables CSS). Tailwind
los lee con colores `av-*` y fuentes `font-av-*`. El marco (`AppLayout`) elige sus clases con
`ES_AVANZADO`. El cuerpo de cada slide del avanzado lo pinta `components/avanzado/SlideAvanzado.jsx`,
con un componente por tipo en `components/avanzado/tipos/`. Los componentes del básico no se tocan.

**Tecnología:** React 18, Vite 6, Tailwind 3.4, `framer-motion` ^11.15 (ya instalado),
`tailwindcss-animate` (ya instalado). Sin dependencias nuevas en el proyecto. Playwright solo para
verificar, instalado fuera del repo en `D:\tmp\pw-curso`.

**Fuentes que mandan:** `docs/prompts/2026-09-24-diseno-avanzado.md` (alcance y cómo se sabe que
terminó) y `docs/prompts/2026-09-24-diseno-avanzado-plan.md` (dirección B y animaciones). Referencia
visual: `docs/revision/muestras-diseno/b-nocturno.html` y sus capturas `b-*-escritorio.png` y `b-*-movil.png`.

---

## Pregunta para José Luis (antes de la tarea 19)

**Capturas del Anonimizador en móvil** (`v1-6-5`, `v1-6-6`, `v1-6-7`; imágenes de 960×470 que a
340 px no se leen). Opciones:

1. **Ampliar al tocar (recomendada, es la que trae este plan).** Debajo de la imagen dice «Ampliar».
   Al tocar se abre a pantalla completa, a 960 px, con desplazamiento y zoom de pellizco. Sirve igual
   en escritorio. No cambia las imágenes.
2. Recortar: hacer una versión recortada de cada captura solo para móvil. Hay que elegir qué parte
   mostrar en cada una y agregar 3 imágenes nuevas.
3. Mostrarlas a ancho real con desplazamiento lateral dentro del slide, sin ampliar.

Si José Luis no contesta antes de llegar a la tarea 19, se hace la opción 1.

---

## Decisiones de este plan (el ejecutor no las reabre)

- **Clase raíz:** `main.jsx` agrega `tema-avanzado` a `document.documentElement` e inyecta el
  `<link>` de Google Fonts, las dos cosas solo si `ES_AVANZADO`. Como Vite reemplaza
  `import.meta.env.VITE_COURSE` al compilar, en el build del básico ese bloque se elimina.
- **Tokens:** variables `--av-*` en `client/src/tema-avanzado.css`, todas bajo `.tema-avanzado`.
  Los nombres son por función, no por color (`--av-acento`, no `--av-ambar`): el tema A del sábado
  será otro bloque de valores, no otros componentes.
- **Tailwind:** colores nuevos `av-*` y fuentes `av-titulo`, `av-texto`, `av-mono`. No se tocan
  `primary`, `secondary`, `accent` ni `sans`, que usa el básico. No se redefine `mono`: el básico la
  usa en `PromptTemplate`.
- **Qué lleva variante y qué no:** los componentes del básico tienen los colores escritos a mano
  (`bg-white`, `text-slate-800`), así que con tokens solos no alcanza. Los 18 tipos que usa la
  Virtual 1 llevan su variante en `components/avanzado/tipos/`. El marco (`AppLayout`) y
  `WelcomeScreen` se arreglan con clases `av-*` según `ES_AVANZADO`. Se quedan como están, como
  tarjetas claras sobre el fondo oscuro: `LivePoll`, `GallerySubmit`, `GalleryDisplay`,
  `AdminLogin`, `AdminPanel`, `FeedbackPanel` y el cajón de notas. El modo admin no se toca, salvo
  el guion del profesor de la tarea 25, que José Luis pidió aparte.
- **Título único:** el H1 del slide es `contentData.heading`, o si no hay, `contentData.Heading1`, o
  si no hay, `slide.title` (así lo hace la muestra: «Mata v. Avianca: seis sentencias que nunca
  existieron»). La variante del tipo no repite ese texto. `Heading2` sí se muestra, en su caja.
- **Rótulo:** encima del H1 va «Bloque N · ii / 44». N sale de `/^v1-(\d+)-/` sobre el id; ya se
  comprobó que vale para los 44 ids, incluidos `v1-3-5b` y los 4 reutilizados del básico (`v1-1-2`,
  `v1-3-1`, `v1-3-2`, `v1-7-2`). Hay una prueba con la lista completa en la tarea 1. Si el id no
  calza (la pizarra, `wb-0`), el rótulo muestra el título del módulo. La portada usa el rótulo de la
  muestra: «Virtual 1 · 01 / 44».
- **Tablas `comparison`:** en escritorio, filas en tarjetas con encabezado en mono. En móvil
  (`< md`), tarjetas: la primera celda es el título y cada una de las demás lleva como etiqueta el
  encabezado de su columna. La última columna va en `av-acento-2` solo en las tablas de 3 columnas
  (ahí es el resultado: «Consecuencia», «Dónde puede ir»…). En las de 4 no se resalta ninguna.
- **Animación:** `framer-motion` solo dentro del slide (`components/avanzado/Movimiento.jsx`).
  `AnimatedSlide.jsx` no se toca y no se agrega `AnimatePresence`. Entrada escalonada de 90 ms
  (`staggerChildren: 0.09`). Todo lo que entra es un `Item` hijo, directo o por contexto, del
  `Escalonado` que envuelve el slide. **Nunca un `Item` dentro de otro `Item`**, porque el de adentro
  entraría a la vez que el de afuera. El remate es un `Remate` puesto último en el DOM, y por eso
  entra al final. **No se pone `transition.delay` en las variantes de los hijos**, porque pisa el
  escalonado. El slide vuelve a animar al cambiar porque `AnimatedSlide` lo remonta con
  `key={slideKey}`.
- **Movimiento reducido:** `useReducedMotion()` pone `initial={false}` en el `Escalonado`, así que
  los hijos aparecen ya en su estado final. `Cifra` muestra el valor final. El CSS apaga la órbita,
  el latido y el `animate-in` de `AnimatedSlide`, solo bajo `.tema-avanzado`.
- **Cifras que cuentan:** solo en `stat-comparison` (`v1-2-2`: «200K» y «1M»). Se cuenta la parte
  numérica y se conserva el sufijo. Al terminar se pone el texto original exacto.
- **Enlaces de descarga** (`resources-download`): `<a href target="_blank">` directo, sin la espera
  simulada de 1,5 s del básico.
- **`next-steps`:** las tres tarjetas se muestran abiertas, con su consejo a la vista, sin clics.
- **`concept`** (`v1-7-2`) usa el mismo componente que `feature-highlight` (texto, imagen ampliable
  y lista numerada).

### Trampas del lint (la vara es `npx eslint .` ≤ 52; hoy da exactamente 52)

- El lint marca `motion` como no usado si solo aparece en JSX (`<motion.div>`): hoy hay 17 errores
  así. En código nuevo, **no importar `motion` en los tipos**. Solo `Movimiento.jsx` lo importa, y
  lo usa fuera de JSX: `const MotionDiv = motion.div;`.
- `react-hooks` 7 marca `setState` síncrono dentro de un efecto. `Cifra` solo llama `setTexto`
  desde callbacks de `animate`, y el caso de movimiento reducido se resuelve al pintar, sin efecto.
- `react-refresh/only-export-components`: los `.jsx` nuevos exportan solo componentes. Las funciones
  y constantes van en `.js` (`rotulos.js`, `estilos.js`).

---

## Mapa de archivos

Crear:

| Archivo | Responsabilidad |
|---|---|
| `client/src/tema-avanzado.css` | Tokens `--av-*`, fondo `av-lienzo`, órbita, latido, enlaces en HTML, movimiento reducido |
| `client/src/components/avanzado/rotulos.js` | `bloqueDe`, `tituloDe`, `partir`, `partirCifra` (funciones puras) |
| `client/src/components/avanzado/rotulos.test.js` | Prueba con `node --test` |
| `client/src/components/avanzado/estilos.js` | Cadenas de clases compartidas (`PANEL`, `LEAD`, `MONO`, `CAJA`, `REMATE`, `H2`) |
| `client/src/components/avanzado/Movimiento.jsx` | `Escalonado`, `Item`, `Remate`, `Cifra` |
| `client/src/components/avanzado/Piezas.jsx` | `Hechos` (lista numerada 01, 02…) y `Consejo` |
| `client/src/components/avanzado/ImagenAmpliable.jsx` | Imagen con ampliación a pantalla completa |
| `client/src/components/avanzado/Encabezado.jsx` | Rótulo «Bloque N · ii / 44» y H1 |
| `client/src/components/avanzado/SlideAvanzado.jsx` | Escoge el tipo; si no lo tiene, cae en `SlideRenderer` |
| `client/src/components/avanzado/tipos/*.jsx` | Una variante por tipo (16 archivos) |
| `client/src/components/avanzado/GuionProfesor.jsx` | Guion del profesor en la barra lateral (solo admin) |
| `client/src/data/avanzado/guion-virtual-1.js` | Texto del guion por id de slide (vacío en este plan) |
| `docs/revision/recorrido-avanzado.mjs` | Recorrido Playwright de los 44 slides con capturas y chequeos |
| `docs/revision/comparar-basico.mjs` | Capturas del básico para comparar con `docs/revision/capturas/basico-*.png` |

Modificar:

| Archivo | Cambio |
|---|---|
| `client/src/data/cursos.js` | Exportar `ES_AVANZADO` |
| `client/tailwind.config.js` | Colores `av-*` y fuentes `av-*` |
| `client/src/main.jsx` | Importar el CSS del tema y, si `ES_AVANZADO`, clase raíz y fuentes |
| `client/src/components/layout/AppLayout.jsx` | Clases del marco según tema; `SlideAvanzado` en el avanzado |
| `client/src/components/WelcomeScreen.jsx` | Pantalla de bienvenida propia del avanzado |

---

## Comprobaciones que se repiten

Se definen una vez aquí. Cada tarea dice cuál usar y qué mirar.

**Preparación única (antes de la tarea 7), Git Bash:**

```bash
mkdir -p /d/tmp/pw-curso && cd /d/tmp/pw-curso && npm init -y >/dev/null && npm install playwright@1.63.0
cd /d/tmp/pw-curso && npx playwright install chromium
```

**B — build y lint** (desde `D:\curso_IA\client`):

```bash
cd /d/curso_IA/client && npx vite build 2>&1 | tail -2 && VITE_COURSE=avanzado npx vite build 2>&1 | tail -2 && npx eslint . 2>&1 | tail -1
```

Esperado: los dos builds terminan con `✓ built in …`. El lint termina con `✖ 52 problems` (o
menos). Si sube, el problema está en un archivo nuevo: corregirlo antes de seguir. El segundo build
deja `dist/` con el avanzado, que es lo que sirve la vista previa.

**V — vista previa** (una vez; queda corriendo en segundo plano, con `run_in_background`):

```bash
cd /d/curso_IA/client && npx vite preview --port 4173 --strictPort
```

Sirve lo que haya en `dist/`: después de cada B queda el avanzado, no hace falta reiniciarla.

**R — recorrido** (con V corriendo y después de B). `IDS` es la lista de ids de la tarea, separados
por coma, sin espacios:

```bash
cp /d/curso_IA/docs/revision/recorrido-avanzado.mjs /d/tmp/pw-curso/ && node /d/tmp/pw-curso/recorrido-avanzado.mjs http://localhost:4173 D:/curso_IA/docs/revision/capturas-avanzado IDS
```

Esperado: `Sin problemas.` y, por cada id, `NN-<id>-escritorio.png` y `NN-<id>-movil.png` (más
`-fin` si el slide tiene desplazamiento vertical) en `docs/revision/capturas-avanzado/`. Mirar esas
imágenes con la herramienta Read y confirmar lo que pide la tarea.

---

### Tarea 1: `ES_AVANZADO` y funciones de rótulo (con prueba)

**Archivos:**
- Modificar: `client/src/data/cursos.js`
- Crear: `client/src/components/avanzado/rotulos.js`
- Prueba: `client/src/components/avanzado/rotulos.test.js`

- [ ] **Paso 1: escribir la prueba que falla**

`client/src/components/avanzado/rotulos.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { bloqueDe, tituloDe, partir, partirCifra } from './rotulos.js';

// Los 44 ids de la Virtual 1, en orden (client/src/data/avanzado/VIRTUAL_1.js).
const IDS = [
    'v1-1-1', 'v1-1-2', 'v1-1-3', 'v1-1-4', 'v1-1-5', 'v1-2-1', 'v1-2-2', 'v1-2-3', 'v1-2-4', 'v1-2-5',
    'v1-3-1', 'v1-3-2', 'v1-3-3', 'v1-3-4', 'v1-3-5', 'v1-3-5b', 'v1-3-6', 'v1-3-7', 'v1-3-8', 'v1-3-9',
    'v1-3-10', 'v1-4-1', 'v1-4-2', 'v1-4-3', 'v1-5-1', 'v1-6-1', 'v1-6-2', 'v1-6-3', 'v1-6-4', 'v1-6-5',
    'v1-6-6', 'v1-6-7', 'v1-7-1', 'v1-7-2', 'v1-7-3', 'v1-7-4', 'v1-7-5', 'v1-7-6', 'v1-7-7', 'v1-7-8',
    'v1-7-9', 'v1-8-1', 'v1-8-2', 'v1-8-3',
];

test('los 44 ids dan un bloque entre 1 y 8', () => {
    assert.equal(IDS.length, 44);
    for (const id of IDS) {
        const bloque = bloqueDe(id);
        assert.ok(bloque >= 1 && bloque <= 8, `${id} → ${bloque}`);
    }
    assert.equal(bloqueDe('v1-3-5b'), 3);
    assert.equal(bloqueDe('v1-3-10'), 3);
});

test('un id que no es de la Virtual 1 no tiene bloque', () => {
    assert.equal(bloqueDe('wb-0'), null);
});

test('el título es el heading, luego Heading1, luego title', () => {
    assert.equal(tituloDe({ title: 'Mata v. Avianca', contentData: { Heading1: 'Mata v. Avianca: seis sentencias' } }), 'Mata v. Avianca: seis sentencias');
    assert.equal(tituloDe({ title: 'Ventana', contentData: { heading: 'La ventana creció' } }), 'La ventana creció');
    assert.equal(tituloDe({ title: 'Qué delegar y qué no', contentData: { leftTitle: 'Delega' } }), 'Qué delegar y qué no');
    assert.equal(tituloDe({ title: 'Encuesta' }), 'Encuesta');
});

test('partir separa en el primer «: »', () => {
    assert.deepEqual(partir('Virtual 1: Fundamentos exprés y confidencialidad'), ['Virtual 1', 'Fundamentos exprés y confidencialidad']);
    assert.deepEqual(partir('Delegación: la IA hace borradores: y más'), ['Delegación', 'la IA hace borradores: y más']);
    assert.deepEqual(partir('Pizarra'), ['Pizarra', '']);
});

test('partirCifra separa número y sufijo, y rechaza texto', () => {
    assert.deepEqual(partirCifra('200K'), { numero: 200, decimales: 0, sufijo: 'K' });
    assert.deepEqual(partirCifra('1M'), { numero: 1, decimales: 0, sufijo: 'M' });
    assert.deepEqual(partirCifra('2,5 %'), { numero: 2.5, decimales: 1, sufijo: ' %' });
    assert.equal(partirCifra('Palabras'), null);
    assert.equal(partirCifra('GPT-6'), null);
});
```

- [ ] **Paso 2: correrla y ver que falla**

Correr: `cd /d/curso_IA/client && node --test src/components/avanzado/rotulos.test.js`
Esperado: FALLA con `Cannot find module` (`rotulos.js` todavía no existe).

- [ ] **Paso 3: escribir `rotulos.js`**

`client/src/components/avanzado/rotulos.js`:

```js
// Número de bloque desde el id de la Virtual 1: «v1-3-5b» → 3. null si el id no sigue el patrón (la pizarra).
export function bloqueDe(id) {
    const m = /^v1-(\d+)-/.exec(id);
    return m ? Number(m[1]) : null;
}

// El H1 del slide: el heading del contenido, que es más descriptivo que el título corto.
export function tituloDe(slide) {
    const datos = slide.contentData || {};
    return datos.heading || datos.Heading1 || slide.title;
}

// «Virtual 1: Fundamentos…» → ['Virtual 1', 'Fundamentos…']. Sin «: », el texto entero y ''.
export function partir(texto) {
    const i = texto.indexOf(': ');
    return i === -1 ? [texto, ''] : [texto.slice(0, i), texto.slice(i + 2)];
}

// «200K» → { numero: 200, decimales: 0, sufijo: 'K' }. null si el dato no empieza con un número.
export function partirCifra(valor) {
    const m = /^(\d+(?:[.,]\d+)?)(\D*)$/.exec(String(valor).trim());
    if (!m) return null;
    const [entero, fraccion = ''] = m[1].split(/[.,]/);
    return { numero: Number(`${entero}.${fraccion || 0}`), decimales: fraccion.length, sufijo: m[2] };
}
```

- [ ] **Paso 4: correr la prueba y ver que pasa**

Correr: `cd /d/curso_IA/client && node --test src/components/avanzado/rotulos.test.js`
Esperado: `# pass 5`, `# fail 0`.

- [ ] **Paso 5: exportar `ES_AVANZADO`**

`client/src/data/cursos.js` queda así:

```js
import { COURSE_MODULES as BASICO } from './course-content';
import { COURSE_MODULES as AVANZADO } from './avanzado/index.js';

// VITE_COURSE=avanzado muestra el curso avanzado; sin la variable (o con otro valor), el básico.
export const ES_AVANZADO = import.meta.env.VITE_COURSE === 'avanzado';
export const COURSE_MODULES = ES_AVANZADO ? AVANZADO : BASICO;
```

- [ ] **Paso 6: comprobación B.** Esperado: dos builds y `✖ 52 problems`.

- [ ] **Paso 7: commit** (incluye este plan y las muestras, que están sin seguimiento)

```bash
cd /d/curso_IA && git add client/src/data/cursos.js client/src/components/avanzado/rotulos.js client/src/components/avanzado/rotulos.test.js docs/plans/2026-09-24-diseno-avanzado-plan.md docs/revision/muestras-diseno && git commit -m "feat(avanzado): ES_AVANZADO y rótulos del tema nocturno"
```

---

### Tarea 2: tokens, clase raíz y fuentes

**Archivos:**
- Crear: `client/src/tema-avanzado.css`
- Modificar: `client/tailwind.config.js`, `client/src/main.jsx`

- [ ] **Paso 1: crear `client/src/tema-avanzado.css`**

```css
/* Tema del curso avanzado, dirección B «Despacho nocturno».
   Todo cuelga de .tema-avanzado, que main.jsx pone en <html> solo con VITE_COURSE=avanzado.
   Los colores van como tripletes RGB para que Tailwind pueda aplicarles opacidad (bg-av-acento/15).
   Un segundo tema (la dirección A) sería otro bloque con los mismos nombres y otros valores. */
.tema-avanzado {
  --av-fondo: 15 18 22;          /* #0F1216 */
  --av-fondo-2: 22 27 33;        /* #161B21 */
  --av-panel: 28 34 42;          /* #1C222A */
  --av-linea: 42 50 60;          /* #2A323C */
  --av-texto: 232 230 225;       /* #E8E6E1 */
  --av-texto-2: 154 163 173;     /* #9AA3AD */
  --av-acento: 242 184 75;       /* #F2B84B */
  --av-acento-2: 247 211 138;    /* #F7D38A */
  --av-sobre-acento: 26 20 6;    /* #1A1406, texto sobre el acento */
  --av-alerta: 240 123 107;      /* #F07B6B */
  --av-fuente-titulo: 'Bricolage Grotesque', sans-serif;
  --av-fuente-texto: 'IBM Plex Sans', sans-serif;
  --av-fuente-mono: 'IBM Plex Mono', monospace;
  color-scheme: dark;
}

.tema-avanzado body {
  background: rgb(var(--av-fondo));
  color: rgb(var(--av-texto));
  font-family: var(--av-fuente-texto);
}

/* Fondo de la muestra: halo del acento arriba a la derecha y cuadrícula de 48 px. */
.tema-avanzado .av-lienzo {
  background:
    radial-gradient(1200px 600px at 85% -10%, rgb(var(--av-acento) / 0.10), transparent 60%),
    linear-gradient(rgb(255 255 255 / 0.025) 1px, transparent 1px) 0 0 / 48px 48px,
    linear-gradient(90deg, rgb(255 255 255 / 0.025) 1px, transparent 1px) 0 0 / 48px 48px,
    rgb(var(--av-fondo));
}

/* Texto con HTML de los datos (negritas y enlaces en las viñetas de narrative). */
.tema-avanzado .av-html b,
.tema-avanzado .av-html strong { font-weight: 600; color: rgb(var(--av-texto)); }
.tema-avanzado .av-html a { color: rgb(var(--av-acento-2)); text-decoration: underline; text-underline-offset: 3px; }

/* Portada: anillos que giran muy despacio y puntos que laten. */
@keyframes av-girar { to { transform: rotate(360deg); } }
@keyframes av-latir {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.8); }
}
.tema-avanzado .av-orbita-giro { animation: av-girar 120s linear infinite; }
.tema-avanzado .av-orbita-giro-inverso { animation: av-girar 90s linear infinite reverse; }
.tema-avanzado .av-latido { animation: av-latir 3.2s ease-in-out infinite; }

/* Con movimiento reducido no se anima nada: tampoco el fundido de AnimatedSlide (animate-in). */
@media (prefers-reduced-motion: reduce) {
  .tema-avanzado .av-orbita-giro,
  .tema-avanzado .av-orbita-giro-inverso,
  .tema-avanzado .av-latido,
  .tema-avanzado .animate-in {
    animation: none !important;
  }
}
```

- [ ] **Paso 2: tokens en Tailwind.** En `client/tailwind.config.js`, dentro de `theme.extend.colors`,
después de `accent: {…},`, agregar:

```js
        // Tema del curso avanzado: leen las variables de .tema-avanzado (client/src/tema-avanzado.css).
        av: {
          fondo: 'rgb(var(--av-fondo) / <alpha-value>)',
          'fondo-2': 'rgb(var(--av-fondo-2) / <alpha-value>)',
          panel: 'rgb(var(--av-panel) / <alpha-value>)',
          linea: 'rgb(var(--av-linea) / <alpha-value>)',
          texto: 'rgb(var(--av-texto) / <alpha-value>)',
          'texto-2': 'rgb(var(--av-texto-2) / <alpha-value>)',
          acento: 'rgb(var(--av-acento) / <alpha-value>)',
          'acento-2': 'rgb(var(--av-acento-2) / <alpha-value>)',
          'sobre-acento': 'rgb(var(--av-sobre-acento) / <alpha-value>)',
          alerta: 'rgb(var(--av-alerta) / <alpha-value>)',
        },
```

Y `fontFamily` queda así (se conserva `sans`):

```js
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'av-titulo': 'var(--av-fuente-titulo)',
        'av-texto': 'var(--av-fuente-texto)',
        'av-mono': 'var(--av-fuente-mono)',
      }
```

- [ ] **Paso 3: clase raíz y fuentes.** `client/src/main.jsx` queda así:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './tema-avanzado.css'
import App from './App.jsx'
import { ES_AVANZADO } from './data/cursos'

// Tema del curso avanzado: clase raíz y fuentes de Google, solo con VITE_COURSE=avanzado.
if (ES_AVANZADO) {
  document.documentElement.classList.add('tema-avanzado')
  const fuentes = document.createElement('link')
  fuentes.rel = 'stylesheet'
  fuentes.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap'
  document.head.appendChild(fuentes)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Paso 4: comprobación B.**

- [ ] **Paso 5: el básico no carga las fuentes nuevas**

```bash
cd /d/curso_IA/client && npx vite build >/dev/null && grep -l "Bricolage+Grotesque" dist/assets/*.js ; echo "básico: $?" ; VITE_COURSE=avanzado npx vite build >/dev/null && grep -l "Bricolage+Grotesque" dist/assets/*.js ; echo "avanzado: $?"
```

Esperado: `básico: 1` (ningún archivo) y en el avanzado un `dist/assets/index-*.js` seguido de
`avanzado: 0`.

- [ ] **Paso 6: commit**

```bash
cd /d/curso_IA && git add client/src/tema-avanzado.css client/tailwind.config.js client/src/main.jsx && git commit -m "feat(avanzado): tokens del tema nocturno, clase raíz y fuentes"
```

---

### Tarea 3: estilos compartidos, movimiento y piezas

**Archivos:**
- Crear: `client/src/components/avanzado/estilos.js`, `client/src/components/avanzado/Movimiento.jsx`,
  `client/src/components/avanzado/Piezas.jsx`

- [ ] **Paso 1: `estilos.js`**

```js
// Clases que repiten los tipos del avanzado. Solo tokens av-*: cambiar de tema no toca esto.
export const PANEL = 'rounded-xl border border-av-linea bg-av-panel';
export const MONO = 'font-av-mono text-[11px] uppercase tracking-[0.12em]';
export const LEAD = 'max-w-[62ch] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-av-texto-2';
export const CAJA = 'rounded-2xl border border-av-acento/35 bg-gradient-to-br from-av-acento/15 to-av-acento/[0.03] p-6';
export const REMATE = 'rounded-xl bg-av-acento px-5 py-4 font-av-titulo text-[clamp(20px,2vw,26px)] font-extrabold leading-tight text-av-sobre-acento';
export const H2 = 'font-av-titulo text-xl font-semibold leading-snug text-av-texto sm:text-[21px]';
```

- [ ] **Paso 2: `Movimiento.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { animate, motion, useReducedMotion } from 'framer-motion';
import { partirCifra } from './rotulos';
import { REMATE } from './estilos';

// Fuera de JSX para que el lint no marque `motion` como no usado.
const MotionDiv = motion.div;

const contenedor = {
    oculto: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
// Sin `delay` en los hijos: un delay propio pisa el escalonado del contenedor.
const elemento = {
    oculto: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};
const remate = {
    oculto: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// Envuelve el slide entero. Sus Item y Remate entran uno a uno, en orden del DOM, al montarse.
// Con movimiento reducido, initial={false}: todo aparece ya en su estado final.
export function Escalonado({ className, children, ...resto }) {
    const reducir = useReducedMotion();
    return (
        <MotionDiv className={className} variants={contenedor} initial={reducir ? false : 'oculto'} animate="visible" {...resto}>
            {children}
        </MotionDiv>
    );
}

// Un elemento que entra en su turno. Nunca dentro de otro Item.
export function Item({ className, children, ...resto }) {
    return <MotionDiv className={className} variants={elemento} {...resto}>{children}</MotionDiv>;
}

// El remate del slide. Va último en el DOM para entrar al final.
export function Remate({ className = '', children }) {
    return <MotionDiv data-remate className={`${REMATE} ${className}`} variants={remate}>{children}</MotionDiv>;
}

// Cuenta desde 0 hasta el número del dato («200K», «1M»), conservando el sufijo.
// Si el dato no es un número, o hay movimiento reducido, muestra el dato tal cual.
export function Cifra({ valor }) {
    const reducir = useReducedMotion();
    const partes = partirCifra(valor);
    const [texto, setTexto] = useState(() => (partes ? `0${partes.sufijo}` : String(valor)));

    useEffect(() => {
        const p = partirCifra(valor);
        if (reducir || !p) return undefined;
        // delay: que la cuenta se vea, porque la tarjeta entra en su turno del escalonado (~0,3 s).
        const control = animate(0, p.numero, {
            delay: 0.4,
            duration: 1.2,
            ease: 'easeOut',
            onUpdate: (v) => setTexto(`${v.toFixed(p.decimales)}${p.sufijo}`),
            onComplete: () => setTexto(String(valor)),
        });
        return () => control.stop();
    }, [valor, reducir]);

    return <span data-cifra={valor} className="tabular-nums">{reducir || !partes ? valor : texto}</span>;
}
```

- [ ] **Paso 3: `Piezas.jsx`**

```jsx
import { Item } from './Movimiento';
import { CAJA, MONO, PANEL } from './estilos';

// Lista numerada 01, 02… en tarjetas, como los «hechos» de la muestra.
// html: los textos traen <b> o <a> (viñetas de narrative) y se pintan como HTML.
export function Hechos({ items, html = false }) {
    return items.map((texto, i) => (
        <Item key={i} className={`grid grid-cols-[34px_1fr] gap-2.5 ${PANEL} px-4 py-3.5 text-[15px] leading-relaxed text-av-texto`}>
            <span className={`pt-0.5 text-av-acento ${MONO}`}>{String(i + 1).padStart(2, '0')}</span>
            {html ? <span className="av-html" dangerouslySetInnerHTML={{ __html: texto }} /> : <span>{texto}</span>}
        </Item>
    ));
}

// Caja del acento con la etiqueta «Consejo».
export function Consejo({ className = '', children }) {
    return (
        <Item className={`${CAJA} ${className}`}>
            <p className={`text-av-acento ${MONO}`}>Consejo</p>
            <p className="mt-2 text-[15px] leading-relaxed text-av-texto">{children}</p>
        </Item>
    );
}
```

- [ ] **Paso 4: comprobación B.** Todavía nadie los importa; el lint igual los revisa. Esperado: `✖ 52 problems`.

- [ ] **Paso 5: commit**

```bash
cd /d/curso_IA && git add client/src/components/avanzado && git commit -m "feat(avanzado): estilos, movimiento y piezas del tema nocturno"
```

---

### Tarea 4: `Encabezado` y `SlideAvanzado`

**Archivos:**
- Crear: `client/src/components/avanzado/Encabezado.jsx`, `client/src/components/avanzado/SlideAvanzado.jsx`

- [ ] **Paso 1: `Encabezado.jsx`**

```jsx
import { Item } from './Movimiento';
import { bloqueDe, tituloDe } from './rotulos';
import { MONO } from './estilos';

// «Bloque N · ii / 44» y el H1. En lugar de «MÓDULO 1» y sin repetir el título.
const Encabezado = ({ slide, modulo, indice, total }) => {
    const bloque = bloqueDe(slide.id);
    return (
        <>
            <Item className={`flex items-center gap-2.5 text-av-texto-2 ${MONO}`}>
                <span className="rounded-full border border-av-acento/40 px-2.5 py-1 text-av-acento">
                    {bloque ? `Bloque ${bloque}` : modulo.title}
                </span>
                <span>· {String(indice + 1).padStart(2, '0')} / {total}</span>
            </Item>
            <Item>
                <h1 className="mb-5 mt-6 max-w-[22ch] font-av-titulo text-[clamp(30px,4.2vw,54px)] font-semibold leading-[1.05] tracking-[-0.025em] text-av-texto">
                    {tituloDe(slide)}
                </h1>
            </Item>
        </>
    );
};

export default Encabezado;
```

- [ ] **Paso 2: `SlideAvanzado.jsx`** (con `TIPOS` vacío; cada tarea de tipo le agrega una línea)

```jsx
import SlideRenderer from '../SlideRenderer';
import { Escalonado, Item } from './Movimiento';
import Encabezado from './Encabezado';

// Tipo de slide → variante del avanzado. Lo que no está aquí (la pizarra) usa el SlideRenderer del básico.
const TIPOS = {
};

const SlideAvanzado = ({ slide, modulo, indice, total, isAdmin }) => {
    const Tipo = TIPOS[slide.type];
    return (
        <Escalonado data-slide-id={slide.id} className="pb-4">
            {slide.type !== 'hero' && <Encabezado slide={slide} modulo={modulo} indice={indice} total={total} />}
            {Tipo ? (
                <Tipo slide={slide} modulo={modulo} indice={indice} total={total} />
            ) : (
                <Item>
                    <SlideRenderer slide={slide} isAdmin={isAdmin} moduleId={modulo.id} />
                </Item>
            )}
        </Escalonado>
    );
};

export default SlideAvanzado;
```

- [ ] **Paso 3: comprobación B.** Esperado: `✖ 52 problems`.

- [ ] **Paso 4: commit**

```bash
cd /d/curso_IA && git add client/src/components/avanzado && git commit -m "feat(avanzado): encabezado con bloque y SlideAvanzado"
```

---

### Tarea 5: el marco (`AppLayout`)

**Archivo:** modificar `client/src/components/layout/AppLayout.jsx`. En cada par, la cadena del
básico es la que ya está en el archivo, copiada tal cual: el básico no cambia.

- [ ] **Paso 1: imports.** Después de `import AnimatedSlide from '../AnimatedSlide';` agregar:

```jsx
import SlideAvanzado from '../avanzado/SlideAvanzado';
import { partir } from '../avanzado/rotulos';
import { ES_AVANZADO } from '../../data/cursos';

// Clases del marco. El básico conserva las suyas tal cual; el avanzado usa los tokens av-*.
const M = ES_AVANZADO ? {
    raiz: 'flex h-screen bg-av-fondo overflow-hidden font-av-texto text-av-texto selection:bg-av-acento selection:text-av-sobre-acento',
    cabeceraMovil: 'lg:hidden fixed top-0 left-0 right-0 h-16 bg-av-fondo-2 border-b border-av-linea text-av-texto flex items-center justify-between px-4 z-30 safe-area-top',
    selloMovil: 'w-10 h-10 bg-av-acento rounded-[10px] flex items-center justify-center',
    selloMovilTexto: 'font-av-titulo font-extrabold text-lg text-av-sobre-acento',
    lateralColor: 'bg-av-fondo-2 text-av-texto border-r border-av-linea',
    lateralCabecera: 'p-6 border-b border-av-linea',
    sello: 'w-11 h-11 bg-av-acento rounded-[10px] flex items-center justify-center',
    selloTexto: 'font-av-titulo font-extrabold text-lg text-av-sobre-acento',
    marcaTitulo: 'font-av-titulo font-semibold text-[17px] leading-tight',
    marcaSub: 'font-av-mono text-[11px] uppercase tracking-[0.12em] text-av-acento',
    marca: 'IA para abogados',
    marcaSubTexto: 'Curso avanzado',
    navActivo: 'bg-av-panel text-av-texto ring-1 ring-av-linea',
    navDisponible: 'text-av-texto-2 hover:bg-white/5 hover:text-av-texto cursor-pointer',
    navBloqueado: 'text-av-texto-2/50 cursor-not-allowed opacity-60',
    barraActiva: 'absolute left-0 top-0 h-full w-1.5 lg:w-1 bg-av-acento',
    iconoActivo: 'text-av-acento',
    iconoDisponible: 'text-av-texto-2 group-hover:text-av-texto',
    iconoBloqueado: 'text-av-texto-2/40',
    chevron: 'text-av-texto-2',
    pie: 'p-4 border-t border-av-linea',
    avatar: 'w-10 h-10 rounded-full bg-av-panel flex items-center justify-center font-av-mono text-xs border border-av-linea text-av-acento',
    pieNombre: 'text-av-texto font-medium text-sm truncate',
    pieRol: 'text-xs text-av-texto-2 truncate',
    salir: 'p-1.5 text-av-texto-2 hover:text-av-texto hover:bg-av-panel rounded-lg transition-colors',
    principal: 'flex-1 flex flex-col relative av-lienzo min-w-0 overflow-hidden',
    progresoFondo: 'h-1 bg-av-linea w-full flex-shrink-0',
    progreso: 'h-full bg-av-acento transition-all duration-700 ease-out',
    contenedor: 'max-w-5xl mx-auto px-4 pt-7 sm:px-8 lg:px-16 lg:pt-12 pb-28 lg:pb-32',
    notasColor: 'bg-av-acento text-av-sobre-acento font-semibold shadow-2xl shadow-black/40 hover:bg-av-acento-2',
    navPieColor: 'bg-av-fondo-2/95 backdrop-blur-md border-t border-av-linea',
    contador: 'font-av-mono text-xs text-av-texto-2 uppercase tracking-[0.12em] hidden sm:block',
    anteriorColor: 'border border-av-linea text-av-texto font-medium hover:bg-av-panel',
    siguienteColor: 'bg-av-acento text-av-sobre-acento font-semibold hover:bg-av-acento-2',
    panelDerechoColor: 'bg-av-fondo-2 border-av-linea',
    panelDerechoCabecera: 'p-3 sm:p-6 border-b border-av-linea',
    panelDerechoTitulo: 'font-av-mono text-av-texto-2 text-[11px] uppercase tracking-[0.12em] flex items-center gap-2',
    panelDerechoPunto: 'w-2 h-2 rounded-full bg-av-acento animate-pulse',
    panelDerechoCuerpo: 'flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 min-h-[150px]',
} : {
    raiz: 'flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-900 selection:bg-secondary selection:text-white',
    cabeceraMovil: 'lg:hidden fixed top-0 left-0 right-0 h-16 bg-primary text-white flex items-center justify-between px-4 z-30 shadow-lg safe-area-top',
    selloMovil: 'w-10 h-10 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center shadow-lg',
    selloMovilTexto: 'font-bold text-lg text-white',
    lateralColor: 'bg-primary text-white shadow-2xl',
    lateralCabecera: 'p-6 border-b border-blue-800/50 bg-blue-900/50',
    sello: 'w-12 h-12 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center shadow-lg border border-yellow-400/20',
    selloTexto: 'font-bold text-2xl text-white',
    marcaTitulo: 'font-bold text-lg leading-tight tracking-tight',
    marcaSub: 'text-blue-300 text-xs font-medium uppercase tracking-wide opacity-80',
    marca: 'Curso IA',
    marcaSubTexto: 'Curso introductorio',
    navActivo: 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50',
    navDisponible: 'text-blue-200 hover:bg-white/5 hover:text-white cursor-pointer',
    navBloqueado: 'text-blue-400/50 cursor-not-allowed opacity-60',
    barraActiva: 'absolute left-0 top-0 h-full w-1.5 lg:w-1 bg-accent',
    iconoActivo: 'text-accent',
    iconoDisponible: 'text-blue-400 group-hover:text-blue-200',
    iconoBloqueado: 'text-blue-500/40',
    chevron: 'text-blue-300',
    pie: 'p-4 border-t border-blue-800/50 bg-blue-900/30',
    avatar: 'w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center font-bold text-sm border border-blue-600/50 text-blue-100 shadow-inner',
    pieNombre: 'text-white font-medium text-sm truncate',
    pieRol: 'text-xs text-blue-300 truncate',
    salir: 'p-1.5 text-blue-300 hover:text-white hover:bg-blue-800 rounded-lg transition-colors',
    principal: 'flex-1 flex flex-col relative bg-slate-50/50 min-w-0 overflow-hidden',
    progresoFondo: 'h-1 bg-slate-200 w-full flex-shrink-0',
    progreso: 'h-full bg-accent transition-all duration-700 ease-out shadow-[0_0_10px_rgba(214,158,46,0.5)]',
    contenedor: 'max-w-3xl mx-auto p-4 sm:p-6 lg:p-12 pb-28 lg:pb-32',
    notasColor: 'bg-primary text-white shadow-2xl shadow-blue-900/30 hover:bg-blue-800',
    navPieColor: 'bg-white/95 backdrop-blur-md border-t border-slate-200',
    contador: 'text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider hidden sm:block',
    anteriorColor: 'border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300',
    siguienteColor: 'bg-primary text-white font-medium hover:bg-blue-800 shadow-lg shadow-blue-900/20',
    panelDerechoColor: 'bg-white border-slate-200 shadow-xl',
    panelDerechoCabecera: 'p-3 sm:p-6 bg-slate-50 border-b border-slate-100',
    panelDerechoTitulo: 'font-bold text-slate-400 text-xs uppercase tracking-wider flex items-center gap-2',
    panelDerechoPunto: 'w-2 h-2 rounded-full bg-accent animate-pulse',
    panelDerechoCuerpo: 'flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 bg-slate-50/30 min-h-[150px]',
};
```

- [ ] **Paso 2: aplicar `M` en el JSX.** Reemplazos exactos, de arriba abajo. Los números de línea
son del archivo **original**, antes del paso 1; como el paso 1 agrega líneas arriba, buscar cada
reemplazo por su texto:

| Línea | Buscar (atributo o texto actual) | Reemplazar por |
|---|---|---|
| 248 | `className="flex h-screen bg-slate-100 … selection:text-white"` | `className={M.raiz}` |
| 258 | `className="lg:hidden fixed top-0 … safe-area-top"` | `className={M.cabeceraMovil}` |
| 260 | `className="w-10 h-10 bg-gradient-to-br … shadow-lg"` | `className={M.selloMovil}` |
| 261 | `className="font-bold text-lg text-white"` | `className={M.selloMovilTexto}` |
| 264 | `{activeModule?.title \|\| 'Curso IA'}` | `{ES_AVANZADO ? partir(activeModule.title)[0] : (activeModule?.title \|\| 'Curso IA')}` |
| 277 | dentro del template: `bg-primary text-white flex flex-col shadow-2xl z-40` | `${M.lateralColor} flex flex-col z-40` |
| 278 | `className="p-6 border-b border-blue-800/50 bg-blue-900/50"` | `className={M.lateralCabecera}` |
| 281 | `className="w-12 h-12 bg-gradient-to-br … border-yellow-400/20"` | `className={M.sello}` |
| 282 | `className="font-bold text-2xl text-white"` | `className={M.selloTexto}` |
| 285 | `<h1 className="font-bold text-lg leading-tight tracking-tight">Curso IA</h1>` | `<h1 className={M.marcaTitulo}>{M.marca}</h1>` |
| 286 | `<p className="text-blue-300 … opacity-80">Curso introductorio</p>` | `<p className={M.marcaSub}>{M.marcaSubTexto}</p>` |
| 321 | `'bg-blue-600 text-white shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50'` | `M.navActivo` |
| 323 | `'text-blue-200 hover:bg-white/5 hover:text-white cursor-pointer'` | `M.navDisponible` |
| 324 | `'text-blue-400/50 cursor-not-allowed opacity-60'` | `M.navBloqueado` |
| 328 | `className="absolute left-0 top-0 h-full w-1.5 lg:w-1 bg-accent"` | `className={M.barraActiva}` |
| 330 | en el template del ícono: `'text-accent'`, `'text-blue-400 group-hover:text-blue-200'`, `'text-blue-500/40'` | `M.iconoActivo`, `M.iconoDisponible`, `M.iconoBloqueado` |
| 332 | `text-blue-300"` en el `ChevronRight` | `${M.chevron}` (el atributo pasa a template: ``className={`w-5 h-5 lg:w-4 lg:h-4 ml-auto ${M.chevron}`}``) |
| 344 | `className="p-4 border-t border-blue-800/50 bg-blue-900/30"` | `className={M.pie}` |
| 346 | `className="w-10 h-10 rounded-full bg-gradient-to-br … shadow-inner"` | `className={M.avatar}` |
| 350 | `className="text-white font-medium text-sm truncate"` | `className={M.pieNombre}` |
| 353 | `className="text-xs text-blue-300 truncate"` | `className={M.pieRol}` |
| 359 | `className="p-1.5 text-blue-300 hover:text-white hover:bg-blue-800 rounded-lg transition-colors"` | `className={M.salir}` |
| 372 | `className="flex-1 flex flex-col relative bg-slate-50/50 min-w-0 overflow-hidden"` | `className={M.principal}` |
| 374 | `className="h-1 bg-slate-200 w-full flex-shrink-0"` | `className={M.progresoFondo}` |
| 376 | `className="h-full bg-accent transition-all … rgba(214,158,46,0.5)]"` | `className={M.progreso}` |
| 382 | `className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-12 pb-28 lg:pb-32"` | `className={M.contenedor}` |
| 403 | dentro del template: `bg-primary text-white px-4 py-3 sm:px-5 sm:py-3 shadow-2xl shadow-blue-900/30 hover:bg-blue-800` | `${M.notasColor} px-4 py-3 sm:px-5 sm:py-3` |
| 418 | dentro del template: `bg-white/95 backdrop-blur-md border-t border-slate-200` | `${M.navPieColor}` |
| 419 | `className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider hidden sm:block"` | `className={M.contador}` |
| 429 | `border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300` (el atributo pasa a template) | `${M.anteriorColor}` |
| 437 | `bg-primary text-white font-medium hover:bg-blue-800 shadow-lg shadow-blue-900/20` (el atributo pasa a template) | `${M.siguienteColor}` |
| 452 | `bg-white border-t xl:border-t-0 xl:border-l border-slate-200 … shadow-xl` | template: ``className={`w-full xl:w-[420px] ${M.panelDerechoColor} border-t xl:border-t-0 xl:border-l flex flex-col z-10 flex-shrink-0 order-first xl:order-last h-auto xl:h-auto max-h-[45vh] xl:max-h-none`}`` |
| 453 | `className="p-3 sm:p-6 bg-slate-50 border-b border-slate-100"` | `className={M.panelDerechoCabecera}` |
| 454 | `className="font-bold text-slate-400 text-xs uppercase tracking-wider flex items-center gap-2"` | `className={M.panelDerechoTitulo}` |
| 455 | `className="w-2 h-2 rounded-full bg-accent animate-pulse"` | `className={M.panelDerechoPunto}` |
| 459 | `className="flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 bg-slate-50/30 min-h-[150px]"` | `className={M.panelDerechoCuerpo}` |

Al convertir un atributo en template, el resto de las clases se queda igual y en el mismo orden.
Por ejemplo, la línea 429 queda
``className={`flex-1 sm:flex-none px-6 sm:px-6 py-3 sm:py-2.5 rounded-xl ${M.anteriorColor} disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-base sm:text-base min-h-[48px]`}``.
Y la 437 queda
``className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-2.5 rounded-xl ${M.siguienteColor} transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-base min-h-[48px]`}``.

- [ ] **Paso 3: título del módulo en dos líneas (solo en el avanzado).** Reemplazar la línea 331 original
(`<span className={`font-medium text-base lg:text-sm text-left truncate …`}>{module.title}</span>`)
por:

```jsx
                                {ES_AVANZADO ? (
                                    <span className="flex-1 min-w-0 text-left">
                                        <span className="block text-sm font-medium">{partir(module.title)[0]}</span>
                                        {partir(module.title)[1] && (
                                            <span className="block text-[11.5px] leading-snug text-av-texto-2">{partir(module.title)[1]}</span>
                                        )}
                                    </span>
                                ) : (
                                    <span className={`font-medium text-base lg:text-sm text-left truncate transition-transform flex-1 ${isActive ? 'translate-x-1' : ''}`}>{module.title}</span>
                                )}
```

- [ ] **Paso 4: cuerpo del slide.** Reemplazar lo que va dentro de `<AnimatedSlide slideKey={activeSlide.id}>` … `</AnimatedSlide>` (líneas 384 a 394 originales) por:

```jsx
                                {ES_AVANZADO ? (
                                    <SlideAvanzado slide={activeSlide} modulo={activeModule} indice={safeSlideIndex} total={totalSlides} isAdmin={isAdmin} />
                                ) : (
                                    <>
                                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100/80 text-primary text-xs font-bold tracking-wider mb-4 sm:mb-6 border border-blue-200 uppercase">
                                            Módulo {safeModules.indexOf(activeModule) + 1}
                                        </span>

                                        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-8 leading-tight tracking-tight">
                                            {activeSlide.title}
                                        </h2>

                                        <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-accent to-yellow-300 rounded-full mb-6 sm:mb-10"></div>

                                        <SlideRenderer slide={activeSlide} isAdmin={isAdmin} sessionState={sessionState} moduleId={activeModuleId} />
                                    </>
                                )}
```

- [ ] **Paso 5: comprobación B.** El lint puede cambiar de líneas pero no de cantidad: `✖ 52 problems`.

- [ ] **Paso 6: mirada rápida sin script.** Con V corriendo, abrir `http://localhost:4173` en el
navegador integrado (`mcp__Claude_Browser__navigate`). Antes, en la consola de la página:
`localStorage.setItem('course_admin_auth','true')`, y recargar. Esperado: barra lateral grafito con
«IA para abogados / CURSO AVANZADO», módulo «Virtual 1» con su subtítulo en dos líneas, fondo con
cuadrícula y rótulo «Bloque 1 · 01 / 44». Los slides todavía salen con el aspecto del básico: es
el `SlideRenderer` de respaldo.

- [ ] **Paso 7: commit**

```bash
cd /d/curso_IA && git add client/src/components/layout/AppLayout.jsx && git commit -m "feat(avanzado): marco nocturno en AppLayout"
```

---

### Tarea 6: pantalla de bienvenida

**Archivo:** modificar `client/src/components/WelcomeScreen.jsx`.

- [ ] **Paso 1: import.** Después de `import { UserCircle, ShieldCheck } from 'lucide-react';`:

```jsx
import { ES_AVANZADO } from '../data/cursos';
```

- [ ] **Paso 2: rama del avanzado.** Justo antes de la línea `return (` del componente (hoy línea 32),
y después de `handleSubmit`, insertar:

```jsx
    if (ES_AVANZADO) {
        return (
            <div className="av-lienzo flex min-h-screen flex-col items-center justify-center p-4 text-av-texto">
                <div className="w-full max-w-md rounded-2xl border border-av-linea bg-av-fondo-2 p-8">
                    <div className="mb-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-av-acento font-av-titulo text-lg font-extrabold text-av-sobre-acento">IA</div>
                            <span className="font-av-mono text-[11px] uppercase tracking-[0.12em] text-av-acento">Curso avanzado</span>
                        </div>
                        <h1 className="font-av-titulo text-3xl font-semibold leading-tight tracking-tight">IA avanzada para abogados</h1>
                        <p className="mt-2 text-av-texto-2">Ingresa tu nombre para unirte a la sesión.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre completo"
                            className="w-full rounded-xl border border-av-linea bg-av-panel px-4 py-3 text-lg text-av-texto placeholder:text-av-texto-2 focus:border-av-acento focus:outline-none"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!name.trim() || submitting}
                            className="w-full rounded-xl bg-av-acento py-3 font-av-titulo text-lg font-semibold text-av-sobre-acento transition-colors hover:bg-av-acento-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting ? 'Ingresando...' : 'Comenzar'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 rounded-lg border border-av-alerta/50 bg-av-alerta/10 p-3 text-center text-sm text-av-alerta">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 border-t border-av-linea pt-6 text-center">
                        <button
                            onClick={onAdminClick}
                            className="mx-auto flex items-center justify-center gap-2 text-sm text-av-texto-2 transition-colors hover:text-av-texto"
                        >
                            <ShieldCheck className="h-4 w-4" />
                            Soy Instructor
                        </button>
                    </div>
                </div>
            </div>
        );
    }

```

- [ ] **Paso 3: comprobación B.** Esperado: `✖ 52 problems`.

- [ ] **Paso 4: commit**

```bash
cd /d/curso_IA && git add client/src/components/WelcomeScreen.jsx && git commit -m "feat(avanzado): bienvenida propia del curso avanzado"
```

---

### Tarea 7: scripts de verificación

**Archivos:**
- Crear: `docs/revision/recorrido-avanzado.mjs`, `docs/revision/comparar-basico.mjs`

- [ ] **Paso 1: `recorrido-avanzado.mjs`**

```js
// Recorre los 44 slides de la Virtual 1 en modo admin, con Supabase bloqueado, y guarda capturas.
// Uso (desde D:\tmp\pw-curso, donde está instalado playwright):
//   node recorrido-avanzado.mjs <url> <carpeta-salida> [ids,separados,por,coma]
// Sin ids: captura los 44 y hace además la prueba de movimiento y la bienvenida.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const [url = 'http://localhost:4173', salida = 'D:/curso_IA/docs/revision/capturas-avanzado', soloArg] = process.argv.slice(2);
const solo = soloArg ? new Set(soloArg.split(',')) : null;
const TAMANOS = {
    escritorio: { viewport: { width: 1280, height: 800 } },
    movil: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
};
const problemas = [];
mkdirSync(salida, { recursive: true });
const navegador = await chromium.launch();

async function abrir(opciones, admin = true) {
    const contexto = await navegador.newContext(opciones);
    if (admin) await contexto.addInitScript(() => localStorage.setItem('course_admin_auth', 'true'));
    await contexto.route(/supabase\.co/, (ruta) => ruta.abort());
    const pagina = await contexto.newPage();
    pagina.on('pageerror', (e) => problemas.push(`error de página: ${e.message}`));
    await pagina.goto(url);
    await pagina.evaluate(() => document.fonts.ready);
    return { contexto, pagina };
}

const idActual = (pagina) => pagina.getAttribute('[data-slide-id]', 'data-slide-id');

async function avanzar(pagina) {
    const antes = await idActual(pagina);
    await pagina.keyboard.press('ArrowRight');
    await pagina.waitForFunction((id) => document.querySelector('[data-slide-id]')?.getAttribute('data-slide-id') !== id, antes);
}

// 1. Los 44 slides, con movimiento reducido (capturas con todo ya en su lugar).
for (const [nombre, opciones] of Object.entries(TAMANOS)) {
    const { contexto, pagina } = await abrir({ ...opciones, reducedMotion: 'reduce' });
    await pagina.waitForSelector('[data-slide-id]');
    for (let i = 1; i <= 44; i++) {
        const id = await idActual(pagina);
        // Con movimiento reducido el slide aparece completo: el H1 y todos sus ancestros con opacidad 1.
        const completo = await pagina.$eval('[data-slide-id] h1', (h) => {
            for (let n = h; n; n = n.parentElement) if (getComputedStyle(n).opacity !== '1') return false;
            return true;
        }).catch(() => false);
        if (!completo) problemas.push(`${nombre} ${id}: con movimiento reducido el H1 no está completo (o no hay H1)`);

        if (!solo || solo.has(id)) {
            const n = String(i).padStart(2, '0');
            if (await pagina.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) {
                problemas.push(`${nombre} ${id}: desborde horizontal`);
            }
            await pagina.screenshot({ path: `${salida}/${n}-${id}-${nombre}.png` });
            const zona = pagina.locator('main .overflow-y-auto').first();
            if (await zona.evaluate((z) => z.scrollHeight > z.clientHeight + 4)) {
                await zona.evaluate((z) => { z.scrollTop = z.scrollHeight; });
                await pagina.screenshot({ path: `${salida}/${n}-${id}-${nombre}-fin.png` });
                await zona.evaluate((z) => { z.scrollTop = 0; });
            }
        }
        if (i < 44) await avanzar(pagina);
    }
    await contexto.close();
}

if (!solo) {
    // 2. Con movimiento: la órbita gira, la cifra cuenta y el remate entra al final.
    const { contexto, pagina } = await abrir(TAMANOS.escritorio);
    await pagina.waitForSelector('[data-slide-id="v1-1-1"]');
    const giro = () => pagina.$eval('.av-orbita-giro', (o) => getComputedStyle(o).transform);
    const g1 = await giro();
    await pagina.waitForTimeout(1500);
    if (g1 === await giro()) problemas.push('movimiento: la órbita de la portada no gira');
    await pagina.screenshot({ path: `${salida}/movimiento-portada.png` });

    while (await idActual(pagina) !== 'v1-2-2') await avanzar(pagina);
    await pagina.waitForTimeout(150);
    await pagina.screenshot({ path: `${salida}/movimiento-v1-2-2-inicio.png` });
    const alInicio = await pagina.$eval('[data-cifra="1M"]', (c) => c.textContent);
    const remateAlInicio = await pagina.$eval('[data-remate]', (r) => Number(getComputedStyle(r).opacity));
    if (alInicio === '1M') problemas.push('movimiento: la cifra de v1-2-2 no cuenta (a los 150 ms ya dice 1M)');
    if (remateAlInicio >= 1) problemas.push('movimiento: el remate de v1-2-2 ya estaba entero a los 150 ms');
    await pagina.waitForTimeout(2500);
    await pagina.screenshot({ path: `${salida}/movimiento-v1-2-2-fin.png` });
    if (await pagina.$eval('[data-cifra="1M"]', (c) => c.textContent) !== '1M') problemas.push('movimiento: la cifra de v1-2-2 no termina en 1M');
    await contexto.close();

    // 3. Bienvenida (sin modo admin), en los dos tamaños.
    for (const [nombre, opciones] of Object.entries(TAMANOS)) {
        const { contexto: c, pagina: p } = await abrir(opciones, false);
        await p.waitForSelector('text=Soy Instructor');
        await p.screenshot({ path: `${salida}/00-bienvenida-${nombre}.png` });
        await c.close();
    }
}

await navegador.close();
console.log(problemas.length ? problemas.join('\n') : 'Sin problemas.');
process.exit(problemas.length ? 1 : 0);
```

- [ ] **Paso 2: `comparar-basico.mjs`**

```js
// Captura los slides 1 a 3 del básico en modo admin (1280×800, Supabase bloqueado), como
// docs/revision/capturas/basico-*.png, para comparar. Uso (desde D:\tmp\pw-curso):
//   node comparar-basico.mjs <url> <carpeta-salida>
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const [url = 'http://localhost:4173', salida = 'D:/curso_IA/docs/revision/capturas-avanzado'] = process.argv.slice(2);
mkdirSync(salida, { recursive: true });
const navegador = await chromium.launch();
const contexto = await navegador.newContext({ viewport: { width: 1280, height: 800 } });
await contexto.addInitScript(() => localStorage.setItem('course_admin_auth', 'true'));
await contexto.route(/supabase\.co/, (ruta) => ruta.abort());
const pagina = await contexto.newPage();
await pagina.goto(url);
await pagina.evaluate(() => document.fonts.ready);
for (let i = 1; i <= 3; i++) {
    await pagina.waitForTimeout(1500);
    await pagina.screenshot({ path: `${salida}/basico-${i}-escritorio.png` });
    if (i < 3) await pagina.keyboard.press('ArrowRight');
}
await navegador.close();
console.log('Listo.');
```

- [ ] **Paso 3: probar el recorrido con lo que hay.** Comprobación B y luego R con
`IDS=v1-1-1,v1-2-3`. Esperado: `Sin problemas.` y cuatro capturas. Los slides todavía salen con el
cuerpo del básico (respaldo), pero con el marco, el rótulo y el H1 nuevos. Si dice «el H1 no está
completo», el `initial={false}` del `Escalonado` no está llegando a los `Item`: revisarlo antes de
seguir, porque todas las tareas siguientes dependen de eso.

- [ ] **Paso 4: commit**

```bash
cd /d/curso_IA && git add docs/revision/recorrido-avanzado.mjs docs/revision/comparar-basico.mjs && git commit -m "test(avanzado): recorrido Playwright y captura del básico"
```

---

## Tipos de slide, uno por tarea

En cada tarea: crear el archivo, registrar el tipo en `TIPOS` de `SlideAvanzado.jsx` (import arriba
y línea dentro del objeto, en el orden de las tareas), hacer B, hacer R con los ids indicados, mirar
las capturas y hacer commit con:

```bash
cd /d/curso_IA && git add client/src/components/avanzado && git commit -m "feat(avanzado): variante <tipo>"
```

Lo que hay que mirar en las capturas vale para todas: fondo grafito, H1 en Bricolage sin título
repetido debajo, rótulo «Bloque N · ii / 44», nada cortado ni desbordado a los lados en móvil, texto
en Plex y etiquetas en mono.

### Tarea 8: `hero` → `tipos/Portada.jsx` (ids: `v1-1-1`)

```jsx
import { Item } from '../Movimiento';
import { partir } from '../rotulos';
import { MONO } from '../estilos';

// Portada solo tipográfica (sin llm-diagram.png), con la órbita de la muestra.
const Portada = ({ slide, modulo, indice, total }) => {
    const datos = slide.contentData;
    return (
        <div className="relative flex min-h-[70vh] flex-col justify-center gap-7 overflow-hidden py-10">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-[120px] -right-[190px] h-[360px] w-[360px] md:-right-40 md:bottom-auto md:top-1/2 md:h-[620px] md:w-[620px] md:-translate-y-1/2">
                <div className="av-orbita-giro absolute inset-0 rounded-full border border-av-linea">
                    <span className="av-latido absolute left-[calc(50%-6px)] top-[-6px] h-3 w-3 rounded-full bg-av-acento shadow-[0_0_18px_rgb(var(--av-acento))]" />
                </div>
                <div className="av-orbita-giro-inverso absolute inset-[15%] rounded-full border border-av-linea">
                    <span className="av-latido absolute bottom-[12%] left-[6%] h-2 w-2 rounded-full bg-av-acento [animation-delay:1.2s]" />
                </div>
                <div className="absolute inset-[31%] rounded-full border border-av-acento/50 shadow-[inset_0_0_80px_rgb(var(--av-acento)/0.15)]" />
            </div>

            <Item className={`relative flex items-center gap-2.5 text-av-texto-2 ${MONO}`}>
                <span className="rounded-full border border-av-acento/40 px-2.5 py-1 text-av-acento">{partir(modulo.title)[0]}</span>
                <span>{String(indice + 1).padStart(2, '0')} / {total}</span>
            </Item>
            <Item className="relative">
                <h1 className="max-w-[10ch] font-av-titulo text-[clamp(46px,7.4vw,104px)] font-extrabold leading-[0.95] tracking-[-0.025em] text-av-texto">
                    {datos.heading}
                </h1>
                <div className="mt-7 h-1.5 w-[120px] rounded-full bg-av-acento" />
            </Item>
            <Item className="relative max-w-[38ch] text-[clamp(17px,1.7vw,22px)] leading-normal text-av-texto-2">
                {datos.paragraph}
            </Item>
        </div>
    );
};

export default Portada;
```

En `SlideAvanzado.jsx`: `import Portada from './tipos/Portada';` y `hero: Portada,`.
Mirar: comparar `01-v1-1-1-escritorio.png` con `docs/revision/muestras-diseno/b-1-escritorio.png`,
y el móvil con `b-1-movil.png`. Sin imagen, órbita a la derecha (abajo en móvil), sin rótulo
«Bloque».

### Tarea 9: `profile` → `tipos/Perfil.jsx` (ids: `v1-1-2`)

```jsx
import { Item } from '../Movimiento';
import { LEAD, PANEL } from '../estilos';

const Perfil = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <div className="grid items-start gap-6 md:grid-cols-[220px_1fr] md:gap-10">
            <Item>
                <img src={datos.image} alt={datos.heading} className="aspect-square w-40 rounded-2xl border border-av-linea object-cover md:w-full" />
            </Item>
            <div className="grid gap-2.5">
                <Item className={`mb-2 ${LEAD}`}>{datos.subheading}</Item>
                {datos.bullets.map((viñeta, i) => (
                    <Item key={i} className={`${PANEL} px-4 py-3.5 text-[15px] leading-relaxed text-av-texto sm:text-base`}>{viñeta}</Item>
                ))}
            </div>
        </div>
    );
};

export default Perfil;
```

`import Perfil from './tipos/Perfil';` y `profile: Perfil,`. Mirar: H1 «José Luis Zapata», foto
`perfil-joseluis.png` cargada, tres tarjetas.

### Tarea 10: `poll` → `tipos/Encuesta.jsx` (ids: `v1-1-3,v1-1-4,v1-1-5`)

```jsx
import { Item } from '../Movimiento';
import { PANEL } from '../estilos';

// La encuesta vive en el panel «Interacción» (a la derecha en escritorio, arriba en móvil).
const Encuesta = () => (
    <Item className={`flex items-center gap-3 ${PANEL} px-5 py-4 text-av-texto-2`}>
        <span className="h-2.5 w-2.5 flex-none rounded-full bg-av-acento" />
        <span>Responde en el panel <span className="text-av-texto">Interacción</span>: los resultados se ven en vivo.</span>
    </Item>
);

export default Encuesta;
```

`import Encuesta from './tipos/Encuesta';` y `poll: Encuesta,`. Mirar: panel «Interacción» oscuro
con la tarjeta clara de `LivePoll` dentro (así se decidió).

### Tarea 11: `analogy` → `tipos/Analogia.jsx` (ids: `v1-2-1,v1-4-1`)

```jsx
import { Car, Cpu, Info, User } from 'lucide-react';
import { Item } from '../Movimiento';
import { CAJA, LEAD, MONO, PANEL } from '../estilos';

// Íconos que usan las analogías de la Virtual 1. Uno desconocido cae en Info.
const ICONOS = { Car, Cpu, User };

const Analogia = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                {[datos.left, datos.right].map((lado, i) => {
                    const Icono = ICONOS[lado.icon] || Info;
                    return (
                        <Item key={i} className={i === 0 ? `${PANEL} p-6` : CAJA}>
                            <Icono className={`h-7 w-7 ${i === 0 ? 'text-av-texto-2' : 'text-av-acento'}`} strokeWidth={1.75} />
                            <p className={`mt-5 text-av-texto-2 ${MONO}`}>{lado.title}</p>
                            <p className="mt-2 font-av-titulo text-[clamp(26px,3vw,40px)] font-semibold leading-tight text-av-texto">{lado.text}</p>
                        </Item>
                    );
                })}
            </div>
            {datos.footer && <Item className={`mt-5 ${LEAD}`}>{datos.footer}</Item>}
        </>
    );
};

export default Analogia;
```

`import Analogia from './tipos/Analogia';` y `analogy: Analogia,`. Mirar: dos tarjetas (la
segunda con el tono del acento) y el pie debajo.

### Tarea 12: `stat-comparison` → `tipos/Cifras.jsx` (ids: `v1-2-2`)

```jsx
import { Cifra, Item, Remate } from '../Movimiento';
import { CAJA, MONO, PANEL } from '../estilos';

const Cifras = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <Item className={`${PANEL} p-6`}>
                    <p className={`text-av-texto-2 ${MONO}`}>Antes</p>
                    <p className="mt-3 font-av-titulo text-[clamp(44px,6vw,72px)] font-semibold leading-none text-av-texto-2 line-through decoration-av-linea decoration-2">
                        <Cifra valor={datos.statSecondary} />
                    </p>
                </Item>
                <Item className={CAJA}>
                    <p className={`text-av-acento ${MONO}`}>Hoy</p>
                    <p className="mt-3 font-av-titulo text-[clamp(56px,8vw,104px)] font-extrabold leading-none text-av-acento">
                        <Cifra valor={datos.statPrimary} />
                    </p>
                </Item>
            </div>
            <Item className={`mt-3 text-av-texto-2 ${MONO}`}>{datos.label}</Item>
            {datos.quote && <Remate className="mt-5">{datos.quote}</Remate>}
        </>
    );
};

export default Cifras;
```

`import Cifras from './tipos/Cifras';` y `'stat-comparison': Cifras,`. Mirar: «200K» tachado y
«1M» en el acento (en R, con movimiento reducido, ya en su valor final). El remate va abajo.

### Tarea 13: `comparison` → `tipos/Tabla.jsx` (ids: `v1-2-3,v1-2-5,v1-3-4,v1-3-5b,v1-6-3,v1-6-4,v1-7-7`)

```jsx
import { Item } from '../Movimiento';
import { LEAD, MONO, PANEL } from '../estilos';

// Columnas en escritorio; en móvil (< md) cada fila es una tarjeta de una columna.
const COLUMNAS = { 3: 'md:grid-cols-[1.1fr_1.6fr_1fr]', 4: 'md:grid-cols-4' };

const Tabla = ({ slide }) => {
    const { paragraph, headers, rows } = slide.contentData;
    const columnas = COLUMNAS[headers.length] || 'md:grid-cols-3';
    // En las de 3 columnas la última es el resultado («Consecuencia», «Dónde puede ir»): va resaltada.
    const resaltarUltima = headers.length === 3;
    return (
        <>
            {paragraph && <Item className={LEAD}>{paragraph}</Item>}
            <div role="table" className="mt-7 grid gap-2.5">
                <Item role="row" className={`hidden gap-6 px-5 pb-1 text-av-texto-2 md:grid ${columnas} ${MONO}`}>
                    {headers.map((encabezado, j) => <span key={j} role="columnheader">{encabezado}</span>)}
                </Item>
                {rows.map((fila, i) => (
                    <Item key={i} role="row" className={`grid gap-1.5 ${PANEL} px-4 py-3.5 text-[15px] leading-normal md:gap-6 md:px-5 md:py-4 ${columnas}`}>
                        {fila.map((celda, j) => {
                            if (j === 0) {
                                return <span key={j} role="rowheader" className="font-av-titulo text-base font-semibold text-av-texto md:text-[16.5px]">{celda}</span>;
                            }
                            const resaltada = resaltarUltima && j === fila.length - 1;
                            return (
                                <span key={j} role="cell" className={resaltada ? 'font-semibold text-av-acento-2' : 'text-av-texto'}>
                                    {headers[j] && <span className={`mr-1.5 text-av-texto-2 md:hidden ${MONO}`}>{headers[j]}</span>}
                                    {celda}
                                </span>
                            );
                        })}
                    </Item>
                ))}
            </div>
        </>
    );
};

export default Tabla;
```

`import Tabla from './tipos/Tabla';` y `comparison: Tabla,`. Mirar: en móvil, tarjetas sin
desplazamiento lateral y todas las celdas menos la primera con su etiqueta mono (comparar con
`b-2-movil.png`). En escritorio, fila de encabezados en mono y la última columna en el acento solo
en `v1-2-3`, `v1-2-5`, `v1-3-4` y `v1-6-4`. En `v1-3-5b` el primer encabezado está vacío: la
columna queda sin etiqueta y la primera celda es el título.

### Tarea 14: `narrative` → `tipos/Narrativa.jsx` (ids: `v1-2-4,v1-3-2,v1-3-3,v1-3-5,v1-3-6,v1-3-7,v1-3-10,v1-4-2,v1-6-2,v1-7-3`)

```jsx
import { Item, Remate } from '../Movimiento';
import { Hechos } from '../Piezas';
import { CAJA, H2, LEAD } from '../estilos';

// Heading1 ya es el H1 (Encabezado). Con segunda sección: dos columnas en lg, como la muestra de Mata v. Avianca.
const Narrativa = ({ slide }) => {
    const datos = slide.contentData;
    const segunda = Boolean(datos.Heading2 || datos.bullets2);
    const remate = datos.highlight && <Remate className="mt-2">{datos.highlight.text}</Remate>;
    return (
        <div className={`grid gap-6 ${segunda ? 'lg:grid-cols-[1.3fr_1fr] lg:gap-10' : ''}`}>
            <div className="grid content-start gap-2.5">
                {datos.paragraph1 && <Item className={`mb-3 ${LEAD}`}>{datos.paragraph1}</Item>}
                {datos.bullets1 && <Hechos items={datos.bullets1} html />}
                {!segunda && remate}
            </div>
            {segunda && (
                <div className="grid content-start gap-2.5">
                    {datos.Heading2 && (
                        <Item className={CAJA}>
                            <h2 className={H2}>{datos.Heading2}</h2>
                            {datos.paragraph2 && <p className="mt-2.5 text-[15px] leading-relaxed text-av-texto">{datos.paragraph2}</p>}
                        </Item>
                    )}
                    {datos.bullets2 && <Hechos items={datos.bullets2} html />}
                    {remate}
                </div>
            )}
        </div>
    );
};

export default Narrativa;
```

`import Narrativa from './tipos/Narrativa';` y `narrative: Narrativa,`. Mirar: `13-v1-3-3` contra
`b-3-escritorio.png` y `b-3-movil.png`. En `v1-3-10`, los enlaces de `bullets2` en `av-acento-2`
subrayados y las negritas de `bullets1`. En `v1-3-2` (del básico) se ve el emoji del H1, porque es
dato y se deja.

### Tarea 15: `warning` → `tipos/Advertencia.jsx` (ids: `v1-3-1,v1-6-1`)

```jsx
import { Item, Remate } from '../Movimiento';
import { LEAD, PANEL } from '../estilos';

const Advertencia = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            {datos.paragraph && <Item className={LEAD}>{datos.paragraph}</Item>}
            <div className="mt-6 grid gap-2.5">
                {datos.bullets?.map((viñeta, i) => (
                    <Item key={i} className={`flex items-start gap-3 ${PANEL} border-l-2 border-l-av-alerta px-4 py-3.5 text-[15px] leading-relaxed text-av-texto`}>
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-av-alerta" />
                        <span>{viñeta}</span>
                    </Item>
                ))}
                {datos.highlight && <Remate className="mt-2">{datos.highlight.text}</Remate>}
            </div>
        </>
    );
};

export default Advertencia;
```

`import Advertencia from './tipos/Advertencia';` y `warning: Advertencia,`. Mirar: borde izquierdo
en el tono de alerta y el remate al final.

### Tarea 16: `prompt-template` → `tipos/Plantilla.jsx` (ids: `v1-3-8,v1-3-9,v1-7-4,v1-7-5,v1-7-6`)

```jsx
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Item } from '../Movimiento';
import { Consejo } from '../Piezas';
import { MONO } from '../estilos';

const Plantilla = ({ slide }) => {
    const datos = slide.contentData;
    const [copiado, setCopiado] = useState(false);

    const copiar = () => {
        navigator.clipboard.writeText(datos.template);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_280px] lg:gap-8">
            <Item className="min-w-0 overflow-hidden rounded-xl border border-av-linea bg-av-fondo-2">
                <div className="flex items-center justify-between border-b border-av-linea px-4 py-2.5">
                    <span className={`text-av-texto-2 ${MONO}`}>Prompt</span>
                    <button type="button" onClick={copiar} className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-av-acento hover:bg-av-panel ${MONO}`}>
                        {copiado ? <Check size={14} /> : <Copy size={14} />}
                        {copiado ? 'Copiado' : 'Copiar'}
                    </button>
                </div>
                <pre className="whitespace-pre-wrap break-words p-4 font-av-mono text-[13px] leading-relaxed text-av-texto sm:p-5 sm:text-sm lg:max-h-[60vh] lg:overflow-auto">
                    {datos.template.split(/(\[.*?\])/g).map((parte, i) => (
                        /^\[.*\]$/.test(parte)
                            ? <span key={i} className="rounded bg-av-acento/15 px-1 text-av-acento">{parte}</span>
                            : parte
                    ))}
                </pre>
            </Item>
            <div className="grid content-start gap-3">
                {datos.tip && <Consejo>{datos.tip}</Consejo>}
                {datos.examples?.length > 0 && (
                    <Item>
                        <p className={`mb-2 text-av-texto-2 ${MONO}`}>Ejemplos de uso</p>
                        <div className="flex flex-wrap gap-2">
                            {datos.examples.map((ejemplo, i) => (
                                <span key={i} className="rounded-md border border-av-linea bg-av-panel px-2.5 py-1 text-sm text-av-texto">{ejemplo}</span>
                            ))}
                        </div>
                    </Item>
                )}
            </div>
        </div>
    );
};

export default Plantilla;
```

`import Plantilla from './tipos/Plantilla';` y `'prompt-template': Plantilla,`. Mirar: en móvil el
prompt entero, sin caja con desplazamiento interno ni letra gigante (antes `text-4xl`, `p-8`); los
`[CORCHETES]` en el acento.

### Tarea 17: `list-comparison` → `tipos/Listas.jsx` (ids: `v1-4-3`)

```jsx
import { Item } from '../Movimiento';
import { PANEL } from '../estilos';

const Columna = ({ titulo, items, marca, color }) => (
    <div className="grid content-start gap-2.5">
        <Item className={`font-av-titulo text-xl font-semibold ${color}`}>{titulo}</Item>
        {items.map((texto, i) => (
            <Item key={i} className={`flex items-start gap-3 ${PANEL} px-4 py-3.5 text-[15px] leading-relaxed text-av-texto`}>
                <span className={`font-av-mono ${color}`}>{marca}</span>
                <span>{texto}</span>
            </Item>
        ))}
    </div>
);

const Listas = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Columna titulo={datos.leftTitle} items={datos.leftItems} marca="✓" color="text-av-acento" />
            <Columna titulo={datos.rightTitle} items={datos.rightItems} marca="✕" color="text-av-alerta" />
        </div>
    );
};

export default Listas;
```

`import Listas from './tipos/Listas';` y `'list-comparison': Listas,`. Mirar: H1 «Qué delegar y qué
no» (sale de `title`, porque no hay `heading`).

### Tarea 18: `break` → `tipos/Descanso.jsx` (ids: `v1-5-1`)

```jsx
import { Item } from '../Movimiento';
import { LEAD, MONO, PANEL } from '../estilos';

const Descanso = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <Item className={LEAD}>{datos.message}</Item>
            {datos.nextPreview && (
                <Item className={`mt-8 inline-flex flex-wrap items-center gap-3 ${PANEL} px-5 py-4`}>
                    <span className={`text-av-texto-2 ${MONO}`}>A continuación</span>
                    <span className="font-av-titulo text-lg font-semibold text-av-acento">{datos.nextPreview}</span>
                </Item>
            )}
        </>
    );
};

export default Descanso;
```

`import Descanso from './tipos/Descanso';` y `break: Descanso,`. Mirar: sin el fondo crema del
básico.

### Tarea 19: `feature-highlight` y `concept` → `ImagenAmpliable.jsx` y `tipos/Destacado.jsx` (ids: `v1-6-5,v1-6-6,v1-6-7,v1-7-1,v1-7-2`)

Antes de empezar, revisar si José Luis contestó la pregunta del principio. Este código es la
opción 1.

`client/src/components/avanzado/ImagenAmpliable.jsx`:

```jsx
import { useEffect, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { MONO } from './estilos';

// Imagen que se abre a pantalla completa a 960 px, con desplazamiento y zoom de pellizco.
// Para las capturas del Anonimizador, que a 340 px no se leen.
const ImagenAmpliable = ({ src, alt }) => {
    const [abierta, setAbierta] = useState(false);

    useEffect(() => {
        if (!abierta) return undefined;
        const alTeclear = (e) => { if (e.key === 'Escape') setAbierta(false); };
        window.addEventListener('keydown', alTeclear);
        return () => window.removeEventListener('keydown', alTeclear);
    }, [abierta]);

    return (
        <>
            <button type="button" onClick={() => setAbierta(true)} aria-label={`Ampliar: ${alt}`} className="group block w-full overflow-hidden rounded-xl border border-av-linea bg-av-fondo-2 text-left">
                <img src={src} alt={alt} className="w-full" />
                <span className={`flex items-center gap-1.5 border-t border-av-linea px-3 py-2 text-av-texto-2 group-hover:text-av-acento ${MONO}`}>
                    <Maximize2 size={13} /> Ampliar
                </span>
            </button>
            {abierta && (
                <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[70] flex flex-col bg-black/90" onClick={() => setAbierta(false)}>
                    <div className="flex justify-end p-3">
                        <button type="button" onClick={() => setAbierta(false)} className={`flex items-center gap-1.5 rounded-md border border-av-linea bg-av-panel px-3 py-2 text-av-texto ${MONO}`}>
                            <X size={14} /> Cerrar
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-3" onClick={(e) => e.stopPropagation()}>
                        <img src={src} alt={alt} className="mx-auto w-[960px] max-w-none" />
                    </div>
                </div>
            )}
        </>
    );
};

export default ImagenAmpliable;
```

`client/src/components/avanzado/tipos/Destacado.jsx`:

```jsx
import { Item } from '../Movimiento';
import { Consejo, Hechos } from '../Piezas';
import ImagenAmpliable from '../ImagenAmpliable';
import { LEAD } from '../estilos';

// feature-highlight (steps) y concept (bullets): texto, imagen ampliable y lista numerada.
const Destacado = ({ slide }) => {
    const datos = slide.contentData;
    const pasos = (datos.steps || datos.bullets || []).map((paso) => paso.replace(/^\d+\.\s/, ''));
    return (
        <>
            {datos.paragraph && <Item className={LEAD}>{datos.paragraph}</Item>}
            <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
                {datos.image && (
                    <Item className="min-w-0">
                        <ImagenAmpliable src={datos.image} alt={datos.heading} />
                    </Item>
                )}
                <div className="grid content-start gap-2.5">
                    <Hechos items={pasos} />
                    {datos.tip && <Consejo className="mt-2">{datos.tip}</Consejo>}
                </div>
            </div>
        </>
    );
};

export default Destacado;
```

`import Destacado from './tipos/Destacado';`, `'feature-highlight': Destacado,` y `concept: Destacado,`.
Mirar las capturas y además probar la ampliación a mano en el navegador integrado, en 375×812
(`mcp__Claude_Browser__resize_window` con `preset: 'mobile'`): ir a `v1-6-5`, tocar «Ampliar» y
confirmar que la captura se lee y se puede desplazar. Cerrar con «Cerrar», y en escritorio también
con Escape. Volver a `preset: 'desktop'` al terminar.

### Tarea 20: `exercise-interactive` → `tipos/Ejercicio.jsx` (ids: `v1-7-8`)

```jsx
import { Timer } from 'lucide-react';
import GallerySubmit from '../../GallerySubmit';
import { Item } from '../Movimiento';
import { Consejo, Hechos } from '../Piezas';
import { LEAD, MONO, PANEL } from '../estilos';

// Instrucciones a la izquierda y el formulario de la galería (GallerySubmit, sin cambios) a la derecha.
const Ejercicio = ({ slide }) => {
    const datos = slide.contentData;
    const envio = slide.interaction?.type === 'GallerySubmit' ? slide.interaction.data : null;
    return (
        <div className="grid gap-6 xl:grid-cols-2">
            <div className="grid content-start gap-2.5">
                {datos.duration && (
                    <Item className={`flex items-center gap-2 text-av-acento ${MONO}`}>
                        <Timer size={14} /> {datos.duration}
                    </Item>
                )}
                {datos.instructions && <Item className={`mb-3 ${LEAD}`}>{datos.instructions}</Item>}
                <Hechos items={datos.steps} />
                {datos.sampleInput && (
                    <Item>
                        <details className={`${PANEL} px-4 py-3`}>
                            <summary className={`cursor-pointer text-av-texto-2 ${MONO}`}>Ver ejemplo</summary>
                            <pre className="mt-3 whitespace-pre-wrap font-av-mono text-[13px] leading-relaxed text-av-texto">{datos.sampleInput}</pre>
                        </details>
                    </Item>
                )}
                {datos.tip && <Consejo className="mt-2">{datos.tip}</Consejo>}
            </div>
            {envio && (
                <Item className="min-w-0">
                    <GallerySubmit
                        exerciseId={envio.exerciseId}
                        moduleId={envio.moduleId}
                        promptLabel={envio.promptLabel}
                        resultLabel={envio.resultLabel}
                        allowImage={envio.allowImage}
                        additionalFields={envio.additionalFields}
                    />
                </Item>
            )}
        </div>
    );
};

export default Ejercicio;
```

`import Ejercicio from './tipos/Ejercicio';` y `'exercise-interactive': Ejercicio,`. Mirar: el
formulario claro a la derecha en 1280 y debajo en móvil. Sin tamaños fijos grandes.

### Tarea 21: `gallery-view` → `tipos/Galeria.jsx` (ids: `v1-7-9`)

```jsx
import { useState } from 'react';
import GalleryDisplay from '../../GalleryDisplay';
import { Item } from '../Movimiento';
import { LEAD, MONO, PANEL } from '../estilos';

const Galeria = ({ slide, modulo }) => {
    const datos = slide.contentData;
    const [soloDestacados, setSoloDestacados] = useState(false);
    const boton = (activo) => `rounded-md px-3 py-1.5 ${MONO} ${activo ? 'bg-av-acento text-av-sobre-acento' : 'text-av-texto-2 hover:text-av-texto'}`;
    return (
        <>
            {datos.description && <Item className={LEAD}>{datos.description}</Item>}
            <Item className={`mt-5 inline-flex gap-1 ${PANEL} p-1`}>
                <button type="button" className={boton(soloDestacados)} onClick={() => setSoloDestacados(true)}>Destacados</button>
                <button type="button" className={boton(!soloDestacados)} onClick={() => setSoloDestacados(false)}>Todos</button>
            </Item>
            <Item className="mt-5">
                <GalleryDisplay showAll={!soloDestacados} showHighlighted exerciseId={datos.exerciseId || null} moduleId={modulo.id} />
            </Item>
        </>
    );
};

export default Galeria;
```

`import Galeria from './tipos/Galeria';` y `'gallery-view': Galeria,`. Mirar: con Supabase
bloqueado, `GalleryDisplay` muestra su estado vacío o de carga. Eso es lo esperado.

### Tarea 22: `summary` → `tipos/Resumen.jsx` (ids: `v1-8-1`)

```jsx
import { Item, Remate } from '../Movimiento';
import { partir } from '../rotulos';
import { PANEL } from '../estilos';

// Cada viñeta «Término: explicación» se parte en término (acento) y explicación.
const Resumen = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <div className="grid gap-2.5 md:grid-cols-2">
                {datos.bullets.map((viñeta, i) => {
                    const [termino, resto] = partir(viñeta);
                    return (
                        <Item key={i} className={`${PANEL} p-5`}>
                            {resto ? (
                                <>
                                    <p className="font-av-titulo text-lg font-semibold text-av-acento">{termino}</p>
                                    <p className="mt-1.5 text-[15px] leading-relaxed text-av-texto">{resto}</p>
                                </>
                            ) : (
                                <p className="text-[15px] leading-relaxed text-av-texto">{termino}</p>
                            )}
                        </Item>
                    );
                })}
            </div>
            {datos.callToAction && <Remate className="mt-5">{datos.callToAction}</Remate>}
        </>
    );
};

export default Resumen;
```

`import Resumen from './tipos/Resumen';` y `summary: Resumen,`. Mirar: las 4D (Delegación,
Descripción, Discernimiento, Diligencia) como términos en el acento, sin «Módulo completado».

### Tarea 23: `next-steps` → `tipos/Tarea.jsx` (ids: `v1-8-2`)

```jsx
import { Item, Remate } from '../Movimiento';
import { MONO, PANEL } from '../estilos';

// Las tres tareas abiertas, con su consejo a la vista: sin clics.
const Tarea = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <div className="grid gap-2.5 md:grid-cols-3">
                {datos.steps.map((paso, i) => (
                    <Item key={i} className={`flex flex-col gap-3 ${PANEL} p-5`}>
                        <span className={`self-start rounded-full border border-av-acento/40 px-2.5 py-1 text-av-acento ${MONO}`}>{paso.day}</span>
                        <p className="font-av-titulo text-lg font-semibold leading-snug text-av-texto">{paso.action}</p>
                        {paso.tip && <p className="text-[15px] leading-relaxed text-av-texto-2">{paso.tip}</p>}
                    </Item>
                ))}
            </div>
            {datos.challenge && <Remate className="mt-5">{datos.challenge}</Remate>}
        </>
    );
};

export default Tarea;
```

`import Tarea from './tipos/Tarea';` y `'next-steps': Tarea,`. Mirar: tres tarjetas iguales, sin
`text-5xl` ni `p-8`, sin trofeo que rebota.

### Tarea 24: `resources-download` → `tipos/Materiales.jsx` (ids: `v1-8-3`)

```jsx
import { Download } from 'lucide-react';
import { Item } from '../Movimiento';
import { MONO, PANEL } from '../estilos';

const Materiales = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <div className="grid gap-2.5 md:grid-cols-2">
            {datos.resources.map((recurso, i) => (
                <Item key={i} className={`flex flex-col gap-3 ${PANEL} p-5`}>
                    <div className="flex items-start justify-between gap-3">
                        <p className="font-av-titulo text-lg font-semibold leading-snug text-av-texto">{recurso.title}</p>
                        <span className={`flex-none rounded border border-av-linea px-1.5 py-0.5 text-av-texto-2 ${MONO}`}>{recurso.type}</span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-av-texto-2">{recurso.description}</p>
                    <a href={recurso.downloadUrl} target="_blank" rel="noreferrer" className={`mt-auto inline-flex items-center gap-2 self-start rounded-md bg-av-acento px-3.5 py-2 text-av-sobre-acento ${MONO}`}>
                        <Download size={14} /> Descargar
                    </a>
                </Item>
            ))}
        </div>
    );
};

export default Materiales;
```

`import Materiales from './tipos/Materiales';` y `'resources-download': Materiales,`. Mirar: 5
tarjetas; los enlaces apuntan a `/materiales/…` (comprobar uno con `curl -sI http://localhost:4173/materiales/checklist-verificacion.md | head -1`
→ `HTTP/1.1 200 OK`).

---

### Tarea 25: guion del profesor (solo en modo admin del avanzado)

Pedido de José Luis el 24 sep 2026: en la vista del profesor, una barra con el guion de cada slide
que los alumnos no ven, para no limitarse a repetir lo que dice la pantalla. Es la única parte de
este plan que toca el modo admin, y se hace por ese pedido.

Decisiones:
- El guion va en la barra lateral, debajo de la lista de módulos, que en el avanzado tiene solo dos
  entradas. Un panel a la derecha no entra: en las encuestas ya está el panel «Interacción» y el
  slide quedaría en ~200 px.
- En modo admin del avanzado la barra pasa de `w-72` a `w-80` para que se lea mejor.
- El guion vive en su propio archivo, `client/src/data/avanzado/guion-virtual-1.js`: no se tocan los
  datos de los slides. Se carga con `import()` solo cuando se monta el panel, así que la pantalla
  de los alumnos no lo descarga. **No es secreto:** quien conozca la dirección del archivo puede
  abrirlo, igual que el resto de la app, porque el modo admin es una marca en `localStorage` y no
  un inicio de sesión. No poner datos de clientes ahí.
- La tecla G oculta el panel y lo vuelve a mostrar, por si José Luis comparte pantalla.
- Esta tarea deja el archivo con el formato y **sin contenido**. Los 44 guiones se escriben en otra
  sesión: `docs/prompts/2026-09-24-guion-virtual-1.md`.

**Archivos:**
- Crear: `client/src/data/avanzado/guion-virtual-1.js`, `client/src/components/avanzado/GuionProfesor.jsx`
- Modificar: `client/src/components/layout/AppLayout.jsx`, `docs/revision/recorrido-avanzado.mjs`

- [ ] **Paso 1: `guion-virtual-1.js`**

```js
// Guion del profesor para la Virtual 1. Solo lo muestra el modo admin del curso avanzado, y
// GuionProfesor.jsx lo carga aparte, así que la pantalla de los alumnos no lo descarga.
// No es secreto: quien conozca la dirección del archivo puede abrirlo. Nada de datos de clientes.
//
// Una entrada por id de slide. Todos los campos son opcionales:
//   minutos:   tiempo aproximado del slide
//   decir:     lo que explicas, en frases cortas; lo que el slide ya muestra no hace falta repetirlo
//   preguntar: una pregunta para la clase
//   ojo:       lo que suele confundirse o el dato que hay que decir con cuidado
//   paso:      la frase para pasar al siguiente slide
export const GUION = {
};
```

- [ ] **Paso 2: `GuionProfesor.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { EyeOff, ScrollText } from 'lucide-react';
import { bloqueDe } from './rotulos';
import { MONO } from './estilos';

// Un apartado del guion con su etiqueta en mono.
const Apartado = ({ etiqueta, texto, color = 'text-av-texto-2' }) => (
    <div>
        <p className={`mb-1 ${color} ${MONO}`}>{etiqueta}</p>
        <p>{texto}</p>
    </div>
);

// Guion del profesor, en la barra lateral del modo admin del avanzado.
// El archivo del guion se descarga aparte (import dinámico): la pantalla de los alumnos no lo baja.
// La tecla G lo oculta y lo vuelve a mostrar, por si se comparte pantalla.
const GuionProfesor = ({ slide, indice, total }) => {
    const [guion, setGuion] = useState(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        import('../../data/avanzado/guion-virtual-1.js').then((modulo) => setGuion(modulo.GUION));
    }, []);

    useEffect(() => {
        const alTeclear = (e) => {
            const t = e.target;
            if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
            if (e.key === 'g' || e.key === 'G') setVisible((v) => !v);
        };
        window.addEventListener('keydown', alTeclear);
        return () => window.removeEventListener('keydown', alTeclear);
    }, []);

    if (!visible) {
        return (
            <button type="button" onClick={() => setVisible(true)} className={`mx-4 mb-4 flex items-center gap-2 rounded-lg border border-av-linea px-3 py-2 text-av-texto-2 hover:text-av-texto ${MONO}`}>
                <ScrollText size={14} /> Mostrar guion (G)
            </button>
        );
    }

    const entrada = guion?.[slide.id];
    const bloque = bloqueDe(slide.id);
    return (
        <section data-guion aria-label="Guion del profesor" className="mx-4 mb-4 flex min-h-0 flex-1 flex-col rounded-xl border border-av-linea bg-av-panel">
            <header className={`flex items-center justify-between gap-2 border-b border-av-linea px-4 py-2.5 ${MONO}`}>
                <span className="text-av-acento">
                    Guion{bloque ? ` · Bloque ${bloque}` : ''} · {String(indice + 1).padStart(2, '0')}/{total}{entrada?.minutos ? ` · ${entrada.minutos} min` : ''}
                </span>
                <button type="button" onClick={() => setVisible(false)} title="Ocultar guion (G)" aria-label="Ocultar guion" className="text-av-texto-2 hover:text-av-texto">
                    <EyeOff size={14} />
                </button>
            </header>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3 text-[14px] leading-relaxed text-av-texto">
                {!guion && <p className="text-av-texto-2">Cargando…</p>}
                {guion && !entrada && <p className="text-av-texto-2">Sin guion para este slide todavía.</p>}
                {entrada?.decir?.length > 0 && (
                    <ul className="space-y-2">
                        {entrada.decir.map((linea, i) => (
                            <li key={i} className="border-l-2 border-av-acento/60 pl-3">{linea}</li>
                        ))}
                    </ul>
                )}
                {entrada?.preguntar && <Apartado etiqueta="Pregunta a la clase" texto={entrada.preguntar} />}
                {entrada?.ojo && <Apartado etiqueta="Ojo" texto={entrada.ojo} color="text-av-alerta" />}
                {entrada?.paso && <Apartado etiqueta="Paso al siguiente" texto={entrada.paso} />}
            </div>
        </section>
    );
};

export default GuionProfesor;
```

- [ ] **Paso 3: montarlo en `AppLayout.jsx`** (buscar por texto; los números de línea ya cambiaron):

1. Después de `import SlideAvanzado from '../avanzado/SlideAvanzado';` agregar
   `import GuionProfesor from '../avanzado/GuionProfesor';`.
2. En el template del `<aside>` lateral, cambiar `left-0 w-72 ${M.lateralColor}` por
   `left-0 ${ES_AVANZADO && isAdmin ? 'w-80' : 'w-72'} ${M.lateralColor}`.
3. Cambiar el `className` del `<nav>` de
   `"flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent"`
   a
   ``{`${ES_AVANZADO && isAdmin ? 'flex-none' : 'flex-1'} overflow-y-auto py-6 px-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent`}``.
4. Justo después de `</nav>` agregar:

```jsx
                {ES_AVANZADO && isAdmin && (
                    <GuionProfesor slide={activeSlide} indice={safeSlideIndex} total={totalSlides} />
                )}
```

- [ ] **Paso 4: el recorrido comprueba quién ve el guion.** En `docs/revision/recorrido-avanzado.mjs`:

a) En la parte 2, justo después de `await pagina.waitForSelector('[data-slide-id="v1-1-1"]');`, agregar:

```js
    if (!(await pagina.locator('[data-guion]').count())) problemas.push('admin: no ve el guion');
```

b) Justo antes de `await navegador.close();` (dentro de `if (!solo)`, al final del bloque), agregar:

```js
    // 4. Vista de alumno: no ve el guion ni descarga su archivo.
    const alumno = await navegador.newContext(TAMANOS.escritorio);
    await alumno.addInitScript(() => localStorage.setItem('course_participant', JSON.stringify({ id: 'prueba', name: 'Prueba' })));
    await alumno.route(/supabase\.co/, (ruta) => ruta.abort());
    const paginaAlumno = await alumno.newPage();
    const pedidosGuion = [];
    paginaAlumno.on('request', (r) => { if (/guion/i.test(r.url())) pedidosGuion.push(r.url()); });
    await paginaAlumno.goto(url);
    await paginaAlumno.waitForSelector('[data-slide-id]', { timeout: 10000 }).catch(() => problemas.push('alumno: no cargó el slide'));
    await paginaAlumno.waitForTimeout(1000);
    if (await paginaAlumno.locator('[data-guion]').count()) problemas.push('alumno: ve el guion');
    if (pedidosGuion.length) problemas.push(`alumno: descargó el guion (${pedidosGuion.join(', ')})`);
    await paginaAlumno.screenshot({ path: `${salida}/00-alumno-escritorio.png` });
    await alumno.close();
```

(Queda dentro de `if (!solo) { … }`: pegarlo antes de la llave que cierra ese bloque, después del
bucle de la bienvenida.)

- [ ] **Paso 5: comprobación B.** Esperado: dos builds y `✖ 52 problems`. Además, el guion sale en
un archivo aparte solo en el avanzado:
`ls dist/assets | grep -i guion` → un `guion-virtual-1-*.js`.

- [ ] **Paso 6: mirar el guion con contenido de prueba.** Agregar **temporalmente** esta entrada
dentro de `GUION`:

```js
    'v1-2-1': { minutos: 3, decir: ['PRUEBA línea uno', 'PRUEBA línea dos, más larga para ver cómo corta el renglón en la barra lateral'], preguntar: 'PRUEBA pregunta', ojo: 'PRUEBA ojo', paso: 'PRUEBA paso' },
```

Hacer `VITE_COURSE=avanzado npx vite build`. Con V corriendo, en el navegador integrado (admin
activado como en la tarea 5, paso 6), ir a «Tokens: la moneda de la IA» (slide 6). Confirmar:
- el panel dice «Guion · Bloque 2 · 06/44 · 3 min», con las dos líneas y los tres apartados;
- en otro slide dice «Sin guion para este slide todavía.»;
- la tecla G lo oculta y deja «Mostrar guion (G)»; otra G lo vuelve a mostrar;
- con flechas se sigue cambiando de slide, y el guion cambia con el slide.

Hacer captura con `computer` → `screenshot` para el informe. Después **quitar la entrada de prueba**
y comprobar: `grep -c PRUEBA /d/curso_IA/client/src/data/avanzado/guion-virtual-1.js` → `0`.

- [ ] **Paso 7: comprobación B y R completo** (sin `IDS`). Esperado: `Sin problemas.`, que incluye
«admin ve el guion» y «alumno no lo ve ni lo descarga». Mirar `00-alumno-escritorio.png`.

- [ ] **Paso 8: commit**

```bash
cd /d/curso_IA && git add client/src/data/avanzado/guion-virtual-1.js client/src/components/avanzado/GuionProfesor.jsx client/src/components/layout/AppLayout.jsx docs/revision/recorrido-avanzado.mjs && git commit -m "feat(avanzado): guion del profesor en la barra lateral del modo admin"
```

---

### Tarea 26: verificación final (la vara del encargo)

- [ ] **Paso 1: no queda ningún tipo de la Virtual 1 en el respaldo**

```bash
cd /d/curso_IA/client && grep -oE "^\s+'?[a-z-]+'?: [A-Z][a-z]+," src/components/avanzado/SlideAvanzado.jsx | wc -l
```

Esperado: `18` (hero, profile, poll, analogy, stat-comparison, comparison, narrative, warning,
prompt-template, list-comparison, break, feature-highlight, concept, exercise-interactive,
gallery-view, summary, next-steps, resources-download).

- [ ] **Paso 2: comprobación B.** Los dos builds pasan y `✖ 52 problems` o menos.

- [ ] **Paso 3: prueba de rótulos.** `cd /d/curso_IA/client && node --test src/components/avanzado/rotulos.test.js` → `# fail 0`.

- [ ] **Paso 4: recorrido completo.** Borrar las capturas de prueba (`rm -rf /d/curso_IA/docs/revision/capturas-avanzado`)
y hacer R **sin** `IDS`. Esperado: `Sin problemas.` (el recorrido incluye el H1 completo con
movimiento reducido, que no haya desborde, la órbita que gira, la cifra que cuenta, el remate que
entra al final y la bienvenida). Deben quedar 88 capturas `NN-<id>-{escritorio,movil}.png` más las
`-fin`, `movimiento-*.png` y `00-bienvenida-*.png`. Comprobar la cantidad:
`ls /d/curso_IA/docs/revision/capturas-avanzado | grep -cE "^[0-9]{2}-v1-.*-(escritorio|movil)\.png$"` → `88`.

- [ ] **Paso 5: revisar las 88 a ojo.** Leer cada captura con Read (de a varias por mensaje). Anotar
en una lista cualquier slide con texto cortado, solapado, ilegible o con el título repetido, y
corregirlo antes de seguir. Mirar además `movimiento-v1-2-2-inicio.png` (a medio entrar) contra
`movimiento-v1-2-2-fin.png` (completo).

- [ ] **Paso 6: el básico queda igual**

```bash
cd /d/curso_IA/client && npx vite build >/dev/null && cp /d/curso_IA/docs/revision/comparar-basico.mjs /d/tmp/pw-curso/ && node /d/tmp/pw-curso/comparar-basico.mjs http://localhost:4173 D:/curso_IA/docs/revision/capturas-avanzado
cd /d/curso_IA/docs/revision && python -c "
from PIL import Image, ImageChops
for i in (1, 2, 3):
    a = Image.open(f'capturas/basico-{i}-escritorio.png').convert('RGB')
    b = Image.open(f'capturas-avanzado/basico-{i}-escritorio.png').convert('RGB')
    caja = ImageChops.difference(a, b).point(lambda v: 255 if v > 24 else 0).convert('L')
    distintos = sum(1 for v in caja.getdata() if v)
    print(i, f'{100 * distintos / (a.width * a.height):.2f} % de píxeles distintos')
"
```

Esperado: menos de 0,5 % en cada una (restos de antialias o de la barra de admin). Si alguna pasa
de eso, abrir las dos con Read y explicar la diferencia: si es del marco o de un slide, es un error
de este plan y hay que corregirlo. Al terminar, volver a construir el avanzado
(`VITE_COURSE=avanzado npx vite build`) para que `dist/` quede como estaba.

- [ ] **Paso 7: registrar el avance.** Agregar una línea al final de
`docs/revision/2026-09-24-virtual-1-progreso.md` con el formato de las anteriores: «Tema nocturno
(dirección B) con animaciones: 18 tipos con variante en `client/src/components/avanzado/`, build
con y sin la variable, eslint N, 88 capturas en `docs/revision/capturas-avanzado/`, básico igual
(X %, Y %, Z %). Sigue: revisión (`claude-opus-5-5` / `medium`).»

- [ ] **Paso 8: commit**

```bash
cd /d/curso_IA && git add docs/revision/capturas-avanzado docs/revision/2026-09-24-virtual-1-progreso.md client && git commit -m "docs(avanzado): capturas y verificación del tema nocturno"
```

Sin push: la rama `curso-avanzado-v1` no se sube hasta que José Luis lo pida.

---

## Qué queda fuera de este plan

- Tema A («Editorial jurídico») para el sábado: solo quedan preparados los tokens.
- El cajón de notas, `AdminLogin`, `AdminPanel`, `FeedbackPanel`, `LivePoll`, `GallerySubmit` y
  `GalleryDisplay` siguen claros.
- El `<title>` y la descripción de `client/index.html` siguen diciendo «Curso introductorio».
- Los emojis de los 4 slides reutilizados del básico se quedan, porque son datos.
- Ideas de interacción más allá de presentar (mascota, etc.): encargo aparte,
  `docs/prompts/2026-09-24-experiencia-interactiva.md`.
- El texto de los 44 guiones del profesor: encargo aparte, `docs/prompts/2026-09-24-guion-virtual-1.md`.
  Este plan deja el panel y el archivo vacío con su formato.
