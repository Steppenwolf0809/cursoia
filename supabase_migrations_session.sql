-- ============================================
-- MIGRACIÓN: Agregar modo libre a session_state
-- ============================================

-- 1. Agregar columna is_free_mode (booleano para activar/desactivar modo libre)
ALTER TABLE session_state 
ADD COLUMN IF NOT EXISTS is_free_mode BOOLEAN DEFAULT false;

-- 2. Agregar columna free_module_id (ID del módulo que está en modo libre)
ALTER TABLE session_state 
ADD COLUMN IF NOT EXISTS free_module_id VARCHAR(50);

-- 3. Actualizar el registro existente con valores por defecto
UPDATE session_state 
SET is_free_mode = false, 
    free_module_id = NULL 
WHERE is_free_mode IS NULL;

-- 4. Verificar la estructura actualizada
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'session_state' 
ORDER BY ordinal_position;
