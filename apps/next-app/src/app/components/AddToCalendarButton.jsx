export default function AddToCalendarButton({ title, description, startText, message }) {
  const taskTitle = `Shu-katsu: ${description}`; // ← 内容をタイトルに使う
  const details = `${description}\n\n${message}`; // ← 詳細欄に内容とアドバイス

  const parseJapaneseDateTime = (text) => {
    const match = text.match(/(\d{4})年(\d{1,2})月(\d{1,2})日.*?(\d{1,2}):(\d{2})/);
    if (!match) return null;
    const [, year, month, day, hour, minute] = match.map(Number);
    return new Date(year, month - 1, day, hour, minute);
  };

  const generateCalendarUrl = () => {
    const start = parseJapaneseDateTime(startText);
    if (!start) return "#";
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const formatDateTime = (date) => {
      return date.toISOString().replace(/-|:|\.\d{3}/g, "");
    };

    const startIso = formatDateTime(start);
    const endIso = formatDateTime(end);

    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", taskTitle);
    url.searchParams.set("dates", `${startIso}/${endIso}`);
    url.searchParams.set("details", details);

    return url.toString();
  };

  return (
    <a
      href={generateCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
    >
      Googleカレンダーに追加
    </a>
  );
}
