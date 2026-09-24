import { Download } from 'lucide-react';
import { Item } from '../Movimiento';
import { MONO, PANEL } from '../estilos';

const Materiales = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <div className="grid gap-2.5 md:grid-cols-2">
            {datos.resources.map((recurso, i) => (
                <Item key={i} className={`flex flex-col gap-3 ${PANEL} p-5`}>
                    <div className="flex items-start justify-between gap-3">
                        <p className="font-av-titulo text-lg font-semibold leading-snug text-av-texto">{recurso.title}</p>
                        <span className={`flex-none rounded border border-av-linea px-1.5 py-0.5 text-av-texto-2 ${MONO}`}>{recurso.type}</span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-av-texto-2">{recurso.description}</p>
                    <a href={recurso.downloadUrl} target="_blank" rel="noreferrer" className={`mt-auto inline-flex items-center gap-2 self-start rounded-md bg-av-acento px-3.5 py-2 text-av-sobre-acento ${MONO}`}>
                        <Download size={14} /> Descargar
                    </a>
                </Item>
            ))}
        </div>
    );
};

export default Materiales;
