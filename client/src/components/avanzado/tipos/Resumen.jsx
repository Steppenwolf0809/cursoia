import { Item, Remate } from '../Movimiento';
import { partir } from '../rotulos';
import { PANEL } from '../estilos';

// Cada viñeta «Término: explicación» se parte en término (acento) y explicación.
const Resumen = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <div className="grid gap-2.5 md:grid-cols-2">
                {datos.bullets.map((viñeta, i) => {
                    const [termino, resto] = partir(viñeta);
                    return (
                        <Item key={i} className={`${PANEL} p-5`}>
                            {resto ? (
                                <>
                                    <p className="font-av-titulo text-lg font-semibold text-av-acento">{termino}</p>
                                    <p className="mt-1.5 text-[15px] leading-relaxed text-av-texto">{resto}</p>
                                </>
                            ) : (
                                <p className="text-[15px] leading-relaxed text-av-texto">{termino}</p>
                            )}
                        </Item>
                    );
                })}
            </div>
            {datos.callToAction && <Remate className="mt-5">{datos.callToAction}</Remate>}
        </>
    );
};

export default Resumen;
