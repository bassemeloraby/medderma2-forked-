import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import companyReducer from "./features/companyReducer/companySlice";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = configureStore({
  reducer: {
    company: companyReducer
  }
});

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
