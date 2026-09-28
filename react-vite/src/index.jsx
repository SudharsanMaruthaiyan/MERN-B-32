import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import { ProductCard, ProductSection } from "./components/ProductSection";
import Counter from "./components/Counter";
import Comment from "./components/Comment";

const ReactHeadingElement = React.createElement(
  "h1",
  { classNameName: "heading" },
  "Hello React Developer..❤️",
); // <h1>Hello React Developer...</h1>

// facebook developer do like this

// JSX => javascript xml , html in js, xml like systax
const paraElement = <p>Hello para</p>;
// browser understand js,
// browseer understand jsx ?

// babel js => React.createElemt()
// jsx =>      js object            => browser
// console.log(paraElement);

const Layout = () => {
  const [count, setCount] = useState(10);

  const [name, setName] = useState("Raj");
  const [str, setStr] = useState("Ram");

  useEffect(() => {
    console.log("useEffect called 2");
    setCount(count + 1); // re-render
  }, [name, str]);

  return (
    <div>
      <Header />
      <HeroSection />
      <ProductSection />
      {/* <p>Para Element</p>
      <h1>{count}</h1>
      <h1>{name}</h1> */}
      {/*  */}
      {/* <button
        onClick={() => {
          setName("Ram");
        }}
      >
        Change name 1
      </button>
      <br />
      <h1>{str}</h1>
      <button
        onClick={() => {
          setStr("Raj");
        }}
      >
        Change name 2
      </button> */}
      {/* <Counter /> */}
      {/* <Comment /> */}
      <Footer />
    </div>
  );
};

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));
reactRoot.render(<Layout />);
