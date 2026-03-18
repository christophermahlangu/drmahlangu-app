export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Dr. Christopher Mahlangu
        </h1>
        <p className="text-gray-500 text-sm">
          Building discipline. One day at a time.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-medium">Daily Habits</h2>

        {[
          "No porn",
          "No masturbation",
          "6 hours Mathematics",
          "6 hours Physical Science",
          "Drink 3L water",
          "30 mins meditation",
        ].map((habit, i) => (
          <div key={i} className="flex items-center justify-between border-b py-2">
            <span className="text-sm">{habit}</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        ))}
      </div>

      <div className="text-center mt-10 text-xs text-gray-400">
        Becoming inevitable.
      </div>
    </main>
  );
}