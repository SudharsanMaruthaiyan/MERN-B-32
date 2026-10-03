import React, { useState } from "react";
import ComponentB from "./ComponentB";

const ComponentA = () => {
  const [name, setName] = useState("Hello 123");
  return (
    <div>
      ComponentA
      <ComponentB name={name} setName={setName} />
    </div>
  );
};

export default ComponentA;
