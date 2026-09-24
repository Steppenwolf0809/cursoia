import { useState } from 'react';
import GalleryDisplay from '../../GalleryDisplay';
import { Item } from '../Movimiento';
import { LEAD, MONO, PANEL } from '../estilos';

const Galeria = ({ slide, modulo }) => {
    const datos = slide.contentData;
    const [soloDestacados, setSoloDestacados] = useState(false);
    const boton = (activo) => `rounded-md px-3 py-1.5 ${MONO} ${activo ? 'bg-av-acento text-av-sobre-acento' : 'text-av-texto-2 hover:text-av-texto'}`;
    return (
        <>
            {datos.description && <Item className={LEAD}>{datos.description}</Item>}
            <Item className={`mt-5 inline-flex gap-1 ${PANEL} p-1`}>
                <button type="button" className={boton(soloDestacados)} onClick={() => setSoloDestacados(true)}>Destacados</button>
                <button type="button" className={boton(!soloDestacados)} onClick={() => setSoloDestacados(false)}>Todos</button>
            </Item>
            <Item className="mt-5">
                <GalleryDisplay showAll={!soloDestacados} showHighlighted exerciseId={datos.exerciseId || null} moduleId={modulo.id} />
            </Item>
        </>
    );
};

export default Galeria;
