import { Item, Remate } from '../Movimiento';
import { MONO, PANEL } from '../estilos';

// Las tres tareas abiertas, con su consejo a la vista: sin clics.
const Tarea = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <div className="grid gap-2.5 md:grid-cols-3">
                {datos.steps.map((paso, i) => (
                    <Item key={i} className={`flex flex-col gap-3 ${PANEL} p-5`}>
                        <span className={`self-start rounded-full border border-av-acento/40 px-2.5 py-1 text-av-acento ${MONO}`}>{paso.day}</span>
                        <p className="font-av-titulo text-lg font-semibold leading-snug text-av-texto">{paso.action}</p>
                        {paso.tip && <p className="text-[15px] leading-relaxed text-av-texto-2">{paso.tip}</p>}
                    </Item>
                ))}
            </div>
            {datos.challenge && <Remate className="mt-5">{datos.challenge}</Remate>}
        </>
    );
};

export default Tarea;
