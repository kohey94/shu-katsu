"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_server_1 = require("@hono/node-server");
var chat_1 = require("./api/chat");
(0, node_server_1.serve)({
    fetch: chat_1.default.fetch,
    port: 3000,
});
console.log('🚀 Hono server running on http://localhost:3000');
