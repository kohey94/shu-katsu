import React, { useState } from "react";

function getNextWeekendDateStrings() {
  const today = new Date();
  const day = today.getDay();
  const diffToSaturday = (6 - day + 7) % 7;
  const diffToSunday = (7 - day + 7) % 7;

  const saturday = new Date(today);
  saturday.setDate(today.getDate() + diffToSaturday);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diffToSunday);

  const formatDate = (d) => {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdays[d.getDay()]}）`;
  };

  return {
    today: formatDate(today),
    saturday: formatDate(saturday),
    sunday: formatDate(sunday),
  };
}

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

    const userPrompt = `
今日は${today}です。
今週末の土曜日は${saturday}、日曜日は${sunday}です。
この情報を参考に、first_stepの実行日時を決定してください。

${input}
`;

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
            {
              role: "system",
              content: `あなたは、ユーザーが思い描く理想の人物像を実現するために、
必要なスキル・行動・習慣・マインドセットを整理し、ステップ化して提案するAIアドバイザーです。

ユーザーは理想の自分像を自由に語るので、
それをもとに現実的かつ段階的なアドバイスを与えてください。

出力は以下のJSON形式に厳密に従ってください。文章での補足は不要です：

{
  "summary": "string",
  "requirements": {
    "skills": ["string"],
    "actions": ["string"],
    "mindset": ["string"],
    "habits": ["string"]
  },
  "first_step": {
    "description": "string",
    "suggested_datetime": "YYYY年MM月DD日（曜日）HH:MM",
    "message": "string"
  }
}

「first_step」には、今後1週間以内、特に今週の土日を優先して実行日として提案してください。
時間帯は、午前中（10:00前後）や夕方前（15:00前後）など落ち着いた時間を選んでください。
「message」には、ユーザーが実行しやすくなるような、やさしく背中を押す一言を添えてください。
`,
            },
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
      <textarea
        rows={5}
        cols={50}
        placeholder="あなたの理想の自分像を書いてください"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "送信中…" : "送信"}
      </button>

      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        <h3>AIの返答：</h3>
        {structuredReply ? (
          <>
            <h4>1. 理想像の要約</h4>
            <p>{structuredReply.summary}</p>

            <h4>2. 理想に近づくために必要な要素</h4>

            <h5>● スキル</h5>
            <ul>
              {structuredReply.requirements.skills.map((s, i) => (
                <li key={`skill-${i}`}>{s}</li>
              ))}
            </ul>

            <h5>● 行動</h5>
            <ul>
              {structuredReply.requirements.actions.map((a, i) => (
                <li key={`action-${i}`}>{a}</li>
              ))}
            </ul>

            <h5>● マインド</h5>
            <ul>
              {structuredReply.requirements.mindset.map((m, i) => (
                <li key={`mind-${i}`}>{m}</li>
              ))}
            </ul>

            <h5>● 習慣</h5>
            <ul>
              {structuredReply.requirements.habits.map((h, i) => (
                <li key={`habit-${i}`}>{h}</li>
              ))}
            </ul>

            <h4>3. 今週のファーストステップ提案</h4>
            <p><strong>内容：</strong> {structuredReply.first_step.description}</p>
            <p><strong>おすすめ日時：</strong> {structuredReply.first_step.suggested_datetime}</p>
            <p>{structuredReply.first_step.message}</p>
          </>
        ) : (
          reply && <p>{reply}</p>
        )}
      </div>
    </div>
  );
}

export default App;
