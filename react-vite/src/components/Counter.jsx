import React, { useState } from "react";

const Counter = () => {
  //   var value = 4;
  //   console.log(value);

  var [value, setValue] = useState(5);

  var [name, setName] = useState("Raj");

  var [valid, setValid] = useState(true);
  return (
    <div>
      {/* number  */}
      <div className=" p-5 flex flex-col gap-3">
        <h1 className=" text-[32px] font-bold">Number</h1>
        <h1 className=" text-[32px] font-bold">{value}</h1>
        <div className="flex gap-3">
          <button
            className="py-2 px-8 rounded-lg bg-red-600 text-white"
            onClick={() => {
              //   value = value - 1;
              setValue(value - 1); // re-render
            }}
          >
            -
          </button>
          <button
            className="py-2 px-8 rounded-lg bg-green-600 text-white"
            onClick={() => {
              console.log("function called");
              setValue(value + 1);
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* String  */}
      <div className=" p-5 flex flex-col gap-3">
        <h1 className=" text-[32px] font-bold">String</h1>
        <h1 className=" text-[32px] font-bold">{name}</h1>
        <div className="flex gap-3">
          <button
            className="py-2 px-8 rounded-lg bg-green-600 text-white"
            onClick={() => {
              setName("Ram");
            }}
          >
            Update
          </button>
        </div>
      </div>

      {/* Boolean  */}
      <div className=" p-5 flex flex-col gap-3">
        <h1 className=" text-[32px] font-bold">Boolean</h1>
        <h1 className=" text-[32px] font-bold">{valid ? "ONN" : "OFF"}</h1>
        <div className="flex gap-3">
          <button
            className={`py-2 px-8 rounded-lg text-white ${valid ? "bg-red-600" : "bg-green-600"}`}
            onClick={() => {
              setValid(!valid);
            }}
          >
            {valid ? "OFF" : "ONN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
