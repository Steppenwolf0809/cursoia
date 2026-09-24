import { Timer } from 'lucide-react';
import GallerySubmit from '../../GallerySubmit';
import { Item } from '../Movimiento';
import { Consejo, Hechos } from '../Piezas';
import { LEAD, MONO, PANEL } from '../estilos';

// Instrucciones a la izquierda y el formulario de la galería (GallerySubmit, sin cambios) a la derecha.
const Ejercicio = ({ slide }) => {
    const datos = slide.contentData;
    const envio = slide.interaction?.type === 'GallerySubmit' ? slide.interaction.data : null;
    return (
        <div className="grid gap-6 xl:grid-cols-2">
            <div className="grid content-start gap-2.5">
                {datos.duration && (
                    <Item className={`flex items-center gap-2 text-av-acento ${MONO}`}>
                        <Timer size={14} /> {datos.duration}
                    </Item>
                )}
                {datos.instructions && <Item className={`mb-3 ${LEAD}`}>{datos.instructions}</Item>}
                <Hechos items={datos.steps.map((paso) => paso.replace(/^\d+\.\s/, ''))} />
                {datos.sampleInput && (
                    <Item>
                        <details className={`${PANEL} px-4 py-3`}>
                            <summary className={`cursor-pointer text-av-texto-2 ${MONO}`}>Ver ejemplo</summary>
                            <pre className="mt-3 whitespace-pre-wrap font-av-mono text-[13px] leading-relaxed text-av-texto">{datos.sampleInput}</pre>
                        </details>
                    </Item>
                )}
                {datos.tip && <Consejo className="mt-2">{datos.tip}</Consejo>}
            </div>
            {envio && (
                <Item className="min-w-0">
                    <GallerySubmit
                        exerciseId={envio.exerciseId}
                        moduleId={envio.moduleId}
                        promptLabel={envio.promptLabel}
                        resultLabel={envio.resultLabel}
                        allowImage={envio.allowImage}
                        additionalFields={envio.additionalFields}
                    />
                </Item>
            )}
        </div>
    );
};

export default Ejercicio;
