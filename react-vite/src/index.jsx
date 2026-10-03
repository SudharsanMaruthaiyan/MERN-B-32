import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route";
import { AppProvider } from "./context/AppContext";

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));
reactRoot.render(
  <AppProvider>
    <RouterProvider router={Route} />
  </AppProvider>,
);
