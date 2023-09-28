import useLoader from "../../hooks/useLoader";
import Loading from "./Loading";
import { View } from "native-base";

const LoadingWrapper = ({ children }) => {
  const { loading } = useLoader();

  return (
    <>
      {loading && (
        <View>
          <Loading />
        </View>
      )}
      {children}
    </>
  );
};

export default LoadingWrapper;
