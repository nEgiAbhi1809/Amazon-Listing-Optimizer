import { useState } from "react";
import { api } from "../api/apiClient";
import { Clock, Database, Search } from "lucide-react";

export default function HistoryPage() {
  const [records, setRecords] = useState([]);
  const [asin, setAsin] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/${asin}`);
      setRecords(res.data);
    } catch {
      alert("Could not fetch history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        🕓 Optimization History
      </h2>
      <p className="text-gray-500 mb-8">
        View all your previous ASIN optimizations and AI suggestions.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
        <div className="relative w-full sm:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={asin}
            onChange={(e) => setAsin(e.target.value)}
            placeholder="Search by ASIN..."
            className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-gray-700 
                       focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        <button
          onClick={fetchHistory}
          disabled={loading}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-700 
                     transition active:scale-95 disabled:opacity-60"
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {records.length === 0 ? (
        <p className="text-gray-400 mt-8">No history available yet.</p>
      ) : (
        <div className="grid gap-5">
          {records.map((r) => (
            <div
              key={r.id}
              className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-left"
            >
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span className="flex items-center gap-1">
                  <Database size={14} /> ASIN: {r.asin}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />{" "}
                  {new Date(r.createdAt).toLocaleString()}
                </span>
              </div>
              <h3 className="text-indigo-700 font-semibold mb-2">
                {r.optimizedTitle}
              </h3>
              <p className="text-gray-600 text-sm">{r.keywords}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
