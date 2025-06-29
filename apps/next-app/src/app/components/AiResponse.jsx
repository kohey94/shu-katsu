import React from "react";

function AiResponse({ structuredReply, reply }) {
  if (!structuredReply && !reply) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 whitespace-pre-wrap">
      {structuredReply ? (
        <>
          <div className="w-full max-w-3xl space-y-6 mt-10">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">あなたの理想像</h2>
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
            </div>
          </div>
        </>
      ) : (
        <p>{reply}</p>
      )}
    </div>
  );
}

// カテゴリー共通のボックスコンポーネント
function CategoryBox(props) {
  const { title, items } = props;
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="font-medium text-gray-800 mb-2">{title}</h3>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
export default AiResponse;
