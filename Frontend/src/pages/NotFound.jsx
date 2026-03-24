import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center transition-colors duration-300 bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;