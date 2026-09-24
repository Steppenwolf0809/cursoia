import { Item } from './Movimiento';
import { bloqueDe, tituloDe } from './rotulos';
import { MONO } from './estilos';

// «Bloque N · ii / 44» y el H1. En lugar de «MÓDULO 1» y sin repetir el título.
const Encabezado = ({ slide, modulo, indice, total }) => {
    const bloque = bloqueDe(slide.id);
    return (
        <>
            <Item className={`flex items-center gap-2.5 text-av-texto-2 ${MONO}`}>
                <span className="rounded-full border border-av-acento/40 px-2.5 py-1 text-av-acento">
                    {bloque ? `Bloque ${bloque}` : modulo.title}
                </span>
                <span>· {String(indice + 1).padStart(2, '0')} / {total}</span>
            </Item>
            <Item>
                <h1 className="mb-5 mt-6 max-w-[22ch] font-av-titulo text-[clamp(30px,4.2vw,54px)] font-semibold leading-[1.05] tracking-[-0.025em] text-av-texto">
                    {tituloDe(slide)}
                </h1>
            </Item>
        </>
    );
};

export default Encabezado;
