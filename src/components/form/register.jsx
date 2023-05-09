import React from "react";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../../config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        seller: data.name,
        phone: data.number,
        email: data.email,
        password: data.password,
        timeStamp: serverTimestamp(),
      });
      navigate("/admin")
      console.log("Suskses", res)
    } catch (err) { 
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mx-auto py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center text-5xl text-gray-900 font-bold">
            PasarSekawan
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>
        <form
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...register("name", {
                required: "This input is required.",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "This input is cannot contain symbols.",
                },
              })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
              type="text"
              placeholder="Subanto Antok"
            />
            {errors.name && (
              <p className="text-red-700"> {errors?.name?.message} </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="number"
            >
              Whatsapp Number
            </label>
            <input
              {...register("number", {
                required: "This input is required.",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message:
                    "This input must contain a number and not start with 0",
                },
              })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
              type="text"
              placeholder="6212356781122"
            />
            {errors.number && (
              <p className="text-red-700"> {errors?.number?.message} </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "This input is required.",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address",
                },
              })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
              type="email"
              placeholder="antok@example.com"
            />
            {errors.email && (
              <p className="text-red-700"> {errors?.email?.message} </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "This input is required.",
                minLength: {
                  value: 6,
                  message: "Password at least 6 characters",
                },
              })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
              type="password"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-700"> {errors?.password?.message} </p>
            )}
          </div>
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
