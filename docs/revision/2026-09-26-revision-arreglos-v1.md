Lista.

# Revisión de los arreglos de las correcciones de la Virtual 1

Revisor: `claude-opus-5-5`. Revisé `git diff 7df35b6 HEAD` (3 commits: `c0992b6`, `cfbb327`,
`d67e7d1`) contra `docs/prompts/2026-09-26-arreglos-correcciones-v1.md`, sin leer el informe del
controlador. El texto de la LOPDP lo leí en el PDF de Cancillería (compilación FielWeb, «Quinto
Suplemento del Registro Oficial No. 459, 26 de mayo 2021», «Normativa: Vigente», «Última reforma:
R.O. 459, 26-V-2021»), extraído con `pdftotext`. No verifiqué reformas posteriores a esa
compilación.

El controlador aplicó el encargo al pie de la letra. No hay hallazgos que bloqueen. Los dos de abajo
no son errores de ejecución: uno es opcional y el otro está fuera del diff.

## Hallazgos, de más a menos grave

### 1. El material cita el mismo numeral en otro formato (cosmético, opcional)

**Dónde:** `client/public/materiales/semaforo-confidencialidad.md:12`: «…consentimiento explícito e
informado del cliente (art. 60.2 LOPDP)».

**Qué pasa:** el slide `v1-6-2` ahora dice «(LOPDP, art. 60, num. 2)» y el material que el alumno se
lleva conserva «(art. 60.2 LOPDP)». No es un error: aquí la ley está nombrada y no hay una cita de la
Resolución cerca, así que no se repite la ambigüedad del hallazgo 2 anterior. Solo que las dos citas
del mismo numeral no se escriben igual. El encargo no pedía tocar esta línea, y el controlador hizo
bien en dejarla.

**Cómo lo comprobé:** `git grep -n -E "art\. ?60|60\.2" -- client/src/data/avanzado client/public/materiales`
da solo estas dos líneas. El art. 60 de la LOPDP numera sus casos del 1 al 11, y el 2 es el
consentimiento explícito tras haber sido informado de los riesgos.

**Arreglo propuesto (si se quiere uniformar):** «(LOPDP, art. 60, num. 2)», conservando el BOM y
el CRLF.

### 2. Fuera del diff: el Registro Oficial es el Quinto Suplemento (menor)

**Dónde:** `client/src/data/avanzado/VIRTUAL_1.js:452` (`v1-6-2`, `paragraph1`: «Registro Oficial
Suplemento 459 de 26 de mayo de 2021») y `semaforo-confidencialidad.md:42` («R.O. Suplemento 459»).

**Qué pasa:** la LOPDP se publicó en el **Quinto** Suplemento del R.O. 459. «Suplemento 459» a secas
no la identifica con exactitud, porque ese número tuvo varios suplementos.

**Cómo lo comprobé:** encabezado del PDF de Cancillería: «Quinto Suplemento del Registro Oficial
No.459 , 26 de Mayo 2021».

**Arreglo propuesto:** «Quinto Suplemento del Registro Oficial 459, de 26 de mayo de 2021» en el
slide y «R.O. Quinto Suplemento 459» en el material. Lo decide José Luis. No es parte de este
encargo.

## Lo que verifiqué y salió bien

- **Cumplimiento literal:**
  - Los 9 «Después» del encargo están en los archivos, byte a byte (`grep -F` de cada cadena), y
    el párrafo del temario coincide con el bloque del encargo (comparado con Python).
  - El diff toca solo esos 5 archivos (16 líneas agregadas y 8 quitadas).
  - Cada commit lleva sus archivos, y los tres mensajes son los del encargo, sin líneas de
    atribución.
  - Las comprobaciones dan el «después»: la tarea A, nada; la B, `0`, `1` y `1`; la C, `1`.
  - Siguen iguales «que anonimice» (`v1-6-1`, `VIRTUAL_1.js:438`) y «ni para anonimizarlo»
    (`tarea-virtual-2.md:16`).
  - En el temario, la línea en blanco después del párrafo evita que «Estado:» se pegue a la
    decisión.
- **Consistencia del término:** `git grep -i "anonim"` en `VIRTUAL_1.js`, `guion-virtual-1.js`
  (vacío) y los 5 materiales da solo tres tipos de resultado:
  - el nombre «Anonimizador»;
  - «pedirle a la IA que anonimice» (`VIRTUAL_1.js:438`, `semaforo:38`, `tarea:25`), que es el
    error que el curso enseña a evitar, el mismo caso que el encargo deja igual;
  - la viñeta nueva.
  Ningún texto le pide ya al alumno «anonimizar» su contrato. `v1-6-1` («la tabla que dice quién
  es quién se queda en tu computadora»), `v1-6-2`, `v1-8-1`, `v1-8-2`, el semáforo («Amarillo:
  solo seudonimizado») y la tarea dicen lo mismo. Del básico, el avanzado solo reutiliza
  `QUIEN_SOY`, así que el «Anonimiza todo» de `course-content.jsx:343` y `:413` no aparece.
- **Texto jurídico, contra el PDF:**
  - Art. 2: las exclusiones van con letras de la a) a la g). La c) dice «Datos anonimizados, en
    tanto no sea posible identificar a su titular. Tan pronto los datos dejen de estar
    disociados…». «(arts. 2, lit. c, y 4)» y «la ley no se le aplica mientras siga así» son
    exactos.
  - Art. 4: seudonimización, «información adicional» que «figure por separado». Dato personal:
    «identifica o hace identificable… directa o indirectamente». La viñeta es fiel.
  - La definición de anonimización («impedir la identificación o reidentificación de una persona
    natural, sin esfuerzos desproporcionados») admite dos lecturas gramaticales. La de la viñeta
    es la usual y no hace falta cambiarla.
  - Art. 60, num. 2: «consentimiento explícito… tras haber sido informado de los posibles
    riesgos». «(LOPDP, art. 60, num. 2)» es exacto.
- **El básico no cambia:**
  - En `AppLayout.jsx` solo cambia la línea 46, dentro de `const M = ES_AVANZADO ? {` (líneas 11
    a 52). «Bajo 1280 px» es cierto: Tailwind 3.4 sin `screens` propios, `max-xl` es menos de
    1280 px.
  - `git stash list` está vacío.
  - El stash de esta corrida (`f5af95b`, sobre `cfbb327`), recuperado con `git fsck`, trae solo
    el cambio de la barra espaciadora (`BUTTON || SUMMARY`), y el árbol de trabajo es ese stash
    más el comentario commiteado.
  - `docs/revision/capturas-avanzado` sigue con 142 líneas de estado.
- **Formato y pruebas:**
  - BOM en los blobs de los dos materiales (`ef bb bf`), CRLF en todas las líneas de los 5
    archivos, igual que en `7df35b6`. `git diff --check` no da errores.
  - `node --test src/components/avanzado/*.test.js`: 17 de 17.
  - `npx eslint src/components/avanzado src/data/avanzado`: 0 problemas. `AppLayout.jsx`: 6
    problemas (5 errores y 1 advertencia), igual que la línea base.
  - No corrí el script de pantalla. Los textos nuevos cambian a lo sumo unos 25 caracteres, y se
    muestran en `Narrativa`, `Resumen` y `Tarea`, que no recortan ni ponen alto máximo
    (`grep overflow|max-h|line-clamp|truncate` no da nada en esos tres).
