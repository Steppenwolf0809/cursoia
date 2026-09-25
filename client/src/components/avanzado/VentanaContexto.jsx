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
