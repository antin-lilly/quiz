import React, { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

const useLoader = () => {
  const { isLoading, setLoading } = useContext(LoadingContext);

  return {
    loading: isLoading,
    setLoading: (value = false) => {
      setLoading(value);
    },
  };
};

export default useLoader;
