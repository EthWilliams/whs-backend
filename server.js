import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000; // Render or local port
const OPENAI_KEY = process.env.OPENAI_KEY; // Keep key secret

app.use(cors());
app.use(express.json());

app.post('/check-safety', async (req, res) => {
  const { scenario } = req.body;
  if (!scenario) return res.status(400).json({ content: 'No scenario provided.' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert in Australian WHS and Standards.' },
          { role: 'user', content: `Scenario: "${scenario}". List hazards, relevant Australian Standards, WHS regulations, and safety measures.` }
        ],
