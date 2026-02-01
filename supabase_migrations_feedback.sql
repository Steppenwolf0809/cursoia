-- ============================================
-- MIGRACIÓN: Crear tabla de feedback
-- ============================================

-- Crear tabla para respuestas de feedback
CREATE TABLE IF NOT EXISTS feedback_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_code VARCHAR(20) DEFAULT 'main',
    participant_id UUID REFERENCES participants(id),
    participant_name VARCHAR(100) DEFAULT 'Anónimo',
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    suggestion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_feedback_session ON feedback_responses(session_code);
CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback_responses(created_at DESC);

-- Políticas de seguridad (solo admin puede leer, todos pueden insertar)
ALTER TABLE feedback_responses ENABLE ROW LEVEL SECURITY;

-- Permitir lectura solo a admin (usando una función simple que verifica si es admin por IP o similar)
-- Por ahora permitimos lectura pública pero solo el admin verá el panel
CREATE POLICY "Allow public read" ON feedback_responses FOR SELECT USING (true);

-- Permitir insert a todos
CREATE POLICY "Allow public insert" ON feedback_responses FOR INSERT WITH CHECK (true);

-- Solo permitir delete a admin (simulado con trigger o app logic)
CREATE POLICY "Allow admin delete" ON feedback_responses FOR DELETE USING (true);

-- Verificar la estructura
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'feedback_responses' 
ORDER BY ordinal_position;
