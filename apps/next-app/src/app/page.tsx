"use client";

import React, { useState } from "react";
import PromptForm from "./components/PromptForm";
import AiResponse from "./components/AiResponse";
import { getNextWeekendDateStrings } from "./utils/dateHelper";
import { systemPrompt } from "./prompts/idealSelfSystemPrompt";
import { buildUserPrompt } from "./prompts/idealSelfUserPrompt";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [structuredReply, setStructuredReply] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setReply("");
    setStructuredReply(null);

    const { today, saturday, sunday } = getNextWeekendDateStrings();
    const userPrompt = buildUserPrompt({ today, saturday, sunday, input });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error: ", errorData);
        setReply("APIエラー: " + (errorData?.error || "不明なエラー"));
        setLoading(false);
        return;
      }

      const data = await res.json();

      try {
        const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");
        setStructuredReply(parsed);
      } catch (e) {
        console.error("JSON parse error:", e);
        setReply(
          "AIの出力がJSON形式ではありませんでした。\n\n" + data.choices?.[0]?.message?.content
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("通信エラー:", error);
        setReply("通信エラー：" + error.message);
      } else {
        console.error("不明なエラー", error);
        setReply("通信エラー：不明なエラーが発生しました");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-2">Shu-katsu</h1>
      <h2 className="text-lg text-gray-600 mb-6">- 理想の自分を目指すために -</h2>
      <PromptForm input={input} setInput={setInput} handleSend={handleSend} loading={loading} />
      <AiResponse structuredReply={structuredReply} reply={reply} />
    </div>
  );
}
