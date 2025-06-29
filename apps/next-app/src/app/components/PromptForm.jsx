import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function PromptForm({ input, setInput, handleSend, loading }) {
  return (
    <div className="flex flex-col items-center w-full">
      <textarea
        rows={5}
        placeholder="理想の自分像を自由に書いてください"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full max-w-3xl h-32 p-4 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 hover:shadow-lg transition"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full max-w-3xl flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>
            AIがあなたのShu-katsuを設計中…
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="w-5 h-5 text-white" />
            Shu-katsuを設計する
          </>
        )}
      </button>
    </div>
  );
}

export default PromptForm;
