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
}

await navegador.close();
console.log(problemas.length ? problemas.join('\n') : 'Sin problemas.');
process.exit(problemas.length ? 1 : 0);
