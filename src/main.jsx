import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "./utils/i18n";
import { BrowserRouter } from "react-router-dom";
import { client } from "./config/query-client.js";

createRoot(document.getElementById("root")).render(
  <I18nextProvider  i18n={i18n}>
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
  </I18nextProvider>
);
