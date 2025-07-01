import React from "react";
import AddToCalendarButton from "./AddToCalendarButton";
import CategoryBox from "./CategoryBox";

function AiResponse({ structuredReply, reply }) {
  if (!structuredReply && !reply) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 whitespace-pre-wrap">
      {structuredReply ? (
        <>
          <div className="w-full max-w-3xl space-y-6 mt-10">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">あなたの理想像</h2>{" "}
              <p className="text-gray-700">{structuredReply.summary}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                理想に近づくために必要な要素
              </h2>
              <div className="w-full max-w-3xl space-y-8 mt-10">
                <CategoryBox title="スキル" items={structuredReply.requirements.skills} />
                <CategoryBox title="行動" items={structuredReply.requirements.actions} />
                <CategoryBox title="マインド" items={structuredReply.requirements.mindset} />
                <CategoryBox title="習慣" items={structuredReply.requirements.habits} />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                今週のファーストステップ提案
              </h2>
              <p>
                <strong>内容：</strong> {structuredReply.first_step.description}
              </p>
              <p>
                <strong>おすすめ日時：</strong> {structuredReply.first_step.suggested_datetime}
              </p>
              <p>
                <strong>アドバイス：</strong> {structuredReply.first_step.message}
              </p>

              <AddToCalendarButton
                title="週活ファーストステップ"
                description={structuredReply.first_step.description}
                startText={structuredReply.first_step.suggested_datetime}
                message={structuredReply.first_step.message}
              />
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                こんなサービスを使うのもおすすめ！
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#666" }}>
                ※以下にはプロモーションが含まれています。
              </p>
              <ul>
                <li>
                  <a href="https://affiliate-link.example.com" target="_blank">
                    ▶︎ hoge
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>{reply}</p>
      )}
    </div>
  );
}

export default AiResponse;
