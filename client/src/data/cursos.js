import { COURSE_MODULES as BASICO } from './course-content';
import { COURSE_MODULES as AVANZADO } from './avanzado/index.js';

// VITE_COURSE=avanzado muestra el curso avanzado; sin la variable (o con otro valor), el básico.
export const ES_AVANZADO = import.meta.env.VITE_COURSE === 'avanzado';
export const COURSE_MODULES = ES_AVANZADO ? AVANZADO : BASICO;
