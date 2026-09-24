import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Item } from '../Movimiento';
import { Consejo } from '../Piezas';
import { MONO } from '../estilos';

const Plantilla = ({ slide }) => {
    const datos = slide.contentData;
    const [copiado, setCopiado] = useState(false);

    const copiar = () => {
        navigator.clipboard.writeText(datos.template);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_280px] lg:gap-8">
            <Item className="min-w-0 overflow-hidden rounded-xl border border-av-linea bg-av-fondo-2">
                <div className="flex items-center justify-between border-b border-av-linea px-4 py-2.5">
                    <span className={`text-av-texto-2 ${MONO}`}>Prompt</span>
                    <button type="button" onClick={copiar} className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-av-acento hover:bg-av-panel ${MONO}`}>
                        {copiado ? <Check size={14} /> : <Copy size={14} />}
                        {copiado ? 'Copiado' : 'Copiar'}
                    </button>
                </div>
                <pre className="whitespace-pre-wrap break-words p-4 font-av-mono text-[13px] leading-relaxed text-av-texto sm:p-5 sm:text-sm lg:max-h-[60vh] lg:overflow-auto">
                    {datos.template.split(/(\[.*?\])/g).map((parte, i) => (
                        /^\[.*\]$/.test(parte)
                            ? <span key={i} className="rounded bg-av-acento/15 px-1 text-av-acento">{parte}</span>
                            : parte
                    ))}
                </pre>
            </Item>
            <div className="grid content-start gap-3">
                {datos.tip && <Consejo>{datos.tip}</Consejo>}
                {datos.examples?.length > 0 && (
                    <Item>
                        <p className={`mb-2 text-av-texto-2 ${MONO}`}>Ejemplos de uso</p>
                        <div className="flex flex-wrap gap-2">
                            {datos.examples.map((ejemplo, i) => (
                                <span key={i} className="rounded-md border border-av-linea bg-av-panel px-2.5 py-1 text-sm text-av-texto">{ejemplo}</span>
                            ))}
                        </div>
                    </Item>
                )}
            </div>
        </div>
    );
};

export default Plantilla;
