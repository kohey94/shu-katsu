import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setReply("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `あなたはユーザーの制約に厳密に従って、週単位のスケジュールを作成するAIです。

【入力形式】
ユーザーは以下の2点を入力します。
1. やりたいこと（例：アプリ開発10h、ブログ執筆4h）
2. 各曜日の最大作業可能時間（例：平日2h、土日4h）

【出力ルール】
- 毎日の合計作業時間は、ユーザーが指定した上限時間**を絶対に超えてはいけません**
- 午前・午後に分けて、各作業の時間配分を表示してください（0.5h 単位まで可）
- スケジュールだけを出力し、質問や余談は禁止です
- 書式は以下の通り

【出力フォーマット】
月曜: 午前 - アプリ開発（1h） / 午後 - アプリ開発（1h）
火曜: 午前 - ブログ執筆（1h） / 午後 - 自由
水曜: 午前 - 自由 / 午後 - アプリ開発（2h）
...

`,
            },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        setReply("APIエラー：" + (data?.error?.message || "不明なエラー"));
      } else {
        setReply(
          data.choices?.[0]?.message?.content || "返答が取得できませんでした",
        );
      }
    } catch (error) {
      console.error("通信エラー:", error);
      setReply("通信エラー：" + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>週活AIテスト</h1>
      <textarea
        rows={5}
        cols={50}
        placeholder="聞きたいことを入力"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "送信中…" : "送信"}
      </button>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
        {reply && (
          <>
            <h3>AIの返答：</h3>
            <p>{reply}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
