import SlideRenderer from '../SlideRenderer';
import { Escalonado, Item } from './Movimiento';
import Encabezado from './Encabezado';
import Portada from './tipos/Portada';
import Perfil from './tipos/Perfil';
import Encuesta from './tipos/Encuesta';
import Analogia from './tipos/Analogia';
import Cifras from './tipos/Cifras';
import Tabla from './tipos/Tabla';
import Narrativa from './tipos/Narrativa';
import Advertencia from './tipos/Advertencia';
import Plantilla from './tipos/Plantilla';
import Listas from './tipos/Listas';
import Descanso from './tipos/Descanso';
import Destacado from './tipos/Destacado';
import Ejercicio from './tipos/Ejercicio';
import Galeria from './tipos/Galeria';
import Resumen from './tipos/Resumen';
import Tarea from './tipos/Tarea';
import Materiales from './tipos/Materiales';
import DecideRevela from './tipos/DecideRevela';

// Tipo de slide → variante del avanzado. Lo que no está aquí (la pizarra) usa el SlideRenderer del básico.
const TIPOS = {
    hero: Portada,
    profile: Perfil,
    poll: Encuesta,
    analogy: Analogia,
    'stat-comparison': Cifras,
    comparison: Tabla,
    narrative: Narrativa,
    warning: Advertencia,
    'prompt-template': Plantilla,
    'list-comparison': Listas,
    break: Descanso,
    'feature-highlight': Destacado,
    concept: Destacado,
    'exercise-interactive': Ejercicio,
    'gallery-view': Galeria,
    summary: Resumen,
    'next-steps': Tarea,
    'resources-download': Materiales,
    'decide-revela': DecideRevela,
};

const SlideAvanzado = ({ slide, modulo, indice, total, isAdmin }) => {
    const Tipo = TIPOS[slide.type];
    return (
        <Escalonado data-slide-id={slide.id} className="pb-4">
            {slide.type !== 'hero' && <Encabezado slide={slide} modulo={modulo} indice={indice} total={total} />}
            {Tipo ? (
                <Tipo slide={slide} modulo={modulo} indice={indice} total={total} />
            ) : (
                <Item className={slide.type === 'whiteboard' ? 'av-pizarra' : undefined}>
                    <SlideRenderer slide={slide} isAdmin={isAdmin} moduleId={modulo.id} />
                </Item>
            )}
        </Escalonado>
    );
};

export default SlideAvanzado;
