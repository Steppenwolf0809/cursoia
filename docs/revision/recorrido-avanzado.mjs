// Recorre los 40 slides de la Virtual 1 en modo admin, con Supabase bloqueado, y guarda capturas.
// Uso (desde D:\tmp\pw-curso, donde está instalado playwright):
//   node recorrido-avanzado.mjs <url> <carpeta-salida> [ids,separados,por,coma]
// Sin ids: captura los 40 y hace además la prueba de movimiento y la bienvenida.
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

// Supabase Realtime (WebSocket) no llega al servidor real. Si llega un mensaje suyo, se escapó.
let tiempoRealEscapado = false;
async function sinTiempoReal(contexto) {
    // Sin connectToServer(): el socket nunca se conecta al servidor; se cierra al abrir.
    await contexto.routeWebSocket(/supabase\.co/, (ws) => ws.close());
    contexto.on('page', (p) => p.on('websocket', (ws) => {
        if (/supabase\.co/.test(ws.url())) ws.on('framereceived', () => { tiempoRealEscapado = true; });
    }));
}

async function abrir(opciones, admin = true) {
    const contexto = await navegador.newContext(opciones);
    await sinTiempoReal(contexto);
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

// 1. Los 40 slides, con movimiento reducido (capturas con todo ya en su lugar).
for (const [nombre, opciones] of Object.entries(TAMANOS)) {
    const { contexto, pagina } = await abrir({ ...opciones, reducedMotion: 'reduce' });
    await pagina.waitForSelector('[data-slide-id]');
    for (let i = 1; i <= 40; i++) {
        const id = await idActual(pagina);
        // Con movimiento reducido el slide aparece completo: el H1 y todos sus ancestros con opacidad 1.
        const completo = await pagina.$eval('[data-slide-id] h1', (h) => {
            for (let n = h; n; n = n.parentElement) if (getComputedStyle(n).opacity !== '1') return false;
            return true;
        }).catch(() => false);
        if (!completo) problemas.push(`${nombre} ${id}: con movimiento reducido el H1 no está completo (o no hay H1)`);
        // Solo en desarrollo: validar() pinta esta caja si el contentData de decide-revela está mal.
        if (await pagina.locator('[data-decide-errores]').count()) problemas.push(`${nombre} ${id}: decide-revela con errores de contenido`);

        if (!solo || solo.has(id)) {
            const n = String(i).padStart(2, '0');
            if (await pagina.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) {
                problemas.push(`${nombre} ${id}: desborde horizontal`);
            }
            await pagina.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => problemas.push(`${nombre} ${id}: una imagen no terminó de cargar`));
            await pagina.screenshot({ path: `${salida}/${n}-${id}-${nombre}.png` });
            const zona = pagina.locator('main .overflow-y-auto').first();
            if (await zona.evaluate((z) => z.scrollHeight > z.clientHeight + 4)) {
                await zona.evaluate((z) => { z.scrollTop = z.scrollHeight; });
                await pagina.screenshot({ path: `${salida}/${n}-${id}-${nombre}-fin.png` });
                await zona.evaluate((z) => { z.scrollTop = 0; });
            }
        }
        if (i === 40 && id !== 'v1-8-3') problemas.push(`${nombre}: el slide 40 es ${id}, no v1-8-3 (la Virtual 1 debe tener 40)`);
        if (i < 40) await avanzar(pagina);
    }
    await contexto.close();
}

if (!solo) {
    // 2. Con movimiento: la órbita gira, la cifra cuenta y el remate entra al final.
    const { contexto, pagina } = await abrir(TAMANOS.escritorio);
    await pagina.waitForSelector('[data-slide-id="v1-1-1"]');
    if (!(await pagina.locator('[data-guion]').count())) problemas.push('admin: no ve el guion');
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

    // 4. Vista de alumno: no ve el guion ni descarga su archivo.
    const alumno = await navegador.newContext(TAMANOS.escritorio);
    await alumno.addInitScript(() => localStorage.setItem('course_participant', JSON.stringify({ id: 'prueba', name: 'Prueba' })));
    await sinTiempoReal(alumno);
    await alumno.route(/supabase\.co/, (ruta) => ruta.abort());
    const paginaAlumno = await alumno.newPage();
    const pedidosGuion = [];
    paginaAlumno.on('request', (r) => { if (/guion-virtual/i.test(r.url())) pedidosGuion.push(r.url()); });
    await paginaAlumno.goto(url);
    await paginaAlumno.waitForSelector('[data-slide-id]', { timeout: 10000 }).catch(() => problemas.push('alumno: no cargó el slide'));
    await paginaAlumno.waitForTimeout(1000);
    if (await paginaAlumno.locator('[data-guion]').count()) problemas.push('alumno: ve el guion');
    if (pedidosGuion.length) problemas.push(`alumno: descargó el guion (${pedidosGuion.join(', ')})`);
    await paginaAlumno.screenshot({ path: `${salida}/00-alumno-escritorio.png` });
    await alumno.close();

    // 5. Pizarra, como admin y como alumno: Supabase simulado con la pizarra visible y con texto.
    //    Sin fondos blancos ni azules del básico, y el botón de copiar en el acento.
    const estado = (esAlumno) => ({
        session_code: 'main', current_module: esAlumno ? 'whiteboard' : 'module-1', current_slide: esAlumno ? 'wb-0' : '1-0',
        is_gallery_visible: false, is_free_mode: false, free_module_id: null,
        whiteboard_content: 'Prompt del día:\nRevisa esta demanda como abogado litigante.', whiteboard_visible: true,
    });
    const BASICO = ['rgb(255, 255, 255)', 'rgb(248, 250, 252)', 'rgb(37, 99, 235)', 'rgb(29, 78, 216)'];
    for (const esAlumno of [false, true]) {
        const rol = esAlumno ? 'alumno' : 'admin';
        const c = await navegador.newContext({ ...TAMANOS.escritorio, reducedMotion: 'reduce' });
        await c.addInitScript((a) => localStorage.setItem(a ? 'course_participant' : 'course_admin_auth', a ? JSON.stringify({ id: 'prueba', name: 'Prueba' }) : 'true'), esAlumno);
        await sinTiempoReal(c);
        await c.route(/supabase\.co/, (ruta) => (ruta.request().method() === 'GET' && ruta.request().url().includes('/rest/v1/session_state')
            ? ruta.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(estado(esAlumno)) })
            : ruta.abort()));
        const p = await c.newPage();
        await p.goto(url);
        await p.evaluate(() => document.fonts.ready);
        if (!esAlumno) {
            await p.waitForSelector('[data-slide-id]');
            await p.getByRole('button', { name: /Pizarra/ }).first().click();
        }
        const ok = await p.waitForSelector('[data-slide-id="wb-0"] .av-pizarra :is(textarea, pre)', { timeout: 10000 }).then(() => true).catch(() => false);
        if (!ok) { problemas.push(`pizarra ${rol}: no se ve el contenido`); await c.close(); continue; }
        const fondos = await p.$$eval('[data-slide-id="wb-0"] .av-pizarra *', (els) => els.map((e) => getComputedStyle(e).backgroundColor));
        const claros = fondos.filter((f) => BASICO.includes(f));
        if (claros.length) problemas.push(`pizarra ${rol}: fondos del básico (${[...new Set(claros)].join(', ')})`);
        if (esAlumno) {
            const copiar = await p.getByRole('button', { name: /Copiar contenido/ }).evaluate((b) => getComputedStyle(b).backgroundColor);
            if (copiar !== 'rgb(242, 184, 75)') problemas.push(`pizarra alumno: el botón de copiar no va en el acento (${copiar})`);
        }
        await p.screenshot({ path: `${salida}/00-pizarra-${rol}-escritorio.png` });
        await c.close();
    }
}

// 6. decide-revela: elegir, recargar y volver sin perder lo marcado, revelar con el foco en el resultado.
{
    const { contexto, pagina } = await abrir({ ...TAMANOS.escritorio, reducedMotion: 'reduce' });
    const ir = async (destino) => {
        await pagina.waitForSelector('[data-slide-id]');
        for (let n = 0; n < 45 && (await idActual(pagina)) !== destino; n++) {
            try { await avanzar(pagina); } catch { break; }
        }
        return (await idActual(pagina)) === destino;
    };
    const estado = () => pagina.getAttribute('[data-decide]', 'data-estado').catch(() => null);
    const foco = () => pagina.evaluate(() => document.activeElement?.hasAttribute('data-resultado') ?? false);

    // Semáforo: elegir, recargar, salir y volver, revelar.
    if (!(await ir('v1-6-4'))) problemas.push('decide: no se llegó a v1-6-4');
    else {
        try {
            if (await estado() !== 'sin-responder') problemas.push(`decide v1-6-4: empieza en ${await estado()}, no sin-responder`);
            await pagina.locator('[data-decide] label').first().click({ timeout: 5000 });
            if (await estado() !== 'respondido') problemas.push('decide v1-6-4: al elegir no pasa a respondido');
            if (!(await pagina.textContent('[data-contador]'))?.includes('1 de 10')) problemas.push('decide v1-6-4: el contador no dice 1 de 10');

            await pagina.reload();
            if (!(await ir('v1-6-4'))) throw new Error('después de recargar no se llegó a v1-6-4');
            if (!(await pagina.locator('[data-decide] input[type="radio"]').first().isChecked())) problemas.push('decide v1-6-4: al recargar se pierde lo marcado');

            await avanzar(pagina);
            // Pequeña espera: el listener de keydown de AppLayout se registra de nuevo después del
            // render, y dos flechas pegadas pueden llegar antes. Un usuario real nunca las pega así.
            await pagina.waitForTimeout(300);
            await pagina.keyboard.press('ArrowLeft');
            await pagina.waitForSelector('[data-slide-id="v1-6-4"]');
            if (await estado() !== 'respondido') problemas.push('decide v1-6-4: al salir y volver se pierde lo marcado');

            await pagina.getByRole('button', { name: 'Ver respuestas' }).click({ timeout: 5000 });
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
        } catch (e) {
            problemas.push(`decide v1-6-4: ${e.message.split('\n')[0]}`);
        }
    }
    await contexto.close();

    // Caza la alucinación y ventana de contexto, en un contexto nuevo (sessionStorage vacío).
    const c2 = await abrir({ ...TAMANOS.escritorio, reducedMotion: 'reduce' });
    const p2 = c2.pagina;
    const ir2 = async (destino) => {
        await p2.waitForSelector('[data-slide-id]');
        for (let n = 0; n < 45 && (await idActual(p2)) !== destino; n++) {
            try { await avanzar(p2); } catch { break; }
        }
        return (await idActual(p2)) === destino;
    };
    if (!(await ir2('v1-2-4a'))) problemas.push('decide: no se llegó a v1-2-4a');
    else {
        try {
            if (!(await p2.locator('[data-ventana-contexto]').count())) problemas.push('decide v1-2-4a: no se pinta la ventana');
            await p2.getByRole('button', { name: 'Ver respuesta' }).click({ timeout: 5000 });
            if (!(await p2.getByText('Fuera de la ventana').isVisible())) problemas.push('decide v1-2-4a: al revelar no se marca lo que quedó fuera');
            if (!(await p2.getByText('Ventana de contexto', { exact: true }).isVisible())) problemas.push('decide v1-2-4a: al revelar no aparece el marco');
            await p2.screenshot({ path: `${salida}/decide-v1-2-4a-escritorio.png`, fullPage: true });
        } catch (e) {
            problemas.push(`decide v1-2-4a: ${e.message.split('\n')[0]}`);
        }
    }
    if (!(await ir2('v1-3-7'))) problemas.push('decide: no se llegó a v1-3-7');
    else {
        try {
            await p2.locator('[data-decide] label').nth(2).click({ timeout: 5000 });
            await p2.getByRole('button', { name: 'Ver respuesta' }).click({ timeout: 5000 });
            if ((await p2.textContent('[data-resultado]'))?.trim() !== 'Coincide') problemas.push(`decide v1-3-7: el resultado dice «${await p2.textContent('[data-resultado]')}»`);
            if (await p2.getByText('Inventada', { exact: true }).count() !== 1) problemas.push('decide v1-3-7: no hay exactamente una frase «Inventada»');
            if (await p2.getByText('Cierta', { exact: true }).count() !== 3) problemas.push('decide v1-3-7: no hay tres frases «Cierta»');
            await p2.screenshot({ path: `${salida}/decide-v1-3-7-escritorio.png`, fullPage: true });
        } catch (e) {
            problemas.push(`decide v1-3-7: ${e.message.split('\n')[0]}`);
        }
    }
    await c2.contexto.close();
}

await navegador.close();
if (tiempoRealEscapado) problemas.push('Supabase Realtime: llegaron mensajes del servidor real');
console.log(problemas.length ? problemas.join('\n') : 'Sin problemas.');
process.exit(problemas.length ? 1 : 0);
