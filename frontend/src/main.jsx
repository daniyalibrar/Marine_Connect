import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position="bottom-right" />
    </Provider>
  </StrictMode>
);
