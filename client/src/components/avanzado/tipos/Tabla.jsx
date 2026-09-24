import { Item } from '../Movimiento';
import { LEAD, MONO, PANEL } from '../estilos';

// Columnas en escritorio; en móvil (< md) cada fila es una tarjeta de una columna.
const COLUMNAS = { 3: 'md:grid-cols-[1.1fr_1.6fr_1fr]', 4: 'md:grid-cols-4' };

const Tabla = ({ slide }) => {
    const { paragraph, headers, rows } = slide.contentData;
    const columnas = COLUMNAS[headers.length] || 'md:grid-cols-3';
    // En las de 3 columnas la última es el resultado («Consecuencia», «Dónde puede ir»): va resaltada.
    const resaltarUltima = headers.length === 3;
    return (
        <>
            {paragraph && <Item className={LEAD}>{paragraph}</Item>}
            <div role="table" className="mt-7 grid gap-2.5">
                <Item role="row" className={`hidden gap-6 px-5 pb-1 text-av-texto-2 md:grid ${columnas} ${MONO}`}>
                    {headers.map((encabezado, j) => <span key={j} role="columnheader">{encabezado}</span>)}
                </Item>
                {rows.map((fila, i) => (
                    <Item key={i} role="row" className={`grid gap-1.5 ${PANEL} px-4 py-3.5 text-[15px] leading-normal md:gap-6 md:px-5 md:py-4 ${columnas}`}>
                        {fila.map((celda, j) => {
                            if (j === 0) {
                                return <span key={j} role="rowheader" className="font-av-titulo text-base font-semibold text-av-texto md:text-[16.5px]">{celda}</span>;
                            }
                            const resaltada = resaltarUltima && j === fila.length - 1;
                            return (
                                <span key={j} role="cell" className={resaltada ? 'font-semibold text-av-acento-2' : 'text-av-texto'}>
                                    {headers[j] && <span className={`mr-1.5 text-av-texto-2 md:hidden ${MONO}`}>{headers[j]}</span>}
                                    {celda}
                                </span>
                            );
                        })}
                    </Item>
                ))}
            </div>
        </>
    );
};

export default Tabla;
