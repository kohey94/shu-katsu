export function buildUserPrompt({ today, saturday, sunday, input }) {
  return `
今日は${today}です。
今週末の土曜日は${saturday}、日曜日は${sunday}です。
この情報を参考に、first_stepの実行日時を決定してください。

${input}
`.trim();
}