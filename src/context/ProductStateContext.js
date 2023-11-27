import { createContext, useContext, useState } from "react";
import { useRootState } from "./RootStateContext";

export const ProductState = createContext();

export function useProductState() {
  return useContext(ProductState);
}

export default function ProductStateContainer({ children }) {
  const { globalState } = useRootState();

  const [data, setData] = useState(globalState.products ? globalState.products : []);
  const [isFetching, setIsFetching] = useState(true);
  const [detail, setDetail] = useState();
  return (
    <ProductState.Provider value={{ data, setData, isFetching, setIsFetching, detail, setDetail }}>
      {children}
    </ProductState.Provider>
  );
}