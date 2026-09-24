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
