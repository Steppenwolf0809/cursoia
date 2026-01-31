import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
let prismaInstance;

const getPrisma = () => {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient();
    }
    return prismaInstance;
};

router.post('/', async (req, res) => {
    try {
        const { participantId, participantName, notes } = req.body || {};

        if (!participantName || !Array.isArray(notes) || notes.length === 0) {
            return res.status(400).json({ error: 'Payload inválido' });
        }

        const payload = JSON.stringify({ participantId, participantName, notes, savedAt: new Date().toISOString() });

        const record = await getPrisma().courseNote.create({
            data: {
                participantId: participantId || null,
                participantName,
                payload
            }
        });

        res.json({ id: record.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
