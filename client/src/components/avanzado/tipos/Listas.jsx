import { Item } from '../Movimiento';
import { PANEL } from '../estilos';

const Columna = ({ titulo, items, marca, color }) => (
    <div className="grid content-start gap-2.5">
        <Item className={`font-av-titulo text-xl font-semibold ${color}`}>{titulo}</Item>
        {items.map((texto, i) => (
            <Item key={i} className={`flex items-start gap-3 ${PANEL} px-4 py-3.5 text-[15px] leading-relaxed text-av-texto`}>
                <span className={`font-av-mono ${color}`}>{marca}</span>
                <span>{texto}</span>
            </Item>
        ))}
    </div>
);

const Listas = ({ slide }) => {
    const datos = slide.contentData;
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Columna titulo={datos.leftTitle} items={datos.leftItems} marca="✓" color="text-av-acento" />
            <Columna titulo={datos.rightTitle} items={datos.rightItems} marca="✕" color="text-av-alerta" />
        </div>
    );
};

export default Listas;
