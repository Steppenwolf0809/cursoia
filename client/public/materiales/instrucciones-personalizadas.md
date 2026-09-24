# Instrucciones personalizadas: configura tu IA una sola vez

IA Avanzada para Abogados · Virtual 1. Lo que repites en cada chat, escríbelo una vez. Y explica el porqué: la guía de Anthropic recomienda dar el motivo en vez de solo la orden.

## Tres niveles
- **Cuenta:** se aplica a todos tus chats. Aquí va la plantilla 1.
- **Proyecto o asistente:** se aplica solo a los chats de ese Proyecto o Gem. Aquí va la plantilla 2.
- **Carpeta:** un archivo (`CLAUDE.md` o `AGENTS.md`) que lee un agente cuando trabaja en esa carpeta. Lo vemos a fondo en la Virtual 4.

## Plantilla 1: tu cuenta (cópiala y completa lo que está entre corchetes)

    Soy [abogado/a o notario/a] en [ciudad], Ecuador. Trabajo sobre todo en [materias].

    Idioma y tono:
    - Responde en español de Ecuador, registro profesional, con tuteo. Nunca voseo.
    - Sin emojis. Prosa clara; usa listas solo para elementos separados y tablas para comparar.
    - Primero la respuesta; el contexto después y solo si hace falta.

    Crítica honesta:
    - No me des la razón para complacerme. Si mi planteamiento tiene un error o un riesgo, dilo primero y explica por qué, con la norma o el hecho que lo sustenta.
    - Si hay una opción mejor que la que pido, dímela antes de hacer lo que pedí.

    Contra las alucinaciones:
    - Si no sabes algo o no tienes la fuente, dilo. No inventes artículos, sentencias ni citas.
    - Califica tu confianza (alta, media o baja) en cada afirmación jurídica.
    - Declara los supuestos que hiciste.
    - Cuando cites una norma o un fallo, da el número de artículo o de sentencia para que yo lo verifique en la fuente oficial.

## Plantilla 2: el Proyecto «Mi despacho»

    Contexto del despacho:
    - Somos [nombre del despacho o notaría], en [ciudad], Ecuador. Atendemos [tipo de clientes y materias].
    - Los documentos de este Proyecto son nuestras plantillas y las normas vigentes que usamos: [lista de archivos].

    Cómo trabajar:
    - Usa primero los documentos de este Proyecto. Si la respuesta no está en ellos, dilo y separa lo que viene de las fuentes de lo que viene de tu conocimiento general.
    - Para cada punto jurídico, dame: la fuente exacta (artículo y cita textual de máximo dos líneas), tu nivel de confianza (alta, media o baja), lo que falta o no está claro, y tus supuestos.
    - Si las fuentes no alcanzan, responde: "la información proporcionada es insuficiente para determinarlo".
    - Los documentos de clientes llegan seudonimizados, con etiquetas como [COMPRADOR_1] o [CEDULA_VENDEDOR]. Conserva esas etiquetas tal cual y nunca intentes adivinar los datos reales.

    Formato de entrega:
    - [Por ejemplo: minutas con la estructura de nuestra plantilla; informes de máximo una página.]

## Dónde pegarla (menús con su nombre en inglés, septiembre de 2026)
| IA | Cuenta entera (plantilla 1) | Proyecto o asistente (plantilla 2) | Carpeta (agentes) |
|---|---|---|---|
| Claude | Settings → Instructions for Claude | Dentro del Proyecto: sus instrucciones | Claude Code: `~/.claude/CLAUDE.md` (el tuyo) y `CLAUDE.md` en la carpeta del proyecto; se suman |
| ChatGPT | Settings → Personalization → Custom instructions | Dentro del Proyecto: sus instrucciones | Codex: `AGENTS.md` en `~/.codex`, en la raíz del repositorio o en sus subcarpetas |
| Gemini | Settings → información guardada (`gemini.google.com/saved-info`) | Un Gem: Explorar Gems → New Gem, solo desde la web | No aplica |

## Consejos
- Prueba las instrucciones con una pregunta cuya respuesta ya conoces.
- Si la IA sigue dándote la razón en todo, explícale para qué necesitas la crítica («voy a presentar esto ante un juez y necesito saber dónde me van a atacar»).
- Revisa tus instrucciones cada mes: las herramientas cambian de nombre y de menú.

Fuentes: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features ; https://support.claude.com/en/articles/9517075-what-are-projects ; https://code.claude.com/docs/en/memory ; https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions ; https://developers.openai.com/codex/guides/agents-md ; https://support.google.com/gemini/answer/13594961 ; https://support.google.com/gemini/answer/15235603 ; https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices . Reglas contra alucinaciones: Holly Cope, https://www.youtube.com/watch?v=Q-nA44oxXp0
