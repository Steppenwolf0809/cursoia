import { Presentation } from "lucide-react";

export const WHITEBOARD_MODULE = {
    id: "whiteboard",
    title: "Pizarra",
    icon: Presentation,
    isWhiteboard: true,
    slides: [
        {
            id: "wb-0",
            title: "Pizarra del Instructor",
            type: "whiteboard",
            contentData: {
                heading: "Pizarra",
                paragraph: "Aquí el instructor puede compartir texto con todos los participantes."
            }
        }
    ]
};

export default WHITEBOARD_MODULE;
