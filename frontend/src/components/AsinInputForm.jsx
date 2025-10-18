import { useState } from "react";
import { Search, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function AsinInputForm({ onSubmit }) {
  const [asin, setAsin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!asin.trim()) return;
    setLoading(true);
    await onSubmit(asin.trim());
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center w-full px-4 mt-12">
      {/* badge */}
      <div className="px-4 py-1 text-sm rounded-full bg-indigo-50 text-indigo-700 font-medium mb-3">
        <span className="inline-flex items-center gap-1">
          <Sparkles size={14} /> AI-Powered Optimization
        </span>
      </div>

      {/* title + subtitle */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
        Optimize Amazon Listings
      </h1>
      <p className="text-gray-500 max-w-xl text-base mb-8 leading-relaxed">
        Transform your product listings with AI. Enter an ASIN to enhance titles,
        bullets, and descriptions instantly.
      </p>

      {/* input card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 
                   flex items-center px-4 py-3 sm:py-4 gap-3 sm:gap-4 transition-all duration-200
                   hover:shadow-xl"
      >
        <Search size={20} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={asin}
          onChange={(e) => setAsin(e.target.value)}
          placeholder="Enter any Amazon product ASIN to get started"
          className="flex-1 text-gray-700 placeholder-gray-400 text-sm sm:text-base focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-1 bg-indigo-600 text-white font-medium
                     px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Optimizing..." : "Optimize"}
          {!loading && <ArrowRight size={16} />}
        </button>
      </form>

      {/* helper text */}
      <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
        <ShieldCheck size={14} />
        Enter any ASIN and we’ll analyze & optimize your listing.
      </div>

      {/* feature badges */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-10 text-sm font-medium">
        <div className="flex items-center gap-2 text-green-600">
          <Zap size={16} /> Instant Results
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <ShieldCheck size={16} /> Secure & Private
        </div>
        <div className="flex items-center gap-2 text-indigo-600">
          <Sparkles size={16} /> AI-Powered
        </div>
      </div>
    </div>
  );
}
