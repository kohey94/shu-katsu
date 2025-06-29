// apps/backend/server.ts（ローカル開発用）
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { chatApp } from "./api/chat";

const app = new Hono();
app.route("/chat", chatApp); // ローカルでは /chat でアクセス可能にする

serve(app);
