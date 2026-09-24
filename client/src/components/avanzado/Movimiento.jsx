import { useEffect, useState } from 'react';
import { animate, motion, useReducedMotion } from 'framer-motion';
import { partirCifra } from './rotulos';
import { REMATE } from './estilos';

// Fuera de JSX para que el lint no marque `motion` como no usado.
const MotionDiv = motion.div;

const contenedor = {
    oculto: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
// Sin `delay` en los hijos: un delay propio pisa el escalonado del contenedor.
const elemento = {
    oculto: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};
const remate = {
    oculto: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// Envuelve el slide entero. Sus Item y Remate entran uno a uno, en orden del DOM, al montarse.
// Con movimiento reducido, initial={false}: todo aparece ya en su estado final.
export function Escalonado({ className, children, ...resto }) {
    const reducir = useReducedMotion();
    return (
        <MotionDiv className={className} variants={contenedor} initial={reducir ? false : 'oculto'} animate="visible" {...resto}>
            {children}
        </MotionDiv>
    );
}

// Un elemento que entra en su turno. Nunca dentro de otro Item.
export function Item({ className, children, ...resto }) {
    return <MotionDiv className={className} variants={elemento} {...resto}>{children}</MotionDiv>;
}

// El remate del slide. Va último en el DOM para entrar al final.
export function Remate({ className = '', children }) {
    return <MotionDiv data-remate className={`${REMATE} ${className}`} variants={remate}>{children}</MotionDiv>;
}

// Cuenta desde 0 hasta el número del dato («200K», «1M»), conservando el sufijo.
// Si el dato no es un número, o hay movimiento reducido, muestra el dato tal cual.
export function Cifra({ valor }) {
    const reducir = useReducedMotion();
    const partes = partirCifra(valor);
    const [texto, setTexto] = useState(() => (partes ? `0${partes.sufijo}` : String(valor)));

    useEffect(() => {
        const p = partirCifra(valor);
        if (reducir || !p) return undefined;
        // delay: que la cuenta se vea, porque la tarjeta entra en su turno del escalonado (~0,3 s).
        const control = animate(0, p.numero, {
            delay: 0.4,
            duration: 1.2,
            ease: 'easeOut',
            onUpdate: (v) => setTexto(`${v.toFixed(p.decimales)}${p.sufijo}`),
            onComplete: () => setTexto(String(valor)),
        });
        return () => control.stop();
    }, [valor, reducir]);

    return <span data-cifra={valor} className="tabular-nums">{reducir || !partes ? valor : texto}</span>;
}
