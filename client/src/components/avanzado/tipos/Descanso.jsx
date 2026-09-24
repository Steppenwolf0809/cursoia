import { Item } from '../Movimiento';
import { LEAD, MONO, PANEL } from '../estilos';

const Descanso = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <Item className={LEAD}>{datos.message}</Item>
            {datos.nextPreview && (
                <Item className={`mt-8 inline-flex flex-wrap items-center gap-3 ${PANEL} px-5 py-4`}>
                    <span className={`text-av-texto-2 ${MONO}`}>A continuación</span>
                    <span className="font-av-titulo text-lg font-semibold text-av-acento">{datos.nextPreview}</span>
                </Item>
            )}
        </>
    );
};

export default Descanso;
