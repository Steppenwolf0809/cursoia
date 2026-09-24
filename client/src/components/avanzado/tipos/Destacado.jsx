import { Item } from '../Movimiento';
import { Consejo, Hechos } from '../Piezas';
import ImagenAmpliable from '../ImagenAmpliable';
import { LEAD } from '../estilos';

// feature-highlight (steps) y concept (bullets): texto, imagen ampliable y lista numerada.
const Destacado = ({ slide }) => {
    const datos = slide.contentData;
    const pasos = (datos.steps || datos.bullets || []).map((paso) => paso.replace(/^\d+\.\s/, ''));
    return (
        <>
            {datos.paragraph && <Item className={LEAD}>{datos.paragraph}</Item>}
            <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
                {datos.image && (
                    <Item className="min-w-0">
                        <ImagenAmpliable src={datos.image} alt={datos.heading} />
                    </Item>
                )}
                <div className="grid content-start gap-2.5">
                    <Hechos items={pasos} />
                    {datos.tip && <Consejo className="mt-2">{datos.tip}</Consejo>}
                </div>
            </div>
        </>
    );
};

export default Destacado;
