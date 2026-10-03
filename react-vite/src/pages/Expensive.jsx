import React, { useMemo, useState } from "react";

const Expensive = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const ExpensiveCalculation = useMemo(() => {
    console.log("Expensive calculation called...");

    let total = 0;
    for (let i = 0; i < 200000; i++) {
      total += count; // 200000
    }

    return total;
  }, [count]);

  //   const ExpensiveCalculation = () => {
  //     console.log("Expensive calculation called...");

  //     let total = 0;
  //     for (let i = 0; i < 200000; i++) {
  //       total += count; // 200000
  //     }

  //     return total;
  //   };

  return (
    <div>
      <div>
        <h1>Counter</h1>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Change the count
        </button>
      </div>

      <div>
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
          name="name"
          id="name"
        />
      </div>

      <div>
        {/* <h1>heavy calculation: {ExpensiveCalculation()}</h1> */}
        <h1>heavy calculation: {ExpensiveCalculation}</h1>
      </div>
    </div>
  );
};

export default Expensive;
