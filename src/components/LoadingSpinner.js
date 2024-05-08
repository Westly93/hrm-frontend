import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="text-center my-auto mx-auto">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
