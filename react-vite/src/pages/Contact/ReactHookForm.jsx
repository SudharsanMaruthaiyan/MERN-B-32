import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from "zod";

const ReactHookForm = () => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("form data", data);
  };

  return (
    <div>
      <div className=" p-5">
        <h1 className=" text-[38px] font-bold text-center">Login Form</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-5"
        >
          <div className=" flex flex-col gap-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className=" py-2 rounded-lg outline-none border pl-2 "
              placeholder="Enter your name.."
              {...register("name")} // name: asdfasdf
            />
            {errors.name?.message && <p>{errors.name?.message}</p>}
          </div>
          <div className=" flex flex-col gap-3">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              className=" py-2 rounded-lg outline-none border pl-2 "
              placeholder="Enter your email..."
              {...register("email")} // email: asdfasd@gmail.com
            />
            {errors.email?.message && <p>{errors.email?.message}</p>}
          </div>
          <div>
            <button className=" py-2 px-6 rounded-lg bg-blue-700 text-white w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReactHookForm;
