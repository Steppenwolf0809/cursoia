# Tarea para la Virtual 2: seudonimiza tu contrato

IA Avanzada para Abogados · entrega el jueves 15 de octubre de 2026, al inicio de la Virtual 2 (revisión de contratos).

## Qué vas a hacer
Tomar un contrato real de tu práctica y dejarlo sin datos que identifiquen a las personas, usando el Anonimizador en tu propia computadora. Con ese archivo haremos la matriz de riesgos en la Virtual 2.

## Qué necesitas
- Un contrato tuyo en Word (.docx): compraventa, promesa, arrendamiento, prestación de servicios u otro.
- El Anonimizador: una página que se abre en tu navegador, sin internet. El documento nunca sale de tu computadora. Recibirás el archivo y las instrucciones para abrirlo antes de la tarea.

## Pasos
1. Abre el Anonimizador y carga tu contrato.
2. Revisa la lista de la derecha: nombres, cédulas, RUC, teléfonos, correos y direcciones. Un clic marca todas las apariciones del mismo dato.
3. Ponle a cada persona su etiqueta (por ejemplo VENDEDOR, COMPRADOR, ARRENDADOR) y asigna cada dato a su persona: la cédula del vendedor queda como `[CEDULA_VENDEDOR]`.
4. Pulsa «Anonimizar» y compara con «Ver el original».
5. Busca lo que el programa no marca: claves catastrales, números de matrícula o de predio, linderos con nombres de vecinos, nombres de la notaría o del notario si identifican el caso, fechas y cuantías que hagan reconocible la operación. Cámbialos a mano por etiquetas (`[CLAVE_CATASTRAL]`, `[INMUEBLE_1]`).
6. Revisa encabezados, pies de página y notas.
7. Exporta a .docx o .md.
8. Anota aparte, en tu computadora, qué etiqueta corresponde a cada persona real. Esa tabla nunca se sube.

## Antes de traerlo, comprueba
- [ ] No queda ningún nombre, cédula, RUC, teléfono, correo ni dirección real.
- [ ] Un tercero no podría reconocer la operación por el inmueble, la fecha o la cuantía.
- [ ] El original sigue guardado solo en tu computadora.

## Lo que no debes hacer
- Pedirle a la IA que anonimice el contrato: los datos ya habrían salido.
- Anonimizar solo los nombres.
- Traer un contrato con datos de salud, de menores, penales o bancarios (color rojo del semáforo). Si es tu único contrato, elige otro.

Ver también: `semaforo-confidencialidad.md`.
