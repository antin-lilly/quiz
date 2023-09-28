import React, { createContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, startLoading, stopLoading, setLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext };
