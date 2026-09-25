import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { Item } from '../Movimiento';
import { Hechos } from '../Piezas';
import { correctas, guardarEstado, leerEstado, opcionesDe, puntaje, validar } from '../decide';
import { CAJA, H2, LEAD, MONO, PANEL } from '../estilos';
import VentanaContexto from '../VentanaContexto';

const OPCION = 'flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-av-linea px-3 py-2 text-[15px] leading-snug text-av-texto transition-colors hover:border-av-acento/60 peer-checked:border-av-acento peer-checked:bg-av-acento/15 peer-focus-visible:ring-2 peer-focus-visible:ring-av-acento peer-disabled:cursor-default peer-disabled:hover:border-av-linea motion-reduce:transition-none';
const BOTON = 'min-h-[44px] rounded-xl bg-av-acento px-5 py-2.5 font-semibold text-av-sobre-acento transition-colors hover:bg-av-acento-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-av-acento-2 focus-visible:ring-offset-2 focus-visible:ring-offset-av-fondo motion-reduce:transition-none';

// El alumno decide y después revela la respuesta del curso. Sin backend: lo marcado vive en sessionStorage.
// key: SlideAvanzado no remonta al cambiar de slide, y lo marcado en uno no debe pasar a otro.
const DecideRevela = ({ slide }) => <Contenido key={slide.id} slide={slide} />;

function Contenido({ slide }) {
    const datos = slide.contentData;
    const [estado, setEstado] = useState(() => leerEstado(slide.id));
    const resultado = useRef(null);
    const recienRevelado = useRef(false);

    useEffect(() => {
        guardarEstado(slide.id, estado);
    }, [slide.id, estado]);

    // El botón desaparece al revelar: el foco pasa al resultado para no perderse.
    useEffect(() => {
        if (recienRevelado.current) resultado.current?.focus();
        recienRevelado.current = false;
    }, [estado.revelado]);

    const errores = import.meta.env.DEV ? validar(datos) : [];
    if (errores.length) {
        return (
            <div data-decide-errores className="rounded-xl border border-av-alerta bg-av-alerta/10 p-5 text-av-texto">
                <p className={`text-av-alerta ${MONO}`}>decide-revela: contentData con errores</p>
                <ul className="mt-2 list-disc pl-5 text-[15px]">
                    {errores.map((e) => <li key={e}>{e}</li>)}
                </ul>
            </div>
        );
    }

    const { items } = datos;
    const cazar = Boolean(datos.pregunta);
    const clasificar = !cazar && Boolean(datos.opciones);
    const { aciertos, respondidos, total } = puntaje(items, estado.elecciones);
    const fase = estado.revelado ? 'revelado' : respondidos ? 'respondido' : 'sin-responder';

    const elegir = (itemId, indice) => setEstado((e) => ({ ...e, elecciones: { ...e.elecciones, [itemId]: indice } }));
    const revelar = () => {
        recienRevelado.current = true;
        setEstado((e) => ({ ...e, revelado: true }));
    };

    const cursoDice = (item) => {
        const primera = correctas(item)[0];
        return `El curso dice: ${cazar ? `la frase ${primera + 1}` : opcionesDe(item, datos)[primera]}`;
    };
    const resultadoDe = (item) => {
        const elegida = estado.elecciones[item.id];
        if (elegida === undefined) return { tipo: 'sin', texto: cursoDice(item) };
        if (correctas(item).includes(elegida)) return { tipo: 'coincide', texto: 'Coincide' };
        return { tipo: 'difiere', texto: cursoDice(item) };
    };
    const textoResultado = total > 1
        ? (respondidos ? `Coincidiste en ${aciertos} de ${total}` : 'Estas son las respuestas del curso')
        : resultadoDe(items[0]).texto;

    const pintarItem = (item) => {
        const opciones = opcionesDe(item, datos);
        const buenas = correctas(item);
        const r = resultadoDe(item);
        const idTexto = `${slide.id}-${item.id}-texto`;
        const idPorque = `${slide.id}-${item.id}-porque`;
        return (
            <div
                role="radiogroup"
                aria-labelledby={idTexto}
                aria-describedby={estado.revelado ? idPorque : undefined}
                className={clasificar ? 'md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-4' : ''}
            >
                <p
                    id={idTexto}
                    className={cazar
                        ? `mb-2 text-av-texto-2 ${MONO}`
                        : clasificar
                            ? 'text-[15px] leading-snug text-av-texto'
                            : 'mb-3 font-av-titulo text-lg font-semibold leading-snug text-av-texto'}
                >
                    {item.texto}
                </p>
                <div className={clasificar ? 'mt-3 grid grid-cols-3 gap-2 md:mt-0 md:flex' : 'grid gap-2'}>
                    {opciones.map((opcion, i) => (
                        <label key={i} className="block min-w-0">
                            <input
                                type="radio"
                                className="peer sr-only"
                                name={`${slide.id}-${item.id}`}
                                checked={estado.elecciones[item.id] === i}
                                disabled={estado.revelado}
                                onChange={() => elegir(item.id, i)}
                            />
                            <span className={`${OPCION} ${clasificar ? 'justify-center text-center md:whitespace-nowrap' : ''}`}>
                                <span className="flex-1">{opcion}</span>
                                {cazar && estado.revelado && (buenas.includes(i) ? (
                                    <span className={`flex shrink-0 items-center gap-1 text-av-alerta ${MONO}`}><X size={14} aria-hidden="true" />Inventada</span>
                                ) : (
                                    <span className={`flex shrink-0 items-center gap-1 text-av-acento ${MONO}`}><Check size={14} aria-hidden="true" />Cierta</span>
                                ))}
                            </span>
                        </label>
                    ))}
                </div>
                {estado.revelado && (
                    <div id={idPorque} className="mt-3 md:col-span-2">
                        <p className={`flex items-center gap-2 ${r.tipo === 'coincide' ? 'text-av-acento' : r.tipo === 'difiere' ? 'text-av-alerta' : 'text-av-texto-2'} ${MONO}`}>
                            {r.tipo === 'coincide' && <Check size={14} aria-hidden="true" />}
                            {r.tipo === 'difiere' && <X size={14} aria-hidden="true" />}
                            {r.texto}
                        </p>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-av-texto">{item.porque}</p>
                    </div>
                )}
            </div>
        );
    };

    const preguntas = (
        <div className="grid min-w-0 content-start gap-3">
            {cazar ? (
                <>
                    <Item className="ml-auto w-full rounded-2xl rounded-br-md bg-av-acento/15 px-4 py-3 text-[15px] leading-relaxed text-av-texto sm:w-auto sm:max-w-[60%]">
                        <p className={`mb-1 text-av-texto-2 ${MONO}`}>Tú</p>
                        {datos.pregunta}
                    </Item>
                    <Item className={`${PANEL} rounded-bl-md p-4`}>
                        <p className={`mb-2 text-av-texto-2 ${MONO}`}>IA</p>
                        {pintarItem(items[0])}
                    </Item>
                </>
            ) : (
                items.map((item) => (
                    <Item key={item.id} className={`${PANEL} ${clasificar ? 'px-4 py-3' : 'p-5'}`}>
                        {pintarItem(item)}
                    </Item>
                ))
            )}
            <Item aria-live="polite" className="flex flex-wrap items-center gap-4 pt-1">
                {estado.revelado ? (
                    <p
                        ref={resultado}
                        tabIndex={-1}
                        data-resultado
                        className="rounded-xl bg-av-acento px-5 py-3 font-av-titulo text-lg font-bold text-av-sobre-acento focus:outline-none focus-visible:ring-2 focus-visible:ring-av-acento-2"
                    >
                        {textoResultado}
                    </p>
                ) : (
                    <>
                        <button type="button" onClick={revelar} className={BOTON}>
                            {datos.boton || (total > 1 ? 'Ver respuestas' : 'Ver respuesta')}
                        </button>
                        <span data-contador className={`text-av-texto-2 ${MONO}`}>{respondidos} de {total} respondidas</span>
                    </>
                )}
            </Item>
            {estado.revelado && datos.cierre && (
                <>
                    <Item className={CAJA}><h2 className={H2}>{datos.cierre.titulo}</h2></Item>
                    <Hechos items={datos.cierre.puntos} />
                </>
            )}
        </div>
    );

    return (
        <div data-decide data-estado={fase} className="grid gap-4">
            {datos.paragraph && <Item className={LEAD}>{datos.paragraph}</Item>}
            {datos.rotulo && <Item className={`text-av-texto-2 ${MONO}`}>{datos.rotulo}</Item>}
            {datos.animacion === 'ventana-contexto' ? (
                <div className="grid gap-6 xl:grid-cols-2">
                    <Item className="min-w-0">
                        <VentanaContexto mensajes={datos.mensajes} ventana={datos.ventana} revelado={estado.revelado} />
                    </Item>
                    {preguntas}
                </div>
            ) : preguntas}
        </div>
    );
}

export default DecideRevela;
