import { useState } from "react";
import AsinInputForm from "../components/AsinInputForm";
import ProductComparison from "../components/ProductComparison";
import { api } from "../api/apiClient";
import "animate.css";

export default function OptimizerPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (asin) => {
    setLoading(true);
    setData(null);
    try {
      const res = await api.post("/", { asin });
      setData(res.data);
    } catch {
      alert("Something went wrong 😢. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full text-center animate__animated animate__fadeIn">
      <AsinInputForm onSubmit={handleSubmit} />

      {loading && (
        <div className="mt-16 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 animate-pulse">
          <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          <p>Optimizing your listing...</p>
        </div>
      )}

      {!loading && !data && (
        <div className="mt-20 text-gray-400">
          <p className="text-lg">Enter an ASIN to start optimizing ✨</p>
        </div>
      )}

      {data && (
        <div className="w-full mt-14 animate__animated animate__fadeInUp">
          <ProductComparison data={data} />
        </div>
      )}
    </div>
  );
}
