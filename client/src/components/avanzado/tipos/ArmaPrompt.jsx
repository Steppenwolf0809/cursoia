import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Item } from '../Movimiento';
import { LEAD, MONO } from '../estilos';

// La fórmula R.C.T.F. (o cualquier otra por piezas): cada pieza se enciende a su turno y su frase
// entra al prompt de la derecha. Con movimiento reducido, todo aparece de una vez.
const ArmaPrompt = ({ slide }) => {
    const datos = slide.contentData;
    const total = datos.piezas.length;
    const reducir = useReducedMotion();
    const [paso, setPaso] = useState(reducir ? total : 0);

    useEffect(() => {
        if (reducir) return undefined;
        const tiempos = datos.piezas.map((_, i) => setTimeout(() => setPaso(i + 1), 800 + i * 1500));
        return () => tiempos.forEach(clearTimeout);
    }, [datos.piezas, reducir]);

    const transicion = 'transition-all duration-500 motion-reduce:transition-none';
    return (
        <>
            <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
                <div className="grid content-start gap-2.5">
                    {datos.piezas.map((pieza, i) => {
                        const activa = i < paso;
                        return (
                            // La opacidad va en el div de adentro: la del Item la maneja framer-motion.
                            <Item key={i} className={`rounded-xl border bg-av-panel p-4 ${transicion} ${activa ? 'border-av-acento' : 'border-av-linea'}`}>
                                <div className={`flex items-center gap-4 ${transicion} ${activa ? '' : 'opacity-40'}`}>
                                    <span className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-lg font-av-titulo text-xl font-bold ${transicion} ${activa ? 'bg-av-acento text-av-sobre-acento' : 'bg-av-fondo-2 text-av-texto-2'}`}>
                                        {pieza.nombre[0]}
                                    </span>
                                    <div>
                                        <p className="font-av-titulo text-lg font-semibold text-av-texto">{pieza.nombre}</p>
                                        <p className="text-av-texto-2">{pieza.pregunta}</p>
                                    </div>
                                </div>
                            </Item>
                        );
                    })}
                </div>
                <Item className="min-w-0 overflow-hidden rounded-xl border border-av-linea bg-av-fondo-2">
                    <p className={`border-b border-av-linea px-4 py-2.5 text-av-texto-2 ${MONO}`}>Prompt</p>
                    <div className="grid gap-3 p-4 sm:p-5">
                        {datos.piezas.map((pieza, i) => (
                            <div key={i} className={`${transicion} ${i < paso ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                                <p className={`text-av-acento ${MONO}`}>{pieza.nombre}</p>
                                <p className={`mt-1 rounded-md px-1.5 py-0.5 text-[15px] leading-relaxed text-av-texto ${transicion} ${i === paso - 1 && paso < total ? 'bg-av-acento/15' : ''}`}>
                                    {pieza.texto}
                                </p>
                            </div>
                        ))}
                    </div>
                </Item>
            </div>
            {datos.footer && <Item className={`mt-5 ${LEAD}`}>{datos.footer}</Item>}
        </>
    );
};

export default ArmaPrompt;
