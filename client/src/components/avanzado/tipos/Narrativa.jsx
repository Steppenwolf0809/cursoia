import { Item, Remate } from '../Movimiento';
import { Hechos } from '../Piezas';
import { CAJA, H2, LEAD } from '../estilos';

// Heading1 ya es el H1 (Encabezado). Con segunda sección: dos columnas en lg, como la muestra de Mata v. Avianca.
const Narrativa = ({ slide }) => {
    const datos = slide.contentData;
    const segunda = Boolean(datos.Heading2 || datos.bullets2);
    const remate = datos.highlight && <Remate className="mt-2">{datos.highlight.text}</Remate>;
    return (
        <div className={`grid gap-6 ${segunda ? 'lg:grid-cols-[1.3fr_1fr] lg:gap-10' : ''}`}>
            <div className="grid content-start gap-2.5">
                {datos.paragraph1 && <Item className={`mb-3 ${LEAD}`}>{datos.paragraph1}</Item>}
                {datos.bullets1 && <Hechos items={datos.bullets1} html />}
                {!segunda && remate}
            </div>
            {segunda && (
                <div className="grid content-start gap-2.5">
                    {datos.Heading2 && (
                        <Item className={CAJA}>
                            <h2 className={H2}>{datos.Heading2}</h2>
                            {datos.paragraph2 && <p className="mt-2.5 text-[15px] leading-relaxed text-av-texto">{datos.paragraph2}</p>}
                        </Item>
                    )}
                    {datos.bullets2 && <Hechos items={datos.bullets2} html />}
                    {remate}
                </div>
            )}
        </div>
    );
};

export default Narrativa;
