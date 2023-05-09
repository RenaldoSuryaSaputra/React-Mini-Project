import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="text-center">
      <p className="font-bold text-5xl text-indigo-600">404</p>
      <h5 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {error.statusText || error.message}
      </h5>
      <p className="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn't find the page you're looking for
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold
        text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-indigo-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
