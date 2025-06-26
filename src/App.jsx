// App.jsx
import React, { useState } from "react";
import PromptForm from "./components/PromptForm";
import AiResponse from "./components/AiResponse";
import { getNextWeekendDateStrings } from "./utils/dateHelper";
import { systemPrompt } from "./prompts/idealSelfSystemPrompt";
import { buildUserPrompt } from "./prompts/idealSelfUserPrompt";

function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [structuredReply, setStructuredReply] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setReply("");
    setStructuredReply(null);

    const { today, saturday, sunday } = getNextWeekendDateStrings();

    const userPrompt = buildUserPrompt({ today, saturday, sunday, input });

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        setReply("APIエラー：" + (data?.error?.message || "不明なエラー"));
      } else {
        try {
          const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");
          setStructuredReply(parsed);
        } catch (e) {
          console.error("JSON parse error:", e);
          setReply("AIの出力がJSON形式ではありませんでした。\n\n" + data.choices?.[0]?.message?.content);
        }
      }
    } catch (error) {
      console.error("通信エラー:", error);
      setReply("通信エラー：" + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>理想の自分AI</h1>
      <PromptForm
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        loading={loading}
      />
      <AiResponse structuredReply={structuredReply} reply={reply} />
    </div>
  );
}

export default App;
