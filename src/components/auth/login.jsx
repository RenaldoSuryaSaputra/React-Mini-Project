import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/admin");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage)
        });

      setErrorMessage("")
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <section className="h-screen">
        <div className="container h-full px-6">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* Left column container with background*/}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12">
              <lottie-player
                src="https://assets10.lottiefiles.com/packages/lf20_pounvezv.json"
                background="transparent"
                speed="1"
                width={10}
                loop
                autoplay
              ></lottie-player>
            </div>
            {/* Right column container with form */}
            <div className="md:w-8/12 lg:ml-6 lg:w-6/12">
              <h1 className="text-center font-semibold text-xl mb-5">
                SIGN IN
              </h1>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("email", {
                        required: "This input is required.",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      autoComplete="email"
                      required=""
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-700"> {errors?.email?.message} </p>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      {...register("password", {
                        required: "This input is required.",
                        minLength: {
                          value: 6,
                          message: "Password at least 6 characters",
                        },
                      })}
                      type="password"
                      autoComplete="current-password"
                      required=""
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-700">
                      {" "}
                      {errors?.password?.message}{" "}
                    </p>
                  )}
                </div>
                <div>
                  {errorMessage!="" && (
                    <p className="text-red-700">
                      {" "}
                      {errorMessage}{" "}
                    </p>
                  )}
                  <button
                    className="flex justify-center w-full bg-indigo-500 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 uppercase"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && (
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                    Login
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
