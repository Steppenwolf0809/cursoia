import SlideRenderer from '../SlideRenderer';
import { Escalonado, Item } from './Movimiento';
import Encabezado from './Encabezado';

// Tipo de slide → variante del avanzado. Lo que no está aquí (la pizarra) usa el SlideRenderer del básico.
const TIPOS = {
};

const SlideAvanzado = ({ slide, modulo, indice, total, isAdmin }) => {
    const Tipo = TIPOS[slide.type];
    return (
        <Escalonado data-slide-id={slide.id} className="pb-4">
            {slide.type !== 'hero' && <Encabezado slide={slide} modulo={modulo} indice={indice} total={total} />}
            {Tipo ? (
                <Tipo slide={slide} modulo={modulo} indice={indice} total={total} />
            ) : (
                <Item>
                    <SlideRenderer slide={slide} isAdmin={isAdmin} moduleId={modulo.id} />
                </Item>
            )}
        </Escalonado>
    );
};

export default SlideAvanzado;
