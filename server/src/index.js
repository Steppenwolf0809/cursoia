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

app.get('/', (req, res) => {
    res.send('Course API Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
