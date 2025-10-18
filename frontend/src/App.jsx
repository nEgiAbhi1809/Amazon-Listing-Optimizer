import { Routes, Route, NavLink } from "react-router-dom";
import OptimizerPage from "./pages/OptimizerPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
            AI Listing Optimizer
          </h1>

          <div className="space-x-5">
            {[
              { to: "/", label: "Optimize" },
              { to: "/history", label: "History" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-600 hover:text-indigo-500"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <Routes>
          <Route path="/" element={<OptimizerPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        <p>
          Built with 💙 using <b>React</b>, <b>Node.js</b> & <b>Gemini AI</b>
        </p>
      </footer>
    </div>
  );
}
