import React, { useState } from "react";

const Comment = () => {
  //   const [name, setName] = useState("");
  //   const [comment, setComment] = useState("");

  //   console.log(name, comment);

  const [user, setUser] = useState({
    name: "",
    comment: "",
  });

  const [userData, setUserData] = useState([]);

  console.log(userData);

  return (
    <div>
      <div className=" p-5">
        <h1 className=" text-[38px] font-bold text-center">Comment</h1>
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

                // callback function
                setUser((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            />
          </div>
          <div className=" flex flex-col gap-3">
            <label htmlFor="comment">Comment:</label>
            <input
              type="text"
              name="comment"
              id="comment"
              className=" py-2 rounded-lg outline-none border pl-2 "
              placeholder="Enter your comments..."
              onChange={(e) => {
                // setComment(e.target.value);

                // setUser({ comment: e.target.value });

                setUser((prev) => {
                  return { ...prev, comment: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                console.log(user);
                // directvalue
                // setUserData([user]);

                // callback function
                setUserData((prev) => {
                  return [...prev, user];
                });
              }}
              className=" py-2 px-6 rounded-lg bg-blue-700 text-white w-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className=" grid grid-cols-6 gap-5 ">
          {userData.map((items, index) => {
            return (
              <div className="border p-5 rounded-lg">
                <h1> Name: {items.name}</h1>
                <p> Comment: {items.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comment;
