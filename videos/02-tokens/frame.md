---
colors:
  fondo: "#0F172A"
  panel: "#1E293B"
  linea: "#334155"
  texto: "#F8FAFC"
  texto-2: "#94A3B8"
  acento: "#D69E2E"
  token-1: "#BFDBFE"
  token-2: "#A7F3D0"
  token-3: "#FECDD3"
  token-4: "#DDD6FE"
  token-5: "#FDE68A"
  sobre-token: "#0F172A"
  halo: "#3182CE"
typography:
  H:
    family: "Inter"
    weights: [400, 700, 900]
  M:
    family: "IBM Plex Mono"
    weights: [400, 700]
---

# Especificación de diseño — serie básica de videos

Normativa para los 8 videos de la serie. Los valores salen de las diapositivas del curso
básico; donde las diapositivas no tienen un color para el rol, se deriva de las que sí usan.

## Colores y procedencia

| Rol | Valor | De dónde sale |
|---|---|---|
| `--fondo` | `#0F172A` | `bg-slate-900`, el fondo oscuro de las diapositivas del básico |
| `--panel` | `#1E293B` | `bg-slate-800`, los paneles sobre fondo oscuro |
| `--linea` | `#334155` | `border-slate-700`, los bordes sobre fondo oscuro |
| `--texto` | `#F8FAFC` | `slate-50`, el claro de las diapositivas |
| `--texto-2` | `#94A3B8` | `text-slate-400` |
| `--acento` | `#D69E2E` | `accent` de `client/tailwind.config.js` (el dorado del curso) |
| `--token-1` | `#BFDBFE` | `blue-200`: la familia azul (`secondary`, `bg-blue-*`) del básico, en claro |
| `--token-2` | `#A7F3D0` | `emerald-200`: la familia `emerald-*` del básico, en claro |
| `--token-3` | `#FECDD3` | `rose-200`: derivado; el básico no tiene rojo, hace falta un quinto tono distinto |
| `--token-4` | `#DDD6FE` | `violet-200`: derivado del `to-indigo-600` de los degradados del básico |
| `--token-5` | `#FDE68A` | `amber-200`: la familia del acento, en claro; se distingue del acento por su luminosidad |
| `--sobre-token` | `#0F172A` | el mismo `slate-900` del fondo |
| `--halo` | `#3182CE` | `secondary` del básico, al 22 % en el halo del fondo. Con el acento dorado el halo salía gris pardo: dorado y azul marino son opuestos y se neutralizan |

## Contraste (WCAG)

| Par | Sobre `--fondo` | Sobre `--panel` |
|---|---|---|
| `--texto` | 17,06 | 13,98 |
| `--texto-2` | 6,96 | 5,71 |
| `--acento` | 7,47 | 6,12 |

`--sobre-token` sobre los cinco tokens: 12,56 · 13,92 · 12,66 · 12,86 · 14,33. Todos pasan AA
(4,5) y AAA para texto grande. `--linea` sobre `--fondo` da 1,72: es decorativa, no lleva texto.

## Dos voces

- **Fuente H, Inter** (la del curso básico, `fontFamily.sans`): la voz humana. Preguntas,
  frases, «palabras». Pesos 400, 700 y 900.
- **Fuente M, IBM Plex Mono** (la mono del curso avanzado; el básico no tiene mono): la voz de
  la máquina. Tokens, números, contador, rótulos. Pesos 400 y 700. Avance fijo de 0,6 em, del
  que dependen los cortes de las escenas 2 y 7.

Las dos vienen incluidas en HyperFrames: no hay `@font-face` ni descarga. Inter figura en la
lista de fuentes «genéricas» de la skill; se usa igual porque es la fuente del curso.

## Contador

Abajo a la izquierda. El rectángulo x 150–760, y 740–1000 queda libre en todas las escenas
menos la 8, donde el contador viaja al centro.

## Bloques de token

`font-family: 'IBM Plex Mono'; font-weight: 700; line-height: 1; padding: 20px 26px;
border-radius: 14px; color: var(--sobre-token);` con fondo `--token-1` … `--token-5` en ese
orden, repitiendo desde `--token-1` después del quinto. Un bloque que empieza con espacio se
muestra sin el espacio.

## Márgenes

Contenido dentro de x 192–1728, y 108–972.
