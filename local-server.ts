import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import handler from './api/interpret';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock Vercel's req/res objects if necessary, but Express is mostly compatible
app.post('/api/interpret', async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send(`
    <h1>API Server is running</h1>
    <p>This is the backend API server.</p>
    <p>Please access the application at <a href="http://localhost:3000">http://localhost:3000</a></p>
  `);
});

app.listen(PORT, () => {
    console.log(`Local API server running at http://localhost:${PORT}`);
});
