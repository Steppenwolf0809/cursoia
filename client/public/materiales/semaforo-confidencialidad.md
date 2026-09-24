# Semáforo de confidencialidad

IA Avanzada para Abogados · Virtual 1. Propuesta del curso, no norma. Ante la duda, sube un color. Revisado el 24 de septiembre de 2026; las políticas de los proveedores cambian.

## Verde: se puede subir
**Dónde:** cualquier plan pago con el entrenamiento desactivado (nivel 1) o superior.
- Notaría: modelo de minuta de compraventa sin datos reales; resumen de la Ley Notarial; requisitos de un poder general.
- Abogacía: jurisprudencia y doctrina públicas; plantilla de demanda en blanco; traducir o resumir una ley.
- Material de capacitación del despacho.

## Amarillo: solo seudonimizado o con consentimiento
**Dónde:** plan pago con entrenamiento desactivado, solo después de seudonimizar en tu computadora (nombres, cédulas, RUC, direcciones, claves catastrales cambiados por `[VENDEDOR_1]`, `[INMUEBLE_1]`), o con el consentimiento explícito e informado del cliente (art. 60.2 LOPDP). Mejor en un plan de equipo (nivel 2).
- Notaría: minuta de compraventa o promesa con las partes etiquetadas; liquidación de sociedad conyugal seudonimizada.
- Abogacía: contrato de arrendamiento de un cliente seudonimizado; demanda ejecutiva o expediente ya seudonimizados.

## Rojo: no se sube
**Dónde:** ningún plan personal ni de equipo estándar. Por excepción, API de Claude con Zero Data Retention (nivel 3) o nube empresarial (nivel 4), siempre con consentimiento expreso del cliente.
- Datos de salud, de niñas, niños y adolescentes (por ejemplo, autorizaciones de salida del país o venta de bienes de menores), procesos penales, cuentas y estados bancarios.
- Casos conocidos, en los que la combinación de hechos identifica a la persona aunque cambies el nombre.

## Los cuatro niveles de protección
| Nivel | ¿Entrena con tus datos? | Cuánto se guardan |
|---|---|---|
| 1. Plan personal (Claude Free, Pro o Max; ChatGPT Free, Plus o Pro) | Claude: tú decides. ChatGPT: entrena con tus chats salvo que lo desactives (opt-out), según chatgpt.com/pricing | Claude, entrenamiento desactivado: lo borrado se elimina en 30 días; activado: hasta 5 años |
| 2. Equipo o empresa (Claude Team o Enterprise) | No | Lo borrado sale en 30 días; Enterprise configura la retención |
| 3. API de Claude con Zero Data Retention | No | Nada tras responder, salvo lo marcado por seguridad (hasta 2 años); Fable y Mythos exigen 30 días |
| 4. Claude en Amazon Bedrock o Google Vertex AI | Según tu contrato con AWS o Google, que son los encargados | Según la nube; Bedrock no tiene región garantizada en Sudamérica |

## Lo que dice la LOPDP
- Tú eres el responsable; el proveedor de IA es el encargado (arts. 4, 34 y 47).
- El encargo exige un contrato que prohíba otros usos y obligue a devolver o destruir los datos (art. 34).
- El encargo no es transferencia internacional (Resolución SPDP-SPD-2026-0004-R, art. 23). Si el proveedor usa los datos para fines propios, sí lo es; Estados Unidos no tiene nivel adecuado declarado.
- Criterio del curso: sin contrato de encargo por escrito, trátalo como transferencia: seudonimiza o pide consentimiento.

## Errores comunes
- Creer que desactivar el entrenamiento equivale a confidencialidad.
- Pedirle a la IA que anonimice un documento real: los datos ya salieron.
- Anonimizar solo el nombre.
- Dejar que un agente lea la carpeta real de clientes sin revisarla.

Fuentes: LOPDP, R.O. Suplemento 459 (26 may 2021); Resolución SPDP-SPD-2026-0004-R (https://spdp.gob.ec/); https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data ; https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data ; https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
