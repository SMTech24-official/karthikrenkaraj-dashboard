import React from "react";

const notFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-2">
        Oops! The page you are looking for does not exist.
      </p>
    </div>  
  );
};

export default notFound;
