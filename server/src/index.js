import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pollsRouter from './routes/polls.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/polls', pollsRouter);

// Serve static files from client/dist in production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'PRODUCTION') {
    const __dirname = new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:\/)/, '$1'); // Fix logic for Windows/Linux consistency if needed, or just use simpler approach
    // Actually simpler approach for ESM:
    // import path from 'path';
    // import { fileURLToPath } from 'url';
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // But let's just use relative path for now as monorepo structure is known

    app.use(express.static('../client/dist'));

    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: '../client/dist' });
    });
} else {
    app.get('/', (req, res) => {
        res.send('Course API Running (Dev Mode)');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
