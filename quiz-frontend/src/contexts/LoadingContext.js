import React, { createContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext };
