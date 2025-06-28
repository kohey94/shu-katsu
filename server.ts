import { serve } from '@hono/node-server';
import app from './api/chat';

serve({
    fetch: app.fetch,
    port: 3000,
});

console.log('🚀 Hono server running on http://localhost:3000');
