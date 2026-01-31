-- ============================================
-- MIGRACIÓN: Galería por módulo + Campos IA
-- ============================================

-- 1. Agregar columna module_id a gallery_submissions
ALTER TABLE gallery_submissions 
ADD COLUMN IF NOT EXISTS module_id VARCHAR(50);

-- 2. Agregar columna ai_name (nombre de la IA usada)
ALTER TABLE gallery_submissions 
ADD COLUMN IF NOT EXISTS ai_name VARCHAR(100);

-- 3. Agregar columna ai_model (modelo específico)
ALTER TABLE gallery_submissions 
ADD COLUMN IF NOT EXISTS ai_model VARCHAR(100);

-- 4. Crear índice para búsquedas por módulo
CREATE INDEX IF NOT EXISTS idx_gallery_module_id 
ON gallery_submissions(module_id);

-- 5. Actualizar registros existentes con module_id si se puede inferir del exercise_id
-- (Esto es opcional, depende de tus datos existentes)

-- Verificar la estructura actualizada
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'gallery_submissions' 
ORDER BY ordinal_position;
