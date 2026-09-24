import { Cifra, Item, Remate } from '../Movimiento';
import { CAJA, MONO, PANEL } from '../estilos';

const Cifras = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <Item className={`${PANEL} p-6`}>
                    <p className={`text-av-texto-2 ${MONO}`}>Antes</p>
                    <p className="mt-3 font-av-titulo text-[clamp(44px,6vw,72px)] font-semibold leading-none text-av-texto-2 line-through decoration-av-linea decoration-2">
                        <Cifra valor={datos.statSecondary} />
                    </p>
                </Item>
                <Item className={CAJA}>
                    <p className={`text-av-acento ${MONO}`}>Hoy</p>
                    <p className="mt-3 font-av-titulo text-[clamp(56px,8vw,104px)] font-extrabold leading-none text-av-acento">
                        <Cifra valor={datos.statPrimary} />
                    </p>
                </Item>
            </div>
            <Item className={`mt-3 text-av-texto-2 ${MONO}`}>{datos.label}</Item>
            {datos.quote && <Remate className="mt-5">{datos.quote}</Remate>}
        </>
    );
};

export default Cifras;
