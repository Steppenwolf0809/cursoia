import { Item } from './Movimiento';
import { CAJA, MONO, PANEL } from './estilos';

// Lista numerada 01, 02… en tarjetas, como los «hechos» de la muestra.
// html: los textos traen <b> o <a> (viñetas de narrative) y se pintan como HTML.
export function Hechos({ items, html = false }) {
    return items.map((texto, i) => (
        <Item key={i} className={`grid grid-cols-[34px_1fr] gap-2.5 ${PANEL} px-4 py-3.5 text-[15px] leading-relaxed text-av-texto`}>
            <span className={`pt-0.5 text-av-acento ${MONO}`}>{String(i + 1).padStart(2, '0')}</span>
            {html ? <span className="av-html" dangerouslySetInnerHTML={{ __html: texto }} /> : <span>{texto}</span>}
        </Item>
    ));
}

// Caja del acento con la etiqueta «Consejo».
export function Consejo({ className = '', children }) {
    return (
        <Item className={`${CAJA} ${className}`}>
            <p className={`text-av-acento ${MONO}`}>Consejo</p>
            <p className="mt-2 text-[15px] leading-relaxed text-av-texto">{children}</p>
        </Item>
    );
}
