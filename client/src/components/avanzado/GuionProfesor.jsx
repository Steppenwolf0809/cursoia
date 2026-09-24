import { useEffect, useState } from 'react';
import { EyeOff, ScrollText } from 'lucide-react';
import { bloqueDe } from './rotulos';
import { MONO } from './estilos';

// Un apartado del guion con su etiqueta en mono.
const Apartado = ({ etiqueta, texto, color = 'text-av-texto-2' }) => (
    <div>
        <p className={`mb-1 ${color} ${MONO}`}>{etiqueta}</p>
        <p>{texto}</p>
    </div>
);

// Guion del profesor, en la barra lateral del modo admin del avanzado.
// El archivo del guion se descarga aparte (import dinámico): la pantalla de los alumnos no lo baja.
// La tecla G lo oculta y lo vuelve a mostrar, por si se comparte pantalla.
const GuionProfesor = ({ slide, indice, total }) => {
    const [guion, setGuion] = useState(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        import('../../data/avanzado/guion-virtual-1.js').then((modulo) => setGuion(modulo.GUION));
    }, []);

    useEffect(() => {
        const alTeclear = (e) => {
            const t = e.target;
            if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
            if (e.key === 'g' || e.key === 'G') setVisible((v) => !v);
        };
        window.addEventListener('keydown', alTeclear);
        return () => window.removeEventListener('keydown', alTeclear);
    }, []);

    if (!visible) {
        return (
            <button type="button" onClick={() => setVisible(true)} className={`mx-4 mb-4 flex items-center gap-2 rounded-lg border border-av-linea px-3 py-2 text-av-texto-2 hover:text-av-texto ${MONO}`}>
                <ScrollText size={14} /> Mostrar guion (G)
            </button>
        );
    }

    const entrada = guion?.[slide.id];
    const bloque = bloqueDe(slide.id);
    return (
        <section data-guion aria-label="Guion del profesor" className="mx-4 mb-4 flex min-h-0 flex-1 flex-col rounded-xl border border-av-linea bg-av-panel">
            <header className={`flex items-center justify-between gap-2 border-b border-av-linea px-4 py-2.5 ${MONO}`}>
                <span className="text-av-acento">
                    Guion{bloque ? ` · Bloque ${bloque}` : ''} · {String(indice + 1).padStart(2, '0')}/{total}{entrada?.minutos ? ` · ${entrada.minutos} min` : ''}
                </span>
                <button type="button" onClick={() => setVisible(false)} title="Ocultar guion (G)" aria-label="Ocultar guion" className="text-av-texto-2 hover:text-av-texto">
                    <EyeOff size={14} />
                </button>
            </header>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3 text-[14px] leading-relaxed text-av-texto">
                {!guion && <p className="text-av-texto-2">Cargando…</p>}
                {guion && !entrada && <p className="text-av-texto-2">Sin guion para este slide todavía.</p>}
                {entrada?.decir?.length > 0 && (
                    <ul className="space-y-2">
                        {entrada.decir.map((linea, i) => (
                            <li key={i} className="border-l-2 border-av-acento/60 pl-3">{linea}</li>
                        ))}
                    </ul>
                )}
                {entrada?.preguntar && <Apartado etiqueta="Pregunta a la clase" texto={entrada.preguntar} />}
                {entrada?.ojo && <Apartado etiqueta="Ojo" texto={entrada.ojo} color="text-av-alerta" />}
                {entrada?.paso && <Apartado etiqueta="Paso al siguiente" texto={entrada.paso} />}
            </div>
        </section>
    );
};

export default GuionProfesor;
