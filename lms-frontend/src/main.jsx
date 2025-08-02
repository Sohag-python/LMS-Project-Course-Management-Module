import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // ✅ correct extension and filename

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
