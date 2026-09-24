import { Car, Cpu, Info, User } from 'lucide-react';
import { Item } from '../Movimiento';
import { CAJA, LEAD, MONO, PANEL } from '../estilos';

// Íconos que usan las analogías de la Virtual 1. Uno desconocido cae en Info.
const ICONOS = { Car, Cpu, User };

const Analogia = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                {[datos.left, datos.right].map((lado, i) => {
                    const Icono = ICONOS[lado.icon] || Info;
                    return (
                        <Item key={i} className={i === 0 ? `${PANEL} p-6` : CAJA}>
                            <Icono className={`h-7 w-7 ${i === 0 ? 'text-av-texto-2' : 'text-av-acento'}`} strokeWidth={1.75} />
                            <p className={`mt-5 text-av-texto-2 ${MONO}`}>{lado.title}</p>
                            <p className="mt-2 font-av-titulo text-[clamp(26px,3vw,40px)] font-semibold leading-tight text-av-texto">{lado.text}</p>
                        </Item>
                    );
                })}
            </div>
            {datos.footer && <Item className={`mt-5 ${LEAD}`}>{datos.footer}</Item>}
        </>
    );
};

export default Analogia;
