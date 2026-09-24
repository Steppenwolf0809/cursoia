import { Item } from '../Movimiento';
import { partir } from '../rotulos';
import { MONO } from '../estilos';

// Portada solo tipográfica (sin llm-diagram.png), con la órbita de la muestra.
const Portada = ({ slide, modulo, indice, total }) => {
    const datos = slide.contentData;
    return (
        <div className="relative flex min-h-[70vh] flex-col justify-center gap-7 overflow-hidden py-10">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-[120px] -right-[190px] h-[360px] w-[360px] md:-right-40 md:bottom-auto md:top-1/2 md:h-[620px] md:w-[620px] md:-translate-y-1/2">
                <div className="av-orbita-giro absolute inset-0 rounded-full border border-av-linea">
                    <span className="av-latido absolute left-[calc(50%-6px)] top-[-6px] h-3 w-3 rounded-full bg-av-acento shadow-[0_0_18px_rgb(var(--av-acento))]" />
                </div>
                <div className="av-orbita-giro-inverso absolute inset-[15%] rounded-full border border-av-linea">
                    <span className="av-latido absolute bottom-[12%] left-[6%] h-2 w-2 rounded-full bg-av-acento [animation-delay:1.2s]" />
                </div>
                <div className="absolute inset-[31%] rounded-full border border-av-acento/50 shadow-[inset_0_0_80px_rgb(var(--av-acento)/0.15)]" />
            </div>

            <Item className={`relative flex items-center gap-2.5 text-av-texto-2 ${MONO}`}>
                <span className="rounded-full border border-av-acento/40 px-2.5 py-1 text-av-acento">{partir(modulo.title)[0]}</span>
                <span>{String(indice + 1).padStart(2, '0')} / {total}</span>
            </Item>
            <Item className="relative">
                <h1 className="max-w-[10ch] font-av-titulo text-[clamp(46px,7.4vw,104px)] font-extrabold leading-[0.95] tracking-[-0.025em] text-av-texto">
                    {datos.heading}
                </h1>
                <div className="mt-7 h-1.5 w-[120px] rounded-full bg-av-acento" />
            </Item>
            <Item className="relative max-w-[38ch] text-[clamp(17px,1.7vw,22px)] leading-normal text-av-texto-2">
                {datos.paragraph}
            </Item>
        </div>
    );
};

export default Portada;
