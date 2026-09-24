import { Item } from '../Movimiento';
import { LEAD, PANEL } from '../estilos';

const Perfil = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <div className="grid items-start gap-6 md:grid-cols-[220px_1fr] md:gap-10">
            <Item>
                <img src={datos.image} alt={datos.heading} className="aspect-square w-40 rounded-2xl border border-av-linea object-cover md:w-full" />
            </Item>
            <div className="grid gap-2.5">
                <Item className={`mb-2 ${LEAD}`}>{datos.subheading}</Item>
                {datos.bullets.map((viñeta, i) => (
                    <Item key={i} className={`${PANEL} px-4 py-3.5 text-[15px] leading-relaxed text-av-texto sm:text-base`}>{viñeta}</Item>
                ))}
            </div>
        </div>
    );
};

export default Perfil;
