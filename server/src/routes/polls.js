import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get active poll
router.get('/active', async (req, res) => {
    try {
        const activePoll = await prisma.poll.findFirst({
            where: { active: true },
            include: { responses: true }
        });

        if (activePoll) {
            // Parse options if stored as string, though Prisma returns object if configured? 
            // Schema says String. So we parse.
            try {
                activePoll.options = JSON.parse(activePoll.options);
            } catch (e) {
                // ignore
            }
        }

        res.json(activePoll || null);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Create poll (Admin usually, but open for now as per simple req)
router.post('/', async (req, res) => {
    try {
        const { question, options } = req.body;

        // Deactivate others
        await prisma.poll.updateMany({
            where: { active: true },
            data: { active: false }
        });

        const newPoll = await prisma.poll.create({
            data: {
                question,
                options: JSON.stringify(options), // Store as JSON string
                active: true
            }
        });

        res.json(newPoll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit response
router.post('/:id/vote', async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;

        const response = await prisma.pollResponse.create({
            data: {
                pollId: id,
                answer
            }
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
