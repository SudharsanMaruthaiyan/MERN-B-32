import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ComponentC = () => {
  const { values, setValues } = useContext(AppContext);

  return (
    <div>
      ComponentC {values} <br />
      <button
        onClick={() => {
          setValues("Hello Developers");
        }}
      >
        changes
      </button>
    </div>
  );
};

export default ComponentC;
