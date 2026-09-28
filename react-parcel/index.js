import React from "react";
import ReactDOM from "react-dom/client";

const ReactHeadingElement = React.createElement(
  "h1",
  { className: "heading" },
  "Hello React Developer..❤️❤️",
); // <h1>Hello React Developer...</h1>

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));
reactRoot.render(ReactHeadingElement);
