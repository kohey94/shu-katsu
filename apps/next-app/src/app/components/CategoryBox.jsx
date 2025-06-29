// カテゴリー共通のボックスコンポーネント
export default function CategoryBox(props) {
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
