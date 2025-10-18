export default function ProductComparison({ data }) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
      {/* Original Listing */}
      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          🧾 Original Listing
        </h3>
        <p className="text-gray-700 mb-2">
          <b>Title:</b> {data.originalTitle}
        </p>
        <p className="whitespace-pre-line text-gray-700 mb-2">
          <b>Bullets:</b> {data.originalBullets}
        </p>
        <p className="whitespace-pre-line text-gray-700">
          <b>Description:</b> {data.originalDescription}
        </p>
      </div>

      {/* Optimized Listing */}
      <div className="p-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 
                      shadow-sm hover:shadow-md transition">
        <h3 className="text-lg font-semibold text-indigo-700 mb-3 flex items-center gap-2">
          🚀 Optimized Listing
        </h3>
        <p className="text-gray-800 mb-2">
          <b>Title:</b> {data.optimizedTitle}
        </p>
        <p className="whitespace-pre-line text-gray-800 mb-2">
          <b>Bullets:</b> {data.optimizedBullets}
        </p>
        <p className="whitespace-pre-line text-gray-800">
          <b>Description:</b> {data.optimizedDescription}
        </p>

        {data.keywords && (
          <div className="mt-4">
            <b>Suggested Keywords:</b>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.keywords.split(",").map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full font-medium"
                >
                  {kw.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
