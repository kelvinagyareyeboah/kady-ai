import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for local development, adjust as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Diagnostic endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Chat Proxy endpoint (supports streaming and standard responses)
app.post('/api/chat', async (req, res) => {
  const { messages, model, temperature, max_tokens, stream } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenRouter API key is not configured on the server.' });
  }

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: "messages" must be an array.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': req.headers.referer || 'http://localhost:5173',
        'X-Title': 'Kady AI'
      },
      body: JSON.stringify({
        model: model || process.env.DEFAULT_MODEL || 'deepseek/deepseek-chat',
        messages,
        temperature: temperature !== undefined ? temperature : 0.7,
        max_tokens: max_tokens || 1500,
        stream: !!stream
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenRouter API error (status ${response.status}):`, errorText);
      return res.status(response.status).json({ error: errorText });
    }

    if (stream) {
      // Set headers for EventStream
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        res.write(chunk);
      }
      res.end();
    } else {
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    console.error('Server error handling chat completion:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Kady AI backend server is running on http://localhost:${PORT}`);
});
