import test from 'node:test';
import assert from 'node:assert/strict';
import { bloqueDe, tituloDe, partir, partirCifra } from './rotulos.js';

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
