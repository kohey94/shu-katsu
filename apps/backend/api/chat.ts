// api/chat.ts
require('dotenv/config');
const { Hono } = require('hono');
const { OpenAI } = require('openai');
import type { Context } from 'hono';

export const chatApp = new Hono();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ENABLED = process.env.FEATURE_CHATGPT_ENABLED !== 'false';

chatApp.post('/', async (c: Context) => {
  if (!ENABLED) {
    return c.json({
      error: '現在この機能は一時的に停止中です。',
    }, 503);
  }
  
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

export default chatApp;
