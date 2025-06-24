import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setReply("");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "あなたは親切なアシスタントです。" },
          { role: "user", content: input },
        ],
      }),
    });

    const data = await res.json();
     // エラーチェック追加
    if (!res.ok) {
      console.error("API Error:", data);
      setReply("APIエラー：" + (data?.error?.message || "不明なエラー"));
    } else {
      setReply(data.choices?.[0]?.message?.content || "返答が取得できませんでした");
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
        {reply && <><h3>AIの返答：</h3><p>{reply}</p></>}
      </div>
    </div>
  );
}

export default App;
