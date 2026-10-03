import React, { useState } from "react";

const ReactControlForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // re-render

  console.log(name, email);

  return (
    <div>
      <div className=" p-5">
        <h1 className=" text-[38px] font-bold text-center">Login Form</h1>
        <div className=" flex flex-col gap-5">
          <div className=" flex flex-col gap-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className=" py-2 rounded-lg outline-none border pl-2 "
              placeholder="Enter your name.."
              onChange={(e) => {
                // setName(e.target.value);
                // direct value
                // setUser({ name: e.target.value });
                setName(e.target.value);
              }}
            />
          </div>
          <div className=" flex flex-col gap-3">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              className=" py-2 rounded-lg outline-none border pl-2 "
              placeholder="Enter your email..."
              onChange={(e) => {
                // setemail(e.target.value);
                // setUser({ comment: e.target.value });
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                console.log(name, email);
              }}
              className=" py-2 px-6 rounded-lg bg-blue-700 text-white w-full"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactControlForm;
