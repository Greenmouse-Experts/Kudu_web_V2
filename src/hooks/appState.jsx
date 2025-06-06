import { useSelector } from "react-redux";

const useAppState = () => {
  const state = useSelector((state) => state);

  return {
    user: state.user?.data,
    currency: state.user?.currencies,
    ipInfo: state.user?.ipInfo
    // products: state.products?.data,
  };
};

export default useAppState;
  