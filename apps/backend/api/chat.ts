// api/chat.ts
import 'dotenv/config';
import { Hono } from 'hono';
import { OpenAI } from 'openai';

const app = new Hono();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (c) => {
  try {
    const body = await c.req.json();
    const { messages } = body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
    });

    return c.json({
      choices: [
        {
          message: completion.choices[0].message,
        },
      ],
    });
  } catch (error) {
    console.error('API error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
