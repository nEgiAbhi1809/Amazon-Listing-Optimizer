import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import "animate.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <div className="bg-blue-500 text-white p-4 rounded-lg">
</div>
    <App />
  </BrowserRouter>
);
