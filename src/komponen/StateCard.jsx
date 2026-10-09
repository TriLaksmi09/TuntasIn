export default function StateCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-gray-500">
        {title}
      </h2>

      <p
        className={`text-4xl font-bold mt-2 ${color}`}
      >
        {value}
      </p>
    </div>
  );
}