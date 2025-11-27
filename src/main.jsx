import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./config/query-client.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
        <ToastContainer/>
      </BrowserRouter>
    </I18nextProvider>
  </QueryClientProvider>
);
