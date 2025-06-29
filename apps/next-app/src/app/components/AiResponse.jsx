import React from "react";

function AiResponse({ structuredReply, reply }) {
  if (!structuredReply && !reply) return null;

  return (
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
          <p>
            <strong>内容：</strong> {structuredReply.first_step.description}
          </p>
          <p>
            <strong>おすすめ日時：</strong> {structuredReply.first_step.suggested_datetime}
          </p>
          <p>{structuredReply.first_step.message}</p>
        </>
      ) : (
        <p>{reply}</p>
      )}
    </div>
  );
}

export default AiResponse;
