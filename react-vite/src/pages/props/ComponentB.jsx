import React from "react";
import ComponentC from "./ComponentC";

const ComponentB = ({ name, setName }) => {
  return (
    <div>
      ComponentB {name}
      <ComponentC name={name} setName={setName} />
      <button
        onClick={() => {
          setName("Hello Developers");
        }}
      >
        change
      </button>
    </div>
  );
};

export default ComponentB;
