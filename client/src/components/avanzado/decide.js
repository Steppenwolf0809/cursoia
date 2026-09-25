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
