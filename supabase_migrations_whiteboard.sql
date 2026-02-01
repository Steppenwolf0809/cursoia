-- ============================================
-- MIGRACIÓN: Agregar pizarra (whiteboard) a session_state
-- ============================================

-- 1. Agregar columna whiteboard_content (texto del contenido de la pizarra)
ALTER TABLE session_state 
ADD COLUMN IF NOT EXISTS whiteboard_content TEXT DEFAULT '';

-- 2. Agregar columna whiteboard_visible (booleano para mostrar/ocultar la pizarra)
ALTER TABLE session_state 
ADD COLUMN IF NOT EXISTS whiteboard_visible BOOLEAN DEFAULT false;

-- 3. Actualizar el registro existente con valores por defecto
UPDATE session_state 
SET whiteboard_content = '', 
    whiteboard_visible = false 
WHERE whiteboard_content IS NULL;

-- 4. Verificar la estructura actualizada
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'session_state' 
ORDER BY ordinal_position;
