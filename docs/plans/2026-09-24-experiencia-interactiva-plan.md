# Plan de ejecución: «decide y después revela» en la Virtual 1

> **Para el ejecutor:** sigue las tareas en orden, una a la vez. Pasos con casillas (`- [ ]`).
> **Sin commit ni push:** José Luis los pide aparte. Al terminar cada tarea, corre su comando de
> verificación y anota el resultado en tu informe.

**Objetivo:** un tipo de slide `decide-revela`, sin backend, con cuatro usos en la Virtual 1, y la
lista A aplicada: la Virtual 1 queda en 40 slides.

**Arquitectura:** la lógica pura (`correctas`, `opcionesDe`, `puntaje`, `validar`, `leerEstado`,
`guardarEstado`) va en `decide.js` y se prueba con `node:test`. `DecideRevela.jsx` pinta los tres
estados y se registra en `TIPOS` de `SlideAvanzado.jsx`. `VentanaContexto.jsx` es la animación del
uso 1. La interfaz se prueba en el navegador con `docs/revision/recorrido-avanzado.mjs` (Playwright),
que se amplía primero para que falle.

**Tecnología:** React 18, framer-motion 11, lucide-react, Tailwind con tokens `av-*`, Vite 6,
Node 22 (`node --test`). Sin dependencias nuevas.

**Entrada:** `docs/plans/2026-09-24-experiencia-interactiva-diseno.md` (aprobado el 24 sep 2026).
**Encargo:** `docs/prompts/2026-09-24-plan-experiencia-interactiva.md`.

---

## Reparto

| Rol | Modelo | Effort | Qué hace | ¿Medido? |
|---|---|---|---|---|
| Planeador | `claude-opus-5-5` | `high` | Este plan | No |
| Controlador | `claude-opus-5-5` | el de la sesión | Lanza al ejecutor y al revisor, lee sus informes, anota la bitácora | No |
| Ejecutor | `sonnet` | `medium` pedido; el `Agent` no fija effort, hereda el de la sesión | Tareas 1 a 8 | No |
| Revisor | `claude-opus-5-5` | `medium` pedido; mismo límite | Tarea 9 | No |

Ninguna de estas asignaciones está medida (`COMO-TRABAJAR.md` §7). Al terminar, una línea por rol en
`~/.claude/BITACORA.md`.

## Estado de partida (verificado el 24 sep 2026)

- `git status` limpio en `curso-avanzado-v1`; nada en stage. El riesgo 5 del diseño (tema nocturno a
  medias) está cerrado: último commit del tema, `8b6986d`.
- `node --test "client/src/components/avanzado/**/*.test.js"`: en verde.
- `npx eslint .` (desde `client/`): **52 problemas**. Tope después del plan: 52.
- `VIRTUAL_1.js` tiene 41 slides. `recorrido-avanzado.mjs` todavía recorre 44 (quedó viejo).

## Decisiones del plan (el ejecutor no las reabre)

1. **`key={slide.id}`** dentro de `DecideRevela`: `SlideAvanzado` no remonta al cambiar de slide
   (no tiene `key`), y el estado de un slide no debe pasar a otro.
2. **`role="radiogroup"` con `aria-labelledby`**, no `<fieldset>`/`<legend>`: el `legend` no se deja
   poner en fila con los botones del semáforo. Los radios siguen siendo `<input type="radio">`
   nativos con el mismo `name`: Tab, flechas y lector de pantalla funcionan igual.
3. **«Alto fijo» de la ventana:** los nueve mensajes ocupan su lugar desde el inicio con opacidad 0.
   El alto no salta mientras aparecen, sin fijar un número de píxeles.
4. **`VentanaContexto` se importa de forma estática.** Es chica; `lazy` obligaría a un `Suspense`.
5. **«El curso dice» en cazar la frase:** dice «la frase 3», no la frase entera.
6. **El resultado:** con un item, el texto del item («Coincide» o «El curso dice: …»). Con más de uno,
   «Coincidiste en A de T» (T = total de items); si no respondió ninguno, «Estas son las respuestas
   del curso».
7. **El contenido real se valida en el navegador**, no en `node --test`: `VIRTUAL_1.js` importa rutas
   sin extensión y Node no lo carga. El recorrido corre contra el servidor de desarrollo, donde
   `validar` está activo, y falla si aparece la caja `[data-decide-errores]`.
8. **Huérfano que limpia la lista A:** la sugerencia de `v1-7-6` habla del «prompt aún mejor», que deja
   de existir con ese nombre. Pasa a «prompt mejor del paso 3».

## Archivos

| Archivo | Tarea | Qué |
|---|---|---|
| `client/src/components/avanzado/decide.js` | 1 | Crear. Lógica pura |
| `client/src/components/avanzado/decide.test.js` | 1 | Crear. Pruebas `node:test` |
| `docs/revision/recorrido-avanzado.mjs` | 2 | 44 → 40, caja de errores y sección 6 |
| `client/src/components/avanzado/tipos/DecideRevela.jsx` | 3 | Crear |
| `client/src/components/avanzado/SlideAvanzado.jsx` | 3 | Registrar `'decide-revela'` |
| `client/src/components/avanzado/VentanaContexto.jsx` | 4 | Crear |
| `client/src/data/avanzado/VIRTUAL_1.js` | 3, 4, 5, 6 | Los cuatro usos y la lista A |
| `client/src/components/avanzado/rotulos.test.js` | 6 | 41 → 40 ids |
| `docs/prompts/2026-09-24-guion-virtual-1.md` | 8 | 44 → 40 slides, minutos nuevos |

## Cómo levantar el curso avanzado (lo usan las tareas 2 a 7)

Servidor de desarrollo, en segundo plano, desde `D:\curso_IA`:

```bash
VITE_COURSE=avanzado npm --prefix client run dev
```

Queda en `http://localhost:5173`. Sin `VITE_COURSE=avanzado` se ve el curso básico.

El recorrido se corre desde `D:\tmp\pw-curso`, donde está instalado Playwright. Cada vez, copiar la
versión del repo y correrla (las capturas van fuera del repo):

```bash
cp /d/curso_IA/docs/revision/recorrido-avanzado.mjs /d/tmp/pw-curso/ && node /d/tmp/pw-curso/recorrido-avanzado.mjs http://localhost:5173 /d/tmp/pw-curso/capturas-decide v1-2-4a,v1-3-7,v1-6-4,v1-8-0
```

Imprime «Sin problemas.» y sale con 0, o la lista de problemas y sale con 1.

---

### Tarea 1: `decide.js` y sus pruebas

**Archivos:** crear `client/src/components/avanzado/decide.js` y
`client/src/components/avanzado/decide.test.js`.

- [ ] **Paso 1: escribir la prueba que falla**

`client/src/components/avanzado/decide.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { correctas, opcionesDe, puntaje, validar, leerEstado, guardarEstado } from './decide.js';

test('correctas acepta un índice o una lista', () => {
    assert.deepEqual(correctas({ correcta: 1 }), [1]);
    assert.deepEqual(correctas({ correcta: [1, 2] }), [1, 2]);
});

test('opcionesDe usa las del item y, si no trae, las comunes del slide', () => {
    assert.deepEqual(opcionesDe({ opciones: ['x'] }, { opciones: ['y'] }), ['x']);
    assert.deepEqual(opcionesDe({}, { opciones: ['y'] }), ['y']);
    assert.deepEqual(opcionesDe({}, {}), []);
});

const ITEMS = [
    { id: 'a', correcta: 0 },
    { id: 'b', correcta: [1, 2] },
    { id: 'c', correcta: 2 },
];

test('puntaje cuenta los aciertos entre los respondidos; en una lista vale cualquiera', () => {
    assert.deepEqual(puntaje(ITEMS, {}), { aciertos: 0, respondidos: 0, total: 3 });
    assert.deepEqual(puntaje(ITEMS, { a: 0 }), { aciertos: 1, respondidos: 1, total: 3 });
    assert.deepEqual(puntaje(ITEMS, { a: 0, b: 2, c: 1 }), { aciertos: 2, respondidos: 3, total: 3 });
    assert.deepEqual(puntaje(ITEMS, { a: 1, b: 0 }), { aciertos: 0, respondidos: 2, total: 3 });
});

const BIEN = {
    opciones: ['Verde', 'Amarillo', 'Rojo'],
    items: [
        { id: 'uno', texto: 'Dato uno', correcta: 0, porque: 'Porque sí.' },
        { id: 'dos', texto: 'Dato dos', correcta: [1, 2], porque: 'Porque también.' },
    ],
};
const con = (cambios) => ({ ...BIEN, ...cambios });
const conItem = (cambios) => con({ items: [{ ...BIEN.items[0], ...cambios }] });

test('validar: un contentData correcto no tiene errores', () => {
    assert.deepEqual(validar(BIEN), []);
});

test('validar: sin items', () => {
    assert.deepEqual(validar(con({ items: [] })), ['Faltan los items']);
    assert.deepEqual(validar({}), ['Faltan los items']);
});

test('validar: id repetido', () => {
    assert.deepEqual(validar(con({ items: [BIEN.items[0], BIEN.items[0]] })), ['id repetido: uno']);
});

test('validar: correcta fuera de rango, como número y dentro de una lista', () => {
    assert.deepEqual(validar(conItem({ correcta: 3 })), ['uno: correcta fuera de rango (3)']);
    assert.deepEqual(validar(conItem({ correcta: -1 })), ['uno: correcta fuera de rango (-1)']);
    assert.deepEqual(validar(conItem({ correcta: [1, 5] })), ['uno: correcta fuera de rango (5)']);
});

test('validar: correcta como lista vacía', () => {
    assert.deepEqual(validar(conItem({ correcta: [] })), ['uno: correcta es una lista vacía']);
});

test('validar: porque vacío', () => {
    assert.deepEqual(validar(conItem({ porque: '  ' })), ['uno: porque vacío']);
});

test('validar: item sin opciones', () => {
    assert.deepEqual(validar({ items: [{ id: 'x', correcta: 0, porque: 'p' }] }), ['x: sin opciones', 'x: correcta fuera de rango (0)']);
});

test('validar: animacion sin mensajes', () => {
    assert.deepEqual(validar(con({ animacion: 'ventana-contexto' })), ['animacion sin mensajes']);
});

// sessionStorage no existe en Node: se simula con defineProperty y se quita al final.
function ponerStorage(valor) {
    Object.defineProperty(globalThis, 'sessionStorage', { value: valor, configurable: true, writable: true });
}

test('leerEstado y guardarEstado usan la clave decide:<id> y toleran fallos', () => {
    const memoria = new Map();
    ponerStorage({ getItem: (k) => memoria.get(k) ?? null, setItem: (k, v) => memoria.set(k, v) });
    assert.deepEqual(leerEstado('v1-6-4'), { elecciones: {}, revelado: false });

    guardarEstado('v1-6-4', { elecciones: { plantilla: 0 }, revelado: true });
    assert.equal(memoria.get('decide:v1-6-4'), '{"elecciones":{"plantilla":0},"revelado":true}');
    assert.deepEqual(leerEstado('v1-6-4'), { elecciones: { plantilla: 0 }, revelado: true });

    memoria.set('decide:roto', '{no es json');
    assert.deepEqual(leerEstado('roto'), { elecciones: {}, revelado: false });
    memoria.set('decide:nulo', '{"elecciones":null}');
    assert.deepEqual(leerEstado('nulo'), { elecciones: {}, revelado: false });

    const falla = () => { throw new Error('bloqueado'); };
    ponerStorage({ getItem: falla, setItem: falla });
    assert.deepEqual(leerEstado('v1-6-4'), { elecciones: {}, revelado: false });
    assert.doesNotThrow(() => guardarEstado('v1-6-4', { elecciones: {}, revelado: false }));

    delete globalThis.sessionStorage;
});
```

- [ ] **Paso 2: correrla y ver que falla**

```bash
node --test client/src/components/avanzado/decide.test.js
```

Esperado: falla con `Cannot find module '…/decide.js'`.

- [ ] **Paso 3: escribir `decide.js`**

`client/src/components/avanzado/decide.js`:

```js
// Lógica del tipo «decide y después revela», sin React. La usan DecideRevela.jsx y decide.test.js.

// Índices que el curso da por buenos: `correcta` es un índice o una lista de índices.
export function correctas(item) {
    return Array.isArray(item.correcta) ? item.correcta : [item.correcta];
}

// Las opciones del item o, si no trae, las comunes del slide (el semáforo).
export function opcionesDe(item, datos) {
    return item.opciones || datos.opciones || [];
}

// elecciones: { [item.id]: índice }. Un item sin responder no suma ni resta.
export function puntaje(items, elecciones) {
    const respondidos = items.filter((item) => elecciones[item.id] !== undefined);
    const aciertos = respondidos.filter((item) => correctas(item).includes(elecciones[item.id])).length;
    return { aciertos, respondidos: respondidos.length, total: items.length };
}

// Errores del contentData, para la caja roja en desarrollo. Lista vacía si está bien.
export function validar(datos) {
    const items = datos.items;
    if (!Array.isArray(items) || items.length === 0) return ['Faltan los items'];
    const errores = [];
    const vistos = new Set();
    for (const item of items) {
        if (vistos.has(item.id)) errores.push(`id repetido: ${item.id}`);
        vistos.add(item.id);
        const opciones = opcionesDe(item, datos);
        if (opciones.length === 0) errores.push(`${item.id}: sin opciones`);
        const lista = correctas(item);
        if (lista.length === 0) errores.push(`${item.id}: correcta es una lista vacía`);
        for (const i of lista) {
            if (!Number.isInteger(i) || i < 0 || i >= opciones.length) errores.push(`${item.id}: correcta fuera de rango (${i})`);
        }
        if (!item.porque || !item.porque.trim()) errores.push(`${item.id}: porque vacío`);
    }
    if (datos.animacion && !datos.mensajes?.length) errores.push('animacion sin mensajes');
    return errores;
}

// Lo marcado se guarda en sessionStorage (decide:<id>): en el celular, al volver de Zoom, la pestaña
// suele recargarse. Si no hay sessionStorage o el dato está roto, se empieza de cero.
export function leerEstado(id) {
    try {
        const guardado = JSON.parse(sessionStorage.getItem(`decide:${id}`));
        if (guardado?.elecciones && typeof guardado.elecciones === 'object') {
            return { elecciones: guardado.elecciones, revelado: Boolean(guardado.revelado) };
        }
    } catch {
        // Sin sessionStorage o con un dato roto: estado vacío.
    }
    return { elecciones: {}, revelado: false };
}

export function guardarEstado(id, estado) {
    try {
        sessionStorage.setItem(`decide:${id}`, JSON.stringify(estado));
    } catch {
        // Sin sessionStorage el slide funciona igual, sin guardar.
    }
}
```

- [ ] **Paso 4: correr las pruebas y verlas pasar**

```bash
node --test "client/src/components/avanzado/**/*.test.js"
```

Esperado: todas en verde (las de `rotulos` y las nuevas de `decide`), `# fail 0`.

---

### Tarea 2: el recorrido prueba primero lo que todavía no existe

**Archivo:** `docs/revision/recorrido-avanzado.mjs`.

- [ ] **Paso 1: 44 → 40 y el slide 40 debe ser `v1-8-3`**

En las líneas 1, 4 y 48, cambiar «44» por «40» en los comentarios. En el bucle de la sección 1,
reemplazar `for (let i = 1; i <= 44; i++) {` por `for (let i = 1; i <= 40; i++) {` y
`if (i < 44) await avanzar(pagina);` por:

```js
        if (i === 40 && id !== 'v1-8-3') problemas.push(`${nombre}: el slide 40 es ${id}, no v1-8-3 (la Virtual 1 debe tener 40)`);
        if (i < 40) await avanzar(pagina);
```

Justo después de `if (!completo) problemas.push(…);` agregar:

```js
        // Solo en desarrollo: validar() pinta esta caja si el contentData de decide-revela está mal.
        if (await pagina.locator('[data-decide-errores]').count()) problemas.push(`${nombre} ${id}: decide-revela con errores de contenido`);
```

- [ ] **Paso 2: sección 6, siempre (también con la lista de ids)**

Justo antes de `await navegador.close();` (después del `if (!solo) { … }`), agregar:

```js
// 6. decide-revela: elegir, recargar y volver sin perder lo marcado, revelar con el foco en el resultado.
{
    const { contexto, pagina } = await abrir({ ...TAMANOS.escritorio, reducedMotion: 'reduce' });
    const ir = async (destino) => {
        await pagina.waitForSelector('[data-slide-id]');
        for (let n = 0; n < 45 && (await idActual(pagina)) !== destino; n++) await avanzar(pagina);
        return (await idActual(pagina)) === destino;
    };
    const estado = () => pagina.getAttribute('[data-decide]', 'data-estado').catch(() => null);
    const foco = () => pagina.evaluate(() => document.activeElement?.hasAttribute('data-resultado') ?? false);

    // Semáforo: elegir, recargar, salir y volver, revelar.
    if (!(await ir('v1-6-4'))) problemas.push('decide: no se llegó a v1-6-4');
    else {
        if (await estado() !== 'sin-responder') problemas.push(`decide v1-6-4: empieza en ${await estado()}, no sin-responder`);
        await pagina.locator('[data-decide] label').first().click();
        if (await estado() !== 'respondido') problemas.push('decide v1-6-4: al elegir no pasa a respondido');
        if (!(await pagina.textContent('[data-contador]'))?.includes('1 de 10')) problemas.push('decide v1-6-4: el contador no dice 1 de 10');

        await pagina.reload();
        await ir('v1-6-4');
        if (!(await pagina.locator('[data-decide] input[type="radio"]').first().isChecked())) problemas.push('decide v1-6-4: al recargar se pierde lo marcado');

        await avanzar(pagina);
        await pagina.keyboard.press('ArrowLeft');
        await pagina.waitForSelector('[data-slide-id="v1-6-4"]');
        if (await estado() !== 'respondido') problemas.push('decide v1-6-4: al salir y volver se pierde lo marcado');

        await pagina.getByRole('button', { name: 'Ver respuestas' }).click();
        if (await estado() !== 'revelado') problemas.push('decide v1-6-4: el botón no revela');
        if ((await pagina.textContent('[data-resultado]'))?.trim() !== 'Coincidiste en 1 de 10') problemas.push(`decide v1-6-4: el resultado dice «${await pagina.textContent('[data-resultado]')}»`);
        if (!(await foco())) problemas.push('decide v1-6-4: el foco no pasa al resultado');
        if (await pagina.locator('[data-decide] input[type="radio"]:not(:disabled)').count()) problemas.push('decide v1-6-4: quedan opciones activas después de revelar');
        if (!(await pagina.getByText('Dónde puede ir cada color').isVisible())) problemas.push('decide v1-6-4: no aparece el cierre');
        await pagina.screenshot({ path: `${salida}/decide-v1-6-4-escritorio.png`, fullPage: true });
        await pagina.setViewportSize(TAMANOS.movil.viewport);
        if (await pagina.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) problemas.push('decide v1-6-4: desborde horizontal a 375 px');
        await pagina.screenshot({ path: `${salida}/decide-v1-6-4-movil.png`, fullPage: true });
        await pagina.setViewportSize(TAMANOS.escritorio.viewport);
    }
    await contexto.close();

    // Caza la alucinación y ventana de contexto, en un contexto nuevo (sessionStorage vacío).
    const c2 = await abrir({ ...TAMANOS.escritorio, reducedMotion: 'reduce' });
    const p2 = c2.pagina;
    const ir2 = async (destino) => {
        await p2.waitForSelector('[data-slide-id]');
        for (let n = 0; n < 45 && (await idActual(p2)) !== destino; n++) await avanzar(p2);
        return (await idActual(p2)) === destino;
    };
    if (!(await ir2('v1-2-4a'))) problemas.push('decide: no se llegó a v1-2-4a');
    else {
        if (!(await p2.locator('[data-ventana-contexto]').count())) problemas.push('decide v1-2-4a: no se pinta la ventana');
        await p2.getByRole('button', { name: 'Ver respuesta' }).click();
        if (!(await p2.getByText('Fuera de la ventana').isVisible())) problemas.push('decide v1-2-4a: al revelar no se marca lo que quedó fuera');
        if (!(await p2.getByText('Ventana de contexto', { exact: true }).isVisible())) problemas.push('decide v1-2-4a: al revelar no aparece el marco');
        await p2.screenshot({ path: `${salida}/decide-v1-2-4a-escritorio.png`, fullPage: true });
    }
    if (!(await ir2('v1-3-7'))) problemas.push('decide: no se llegó a v1-3-7');
    else {
        await p2.locator('[data-decide] label').nth(2).click();
        await p2.getByRole('button', { name: 'Ver respuesta' }).click();
        if ((await p2.textContent('[data-resultado]'))?.trim() !== 'Coincide') problemas.push(`decide v1-3-7: el resultado dice «${await p2.textContent('[data-resultado]')}»`);
        if (await p2.getByText('Inventada', { exact: true }).count() !== 1) problemas.push('decide v1-3-7: no hay exactamente una frase «Inventada»');
        if (await p2.getByText('Cierta', { exact: true }).count() !== 3) problemas.push('decide v1-3-7: no hay tres frases «Cierta»');
        await p2.screenshot({ path: `${salida}/decide-v1-3-7-escritorio.png`, fullPage: true });
    }
    await c2.contexto.close();
}
```

- [ ] **Paso 3: correrlo y ver que falla**

Con el servidor de desarrollo levantado (ver «Cómo levantar»), correr el recorrido.

Esperado: sale con 1. Entre los problemas: «el slide 40 es v1-8-2, no v1-8-3» (hoy hay 41),
«decide v1-6-4: empieza en null, no sin-responder» y «decide v1-2-4a: … no se llegó».

---

### Tarea 3: `DecideRevela.jsx`, su registro y el semáforo

**Archivos:** crear `client/src/components/avanzado/tipos/DecideRevela.jsx`; modificar
`client/src/components/avanzado/SlideAvanzado.jsx` y `client/src/data/avanzado/VIRTUAL_1.js`.

Como `VentanaContexto.jsx` todavía no existe, en esta tarea `DecideRevela` no la importa: el bloque
`datos.animacion` se agrega en la tarea 4.

- [ ] **Paso 1: escribir `DecideRevela.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { Item } from '../Movimiento';
import { Hechos } from '../Piezas';
import { correctas, guardarEstado, leerEstado, opcionesDe, puntaje, validar } from '../decide';
import { CAJA, H2, LEAD, MONO, PANEL } from '../estilos';

const OPCION = 'flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-av-linea px-3 py-2 text-[15px] leading-snug text-av-texto transition-colors hover:border-av-acento/60 peer-checked:border-av-acento peer-checked:bg-av-acento/15 peer-focus-visible:ring-2 peer-focus-visible:ring-av-acento peer-disabled:cursor-default peer-disabled:hover:border-av-linea motion-reduce:transition-none';
const BOTON = 'min-h-[44px] rounded-xl bg-av-acento px-5 py-2.5 font-semibold text-av-sobre-acento transition-colors hover:bg-av-acento-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-av-acento-2 focus-visible:ring-offset-2 focus-visible:ring-offset-av-fondo motion-reduce:transition-none';

// El alumno decide y después revela la respuesta del curso. Sin backend: lo marcado vive en sessionStorage.
// key: SlideAvanzado no remonta al cambiar de slide, y lo marcado en uno no debe pasar a otro.
const DecideRevela = ({ slide }) => <Contenido key={slide.id} slide={slide} />;

function Contenido({ slide }) {
    const datos = slide.contentData;
    const [estado, setEstado] = useState(() => leerEstado(slide.id));
    const resultado = useRef(null);
    const recienRevelado = useRef(false);

    useEffect(() => {
        guardarEstado(slide.id, estado);
    }, [slide.id, estado]);

    // El botón desaparece al revelar: el foco pasa al resultado para no perderse.
    useEffect(() => {
        if (recienRevelado.current) resultado.current?.focus();
        recienRevelado.current = false;
    }, [estado.revelado]);

    const errores = import.meta.env.DEV ? validar(datos) : [];
    if (errores.length) {
        return (
            <div data-decide-errores className="rounded-xl border border-av-alerta bg-av-alerta/10 p-5 text-av-texto">
                <p className={`text-av-alerta ${MONO}`}>decide-revela: contentData con errores</p>
                <ul className="mt-2 list-disc pl-5 text-[15px]">
                    {errores.map((e) => <li key={e}>{e}</li>)}
                </ul>
            </div>
        );
    }

    const { items } = datos;
    const cazar = Boolean(datos.pregunta);
    const clasificar = !cazar && Boolean(datos.opciones);
    const { aciertos, respondidos, total } = puntaje(items, estado.elecciones);
    const fase = estado.revelado ? 'revelado' : respondidos ? 'respondido' : 'sin-responder';

    const elegir = (itemId, indice) => setEstado((e) => ({ ...e, elecciones: { ...e.elecciones, [itemId]: indice } }));
    const revelar = () => {
        recienRevelado.current = true;
        setEstado((e) => ({ ...e, revelado: true }));
    };

    const cursoDice = (item) => {
        const primera = correctas(item)[0];
        return `El curso dice: ${cazar ? `la frase ${primera + 1}` : opcionesDe(item, datos)[primera]}`;
    };
    const resultadoDe = (item) => {
        const elegida = estado.elecciones[item.id];
        if (elegida === undefined) return { tipo: 'sin', texto: cursoDice(item) };
        if (correctas(item).includes(elegida)) return { tipo: 'coincide', texto: 'Coincide' };
        return { tipo: 'difiere', texto: cursoDice(item) };
    };
    const textoResultado = total > 1
        ? (respondidos ? `Coincidiste en ${aciertos} de ${total}` : 'Estas son las respuestas del curso')
        : resultadoDe(items[0]).texto;

    const pintarItem = (item) => {
        const opciones = opcionesDe(item, datos);
        const buenas = correctas(item);
        const r = resultadoDe(item);
        const idTexto = `${slide.id}-${item.id}-texto`;
        const idPorque = `${slide.id}-${item.id}-porque`;
        return (
            <div
                role="radiogroup"
                aria-labelledby={idTexto}
                aria-describedby={estado.revelado ? idPorque : undefined}
                className={clasificar ? 'md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-4' : ''}
            >
                <p
                    id={idTexto}
                    className={cazar
                        ? `mb-2 text-av-texto-2 ${MONO}`
                        : clasificar
                            ? 'text-[15px] leading-snug text-av-texto'
                            : 'mb-3 font-av-titulo text-lg font-semibold leading-snug text-av-texto'}
                >
                    {item.texto}
                </p>
                <div className={clasificar ? 'mt-3 grid grid-cols-3 gap-2 md:mt-0 md:flex' : 'grid gap-2'}>
                    {opciones.map((opcion, i) => (
                        <label key={i} className="block min-w-0">
                            <input
                                type="radio"
                                className="peer sr-only"
                                name={`${slide.id}-${item.id}`}
                                checked={estado.elecciones[item.id] === i}
                                disabled={estado.revelado}
                                onChange={() => elegir(item.id, i)}
                            />
                            <span className={`${OPCION} ${clasificar ? 'justify-center text-center md:whitespace-nowrap' : ''}`}>
                                <span className="flex-1">{opcion}</span>
                                {cazar && estado.revelado && (buenas.includes(i) ? (
                                    <span className={`flex shrink-0 items-center gap-1 text-av-alerta ${MONO}`}><X size={14} aria-hidden="true" />Inventada</span>
                                ) : (
                                    <span className={`flex shrink-0 items-center gap-1 text-av-acento ${MONO}`}><Check size={14} aria-hidden="true" />Cierta</span>
                                ))}
                            </span>
                        </label>
                    ))}
                </div>
                {estado.revelado && (
                    <div id={idPorque} className="mt-3 md:col-span-2">
                        <p className={`flex items-center gap-2 ${r.tipo === 'coincide' ? 'text-av-acento' : r.tipo === 'difiere' ? 'text-av-alerta' : 'text-av-texto-2'} ${MONO}`}>
                            {r.tipo === 'coincide' && <Check size={14} aria-hidden="true" />}
                            {r.tipo === 'difiere' && <X size={14} aria-hidden="true" />}
                            {r.texto}
                        </p>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-av-texto">{item.porque}</p>
                    </div>
                )}
            </div>
        );
    };

    const preguntas = (
        <div className="grid min-w-0 content-start gap-3">
            {cazar ? (
                <>
                    <Item className="ml-auto w-full rounded-2xl rounded-br-md bg-av-acento/15 px-4 py-3 text-[15px] leading-relaxed text-av-texto sm:w-auto sm:max-w-[60%]">
                        <p className={`mb-1 text-av-texto-2 ${MONO}`}>Tú</p>
                        {datos.pregunta}
                    </Item>
                    <Item className={`${PANEL} rounded-bl-md p-4`}>
                        <p className={`mb-2 text-av-texto-2 ${MONO}`}>IA</p>
                        {pintarItem(items[0])}
                    </Item>
                </>
            ) : (
                items.map((item) => (
                    <Item key={item.id} className={`${PANEL} ${clasificar ? 'px-4 py-3' : 'p-5'}`}>
                        {pintarItem(item)}
                    </Item>
                ))
            )}
            <Item aria-live="polite" className="flex flex-wrap items-center gap-4 pt-1">
                {estado.revelado ? (
                    <p
                        ref={resultado}
                        tabIndex={-1}
                        data-resultado
                        className="rounded-xl bg-av-acento px-5 py-3 font-av-titulo text-lg font-bold text-av-sobre-acento focus:outline-none focus-visible:ring-2 focus-visible:ring-av-acento-2"
                    >
                        {textoResultado}
                    </p>
                ) : (
                    <>
                        <button type="button" onClick={revelar} className={BOTON}>
                            {datos.boton || (total > 1 ? 'Ver respuestas' : 'Ver respuesta')}
                        </button>
                        <span data-contador className={`text-av-texto-2 ${MONO}`}>{respondidos} de {total} respondidas</span>
                    </>
                )}
            </Item>
            {estado.revelado && datos.cierre && (
                <>
                    <Item className={CAJA}><h2 className={H2}>{datos.cierre.titulo}</h2></Item>
                    <Hechos items={datos.cierre.puntos} />
                </>
            )}
        </div>
    );

    return (
        <div data-decide data-estado={fase} className="grid gap-4">
            {datos.paragraph && <Item className={LEAD}>{datos.paragraph}</Item>}
            {datos.rotulo && <Item className={`text-av-texto-2 ${MONO}`}>{datos.rotulo}</Item>}
            {preguntas}
        </div>
    );
}

export default DecideRevela;
```

- [ ] **Paso 2: registrarlo en `SlideAvanzado.jsx`**

Después de `import Materiales from './tipos/Materiales';` agregar
`import DecideRevela from './tipos/DecideRevela';`. En `TIPOS`, después de
`'resources-download': Materiales,` agregar `'decide-revela': DecideRevela,`.

- [ ] **Paso 3: cargar el semáforo en `VIRTUAL_1.js`**

Reemplazar el objeto entero `id: "v1-6-4"` (hoy `type: "comparison"`) por este, tal cual:

```js
        {
            id: "v1-6-4",
            title: "Semáforo",
            type: "decide-revela",
            contentData: {
                heading: "Semáforo: ¿qué color le toca a cada dato?",
                paragraph: "Clasifica los diez. Propuesta del curso, no norma. Ante la duda, sube un color.",
                opciones: ["🟢 Verde", "🟡 Amarillo", "🔴 Rojo"],
                boton: "Ver respuestas",
                items: [
                    { id: "plantilla", texto: "Tu plantilla de minuta de compraventa, sin datos reales", correcta: 0,
                      porque: "Plantilla sin datos reales: verde." },
                    { id: "certificado-medico", texto: "El certificado médico de un cliente", correcta: 2,
                      porque: "Datos de salud: rojo. Son datos sensibles." },
                    { id: "minuta-etiquetada", texto: "La minuta de un cliente con las partes cambiadas por [VENDEDOR_1] y [COMPRADOR_1] en tu computadora", correcta: 1,
                      porque: "Documento de cliente ya seudonimizado: amarillo. Puede ir a un plan pago con el entrenamiento desactivado; mejor, a un plan de equipo." },
                    { id: "sentencia-publica", texto: "Una sentencia publicada en el buscador de la Corte Nacional", correcta: 0,
                      porque: "Fallo público: verde." },
                    { id: "salida-menor", texto: "La autorización de salida del país de un menor", correcta: 2,
                      porque: "Datos de niñas, niños y adolescentes: rojo." },
                    { id: "contrato-crudo", texto: "El contrato de arrendamiento de un cliente, tal como te lo mandó, con nombres y cédulas", correcta: [1, 2],
                      porque: "Es un documento de cliente: amarillo. Pero así como está no se sube: primero se seudonimiza en tu computadora o se pide el consentimiento informado del cliente. Si elegiste rojo, vas bien: ante la duda, sube un color." },
                    { id: "penal-seudonimizado", texto: "Un expediente penal, ya seudonimizado", correcta: 2,
                      porque: "Los procesos penales son rojo aunque cambies los nombres. Solo por excepción: API con Zero Data Retention o nube empresarial, y con consentimiento expreso del cliente." },
                    { id: "lopdp", texto: "El texto de la LOPDP descargado del Registro Oficial", correcta: 0,
                      porque: "Ley pública: verde." },
                    { id: "sociedad-conyugal", texto: "Una liquidación de sociedad conyugal con las partes etiquetadas", correcta: 1,
                      porque: "Documento de cliente seudonimizado: amarillo." },
                    { id: "caso-conocido", texto: "Un caso muy conocido en tu ciudad, con los nombres cambiados", correcta: 2,
                      porque: "Rojo: la combinación de hechos identifica a la persona aunque cambies el nombre." }
                ],
                cierre: {
                    titulo: "Dónde puede ir cada color",
                    puntos: [
                        "🟢 Verde: cualquier plan pago con el entrenamiento desactivado.",
                        "🟡 Amarillo: plan pago con el entrenamiento desactivado, solo después de seudonimizar en tu computadora o con consentimiento informado del cliente. Mejor en un plan de equipo.",
                        "🔴 Rojo: no subir. Por excepción, API con Zero Data Retention o nube empresarial, y siempre con consentimiento expreso del cliente."
                    ]
                }
            }
        },
```

- [ ] **Paso 4: verificar**

```bash
node --test "client/src/components/avanzado/**/*.test.js"
```

Luego el recorrido (servidor de desarrollo levantado). Esperado: ya no aparece ningún problema
`decide v1-6-4: …`. Siguen los de `v1-2-4a`, `v1-3-7` y «el slide 40»: son de las tareas 4 a 6.
Mirar `decide-v1-6-4-escritorio.png` y `decide-v1-6-4-movil.png`: a 375 px, el texto arriba y los tres
botones en una fila debajo; en escritorio, texto a la izquierda y botones a la derecha.

---

### Tarea 4: `VentanaContexto.jsx` y el uso 1 (`v1-2-4a`)

**Archivos:** crear `client/src/components/avanzado/VentanaContexto.jsx`; modificar
`client/src/components/avanzado/tipos/DecideRevela.jsx` y `client/src/data/avanzado/VIRTUAL_1.js`.

- [ ] **Paso 1: escribir `VentanaContexto.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion';
import { MONO, PANEL } from './estilos';

// Fuera de JSX para que el lint no marque `motion` como no usado.
const MotionDiv = motion.div;

// Uso 1 de decide-revela: un chat que crece mensaje a mensaje. Al revelar, un marco cubre solo los
// últimos `ventana` mensajes y los de arriba se apagan. Todos ocupan su lugar desde el inicio
// (opacidad 0), así el alto no salta mientras aparecen. Con movimiento reducido, todo aparece de una vez.
export default function VentanaContexto({ mensajes, ventana, revelado }) {
    const reducir = useReducedMotion();
    const corte = Math.max(0, mensajes.length - ventana);
    const burbuja = (m, i) => (
        <MotionDiv
            key={i}
            initial={reducir ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.6, duration: 0.3 }}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug text-av-texto ${m.de === 'tu' ? 'ml-auto rounded-br-md bg-av-acento/15' : 'rounded-bl-md border border-av-linea bg-av-fondo-2'}`}
        >
            {m.texto}
        </MotionDiv>
    );
    return (
        <div data-ventana-contexto className={`${PANEL} grid gap-2 p-4`}>
            <p className={`text-av-alerta ${MONO} ${revelado ? '' : 'invisible'}`}>Fuera de la ventana</p>
            <MotionDiv
                animate={{ opacity: revelado ? 0.35 : 1 }}
                transition={{ duration: reducir ? 0 : 0.5 }}
                className="grid gap-2"
            >
                {mensajes.slice(0, corte).map(burbuja)}
            </MotionDiv>
            <div className={`grid gap-2 rounded-xl border-2 p-2 transition-colors motion-reduce:transition-none ${revelado ? 'border-av-acento' : 'border-transparent'}`}>
                <p className={`text-av-acento ${MONO} ${revelado ? '' : 'invisible'}`}>Ventana de contexto</p>
                {mensajes.slice(corte).map((m, i) => burbuja(m, corte + i))}
            </div>
        </div>
    );
}
```

Nota: las dos etiquetas están siempre en el DOM y ocultas con `invisible` hasta revelar. La prueba
del recorrido usa `isVisible()`, que da `false` con `visibility: hidden`: antes de revelar no cuentan.

- [ ] **Paso 2: usarla en `DecideRevela.jsx`**

Agregar el import después del de `Hechos`:

```jsx
import VentanaContexto from '../VentanaContexto';
```

Y reemplazar `{preguntas}` dentro del `return` final por:

```jsx
            {datos.animacion === 'ventana-contexto' ? (
                <div className="grid gap-6 xl:grid-cols-2">
                    <Item className="min-w-0">
                        <VentanaContexto mensajes={datos.mensajes} ventana={datos.ventana} revelado={estado.revelado} />
                    </Item>
                    {preguntas}
                </div>
            ) : preguntas}
```

- [ ] **Paso 3: cargar `v1-2-4a` y quitar la demo de `v1-2-4`**

En `VIRTUAL_1.js`, justo antes del objeto `id: "v1-2-4"`, insertar:

```js
        {
            id: "v1-2-4a",
            title: "¿Qué recuerda la IA?",
            type: "decide-revela",
            contentData: {
                heading: "¿Qué recuerda la IA de este chat?",
                paragraph: "Mira cómo crece un chat de trabajo. Después responde.",
                rotulo: "Esquema: la ventana real es mucho más grande, pero funciona igual.",
                animacion: "ventana-contexto",
                ventana: 4,
                mensajes: [
                    { de: "tu", texto: "Caso [CLIENTE_1]: arriendo de un local en Cuenca. El canon es de 800 dólares." },
                    { de: "ia", texto: "Entendido. ¿Qué necesitas revisar?" },
                    { de: "tu", texto: "Revisa la cláusula de terminación anticipada." },
                    { de: "ia", texto: "La cláusula novena permite terminar con 30 días de aviso…" },
                    { de: "tu", texto: "Redacta la carta de aviso." },
                    { de: "ia", texto: "Borrador de la carta…" },
                    { de: "tu", texto: "Otra cosa: resume esta sentencia de 40 páginas." },
                    { de: "ia", texto: "Resumen de la sentencia…" },
                    { de: "tu", texto: "Volviendo al arriendo: ¿cuál era el canon?" }
                ],
                items: [
                    {
                        id: "primer-mensaje",
                        texto: "¿La IA todavía ve el primer mensaje, donde le diste el canon?",
                        opciones: [
                            "Sí: todo el chat queda en su memoria",
                            "No: ese mensaje ya salió de la ventana"
                        ],
                        correcta: 1,
                        porque: "La ventana de contexto es finita. Lo que no cabe, el modelo no lo ve, aunque tú lo sigas viendo en tu pantalla. Si ahora le preguntas el canon, puede inventarlo con total seguridad."
                    }
                ]
            }
        },
```

En `v1-2-4`, borrar la línea
`highlight: { type: "success", text: "Demo en vivo: el mismo pedido en un chat largo y en uno nuevo." }`
y la coma que queda al final de `bullets2: [ … ]`.

- [ ] **Paso 4: verificar**

Correr el recorrido. Esperado: sin problemas `decide v1-2-4a: …`. Mirar `decide-v1-2-4a-escritorio.png`
(a 1280 px la ventana a la izquierda y la pregunta a la derecha) y `…/capturas-decide/*-v1-2-4a-movil.png`
(la ventana arriba, la pregunta debajo). Además, a mano en `http://localhost:5173` en modo admin y
**sin** movimiento reducido: los nueve mensajes aparecen uno por uno y la página no salta de alto.

---

### Tarea 5: usos 2 (`v1-3-7`) y 4 (`v1-8-0`), y `v1-3-10`

**Archivo:** `client/src/data/avanzado/VIRTUAL_1.js`.

- [ ] **Paso 1: reemplazar el objeto entero `id: "v1-3-7"` por:**

```js
        {
            id: "v1-3-7",
            title: "Tutorial 2: caza la alucinación",
            type: "decide-revela",
            contentData: {
                heading: "Paso 2: caza la alucinación",
                paragraph: "Este es el prompt malo y una respuesta como la que suele dar. Una de las frases es falsa. Tócala.",
                rotulo: "Ejemplo sintético: respuesta escrita para el curso, no generada por una IA.",
                pregunta: "¿Cuál es el plazo de prescripción de una deuda en Ecuador?",
                items: [
                    {
                        id: "frase-falsa",
                        texto: "¿Qué frase es falsa?",
                        opciones: [
                            "En Ecuador, la prescripción extintiva de las deudas está regulada en el Código Civil.",
                            "El plazo se cuenta desde que la obligación se hizo exigible, según el artículo 2414.",
                            "El artículo 2415 lo dice textualmente: «la acción ejecutiva prescribe en tres años y la ordinaria en cinco».",
                            "Vencido el plazo de la acción ejecutiva, la deuda todavía puede reclamarse por la vía ordinaria."
                        ],
                        correcta: 2,
                        porque: "El artículo 2415 fija 5 años para la acción ejecutiva y 10 para la ordinaria; vencidos los 5, la ejecutiva se convierte en ordinaria y dura 5 años más. La cita entre comillas no existe: la IA la armó con plazos equivocados y la presentó como textual. Las otras tres frases son ciertas."
                    }
                ],
                cierre: {
                    titulo: "Por qué pasó y cómo se verifica",
                    puntos: [
                        "El prompt no dijo si era acción ejecutiva u ordinaria, no dio la fuente y no le permitió decir «no sé».",
                        "Abre el Código Civil en la fuente oficial: Codificación 10, Registro Oficial Suplemento 46 de 24 de junio de 2005.",
                        "Busca el artículo que te citó y compáralo palabra por palabra.",
                        "Unas comillas no prueban nada: si la cita no está en la fuente, no existe."
                    ]
                }
            }
        },
```

- [ ] **Paso 2: reemplazar el objeto entero `id: "v1-3-10"` por (lista A, punto 4):**

```js
        {
            id: "v1-3-10",
            title: "Tutorial 4: verifica y protocolo",
            type: "narrative",
            contentData: {
                Heading1: "Paso 4: verifica y protocolo",
                paragraph1: "Pide la cita exacta, ábrela en la fuente oficial y pasa el checklist.",
                bullets1: [
                    "Registro Oficial: <a href='https://www.registroficial.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>registroficial.gob.ec</a>",
                    "Corte Nacional de Justicia: <a href='https://busquedasentencias.cortenacional.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>busquedasentencias.cortenacional.gob.ec</a>",
                    "Corte Constitucional: <a href='https://buscador.corteconstitucional.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>buscador.corteconstitucional.gob.ec</a>",
                    "Descarga el <a href='/materiales/checklist-verificacion.md' target='_blank' rel='noopener noreferrer' class='underline'>checklist de verificación</a> y el <a href='/materiales/tutorial-evitar-alucinaciones.md' target='_blank' rel='noopener noreferrer' class='underline'>tutorial completo</a>"
                ],
                highlight: { type: "success", text: "La frase inventada del paso 2 no resiste esta comprobación." }
            }
        },
```

- [ ] **Paso 3: insertar `v1-8-0` justo antes del objeto `id: "v1-8-1"`:**

```js
        {
            id: "v1-8-0",
            title: "Repaso",
            type: "decide-revela",
            contentData: {
                heading: "Repaso: cuatro decisiones de todos los días",
                paragraph: "Responde las cuatro y después mira las respuestas.",
                boton: "Ver respuestas",
                items: [
                    {
                        id: "chat-largo",
                        texto: "Llevas dos horas en el mismo chat, con tres casos distintos. ¿Qué haces?",
                        opciones: [
                            "Sigo ahí: la IA recuerda todo lo que le dije",
                            "Pido un resumen del caso que me interesa y lo llevo a un chat nuevo",
                            "Le pido que olvide los otros dos casos"
                        ],
                        correcta: 1,
                        porque: "La ventana es finita y un chat que mezcla casos mezcla también sus datos. Resumen y chat nuevo."
                    },
                    {
                        id: "confianza-alta",
                        texto: "La IA te da un artículo con cita textual y dice que su confianza es alta. ¿Qué haces antes de usarlo?",
                        opciones: [
                            "Nada: si la confianza es alta, está bien",
                            "Le pregunto si está segura",
                            "Abro la fuente oficial y comparo la cita"
                        ],
                        correcta: 2,
                        porque: "Confianza no es exactitud. La última revisión es humana: la cita se contrasta con la fuente oficial."
                    },
                    {
                        id: "entrenamiento",
                        texto: "Desactivaste el entrenamiento en tu plan pago. ¿Ya puedes pegar el contrato de un cliente con nombres y cédulas?",
                        opciones: [
                            "No: los datos igual salen de tu computadora y se guardan; seudonimiza antes",
                            "Sí: ya es confidencial",
                            "Sí, si después borro el chat"
                        ],
                        correcta: 0,
                        porque: "Desactivar el entrenamiento no es confidencialidad. Seudonimiza en tu computadora antes de subir."
                    },
                    {
                        id: "delegar",
                        texto: "¿Qué no le delegas a la IA?",
                        opciones: [
                            "El primer borrador de una minuta",
                            "El resumen de un expediente que tú cargaste",
                            "La conclusión jurídica final y la firma"
                        ],
                        correcta: 2,
                        porque: "La IA hace borradores, resume y ordena. La conclusión y la firma son tuyas."
                    }
                ]
            }
        },
```

- [ ] **Paso 4: verificar**

Correr el recorrido. Esperado: sin problemas `decide …` ni «errores de contenido». Solo queda
«el slide 40 es …, no v1-8-3» (hoy hay 43). Mirar `*-v1-8-0-escritorio.png` y `*-v1-8-0-movil.png`:
cuatro tarjetas con las opciones apiladas.

---

### Tarea 6: lista A y los 40 ids

**Archivos:** `client/src/components/avanzado/rotulos.test.js` y `client/src/data/avanzado/VIRTUAL_1.js`.

- [ ] **Paso 1: la prueba con los 40 ids**

En `rotulos.test.js`, reemplazar el comentario, `IDS` y la primera prueba por:

```js
// Los 40 ids de la Virtual 1, en orden (client/src/data/avanzado/VIRTUAL_1.js).
const IDS = [
    'v1-1-1', 'v1-1-2', 'v1-1-3', 'v1-1-4', 'v1-1-5', 'v1-2-1', 'v1-2-2', 'v1-2-3', 'v1-2-4a', 'v1-2-4',
    'v1-2-5', 'v1-3-2', 'v1-3-3', 'v1-3-4', 'v1-3-5', 'v1-3-5b', 'v1-3-6', 'v1-3-7', 'v1-3-9', 'v1-3-10',
    'v1-4-1', 'v1-4-2', 'v1-4-3', 'v1-5-1', 'v1-6-1', 'v1-6-2', 'v1-6-3', 'v1-6-4', 'v1-7-1', 'v1-7-2',
    'v1-7-4', 'v1-7-5', 'v1-7-6', 'v1-7-7', 'v1-7-8', 'v1-7-9', 'v1-8-0', 'v1-8-1', 'v1-8-2', 'v1-8-3',
];

test('los 40 ids dan un bloque entre 1 y 8', () => {
    assert.equal(IDS.length, 40);
    for (const id of IDS) {
        const bloque = bloqueDe(id);
        assert.ok(bloque >= 1 && bloque <= 8, `${id} → ${bloque}`);
    }
    assert.equal(bloqueDe('v1-2-4a'), 2);
    assert.equal(bloqueDe('v1-3-5b'), 3);
    assert.equal(bloqueDe('v1-3-10'), 3);
    assert.equal(bloqueDe('v1-8-0'), 8);
});
```

`rotulos.test.js` no lee `VIRTUAL_1.js`: la prueba que falla de verdad es la del recorrido («el slide
40 es …, no v1-8-3»), que sigue en rojo hasta el paso 3.

- [ ] **Paso 2: correr las dos pruebas**

```bash
node --test "client/src/components/avanzado/**/*.test.js"
```

Esperado: verde. Recorrido: sigue el problema del slide 40.

- [ ] **Paso 3: aplicar la lista A en `VIRTUAL_1.js`**

1. Borrar la línea `delBasico(MODULO_1, "1-4", "v1-3-1"),` (punto 2). `MODULO_1` sigue en uso por `v1-3-2`.
2. Borrar el objeto entero `id: "v1-3-8"` (punto 3).
3. En `v1-3-9`: `title: "Tutorial 3: el prompt mejor"` y `heading: "Paso 3: el prompt mejor"`. El resto igual.
4. Borrar el objeto entero `id: "v1-7-3"` (punto 5).
5. En `v1-7-6`, cambiar `tip` a:
   `"Se aplica solo a los chats de este Proyecto. Aquí quedan fijas las reglas del prompt mejor del paso 3."`

Los puntos 1 (demo de `v1-2-4`) y 4 (`v1-3-10`) ya se hicieron en las tareas 4 y 5.

- [ ] **Paso 4: comprobar los ids contra el archivo**

```bash
grep -oE '"v1-[0-9]+-[0-9a-z]+"' client/src/data/avanzado/VIRTUAL_1.js | tr -d '"' | tr '\n' ' '
```

Esperado: exactamente los 40 ids de `IDS`, en el mismo orden. Además, sin restos:

```bash
grep -nE 'paso 5|Paso 5|aún mejor|Demo en vivo' client/src/data/avanzado/VIRTUAL_1.js
```

Esperado: sin salida.

- [ ] **Paso 5: correr el recorrido completo**

Esperado: «Sin problemas.»

---

### Tarea 7: verificación en el navegador, build y lint

- [ ] **Paso 1: recorrido completo sobre el build de producción**

```bash
VITE_COURSE=avanzado npm --prefix client run build
```

Levantar en segundo plano `npm --prefix client run preview` (queda en `http://localhost:4173`) y correr:

```bash
cp /d/curso_IA/docs/revision/recorrido-avanzado.mjs /d/tmp/pw-curso/ && node /d/tmp/pw-curso/recorrido-avanzado.mjs http://localhost:4173 /d/tmp/pw-curso/capturas-final
```

Esperado: «Sin problemas.» (40 slides a 1280 y 375 px, movimiento, bienvenida, alumno, pizarra y
sección 6). Detener el preview al terminar.

- [ ] **Paso 2: teclado, a mano, en el servidor de desarrollo**

En `v1-8-0`: Tab entra al primer grupo, las flechas cambian de opción, Tab pasa al grupo siguiente y
al botón; Enter en el botón revela y el foco queda en «Coincidiste en …». El anillo de foco se ve en
cada opción. Anotar lo que no se cumpla.

- [ ] **Paso 3: movimiento reducido, a mano**

Con movimiento reducido emulado (DevTools → Rendering → `prefers-reduced-motion: reduce`), en `v1-2-4a`:
los nueve mensajes aparecen de una vez; al revelar, el marco y el apagado aparecen sin transición.

- [ ] **Paso 4: build del encargo, lint y pruebas**

```bash
node --test "client/src/components/avanzado/**/*.test.js"
```

```bash
npm --prefix client run build
```

```bash
cd client && npx eslint . 2>&1 | tail -2
```

Esperado: pruebas en verde, build sin errores, lint con **52 problemas o menos**. Si sube, los nuevos
tienen que estar en archivos de este plan: arreglarlos.

---

### Tarea 8: el encargo del guion pasa a 40 slides y 142 minutos

**Archivo:** `docs/prompts/2026-09-24-guion-virtual-1.md`.

- [ ] **Paso 1: editar el texto**

1. «`GUION` con una entrada para cada uno de los 44 slides.» → «… de los 40 slides.»
2. «Son 10, 15, 20, 15, 10, 30, 35 y 15, en total 150.» → «Son 10, 14, 16, 15, 10, 25, 33 y 19, en
   total 142; quedan 8 de margen en las 2 h 30 min.»
3. En «Leer primero», punto 2, agregar después de la línea: «Los minutos por bloque vigentes son los
   de `docs/plans/2026-09-24-experiencia-interactiva-diseno.md` §3, no los del plan de la Virtual 1.»
4. En «Cómo se sabe que terminó»: «da 44» → «da 40» y «da 150» → «da 142».
5. En «Ya decidido», agregar: «Los slides `decide-revela` (`v1-2-4a`, `v1-3-7`, `v1-6-4`, `v1-8-0`)
   revelan la respuesta en pantalla: el guion dice qué preguntar antes de pulsar el botón, no la
   respuesta.»

- [ ] **Paso 2: verificar**

```bash
grep -nE '\b44\b|\b150\b' docs/prompts/2026-09-24-guion-virtual-1.md
```

Esperado: sin salida.

---

### Tarea 9: revisión (revisor, `claude-opus-5-5`)

- [ ] Revisar el diff completo (`git diff`) contra el diseño y este plan: los tres estados, lista en
  `correcta`, accesibilidad (radios nativos, foco al resultado, `aria-live`, ícono y texto además del
  color), 44 px, movimiento reducido, `sessionStorage` con `try/catch`, contenido copiado tal cual del
  diseño, lista A completa, nada fuera de los archivos de la tabla.
- [ ] Correr los dos comandos de cierre y reportar su salida.
- [ ] Informe: hallazgos por gravedad, con archivo y línea. No arreglar: el controlador decide.

---

## Cierre

El plan termina con estos dos comandos en verde:

```bash
node --test "client/src/components/avanzado/**/*.test.js"
```

```bash
npm --prefix client run build
```

Y además, del plan: recorrido «Sin problemas.» sobre el build avanzado, y lint ≤ 52.

Fuera de este plan: la capa en vivo (§5 del diseño), la lista B, y escribir el guion.
