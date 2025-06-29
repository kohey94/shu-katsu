// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ENABLED = process.env.FEATURE_CHATGPT_ENABLED !== "false";

export async function POST(req: NextRequest) {
  if (!ENABLED) {
    return NextResponse.json({ error: "現在この機能は一時的に停止中です。" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { messages } = body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    return NextResponse.json({
      choices: [
        {
          message: completion.choices[0].message,
        },
      ],
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
