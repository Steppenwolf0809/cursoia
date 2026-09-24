import { Item, Remate } from '../Movimiento';
import { LEAD, PANEL } from '../estilos';

const Advertencia = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            {datos.paragraph && <Item className={LEAD}>{datos.paragraph}</Item>}
            <div className="mt-6 grid gap-2.5">
                {datos.bullets?.map((viñeta, i) => (
                    <Item key={i} className={`flex items-start gap-3 ${PANEL} border-l-2 border-l-av-alerta px-4 py-3.5 text-[15px] leading-relaxed text-av-texto`}>
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-av-alerta" />
                        <span>{viñeta}</span>
                    </Item>
                ))}
                {datos.highlight && <Remate className="mt-2">{datos.highlight.text}</Remate>}
            </div>
        </>
    );
};

export default Advertencia;
