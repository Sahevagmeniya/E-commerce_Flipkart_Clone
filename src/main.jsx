import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./utility/Context.jsx";

createRoot(document.querySelector("#root")).render(
  <Context>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Context>
);
