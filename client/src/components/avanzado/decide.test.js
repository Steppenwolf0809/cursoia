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
