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
