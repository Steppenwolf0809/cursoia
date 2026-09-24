import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { MONO } from './estilos';

// Imagen que se abre a pantalla completa a 960 px, con desplazamiento y zoom de pellizco.
// Para las capturas del Anonimizador, que a 340 px no se leen.
const ImagenAmpliable = ({ src, alt }) => {
    const [abierta, setAbierta] = useState(false);
    const botonRef = useRef(null);

    // Al cerrar (Escape, «Cerrar» o clic fuera), el foco vuelve al botón «Ampliar».
    useEffect(() => {
        if (!abierta) return undefined;
        const boton = botonRef.current;
        // Tab no sale del diálogo: «Cerrar» es su único control y detrás están los botones del slide.
        const alTeclear = (e) => {
            if (e.key === 'Escape') setAbierta(false);
            if (e.key === 'Tab') e.preventDefault();
        };
        window.addEventListener('keydown', alTeclear);
        return () => {
            window.removeEventListener('keydown', alTeclear);
            boton?.focus();
        };
    }, [abierta]);

    return (
        <>
            <button ref={botonRef} type="button" onClick={() => setAbierta(true)} aria-label={`Ampliar: ${alt}`} className="group block w-full overflow-hidden rounded-xl border border-av-linea bg-av-fondo-2 text-left">
                <img src={src} alt={alt} className="w-full" />
                <span className={`flex items-center gap-1.5 border-t border-av-linea px-3 py-2 text-av-texto-2 group-hover:text-av-acento ${MONO}`}>
                    <Maximize2 size={13} /> Ampliar
                </span>
            </button>
            {abierta && (
                <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[70] flex flex-col bg-black/90" onClick={() => setAbierta(false)}>
                    <div className="flex justify-end p-3">
                        <button type="button" autoFocus onClick={() => setAbierta(false)} className={`flex items-center gap-1.5 rounded-md border border-av-linea bg-av-panel px-3 py-2 text-av-texto ${MONO}`}>
                            <X size={14} /> Cerrar
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-3" onClick={(e) => e.stopPropagation()}>
                        <img src={src} alt={alt} className="mx-auto w-[960px] max-w-none" />
                    </div>
                </div>
            )}
        </>
    );
};

export default ImagenAmpliable;
