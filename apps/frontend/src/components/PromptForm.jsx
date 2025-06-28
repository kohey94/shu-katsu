import React from "react";

function PromptForm({ input, setInput, handleSend, loading }) {
  return (
    <div>
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
    </div>
  );
}

export default PromptForm;