import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pollsRouter from './routes/polls.js';
import notesRouter from './routes/notes.js';
import authRouter from './routes/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://cursoia-production.up.railway.app', 'https://*.railway.app'] 
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json());

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

// API routes
app.use('/api/polls', pollsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/auth', authRouter);

// Serve static files from client/dist in production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'PRODUCTION') {
    const clientDistPath = path.join(__dirname, '../../client/dist');
    app.use(express.static(clientDistPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.json({ 
            message: 'Course API Running (Dev Mode)',
            endpoints: ['/api/polls', '/api/notes', '/health']
        });
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🚀 Deployed at: ${new Date().toISOString()}`);
});



