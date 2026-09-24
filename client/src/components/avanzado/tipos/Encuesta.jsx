import { Item } from '../Movimiento';
import { PANEL } from '../estilos';

// La encuesta vive en el panel «Interacción» (a la derecha en escritorio, arriba en móvil).
const Encuesta = () => (
    <Item className={`flex items-center gap-3 ${PANEL} px-5 py-4 text-av-texto-2`}>
        <span className="h-2.5 w-2.5 flex-none rounded-full bg-av-acento" />
        <span>Responde en el panel <span className="text-av-texto">Interacción</span>: los resultados se ven en vivo.</span>
    </Item>
);

export default Encuesta;
