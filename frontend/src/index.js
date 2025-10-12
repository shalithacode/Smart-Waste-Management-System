import "./index.css"; // Tailwind CSS imports
import React from "react";
import ReactDOM from "react-dom/client"; // note '/client'
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
